---
sidebar_label: "MCP Server"
sidebar_position: 4
title: "Epinio MCP Server Reference"
description: The Model Context Protocol server that exposes Epinio as tools for AI agents, and the optional elevated tier.
keywords: [epinio, mcp, model context protocol, ai, agent, tools, claude]
doc-type: [reference]
doc-persona: [epinio-developer, epinio-operator]
doc-topic: [epinio, reference, mcp]
---

The [Epinio MCP server](https://github.com/epinio/mcp) is a
[Model Context Protocol](https://modelcontextprotocol.io) server that exposes the
Epinio API as tools for AI agents such as Claude and other MCP-compatible clients.
It translates MCP tool calls into Epinio REST API requests, so an agent can deploy
and manage applications on your cluster through conversation.

:::caution Beta
The MCP server is in beta. Tool names and options may still change, and it is
not yet recommended for production use.
:::

To stand it up on your cluster, see [Install the MCP server](../getting-started/install-mcp).

## How it connects

The server sits between an AI agent and an Epinio instance, speaking MCP to the
agent and the Epinio REST API to the cluster:

```text
AI Agent (Claude, etc.)
    | MCP protocol (Streamable HTTP, served at the server root)
Epinio MCP Server
    | REST API (Basic Auth or OIDC, TLS)
Epinio API Server
    | Kubernetes API
Kubernetes Cluster
```

Authentication is per request: the agent passes an `Authorization` header
(`Bearer <token>` or `Basic <base64(user:pass)>`) that the server forwards to
Epinio. When no header is present, the server falls back to the credentials it was
configured with (default `admin` / `password`).

By default every tool wires **only** to the Epinio REST API, as the calling user.
An optional [elevated tier](#elevated-tier) that reaches directly into Kubernetes
is off unless explicitly enabled.

## Core tools

These are always available and act purely through the Epinio API.

### Server and namespaces

| Tool | Description |
| --- | --- |
| `epinio_info` | Get server version, Kubernetes version, and platform info. |
| `list_namespaces` | List all namespaces with their apps and configurations. |
| `create_namespace` | Create a new namespace. |
| `delete_namespace` | Delete a namespace and all its resources. |

### Applications

| Tool | Description |
| --- | --- |
| `list_apps` | List applications, optionally filtered by namespace. |
| `show_app` | Get detailed app info (status, routes, instances, config). |
| `create_app` | Create an application without deploying it. |
| `delete_app` | Delete an application. |
| `restart_app` | Restart an application. |
| `scale_app` | Scale an application to a desired instance count. |
| `update_app` | Update app configuration (instances, routes, env, configurations, appchart, settings). |
| `push_app` | Full push workflow: create, upload, stage, and deploy from source files. |
| `upload_and_stage` | Upload source and build without deploying, so logs can be inspected first. |
| `deploy_staged` | Deploy a previously staged build. |
| `app_logs` | Fetch runtime or staging/build logs from an application. |
| `get_app_manifest` | Inspect full app configuration (image, routes, env, settings). |
| `clone_app` | Clone an existing app to a new name using its built image. |
| `get_app_source` | Retrieve a deployed app's staging source (raw tarball or extracted files). |
| `list_app_files` | List file paths and sizes in a deployed app's source (no file contents). |
| `get_connection_info` | Return a ready-to-dial WebSocket URL for streaming an app's logs directly. |

### Environment variables

| Tool | Description |
| --- | --- |
| `list_env` | List environment variables for an app. |
| `set_env` | Set environment variables on an app. |
| `unset_env` | Remove an environment variable from an app. |

### Configurations

| Tool | Description |
| --- | --- |
| `list_configurations` | List configurations in a namespace. |
| `create_configuration` | Create a key-value configuration. |
| `delete_configuration` | Delete a configuration. |
| `bind_configuration` | Bind configurations to an app. |
| `unbind_configuration` | Unbind a configuration from an app. |

### Services and catalog

| Tool | Description |
| --- | --- |
| `list_services` | List service instances in a namespace. |
| `create_service` | Create a service instance from a catalog entry. |
| `delete_service` | Delete a service instance. |
| `bind_service` | Bind a service to an app. |
| `unbind_service` | Unbind a service from an app. |
| `list_catalog_services` | List catalog entries with their settings schemas. |
| `show_catalog_service` | Fetch a single catalog entry's details and settings schema. |
| `create_catalog_service` | Register a new catalog entry (service template). |
| `update_catalog_service` | Update a catalog entry. |
| `delete_catalog_service` | Delete a catalog entry. |

### App charts

| Tool | Description |
| --- | --- |
| `list_appcharts` | List AppCharts registered on the cluster (valid values for `appchart`), with settings schemas. |
| `show_appchart` | Fetch a single AppChart's description and settings schema. |
| `create_appchart` | Register a new AppChart. |
| `update_appchart` | Update an AppChart. |
| `delete_appchart` | Delete an AppChart. |

### Builder images

The BuilderImage registry is the cluster's list of builder images an app can
stage with — the valid values for `push_app`'s `builder_image` parameter.

| Tool | Description |
| --- | --- |
| `list_builder_images` | List registered builder images (the one marked default is used when none is given). |
| `show_builder_image` | Fetch a single builder image. |
| `create_builder_image` | Register a new builder image. |
| `update_builder_image` | Update a builder image. |
| `delete_builder_image` | Delete a builder image. |
| `get_build_guidance` | Guidance on deploying, appchart selection, builder selection, and build troubleshooting. |

## Elevated tier

A small set of capabilities reach **directly into Kubernetes** rather than
through the Epinio API — currently just workload **adoption**. They are **off by
default** and enabled with the `EPINIO_MCP_ELEVATED` environment variable, which
also requires the `standard-elevated` app chart's RBAC. See
[Install the MCP server](../getting-started/install-mcp) for how to turn it on.

### Adopting existing workloads

| Tool | Description |
| --- | --- |
| `adopt_app` | Bring an existing kubectl-managed Deployment into Epinio's view: label it, create an App CRD, and make it visible to `epinio app list/show/logs`. |
| `reconcile_app` | Sync an adopted app's CRD to observed reality (image URL, routes from Ingresses). Supports `dry_run`. |
| `release_app` | Remove Epinio labels and the App CRD for an adopted app. The underlying Deployment keeps running. |

When adoption is enabled, the core destructive tools (`delete_app`,
`restart_app`, `scale_app`, `update_app`, and configuration bind/unbind) refuse
to act on adopted apps — use `kubectl` for their lifecycle, or `release_app` to
convert back to a plain Kubernetes workload.

### Capabilities

| Tool | Description |
| --- | --- |
| `check_capabilities` | Report readiness of optional capabilities and what is missing. |
| `enable_capability` | Fulfill a capability's satisfiable requirements. |

| Capability | Purpose | Requires |
| --- | --- | --- |
| `self_adoption` | Completes the MCP's own adoption when installed via `kubectl apply` | The server's own App CRD exists, is annotated `epinio.io/adopted=true`, and matches the running Deployment. |
| `log_streaming` | Reports WebSocket reachability for `get_connection_info` (diagnostic) | Ingress that preserves the `Upgrade` header and a reachable Epinio `/authtoken` endpoint. |

## Health probes

Besides the MCP endpoints, the server exposes two plain-HTTP probes:

| Path | Type | Behavior |
| --- | --- | --- |
| `/healthz` | Liveness | Returns 200 whenever the process is up. |
| `/readyz` | Readiness | Calls Epinio `/info`; returns 200 on success, 503 on upstream failure. |

## See also

- [Install the MCP server](../getting-started/install-mcp)
- [Server API reference](./api.md)
- [Epinio MCP repository](https://github.com/epinio/mcp)
