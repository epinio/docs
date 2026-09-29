---
sidebar_label: 'OCI Registry Support for App Charts'
sidebar_position: 2
title: 'OCI Registry Support for Application Charts'
description: How the Epinio server resolves, deploys, and stores Application Charts in OCI registries, and how to verify this end to end.
keywords: [epinio, contributing, server, appcharts, oci, registry, helm]
doc-type: [contribute]
doc-topic: [server-contribution-oci-appcharts]
doc-persona: [epinio-developer]
---

# OCI Registry Support for Application Charts

This page describes how the Epinio server handles [Application Charts](../../../reference/concepts/appcharts.md)
stored in OCI registries, and how to verify it on a cluster.
For the user-facing description see
[How to create custom application Helm charts](../../../how-to/operator/customization/create_custom_appcharts.md#pushing-the-chart-to-epinios-registry).

## Chart reference resolution

The `helmChart` and `helmRepo` fields of an `AppChart` together locate its Helm chart.
The server resolves them in `getChartReference` (`internal/helm/helm.go`), in one of three ways:

1. **Direct URL or file.** `helmRepo` is empty, and `helmChart` is the location of the chart tarball.
2. **OCI registry.** `helmRepo` starts with `oci://`. `helmChart` is `NAME` or `NAME:VERSION`.
   The chart reference passed to Helm is `oci://<host>/<path>/NAME`, with the version passed separately.
   OCI registries have no `index.yaml`, so there is no `helm repo add` style bookkeeping for them.
3. **Classic repository.** Any other non-empty `helmRepo`, with an `index.yaml`.

### Authentication

Epinio's own registry runs with a self-signed certificate. Charts stored there by
[`epinio app chart push`](#pushing-charts) are pulled with the registry credentials the server already
uses for application images, from the `registry-creds` secret. No user-supplied credentials are involved.

- If the host of `helmRepo` matches a registry in `registry-creds`, the server logs in with these credentials
  before pulling. Certificate verification is skipped for registries running inside the cluster,
  like it is for application images. It is not skipped for a registry outside of the cluster.
- If the secret does not exist, or the host does not match, no login is attempted.
  The chart is pulled anonymously, and Epinio's credentials are never sent to another host.
- Failing to read the secret for any other reason fails the deployment, with the reason.

:::note

Helm applies the login settings to the registry client, which the server shares between operations on
the same namespace. Do not use that client for unrelated registries.

:::

Authenticating to an external, private OCI registry is not supported.
The `AppChart` has no field for credentials.

### Other places needing the chart

Some server operations need the chart archive itself instead of deploying it:
the `chart` and `archive` parts of an application, and the export of an application.
`chartArchiveFile` (`internal/api/v1/application/part.go`) provides it for all kinds of chart.
For OCI charts the archive is pulled into a temporary directory by `helm.FetchOCIChartArchive`,
which the caller removes when done. The other kinds are located by `chartArchiveURL`, and fetched through
the URL cache.

When redeploying an application the server compares old and new chart name and version to decide whether
to reuse the Helm values (`shouldReuseHelmValues`). This works for OCI charts too.

## Pushing charts

`POST /api/v1/appcharts/push` stores a chart in Epinio's registry, and creates the `AppChart` for it.
The request is `multipart/form-data`, with these parts:

|Part                 |Meaning                                                    |
|---                  |---                                                        |
|`file`               |The chart tarball, as created by `helm package`. Required. |
|`name`               |Name of the new `AppChart`. Required.                      |
|`description`        |Optional.                                                  |
|`short_description`  |Optional.                                                  |

The handler (`internal/api/v1/appchart/push.go`)

1. checks the name, and that the upload is a valid Helm chart of type `application` (or with no type),
   before touching the cluster,
2. refuses names of existing `AppChart`s with `409 Conflict`,
3. pushes the chart with Helm to `oci://<registry>/epinio-charts`, logged in as described above, and
4. creates an `AppChart` with `helmRepo: oci://<registry>/epinio-charts` and `helmChart: NAME:VERSION`,
   taking name and version from the chart.

The action `chart_write` is required. The size of the upload is limited to 32 MiB.

The registry keeps one chart per name and version.
Pushing the same name and version again replaces it for all `AppChart`s referencing it.

## Default charts

The default charts `standard` and `gateway-api-application` are stored in an OCI registry too.
The Epinio Helm chart references them through its values `appChart.repo`, `appChart.default`,
and `appChart.gatewayAPI`, see [Helm Chart Options](../../../reference/helm.md#application-charts).
Setting a value to a tarball URL selects the direct URL resolution for it.

The `Release Charts` workflow of the `epinio/helm-charts` repository publishes the application charts
to `oci://ghcr.io/<owner>/charts`, in the job `publish-oci`. Versions already published are skipped.

## Verifying the feature

The following steps verify the feature on a cluster with a development build of the server.
The exact names, namespaces, and domains differ per environment.

### 1. Push a chart

```bash
helm package <path-to-a-chart-directory> --version 0.9.0
epinio app chart push oci-test ./<chart-name>-0.9.0.tgz --short-description "OCI test"
epinio app chart show oci-test
```

`Helm Repository` has to be `oci://<registry>/epinio-charts`, and `Helm Chart` `<chart-name>:0.9.0`.

Optionally check the registry itself. This is for verification only, users do not need it.
The registry credentials are in the secret `registry-creds`:

```bash
kubectl -n <epinio-namespace> port-forward svc/registry 5000:5000 &
curl -k -u <username>:<password> https://localhost:5000/v2/epinio-charts/<chart-name>/tags/list
```

The tag `0.9.0` has to be listed.

### 2. Deploy an application with the chart

```bash
epinio push --name oci-app --app-chart oci-test --path <path-to-any-source-app>
kubectl -n <epinio-namespace> logs deploy/epinio-server | grep helm-chart-ref
```

The log has to report a chart reference starting with `oci://`, and the version.

### 3. Export and redeploy

`epinio app export oci-app <directory>` has to save the chart archive, values, and image.

Push a chart with a new version under another name, and switch the application to it with
`epinio app update oci-app --app-chart <other-name>`. The server log has to show
`app chart package changed, disabling ReuseValues`, with both chart versions, and no
`unable to resolve next chart identity`.

### 4. Negative tests

|Test                                                       |Expected result                                    |
|---                                                        |---                                                |
|Push again with the same `AppChart` name                   |`409`, `already exists`                            |
|Push a file which is not a chart archive                   |`400`, `not a valid helm chart archive`            |
|Push with a name which is not a valid Kubernetes name      |`400`, `invalid application chart name`            |
|Deploy with an `AppChart` whose `helmRepo` is a host which is not Epinio's own, for example `oci://registry.invalid.example:5000/charts`|Failure to fetch the chart from that host. The request to the host carries no `Authorization` header, and there is no login error.|

## Known limitations

- Private external OCI registries are not supported.
- Charts can only be pushed to Epinio's own registry.
- Pushing a chart again with the same name and version replaces the stored chart.

## Related

- [Application Charts](../../../reference/concepts/appcharts.md)
- [How to create custom application Helm charts](../../../how-to/operator/customization/create_custom_appcharts.md)
- [How to use custom application Helm charts](../../../how-to/operator/customization/using_custom_appcharts.md)
