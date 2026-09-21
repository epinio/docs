---
sidebar_label: 'OCI Registry Support for App Charts'
sidebar_position: 2
title: 'OCI Registry Support for Application Charts'
description: How Epinio resolves and deploys Application Charts stored in OCI registries, and how to verify the feature end to end.
keywords: [epinio, contributing, server, appcharts, oci, registry, helm]
doc-type: [contribute]
doc-topic: [server-contribution-oci-appcharts]
doc-persona: [epinio-developer]
---

# OCI Registry Support for Application Charts

## Background

Epinio deploys applications using [Application Charts](../../../reference/concepts/appcharts.md):
Helm charts that define the Kubernetes resources an application is rendered into. Prior to this
change, an `AppChart` custom resource could reference its underlying Helm chart in only two ways:

- A direct URL to a chart archive (`.tgz`), such as a GitHub Release asset.
- A classic Helm chart repository (an `index.yaml`-based repository, added via
  `helm repo add` semantics).

Modern Helm chart distribution increasingly happens through **OCI registries** (the same kind of
registry container images are stored in), addressed with an `oci://` reference instead of an
`index.yaml` repository. Epinio had no support for this: an `AppChart` pointing at an OCI
reference would fail, because the chart-resolution code only understood the two mechanisms above.

Separately, Epinio already runs its own internal container registry (used to store the images
built from application source). This registry is a standard OCI-Distribution-compatible registry,
which makes it a strong candidate for also hosting Helm charts as OCI artifacts, without
introducing any new infrastructure.

This document describes the change that teaches Epinio's chart-resolution code to understand
`oci://` chart references, and how to verify it.

## What Changed

The chart reference resolution function used during application deployment was extended with a
third resolution path:

1. **Direct URL/file** (pre-existing) — used when the `AppChart`'s `helmRepo` field is empty.
2. **OCI registry** (new) — used when `helmRepo` is an `oci://` URL.
3. **Classic (`index.yaml`) repository** (pre-existing) — used for any other non-empty `helmRepo`.

When the OCI path is taken, the server additionally decides whether it needs to authenticate:

- If the OCI registry host matches **Epinio's own internal registry**, the server logs in
  automatically, using the same registry credentials secret it already uses for pushing
  application images. No user-supplied credentials are involved.
- If the OCI registry host does **not** match Epinio's own registry (e.g. a public external OCI
  registry hosting a chart), no login is attempted at all, and the chart is fetched anonymously.

This mirrors how Epinio already treats its container registry for application images: the
server holds the credentials, end users never see or supply them.

## How It Works

### Chart reference resolution

An `AppChart`'s `helmChart` and `helmRepo` fields together describe where its Helm chart lives.
When `helmRepo` starts with `oci://`, it is treated as an OCI registry reference:

- `helmRepo` is combined with `helmChart` (and an optional `:<version>` suffix on `helmChart`) to
  build the final `oci://<host>/<path>/<chart-name>` reference and version that get passed to the
  underlying Helm client for install/upgrade.
- No `helm repo add`-style bookkeeping happens for OCI references — OCI registries don't use the
  `index.yaml` mechanism that classic repositories rely on.

### Authenticating to Epinio's own registry

Before resolving the chart, the server checks whether the OCI host matches the connection details
already available from Epinio's registry credentials secret (the same secret used for image
pushes). If it matches, the server performs a registry login with those credentials before
proceeding.

Epinio's built-in registry runs with a self-signed TLS certificate. The server already has an
established pattern elsewhere in the codebase for trusting this certificate (skipping TLS
verification specifically for the internal registry, since the registry's host is known and
trusted). The same approach is used here for the registry login call.

### External OCI registries

When the OCI host does not match Epinio's own registry, no login is attempted at all — the code
falls through and lets the underlying Helm client attempt an anonymous pull, the same way it would
for any publicly reachable OCI registry. This means default charts (or any chart) hosted on a
public OCI registry can be referenced without any credentials.

:::note Not supported yet

Authenticating to an **external, private** OCI registry (one that isn't Epinio's own and requires
credentials) is not supported. The `AppChart` model currently has no field to carry such
credentials. See [Known Limitations](#known-limitations--not-yet-implemented) below.

:::

## Verifying the Feature

The following steps describe how to verify the feature end to end on any Kubernetes cluster with
Epinio installed (the exact cluster domain, namespace, and IP addresses will differ per
environment — substitute your own).

### 1. Confirm the registry can serve OCI charts

Before touching any code, confirm that Epinio's registry (deployed as part of the `epinio` Helm
chart) can store and serve Helm charts as OCI artifacts, the same way it already does for
container images:

```bash
# Make the registry reachable locally
kubectl port-forward -n <epinio-namespace> svc/registry 5000:5000 &

# Trust the registry's self-signed certificate for this test
kubectl get secret epinio-registry-tls -n <epinio-namespace> \
  -o jsonpath='{.data.ca\.crt}' | base64 -d > registry-ca.crt

# The registry's certificate is issued for its in-cluster DNS name, so map it locally
echo "127.0.0.1 registry.<epinio-namespace>.svc.cluster.local" | sudo tee -a /etc/hosts

helm registry login registry.<epinio-namespace>.svc.cluster.local:5000 \
  -u <registry-username> -p <registry-password> --ca-file registry-ca.crt

# Package any existing application chart and push it as an OCI artifact
helm package <path-to-a-helm-chart-directory>
helm push <chart-name>-<version>.tgz \
  oci://registry.<epinio-namespace>.svc.cluster.local:5000/epinio-charts \
  --ca-file registry-ca.crt

# Pull it back to confirm the round trip
helm pull oci://registry.<epinio-namespace>.svc.cluster.local:5000/epinio-charts/<chart-name> \
  --version <version> --ca-file registry-ca.crt
```

A successful push and pull with matching digests confirms the registry itself is a viable OCI
chart store, independent of any server code changes.

### 2. Build and run a server with the change

Build the `epinio-server` binary from source with the change applied, and get it running in your
cluster (either by building and loading a new container image, or by using whatever
fast-iteration mechanism your development setup provides for swapping the running binary).

### 3. Register an AppChart pointing at the OCI chart

Since a chart is already sitting in the registry from step 1, register an `AppChart` resource
pointing at it. This can be applied directly as a Kubernetes resource:

```yaml
apiVersion: application.epinio.io/v1
kind: AppChart
metadata:
  name: oci-test-chart
  namespace: <epinio-namespace>
spec:
  shortDescription: OCI chart resolution test
  description: Verifies that AppCharts can resolve charts from an OCI registry
  helmChart: "<chart-name>:<version>"
  helmRepo: "oci://registry.<epinio-namespace>.svc.cluster.local:5000/epinio-charts"
  settings:
    appListeningPort:
      type: 'integer'
      minimum: '0'
```

```bash
kubectl apply -f oci-test-chart.yaml
kubectl get appcharts -n <epinio-namespace>
```

### 4. Deploy an application and verify

```bash
epinio push --name oci-test-app --app-chart oci-test-chart --path <path-to-any-source-app>
```

A successful deployment confirms the full path works. Two additional checks provide direct
evidence that the **new** code path was used, rather than the app coincidentally deploying through
some other mechanism:

```bash
# If the referenced chart deploys a StatefulSet (as opposed to a Deployment), confirm the
# expected controller and its PVC were created — proof the correct chart was actually used.
kubectl get statefulset,pvc -n <app-namespace>

# Confirm from the server's own logs which resolution path was taken
kubectl logs -n <epinio-namespace> deployment/epinio-server --tail=200 | grep -i "helm-chart-ref"
```

The log line reporting the resolved chart reference should show an `oci://` URL, not a
repository-hash-prefixed reference (which would indicate the classic, non-OCI path was taken
instead).

### 5. Negative tests

Two negative cases are worth exercising explicitly, since they cover code paths a purely
successful deployment does not:

**A. A chart version that does not exist in the registry.** Point an `AppChart` at a version that
was never pushed, and push an application against it. Expect a clear, immediate failure
identifying the missing chart/version — not a hang, timeout, or unrelated crash.

**B. An OCI host that is not Epinio's own registry.** Point an `AppChart`'s `helmRepo` at some
other `oci://` host (a nonexistent or unrelated one is fine for this purpose) and push an
application against it. Expect the failure to occur while trying to **fetch** the chart (a
connection/lookup failure for that host), and confirm the failure is **not** a login/authentication
error. This proves that the server correctly recognized the registry as external and skipped
attempting to authenticate against it with Epinio's own credentials — the more security-sensitive
of the two new branches.

## Known Limitations / Not Yet Implemented

This change adds the ability for the server to **resolve and deploy** an `AppChart` from an OCI
registry. It intentionally does not include:

- **An upload/push API.** There is currently no Epinio API or CLI command for a user to push a
  custom chart into a registry (Epinio's own or otherwise). Publishing a chart into Epinio's
  registry today requires the same manual `helm registry login` / `helm push` steps used for
  verification above, with direct registry credentials. A dedicated upload endpoint — mirroring
  how `epinio push` already handles application images, so that the server performs the actual
  registry push on the user's behalf and no registry credentials are ever exposed to the user — is
  a natural next step, but is separate, follow-up work.
- **Authenticating to private external OCI registries.** Only Epinio's own registry (auto-login)
  and anonymous/public external registries are supported. There is no way today to supply
  credentials for a private third-party OCI registry.
- **Migrating the default application charts to OCI.** The default charts (`standard`,
  `gateway-api`, and any others shipped with Epinio) still reference their GitHub Release URLs.
  This change makes it *possible* to point them at an OCI registry instead, but does not do so —
  that would require updating the default chart values and the chart publishing pipeline.

## Related

- [Application Charts](../../../reference/concepts/appcharts.md)
- [How to create custom application Helm charts](../../../how-to/operator/customization/create_custom_appcharts.md)
- [How to use custom application Helm charts](../../../how-to/operator/customization/using_custom_appcharts.md)
