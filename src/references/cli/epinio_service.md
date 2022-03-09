## epinio service

Epinio service features

### Synopsis

Handle service features with Epinio

```
epinio service [flags]
```

### Options

```
  -h, --help   help for service
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

* [epinio](epinio.md)	 - Epinio cli
* [epinio service bind](epinio_service_bind.md)	 - Bind a service to an application
* [epinio service create](epinio_service_create.md)	 - Create a service
* [epinio service delete](epinio_service_delete.md)	 - Delete a service
* [epinio service list](epinio_service_list.md)	 - Lists services
* [epinio service show](epinio_service_show.md)	 - Service information
* [epinio service unbind](epinio_service_unbind.md)	 - Unbind service from an application
* [epinio service update](epinio_service_update.md)	 - Update a service

