---
sidebar_label: "Git Configuration"
title: ""
---

# Git Configuration

Starting with version **1.10.0**, Epinio supports Git configurations.

Configurations provide information enabling the cloning of private repositories, disabling of SSL verification, or extending verification through a custom bundle of certificates. All on a per git host (+user/org, +repository) basis.

A Git configuration is a Kubernetes secret with the `epinio.io/api-git-credentials: "true"` label.

The available fields are:

- **url (required):** the host of the git instance
- **provider:** one of `github`, `gitlab`, `git`, `github_enterprise`, `gitlab_enterprise`
- **username:** used during the Basic Authentication 
- **password:** used during the Basic Authentication
- **userOrg:** used to restrict the configuration to a specific organization/project 
- **repo:** used to restrict the configuration to a specific repository 
- **skipSSL:** used to skip the SSL verification 
- **certificate:** the CA bundle to load for the SSL verification with self-signed certificates


When importing from a git repository Epinio will look for the the most specific matching configuration, if any. For example when trying to clone `https://github.com/myusername/myrepo` Epinio will first look for a configuration having the `https://github.com` *URL*, a `myusername` *userOrg* and a `myrepo` *repo*.
If not found it will look for a configuration having the `https://github.com` *URL* and a `myusername` *userOrg*. And finally it will look for a configuration having just the `https://github.com` *URL*.

All the fields, except for the URL, are optional.

For Github and Gitlab you can create a PAT (Personal Access Token) and use it in the `password` field. You will need to provide a `username` as well, but it can be anything. As a suggestion it's useful to use the username used to generate the token.

This is an example of a complete Git Configuration secret:

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

If you are looking for some examples you can check the [How-To](../howtos/create_git_configuration.md).
