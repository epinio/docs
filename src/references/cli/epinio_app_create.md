---
title: "epinio app create"
linkTitle: "epinio app create"
weight: 1
---
## epinio app create

Create just the app, without creating a workload

```
epinio app create NAME [flags]
```

### Options

```
  -b, --bind strings      services to bind immediately
  -e, --env strings       environment variables to be used
  -h, --help              help for create
  -i, --instances int32   The number of instances the application should have (default 1)
  -r, --route strings     Custom route to use for the application (a subdomain of the default domain will be used if this is not set). Can be set multiple times to use multiple routes with the same application.
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

* [epinio app](epinio_app.md)	 - Epinio application features

