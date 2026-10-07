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

The handler (`internal/api/v1/appchart/push.go`) reads the upload, checks the name, loads the chart, and maps
errors to HTTP statuses. Loading (`appchart.LoadChartArchive`) checks that the upload is a valid Helm chart of
type `application` (or with no type), before the cluster is touched. The rest of the work is done in
`internal/appchart` (`appchart.Push`), like the creation of an `AppChart` is done by `appchart.Create`. It

1. refuses names of existing `AppChart`s with `409 Conflict`,
2. refuses a chart name and version which is already stored for the `AppChart`, with `409 Conflict`,
3. creates an `AppChart` with `helmRepo: oci://<registry>/epinio-charts/<AppChart name>` and
   `helmChart: NAME:VERSION`, taking name and version from the chart, and
4. pushes the chart with Helm to that repository, logged in as described above. When the push fails
   the `AppChart` is removed again.

Creating the `AppChart` first reserves the name, and leaves nothing in the registry should the creation fail.

The action `chart_write` is required. The size of the upload is limited to 32 MiB.

Every `AppChart` has a repository of its own, named after it. The charts of different `AppChart`s can
therefore not replace each other. A stored chart version is never replaced, so that the chart behind
deployed applications does not change.

## Deleting charts

`DELETE /api/v1/appcharts/<name>` (`appchart.DeleteWithChart`) removes the chart from the registry
before it deletes the `AppChart`, if the chart is stored in the repository of Epinio's registry named like
the `AppChart`. Only that repository is touched. `AppChart`s referencing a URL, a Helm repository,
or another OCI registry are not stored by Epinio, and only the `AppChart` is deleted for them.

The `AppChart` is kept when the chart cannot be removed, so that the deletion can be retried.
Removing a chart which is not in the registry is not an error.

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

`Helm Repository` has to be `oci://<registry>/epinio-charts/oci-test`, and `Helm Chart` `<chart-name>:0.9.0`.

Optionally check the registry itself. This is for verification only, users do not need it.
The registry credentials are in the secret `registry-creds`:

```bash
kubectl -n <epinio-namespace> port-forward svc/registry 5000:5000 &
curl -k -u <username>:<password> https://localhost:5000/v2/epinio-charts/oci-test/<chart-name>/tags/list
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
|Delete the `AppChart` with `kubectl`, and push the same chart for the same name again|`409`, the version is already stored, bump the version|
|Push a file which is not a chart archive                   |`400`, `not a valid helm chart archive`            |
|Push with a name which is not a valid Kubernetes name      |`400`, `invalid application chart name`            |
|Deploy with an `AppChart` whose `helmRepo` is a host which is not Epinio's own, for example `oci://registry.invalid.example:5000/charts`|Failure to fetch the chart from that host. The request to the host carries no `Authorization` header, and there is no login error.|

### 5. Delete

`epinio app chart delete oci-test` has to remove the `AppChart`, and the chart from the registry. The list of
tags of `oci-test/<chart-name>` is empty afterwards, and the same chart can be pushed again under that name.
The log of the server shows `Deleting image from registry`. For an `AppChart` referencing a URL it does not.

## Known limitations

- Private external OCI registries are not supported.
- Charts can only be pushed to Epinio's own registry.
- An `AppChart` deleted with `kubectl` leaves its chart in the registry.
  Deleting it with `epinio app chart delete` removes both.
- When the server stops between the creation of the `AppChart` and the push of the chart, the `AppChart`
  exists without a chart. Deleting it removes it.
- Removing a chart deletes its manifest and tags from the registry. The data blobs stay in the storage of the
  registry until its garbage collection is run. Epinio does not schedule one, as for application images.

## Related

- [Application Charts](../../../reference/concepts/appcharts.md)
- [How to create custom application Helm charts](../../../how-to/operator/customization/create_custom_appcharts.md)
- [How to use custom application Helm charts](../../../how-to/operator/customization/using_custom_appcharts.md)
