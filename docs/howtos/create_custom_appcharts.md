---
sidebar_label: "Creating Custom Application Helm Charts"
sidebar_position: 14
title: ""
---

# Introduction

Epinio deploys applications on Kubernetes as [Helm charts](https://helm.sh/).

By default, a standard Helm chart is provided when Epinio is installed.
However, operators may wish to create custom charts specific to their environment, and
register them in Epinio, so [their developers can use them](using_custom_appcharts.md).

# Setting up a custom Helm chart

To add a custom Helm chart to the system, there are two mandatory steps:

  1. Create the chart,
  2. Make it known to the Epinio installation

The following two sections explain these steps in detail.

An advanced feature of custom application charts is the ability to expose user-settable configuration
values to the user. As doing so crosses both chart creation and registration this feature is
described in a separate section to keep the necessary information together.

## Creating the Helm chart

Instead of starting from scratch, you can use the standard chart provided by Epinio as a
template for the modifications.

To do so it is possible to download the chart directly from
[here](https://github.com/epinio/helm-charts/tree/main/chart/application) into a directory `D` of
your choice, or, you can clone the [Epinio Helm chart
repo](https://github.com/epinio/helm-charts.git), again into a directory `D` of your choice.

```
git clone https://github.com/epinio/helm-charts.git
```

Regardless of method, the chart will be located in the sub directory
`helm-charts/chart/application`.

:::note
The coming steps, especially the commands given, assume that the reader uses the chosen directory
`D` as their working directory.
:::

In this How-To, we will create a variant of the chart by adding an annotation to every
application `Deployment`. The annotation will enable the filtering of Epinio applications
in [fluentd](https://www.fluentd.org/).

:::note
Explanations about setting up and using `fluentd` are out of scope for this How-To.
:::

Open the file `helm-charts/chart/application/templates/deployment.yaml` in your editor of
choice.  This file is the template for the application's `Deployment` resource.

First, locate the section `annotations`:

```
[...]
  template:
    metadata:
      annotations:
        app.kubernetes.io/name: {{ .Values.epinio.appName }}
[...]
```

Add the following annotations:

```
fluentd-enable: "true"
fluentd-application-name: {{ .Values.epinio.appName }}
```

The result should look like:

```
[...]
  template:
    metadata:
      annotations:
        fluentd-enable: "true"
        fluentd-application-name: {{ .Values.epinio.appName }}
        app.kubernetes.io/name: {{ .Values.epinio.appName }}
[...]
```

Note how the templating uses the `.Values.epinio.appName` field to insert the application
name into the annotation.

The full set of values Epinio sets when deploying an application through the chart is explained in
[Application Chart Reference](../../references/customization/appcharts.md#configuration), or locally
in the comments at the top of the file `helm-charts/chart/application/values.yaml`.

Once you have modified the chart to your needs, use the following command to package the changed
chart into a tarball:

```
helm package helm-charts/chart/application
```

The tarball is placed into the current working directory and the filename should be
`application-VERSION.tgz` where `VERSION` is the chart version.

:::note
We didn't change the chart version. Versioned chart development is out of scope for this How-To.
:::

## Making the helm Chart known to Epinio

:::caution
Once the new chart is created as decribed in the previous section, it is necessary to place the
generated tarball on an accessible web server. Possible options are

  - A server in the public cloud accessible to you
  - The company's host web server, if accessible, and permitted by company policies
  - A personal web server
  - A local web webserver, like an nginx in a docker container
  - etc. 

Given the plethora of possible options, this How-To simply assumes that the tarball is
available at the example URL

```
https://mydomain.org/epinio-application-fluentd.tgz
```

and puts the burden on you, the reader, to change this url to match the actually chosen location,
including the name of the tar file.
:::

Copy the following text, change the `RELEASE_NAMESPACE` value to the namespace where
Epinio was installed into (by default it is `epinio`) and add it to a file of your choice:

```
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

This How-To now simply assumes that the chosen file is named:

```
fluentd-appchart.yaml
```

:::info
This is a Kubernetes custom resource, which will describe the new Helm chart to Epinio.  In this
example, it provides the information about the name, the source and descriptions.
:::

The necessary Kubernetes CRD is provided by the Epinio installation.

Apply this resource to the Epinio cluster:

```
kubectl apply -f fluentd-appchart.yaml
```

Verify that the new chart is now registered in Epinio:

```
epinio app chart list
```

You can also see the details of the chart in Epinio:

```
epinio app chart show fluent
```

## User-settable configuration values

To expose some user-settable configuration value `foo` the created application chart has to look for
this variable in the `.Values.userConfig` map, i.e. it has to use the helm variable
`.Values.userConfig.foo`.

:::caution
The chart is expected to use a sensible default value when this helm variable is not set.
:::

With the application chart exposing `foo` as described above Epinio has to be made aware of the
configuration value by adding a specification to the `AppChart` resource describing it.

This is done by adding an entry `foo` to the `spec.settings` map of the AppChart resource.  This
entry is itself a map, with a mandatory `type` field, and type-dependent __optional__ restrictions
on the valid values of `foo`.

Example:

```
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

|Type      |Restriction |Semantics                   |
|---       |---         |---                         |
|`integer` |`minimum`   |Minimum valid integer value |
|          |`maximum`   |Maximum valid integer value |
|`number`  |`minimum`   |s.a., floating point        |
|          |`maximum`   |s.a., floating point        |
|`string`  |`enum`      |Sequence of valid values    |
|`bool`    |n/a         |                            |

Restrictions set on a type not supporting them, for example a `minimum` on a `string`-type
configuration value, are ignored.

:::caution
The restriction values have to be YAML __strings__, regardless the type of the configuration value.
Note how in the example above the `maximum` and `minimum` values are quoted to make them strings.
:::

## Troubleshooting

If the new Helm chart is not correctly registered in Epinio, check that the
`RELEASE_NAMESPACE` was properly set in `fluentd-appchart.yaml`.

## Going further

The standard app chart, as well as the chart created here use a kubernetes `Deployment` as
the main resource describing the active application.

Up to Epinio version 1.0, this was the only kind of resource supported.

Since Epinio version 1.0+, other kinds of controllers, for example `StatefulSet`, are supported.

However, even when changing controllers, it is important to keep the `Pod` annotations and
labels the same as for the standard chart. This allows Epinio's server to locate the required resources and
use them properly.

Here's a couple of examples:

  1. `epinio.io/stage-id` provides the id of the staging Pod which created the application's image.

  1. `epinio.io/app-container` provides the name of the application's main `Container`,
     which is used by `epinio exec`. This label has to match the actual name of the
     container in the pod spec.
