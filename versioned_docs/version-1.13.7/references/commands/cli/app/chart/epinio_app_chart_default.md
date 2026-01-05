---
sidebar_label: epinio app chart default
title: ""
description: epinio app chart default
keywords: [epinio, kubernetes, epinio app chart default]
doc-type: [reference]
doc-topic: [epinio, reference, epinio-cli, epinio-app-chart-default]
doc-persona: [epinio-developer, epinio-operator]
---
## epinio app chart default

Set or show app chart default

### Synopsis

Set or show app chart default

```
epinio app chart default [CHARTNAME] [flags]
```

### Options

```
  -h, --help   help for default
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

* [epinio app chart](./epinio_app_chart.md)	 - Epinio application chart management

