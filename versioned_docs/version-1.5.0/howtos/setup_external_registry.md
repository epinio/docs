---
sidebar_label: "Setup external container registry"
sidebar_position: 6
title: ""
---

## How to setup external Epinio registry

Epinio allows the use of an external registry for the storage of application images.  This can be achieved by setting the following variables during the `helm install`:

```
helm install \
  --set containerregistry.enabled=false \
  --set global.registryURL=$REGISTRY_URL \
  --set global.registryNamespace=$REGISTRY_NAMESPACE \
  --set global.registryUsername=$REGISTRY_USER \
  --set global.registryPassword=$REGISTRY_PASSWORD \
  ... (other options here) \
  epinio epinio/epinio
```

Using [dockerhub](https://hub.docker.com/) as an example, the user would have to set the value of `$REGISTRY_URL` to `registry.hub.docker.com`, `$REGISTRY_USER` and `$REGISTRY_PASSWORD` would be set to the dockerhub credentials, and `$REGISTRY_NAMESPACE` would be either an organization or the username.

When the above arguments are set, Epinio doesn't deploy a registry on the cluster.
