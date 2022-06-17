---
title: ""
sidebar_label: "epinio app env"
---
## epinio app env

Epinio application configuration

### Synopsis

Manage epinio application environment variables

### Options

```
  -h, --help   help for env
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

* [epinio app](../epinio_app.md)	 - Epinio application features
* [epinio app env list](./epinio_app_env_list.md)	 - Lists application environment
* [epinio app env set](./epinio_app_env_set.md)	 - Extend application environment
* [epinio app env show](./epinio_app_env_show.md)	 - Describe application's environment variable
* [epinio app env unset](./epinio_app_env_unset.md)	 - Shrink application environment

