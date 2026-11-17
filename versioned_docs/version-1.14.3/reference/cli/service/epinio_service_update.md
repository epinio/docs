---
sidebar_label: epinio service update
title: ""
description: epinio service update
keywords: [epinio, kubernetes, epinio service update]
doc-type: [reference]
doc-topic: [epinio, reference, epinio-cli, epinio-service-update]
doc-persona: [epinio-developer, epinio-operator]
---
## epinio service update

Update a service

### Synopsis

Update service by name and change instructions through flags.

```
epinio service update NAME [flags]
```

### Options

```
  -h, --help            help for update
      --no-restart      Prevent restarting bound applications after update
  -s, --set strings     configuration key/value assignments to add/modify
  -u, --unset strings   configuration keys to remove
      --wait            Wait for deployment to complete
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

* [epinio service](./epinio_service.md)	 - Epinio service management

