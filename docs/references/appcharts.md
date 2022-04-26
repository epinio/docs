
NOTES:

  - As is this document feels like a mixture of howto and tutorial.
  - It definitely is not a reference.
  - TODO - Work towards either H or T and move to the proper section. Possibly split.
  - Possibly also split per addressed role (operator / developer)
  - Do these after the main blocks of text are known/written.

QUESTION:

  - Should we remove the `epinio app chart create` command?  The operators have
    kubectl access and can create resources with yaml.  We don't want developers
    to mess with how applications are deployed. We should write section `Making
    a custom helm chart known to Epinio` after this is known.

# Additional Application Helm charts

Epinio deploys applications on Kubernetes as [Helm charts](https://helm.sh/).
While a standard Helm chart for this purpose is provided when Epinio is
installed more can be added by the operators.  The developers can use the Helm
charts created by the operators when deploying their applications.

This separation of concerns allows operators to define multiple ways of
deploying an application without developers having to know the internals.

This page describes how

  1. An operator can create a custom Helm chart, and how
  2. Developers can make use of such charts.

## Operators

### Creating a custom Helm chart

A good starting point is the default (or "standard") Epinio Helm chart. The source code for that lives here: https://github.com/epinio/helm-charts/tree/main/chart/application
Start by cloning that git repository:

```
$ git clone https://github.com/epinio/helm-charts.git
$ cd helm-charts/chart/application
```

Now let's make a little modification to this helm chart. Let's assume we want to add an annotation to every application Deployment so that we can use it to filter the Epinio applications in [fluentd](https://www.fluentd.org/). In this example we won't describe how to setup fluend for this, we will only focus on how a custom Helm chart can be used to add an annotation to the application Deployment.

In the [Deployment template](https://github.com/epinio/helm-charts/blob/main/chart/application/templates/deployment.yaml) in the [annotations section](https://github.com/epinio/helm-charts/blob/117d76834ba9578c2a594989397e61edf19c2708/chart/application/templates/deployment.yaml#L15), add the following annotations:

```
fluentd-enable: "true"
fluentd-application-name: {{ .Values.epinio.appName }}
```

As you can see, we expect Epinio to set the `.epinio.appName` value. There are more values Epinio sets, which can be found [in the values.yaml file](https://github.com/epinio/helm-charts/blob/main/chart/application/values.yaml)

Now it's time to build our modified helm chart. From the root of the checked-out
repository (see above):

```
$ helm package chart/epinio
```

This will create a tarball of the helm chart in the current directory.

> Normally we should at least also change the version of the Chart. The subject
> of this document is not Helm chart development though, so we keep things simple.

Now we need to copy this tarball on some publicly accessible server. There are
many options for this. For this guide, we will assume the helm chart tarball is
accessible on this example URL:

```
https://mydomain.org/epinio-0.8.1-custom.tgz
```

### Making a custom helm chart known to Epinio

___...___

## Developers

### Listing the available Helm charts

A developer can see the set of available Helm charts by invoking

```
epinio app chart list
```

An unmodified Epinio installation will show only the standard chart it comes with, i.e.

```
| DEFAULT |   NAME   |        DESCRIPTION         |
|---------|----------|----------------------------|
|         | standard | Epinio standard deployment |
```

If operators have installed more charts the output will extend appropriately.

### Deploying application with a custom Helm chart

Use the option `--app-chart` to specify the name of the custom Helm chart to use
when created, updating, or deploying an application.

As implied by the previous paragraph, this option is accepted by the commands

  - [epinio app create](../references/cli/epinio_app_create.md)
  - [epinio app update](../references/cli/epinio_app_update.md)
  - [epinio push](../references/cli/epinio_push.md)

The argument of the option is the name of custom Helm chart to use, as shown
when listing the available charts.

__Beware__ that changing the chart to use is __not possible__ if the application
has an active workload.

Switching a deployed application from one Helm chart to a different chart
requires deleting it and then re-deploying.

### Changing the default Helm chart

If a specific custom Helm chart is to be used for many deployment using the
`--app-chart` option for each will easily become tiring.

In that case making the chart the default for deploying applications may make sense.
__Note__ that this default we are speaking of is __local__.
Changing it affects only the developer making change, and none else.

Change it by invoking the command

```
epinio app chart default NAME
```

where `NAME` is the name of the desired chart.
The same as would be given to an `--app-chart` option.

Use the command

```
epinio app chart default
```

i.e. without a chart name argument to query the currently active default, if any.

To unset the default, i.e. restore use of the system default (`standard`) use the command

```
epinio app chart default ''
```

Note the __empty string__ used for the chart name. This removes the default.

When listing the available charts a possible default will be highlighted in the
output. As example, in

```
| DEFAULT |   NAME   |        DESCRIPTION         |
|---------|----------|----------------------------|
| *       | foo      | Foofy deployment           |
|         | standard | Epinio standard deployment |
```

the `foo` chart is set as default.
