---
sidebar_label: "Creating A Git Configuration"
sidebar_position: 13
title: ""
---

# Create a Git Configuration

As described [in the Git Configuration reference page](../references/git_configuration.md), Epinio Git Configurations are Kubernetes secrets with a particular label.

To create one you apply a Secret resource to your Kubernetes cluster:

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

The only required field is the `url`, so if you want for example to just skip the SSL verification for a particular provider you can create a simpler secret, and label it:

```bash
kubectl create secret generic mygit-config -n epinio --from-literal=url=https://gitlab.mydomain.com --from-literal=skipSSL=true
kubectl label secret mygit-config -n epinio "epinio.io/api-git-credentials=true"
```

or apply this resource:

```yaml
apiVersion: v1 
kind: Secret 
type: Opaque 
metadata: 
  labels: 
    epinio.io/api-git-credentials: "true"
  name: mygit-config 
  namespace: epinio 
stringData:
  url: https://gitlab.mydomain.com
  skipSSL: true 
```
