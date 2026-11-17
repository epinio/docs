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
full tool list and the optional elevated tier, see the
[MCP server reference](../reference/mcp).

:::caution Beta
The MCP server is in beta. Tool names and options may still change, and it is
not yet recommended for production use.
:::

:::tip No cluster to install on?
If you cannot run a server but you do have the `epinio` CLI, the
[CLI agent skill](../reference/cli/agent-skill.md) gives an agent the same
capabilities through CLI commands, with nothing to deploy.
:::

## Prerequisites

- A Kubernetes cluster with a current
  [Epinio release](https://github.com/epinio/epinio/releases) installed. The
  server relies on the builder-image, catalog-service, and app-chart CRUD API
  and the source-retrieval endpoint, and login relies on the chart's
  `dex.extraStaticClients` and `dex.apiTrustedPeers` values. Older releases
  lack one or the other.
- `kubectl` and the [`epinio` CLI](./install-cli.md) pointed at your cluster.
- `make` and a Go toolchain, plus a clone of [epinio/mcp](https://github.com/epinio/mcp).
- A route for the MCP server. OAuth clients outside the cluster require a
  publicly reachable HTTPS URL.

## Choose an install path

There are two ways to install the server. Most users want the first.

| Path | Use when |
| --- | --- |
| **`make setup` (managed)** | You want Epinio to own the lifecycle (push, logs, restart, scale), just like any other app. |
| **`kubectl apply` (adopted)** | You want the server managed outside Epinio's REST path, and prefer to finish setup through conversation with the agent. |

## Install with `make setup` (recommended)

Clone [epinio/mcp](https://github.com/epinio/mcp), set your cluster details in
`epinio.yml`, and run:

```bash
make setup
```

This targets the `mcp` namespace (creating it if needed), pushes the server, and
smoke-tests `/healthz` and `/readyz`. Override the namespace with
`make setup NAMESPACE=<name>`, and run `make help` to see every target.

`epinio.yml` carries the connection and OAuth discovery details. Fill in the
`environment` section:

```yaml
environment:
  EPINIO_API_URL: "https://epinio.your-cluster.example.com"
  EPINIO_MCP_RESOURCE_URL: "https://epinio-mcp.your-cluster.example.com"
  EPINIO_MCP_OIDC_ISSUER: "https://auth.your-cluster.example.com"
```

`EPINIO_MCP_RESOURCE_URL` must exactly match the URL entered in the MCP client,
including any path. `EPINIO_MCP_OIDC_ISSUER` is the issuer reported by Dex's
OpenID Connect discovery document. Both values are required.

The server does not store an Epinio username, password, access token, or refresh
token. Every MCP request must carry credentials that Epinio accepts. Tools
therefore run with the calling user's permissions instead of a shared server
identity.

The push runs the full build cycle (upload source, stage, deploy, wait for ready)
and assigns a route, for example `https://epinio-mcp.192.168.X.X.sslip.io`. The
MCP endpoint is that route's root — point your agent at the URL as-is (no `/mcp`
suffix).

### Elevated tier (optional)

The core install wires only to the Epinio API. To turn on the opt-in
[elevated tier](../reference/mcp#elevated-tier) — workload adoption, which reaches
directly into Kubernetes — edit `epinio-elevated.yml` and run:

```bash
make elevated-setup
```

This registers the `standard-elevated` app chart (a one-time, cluster-admin step)
and pushes the server with `EPINIO_MCP_ELEVATED` set. Switching a running server
between the core and elevated installs recreates it (the app chart can't change in
place).

## Install with `kubectl apply`

This path stands the server up as a plain Kubernetes workload with the adoption
RBAC. The install manifest is self-contained: it creates the namespace, the
server's ServiceAccount and RBAC, the Deployment and Service, and an Epinio `App`
record so `epinio app list/show/logs` keep working.

Deploy the server (edit the image tag, authentication URLs, and Ingress host
first):

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

## Configure Dex for OAuth clients

OAuth-capable MCP clients discover Dex through the MCP server, open the Dex
login page, and return an access token to the server. Dex requires each client
and its exact callback URI to be registered, and Epinio only accepts the token
if that client is a trusted peer of `epinio-api`. Both are Epinio chart values
(see [Configuring Dex](../reference/security/authentication_oidc#configuring-dex)).

For example, a public client used by Claude, in `dex-values.yaml`:

```yaml
dex:
  extraStaticClients:
    - id: claude-mcp
      name: Claude MCP
      public: true
      redirectURIs:
        # Claude on the web
        - https://claude.ai/api/mcp/auth_callback
        # Claude Code with --callback-port 3118
        - http://localhost:3118/callback
        - http://127.0.0.1:3118/callback
  apiTrustedPeers:
    - claude-mcp
```

Apply it and restart Dex, which reads its configuration only at startup:

```bash
helm upgrade epinio epinio/epinio -n epinio --reuse-values -f dex-values.yaml
kubectl rollout restart deployment dex -n epinio
```

Dex does not support dynamic client registration or Client ID Metadata
Documents (CIMD). Configure the client ID explicitly in clients that support
it. For Claude Code:

```bash
claude mcp add --transport http \
  --client-id claude-mcp --callback-port 3118 \
  epinio https://epinio-mcp.your-cluster.example.com
```

Other MCP clients can use the same OAuth flow, but need their own registered
client ID and exact callback URI. A local Epinio user can instead supply HTTP
Basic credentials when the MCP client supports manual authorization headers.

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
{"epinio":{"kube_version":"...","platform":"...","version":"..."},"status":"ok","version":"..."}
```

Verify OAuth discovery:

```bash
curl https://epinio-mcp.<your-route>/.well-known/oauth-protected-resource
curl -i https://epinio-mcp.<your-route>/
```

The metadata request returns the configured resource and Dex issuer. The
unauthenticated MCP request returns `401 Unauthorized` with a
`WWW-Authenticate` header pointing to that metadata. A client can then begin
the OAuth flow.

## See also

- [MCP server reference](../reference/mcp.md)
- [Install Epinio](./install-epinio.md)
- [Install the Epinio CLI](./install-cli.md)
