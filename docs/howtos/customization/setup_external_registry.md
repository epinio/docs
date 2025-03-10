---
sidebar_label: Setting up an external container registry
sidebar_position: 8
title: How to set up an external container registry
description: How to setup an external container registry
keywords: [epinio, kubernetes, external container registry setup]
doc-type: [how-to]
doc-topic: [epinio, how-to, custom, setup-external-container-registry]
doc-persona: [epinio-operator]
---

<head>
  <link rel="canonical" href="https://docs.epinio.io/howtos/customization/setup_external_registry"/>
</head>

You can use an external registry for Epinio to store application images.
You can do this by setting the following variables during the `helm install`:

```console
helm install \
  --set containerregistry.enabled=false \
  --set global.registryURL=$REGISTRY_URL \
  --set global.registryNamespace=$REGISTRY_NAMESPACE \
  --set global.registryUsername=$REGISTRY_USER \
  --set global.registryPassword=$REGISTRY_PASSWORD \
  ... (other options here) \
  epinio epinio/epinio
```

Using [Docker Hub](https://hub.docker.com/) as an example, you would have to set
the value of `$REGISTRY_URL` to `registry.hub.docker.com`, `$REGISTRY_USER` and
`$REGISTRY_PASSWORD` are set to the Docker Hub credentials.
Lastly, `$REGISTRY_NAMESPACE`
would be either an organization or username.

With these arguments set, Epinio doesn't deploy a registry on the cluster.

## Advanced setup for a secure external registry

When access to the external registry is secured via TLS it's necessary to make the correct certificate known to both Epinio and the cluster (that is, the kubelets).

Assuming that `epinio-external-registry-tls` is the name of the Kubernetes secret used to store the certificate then adding to the `helm install` command:

```console
    --set containerregistry.certificateSecret=epinio-external-registry-tls
```

is enough to make the certificate known to Epinio.

:::note

The secret needs to be in the `epinio` namespace.
The certificate needs to be under the key `tls.crt` of that secret
and needs to be in PEM format.

:::

Making the same information known to the cluster itself, that is, the kubelets, differs between distributions of Kubernetes.

Assuming a k3s cluster running on an openSUSE or SLE-based host, and the certificate is in a file named `CA.pem`, in the current working directory the commands would be:

```console
sudo cp CA.pem /etc/pki/trust/anchors/
sudo update-ca-certificates
sudo systemctl restart k3s[-agent].service
```
