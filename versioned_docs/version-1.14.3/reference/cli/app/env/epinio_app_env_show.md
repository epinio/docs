---
sidebar_label: epinio app env show
title: ""
description: epinio app env show
keywords: [epinio, kubernetes, epinio app env show]
doc-type: [reference]
doc-topic: [epinio, reference, epinio-cli, epinio-app-env-show]
doc-persona: [epinio-developer, epinio-operator]
---
## epinio app env show

Describe application's environment variable

```
epinio app env show APPNAME NAME [flags]
```

### Options

```
  -h, --help   help for show
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

* [epinio app env](./epinio_app_env.md)	 - Epinio application configuration

