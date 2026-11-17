---
sidebar_label: epinio app build list
title: ""
description: epinio app build list
keywords: [epinio, kubernetes, epinio app build list]
doc-type: [reference]
doc-topic: [epinio, reference, epinio-cli, epinio-app-build-list]
doc-persona: [epinio-developer, epinio-operator]
---
## epinio app build list

List applications and their current build

```
epinio app build list [flags]
```

### Options

```
  -h, --help   help for list
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

* [epinio app build](./epinio_app_build.md)	 - Build and store an application image without deploying it