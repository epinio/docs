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


:::tip

You should verify if the service of the ingress controller you have just deployed has at least one `EXTERNAL-IP` address assigned from the external load-balancer provider (such as AWS ELB or similar).

<details>

<summary>How to verify your `EXTERNAL-IP` address</summary>


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

- To use a non-default IngressClass you need to specify it using `--set ingress.ingressClassName=<className>`

- If you receive `Entity Too Large` errors when [uploading](https://github.com/kubernetes/ingress-nginx/blob/main/docs/user-guide/nginx-configuration/annotations.md#custom-max-body-size) application source code into Epinio, you need to increase the `proxy-body-size` with `--set 'ingress.annotations.nginx\.ingress\.kubernetes\.io/proxy-body-size=1000m'`

:::

:::note

- Read more on how to setup DNS here: [DNS setup](./dns_setup.md)

- If you're deploying Epinio in a "localhost" environment, you can use a [wildcard DNS service](./wildcardDNS_setup.md) to ease setup.

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

The Public Cloud [installation](other_inst_scenarios/install_epinio_on_public_cloud.md) describes the three major cloud providers but Epinio can run on any Kubernetes cluster.

## Internal Epinio components

### Staging Workloads

Epinio uses staging workloads to build container images from source code.  As you can imagine, container builds can consume varying amounts of CPU, Memory, and Disk space depending on the application.  Because of this, it is important that these staging workloads can not only specify those resource amounts but also specify scheduling constraints so that your running applications can be protected from any buildtime resource consumption.  For example, you may configure your staging workloads to schedule to a particular node pool within your Kubernetes cluster that is dedicated to builds.

These configurations can be set using the `server.stagingWorkloads` section of the `values.yaml` file with which you may configure the following details:
- Resource Consumption
    - `server.stagingWorkloads.ttlSecondsAfterFinished`
        - Configure time-to-live for completed staging job resources
    - `server.stagingWorkloads.resources`
        - Provide Requests/Limits on CPU & Memory
    - `server.stagingWorkloads.storage`
        - `cache`
            - Optionally toggle `emptyDir` to bypass PVC creation
            - Provide parameters for `size`, `accessModes`, `volumeMode`, and `storageClassName`
        - `sourceBlobs`
            - Optionally toggle `emptyDir` to bypass PVC creation
            - Provide parameters for `size`, `accessModes`, `volumeMode`, and `storageClassName`
- Scheduling Constraints
    - `server.stagingWorkloads.nodeSelector`
        - Provide Node Selector labels to constrain scheduling to nodes that contain the specified label/value.
    - `server.stagingWorkloads.affinity`
        - Provide Affinity rules to constrain scheduling to nodes that meet the specified criteria.
    - `server.stagingWorkloads.tolerations`
        - Provide Tolerations to allow scheduling to nodes with matching taints.

There exists examples within the `values.yaml` file under the `server.stagingWorkloads` key.  Please review and modify these examples to suit your environmental needs.  Review these examples at the following lines:  [Epinio Helm Chart Values:  Staging Workloads](https://github.com/epinio/helm-charts/blob/4edcf8af4d6881da4162a04e532de1298f749662/chart/epinio/values.yaml#L64-L92).

The configurations under `server.stagingWorkloads` gets mapped to the build script ConfigMaps which is then processed by the Epinio Server when builds are kicked off.  These specifications are supplied to the newly created staging jobs.


### Kubed

Kubed is installed as a subchart when `.Values.kubed.enabled` is `true` (default).
If you already have `kubed`, you can skip installation by setting
the helm value `.Values.kubed.enabled` to `false`.

### S3 storage

Epinio uses an S3 compatible storage to store the application source code.
This chart will install [Minio](https://min.io/) when `.Values.minio.enabled` is
`true` (default).

In addition to Minio, Epinio offers [s3gw](https://s3gw.io/) as another S3 compatible store.
It is installed when `.Values.minio.enabled` is set to `false` and `.Values.s3gw.enabled` is set to `true`.

:::caution
The s3gw support is __experimental__.
The s3gw chart is configured to use a `host path` volume for storage.
This setup is risky, and not HA.
If there is an outage of the node where s3gw's pod is currently deployed, k8s will fail trying to assign the volume on another node.
:::

Both choices for internal S3 compatible storage can be configured to use a user-defined storageClass.
If no StorageClass is defined, the default storageClass is used.
When using Minio set the custom storageClass to the value of `.Values.persistance.storageClass`.
When using s3gw set the custom storageClass to the value of `.Values.s3gw.storageClass.name`.

Use any external S3 compatible solution by setting `.Values.minio.enabled` to `false`
(`.Values.s3gw.enabled` is `false` by default) and using
[the values under `s3`](https://github.com/epinio/helm-charts/blob/b389a4875af9f03b484a911c49a14f834ba04b64/chart/epinio/values.yaml#L44)
to point to the required S3 server.

### Dex

[Dex](https://dexidp.io) OpenID Connect Provider is installed as a subchart when `.Values.global.dex.enabled` is set to `true` (default).

If you don't need to use an identity provider, set the value to `false` and use only local Epinio users. [OIDC Authentication](../references/authentication_oidc.md) has more information.

### Container Registry

When Epinio builds a container image for an application from source, it needs
to store that image in a container registry. Epinio installs a container registry
on the cluster when `.Values.containerregistry.enabled` is `true` (default).

Any container registry that supports basic auth authentication (e.g. gcr, dockerhub, etc) can be used
instead, by setting this value to `false` and using
[the relevant global values](https://github.com/epinio/helm-charts/blob/b389a4875af9f03b484a911c49a14f834ba04b64/chart/epinio/values.yaml#L107-L111)
to point to the desired container registry.


## Upgrade

### Breaking Changes & Migrations

#### 1.12 to 1.13

Epinio 1.13 rehomes configurations for the staging workloads to a more Kubernetes-standardized format that supports a larger variety of configs.  These are no longer configured via ENV variables on the Epinio Server or through CLI flags but rather read from an in-cluster ConfigMap at staging time.

Documentation has been udpated for both the [Epinio Server](https://github.com/epinio/epinio/blob/6936da831aae5ef85f512b4cc44e83a57343f8d4/README.md#112-to-113) and the [Epinio Helm Chart](https://github.com/epinio/helm-charts/blob/d66f6df1640c106cfe299ea3a3d88f7a597f7a86/chart/epinio/README.md#112-to-113).  These READMEs go into detail describing the changes to the environment variables, CLI flags, and changes to the `values.yaml` interface.  Please refer to these before upgrading to **1.13**.