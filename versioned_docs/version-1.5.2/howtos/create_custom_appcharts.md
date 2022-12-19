---
sidebar_label: "Creating Custom Application Helm Charts"
sidebar_position: 13
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

## Creating the Helm chart

Instead of starting from scratch, you can use the standard chart provided by Epinio as a
template.

You can download the chart directly from [here](https://github.com/epinio/helm-charts/tree/main/chart/application)
or, you can clone the [Epinio Helm chart repo](https://github.com/epinio/helm-charts.git).
The chart is located in `helm-charts/chart/application`.

```
$ git clone https://github.com/epinio/helm-charts.git
```

In this How-To, we will create a variant of the chart by adding an annotation to every
application `Deployment`. The annotation will enable the filtering of Epinio applications
in [fluentd](https://www.fluentd.org/).

> Note: explanations about setting up and using `fluentd` are out of scope for this How-To.

Open the file `helm-charts/chart/application/templates/deployment.yaml` in your editor of
choice.  This file is the template for the application's Deployment resource.

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

The file `helm-charts/chart/application/values.yaml` in the chart explains the full set of
values Epinio sets when deploying an application through the chart.

Once you modified the chart to your needs, use the following command to package the
changed chart into a tarball:

```
$ helm package helm-charts/chart/application
```

The tarball is placed into the current working directory and the filename should be
`application-VERSION.tar.gz` where `VERSION` is the chart version.

> Note: We didn't change the chart version. Versioned chart development is out of scope
> for this How-To.


## Making the helm Chart known to Epinio

Once the new chart created, as decribed in the previous section, you have to place the
generated tarball on an accessible web server (i.e. public cloud, company's hosted web
server, etc).

Given the plethora of possible options, this How-To simply assumes that the tarball is
available at the example URL:

```
https://mydomain.org/epinio-application-0.1.15-fluentd.tgz
```

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
  description: Epinio standard support chart extended for fluent filtering
  helmChart: https://mydomain.org/epinio-application-0.1.15-fluentd.tgz
```

This How-To now simply assumes that the chosen file is named:

```
fluentd-appchart.yaml
```

> Information: this is a Kubernetes custom resource, which will describe the new Helm
> chart to Epinio.  In this example, it provides the information about the name, the
> source and descriptions.

The necessary Kubernetes CRD is provided by the Epinio installation.

Apply this resource to the Epinio cluster:

```
$ kubectl apply -f fluentd-appchart.yaml
```

Verify that the new chart is now registered in Epinio:

```
$ epinio app chart list
```

You can also see the details of the chart in Epinio:

```
$ epinio app chart show fluent
```

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
