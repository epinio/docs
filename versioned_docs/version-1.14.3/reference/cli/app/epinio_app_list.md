---
sidebar_label: epinio app list
title: ""
description: epinio app list
keywords: [epinio, kubernetes, epinio app list]
doc-type: [reference]
doc-topic: [epinio, reference, epinio-cli, epinio-app-list]
doc-persona: [epinio-developer, epinio-operator]
---
## epinio app list

Lists applications

### Synopsis

Lists applications in the targeted namespace, or all

```
epinio app list [--all] [flags]
```

### Options

```
      --all             list all applications
  -h, --help            help for list
  -o, --output string   sets output format [text|json] (default "text")
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

* [epinio app](./epinio_app.md)	 - Epinio application features

