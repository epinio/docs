---
sidebar_label: "MCP Server"
sidebar_position: 4
title: "Epinio MCP Server Reference"
description: The Model Context Protocol server that exposes Epinio as tools for AI agents, and the capabilities it provides.
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

:::caution Experimental
The MCP server is under active development and not yet stable. Tool names,
capabilities, and install steps may change. It is not recommended for production
use.
:::

To stand it up on your cluster, see [Install the MCP server](../getting-started/install-mcp).

## How it connects

The server sits between an AI agent and an Epinio instance, speaking MCP to the
agent and the Epinio REST API to the cluster:

```text
AI Agent (Claude, etc.)
    | MCP protocol (Streamable HTTP, /mcp endpoint)
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

## Tools

The server exposes 44 tools, grouped below by the area of Epinio they act on.

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

### Services

| Tool | Description |
| --- | --- |
| `list_services` | List service instances in a namespace. |
| `list_catalog_services` | List available catalog services with their settings schemas. |
| `show_catalog_service` | Fetch a single catalog service's full details and settings schema. |
| `create_service` | Create a service from the catalog. |
| `delete_service` | Delete a service instance. |
| `bind_service` | Bind a service to an app. |
| `unbind_service` | Unbind a service from an app. |

### Charts and builders

| Tool | Description |
| --- | --- |
| `list_appcharts` | List AppCharts registered on the cluster (valid values for `appchart`), with per-chart settings schemas. |
| `show_appchart` | Fetch a single AppChart's description and settings schema. |
| `list_builders` | List Cloud Native Buildpacks builder images usable with this cluster and the ecosystems each supports. |
| `get_build_guidance` | Return guidance on deploying, appchart selection, builder selection, and build troubleshooting. |

### Adopting existing workloads

| Tool | Description |
| --- | --- |
| `adopt_app` | Bring an existing kubectl-managed Deployment into Epinio's view: label it, create an App CRD, and make it visible to `epinio app list/show/logs/exec`. |
| `reconcile_app` | Sync an adopted app's CRD to observed reality (image URL, routes from Ingresses). Supports `dry_run`. |
| `release_app` | Remove Epinio labels and the App CRD for an adopted app. The underlying Deployment keeps running. |

### Capabilities and gated tools

| Tool | Description |
| --- | --- |
| `check_capabilities` | Report readiness of optional capabilities (such as `app_editing`) and what is missing. |
| `enable_capability` | Fulfill a capability's satisfiable requirements (create service instances, bind configurations). |
| `get_app_source` | Retrieve a deployed app's staging tarball via the S3 gateway. Gated by the `app_editing` capability. |
| `list_app_files` | List file paths and sizes in a deployed app's source (no bytes returned). Gated by `app_editing`. |
| `get_connection_info` | Return the URL and forwarded OIDC token a caller needs to connect directly to a capability's backing service (for example, Epinio's log WebSocket). |

## Optional capabilities (gated)

Some tools require extra cluster infrastructure. They are gated behind named
capabilities so the server reports readiness explicitly instead of failing
silently. Call `check_capabilities` to see what is ready, and `enable_capability`
to fulfill the pieces it can.

| Capability | Gates | Requires |
| --- | --- | --- |
| `app_editing` | `get_app_source`, `list_app_files` | An `s3-gateway` catalog entry and S3 credentials available to the server, plus `get apps.application.epinio.io` RBAC on the server's pod. |
| `log_streaming` | Advertises WebSocket reachability (environmental) | Ingress that preserves the `Upgrade` header and a reachable Epinio `/authtoken` endpoint. |
| `self_adoption` | Internal housekeeping (no gated tools) | The server's own App CRD exists, is annotated `epinio.io/adopted=true`, and matches the running Deployment. |

`enable_capability` can fulfill the user-scope pieces (service instance,
configuration binding, self-adoption metadata, and writing S3 credentials into the
server's own Secret). Cluster-admin items, such as catalog install and
cross-namespace RBAC, are reported as `needs_admin`.

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
