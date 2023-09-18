---
sidebar_label: "Installing Epinio on Rancher"
sidebar_position: 17
title: "Installing Epinio on Rancher"
description: How to install Epinio on Rancher
keywords: [epinio, kubernetes, rancher]
---

Before installing Epinio you need a running Rancher instance.
You can follow the Rancher [installation guides](https://rancher.com/docs) to set one up.

This How-to uses:

- [epinio helm chart 1.7.1](https://github.com/epinio/helm-charts/releases/tag/epinio-1.7.1)
- Rancher 2.7.1

## Kubernetes cluster

You can deploy a new cluster or import an existing one into Rancher.
The steps for either method are in the Rancher documentation (See `Cluster Provisioning`).

:::note
For development it's possible to deploy Epinio on the same node as Rancher.
It is not a supported configuration, so there may be issues.
:::

## Epinio Prerequisites

### Install an Ingress controller

If there's no Ingress controller running yet on the cluster, you need to install one.
We use Traefik in the example below.

:::note

If using the Rancher dashboard you will already have an Ingress controller running. This will be due to the installation process for Rancher.

:::

Go to `Apps` > `Repositories` > `Create` in the Rancher dashboard.

Give a name to the repo and use `https://helm.traefik.io/traefik` as the index URL.

Then go to the `Charts` menu and install the `traefik` chart.

You'll see a screen where you can edit the Traefik Helm YAML file.
Now make sure to set the following settings:

```
ingressClass.enabled: true
ingressClass.isDefaultClass: true
ports.web.redirectTo: websecure
service.spec.loadBalancerIP: # Set this to the IP of your load balancer
```

The [Install Epinio](../../installation/install_epinio.md#ingress-controller) page has more details.

## Install Epinio

In the Rancher Dashboard, go to the cluster on where you want to install Epinio.

Add the Epinio Helm repo in `Apps` > `Repositories` > `Create`

Give a name to the repo and use `https://epinio.github.io/helm-charts` as the index URL.

Once done, go to the "Charts" menu and install the `epinio` chart.

:::note

While you can select any version, it's best to use the latest one.

:::

Click install in the top right corner.

On the next screen, you can select a namespace for the deployment.
You also have to set a name for the deployment.

The following screen is to configure Epinio as needed.

The most important setting is `Domain`, explained [here](../../installation/dns_setup.md) in DNS setup.

When everything is configured, click on the install button.
Wait until the installation is complete.
Follow the instructions given by the Helm install command output.

## Access the Epinio menu

There are several ways to access Epinio from the Rancher dashboard menu.

The first is going to `Networking` > `Ingresses` and select the target URL preceding `epinio-ui`.

You also access Epinio by clicking on `Workloads` > `Deployments`.
On the right panel displayed click on `epinio-server:installed_version`.
Now select the tab `Ingreses` and then the target URL preceding `epinio-ui`.

:::note

If you use an untrusted certificate, when selecting the URL, you need to accept the security exception.
Then use the refresh button below the page title.
Now the state is available and you access the instance by clicking on its name.

:::

Once using your Epinio instance, you can deploy and delete:
- applications
- namespaces
- configurations.
