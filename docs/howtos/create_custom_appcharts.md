---
sidebar_label: "How To create custom application Helm charts"
title: ""
---

# Introduction

Epinio deploys applications on Kubernetes as [Helm charts](https://helm.sh/).

While a standard Helm chart is provided for this purpose when Epinio is installed
operators may wish to create and register custom charts specific to their environment with
Epinio for [use by their developers](using_custom_appcharts.md).

# Setting up a custom Helm chart

To add a custom Helm chart to the system it is necessary to

  1. Create the chart, and then
  2. Make it known to the Epinio installation

The following two sections explain these steps in detail.

## Creating the Helm chart

Instead of starting from scratch use the standard chart provided by Epinio itself as
starting point.

The sources of that chart live at https://github.com/epinio/helm-charts/tree/main/chart/application

Clone that repository and make the chart directory your working directory.

```
$ git clone https://github.com/epinio/helm-charts.git
$ cd helm-charts/chart/application
```

In this How-To we now create a variant of the chart which adds an annotation to every
application `Deployment` which enables the filtering of Epinio applications in
[fluentd](https://www.fluentd.org/).

Note that explanations about setting up and using `fluentd` are out of scope here.

Use your editor of choice to edit the file `templates/deployment.yaml`.
This file is the template for the application's Deployment resource.

In section

```
[...]
  template:
    metadata:
      annotations:
        app.kubernetes.io/name: {{ .Values.epinio.appName }}
[...]
```

add the annotations

```
fluentd-enable: "true"
fluentd-application-name: {{ .Values.epinio.appName }}
```

The result should look like

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

The file `values.yaml` in the chart explains the full set of values Epinio sets when
deploying an application through the chart.

With the chart now properly modified use the commands below to move to the toplevel of the
repository and then package the changed chart into a tarball.

```
$ cd ../..
$ helm package chart/application
```

The tarball is placed into the current working directory and has the form
`application-VERSION.tar.gz` where `VERSION` is the chart version.

Note that in this How-To we have not attempted to change the chart version. Versioned
chart development is out of scope here.


## Making the helm Chart known to Epinio

The first step in making the new chart created in the previous section available to Epinio
is to place the generated tarball on some publicly accessible server.

Given the plethora of possible options this How-To simply assumes that the tarball is
available at the example URL

```
https://mydomain.org/epinio-application-0.1.15-fluentd.tgz
```

Now save

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

into a file of your choice and change `RELEASE_NAMESPACE` to be the namespace Epinio was
installed into. The default is `epinio`.

This is a kubernetes custom resource describing the new Helm chart to Epinio, i.e. what it
is named, where it is found, and some descriptions of various lengths.

The necessary CRD is provided by the Epinio installation.

Apply this resource to the Epinio cluster using

```
$ kubectl apply -f /path/to/your/file
```

Verify that the new chart is now known to Epinio by invoking

```
$ epinio app chart list
```

and/or

```
$ epinio app chart show fluent
```

If this fails check that the `RELEASE_NAMESPACE` was properly set in the CR.
