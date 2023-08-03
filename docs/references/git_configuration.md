---
sidebar_label: "Git Configuration"
title: ""
---

# Git Configuration

Since version **1.10.0**, Epinio supports Git configuration.

You can provide for each git host particular settings, to clone private repositories, skip the SSL verification, or provide your own certificate bundle.

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


When importing a git repository Epinio will try to look for the existance of the most specific configuration. For example trying to clone the `https://github.com/myusername/myrepo` Epinio will first look for a configuration having the `https://github.com` *URL*, a `myusername` *userOrg* and a `myrepo` *repo*.
If not found it will look for a configuration having the `https://github.com` *URL* and a `myusername` *userOrg*. And finally if not found Epinio will look for a configuration for the `https://github.com` *URL*.

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

If you are looking for some examples you can the [How-To](../howtos/create_git_configuration.md).
