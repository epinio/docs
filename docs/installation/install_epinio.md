---
sidebar_label: "Install Epinio"
sidebar_position: 1
title: ""
---

# Installation of Epinio

## Introduction
Epinio is installed from a single Helm chart and, by default, it also installs [`Kubed`](#kubed), [`MinIO`](#s3-storage),
[`Dex`](#dex) and a [container registry](#container-registry) in your Kubernetes cluster.

You can disable the installation of `Kubed`, `MinIO`, `Dex` and the `container registry` by changing the settings as described in the respective sections.

## Prerequisites
See [system requirements](../references/system_requirements/global.md) for a detailed list of external components your
Kubernetes cluster needs to have before you install Epinio.

## Installation

### Ingress Controller
During installation via helm Epinio automatically creates various Ingress resources for its internal components.
These components depend on a running ingress controller providing a **default IngressClass**.

You may install `nginx-ingress-controller` using `LoadBalancer` service type:
```bash
helm repo add nginx-stable https://helm.nginx.com/stable
helm repo update
helm upgrade --install nginx-ingress --namespace nginx-ingress nginx-stable/nginx-ingress \
    --set controller.setAsDefaultIngress=true \
    --create-namespace
```

:::caution
Depending on your infrastructure and used Kubernetes offering it is recommended to verify if the service of the just deployed ingress
controller has assigned at least one `EXTERNAL-IP` address from external loadbalancer provider (AWS ELB and similar).

```bash
kubectl get svc nginx-ingress-controller --namespace nginx-ingress
> NAME                       TYPE           CLUSTER-IP      EXTERNAL-IP
> nginx-ingress-controller   LoadBalancer   10.43.223.228   <pending>
```

If you encounter the `<pending>` value in the `EXTERNAL-IP` column you can try one of the following steps to resolve that:
- Enable the relevant cloud provider resources for your Kubernetes cluster
- Install [MetalLB](https://metallb.universe.tf) loadbalancer into your Kubernetes cluster
- Append `--set "controller.service.externalIPs={<node1-ip>,<node2-ip>}"` to the helm command above or perform `kubectl edit service nginx-ingress-controller -n nginx-ingress` and add:
  ```yaml
  spec:
    externalIPs:
    - <node1-ip>
    - <node2-ip>
  ```

Read more about this topic in [NGINX documentation](https://kubernetes.github.io/ingress-nginx/deploy/baremetal).
:::

It's also possible to use Traefik instead of Nginx following the official [documentation](https://doc.traefik.io/traefik/getting-started/install-traefik/#use-the-helm-chart).

:::info Epinio helm values related to ingress
* Use a non-default IngressClass by `--set ingress.ingressClassName=<className>`
* Resolve `Entity Too Large` error when [uploading](https://github.com/kubernetes/ingress-nginx/blob/main/docs/user-guide/nginx-configuration/annotations.md#custom-max-body-size) app source code into Epinio by: <br/>`--set 'ingress.annotations.nginx\.ingress\.kubernetes\.io/proxy-body-size=1000m'`
:::

### Cert Manager

Epinio needs [cert-manager](https://cert-manager.io/) in order to create TLS
certificates for the various Ingresses (see "Ingress controller" above).

If cert-manager is not already installed on the cluster, it can be installed like this:

```bash
helm repo add jetstack https://charts.jetstack.io
helm repo update
helm upgrade --install cert-manager jetstack/cert-manager --namespace cert-manager  \
    --set installCRDs=true \
    --set extraArgs={--enable-certificate-owner-ref=true} \
    --create-namespace
```
:::caution
If cert-manager isn't installed in the namespace `cert-manager`,
you have to set `.Values.certManagerNamespace` accordingly, otherwise Epinio installation will fail.
:::

### Dynamic storage provisionier
Epinio needs a dynamic storage provisioner with existing **default StorageClass**. You may deploy any storage provisioner
of your choice, preferably with `ReadWriteMany` (RWX) Access Mode.

:::info
You may verify that a default StorageClass is available in your cluster in `kubectl get storageclass` output. The default StorageClass is marked by `(default)` string next to its name in the output.
:::

For example you may deploy and configure `local-path` dynamic storage provisioner by running:
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
helm upgrade --install epinio epinio/epinio --namespace epinio \
    --set global.domain=myepiniodomain.org \
    --create-namespace #\
    # To generate letsencrypt TLS certificate for your global.domain \
    # --set global.tlsIssuer=letsencrypt-production \
    # --set global.tlsIssuerEmail=user@company.org
```

The only value that is mandatory is the `.Values.global.domain` which
should be a wildcard `*.` enabled domain, pointing to the IP address of your running
Ingress controller.

Read more on how to setup DNS here: [DNS setup](./dns_setup.md)

> *NOTE*: If you're deploying Epinio in a "localhost" environment, you can use a [wildcard DNS service](./wildcardDNS_setup.md).

> *NOTE II*: in case the installation fails due to an expired certificate (for instance if you have previously initialized the epinio cli on a machine for a different cluster) please consider executing epinio `epinio settings update-ca`.  More info at: [epinio-settings-update-ca](https://docs.epinio.io/references/commands/cli/settings/epinio_settings_update-ca#epinio-settings-update-ca)

## Installation on Specific Kubernetes Offerings

Installing Epinio is a standard process as explained above, however you might need to configure it for a specific Kubernetes cluster.

To help you, see the following HowTos for various well-known Kubernetes clusters:

- [Install on Rancher](../howtos/install_epinio_on_rancher.md) - Install Epinio on Rancher
- [Install on Public Cloud](../howtos/install_epinio_on_public_cloud.md) - Install Epinio on Public Cloud cluster
- [Install on RKE2](../howtos/install_epinio_on_rke.md) - Install Epinio on Rancher RKE2 cluster
- [Install on K3d](../howtos/install_epinio_on_k3d.md) - Install Epinio on K3d cluster
- [Install on K3s](../howtos/install_epinio_on_k3s.md) - Install Epinio on K3s cluster
- [Install on Rancher Desktop](../howtos/install_epinio_on_rancher_desktop.md) - Install Epinio on Rancher Desktop
- [Install on EKS](../howtos/install_epinio_on_eks.md) - Install Epinio on AWS EKS cluster

> *NOTE*: The Public Cloud howto lists the three major Cloud providers but Epinio can run on any Kubernetes cluster.

## Internal Epinio components
### Kubed

Kubed is installed as a subchart when `.Values.kubed.enabled` is true (default).
If you already have kubed running, you can skip the installation by setting
the helm value "kubed.enabled" to "false".

### S3 storage

Epinio is using an S3 compatible storage to store the application source code.
This chart will install [Minio](https://min.io/) when `.Values.minio.enabled` is
true (default).

In addition to Minio, Epinio offers [s3gw](https://s3gw.io/) as another internal S3 compatible storage. It is installed when `.Values.minio.enabled` is set to `false` and `.Values.s3gw.enabled` is set to `true`.

Both choices for internal S3 compatible storage can be configured to use a user-defined storageClass. If no StorageClass is defined, the default storageClass is used. For Minio the custom storageClass is set via the value of `.Values.persistance.storageClass`. For s3gw the custom storageClass is set via the value of `.Values.s3gw.storageClass.name`.

Any external S3 compatible solution can be used instead by setting `Values.minio.enabled` value to `false` (`Values.s3gw.enabled` is `false` by default) and using [the values under `s3`](https://github.com/epinio/helm-charts/blob/b389a4875af9f03b484a911c49a14f834ba04b64/chart/epinio/values.yaml#L44) to point to the desired S3 server.

### Dex

[Dex](https://dexidp.io) OpenID Connect Provider is installed as a subchart when `.Values.global.dex.enabled` is set to `true` (default).

In case you don't need to use an identity provider you may set the value to `false` and use only local epinio users. Here you will find more info about [OIDC Authentication](../references/authentication_oidc.md).

### Container Registry

When Epinio builds a container image for an application from source, it needs
to store that image to a container registry. Epinio installs a container registry
on the cluster when `.Values.containerregistry.enabled` is `true` (default).

Any container registry that supports basic auth authentication (e.g. gcr, dockerhub etc) can be used
instead, by setting this value to `false` and using
[the relevant global values](https://github.com/epinio/helm-charts/blob/b389a4875af9f03b484a911c49a14f834ba04b64/chart/epinio/values.yaml#L107-L111)
to point to the desired container registry.