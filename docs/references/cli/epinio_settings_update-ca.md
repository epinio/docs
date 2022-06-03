---
title: ""
sidebar_label: "epinio settings update-ca"
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
  -h, --help               help for update-ca
  -n, --namespace string   (NAMESPACE) The namespace to use (default "epinio")
```

### Options inherited from parent commands

```
  -c, --kubeconfig string        (KUBECONFIG) path to a kubeconfig, not required in-cluster
      --no-colors                Suppress colorized output
      --settings-file string     (EPINIO_SETTINGS) set path of settings file (default "~/.config/epinio/settings.yaml")
      --skip-ssl-verification    (SKIP_SSL_VERIFICATION) Skip the verification of TLS certificates
      --timeout-multiplier int   (EPINIO_TIMEOUT_MULTIPLIER) Multiply timeouts by this factor (default 1)
      --trace-level int          (TRACE_LEVEL) Only print trace messages at or above this level (0 to 255, default 0, print nothing)
      --verbosity int            (VERBOSITY) Only print progress messages at or above this level (0 or 1, default 0)
```

### SEE ALSO

* [epinio settings](./epinio_settings.md)	 - Epinio settings management

