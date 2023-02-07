---
title: ""
sidebar_label: "epinio configuration delete"
---
## epinio configuration delete

Delete one or more configurations

### Synopsis

Delete configurations by name.

```
epinio configuration delete NAME1 [NAME2 ...] [flags]
```

### Options

```
  -h, --help     help for delete
      --unbind   Unbind from applications before deleting
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

* [epinio configuration](./epinio_configuration.md)	 - Epinio configuration features

