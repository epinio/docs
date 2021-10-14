---
title: "epinio push"
linkTitle: "epinio push"
weight: 1
---
## epinio push

Push an application declared in the specified manifest

```
epinio push [flags] [PATH_TO_APPLICATION_MANIFEST]
```

### Options

```
  -b, --bind strings                 services to bind immediately
      --builder-image string         Paketo builder image to use for staging (default "paketobuildpacks/builder:full")
      --container-image-url string   Container image url for the app workload image
  -e, --env strings                  environment variables to be used
  -g, --git string                   Git repository and revision of sources
  -h, --help                         help for push
  -i, --instances int32              The number of instances the application should have (default 1)
  -n, --name string                  Application name.
  -p, --path string                  Path to application sources.
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

* [epinio](../epinio)	 - Epinio cli

