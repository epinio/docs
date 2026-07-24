---
sidebar_label: "Install the MCP Server"
sidebar_position: 4
title: "Installing the Epinio MCP Server"
description: How to deploy the Epinio MCP server so AI agents can manage applications on your cluster.
keywords: [epinio, mcp, model context protocol, ai, agent, install, deploy]
doc-type: [how-to]
doc-persona: [epinio-operator]
doc-topic: [epinio, getting-started, mcp]
---

The [Epinio MCP server](https://github.com/epinio/mcp) exposes Epinio as tools for
AI agents over the [Model Context Protocol](https://modelcontextprotocol.io). It
runs on your cluster and talks to the Epinio API on the agent's behalf. For the
full tool list and the optional capabilities, see the
[MCP server reference](../reference/mcp).

:::caution Beta
The MCP server is under active development and not yet stable. Tool names,
capabilities, and install steps may change. It is not recommended for production
use.
:::

## Prerequisites

- A Kubernetes cluster with [Epinio](./install-epinio.md) installed.
- `kubectl` and the [`epinio` CLI](./install-cli.md) pointed at your cluster.
- An Epinio namespace to deploy into (default: `epinio`).
- [`task`](https://taskfile.dev) (optional, used by the `epinio push` path below).

## Choose an install path

There are two ways to install the server. Most users want the first.

| Path | Use when |
| --- | --- |
| **`epinio push` (managed)** | You want Epinio to own the lifecycle (push, logs, restart, scale), just like any other app. |
| **`kubectl apply` (adopted)** | You want the server managed outside Epinio's REST path, and prefer to finish setup through conversation with the agent. |

## Install with `epinio push` (recommended)

The repository ships a `Taskfile.yml` that automates the full setup. After
cloning [epinio/mcp](https://github.com/epinio/mcp) and editing `epinio.yml` with
your cluster credentials:

```bash
task setup
```

`task setup` runs these steps in order, and each can be run on its own for partial
runs or re-runs:

```bash
task cluster-prep   # (cluster-admin, once per cluster) manifests + namespace label
task s3-service     # create and wait for the epinio-s3-gateway service
task configure-s3   # create the epinio-s3-gateway Epinio configuration (idempotent)
task push           # epinio push from the repo root
task verify         # smoke-test /healthz and /readyz
```

`epinio.yml` carries the connection details. Fill in the `environment` section
with your cluster's API URL and credentials (default `admin` / `password`):

```yaml
environment:
  EPINIO_API_URL: "https://epinio.your-cluster.example.com"
  EPINIO_USERNAME: "admin"
  EPINIO_PASSWORD: "your-password"
```

For OIDC clusters, leave the username and password empty and set `EPINIO_TOKEN`,
`EPINIO_REFRESH_TOKEN`, and `EPINIO_TOKEN_ENDPOINT` instead.

The push runs the full build cycle (upload source, stage, deploy, wait for ready)
and assigns a route, for example `https://epinio-mcp.192.168.X.X.sslip.io/mcp`.

For the manual, step-by-step walkthrough (useful when a step fails), see
[`INSTALL.md`](https://github.com/epinio/mcp/blob/main/INSTALL.md) in the
repository.

## Install with `kubectl apply`

This path stands the server up as a plain Kubernetes workload. The install
manifest is self-contained: it creates the namespace, the server's ServiceAccount
and RBAC, the Deployment and Service, and an Epinio `App` record so
`epinio app list/show/logs/exec` keep working.

Deploy the server (edit the image tag, credentials, and Ingress host first):

```bash
kubectl apply -f install/epinio-mcp.yaml
kubectl -n epinio rollout status deployment/epinio-mcp
```

Once it is running, ask the agent to finish its own setup:

```text
Run enable_capability for self_adoption.
```

To upgrade, edit the image tag and re-apply `install/epinio-mcp.yaml`; to
uninstall, run `kubectl delete -f install/epinio-mcp.yaml`.

### Enable source-reading tools (app_editing)

The `app_editing` capability (`get_app_source`, `list_app_files`) needs an S3
gateway. The prerequisites ship in the repo's
[`manifests/`](https://github.com/epinio/mcp/tree/main/manifests). As a cluster
admin, register the S3 gateway catalog entry and let Epinio manage the `epinio`
namespace:

```bash
kubectl apply -f manifests/s3-gateway-catalog-entry.yaml
kubectl label namespace epinio app.kubernetes.io/component=epinio-namespace --overwrite
```

Then have the agent provision and wire up the gateway:

```text
Run enable_capability for app_editing.
```

`enable_capability` creates the `s3-gateway` service instance, reads its
credentials, binds them to the server, and restarts the pod.

## Verify the server is up

The server exposes two plain-HTTP probes:

```bash
# Liveness
curl https://epinio-mcp.<your-route>/healthz

# Readiness (confirms the server can reach Epinio)
curl https://epinio-mcp.<your-route>/readyz
```

A healthy `/readyz` response reports the Epinio version it reached:

```json
{"epinio":{"kube_version":"...","platform":"...","version":"..."},"status":"ok","version":"0.6.0"}
```

## See also

- [MCP server reference](../reference/mcp.md)
- [Install Epinio](./install-epinio.md)
- [Install the Epinio CLI](./install-cli.md)
