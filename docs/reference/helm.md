---
sidebar_label: "Helm Chart Options"
sidebar_position: 3
title: "Helm Chart Reference"
description: Reference for the Epinio Helm chart values that control the server, ingress, authentication, storage, identity, and registry.
keywords: [epinio, helm, chart, values, configuration, installation]
doc-type: [reference]
doc-persona: [epinio-operator]
doc-topic: [epinio, reference, helm]
---

Epinio is configured through Helm chart values. This page documents the values you
are most likely to set, grouped by area. The chart's full annotated
[**`values.yaml`**](https://github.com/epinio/helm-charts/blob/main/chart/epinio/values.yaml) is the complete,
authoritative reference for every value and its default. The chart lives in the
[epinio/helm-charts](https://github.com/epinio/helm-charts) repository; for the
install walkthrough, see [Install Epinio](../getting-started/install-epinio.md).

## Key values

The only **required** value is `global.domain`. Everything else has a working
default (the Quickstart installs Epinio by setting `global.domain` alone). The
values below are the ones you are most likely to change.

| Value | Notes |
| --- | --- |
| `global.domain` | **Required.** The wildcard (`*.`) domain Epinio serves on (API, UI, registry). Point it at your ingress controller. |
| `global.tlsIssuer` | TLS issuer. Defaults to `epinio-ca`; other options are `selfsigned-issuer`, `letsencrypt-staging`, and `letsencrypt-production`. Use `global.customTlsIssuer` to name your own ClusterIssuer. |
| `global.tlsIssuerEmail` | Email for `letsencrypt-production` notifications. Only needed with that issuer. |
| `api.adminPassword` / `api.users` | The initial users and the `admin` password. Defaults to `admin` / `password`; change it for anything beyond a trial. |

## Configuration Groups

Every top-level key in the chart and what it configures:

| Group | Configures |
| --- | --- |
| `serviceAccount` | The Epinio server service account (creation, name, annotations). |
| `image` | Container images and tags for Epinio components and build tools. |
| `server` | API server: timeouts, token expiry, tracing, replicas, autoscaling, and staging workloads. |
| `ingress` | API/UI ingress: class, hostnames, request body size, timeouts, annotations. |
| `service` | The Epinio Service (port, container port, annotations). |
| `strategy` | Deployment update strategy. Use `RollingUpdate` with `maxSurge: 0` on RWO storage. |
| `certManager` | cert-manager integration, plus manual certificate overrides per component. |
| `s3` | External S3 connection details (endpoint, bucket, credentials). |
| `api` | API authentication: RBAC roles, default users, and passwords. |
| `dex` | The bundled Dex OIDC provider (image, issuer, security context). |
| `seaweedfs` | The bundled SeaweedFS S3-compatible storage. |
| `epinioUI` | The web UI (theme, URLs, CORS origins, service). |
| `reflector` | The reflector addon that mirrors secrets and configmaps across namespaces. |
| `s3gw` | An alternative bundled S3 store (experimental). |
| `containerregistry` | The bundled container registry (image, storage, ingress class). |
| `serviceCatalog` | Service catalog development services. |
| `helmController` | Scheduling (resources, nodeSelector, affinity, tolerations) for the Helm controller. |
| `global` | Cross-cutting values: domain, TLS issuer, external registry, Dex enablement. |
| `rancher` | The Rancher instance URL, used by the UI extension. |

## Server Configuration

- **`server.defaultTokenExpiry`**: Controls the default expiry time for auth tokens (e.g. `"30s"`, `"60s"`, `"2m"`). Use this to mitigate clock drift in environments where short-lived tokens may expire before use—for example, in staging workloads or when Kubernetes hosts have time synchronization issues. The value is capped at 5 minutes for security. Default is `"30s"`.

  ```yaml
  server:
    defaultTokenExpiry: "60s"  # Example: increase to 1 minute for clock drift
  ```

Other notable `server` values: `timeoutMultiplier`, `traceLevel`, `replicaCount`, and the `autoscaling` block.

## Staging Workloads

Epinio uses staging workloads to build container images from source code. Container builds can consume varying amounts of CPU, memory, and disk depending on the application, so these workloads can specify both resource amounts and scheduling constraints to protect your running applications from build-time resource consumption (for example, scheduling builds onto a dedicated node pool).

Configure them under `server.stagingWorkloads`:

- Resource consumption
  - `server.stagingWorkloads.ttlSecondsAfterFinished` — time-to-live for completed staging job resources.
  - `server.stagingWorkloads.resources` — requests/limits on CPU and memory.
  - `server.stagingWorkloads.storage.cache` and `.sourceBlobs` — toggle `emptyDir` to bypass PVC creation, or set `size`, `accessModes`, `volumeMode`, and `storageClassName`.
- Scheduling constraints
  - `server.stagingWorkloads.nodeSelector` — constrain scheduling to nodes with the given labels.
  - `server.stagingWorkloads.affinity` — affinity rules.
  - `server.stagingWorkloads.tolerations` — tolerate matching taints.

The annotated [`values.yaml`](https://github.com/epinio/helm-charts/blob/main/chart/epinio/values.yaml) contains commented examples under `server.stagingWorkloads`.

## Ingress

The `ingress` section controls how the API server and UI are exposed:

- **`ingress.ingressClassName`** — the IngressClass to use. Empty adds no class (relies on the cluster default).
- **`ingress.proxyBodySize`** — maximum request body size (default `500m`). Raise it if large application uploads fail with `Entity Too Large`.
- **`ingress.proxyReadTimeout`** — maximum response read time (default `600s`) for long-running deployments.
- **`ingress.hostnameOverride` / `ingress.dexHostnameOverride`** — override the default `epinio.<global.domain>` / `auth.<global.domain>` hostnames.
- **`ingress.annotations`** — extra annotations for the API ingress.

## Authentication and Users

- **`api.rbac.enabled`** (default `true`) — installs the role ConfigMaps (`application_manager`, `application_developer`, `view_only`, `system_manager`) so users can be granted scoped roles. When `false`, only the default `user` and `blank` roles exist.
- **`api.users`** — the initial users, each with a `password` (or `passwordBcrypt`), `roles`, and optional `workspaces`.
- **`api.adminPassword` / `api.epinioPassword`** — passwords for the built-in `admin` and `epinio` users. Set these for non-trial installs.

## TLS and Domain

The `global` section carries the cross-cutting settings:

- **`global.domain`** (required) — the wildcard domain.
- **`global.tlsIssuer`** — `epinio-ca`, `selfsigned-issuer`, `letsencrypt-staging`, or `letsencrypt-production`; or set **`global.customTlsIssuer`** to your own ClusterIssuer.
- **`global.registryURL` / `registryUsername` / `registryPassword` / `registryNamespace`** — point Epinio at an external container registry (skip when `containerregistry.enabled` is `true`).

## S3 Storage

Epinio uses an S3 compatible storage to store the application source code.
This chart will install [SeaweedFS](https://github.com/seaweedfs/seaweedfs) when `.Values.seaweedfs.enabled` is
`true` (default).

In addition to SeaweedFS, Epinio offers [s3gw](https://s3gw.io/) as another S3 compatible store.
It is installed when `.Values.seaweedfs.enabled` is set to `false` and `.Values.s3gw.enabled` is set to `true`.

:::caution
The s3gw support is __experimental__.
The s3gw chart is configured to use a `host path` volume for storage.
This setup is risky, and not HA.
If there is an outage of the node where s3gw's pod is currently deployed, k8s will fail trying to assign the volume on another node.
:::

Use any external S3 compatible solution by setting `.Values.seaweedfs.enabled` to `false`
(`.Values.s3gw.enabled` is `false` by default) and using the values under `s3`
(endpoint, bucket, region, credentials) to point to the required S3 server.

## Identity Provider (Dex)

[Dex](https://dexidp.io) OpenID Connect Provider is installed as a subchart when `.Values.global.dex.enabled` is set to `true` (default).

If you don't need to use an identity provider, set the value to `false` and use only local Epinio users. [OIDC Authentication](./security/authentication_oidc.md) has more information.

## Container Registry

When Epinio builds a container image for an application from source, it needs
to store that image in a container registry. Epinio installs a container registry
on the cluster when `.Values.containerregistry.enabled` is `true` (default).

Any container registry that supports basic auth authentication (e.g. gcr, dockerhub, etc) can be used
instead, by setting this value to `false` and using the `global.registry*` values
to point to the desired container registry.

## Web UI

The bundled dashboard runs by default and is served at `https://epinio.<domain>`,
the same host as the API (the API lives under `/api`, the dashboard gets the rest).
No extra configuration is needed. The values you may want to set:

| Value | Notes |
| --- | --- |
| `epinioUI.enabled` | Run the dashboard. Default `true`. Set `false` to disable it. |
| `epinioUI.theme` | `light` or `dark`. |
| `epinioUI.ingress.enabled` | **Optional.** Publishes a *second* ingress that also serves the dashboard at the bare `global.domain` (root). Default `false`. The dashboard is already reachable at `epinio.<domain>` without it. |

If you enable the root-domain ingress, also point the UI and the Dex redirect at
that host so OIDC login agrees: `epinioUI.uiURL`, `epinioUI.allowedOrigins`, and
`dex.ui.redirectURI` all default to `epinio.<domain>`.

## Complete Reference

For every value and its default, see the chart's annotated
[**`values.yaml`**](https://github.com/epinio/helm-charts/blob/main/chart/epinio/values.yaml) on the `main` branch.

## Related

- Install walkthrough: [Install Epinio](../getting-started/install-epinio.md)
- Cluster prerequisites: [Cluster prerequisites](../how-to/operator/cluster-prerequisites.md)
