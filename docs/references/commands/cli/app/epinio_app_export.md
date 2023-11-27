---
sidebar_label: epinio app export
description: epinio app export
keywords: [epinio, kubernetes, epinio app export]
doc-type: [reference]
doc-topic: [epinio, reference, epinio-cli, epinio-app-export]
doc-persona: [epinio-developer, epinio-operator]
---
## epinio app export

Export the named application into the directory or flag-specified registry

```
epinio app export NAME [DIRECTORY] [flags]
```

### Options

```
      --chart-name string      User chosen name for the chart file
      --chart-version string   User chosen version for the chart file
  -h, --help                   help for export
      --image-name string      User chosen name for the image file
      --image-tag string       User chosen tag for the image file
  -r, --registry string        The name of the registry to export to
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

