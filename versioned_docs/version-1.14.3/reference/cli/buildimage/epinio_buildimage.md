---
sidebar_label: epinio buildimage
title: ""
description: epinio buildimage
keywords: [epinio, kubernetes, epinio buildimage]
doc-type: [reference]
doc-topic: [epinio, reference, epinio-cli, epinio-buildimage]
doc-persona: [epinio-developer, epinio-operator]
---
## epinio buildimage

Epinio builder image management

### Synopsis

Manage epinio builder images

### Options

```
  -h, --help   help for buildimage
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

* [epinio](../epinio.md)	 - Epinio cli
* [epinio buildimage create](./epinio_buildimage_create.md)	 - Create a builder image
* [epinio buildimage delete](./epinio_buildimage_delete.md)	 - Delete a builder image
* [epinio buildimage list](./epinio_buildimage_list.md)	 - List builder images
* [epinio buildimage show](./epinio_buildimage_show.md)	 - Describe a builder image
* [epinio buildimage update](./epinio_buildimage_update.md)	 - Update a builder image

