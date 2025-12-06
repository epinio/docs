---
sidebar_label:  Custom application Helm charts
sidebar_position: 16
title: Using custom application Helm charts
description: How to use custom application Helm charts.
keywords: [epinio, kubernetes, custom application helm chart]
doc-type: [how-to]
doc-topic: [epinio, how-to, other, custom-app-chart]
doc-persona: [epinio-developer, epinio-operator]
---

Epinio deploys applications on Kubernetes as [Helm charts](https://helm.sh/).

By default, a standard Helm chart is provided at Epinio installation time.
However, operators may wish to
[create and register custom charts](../customization/create_custom_appcharts.md)
specific to their environment.

After developers have registered custom charts in Epinio,
developers can use them when deploying their applications as described here.

## Listing the available Helm charts

You can list the available Helm charts by running the following command:

```console
epinio app chart list
```

For example, this is the output of an unmodified Epinio installation:

```console
| DEFAULT |   NAME   |        DESCRIPTION         |
|---------|----------|----------------------------|
|         | standard | Epinio standard deployment |
```

The output only lists the `standard` Helm chart,
which Epinio installs by default.

## Deploying applications with a custom Helm chart

Use the option `--app-chart` to specify the name of the custom Helm chart
to use when creating, updating, or deploying an application.

For detailed information on the `--app-chart` setting, see the following CLI commands pages:

- [epinio app create](../../references/commands/cli/app/epinio_app_create.md)
- [epinio app update](../../references/commands/cli/app/epinio_app_update.md)
- [epinio push](../../references/commands/cli/epinio_push.md)

:::caution

Changing the chart to use **isn't possible** if the application has an active workload.

To switch a deployed application to a different Helm chart,
you have to delete and re-deploy the application.

Scaling the application to zero instances **isn't enough**.
While that stops the application it doesn't remove the deployed workload,
just the underlying active elements.

:::

## Deploying applications with a custom Helm chart which has user-settable configuration values

The general mechanism is the same as described in the earlier section.

However, use the option `--chart-value` to specify name and value of a single user-settable configuration value.
Use the option as many times as needed to set all the desired configuration values.

For example:

```console
epinio push --name APPNAME --path APPSOURCEPATH --app-chart CHARTNAME --chart-value CVNAME=VALUE ...
```

:::note

User-settable configuration values are usually optional.
The application chart should contain sensible defaults for all configuration values not set by the user.

:::

## Setting a default Helm chart

The `--app-chart` option described in the earlier section is more suitable for single
or a small number requiring a custom Helm chart.

However, if most applications use a specific custom chart,
for example, `FOO`,
it makes more sense to change the default chart.

You can set a custom chart as the default by running the following command:

```console
epinio app chart default FOO
```

Now, all future invocations of `epinio push` uses the custom Helm chart set as default.
You can override it with the `--app-chart` option, described above.

:::note

The `default` chart is a **local** setting. It affects only the local developer's environment.

:::

## Querying the default Helm chart

You can check which chart is the `default` by running the following command:

```console
epinio app chart default
```

You can check which chart is the `default` when listing the available charts.
For example, the output below shows the chart `FOO` as the current default:

```console
| DEFAULT |   NAME   |        DESCRIPTION         |
|---------|----------|----------------------------|
| *       | FOO      | Foofy deployment           |
|         | standard | Epinio standard deployment |
```

## Reset to the default Helm chart

You can set the system chart `standard` back as the default, by running the following command:

```console
epinio app chart default ''
```

:::note

You need the **empty string** used in place of the chart name.
If you don't add it,
the command only lists the charts available.

:::
