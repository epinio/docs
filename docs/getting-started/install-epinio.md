---
sidebar_label: "Install Epinio"
sidebar_position: 2
title: "Installing Epinio"
description: How to install Epinio
keywords: [epinio, kubernetes, k8s, installation, install]
doc-type: [how-to]
doc-persona: [epinio-operator]
doc-topic: [epinio, getting-started, install]
---

## Introduction

Epinio is installed from a single Helm chart.
This also installs Reflector, [SeaweedFS](../reference/helm.md#s3-storage) (S3-compatible storage), [`Dex`](../reference/helm.md#identity-provider-dex) and a [container registry](../reference/helm.md#container-registry) in your Kubernetes cluster.
You can disable the installation of these additional "sub" charts by changing the settings as described in their sections below.

:::tip Upgrading an existing install?
See [Upgrading Epinio](../reference/upgrading) for breaking changes and migration steps between versions.
:::

## Prerequisites

See [system requirements](./system-requirements.md) for dependencies your Kubernetes cluster requires for an Epinio installation.

## Installation

### Ingress Controller

During installation Epinio creates Ingress resources for its components. These
depend on a running ingress controller that provides a default `IngressClass`.

We recommend [Traefik](https://traefik.io/). Install it with a default
`IngressClass`:

```bash
helm repo add traefik https://traefik.github.io/charts
helm repo update
helm upgrade --install traefik traefik/traefik \
    --namespace traefik --create-namespace \
    --set ingressClass.enabled=true \
    --set ingressClass.isDefaultClass=true
```

Any ingress controller that provides a default `IngressClass` works. Some
distributions already ship one; if yours does, you can skip this step.

:::note
The command above uses a `LoadBalancer` Service, which suits clusters that have a
load balancer. On a local, single-node cluster without one (minikube, k3d), bind
Traefik to the node's ports instead by adding `--set ports.web.hostPort=80 --set
ports.websecure.hostPort=443`. See the [Quickstart](./quickstart.md) for the full
local flow.
:::

:::tip
On a cloud cluster, confirm the ingress controller's Service receives an
`EXTERNAL-IP` from your load-balancer. On bare metal, you may need a load-balancer
solution such as [MetalLB](https://metallb.universe.tf).
:::

### Cert Manager

Epinio needs [cert-manager](https://cert-manager.io/) to create TLS
certificates for the various ingresses.

If you do not have cert-manager installed on the cluster, you can install it:

```bash
helm repo add jetstack https://charts.jetstack.io
helm repo update
helm upgrade --install cert-manager jetstack/cert-manager --namespace cert-manager  \
    --set crds.enabled=true \
    --set extraArgs={--enable-certificate-owner-ref=true} \
    --create-namespace
```

:::caution
If `cert-manager` isn't installed in the namespace `cert-manager`,
you have to set `.Values.certManagerNamespace` to the namespace it is installed in.
Epinio installation will fail without this as it will not know how to use `cert-manager`.
:::

### Dynamic storage provisioner

To support Epinio a storage provisioner is needed.
You can use any storage provisioner which provides `ReadWriteMany` (RWX) Access Mode and a **default StorageClass** resource for dynamic storage provisioning.

To verify that your cluster provides a default StorageClass run the command `kubectl get storageclass`. The default StorageClass is marked with the string `(default)` next to its name in the output list.

:::tip Storage sizing
Ensure your storage provisioner has adequate capacity for your expected workload. Storage requirements scale with the number of applications and their sizes. See [Storage recommendations](../reference/concepts/storage.md) for detailed guidance on calculating storage needs.
:::

For example, you can deploy and configure the `local-path` dynamic storage provisioner by:
```bash
kubectl apply -f https://raw.githubusercontent.com/rancher/local-path-provisioner/master/deploy/local-path-storage.yaml
kubectl patch storageclass local-path -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'
```

### Install Epinio

If the above dependencies are available or going to be installed by this chart,
Epinio can be installed with the following:

```bash
helm repo add epinio https://epinio.github.io/helm-charts
helm repo update
helm upgrade --install epinio epinio/epinio --namespace epinio --create-namespace \
    --set global.domain=myepiniodomain.org
```

### Install Epinio in a custom namespace

You can install Epinio in a custom namespace by changing the `--namespace` flag.

```bash
helm repo add epinio https://epinio.github.io/helm-charts
helm repo update
helm upgrade --install epinio epinio/epinio --namespace my-custom-namespace --create-namespace \
    --set global.domain=myepiniodomain.org
```

Or you can install using "Let's Encrypt" certificates.

To generate trusted TLS certificates with "Let's Encrypt" for your public domain set `.Values.global.tlsIssuer` to `letsencrypt-production` and the value for the `.Values.global.tlsIssuerEmail` key to your e-mail address. Then:

```bash
helm repo add epinio https://epinio.github.io/helm-charts
helm repo update
 helm upgrade --install epinio epinio/epinio --namespace epinio --create-namespace \
    --set global.domain=myepiniodomain.org \
    --set global.tlsIssuer=letsencrypt-production \
    --set global.tlsIssuerEmail=user@company.org
```

The only mandatory field is the `.Values.global.domain` which should have the value of a wildcard `*.` enabled domain.
It should point to the IP address of your running Ingress controller.

:::tip

- To use a non-default IngressClass, set it with `--set ingress.ingressClassName=<className>`.

- Some ingress controllers cap the request body size, which causes `Entity Too Large` errors when uploading application sources. Traefik does not limit body size by default. ingress-nginx defaults to 1&nbsp;MB; raise it with an annotation:

  ```yaml
  ingress:
    annotations:
      nginx.ingress.kubernetes.io/proxy-body-size: 1000m
  ```

:::

:::note

- Read more on how to setup DNS here: [DNS setup](../how-to/operator/dns/dns_setup.md)

- If you're deploying Epinio in a "localhost" environment, you can use a [wildcard DNS service](../how-to/operator/dns/wildcard-dns.md) to ease setup.

- If installation fails due to an expired certificate then run `epinio settings update-ca`.  There is more information [here](../reference/cli/settings/epinio_settings_update-ca.md#epinio-settings-update-ca).

:::

### Verify Helm Chart Images

This is done using the `cosign` tool.
The following commands were tested using cosign version 2.1.1.

The three core Epinio images are `epinio-server`, `epinio-unpacker`, and `epinio-ui`.
The command to verify any of them is

```
cosign verify \
       --certificate-identity-regexp "https://github.com/epinio/epinio" \
       --certificate-oidc-issuer "https://token.actions.githubusercontent.com" \
       ghcr.io/epinio/<IMAGE>:v1.14.0
```

where `<IMAGE>` is the name of the image to verify.

## Chart configuration

Epinio is configured through Helm chart values, covering server settings, staging workloads, S3 storage, the identity provider, and the container registry. For the full list of values and what they do, see the [Helm chart reference](../reference/helm.md).
