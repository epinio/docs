---
title: "Application Charts"
sidebar_label: "Application Charts"
sidebar_position: 6
description: "Application charts, the templates Epinio uses for the structure of deployed applications."
keywords: [epinio, application, charts]
doc-type: [reference]
doc-persona: [epinio-developer, epinio-operator]
doc-topic: [epinio, reference, concepts, appcharts]
---
Epinio uses Application charts as templates for the structure of deployed applications,
i.e. of the kubernetes resources used to run an application image.

An installation of Epinio provides a single standard application chart.

If custom application charts adapted to the local environment are desired or needed please
follow the instructions on
[How to create custom application Helm charts](../../how-to/operator/customization/create_custom_appcharts.md)
and
[How to use custom application Helm charts](../../how-to/operator/customization/using_custom_appcharts.md).

Application charts are expected to create the following resources:

  - A `Deployment`, `StatefulSet`, or similar main controller, specifying the `Pod` and
    its containers running the application image.

  - A `Service` to route web requests to the application.

  - An [Ingress](../customization/lb.md) per specified route to front the `Service`.

:::note

Up to version 1 Epinio allowed only `Deployment` resources as the main controller of
applications.

:::

:::tip

Read the [contents of the standard application chart](https://github.com/epinio/helm-charts/tree/main/chart/application).

:::

## Further Expectations

Application Charts are expected to heed the following contraints to enable their use by
Epinio:

  1. It has to support all of the configuration values described in section
     [Configuration](#configuration) below.

  1. Pod resources have to have a number of annotations and labels for Epinio to locate
     and use them, as described in section [Pods](#pods) below.

:::note

While a custom chart is free to support more configuration values Epinio will have no
knowledge of them, and will not use them.

:::

## Configuration

All configuration fields below are provided in the `epinio` hierarchy:

|Name                   |Kind                   |Meaning                                                        |
|---                    |---                    |---                                                            |
|`appName`              |string                 |The application's name                                         |
|`configurations`       |sequence (string)      |The names of the configurations to import into the application |
|`env`                  |sequence (assignment)  |The application's environment variables and their values       |
|`imageURL`             |string                 |A reference to the app image in Epinio's registry              |
|`ingress`              |string                 |The ingress class name to use, if any                          |
|`replicaCount`         |integer                |The desired number of instances (pods) to deploy               |
|`routes`               |sequence (route)       |The routes (= domain+path+id) the app has to be reachable at   |
|`stageID`              |string                 |Id of the stage run which generated the app image              |
|`start`                |integer                |Optional. The time of deployment, in nanoseconds               |
|`tlsIssuer`            |string                 |The name of the cert issuer to use for route certs             |
|`username`             |string                 |The name of the user deploying the application                 |
|`userConfig`           |map (string -> any)    |The names and values of all chart values set by the user       |

Routes are maps composed of four keys:

|Name           |Kind   |Meaning                                                                |
|---            |---    |---                                                                    |
|`domain`       |string |The domain of the route                                                |
|`id`           |string |A unique id to name route `Ingress` and `Certificate` resources with   |
|`path`         |string |The sub-path of the route, if any                                      |
|`secret`       |string |Optional. Name of a `Secret` to directly use in securing the `Ingress` |

:::note
The [Routing Secrets](../customization/routing_secrets.md) reference explains more about the `secrets` field.
:::

Environment assigment are maps composed of two keys:

|Name   |Kind   |Meaning                   |
|---    |---    |---                       |
|`name` |string |The name of the variable  |
|`value`|string |The value of the variable |

The user configuration map is keyed by the names of chart values set by the user, referencing the
set values.

:::note
Please read [How to create custom application Helm charts](../../how-to/operator/customization/create_custom_appcharts.md)
for more information about defining user-settable chart values when creating a custom app chart.

Please read [How to use custom application Helm charts](../../how-to/operator/customization/using_custom_appcharts.md) for
more information about using user-settable chart values when deploying an application.
:::

## Pods

Epinio adds the following annotations to the `Pods`:

|Annotation                     |Meaning                                                        |
|---                            |---                                                            |
|`app.kubernetes.io/name`       |The application's name.                                        |
|`epinio.io/start`              |The time of deployment, in nanoseconds, if provided by Epinio  |

Epinio adds the following labels to the `Pods`:

|Label                          |Meaning                                                        |
|---                            |---                                                            |
|`app.kubernetes.io/component`  |Fixed: `application`                                           |
|`app.kubernetes.io/created-by` |The name of the user deploying the application                 |
|`app.kubernetes.io/managed-by` |Fixed: `epinio`                                                |
|`app.kubernetes.io/name`       |The application's name.                                        |
|`app.kubernetes.io/part-of`    |The application's namespace                                    |
|`epinio.io/app-container`      |The name of the main Pod container, running the app image      |
|`epinio.io/stage-id`           |Id of the stage run which generated the app image              |
|`helm.sh/chart`                |Chart name and version used to deploy the application          |

:::tip

Read the [contents of the standard application chart](https://github.com/epinio/helm-charts/tree/main/chart/application).

:::

The [application charts how-to](../../how-to/developer/concepts/app-charts/app-charts.mdx) contains information on how to work with app charts via the UI or CLI.

## Chart Sources

The chart an application chart is made from is specified by the two fields `helmChart` and
`helmRepo` of the `AppChart` resource, in one of three ways:

|`helmRepo`             |`helmChart`                    |Meaning                                                |
|---                    |---                            |---                                                    |
|empty                  |URL                            |Direct link to the chart tarball                       |
|URL                    |`NAME` or `NAME:VERSION`       |Chart in a Helm repository, i.e. one with an `index.yaml` |
|`oci://REGISTRY/PATH`  |`NAME` or `NAME:VERSION`       |Chart in an OCI registry                               |

For an OCI registry the chart reference passed to Helm is `oci://REGISTRY/PATH/NAME`, with the version
passed separately. OCI registries have no `index.yaml`, so there is no `helm repo add` style bookkeeping
for them.

The default application charts of Epinio are stored in an OCI registry.
The registry is configured through the value `appChart.repo` of the Epinio Helm chart.
To not use it, set the values `appChart.default` and `appChart.gatewayAPI` to tarball URLs.

### Pushed charts

Custom charts can be stored in Epinio's registry with
[`epinio app chart push`](../cli/app/chart/epinio_app_chart_push.md), or `POST /api/v1/appcharts/push`.
See [How to create custom application Helm charts](../../how-to/operator/customization/create_custom_appcharts.md#pushing-the-chart-to-epinios-registry).

Epinio's registry is the registry Epinio stores application images in: the bundled one, or an
[external one](../../how-to/operator/cluster-config/setup_external_registry.md) configured with
`global.registryURL` and `global.registryNamespace`.

The chart of the application chart `NAME` is stored in the repository `epinio_appchart_NAME`, next to the
application images. The application chart references it as

- `helmRepo: oci://REGISTRY_URL/REGISTRY_NAMESPACE`, and
- `helmChart: epinio_appchart_NAME:VERSION`, with the version of the chart.

The chart's own name is not used. A single path segment below the registry namespace works on registries
which do not allow deeper paths, like Docker Hub.
An application chart counts as pushed when both its `helmRepo` is Epinio's registry and its chart name is
`epinio_appchart_NAME`.

The push request is `multipart/form-data`, with these parts:

|Part                 |Meaning                                                    |
|---                  |---                                                        |
|`file`               |The chart tarball, as created by `helm package`. Required. |
|`name`               |Name of the application chart. Required.                   |
|`description`        |Optional.                                                  |
|`short_description`  |Optional.                                                  |

The chart has to be a valid Helm chart of type `application`, or without type.
The action `chart_write` is required. The size of the upload is limited to 32 MiB.

Pushing to a new name creates the application chart, then stores the chart. When storing fails the
application chart is removed again. A chart left in the registry by an earlier application chart of the
same name is replaced.

Pushing to an existing name:

|Existing application chart                       |Result                                              |
|---                                              |---                                                 |
|Not pushed (a URL, a Helm repository, another OCI registry)|`409 Conflict`, `already exists`          |
|Pushed, used by applications                     |`409 Conflict`. Their chart does not change behind their back. |
|Pushed, not used                                 |The chart is replaced. Earlier versions stay in the repository until the application chart is deleted. |

### Changing and deleting

`PATCH /api/v1/appcharts/NAME` (`epinio app chart update`) refuses changes to `helm_chart` and `helm_repo`

- with `409 Conflict` while applications use the application chart, and
- with `400 Bad Request` for a pushed application chart. Push the new chart to the same name instead.

Descriptions, values, and settings can always be changed.

Deleting a pushed application chart removes all tags of its repository from the registry first. Deleting
any other application chart touches no registry.

- When the chart cannot be removed, the application chart is kept, so that the deletion can be retried.
- When the registry refuses to delete (`405`, or `401` or `403` for credentials which can read the chart),
  the application chart is deleted anyway, and its chart stays in the registry, with a warning in the
  server log. A later push to the same name replaces it.
- Removing a chart which is not in the registry is not an error.

### Registry access

Pushed charts are pulled with the credentials Epinio uses for application images, from the
`registry-creds` secret. Users neither supply nor see them.

- When the host of `helmRepo` matches a registry in `registry-creds`, Epinio logs in with these credentials.
  Basic auth and token auth, as used by Docker Hub and Harbor, both work.
- Otherwise the chart is pulled anonymously, and Epinio's credentials are never sent to another host.
- Failing to read the secret for another reason than its absence fails the deployment.

Certificates:

- The certificate of the registry inside the cluster is not verified, like for application images. Only the
  hosts `localhost`, a loopback address, or a name ending in `.svc.cluster.local` count as inside.
- Any other registry is verified against the system CAs, plus the certificate in
  `containerregistry.certificateSecret`, if set. Epinio reads that certificate when it starts, so a changed
  certificate takes a restart of the Epinio server.

### Limitations

- Pushing, pulling, and deleting charts has been tested with the bundled registry, Docker Hub, and
  Harbor. Other registries may behave differently, in particular on deletion.
- Charts can only be pushed to Epinio's registry. Credentials are only used for Epinio's registry, so other
  OCI registries have to allow anonymous pulls.
- An application chart deleted with `kubectl` leaves its chart in the registry. A later push to that name
  replaces it.
- A registry refusing deletes keeps the chart of a deleted application chart. Docker Hub removes the tags, and
  keeps the empty repository.
- When the server stops between creating the application chart and storing its chart, the application chart
  exists without a chart. Deleting it removes it.
- Removing a chart deletes its manifest and tags. The data stays in the storage of the registry until its
  garbage collection runs. Epinio does not schedule one, as for application images.

## Related

  - [Routing Secrets](../customization/routing_secrets.md)
  - [How to create custom application Helm charts](../../how-to/operator/customization/create_custom_appcharts.md)
  - [How to use custom application Helm charts](../../how-to/operator/customization/using_custom_appcharts.md)
  - [Setting up an external container registry](../../how-to/operator/cluster-config/setup_external_registry.md)
