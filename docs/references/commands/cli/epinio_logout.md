---
sidebar_label: epinio logout
title: ""
description: epinio logout
keywords: [epinio, kubernetes, epinio logout]
doc-type: [reference]
doc-topic: [epinio, reference, epinio-cli, epinio-logout]
doc-persona: [epinio-developer, epinio-operator]
---
## epinio logout

Epinio logout from server

### Synopsis

The logout command removs all authentication information from the local state, i.e. settings file

```
epinio logout [flags]
```

### Options

```
  -h, --help   help for logout
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

* [epinio](./epinio.md)	 - Epinio cli

