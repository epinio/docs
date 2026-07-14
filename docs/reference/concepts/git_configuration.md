---
sidebar_label: "Git Configuration"
title: "Git Configuration"
sidebar_position: 3
description: Starting with version **1.10.0**, Epinio supports Git configurations.
keywords: [epinio, git, configuration]
doc-type: [reference]
doc-persona: [epinio-developer, epinio-operator]
doc-topic: [epinio, reference, concepts, git-configuration]
---

## Overview

Configurations enable cloning of private repositories, disabling of SSL verification, and/or
extending verification through a custom bundle of certificates.

For GitHub and Gitlab instances a user can create the git config with the username and password/token, along with skip ssl verification, and the global configuration flag. A global configuration means anyone with access to create applications can use it. If its not flagged as global, the user who created it and system admins are the only ones that can see the configuration. 

If Git, GitHub Enterprise, and GitLab Enterprise options are selected the same fields are available, but in addition to that there is the git host option where the user can specify the git host url. This is useful for self-hosted git instances.


## Github/Gitlab Specialities

The public Github and Gitlab repositories support the use of a `PAT` (Personal Access Token)
over a plain combination of user and password.

When using a PAT it has to be set as the password, and the user can be set to anything except empty.

:::tip
For reference, it is useful to set it to the username used to generate the token.
:::

## Github Enterprise Cloud vs Github Enterprise Server

When trying to add a Git Config for a Github Enterprise Cloud instance, you can use the GitHub Enterpise Cloud type, which allows you to enter a custom URL needed to pull from the Enterprise Organization. The GitHub Enterprise Server type is used for self-hosted instances of GitHub Enterprise. You can enter the host URL and Epinio will append the necessary routes to access the Github API on the self-hosted instance. 

## Detailed Specification

A Git configuration is a Kubernetes secret with the `epinio.io/api-git-credentials: "true"` label.

The fields are:

|Field		   |Required|Meaning									|
|---		   |---	    |---										|
|`id`          |yes     | the name of the secret                                |
|`url`		   |	    | the host of the git instance							|
|`provider`	   |yes	    | one of `github`, `gitlab`, `git`, `github_enterprise`, `gitlab_enterprise`	|
|`username`	   |	    | used during the Basic Authentication						|
|`password`	   |	    | used during the Basic Authentication						|
|`skipSSL`	   |	    | used to skip the SSL verification						|
| `global`     |       | used to make the configuration available to all users     |
|`certificate` |	| the CA bundle to load for the SSL verification with self-signed certificates	|

## Git Configuration Flow

<img
  src={require('./git-config-flow.png').default}
  alt="Git Configuration in Epinio"
/>

For more examples check the [How-to](../../how-to/developer/concepts/git_configuration.md).
