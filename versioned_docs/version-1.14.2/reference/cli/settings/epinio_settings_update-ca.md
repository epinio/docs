---
sidebar_label: epinio settings update-ca
title: ""
description: epinio settings update-ca
keywords: [epinio, kubernetes, epinio settings update-ca]
doc-type: [reference]
doc-topic: [epinio, reference, epinio-cli, epinio-settings-update-ca]
doc-persona: [epinio-developer, epinio-operator]
---
## epinio settings update-ca

Update the api location and CA certificate

### Synopsis

Update the api location and CA certificate from the current cluster

```
epinio settings update-ca [flags]
```

### Options

```
  -h, --help   help for update-ca
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

* [epinio settings](./epinio_settings.md)	 - Epinio settings management

