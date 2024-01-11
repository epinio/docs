---
sidebar_label: "Creating A Git Configuration"
sidebar_position: 13
title: ""
---

<head>
  <link rel="canonical" href="https://docs.epinio.io/howtos/customization/create_git_configuration"/>
</head>

# Create a Git Configuration

As described [in the Git Configuration reference page](../../references/git_configuration.md),
Epinio Git Configurations are Kubernetes secrets with a particular label.

Creation is done with the
[epinio gitconfig create](../../references/commands/cli/gitconfig/epinio_gitconfig_create.md)
command.

For example:

```bash
epinio gitconfig create github-epinio-example-go-configuration https://github.com \
    --git-provider github	\
    --user-org 	   epinio	\
    --repository   example-go	\
    --skip-ssl	   		\
    --username 	   myuser	\
    --password 	   abcde12345	\
    --cert-file	   /path/to/some/certfile
```

The only required arguments are the name of the git configuration, and the repository url.
Everything else is optional, and specified through flags.

If, for example, we only have to skip the SSL configuration for a particular provider just use:

```bash
epinio gitconfig create mygit-config https://gitlab.mydomain.com --skip-ssl
```
