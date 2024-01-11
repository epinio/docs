---
sidebar_label: Custom application Helm charts
sidebar_position: 15
title: Creating custom application Helm charts
description: How to create custom application Helm charts
keywords: [epinio, kubernetes, custom application helm charts]
doc-type: [how-to]
doc-topic: [epinio, how-to, customize, custom-app-helm-chart]
doc-persona: [epinio-operator]
---

<head>
  <link rel="canonical" href="https://docs.epinio.io/howtos/customization/create_custom_appcharts"/>
</head>

Epinio deploys applications on Kubernetes as [Helm charts](https://helm.sh/).

By default, Epinio provides a standard Helm chart installation.
However, operators may wish to create custom charts specific to their environment,
and register them in Epinio, so [their developers can use them](../other/using_custom_appcharts.md).

## Setting up a custom Helm chart

To add a custom Helm chart to the system, there are two mandatory steps:

1. Create the chart,
1. Make it known to the Epinio installation

The following two sections explain these steps in detail.

An advanced feature of custom application charts is the ability to expose user-settable configuration values to the user.

### Creating the Helm chart

You can use the standard chart provided by Epinio as a template for the modifications.

You can download the chart from
[the Epinio repository](https://github.com/epinio/helm-charts/tree/main/chart/application)
into a directory `<work-dir>` of your choice,
or, you can clone the
[Epinio Helm chart repository](https://github.com/epinio/helm-charts.git),
again, into a `<work-dir>` of your choice.

```console
git clone https://github.com/epinio/helm-charts.git
```

The chart is in the subdirectory `helm-charts/chart/application`.

In the following steps,
the commands given,
assume that the directory `<work-dir>` is the working directory.

You create a variant of the chart by adding an annotation to every application `Deployment`.
The annotation enables the filtering of Epinio applications in [fluentd](https://www.fluentd.org/).

Open the file `helm-charts/chart/application/templates/deployment.yaml` in your editor.
This file is the template for the application's `Deployment` resource.

First, locate the section `annotations`:

```yaml
[...]
  template:
    metadata:
      annotations:
        app.kubernetes.io/name: {{ .Values.epinio.appName }}
[...]
```

Add the following annotations:

```yaml
fluentd-enable: "true"
fluentd-application-name: {{ .Values.epinio.appName }}
```

The result should look like:

```yaml
[...]
  template:
    metadata:
      annotations:
        fluentd-enable: "true"
        fluentd-application-name: {{ .Values.epinio.appName }}
        app.kubernetes.io/name: {{ .Values.epinio.appName }}
[...]
```

The templating uses the `.Values.epinio.appName` field to insert the application name into the annotation.

An explanation of the values Epinio sets when deploying an application using the chart is in the
[Application Chart Reference](../../references/customization/appcharts.md#configuration).
It's also available locally in the comments at the top of file `helm-charts/chart/application/values.yaml`.

Once you have modified the chart, use the following command to package the changed chart into a tarball:

```console
helm package helm-charts/chart/application
```

The `helm` command places the tarball into `<work-dir>` and the file name should be `application-VERSION.tgz` where `VERSION` is the chart version.

Don't change the chart version.
Versioned chart development is out of scope for this How-to.

### Making the helm Chart known to Epinio

Once you have created the new chart,
it's necessary to place the generated tarball on a web server.
A few possible options are:

- A server in the public cloud available to you
- The company's host web server, if available, and permitted by company policies
- A personal web server
- A local web server, perhaps an nginx in a docker container

Given the range of possible options, this How-to assumes that the tarball is available at the example URL.

```console
https://mydomain.org/epinio-application-fluentd.tgz
```

Copy the following YAML text,
change the `RELEASE_NAMESPACE` value to the namespace where Epinio was installed,
by default it's `epinio`, and add it to a file of your choice:

```yaml
apiVersion: application.epinio.io/v1
kind: AppChart
metadata:
  namespace: RELEASE_NAMESPACE
  name: fluentd
spec:
  shortDescription: Fluentd filterable standard deployment
  description: Epinio standard support chart extended for fluentd filtering
  helmChart: https://mydomain.org/epinio-application-fluentd.tgz
```

This How-to assumes that the name of the chosen file is `fluentd-appchart.yaml`.

:::info

This is a Kubernetes custom resource, which describes the new Helm chart to Epinio.
In this example, it provides the information about the name, the source and descriptions.

:::

The Epinio installation provides the necessary Kubernetes CRD.

Apply this resource to the Epinio cluster:

```console
kubectl apply -f fluentd-appchart.yaml
```

Verify that the new chart is now registered in Epinio:

```console
epinio app chart list
```

You can also see the details of the chart in Epinio:

```console
epinio app chart show fluentd
```

### User-settable configuration values

To expose the user-settable configuration value `foo` the created application chart has to look for this variable in the `.Values.userConfig` map.
That is, it has to use the helm variable `.Values.userConfig.foo`.

:::caution

The chart should use a default value when this helm variable isn't set.

:::

With the application chart exposing `foo` Epinio has to be aware of the configuration value by adding a specification to the `AppChart` resource describing it.

Do this by adding an entry `foo` to the `spec.settings` map of the AppChart resource.
This entry is itself a map, with a mandatory `type` field, and type-dependent **optional** restrictions on the valid values of `foo`.

Example:

```yaml
kind: AppChart
metadata:
  [...]
spec:
  [...]
  settings:
    foo:
      type: integer
      minimum: '42'
    bar:
      type: number
      maximum: '122'
    flag:
       type: bool
    mode:
      type: string
      enum:
        - "sequential"
        - "out of order"
        - "randomized"
```

The valid types and their possible restrictions are:

|Type|Restriction|Semantics|
|---|---|---|
|`integer`|`minimum`|Minimum valid integer value|
| |`maximum`|Maximum valid integer value|
|`number`|`minimum`|floating-point|
| |`maximum`|floating-point|
|`string`|`enum`|Sequence of valid values|
|`bool`|n/a| |

Restrictions set on a type not supporting them, for example, a `minimum` on a `string`-type configuration value, are ignored.

:::caution

The restriction values have to be YAML **strings**, regardless the type of the configuration value.
Note how in the example the `maximum` and `minimum` values are quoted to make them strings.

:::

## Troubleshooting

If the new Helm chart isn't correctly registered in Epinio,
check that the `RELEASE_NAMESPACE` is set in `fluentd-appchart.yaml`.

## Going further

The standard app chart, and the chart created here,
use a Kubernetes `Deployment` as the main resource describing the active application.

Up to Epinio version 1.0, this was the only kind of resource supported.
Epinio supports other kinds of controllers,
for example, `StatefulSet` since versions greater than 1.0.

However, even when changing controllers,
it's important to keep the `Pod` annotations and labels the same as for the standard chart.
This lets Epinio's server locate the required resources and use them.

Here's a couple of examples:

1. The value of `epinio.io/stage-id` is the id of the staging Pod which created the application's image.

1. The value of `epinio.io/app-container` is the name of the application's main `Container`, used by `epinio exec`.
This label has to match the actual name of the container in the pod spec.
