---
title: ""
sidebar_label: "Application Charts"
---

# Customization point: Application Charts

Epinio uses Application charts as templates for the structure of deployed applications,
i.e. of the kubernetes resources used to run an application image.

An installation of Epinio provides a single standard application chart.

If custom application charts adapted to the local environment are desired or needed please
follow the instructions on
[How To create custom application Helm charts](../../howtos/create_custom_appcharts.md)
and
[How To use custom application Helm charts](../../howtos/using_custom_appcharts.md).

Application charts are expected to create the following resources:

  - A `Deployment`, `StatefulSet`, or similar main controller, specifying the `Pod` and
    its containers running the application image.

  - A `Service` to route web requests to the application.

  - An [Ingress](lb.md) per specified route to front the `Service`.

:::note

Up to version 1 Epinio allowed only `Deployment` resources as the main controller of
applications.

:::

:::tip

Read the [contents of the standard application chart](https://github.com/epinio/helm-charts/tree/main/chart/application).

:::

# Further Expectations

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

All configuration fields below are provied in the `epinio` hierarchy:

|Name			|Kind			|Meaning							|
|---			|---			|---								|
|`appName`      	|string                 |The application's name						|
|`configurations`	|sequence (string)      |The names of the configurations to import into the application	|
|`env`          	|sequence (assignment)  |The application's environment variables and their values 	|
|`imageURL`     	|string                 |A reference to the app image in Epinio's registry		|
|`ingress`      	|string                 |The ingress class name to use, if any				|
|`replicaCount` 	|integer                |The desired number of instances (pods) to deploy		|
|`routes`       	|sequence (route)       |The routes (= domain+path+id) the app has to be reachable at	|
|`stageID`      	|string                 |Id of the stage run which generated the app image		|
|`start`        	|integer                |Optional. The time of deployment, in nanoseconds    		|
|`tlsIssuer`    	|string                 |The name of the cert issuer to use for route certs		|
|`username`     	|string                 |The name of the user deploying the application			|

Routes are maps composed of four keys:

|Name		|Kind	|Meaning								|
|---		|---	|---									|
|`domain`	|string	|The domain of the route						|
|`id`		|string	|A unique id to name route `Ingress` and `Certificate` resources with	|
|`path`		|string	|The sub-path of the route, if any					|
|`secret`	|string	|Optional. Name of a `Secret` to directly use in securing the `Ingress`	|

:::note

The [Routing Secrets](routing_secrets.md) reference explains more about the `secrets` field.

:::

Environment assigment are maps composed of two keys:

|Name	|Kind	|Meaning			|
|---	|---	|---				|
|`name`	|string	|The name of the variable	|
|`value`|string	|The value of the variable	|

## Pods

Epinio adds the following annotations to the `Pods`:

|Annotation			|Meaning							|
|---				|---								|
|`app.kubernetes.io/name`	|The application's name.					|
|`epinio.io/start`		|The time of deployment, in nanoseconds, if provided by Epinio	|

Epinio adds the following labels to the `Pods`:

|Label				|Meaning							|
|---				|---								|
|`app.kubernetes.io/component`	|Fixed: `application`						|
|`app.kubernetes.io/created-by`	|The name of the user deploying the application			|
|`app.kubernetes.io/managed-by`	|Fixed: `epinio`      	  	     	     	     		|
|`app.kubernetes.io/name`	|The application's name.					|
|`app.kubernetes.io/part-of`	|The application's namespace	    				|
|`epinio.io/app-container`	|The name of the main Pod container, running the app image	|
|`epinio.io/stage-id`		|Id of the stage run which generated the app image		|
|`helm.sh/chart`		|Chart name and version used to deploy the application		|

:::tip

Read the [contents of the standard application chart](https://github.com/epinio/helm-charts/tree/main/chart/application).

:::

# Related

  - [Routing Secrets](routing_secrets.md)
