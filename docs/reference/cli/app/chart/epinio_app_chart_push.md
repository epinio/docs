---
sidebar_label: epinio app chart push
title: ""
description: epinio app chart push
keywords: [epinio, kubernetes, epinio app chart push]
doc-type: [reference]
doc-topic: [epinio, reference, epinio-cli, epinio-app-chart-push]
doc-persona: [epinio-developer, epinio-operator]
---
## epinio app chart push

Push a helm chart archive to Epinio's registry as application chart

### Synopsis

Push a helm chart archive (a .tgz, as created by 'helm package') to Epinio's own
registry, and create the application chart NAME referencing it.

The registry credentials are held by the Epinio server. They are neither needed nor exposed.

```
epinio app chart push NAME CHART-ARCHIVE [flags]
```

### Examples

```
epinio app chart push mychart ./mychart-0.1.0.tgz --short-description 'My chart'
```

### Options

```
      --description string         long description
  -h, --help                       help for push
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

