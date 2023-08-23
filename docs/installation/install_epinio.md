---
sidebar_label: "Install Epinio"
sidebar_position: 1
title: "Installing Epinio"
description: How to install Epinio
keywords: [epinio, kubernetes, k8s, installation, install]
---

## Introduction

Epinio is installed from a single Helm chart.
This also installs [`Kubed`](#kubed), [`MinIO`](#s3-storage), [`Dex`](#dex) and a [container registry](#container-registry) in your Kubernetes cluster.
You can disable the installation of these additional "sub" charts by changing the settings as described in their sections below.

## Prerequisites

See [system requirements](../references/system_requirements/global.md) for dependencies your Kubernetes cluster requires for an Epinio installation.

## Installation

### Ingress Controller

During installation using `helm` Epinio creates some Ingress resources for its internal components.
These components depend on a running ingress controller providing a default `IngressClass`.

You can install `nginx-ingress-controller` using the `LoadBalancer` service type:

```bash
helm repo add nginx-stable https://helm.nginx.com/stable
helm repo update
helm upgrade --install nginx-ingress --namespace nginx-ingress nginx-stable/nginx-ingress \
    --set controller.setAsDefaultIngress=true \
    --create-namespace
```

You can use Traefik instead of Nginx by following the official [documentation](https://doc.traefik.io/traefik/getting-started/install-traefik/#use-the-helm-chart).

<details>

<summary>Verify external loadbalancer IP assignment</summary>

You should verify if the service of the ingress controller you have just deployed has at least one `EXTERNAL-IP` address assigned from the external
load-balancer provider (such as AWS ELB or similar).

```bash
kubectl get svc nginx-ingress-controller --namespace nginx-ingress
> NAME                       TYPE           CLUSTER-IP      EXTERNAL-IP
> nginx-ingress-controller   LoadBalancer   10.43.223.228   <pending>
```

If you have the `<pending>` value in the `EXTERNAL-IP` column you can try one of the following steps:

- Enable the relevant cloud provider resources for your cluster
- Install the [MetalLB](https://metallb.universe.tf) load balancer into your cluster
- Append `--set "controller.service.externalIPs={<node1-ip>,<node2-ip>}"` to the `helm upgrade --install` command above, or perform `kubectl edit service nginx-ingress-controller -n nginx-ingress` and add:
  ```yaml
  spec:
    externalIPs:
    - <node1-ip>
    - <node2-ip>
  ```

There is more about this in the [NGINX documentation](https://kubernetes.github.io/ingress-nginx/deploy/baremetal).

</details>

### Cert Manager

Epinio needs [cert-manager](https://cert-manager.io/) to create TLS
certificates for the various ingresses.

If you do not have cert-manager installed on the cluster, you can install it:

```bash
helm repo add jetstack https://charts.jetstack.io
helm repo update
helm upgrade --install cert-manager jetstack/cert-manager --namespace cert-manager  \
    --set installCRDs=true \
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

:::info
To verify that your cluster provides a default StorageClass run the command `kubectl get storageclass`. The default StorageClass is marked with the string `(default)` next to its name in the output list.
:::

For example, you can deploy and configure the `local-path` dynamic storage provisioner by:
```bash
kubectl apply -f https://raw.githubusercontent.com/rancher/local-path-provisioner/master/deploy/local-path-storage.yaml
kubectl patch storageclass local-path -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'
```

### Install Epinio

<!--TODO: I'm not sure about the structure/ordering of this section, down to "Verify Helm.....". Needs some thought-->

If the above dependencies are available or going to be installed by this chart,
Epinio can be installed with the following:

```bash
helm repo add epinio https://epinio.github.io/helm-charts
helm repo update
helm upgrade --install epinio epinio/epinio --namespace epinio --create-namespace \
    --set global.domain=myepiniodomain.org
```

<details>

<summary>Installation with "Let's Encrypt" certificates</summary>

To generate trusted TLS certificates with "Let's Encrypt" for your public domain set `.Values.global.tlsIssuer` to `letsencrypt-production` and your e-mail to the value for the `.Values.global.tlsIssuerEmail` key.

```bash
 helm upgrade --install epinio epinio/epinio --namespace epinio --create-namespace \
    --set global.domain=myepiniodomain.org \
    --set global.tlsIssuer=letsencrypt-production \
    --set global.tlsIssuerEmail=user@company.org
```

</details>

The only mandatory value is the `.Values.global.domain` which should be a wildcard `*.` enabled domain.
It should point to the IP address of your running Ingress controller.

:::info
* Use a non-default IngressClass: `--set ingress.ingressClassName=<className>`
* Set annotations for Epinio related ingresses to resolve errors `Entity Too Large` when [uploading](https://github.com/kubernetes/ingress-nginx/blob/main/docs/user-guide/nginx-configuration/annotations.md#custom-max-body-size) application source code into Epinio: <br/>`--set 'ingress.annotations.nginx\.ingress\.kubernetes\.io/proxy-body-size=1000m'`
:::

Read more on how to setup DNS here: [DNS setup](./dns_setup.md)

:::note
- If you're deploying Epinio in a "localhost" environment, you can use a [wildcard DNS service](./wildcardDNS_setup.md).

- If installation fails due to an expired certificate then run `epinio settings update-ca`.  There is more information [here](https://docs.epinio.io/references/commands/cli/settings/epinio_settings_update-ca#epinio-settings-update-ca).
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
       ghcr.io/epinio/<IMAGE>:v1.8.1
```

where `<IMAGE>` is the name of the image to verify.

## Installation on Specific Kubernetes Offerings

Installing Epinio, as described above, is a standard process, however you might need to configure it in a specific Kubernetes cluster.

To help you, see the following documents for some well-known clusters:

- [Install on Rancher](other_inst_scenarios/install_epinio_on_rancher.md) — Install Epinio on Rancher
- [Install on Public Cloud](other_inst_scenarios/install_epinio_on_public_cloud.md) — Install Epinio on Public Cloud cluster
- [Install on RKE2](other_inst_scenarios/install_epinio_on_rke.md) — Install Epinio on Rancher RKE2 cluster
- [Install on K3d](other_inst_scenarios/install_epinio_on_k3d.md) — Install Epinio on K3d cluster
- [Install on K3s](other_inst_scenarios/install_epinio_on_k3s.md) — Install Epinio on K3s cluster
- [Install on Rancher Desktop](other_inst_scenarios/install_epinio_on_rancher_desktop.md) — Install Epinio on Rancher Desktop
- [Install on EKS](other_inst_scenarios/install_epinio_on_eks.md) — Install Epinio on AWS EKS cluster

:::note
The Public Cloud How-to describes the three major cloud providers but Epinio can run on any Kubernetes cluster.
:::

## Internal Epinio components

### Kubed

Kubed is installed as a subchart when `.Values.kubed.enabled` is `true` (default).
If you already have kubed, you can skip installation by setting
the helm value `.Values.kubed.enabled` to `false`.

### S3 storage

Epinio uses an S3 compatible storage to store the application source code.
This chart will install [Minio](https://min.io/) when `.Values.minio.enabled` is
`true` (default).

In addition to Minio, Epinio offers [s3gw](https://s3gw.io/) as another S3 compatible store.
It is installed when `.Values.minio.enabled` is set to `false` and `.Values.s3gw.enabled` is set to `true`.

Both choices for internal S3 compatible storage can be configured to use a user-defined storageClass.
If no StorageClass is defined, the default storageClass is used.
Using Minio set the custom storageClass by the value of `.Values.persistance.storageClass`.
Using s3gw set the custom storageClass by the value of `.Values.s3gw.storageClass.name`.

<!--TODO: Not sure about using a hashed blob, is that OK? Presumably to guarantee a line number reference?-->
Use any external S3 compatible solution by setting `.Values.minio.enabled` to `false` (`.Values.s3gw.enabled` is `false` by default) and using [the values under `s3`](https://github.com/epinio/helm-charts/blob/b389a4875af9f03b484a911c49a14f834ba04b64/chart/epinio/values.yaml#L44) to point to the required S3 server.

### Dex

[Dex](https://dexidp.io) OpenID Connect Provider is installed as a subchart when `.Values.global.dex.enabled` is set to `true` (default).

If you don't need to use an identity provider, set the value to `false` and use only local Epinio users. [OIDC Authentication](../references/authentication_oidc.md) has more information.

### Container Registry

When Epinio builds a container image for an application from source, it needs
to store that image in container registry. Epinio installs a container registry
on the cluster when `.Values.containerregistry.enabled` is `true` (default).

<!--TODO: Not sure about using a hashed blob, is that OK? Presumably to guarantee a line number reference?-->
Any container registry that supports basic auth authentication (e.g. gcr, dockerhub, etc) can be used
instead, by setting this value to `false` and using
[the relevant global values](https://github.com/epinio/helm-charts/blob/b389a4875af9f03b484a911c49a14f834ba04b64/chart/epinio/values.yaml#L107-L111)
to point to the desired container registry.
