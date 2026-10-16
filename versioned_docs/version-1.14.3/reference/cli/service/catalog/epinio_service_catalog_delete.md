---
sidebar_label: epinio service catalog delete
title: ""
description: epinio service catalog delete
keywords: [epinio, kubernetes, epinio service catalog delete]
doc-type: [reference]
doc-topic: [epinio, reference, epinio-cli, epinio-service-catalog-delete]
doc-persona: [epinio-developer, epinio-operator]
---
## epinio service catalog delete

Delete an Epinio catalog service

```
epinio service catalog delete NAME [flags]
```

### Options

```
  -h, --help   help for delete
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

* [epinio service catalog](./epinio_service_catalog.md)	 - Lists all available Epinio catalog services, or show the details of the specified one

