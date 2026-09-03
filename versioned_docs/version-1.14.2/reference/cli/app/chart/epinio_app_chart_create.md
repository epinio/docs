---
sidebar_label: epinio app chart create
title: ""
description: epinio app chart create
keywords: [epinio, kubernetes, epinio app chart create]
doc-type: [reference]
doc-topic: [epinio, reference, epinio-cli, epinio-app-chart-create]
doc-persona: [epinio-developer, epinio-operator]
---
## epinio app chart create

Create an application chart

### Synopsis

Create an application chart

```
epinio app chart create --name NAME [flags]
```

### Options

```
      --description string         long description
      --helm-chart string          Helm chart URL
      --helm-repo string           Helm repository URL
  -h, --help                       help for create
      --name string                application chart name (required)
      --set strings                values map entry as key=value (repeatable)
      --short-description string   short description
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

* [epinio app chart](./epinio_app_chart.md)	 - Epinio application chart management

