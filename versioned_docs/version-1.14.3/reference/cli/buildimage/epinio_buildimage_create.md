---
sidebar_label: epinio buildimage create
title: ""
description: epinio buildimage create
keywords: [epinio, kubernetes, epinio buildimage create]
doc-type: [reference]
doc-topic: [epinio, reference, epinio-cli, epinio-buildimage-create]
doc-persona: [epinio-developer, epinio-operator]
---
## epinio buildimage create

Create a builder image

### Synopsis

Create a builder image

```
epinio buildimage create --name NAME --image IMAGE [flags]
```

### Options

```
      --description string         long description
  -h, --help                       help for create
      --image string               full image reference
      --name string                builder image name (required)
      --short-description string   short description
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

* [epinio buildimage](./epinio_buildimage.md)	 - Epinio builder image management

