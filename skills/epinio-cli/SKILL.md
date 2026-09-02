---
name: epinio-cli
description: Manage Epinio applications with the epinio CLI — push, deploy, debug, scale, bind configurations and services, manage namespaces, app charts, builder images, and git credentials. Use when deploying or troubleshooting an app on Epinio from a terminal, or when an MCP server is unavailable and an agent must drive Epinio through shell commands.
---

# Epinio CLI

Drive Epinio by running `epinio` commands. Written against **Epinio 1.14.2**.

## Ground rules

1. **`--help` outranks this file.** Run `epinio <cmd> --help` before using any flag
   you have not used in this session. If it disagrees with anything here, it wins —
   this file is a snapshot, the binary is the truth.
2. **Never invent a command or a flag.** If the capability is not documented below
   and `--help` does not show it, say it is unavailable. Do not substitute
   `kubectl` unless the user asked for Kubernetes work.
3. **Check for drift in both directions.** Compare `epinio version` against the
   1.14.2 this file targets:
   - **Newer** — commands have likely been added since this was written. Consult the
     [CLI command index](https://docs.epinio.io/reference/cli/) for the current
     surface before telling the user something is impossible.
   - **Older** — the features marked *Needs 1.14.2* below do not exist on that
     client. Say so and name the version, rather than retrying a rejected flag.
     `epinio client-sync` upgrades the client if the server is already newer.
4. **Prefer `-o json`** on anything that accepts it — `info`, `app list`, `app show`,
   `namespace list`, `namespace show`, `configuration list`, `configuration show`,
   `service list`, `service show`. Parse that, do not scrape table output. The
   output is verbose — `app list --all -o json` carries full per-replica metrics for
   every app — so project it down to the fields you need (`.meta.name`,
   `.meta.namespace`, `.status`, `.configuration.routes`) instead of echoing it
   whole into the conversation.
5. **Read live cluster data, do not hard-code it.** Chart names, builder images, and
   catalog services come from `epinio app chart list`, `epinio buildimage list`,
   `epinio service catalog`, and `epinio info -o json`.
6. **Confirm before destroying.** Use the exact name the user gave, or one you read
   from a prior `list`/`show`. Never pass `--all` unless explicitly asked.

## Preconditions

1. `epinio` is on `PATH`. If missing, stop and say so.
2. Client and server versions should match. Compare `epinio version` against the
   server in `epinio info -o json`; if the client is behind, run `epinio client-sync`.
3. A session exists: `epinio info -o json` returns cleanly. On auth or TLS failure,
   `epinio login <URL>` (with `--user`/`--password`, or `--oidc`). For self-signed
   certificates add `--trust-ca`, or `--skip-ssl-verification` as a last resort.
4. **Target a namespace.** Almost every command acts on the *targeted* namespace and
   has no `--namespace` flag:

   ```bash
   epinio target <namespace>      # default namespace is "workspace"
   epinio target                  # no args: show current target
   ```

   The one exception is `epinio app watch`, which takes `-n, --namespace` to
   override the target for that run.

---

## Orient

| Goal | Command |
|---|---|
| Server version, default builder image, capabilities | `epinio info -o json` |
| List namespaces | `epinio namespace list -o json` |
| Describe a namespace (its apps and configurations) | `epinio namespace show NS -o json` |
| Create / delete a namespace | `epinio namespace create NS` / `epinio namespace delete NS -f` |
| Where are my settings and API URL | `epinio settings show` |
| End the session | `epinio logout` |

`namespace delete` prompts unless `-f` is passed.

## Deploy

`epinio push` does upload, stage, and deploy in one step. There is no separate
stage-then-deploy pair.

```bash
epinio push --name APP --path DIR
```

| Source | Command |
|---|---|
| Local directory | `epinio push --name APP --path DIR` |
| Manifest in the current directory | `epinio push` (reads `./epinio.yml`) |
| Explicit manifest | `epinio push ./epinio.yml` |
| Public git | `epinio push --name APP --git URL,REVISION` |
| Private git | `epinio push --name APP --git URL,REVISION --git-config GITCONFIG` |
| Prebuilt container image (no build) | `epinio push --name APP --container-image-url IMAGE` |

Other `push` flags: `--app-chart`, `--builder-image`, `--build-mode`,
`--dockerfile-path`, `--bind`, `--chart-value KEY=VALUE`, `--clear-routes`,
`--env KEY=VALUE`, `--env-replace`, `--instances N`, `--route HOST`.

Universal requirements, whichever build mode you use:

- App name: lowercase alphanumeric plus hyphens.
- Listen on `$PORT`, bound to `0.0.0.0` (fallback 8080). Binding `127.0.0.1` fails
  readiness.

### Manifest

```yaml
name: my-app
origin:
  path: .                                     # or: git: {url, revision, gitconfig}
staging:
  builder: "paketobuildpacks/builder:tiny"    # same as --builder-image
  buildMode: dockerfile                       # same as --build-mode; default buildpack (1.14.2)
  dockerfilePath: docker/Dockerfile           # same as --dockerfile-path (1.14.2)
configuration:
  instances: 2
  environment:
    KEY: value
```

### Buildpack mode (default)

Paketo buildpacks detect from the **root** of `--path` (extracted to
`/workspace/source/app` in the builder). Language files must be at that root, not
nested under an extra `app/` folder.

- **Node:** `package.json` at root with a `"start"` script. Bind `process.env.PORT || 8080`.
- **Next.js 16+:** `"build": "next build --webpack"`. Turbopack production builds
  fail in Paketo with `TurbopackInternalError: Symlink node_modules is invalid`.
  Standalone: copy `.next/static` and `public/` into `.next/standalone/`, launch
  `HOSTNAME=0.0.0.0 node .next/standalone/server.js`.
- **Go:** `go.mod` at root. Bind `:$PORT`.
- **Python:** `requirements.txt` or `pyproject.toml` at root. Prefer a `Procfile`
  (`web: gunicorn app:app`). Bind `0.0.0.0:$PORT`.

### Dockerfile mode

**Needs 1.14.2.** `--build-mode` and `--dockerfile-path` do not exist on earlier
clients — check `epinio push --help` if `epinio version` is below 1.14.2.

```bash
epinio push --name APP --path DIR --build-mode dockerfile [--dockerfile-path PATH]
```

Reach for it when the app already has a Dockerfile that is the source of truth, when
the build needs a step no buildpack performs (native extensions, private toolchains,
code generation), when no trustworthy buildpack exists, or when a base image policy
demands exact control. Otherwise stay on buildpacks — you give up automatic base
image updates, caching strategy, and SBOM/rebase support.

**Environment variables arrive as build arguments, not environment.** Epinio passes
each app environment variable as `--build-arg NAME=value`, so a variable only reaches
the build if the Dockerfile declares a matching `ARG`:

```dockerfile
FROM golang:1.23 AS build
ARG BUILD_FLAVOR
RUN go build -tags "${BUILD_FLAVOR}" -o /app ./cmd/server
```

Runtime environment is unaffected — the chart injects it into the workload in both
modes. `ARG` governs build-time visibility only.

Other constraints:

- `--dockerfile-path` is relative to the source root and defaults to `Dockerfile`.
  Absolute paths, `..` segments, and characters outside letters, digits, `.`, `_`,
  `-`, `/` are rejected.
- Pushing from a local folder validates the Dockerfile exists before upload. Archive
  and git pushes fail later, in the staging job.
- Epinio writes nothing into the build context, so there is no generated file to
  `COPY`. There is no `RUN --mount=type=secret`; fetch runtime credentials from a
  bound configuration or service instead.
- `RUN` steps execute as root and are less isolated than buildpack staging. Builds
  are hungrier too — if they are killed or throttled, raise the *staging* resources
  (operator-side), not the application's.

Build mode applies only to sources Epinio builds (local folder, archive, git). An app
pushed with `--container-image-url` has no build step and no build mode.

### Rebuild an existing app

```bash
epinio app restage APP                # rebuild from the stored sources, then restart
epinio app restage APP --no-restart   # rebuild without rolling the pods
epinio app restart APP                # roll the pods without rebuilding
```

## Inspect

| Goal | Command |
|---|---|
| List apps in the targeted namespace | `epinio app list -o json` |
| List apps everywhere | `epinio app list --all -o json` |
| App status, routes, bindings, environment | `epinio app show APP -o json` |
| Write the app's current state as a manifest | `epinio app manifest APP ./epinio.yml` |
| Export chart and image (**not** the source tarball) | `epinio app export APP ./DIR` |

## Debug

| Goal | Command |
|---|---|
| Runtime logs | `epinio app logs APP` |
| Staging (build) logs | `epinio app logs APP --staging` |
| Tail logs | `epinio app logs APP --follow` |
| Shell into a running instance | `epinio app exec APP` (`-i INSTANCE` to pick one) |
| Reach an app port from localhost | `epinio app port-forward APP 8080:8080` |
| Reach a service port from localhost | `epinio service port-forward SVC 5432` |

`--follow` and both `port-forward` commands are long-running and do not return.
Use them only when the user asked to tail or connect, never as a status check.

### Failure symptoms

| Symptom | Cause / fix |
|---|---|
| `no 'package.json' found in project path /workspace/source/app` (same for `go.mod` / `requirements.txt`) | Buildpack mode, files nested one directory too deep. `--path` must be the project root. |
| Buildpack detection picks the wrong language, or none | No buildpack fits. Try a different `--builder-image`, or switch to `--build-mode dockerfile`. |
| `TurbopackInternalError: Symlink node_modules is invalid` | Next.js 16 Turbopack. Use `next build --webpack`. |
| `dockerfile not found at ...` | `--dockerfile-path` is wrong, or relative to the wrong root. It resolves from the source root, not the CWD. |
| Build arg ignored in dockerfile mode | The Dockerfile has no matching `ARG`. Declare it. |
| Dockerfile build OOM-killed or throttled | Raise staging resources (operator-side), not app instances. |
| Push gateway timeout / HTML error | Ingress cut a long build; staging often continues. Wait, then `epinio app show APP -o json`. |
| `show` 404 after push | App resource incomplete. `epinio app delete APP`, push again. |
| `stagingstatus: failed` (CLI JSON field) | `epinio app logs APP --staging`. |
| Pod never ready | `epinio app logs APP`, then `epinio app exec APP` to inspect from inside. Usually bind address/`$PORT` or missing env (`epinio app env set`). |
| `authentication required` on `--git` push | No gitconfig selected. Create one and pass `--git-config NAME`. |
| Port unreachable but pod is ready | `epinio app port-forward APP 8080:8080` to test directly, bypassing routes and ingress. |

## Change a running app

```bash
epinio app update APP --instances 3
```

`update` changes only what you pass; omitted settings stay as they are. Flags:
`--app-chart`, `--bind`, `--chart-value`, `--clear-routes`, `--env`,
`--env-replace`, `--instances`, `--no-restart`, `--route`.

- `--bind` and `--route` replace those lists, but only when at least one value is
  given. Empty flags are ignored; clear routes with `--clear-routes`.
- `--env` merges into the existing environment. `--env-replace` replaces it wholesale.
- `--no-restart` applies the change without rolling the pods.

To create an app record without deploying a workload, `epinio app create APP` takes
the same flags **except** `--env-replace` and `--no-restart`.

### Environment variables

| Goal | Command |
|---|---|
| List | `epinio app env list APP` |
| Show one | `epinio app env show APP KEY` |
| Set (one call per key) | `epinio app env set APP KEY VALUE` |
| Unset | `epinio app env unset APP KEY` |

## Configurations

User-defined key/value sets that bind into apps as environment.

| Goal | Command |
|---|---|
| List | `epinio configuration list -o json` (`--all` for every namespace) |
| Describe | `epinio configuration show NAME -o json` |
| Create | `epinio configuration create NAME KEY=VALUE [KEY=VALUE ...]` |
| Change keys | `epinio configuration update NAME --set KEY=VALUE --unset KEY` |
| Delete | `epinio configuration delete NAME` (`--unbind` if bound) |
| Bind / unbind | `epinio configuration bind NAME APP` / `epinio configuration unbind NAME APP` |

**Use `update` to change a configuration.** Deleting and recreating unbinds it from
every app that uses it. `update` takes `--no-restart` to skip rolling bound apps.

## Services

Instances provisioned from a catalog service (a Helm chart).

| Goal | Command |
|---|---|
| List | `epinio service list -o json` (`--all` for every namespace) |
| Describe | `epinio service show NAME -o json` |
| Browse the catalog | `epinio service catalog` / `epinio service catalog NAME` |
| Provision | `epinio service create CATALOG_NAME INSTANCE_NAME [--chart-value K=V] [--wait]` |
| Change settings | `epinio service update NAME --set K=V --unset K [--wait] [--no-restart]` |
| Delete | `epinio service delete NAME` |
| Bind / unbind | `epinio service bind SVC APP` / `epinio service unbind SVC APP` |

Catalog entries themselves (admin): `epinio service catalog create --name NAME
--chart CHART [--chart-version V] [--app-version V] [--description TEXT]
[--short-description TEXT] [--helm-repo-name N] [--helm-repo-url URL]
[--helm-repo-secret S] [--values-file FILE] [--secret-types T] [--service-icon URL]`,
plus `epinio service catalog update NAME` (same flags minus `--name`) and
`epinio service catalog delete NAME`.

## Application charts

| Goal | Command |
|---|---|
| List / describe | `epinio app chart list` / `epinio app chart show NAME` |
| Show or set the default | `epinio app chart default` / `epinio app chart default NAME` |
| Create / update / delete | `epinio app chart create --name NAME [--helm-chart URL] [--helm-repo URL] [--description TEXT] [--short-description TEXT] [--set K=V]`, `epinio app chart update NAME` (same flags minus `--name`), `epinio app chart delete NAME` |

Pass one with `--app-chart` on push/create/update. `--chart-value KEY=VALUE` only
accepts keys in that chart's schema.

- **standard** — default; no extra Kubernetes API access.
- **standard-elevated** — extra RBAC for apps that must call the Kubernetes API. Do
  not pick it "to be safe".
- **rancher-extension** — Rancher UI extensions; settings `extName`, `extVersion`.

## Builder images

| Goal | Command |
|---|---|
| List / describe | `epinio buildimage list` / `epinio buildimage show NAME` |
| Create / update / delete | `epinio buildimage create --name NAME --image IMAGE [--description TEXT] [--short-description TEXT]`, `epinio buildimage update NAME [--image IMAGE] ...`, `epinio buildimage delete NAME` |

Pass one with `--builder-image` on push. The cluster default is in
`epinio info -o json` (`default_builder_image`) and marked in the list — typically
`paketobuildpacks/builder-jammy-full`. Use a specialized builder only when the chart
or app requires it. Ignored entirely in dockerfile mode.

## Private git credentials

A gitconfig holds the credentials Epinio uses to clone a private repository.
Passwords and certificates are write-only — `list` and `show` never return them.

| Goal | Command |
|---|---|
| List / describe | `epinio gitconfig list` / `epinio gitconfig show NAME` |
| Create | `epinio gitconfig create NAME URL [--git-provider P] [--username USER] [--password PASS] [--user-org ORG] [--repository REPO] [--skip-ssl] [--cert-file FILE] [--global]` |
| Delete | `epinio gitconfig delete NAME` |

`--git-provider` accepts `git`, `github`, `github_enterprise_cloud`,
`github_enterprise_self_hosted`, `gitlab`, `gitlab_enterprise` (default `git`).

A personal access token goes in `--password`, and `--username` must be non-empty.
`--global` makes the configuration available to all users and is admin-only.
`--cert-file` takes a path, so write a PEM string to a temp file first. Never echo
`--password` into logs or transcripts.

**Selection is explicit.** Epinio does not pick a gitconfig by matching the URL.
Name it on the push:

```bash
epinio gitconfig create mycreds https://github.com/org/repo --username USER --password TOKEN
epinio push --name APP --git https://github.com/org/repo,main --git-config mycreds
```

Or set `origin.git.gitconfig` in a manifest. A `--git` push without `--git-config`
clones unauthenticated and fails on a private repo with `authentication required`.

There is no `gitconfig update` — delete and recreate. There is no prefix-match
command; run `epinio gitconfig list` and filter the names yourself.

## Inner loop: app watch

`epinio app watch` watches a local directory and syncs changes into the running pod
without a full rebuild — seconds instead of a staging cycle. Marked
**experimental**: validated on a limited set of frameworks and builder images.

```bash
epinio app watch APP --path ./src          # -n NS overrides the targeted namespace
```

The app must already exist and have been pushed at least once. Every run performs a
full buildpack push first, then patches the deployment with a supervisor wrapper.

- **Files mode** (interpreted languages — Node, Python) is the default. Changed
  files are tarred and uploaded; no configuration needed.
- **Binary mode** (compiled languages — Go) runs a build command and uploads the
  resulting binary. Enable it with `.epinio-sync.yaml` in the source directory:

  ```yaml
  build_cmd: "CGO_ENABLED=0 go build -o ./bin/my-app ."
  binary: "./bin/my-app"
  ```

The mode is chosen by whether `build_cmd` and `binary` are set. Full guide:
[Inner-loop development with app watch](https://docs.epinio.io/how-to/developer/concepts/app_watch).

## Delete

```bash
epinio app delete APP                  # one app
epinio app delete APP1 APP2            # several
epinio app delete APP --delete-image   # also remove the container image from the registry
epinio app delete APP --delete-pvc     # also remove the app's PersistentVolumeClaims (needs 1.14.2)
```

`--delete-image` and `--delete-pvc` destroy data that a later push will not restore.
Pass them only when the user asked. `--all` deletes every app in the namespace —
confirm first, always.

## Retrieve application source

No CLI command returns the staging tarball. `epinio app export` gives Helm values,
the chart, and the image — not the sources. Fall back to the REST API:

```bash
epinio settings show                     # read the API URL and the settings file path
# token lives in that file under token.accesstoken, else use basic user/pass
curl -fsS -H "Authorization: Bearer TOKEN" \
  "$API/api/v1/namespaces/$NS/applications/$APP/source" -o source.tgz
tar -tzf source.tgz                      # list files
tar -xzf source.tgz -C DIR               # extract
```

If that request fails, say source retrieval is unavailable from the CLI. Do not
guess other endpoints.

## Gaps — do not fake

The CLI has no equivalent for these. Say so rather than improvising:

- **Workload adoption and cluster capability management** — adopting an existing
  Kubernetes workload, reconciling it, releasing it, or inspecting and enabling
  server capabilities. These require direct Kubernetes access.
- **`gitconfig update`** — delete and recreate instead.
- **Two-step upload-then-deploy** — `epinio push` is atomic.
- **A WebSocket URL for log streaming** — use `epinio app logs --follow`.
- **Cloning an app** — see the recipe below.

---

## Workflows

**Deploy from a local directory**

1. `epinio namespace list -o json` — create the namespace if needed
2. `epinio target NS`
3. `epinio buildimage list` — only if a non-default builder is required
4. `epinio push --name APP --path DIR`
5. `epinio app show APP -o json` — confirm it is running

**Deploy from a private git repository**

1. `epinio gitconfig list` — create one if needed
2. `epinio target NS`
3. `epinio push --name APP --git URL,REVISION --git-config NAME`
4. `epinio app show APP -o json`

**Diagnose a failed deploy**

1. `epinio app show APP -o json` — read `stagingstatus` and `stage_id`
2. Staging failed → `epinio app logs APP --staging`, fix the source, `epinio app restage APP`
3. Staged but never ready → `epinio app logs APP`, then `epinio app exec APP` to
   inspect from inside. Usually a bind address, a missing `$PORT`, or missing env.
4. Match the error against the failure-symptom table above.

**Clone an app into another namespace** (reuses the built image, no rebuild)

```bash
epinio target SRC_NS
epinio app show SRC -o json          # read instances, app chart, environment
epinio target DST_NS
epinio app create DST --instances N --app-chart CHART
epinio app env set DST KEY VALUE     # once per copied variable
epinio push --name DST --container-image-url IMAGE_URL
```

Routes are assigned automatically in the destination namespace.

---

## Appendix: coming from the MCP server

If you have been using the [Epinio MCP server](https://docs.epinio.io/reference/mcp)
and need the CLI equivalent of a tool you know by name:

| MCP tool | CLI |
|---|---|
| `epinio_info` | `epinio info -o json` |
| `list_namespaces` / `create_namespace` / `delete_namespace` | `epinio namespace list -o json` / `create NAME` / `delete NAME -f` |
| `list_apps` / `show_app` | `epinio app list -o json` / `epinio app show APP -o json` |
| `create_app` / `update_app` / `delete_app` / `restart_app` | `epinio app create` / `update` / `delete` / `restart` |
| `scale_app` | `epinio app update APP --instances N` |
| `push_app` | `epinio push --name APP --path DIR` |
| `upload_and_stage` + `deploy_staged` | `epinio push` (atomic), or `epinio app restage APP` |
| `get_app_manifest` | `epinio app show APP -o json`, or `epinio app manifest APP ./epinio.yml` |
| `list_env` / `set_env` / `unset_env` | `epinio app env list` / `set` / `unset` |
| `list_configurations` / `create_configuration` / `delete_configuration` | `epinio configuration list -o json` / `create` / `delete` |
| `bind_configuration` / `unbind_configuration` | `epinio configuration bind` / `unbind` |
| `list_services` / `create_service` / `delete_service` | `epinio service list -o json` / `create` / `delete` |
| `bind_service` / `unbind_service` | `epinio service bind` / `unbind` |
| `list_catalog_services` / `show_catalog_service` | `epinio service catalog` / `epinio service catalog NAME` |
| `create_catalog_service` / `update_catalog_service` / `delete_catalog_service` | `epinio service catalog create` / `update` / `delete` |
| `list_appcharts` / `show_appchart` | `epinio app chart list` / `show NAME` |
| `create_appchart` / `update_appchart` / `delete_appchart` | `epinio app chart create` / `update` / `delete` |
| `list_builder_images` / `show_builder_image` | `epinio buildimage list` / `show NAME` |
| `create_builder_image` / `update_builder_image` / `delete_builder_image` | `epinio buildimage create` / `update` / `delete` |
| `list_gitconfigs` / `show_gitconfig` / `create_gitconfig` / `delete_gitconfig` | `epinio gitconfig list` / `show` / `create` / `delete` |
| `match_gitconfigs` | No equivalent — `epinio gitconfig list` and filter by prefix |
| `app_logs` | `epinio app logs APP [--staging] [--follow]` |
| `get_connection_info` | No equivalent — use `epinio app logs APP --follow` |
| `get_app_source` / `list_app_files` | No equivalent — see "Retrieve application source" |
| `get_build_guidance` | The Deploy and Debug sections above |
| `clone_app` | No equivalent — see the clone recipe above |
| `adopt_app`, `reconcile_app`, `release_app`, `check_capabilities`, `enable_capability` | No equivalent at all — these need Kubernetes access |

The CLI also does things MCP has no tool for: `app exec`, `app port-forward`,
`service port-forward`, `app watch`, `configuration update`, `service update`, and
`app chart default`.
