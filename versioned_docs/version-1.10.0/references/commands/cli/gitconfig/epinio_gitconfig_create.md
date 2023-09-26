---
title: ""
sidebar_label: "epinio gitconfig create"
---
## epinio gitconfig create

Creates a git configuration

```
epinio gitconfig create ID URL [flags]
```

### Options

```
      --cert-file string      path to file holding supporting certificates
      --git-provider string   Git provider code (default 'git')
  -h, --help                  help for create
      --password string       password for logging into the host
      --repository string     specific repository
      --skip-ssl              skip ssl
      --user-org string       user/org holding repository
      --username string       user name for logging into the host
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

* [epinio gitconfig](./epinio_gitconfig.md)	 - Epinio git configuration management

