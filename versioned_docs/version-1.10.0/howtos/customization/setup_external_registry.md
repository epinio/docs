---
sidebar_label: "Setting Up An External Container Registry"
sidebar_position: 8
title: ""
---

<head>
  <link rel="canonical" href="https://docs.epinio.io/howtos/customization/setup_external_registry"/>
</head>

## How to set up a basic external Epinio registry

Epinio allows the use of an external registry for the storage of application images.
This can be achieved by setting the following variables during the `helm install`:

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

Using [dockerhub](https://hub.docker.com/) as an example, the user would have to set
the value of `$REGISTRY_URL` to `registry.hub.docker.com`, `$REGISTRY_USER` and
`$REGISTRY_PASSWORD` would be set to the dockerhub credentials, and `$REGISTRY_NAMESPACE`
would be either an organization or the username.

When the above arguments are set, Epinio doesn't deploy a registry on the cluster.

### Advanced setup for a secure external registry

When access to the external registry is secured via TLS it becomes necessary to make
the relevant certificate known to both Epinio and the cluster (i.e. the kubelets).

Assuming that `epinio-external-registry-tls` is the name of the Kubernetes secret
used to store the certificate then extending the `helm install` command with

```
    --set containerregistry.certificateSecret=epinio-external-registry-tls
```

is enough to make the certificate known to epinio.

:::note
The secret is expected to be in the `epinio` namespace.
The certificate is expected to be under the key `tls.crt` of that secret
and is expected to be in PEM format.
:::

Making the same information known to the cluster itself, i.e. the kubelets, differs
between the various distributions of Kubernetes.

Assuming a k3s cluster running on an openSUSE or SLE-based host, and further
assuming that the certificate is stored in a file named `CA.pem` in the current
working directory the commands would be

```bash
sudo cp CA.pem /etc/pki/trust/anchors/
sudo update-ca-certificates
sudo systemctl restart k3s[-agent].service
```
