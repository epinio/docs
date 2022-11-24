---
title: ""
sidebar_label: "epinio completion"
---
## epinio completion

Generate completion script for a shell

### Synopsis

To load completions:

Bash:

$ source <(epinio completion bash)

# To load completions for each session, execute once:
Linux:
  $ epinio completion bash > /etc/bash_completion.d/epinio
MacOS:
  $ epinio completion bash > /usr/local/etc/bash_completion.d/epinio

ATTENTION:
    The generated script requires the bash-completion package.
    See https://kubernetes.io/docs/tasks/tools/install-kubectl/#enabling-shell-autocompletion
    for information on how to install and activate it.

Zsh:

# If shell completion is not already enabled in your environment you will need
# to enable it.  You can execute the following once:

$ echo "autoload -U compinit; compinit" >> ~/.zshrc

# To load completions for each session, execute once:
$ epinio completion zsh > "${fpath[1]}/_epinio"

# You will need to start a new shell for this setup to take effect.

Fish:

$ epinio completion fish | source

# To load completions for each session, execute once:
$ epinio completion fish > ~/.config/fish/completions/epinio.fish

Powershell:

PS> epinio completion powershell | Out-String | Invoke-Expression

# To load completions for every new session, run:
PS> epinio completion powershell > epinio.ps1
# and source this file from your powershell profile.


```
epinio completion [bash|zsh|fish|powershell]
```

### Options

```
  -h, --help   help for completion
```

### Options inherited from parent commands

```
  -c, --kubeconfig string        (KUBECONFIG) path to a kubeconfig, not required in-cluster
      --no-colors                Suppress colorized output
      --settings-file string     (EPINIO_SETTINGS) set path of settings file (default "~/.config/epinio/settings.yaml")
      --skip-ssl-verification    (SKIP_SSL_VERIFICATION) Skip the verification of TLS certificates
      --timeout-multiplier int   (EPINIO_TIMEOUT_MULTIPLIER) Multiply timeouts by this factor (default 1)
      --trace-level int          (TRACE_LEVEL) Only print trace messages at or above this level (0 to 255, default 0, print nothing)
      --verbosity int            (VERBOSITY) Only print progress messages at or above this level (0 or 1, default 0)
```

### SEE ALSO

* [epinio](./epinio.md)	 - Epinio cli

