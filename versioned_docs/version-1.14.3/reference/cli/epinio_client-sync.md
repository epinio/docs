---
sidebar_label: epinio client-sync
title: ""
description: epinio client-sync
keywords: [epinio, kubernetes, epinio client-sync]
doc-type: [reference]
doc-topic: [epinio, reference, epinio-cli, epinio-client-sync]
doc-persona: [epinio-developer, epinio-operator]
---
## epinio client-sync

Downloads a client binary matching the currently logged server

### Synopsis

Synchronizes the epinio client with the server by downloading the matching binary and replacing the current one.

```
epinio client-sync [flags]
```

### Options

```
  -h, --help   help for client-sync
```

### Options inherited from parent commands

```
  -H, --header stringArray       Add custom header to every request executed
  -c, --kubeconfig string        (KUBECONFIG) path to a kubeconfig, not required in-cluster
      --log-level string         (LOG_LEVEL) Only prints log messages at or above this level (debug, info, warn, error, fatal) (default "info")
      --no-colors                Suppress colorized output
      --settings-file string     (EPINIO_SETTINGS) set path of settings file (default "~/.config/epinio/settings.yaml")
      --skip-ssl-verification    (SKIP_SSL_VERIFICATION) Skip the verification of TLS certificates
      --timeout-multiplier int   (EPINIO_TIMEOUT_MULTIPLIER) Multiply timeouts by this factor (default 1)
      --verbosity int            (VERBOSITY) Only print progress messages at or above this level (0 or 1, default 0)
```

### SEE ALSO

* [epinio](./epinio.md)	 - Epinio cli

