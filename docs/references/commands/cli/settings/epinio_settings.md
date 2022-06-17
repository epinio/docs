---
title: ""
sidebar_label: "epinio settings"
---
## epinio settings

Epinio settings management

### Synopsis

Manage the epinio cli settings

```
epinio settings [flags]
```

### Options

```
  -h, --help   help for settings
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

* [epinio](../epinio.md)	 - Epinio cli
* [epinio settings colors](./epinio_settings_colors.md)	 - Manage colored output
* [epinio settings show](./epinio_settings_show.md)	 - Show the current settings
* [epinio settings update-ca](./epinio_settings_update-ca.md)	 - Update the api location and CA certificate

