---
sidebar_label: "Installing Epinio on Rancher"
sidebar_position: 17
title: "Installing Epinio on Rancher"
description: How to install Epinio on Rancher
keywords: [epinio, kubernetes, rancher]
---

Before installing Epinio you need a running Rancher instance.
If necessary use the Rancher [installation guides](https://rancher.com/docs) to set one up.

<!--TODO:Confirm versions?-->
This How-to was written using:

- [epinio helm chart 1.7.1](https://github.com/epinio/helm-charts/releases/tag/epinio-1.7.1)
- Rancher 2.7.1

## Kubernetes cluster

The two supported methods are: to deploy a new cluster or to import an existing one into Rancher.
<!--TODO:A direct link would be better if possible. But I can't seee an obvious one.-->
The steps for either method are in the Rancher documentation (See `Cluster Provisioning`).

:::note
For development it's possible to deploy Epinio on the same node as Rancher.
However, this needs more steps and isn't supported by Rancher.
:::

## Epinio Prerequisites

### Install an Ingress controller

If there's no Ingress controller running yet on the cluster, you need to install one. For the example below, we use Traefik.

:::note

If using the Rancher dashboard in a browser, it's likely you already have an Ingress controller running.

:::

<!--TODO: This is for when in the Rancher dashboard, right?-->
Go to `Apps` > `Repositories` > `Create` in the Rancher dashboard.

Give a name to the repo and use `https://helm.traefik.io/traefik` as the index URL.

Then go to the `Charts` menu and install the `traefik` chart.

You'll see a screen where you can edit the Traefik Helm YAML file. Now make sure to set the following settings:

```
ingressClass.enabled: true
ingressClass.isDefaultClass: true
ports.web.redirectTo: websecure
service.spec.loadBalancerIP: # Set this to the IP of your load balancer if you know that
```

See also the [Install Epinio](../../installation/install_epinio.md#ingress-controller) page for more details.

## Install Epinio

In the Rancher Dashboard, go to the cluster on where you want to install Epinio.

Add the Epinio Helm repo in `Apps` > `Repositories` > `Create`

Give a name to the repo and use `https://epinio.github.io/helm-charts` as the index URL.

Once done, go to the "Charts" menu and install the `epinio` chart.

:::note

While you can select any version, it's strongly advised you choose the latest one.

:::

Click install in the top right corner.

On the next screen, you can select a namespace for the deployment.
You also have to set a name for it.

The following screen is where you can configure Epinio according to your needs.

The most important setting is `Domain` which is explained [here](../../installation/dns_setup.md).

When everything is configured, click on the install button and then wait until the installation is complete.
Then follow the instructions given by the Helm install command output.

## Access the Epinio menu

There are several ways to access Epinio from the Rancher dashboard menu.

The easiest is going to `Networking` > `Ingresses` and select the target URL preceding `epinio-ui`.

You also access Epinio by clicking on `Workloads` > `Deployments`.
On the right panel displayed click on `epinio-server:installed_version`.
Now select the tab `Ingreses` and then the target URL preceding `epinio-ui`.

:::note

If you use an untrusted certificate, you have to click on the URL. Accept the security exception and then use the refresh button below the page title.
Now the state will be available and you access the instance by clicking on its name.

:::

Once in your Epinio instance, you can deploy and delete:
- applications
- namespaces
- configurations.
