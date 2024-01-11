---
sidebar_label: "Git Configuration"
title: ""
---

<head>
  <link rel="canonical" href="https://docs.epinio.io/references/git_configuration"/>
</head>

# Git Configuration

## Overview

Starting with version **1.10.0**, Epinio supports Git configurations.

Configurations enable cloning of private repositories, disabling of SSL verification, and/or
extending verification through a custom bundle of certificates.

This is done on a per git host (+user/org, +repository) basis.

Management, including creation, is done through the
[epinio gitconfig](commands/cli/gitconfig/epinio_gitconfig.md)
command ensemble.

## Matching process

When importing from a git repository Epinio will use the most specific matching configuration, if
there is any.

This means that a matching configuration specifying url, user/organization, and repository has
priority over matching configurations specifying only url and user/organization, or even just the
url.

If no configuration is found then the cloning from the Git repository will run without any
customization.

## Github/Gitlab specialities

The public Github and Gitlab mega repositories support the use of a `PAT` (Personal Access Token)
over a plain combination of user and password.

When using a PAT it has to be set as the password, and the user can be set to anything except empty.

:::tip
For reference, it is useful to set it to the username used to generate the token.
:::

## Detailed specification

:::note
This section contains information useful to operators for debugging and inspection. 
Regular users should not normally need to consult this section.
:::

A Git configuration is a Kubernetes secret with the `epinio.io/api-git-credentials: "true"` label.

The fields are:

|Field		|Required|Meaning									|
|---		|---	|---										|
|`url`		|yes	| the host of the git instance							|
|`provider`	|	| one of `github`, `gitlab`, `git`, `github_enterprise`, `gitlab_enterprise`	|
|`username`	|	| used during the Basic Authentication						|
|`password`	|	| used during the Basic Authentication						|
|`userOrg`	|	| used to restrict the configuration to a specific organization/project		|
|`repo`		|	| used to restrict the configuration to a specific repository			|
|`skipSSL`	|	| used to skip the SSL verification						|
|`certificate`	|	| the CA bundle to load for the SSL verification with self-signed certificates	|

All the fields, except for the URL, are optional.

## Example:

Invoking the commands

```bash
cat > certfile <<EOF
-----BEGIN CERTIFICATE-----
MIIBaTCCAQ+gAwIBAgIRAN4tvwEOKogvOzT/KccL8t8wCgYIKoZIzj0EAwIwFDES
***************
-----END CERTIFICATE-----
EOF

epinio gitconfig create github-epinio-example-go-configuration https://github.com \
    --git-provider github	\
    --user-org 	   epinio	\
    --repository   example-go	\
    --skip-ssl	   		\
    --username 	   myuser	\
    --password 	   abcde12345	\
    --cert-file	   certfile
```

will generate the secret

```yaml
apiVersion: v1 
kind: Secret 
type: Opaque 
metadata: 
  labels: 
    epinio.io/api-git-credentials: "true"
  name: github-epinio-example-go-configuration 
  namespace: epinio 
stringData:
  url: https://github.com
  provider: github
  username: "myuser" 
  password: "abcde12345" 
  userOrg: epinio 
  repo: example-go 
  skipSSL: true 
  certificate: |
    -----BEGIN CERTIFICATE-----
    MIIBaTCCAQ+gAwIBAgIRAN4tvwEOKogvOzT/KccL8t8wCgYIKoZIzj0EAwIwFDES
    ***************
    -----END CERTIFICATE-----
```

For more examples check the [How-to](../howtos/customization/create_git_configuration.md).
