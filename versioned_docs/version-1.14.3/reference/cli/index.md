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
| [`epinio version`](./epinio_version.md) | Print the CLI version |
| [`epinio client-sync`](./epinio_client-sync.md) | Download a client binary matching the logged-in server |

## Settings

| Command | What it does |
| --- | --- |
| [`epinio settings`](./settings/epinio_settings.md) | Top-level command for local CLI settings |
| [`epinio settings show`](./settings/epinio_settings_show.md) | Show the current settings |
| [`epinio settings colors`](./settings/epinio_settings_colors.md) | Manage colored output |
| [`epinio settings update-ca`](./settings/epinio_settings_update-ca.md) | Update the API location and CA certificate |

## Deploying

| Command | What it does |
| --- | --- |
| [`epinio push`](./epinio_push.md) | Build, stage, and deploy an application from sources or a manifest |
| [`epinio app push`](./app/epinio_app_push.md) | Same as `epinio push` |
| [`epinio app restage`](./app/epinio_app_restage.md) | Rebuild an existing application, then restart it unless suppressed |
| [`epinio app restart`](./app/epinio_app_restart.md) | Restart the application without rebuilding |
| [`epinio app watch`](./app/epinio_app_watch.md) | Watch a local directory and sync changes into the running app (experimental) |

## Applications

| Command | What it does |
| --- | --- |
| [`epinio app`](./app/epinio_app.md) | Top-level command for application management |
| [`epinio app list`](./app/epinio_app_list.md) | List applications in the targeted namespace |
| [`epinio app show`](./app/epinio_app_show.md) | Describe an application: status, instances, routes, bindings, environment |
| [`epinio app create`](./app/epinio_app_create.md) | Create the app record without deploying a workload |
| [`epinio app update`](./app/epinio_app_update.md) | Change instances, environment, routes, bindings, or chart values |
| [`epinio app delete`](./app/epinio_app_delete.md) | Delete one or more applications |
| [`epinio app manifest`](./app/epinio_app_manifest.md) | Save the current state of an application as a manifest |
| [`epinio app export`](./app/epinio_app_export.md) | Export an application to a directory or registry |

## Debugging

| Command | What it does |
| --- | --- |
| [`epinio app logs`](./app/epinio_app_logs.md) | Stream or print runtime and staging logs |
| [`epinio app exec`](./app/epinio_app_exec.md) | Open a shell inside a running application instance |
| [`epinio app port-forward`](./app/epinio_app_port-forward.md) | Forward one or more local ports to an application pod |
| [`epinio service port-forward`](./service/epinio_service_port-forward.md) | Forward one or more local ports to a service |

## Environment variables

| Command | What it does |
| --- | --- |
| [`epinio app env`](./app/env/epinio_app_env.md) | Top-level command for application environment variables |
| [`epinio app env list`](./app/env/epinio_app_env_list.md) | List an application's environment |
| [`epinio app env show`](./app/env/epinio_app_env_show.md) | Describe a single environment variable |
| [`epinio app env set`](./app/env/epinio_app_env_set.md) | Add or change an environment variable |
| [`epinio app env unset`](./app/env/epinio_app_env_unset.md) | Remove an environment variable |

## Application charts

| Command | What it does |
| --- | --- |
| [`epinio app chart`](./app/chart/epinio_app_chart.md) | Top-level command for application chart management |
| [`epinio app chart list`](./app/chart/epinio_app_chart_list.md) | List application charts |
| [`epinio app chart show`](./app/chart/epinio_app_chart_show.md) | Describe an application chart |
| [`epinio app chart default`](./app/chart/epinio_app_chart_default.md) | Set or show the default application chart |
| [`epinio app chart create`](./app/chart/epinio_app_chart_create.md) | Create an application chart |
| [`epinio app chart update`](./app/chart/epinio_app_chart_update.md) | Update an application chart |
| [`epinio app chart delete`](./app/chart/epinio_app_chart_delete.md) | Delete an application chart |

## Builder images

| Command | What it does |
| --- | --- |
| [`epinio buildimage`](./buildimage/epinio_buildimage.md) | Top-level command for builder image management |
| [`epinio buildimage list`](./buildimage/epinio_buildimage_list.md) | List builder images |
| [`epinio buildimage show`](./buildimage/epinio_buildimage_show.md) | Describe a builder image |
| [`epinio buildimage create`](./buildimage/epinio_buildimage_create.md) | Create a builder image |
| [`epinio buildimage update`](./buildimage/epinio_buildimage_update.md) | Update a builder image |
| [`epinio buildimage delete`](./buildimage/epinio_buildimage_delete.md) | Delete a builder image |

## Configurations

| Command | What it does |
| --- | --- |
| [`epinio configuration`](./configuration/epinio_configuration.md) | Top-level command for configuration management |
| [`epinio configuration list`](./configuration/epinio_configuration_list.md) | List configurations |
| [`epinio configuration show`](./configuration/epinio_configuration_show.md) | Describe a configuration |
| [`epinio configuration create`](./configuration/epinio_configuration_create.md) | Create a configuration |
| [`epinio configuration update`](./configuration/epinio_configuration_update.md) | Add, change, or remove keys on an existing configuration |
| [`epinio configuration delete`](./configuration/epinio_configuration_delete.md) | Delete one or more configurations |
| [`epinio configuration bind`](./configuration/epinio_configuration_bind.md) | Bind a configuration to an application |
| [`epinio configuration unbind`](./configuration/epinio_configuration_unbind.md) | Unbind a configuration from an application |

## Services

| Command | What it does |
| --- | --- |
| [`epinio service`](./service/epinio_service.md) | Top-level command for service management |
| [`epinio service list`](./service/epinio_service_list.md) | List services in the targeted namespace |
| [`epinio service show`](./service/epinio_service_show.md) | Describe a service |
| [`epinio service create`](./service/epinio_service_create.md) | Provision a service from a catalog service |
| [`epinio service update`](./service/epinio_service_update.md) | Change the settings of a provisioned service |
| [`epinio service delete`](./service/epinio_service_delete.md) | Delete one or more services |
| [`epinio service bind`](./service/epinio_service_bind.md) | Bind a service to an application |
| [`epinio service unbind`](./service/epinio_service_unbind.md) | Unbind a service from an application |

## Service catalog

| Command | What it does |
| --- | --- |
| [`epinio service catalog`](./service/catalog/epinio_service_catalog.md) | List catalog services, or describe one |
| [`epinio service catalog create`](./service/catalog/epinio_service_catalog_create.md) | Create a catalog service |
| [`epinio service catalog update`](./service/catalog/epinio_service_catalog_update.md) | Update a catalog service |
| [`epinio service catalog delete`](./service/catalog/epinio_service_catalog_delete.md) | Delete a catalog service |

## Namespaces

| Command | What it does |
| --- | --- |
| [`epinio namespace`](./namespace/epinio_namespace.md) | Top-level command for namespace management |
| [`epinio namespace list`](./namespace/epinio_namespace_list.md) | List namespaces |
| [`epinio namespace show`](./namespace/epinio_namespace_show.md) | Describe a namespace |
| [`epinio namespace create`](./namespace/epinio_namespace_create.md) | Create a namespace |
| [`epinio namespace delete`](./namespace/epinio_namespace_delete.md) | Delete a namespace |

## Git configurations

| Command | What it does |
| --- | --- |
| [`epinio gitconfig`](./gitconfig/epinio_gitconfig.md) | Top-level command for git configuration management |
| [`epinio gitconfig list`](./gitconfig/epinio_gitconfig_list.md) | List git configurations |
| [`epinio gitconfig show`](./gitconfig/epinio_gitconfig_show.md) | Describe a git configuration |
| [`epinio gitconfig create`](./gitconfig/epinio_gitconfig_create.md) | Register credentials for a private git repository |
| [`epinio gitconfig delete`](./gitconfig/epinio_gitconfig_delete.md) | Delete one or more git configurations |

## Operator and automation

| Command | What it does |
| --- | --- |
| [`epinio server`](./epinio_server.md) | Run the Epinio API server |
| [`epinio export-registries`](./epinio_export-registries.md) | List registries used for application export |
| [`epinio completion`](./epinio_completion.md) | Generate shell completion scripts |

## Driving the CLI with an AI agent

| Resource | What it does |
| --- | --- |
| [Agent skill](./agent-skill.md) | Downloadable skill that teaches an AI assistant to manage Epinio through these commands, for environments without the [MCP server](../mcp.md) |
