---
sidebar_label: epinio namespace
title: ""
description: epinio namespace
keywords: [epinio, kubernetes, epinio namespace]
doc-type: [reference]
doc-topic: [epinio, reference, epinio-cli, epinio-namespace]
doc-persona: [epinio-developer, epinio-operator]
---
## epinio namespace

Epinio-controlled namespaces

### Synopsis

Manage epinio-controlled namespaces

### Options

```
  -h, --help   help for namespace
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

* [epinio](../epinio.md)	 - Epinio cli
* [epinio namespace create](./epinio_namespace_create.md)	 - Creates an epinio-controlled namespace
* [epinio namespace delete](./epinio_namespace_delete.md)	 - Deletes an epinio-controlled namespace
* [epinio namespace list](./epinio_namespace_list.md)	 - Lists all epinio-controlled namespaces
* [epinio namespace show](./epinio_namespace_show.md)	 - Shows the details of an epinio-controlled namespace

