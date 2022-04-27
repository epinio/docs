---
sidebar_label: "How To use custom application Helm charts"
title: ""
---

# Introduction

Epinio deploys applications on Kubernetes as [Helm charts](https://helm.sh/).

While a standard Helm chart is provided for this purpose when Epinio is installed more can
be [created and added by the operators](create_custom_appcharts.md).

How developers can use the Helm charts created by the operators when deploying their
applications is described here.


# Listing the available Helm charts

See the set of available Helm charts by invoking

```
$ epinio app chart list
```

For an unmodified Epinio installation the output will show only the standard chart Epinio
comes with:

```
| DEFAULT |   NAME   |        DESCRIPTION         |
|---------|----------|----------------------------|
|         | standard | Epinio standard deployment |
```


# Deploying applications with a custom Helm chart

Use the option `--app-chart` to specify the name of the custom Helm chart to use when
created, updating, or deploying an application.

As implied by the previous paragraph, `--app-chart` is accepted by the cli commands

  - [epinio app create](../references/cli/epinio_app_create.md)
  - [epinio app update](../references/cli/epinio_app_update.md)
  - [epinio push](../references/cli/epinio_push.md)

The argument of the option is the name of custom Helm chart to use, as shown when listing
the available charts.

__Beware__ that changing the chart to use is __not possible__ if the application has an
active workload.

To switch a deployed application from one Helm chart to a different chart it is necessary
to delete it, and then re-deploy.

Scaling the application to zero instances is __not sufficient__. While that effectively
stops the application it does not remove the deployed workload, just the underlying active
elements.


# Setting a default Helm chart

Using the `--app-chart` option as described in the previous section is mostly sensible for
single or few deployments requiring a custom Helm chart.

If the majority of applications use a specific custom chart `FOO` it makes more sense to
set `FOO` as the default chart.

Instead of using `--appchart FOO` on every deployment invoke

```
$ epinio app chart default FOO
```

Now all future invokations of `epinio push` will use `FOO` as the Helm chart.
If not overridden again by a `--app-chart` option.

__Note__ that this default is a __local__ setting. It affects only the developer who made
 the change.


# Querying the default Helm chart

To query if there is a currently active default, and what it is set to invoke the command

```
$ epinio app chart default
```

Note that the configured default is also made visible when listing the available charts.
In the example output below the chart `foo` is marked as the currently active default.

```
| DEFAULT |   NAME   |        DESCRIPTION         |
|---------|----------|----------------------------|
| *       | foo      | Foofy deployment           |
|         | standard | Epinio standard deployment |
```


# Unsetting the default Helm chart

To restore the use of the system default (`standard`) invoke the command

```
$ epinio app chart default ''
```

Note the __empty string__ used in place of the chart name. This is the signal to unset the
current setting.
