---
sidebar_label: Inner-loop development with app watch
sidebar_position: 5
title: Inner-loop development with app watch
description: Use epinio app watch to sync local changes into a running application without a full push.
keywords: [epinio, kubernetes, inner loop, live reload, app watch, hot reload]
doc-type: [how-to]
doc-topic: [epinio, how-to, use-develop, app-watch]
doc-persona: [epinio-developer]
---

`epinio app watch` shortens the edit-compile-test loop by syncing local changes
directly into a running pod, skipping the full buildpack pipeline on every save.

## How it works

`app watch` has two phases:

**Startup (first run)**

On the first `app watch` run (no local `.epinio-patch-state` file), Epinio
patches the app's existing source blob, runs buildpack staging, and patches the
running deployment to inject a supervisor wrapper as PID 1. The supervisor
starts your app and relaunches it when sync delivers an updated binary or
source files.

**Sync (subsequent runs)**

After startup, `app watch` polls the source directory every 500 ms. When it
detects a changed file it enters sync mode:

- **Binary mode** (compiled languages): runs your `build_cmd`, tars the output
  binary, and uploads it to the running pod via the Epinio API. The pod-side
  supervisor replaces the running binary and restarts the app in place.
- **Files mode** (interpreted languages): tars only the changed files and
  uploads them into the pod's source directory. The supervisor then restarts
  the app process with the updated files.

The mode is chosen by the presence of `build_cmd` and `binary` in
`.epinio-sync.yaml`. If neither is set, files mode is used.

## Prerequisites

- The application namespace is targeted (`epinio target <namespace>`) or you
  pass `--namespace`.
- The application must already exist in Epinio and have been pushed at least
  once (`epinio app push`). `app watch` patches the existing source blob; it
  cannot bootstrap a brand-new app on its own.
- Your workstation runs Linux, macOS, or Windows with WSL.

## Quick start

```console
cd my-app/
epinio app push my-app
epinio app watch my-app
```

Run `epinio app push` once before the first `app watch` session. On the first
watch run, Epinio restages the app and installs the supervisor; after that,
save any source file and the terminal will show sync progress:

```
Synced in 312ms (via API)
```

## Example configurations

### Go

Go is a compiled language so binary mode is used. Add `.epinio-sync.yaml` to
your project root:

```yaml
# .epinio-sync.yaml
build_cmd: "CGO_ENABLED=0 go build -o ./bin/my-app ."
binary: "./bin/my-app"
```

On every save, `app watch` runs `build_cmd`, uploads the new binary into the
pod, and the supervisor restarts the app automatically. No extra tooling
required.

Delete `.epinio-patch-state` and re-run `app watch` after `go.mod` changes
to trigger a fresh buildpack run that re-resolves dependencies.

### Node.js

Node.js is interpreted so no `build_cmd` or `binary` is needed. Files mode
is the default. On every save, changed files are synced into the pod and the
running process is restarted cleanly by the supervisor.

No `.epinio-sync.yaml` is required for a standard Paketo Node.js app.

If your source layout differs from the Paketo default, add a `files_dest`
override:

```yaml
# .epinio-sync.yaml
files_dest: "/workspace/source/app"
```

### Python

Python works the same way as Node.js -- files mode with no `build_cmd`. On
every save, changed `.py` and template files are synced into the pod and the
interpreter restarts fresh.

No `.epinio-sync.yaml` is required for a standard Paketo Python app.

```yaml
# .epinio-sync.yaml (only needed for non-standard layouts)
files_dest: "/workspace/source/app"
```

## All configuration options

Place `.epinio-sync.yaml` in the root of your source directory to configure
binary mode or override defaults. All fields are optional.

| Field | Default | Description |
|---|---|---|
| `build_cmd` | — | Shell command to build the binary. When set alongside `binary`, enables binary mode. |
| `binary` | — | Path to the built binary relative to the source root. |
| `binary_dest` | `/epinio-sync/app` | Destination path inside the pod for the synced binary. Only change this if the supervisor is configured to match. |
| `files_dest` | `/workspace/source/app` | Destination directory inside the pod for files mode syncs. |
| `process_cmd` | auto-discovered | Command the supervisor runs to start the app on first boot. By default it uses `/cnb/process/web` when the buildpack defines it, otherwise the image's first CNB process. Override for non-CNB images. |

### Non-CNB builders

Cloud Native Buildpacks images are handled automatically. If your builder
produces an image without `/cnb/process` entries, set `process_cmd` to the
command that starts your app, and `binary_dest` or `files_dest` to match
wherever the builder places the workload:

```yaml
process_cmd: "/app/bin/start"
binary_dest: "/app/bin/my-app"
```

## Ignoring files

`app watch` respects the same ignore rules as `epinio push`:

| File | Purpose |
|---|---|
| `.gitignore` | Standard git ignore patterns. Matched files are excluded from sync. |
| `.epinioignore` | Epinio-specific ignores. Use this for files you want in git but not in the push (e.g. test fixtures, local config). |

Patterns from both files are combined. Either file may be absent.

The watch state file (`.epinio-patch-state`) and config file
(`.epinio-sync.yaml`) are always excluded automatically.

### Performance on large codebases

To detect changes, `app watch` hashes every non-ignored file in the source
directory on each poll cycle (every 500 ms). On a large codebase this adds
noticeable CPU and disk load, and slows down change detection.

Use the ignore files to keep the watched set small. Dependency directories
and build output are the usual offenders:

```gitignore
# .epinioignore (or .gitignore)
node_modules/
vendor/
.venv/
dist/
bin/
*.log
```

Everything excluded here is also excluded from the sync payload, so a tight
ignore list makes both change detection and uploads faster.

## State file

`app watch` writes `.epinio-patch-state` in the source directory after a
successful startup push. This file records the file hashes used to detect
changes on the next run.

If this file is present, `app watch` skips the startup push and goes straight
into sync mode. To force a fresh startup push (for example, after a dependency
change), delete the state file:

```console
rm .epinio-patch-state
epinio app watch my-app
```

While an app is under `watch`, its deployment keeps the supervisor wrapper and
pinned image. Run a regular `epinio app push` or `epinio app restage` when you
are done with inner-loop development to restore the standard Helm-managed
deployment.

## CLI flags

| Flag | Default | Description |
|---|---|---|
| `--namespace`, `-n` | targeted namespace | Namespace the application lives in |
| `--path` | current directory | Path to the application source directory |

## See also

- [epinio app push](../../references/commands/cli/app/epinio_app_push.md) — full push without watching
- [epinio app watch (reference)](../../references/commands/cli/app/epinio_app_watch.md) — CLI flag reference
- [Debugging an application](./debug.md) — attaching a debugger to a running app
