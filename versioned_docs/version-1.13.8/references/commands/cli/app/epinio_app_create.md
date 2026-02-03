---
sidebar_label: epinio app create
title: ""
description: epinio app create
keywords: [epinio, kubernetes, epinio app create]
doc-type: [reference]
doc-topic: [epinio, reference, epinio-cli, epinio-app-create]
doc-persona: [epinio-developer, epinio-operator]
---
## epinio app create

Create just the app, without creating a workload

```
epinio app create NAME [flags]
```

### Options

```
      --app-chart string      App chart to use for deployment
  -b, --bind strings          configurations to bind immediately
  -v, --chart-value strings   chart customization to be used
  -z, --clear-routes          clear routes / no routes
  -e, --env strings           environment variables to be used, the new environment variables will merge with the existing set. 
  -h, --help                  help for create
  -i, --instances int32       The number of instances the application should have (default 1)
  -r, --route strings         Custom route to use for the application (a subdomain of the default domain will be used if this is not set). Can be set multiple times to use multiple routes with the same application.
      --env-replace           Replaces all environment variables with the new set defined.
```

### Options inherited from parent commands

```
  -H, --header stringArray       Add custom header to every request executed
  -c, --kubeconfig string        (KUBECONFIG) path to a kubeconfig, not required in-cluster
      --no-colors                Suppress colorized output
      --settings-file string     (EPINIO_SETTINGS) set path of settings file (default "~/.config/epinio/settings.yaml")
      --skip-ssl-verification    (SKIP_SSL_VERIFICATION) Skip the verification of TLS certificates
      --timeout-multiplier int   (EPINIO_TIMEOUT_MULTIPLIER) Multiply timeouts by this factor (default 1)
      --trace-file string        (TRACE_FILE) Print trace messages to the specified file
      --trace-level int          (TRACE_LEVEL) Only print trace messages at or above this level (0 to 255, default 0, print nothing)
      --trace-output string      (TRACE_OUTPUT) Sets trace output format [text,json] (default "text")
      --verbosity int            (VERBOSITY) Only print progress messages at or above this level (0 or 1, default 0)
```

### SEE ALSO

* [epinio app](./epinio_app.md)	 - Epinio application features

