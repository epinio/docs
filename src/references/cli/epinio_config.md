## epinio config

Epinio config management

### Synopsis

Manage the epinio cli configuration

```
epinio config [flags]
```

### Options

```
  -h, --help   help for config
```

### Options inherited from parent commands

```
      --config-file string       (EPINIO_CONFIG) set path of configuration file (default "~/.config/epinio/config.yaml")
  -c, --kubeconfig string        (KUBECONFIG) path to a kubeconfig, not required in-cluster
      --no-colors                Suppress colorized output
      --skip-ssl-verification    (SKIP_SSL_VERIFICATION) Skip the verification of TLS certificates
      --timeout-multiplier int   (EPINIO_TIMEOUT_MULTIPLIER) Multiply timeouts by this factor (default 1)
      --trace-level int          (TRACE_LEVEL) Only print trace messages at or above this level (0 to 5, default 0, print nothing)
      --verbosity int            (VERBOSITY) Only print progress messages at or above this level (0 or 1, default 0)
```

### SEE ALSO

* [epinio](epinio.md)	 - Epinio cli
* [epinio config colors](epinio_config_colors.md)	 - Manage colored output
* [epinio config show](epinio_config_show.md)	 - Show the current configuration
* [epinio config update](epinio_config_update.md)	 - Update the api location & stored credentials

