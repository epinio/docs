---
sidebar_label: epinio push
title: ""
description: epinio push
keywords: [epinio, kubernetes, epinio push]
doc-type: [reference]
doc-topic: [epinio, reference, epinio-cli, epinio-push]
doc-persona: [epinio-developer, epinio-operator]
---
## epinio push

Push an application declared in the specified manifest

```
epinio push [flags] [PATH_TO_APPLICATION_MANIFEST]
```

### Options

```
      --app-chart string             App chart to use for deployment
  -b, --bind strings                 configurations to bind immediately
      --build-mode string            Staging build mode: buildpack (default) or dockerfile
      --builder-image string         Paketo builder image to use for staging
  -v, --chart-value strings          chart customization to be used
  -z, --clear-routes                 clear routes / no routes
      --container-image-url string   Container image url for the app workload image
      --dockerfile-path string       Path to Dockerfile within the application sources (default: Dockerfile)
  -e, --env strings                  environment variables to be used
      --env-replace                  Replace existing environment instead of merging
  -g, --git string                   Git repository and revision of sources separated by comma (e.g. GIT_URL,REVISION)
      --git-config string            Name of the git configuration to use for the Git import
  -h, --help                         help for push
  -i, --instances int32              The number of instances the application should have (default 1)
  -n, --name string                  Application name. (mandatory if no manifest is provided)
  -p, --path string                  Path to application sources.
  -r, --route strings                Custom route to use for the application (a subdomain of the default domain will be used if this is not set). Can be set multiple times to use multiple routes with the same application.
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

* [epinio](./epinio.md)	 - Epinio cli

