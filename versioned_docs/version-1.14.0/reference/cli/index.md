---
sidebar_label: "Command index"
sidebar_position: 0
title: "Epinio CLI command index"
description: A grouped index of every epinio CLI command, with links to the full reference for each.
keywords: [epinio, cli, commands, reference, cheatsheet]
---

# Epinio CLI command index

Every `epinio` command, grouped by what it acts on. Each entry links to its full
reference page (flags, arguments, and examples). For the root command and global
flags, see [`epinio`](./epinio.md).

:::tip First time here?
If you have not installed the CLI yet, start with
[Install the CLI](../../getting-started/install-cli.md), then run through the
[Quickstart](../../getting-started/quickstart.mdx).
:::

## Session

| Command | What it does |
| --- | --- |
| [`epinio login`](./epinio_login.md) | Authenticate against an Epinio server and save credentials |
| [`epinio logout`](./epinio_logout.md) | Remove saved credentials for the current server |
| [`epinio target`](./epinio_target.md) | Set the namespace that subsequent commands act on |
| [`epinio info`](./epinio_info.md) | Show server and component version information |
| [`epinio settings`](./settings/epinio_settings.md) | Manage local CLI settings |

## Applications

| Command | What it does |
| --- | --- |
| [`epinio push`](./epinio_push.md) | Build, stage, and deploy an application from sources |
| [`epinio app`](./app/epinio_app.md) | Top-level command for application management |
| [`epinio app list`](./app/epinio_app_list.md) | List applications in the targeted namespace |
| [`epinio app show`](./app/epinio_app_show.md) | Show details for an application |
| [`epinio app logs`](./app/epinio_app_logs.md) | Stream or print application logs |
| [`epinio app exec`](./app/epinio_app_exec.md) | Open a shell inside a running application |
| [`epinio app port-forward`](./app/epinio_app_port-forward.md) | Forward a local port to an application |
| [`epinio app env`](./app/env/epinio_app_env.md) | Manage application environment variables |
| [`epinio app chart`](./app/chart/epinio_app_chart.md) | Inspect and select application charts |

## Configurations

| Command | What it does |
| --- | --- |
| [`epinio configuration`](./configuration/epinio_configuration.md) | Top-level command for configuration management |
| [`epinio configuration create`](./configuration/epinio_configuration_create.md) | Create a configuration |
| [`epinio configuration bind`](./configuration/epinio_configuration_bind.md) | Bind a configuration to an application |
| [`epinio configuration list`](./configuration/epinio_configuration_list.md) | List configurations |

## Services

| Command | What it does |
| --- | --- |
| [`epinio service`](./service/epinio_service.md) | Top-level command for service management |
| [`epinio service catalog`](./service/epinio_service_catalog.md) | Browse the service catalog |
| [`epinio service create`](./service/epinio_service_create.md) | Provision a service from the catalog |
| [`epinio service bind`](./service/epinio_service_bind.md) | Bind a service to an application |

## Namespaces

| Command | What it does |
| --- | --- |
| [`epinio namespace`](./namespace/epinio_namespace.md) | Top-level command for namespace management |
| [`epinio namespace create`](./namespace/epinio_namespace_create.md) | Create a namespace |
| [`epinio namespace list`](./namespace/epinio_namespace_list.md) | List namespaces |

## Git configurations

| Command | What it does |
| --- | --- |
| [`epinio gitconfig`](./gitconfig/epinio_gitconfig.md) | Top-level command for git configuration management |
| [`epinio gitconfig create`](./gitconfig/epinio_gitconfig_create.md) | Register a git configuration for private sources |

## Operator and automation

| Command | What it does |
| --- | --- |
| [`epinio server`](./epinio_server.md) | Run the Epinio API server |
| [`epinio client-sync`](./epinio_client-sync.md) | Sync the CLI binary to match the server version |
| [`epinio export-registries`](./epinio_export-registries.md) | Manage registries used for application export |
| [`epinio completion`](./epinio_completion.md) | Generate shell completion scripts |
| [`epinio version`](./epinio_version.md) | Print the CLI version |
