---
sidebar_label: epinio configuration
title: ""
description: epinio configuration
keywords: [epinio, kubernetes, epinio configuration]
doc-type: [reference]
doc-topic: [epinio, reference, epinio-cli, epinio-configuration]
doc-persona: [epinio-developer, epinio-operator]
---
## epinio configuration

Epinio configuration features

### Synopsis

Handle configuration features with Epinio

```
epinio configuration [flags]
```

### Options

```
  -h, --help   help for configuration
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
* [epinio configuration bind](./epinio_configuration_bind.md)	 - Bind a configuration to an application
* [epinio configuration create](./epinio_configuration_create.md)	 - Create a configuration
* [epinio configuration delete](./epinio_configuration_delete.md)	 - Delete one or more configurations
* [epinio configuration list](./epinio_configuration_list.md)	 - Lists configurations
* [epinio configuration show](./epinio_configuration_show.md)	 - Configuration information
* [epinio configuration unbind](./epinio_configuration_unbind.md)	 - Unbind configuration from an application
* [epinio configuration update](./epinio_configuration_update.md)	 - Update a configuration

