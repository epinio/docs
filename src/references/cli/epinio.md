## epinio

Epinio cli

### Synopsis

epinio cli is the official command line interface for Epinio PaaS 

### Options

```
      --config-file string       (EPINIO_CONFIG) set path of configuration file (default "~/.config/epinio/config.yaml")
  -h, --help                     help for epinio
  -c, --kubeconfig string        (KUBECONFIG) path to a kubeconfig, not required in-cluster
      --no-colors                Suppress colorized output
      --skip-ssl-verification    (SKIP_SSL_VERIFICATION) Skip the verification of TLS certificates
      --timeout-multiplier int   (EPINIO_TIMEOUT_MULTIPLIER) Multiply timeouts by this factor (default 1)
      --trace-level int          (TRACE_LEVEL) Only print trace messages at or above this level (0 to 5, default 0, print nothing)
      --verbosity int            (VERBOSITY) Only print progress messages at or above this level (0 or 1, default 0)
```

### SEE ALSO

* [epinio app](epinio_app.md)	 - Epinio application features
* [epinio completion](epinio_completion.md)	 - Generate completion script for a shell
* [epinio config](epinio_config.md)	 - Epinio config management
* [epinio info](epinio_info.md)	 - Shows information about the Epinio environment
* [epinio namespace](epinio_namespace.md)	 - Epinio-controlled namespaces
* [epinio push](epinio_push.md)	 - Push an application declared in the specified manifest
* [epinio server](epinio_server.md)	 - Starts the Epinio server.
* [epinio service](epinio_service.md)	 - Epinio service features
* [epinio target](epinio_target.md)	 - Targets an epinio-controlled namespace.
* [epinio version](epinio_version.md)	 - Print the version number

