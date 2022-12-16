---
sidebar_label: "How To Use Custom Application Helm Charts"
sidebar_position: 14
title: ""
---

# Introduction

Epinio deploys applications on Kubernetes as [Helm charts](https://helm.sh/).

By default, a standard Helm chart is provided when Epinio is installed.
However, operators may wish to [create and register custom charts](create_custom_appcharts.md) specific to their environment.

Once the custom charts are registered in Epinio, the developers can use them when deploying their
applications as described in this How-To.


# Listing the available Helm charts

You can list the available Helm charts by running the following command:

```
$ epinio app chart list
```

As an example, here is the output of an unmodified Epinio installation:

```
| DEFAULT |   NAME   |        DESCRIPTION         |
|---------|----------|----------------------------|
|         | standard | Epinio standard deployment |
```

The output will only list the ` standard` Helm chart, which Epinio installs by default.

# Deploying applications with a custom Helm chart

Use the option `--app-chart` to specify the name of the custom Helm chart to use when
creating, updating, or deploying an application.

For detailed information on the `--app-chart` setting, see the following CLI commands pages:

  - [epinio app create](../references/commands/cli/app/epinio_app_create.md)
  - [epinio app update](../references/commands/cli/app/epinio_app_update.md)
  - [epinio push](../references/commands/cli/epinio_push.md)


:::caution
Changing the chart to use is __not possible__ if the application has an
active workload.

To switch a deployed application to a different Helm chart, you will have to
delete and re-deploy the application.
:::


:::info
Scaling the application to zero instances is __not sufficient__. While that effectively
stops the application it does not remove the deployed workload, just the underlying active
elements.
:::


# Setting a default Helm chart

The `--app-chart` option described in the previous section is more suitable for
single or few deployments requiring a custom Helm chart.

However, if the majority of applications use a specific custom chart, for example `FOO`, it makes more sense to
change the default chart.

You can set a custom chart as the default by running the following command:

```
$ epinio app chart default FOO
```

Now, all future invocations of `epinio push` will use the custom Helm chart set as default.
You will be able to override it with the `--app-chart` option, as described above.

:::note
The `default` chart is a __local__ setting. It affects only the developer who made
 the change.
 :::


# Querying the default Helm chart

You can check which chart is set as `default` by running the following command:

```
$ epinio app chart default
```

You can also check which chart is set as `default` when listing the available charts.
As an example, the output below shows the chart `FOO` as the current default:

```
| DEFAULT |   NAME   |        DESCRIPTION         |
|---------|----------|----------------------------|
| *       | FOO      | Foofy deployment           |
|         | standard | Epinio standard deployment |
```


# Unsetting the default Helm chart

You can set the system chart `standard` back as the default, by running the following command:

```
$ epinio app chart default ''
```

:::note
The __empty string__ used in place of the chart name is mandatory. If you do not add it,
the command will only list the charts available.
:::
