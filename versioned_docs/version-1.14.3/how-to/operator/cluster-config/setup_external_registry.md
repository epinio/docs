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
Epinio trusts it, in addition to the system CAs, when building application images,
when deleting them, and when pushing, pulling, and deleting
[application charts](#application-charts).

Epinio reads the certificate when it starts. After changing the certificate, restart the Epinio server:

```console
kubectl -n epinio rollout restart deployment epinio-server
```

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

## Application charts

Charts pushed with `epinio app chart push` are stored in the same registry and namespace as the
application images, in a repository named `epinio_appchart_NAME`, after the application chart.
See [Pushing the chart to Epinio's registry](../customization/create_custom_appcharts.md#pushing-the-chart-to-epinios-registry).

The registry credentials therefore need permission to push, pull, and delete in that namespace.
Without delete permission, or on a registry with deletion disabled, `epinio app chart delete`
deletes the application chart, and its chart stays in the registry. A later push to the same name
replaces it.

Docker Hub removes the tags of a deleted chart, and keeps the empty repository.
Delete it on Docker Hub, if needed.

### Example: Harbor

With [Harbor](https://goharbor.io/), create a project for Epinio, for example `epinio`,
and a robot account for it with the `push`, `pull`, and `delete` permissions on repositories.
Then install Epinio with:

```console
helm install \
  --set containerregistry.enabled=false \
  --set global.registryURL=harbor.example.com \
  --set global.registryNamespace=epinio \
  --set 'global.registryUsername=robot$epinio+epinio' \
  --set global.registryPassword=$ROBOT_SECRET \
  --set containerregistry.certificateSecret=epinio-external-registry-tls \
  ... (other options here) \
  epinio epinio/epinio
```

The `containerregistry.certificateSecret` is only needed when the certificate of Harbor is not signed
by a CA the system trusts. As described above, the kubelets have to trust it too.
