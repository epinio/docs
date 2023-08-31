---
title: ""
sidebar_label: "epinio gitconfig"
---
## epinio gitconfig

Epinio git configuration management

### Synopsis

Manage git configurations

```
epinio gitconfig [flags]
```

### Options

```
  -h, --help   help for gitconfig
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
* [epinio gitconfig create](./epinio_gitconfig_create.md)	 - Creates a git configuration
* [epinio gitconfig delete](./epinio_gitconfig_delete.md)	 - Delete git configurations
* [epinio gitconfig list](./epinio_gitconfig_list.md)	 - Lists all git configurations
* [epinio gitconfig show](./epinio_gitconfig_show.md)	 - Shows the details of a git configuration

