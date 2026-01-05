---
sidebar_label: Creating a Git configuration
sidebar_position: 13
title: Creating a Git configuration
description: How to create a Git configuration
keywords: [epinio, kubernetes, git configuration]
doc-type: [how-to]
doc-topic: [epinio, how-to, customize, create-git-config]
doc-persona: [epinio-operator]
---


As described
[in the Git Configuration reference page](../../references/git_configuration.md),
Epinio Git Configurations are Kubernetes secrets with a particular label.

Creation is done with the
[epinio gitconfig create](../../references/commands/cli/gitconfig/epinio_gitconfig_create.md)
command.

For example:

```console
epinio gitconfig create github-epinio-example-go-configuration https://github.com \
    --git-provider github \
    --user-org epinio \
    --repository example-go \
    --skip-ssl \
    --username myuser \
    --password abcde12345 \
    --cert-file /path/to/some/certfile
```

The only required arguments are the name of the git configuration, and the repository URL.
Everything else is optional, and specified through flags.

If, for example, to skip the SSL configuration for a particular provider use:

```bash
epinio gitconfig create mygit-config https://gitlab.mydomain.com --skip-ssl
```
