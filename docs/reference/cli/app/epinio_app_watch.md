---
sidebar_label: epinio app watch
title: ""
description: epinio app watch
keywords: [epinio, kubernetes, epinio app watch]
doc-type: [reference]
doc-topic: [epinio, reference, epinio-cli, epinio-app-watch]
doc-persona: [epinio-developer]
---
## epinio app watch

Watch a local directory and sync changes to the running application

```
epinio app watch NAME [flags]
```

### Description

Watches the source directory for changes and syncs them into the running pod.

On startup a full buildpack push is performed and the running deployment is
patched with a supervisor wrapper. This happens on every `app watch` run so the
supervisor is always re-established, even after a plain `epinio app push`. While
watching, only changed files or the rebuilt binary are uploaded via the Epinio
API, without going through the buildpack pipeline.

Configure binary mode (compiled languages) or override sync paths by placing
an `.epinio-sync.yaml` file in the source directory.
See [Inner-loop development with app watch](../../../how-to/developer/concepts/app_watch.md)
for a full guide.

### Options

```
  -h, --help               help for watch
  -n, --namespace string   Namespace the application lives in (overrides targeted namespace)
      --path string        Path to the application source directory (defaults to current directory)
```

### Options inherited from parent commands

```
  -H, --header stringArray       Add custom header to every request executed
  -c, --kubeconfig string        (KUBECONFIG) path to a kubeconfig, not required in-cluster
      --no-colors                Suppress colorized output
      --settings-file string     (EPINIO_SETTINGS) set path of settings file (default "~/.config/epinio/settings.yaml")
      --skip-ssl-verification    (SKIP_SSL_VERIFICATION) Skip the verification of TLS certificates
      --timeout-multiplier int   (EPINIO_TIMEOUT_MULTIPLIER) Multiply timeouts by this factor (default 1)
      --trace-file string        (TRACE_FILE) Print trace messages to the specified file
      --trace-level int          (TRACE_LEVEL) Only print trace messages at or above this level (0 to 255, default 0, print nothing)
      --trace-output string      (TRACE_OUTPUT) Sets trace output format [text,json] (default "text")
      --verbosity int            (VERBOSITY) Only print progress messages at or above this level (0 or 1, default 0)
```

### SEE ALSO

* [epinio app](./epinio_app.md) - Epinio application features
