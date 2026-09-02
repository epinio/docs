---
sidebar_label: epinio gitconfig create
title: ""
description: epinio gitconfig create
keywords: [epinio, kubernetes, epinio gitconfig create]
doc-type: [reference]
doc-topic: [epinio, reference, epinio-cli, epinio-gitconfig-create]
doc-persona: [epinio-developer, epinio-operator]
---
## epinio gitconfig create

Creates a git configuration

```
epinio gitconfig create ID URL [flags]
```

### Options

```
      --cert-file string      path to file holding supporting certificates
      --git-provider string   Git provider code [git|github|github_enterprise_cloud|github_enterprise_self_hosted|gitlab|gitlab_enterprise] (default "git")
      --global                make the configuration available to all users
  -h, --help                  help for create
      --password string       password for logging into the host
      --repository string     specific repository
      --skip-ssl              skip SSL
      --user-org string       user/org holding repository
      --username string       user name for logging into the host
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

* [epinio gitconfig](./epinio_gitconfig.md)	 - Epinio git configuration management

