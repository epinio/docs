---
sidebar_label: "Install Epinio"
sidebar_position: 1
title: ""
---

# Installation of Epinio

## Introduction
Epinio is installed from a single Helm chart and, by default, it also installs [`Kubed`](#kubed), [`MinIO`](#s3-storage)
and a [container registry](#container-registry) in your Kubernetes cluster.

You can disable the installation of `Kubed`, `MinIO` and the `container registry` by changing the settings as described in the respective sections.


## Prerequisites

See [system requirements](../references/system_requirements/global.md) for a detailed list of external components your
Kubernetes cluster needs to have before you install Epinio.

> **IMPORTANT:** Some of the namespaces of the components are hardcoded in the Epinio
code and thus are important to be the same as described here. In the future this
may be configurable on the Epinio Helm chart.

## Installation
### Ingress Controller

Epinio creates Ingress resources for the API server, the applications and depending
on your setup, the internal container registry. Those resources won't work unless
an Ingress controller is running on your cluster.

If you don't have an Ingress controller already running, you can install Traefik with:

```
$ kubectl create namespace traefik
$ export LOAD_BALANCER_IP=$(LOAD_BALANCER_IP:-) # Set this to the IP of your load balancer if you know that
$ helm install traefik --namespace traefik "https://helm.traefik.io/traefik/traefik-10.3.4.tgz" \
		--set globalArguments='' \
		--set-string ports.web.redirectTo=websecure \
		--set-string ingressClass.enabled=true \
		--set-string ingressClass.isDefaultClass=true \
		--set-string service.spec.loadBalancerIP=$LOAD_BALANCER_IP
```

It's also possible to use Nginx instead of Traefik following the official [documentation](https://kubernetes.github.io/ingress-nginx/deploy/#quick-start).

Do not forget to use the option `--set controller.setAsDefaultIngress=true` when you install Nginx.<br />
Otherwise, if you do not want defining Nginx as the default ingress, feel free to use `--set ingress.ingressClassName=nginx`when you deploy Epinio.

> **WARNING**: Sometimes, when Epinio uploads your app, you might see `error pushing app to server: can't upload archive: server status code: Request Entity Too Large`.<br />
> In this case, you need to increase the `max body size` by adding an annotation to your ingress as described in [nginx.ingress.kubernetes.io/proxy-body-size](https://github.com/kubernetes/ingress-nginx/blob/main/docs/user-guide/nginx-configuration/annotations.md#custom-max-body-size)

### Cert Manager

Epinio needs [cert-manager](https://cert-manager.io/) in order to create TLS
certificates for the various Ingresses (see "Ingress controller" above).

If cert-manager is not already installed on the cluster, it can be installed like this:

```
$ kubectl create namespace cert-manager
$ helm repo add jetstack https://charts.jetstack.io
$ helm repo update
$ helm install cert-manager --namespace cert-manager jetstack/cert-manager \
		--set installCRDs=true \
		--set extraArgs[0]=--enable-certificate-owner-ref=true
```

> **WARNING**: if cert-manager isn't installed in the namespace `cert-manager`,
> you have to set `.Values.certManagerNamespace` accordingly, otherwise Epinio installation will fail.

### Kubed

Kubed is installed as a subchart when `.Values.kubed.enabled` is true (default).
If you already have kubed running, you can skip the installation by setting
the helm value "kubed.enabled" to "false".

### S3 storage

Epinio is using an S3 compatible storage to store the application source code.
This chart will install [Minio](https://min.io/) when `.Values.minio.enabled` is
true (default). Any S3 compatible solution can be used instead by setting this
value to `false` and using [the values under `s3`](https://github.com/epinio/helm-charts/blob/b389a4875af9f03b484a911c49a14f834ba04b64/chart/epinio/values.yaml#L44)
to point to the desired S3 server.

### Container Registry

When Epinio builds a container image for an application from source, it needs
to store that image to a container registry. Epinio installs a container registry
on the cluster when `.Values.containerregistry.enabled` is `true` (default).

Any container registry that supports basic auth authentication (e.g. gcr, dockerhub etc) can be used
instead, by setting this value to `false` and using
[the relevant global values](https://github.com/epinio/helm-charts/blob/b389a4875af9f03b484a911c49a14f834ba04b64/chart/epinio/values.yaml#L107-L111)
to point to the desired container registry.

### Install Epinio

If the above dependencies are available or going to be installed by this chart,
Epinio can be installed with the following:

```
$ helm repo add epinio https://epinio.github.io/helm-charts
```

```
$ helm install epinio -n epinio --create-namespace epinio/epinio --values epinio-values.yaml --set global.domain=myepiniodomain.org
```

The only value that is mandatory is the `.Values.global.domain` which
should be a wildcard domain, pointing to the IP address of your running
Ingress controller.

Read more on how to setup DNS here: [DNS setup](./dns_setup.md)

> *NOTE*: If you're deploying Epinio in a "localhost" environment, you can use a "[magic domain name](./magicDNS_setup.md)".

## Installation on Specific Kubernetes Offerings

Installing Epinio is a standard process as explained above, however you might need to configure it for a specific Kubernetes cluster.

To help you, see the following HowTos for various well-known Kubernetes clusters:

- [Install on Rancher](../howtos/install_epinio_on_rancher.md) - Install Epinio on Rancher
- [Install on Public Cloud](../howtos/install_epinio_on_public_cloud.md) - Install Epinio on Public Cloud cluster
- [Install on RKE2](../howtos/install_epinio_on_rke.md) - Install Epinio on Rancher RKE2 cluster
- [Install on K3d](../howtos/install_epinio_on_k3d.md) - Install Epinio on K3d cluster
- [Install on K3s](../howtos/install_epinio_on_k3s.md) - Install Epinio on K3s cluster
- [Install on Rancher Desktop](../howtos/install_epinio_on_rancher_desktop.md) - Install Epinio on Rancher Desktop
- [Install on Minikube](../howtos/install_epinio_on_minikube.md) - Install Epinio on Minikube cluster
- [Install on EKS](../howtos/install_epinio_on_eks.md) - Install Epinio on AWS EKS cluster

> *NOTE*: The Public Cloud howto lists the three major Cloud providers but Epinio can run on any Kubernetes cluster.