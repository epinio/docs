---
sidebar_label: "Installing Epinio On Rancher"
sidebar_position: 15
title: ""
---

# Rancher configuration

Before installing Epinio, you need a running Rancher instance.

If you do not have such, please use the Rancher's [installation guides](https://rancher.com/docs) to set one up.

This how-to was written using the following versions:
* [epinio helm chart 0.7.1](https://github.com/epinio/helm-charts/releases/tag/epinio-0.7.1)
* Rancher 2.6.3

## Kubernetes cluster

The two supported methods are to either deploy a new cluster or to import an existing one into Rancher. The steps to take for either method are detailed in the Rancher documentation (See `Cluster Provisioning`).<br />
*While it is possible (for development) to deploy Epinio on the same node where Rancher is installed, this requires more steps and is not supported by Rancher either.*

### Rancher settings

At the time of writing, Epinio is not included in the latest stable Rancher version.<br />
This means that you have to update two settings in your Rancher dashboard.<br />
Go to `Global settings` > `Advanced settings`  and update the following settings:<br />

| | |
|--|--|
| `ui-dashboard-index`  | `https://releases.rancher.com/dashboard/epinio-v0.6.0/index.html` |
| `ui-offline-preferred`  | `Remote` |

> NOTE: Please keep in mind that `ui-dashboard-index` value will change over time until it's merged in stable Rancher version.

## Epinio Prerequisites

### Install an Ingress controller

If there's no Ingress controller running yet on the cluster, you need to install one. In the example below, Traefik will be installed.

> NOTE: If you are in the rancher dashboard in the browser, most likely you already have an Ingress controller
> running.

Go to `Apps & Marketplace` >  `Repositories` > `Create`.

Give a name to the repo and use `https://helm.traefik.io/traefik` as the index URL.

Once done, go to the "Charts" menu and install the `traefik` chart.

You'll see a screen where you can edit the traefik helm yaml file, make sure to set the following settings:

```
ingressClass.enabled: true
ingressClass.isDefaultClass: true
ports.web.redirectTo: websecure
service.spec.loadBalancerIP: # Set this to the IP of your load balancer if you know that
```

See also the [Install Epinio](../installation/install_epinio.md#ingress-controller) page for more details.

### Install cert-manager

If cert manager is not installed yet, you can install it by adding the relevant repository
in `Apps & Marketplace` >  `Repositories` > `Create`

Give a name to the repo and use `https://charts.jetstack.io` as the index URL.

Once done, go to the "Charts" menu and install the `cert-manager` chart.

You'll see a screen where you can edit the cert-manager helm yaml file, make sure to set the following settings:

```
installCRDs: true
extraArgs:
- '--enable-certificate-owner-ref=true'
```

See also the [Install Epinio](../installation/install_epinio.md#cert-manager) page for more details.

## Install Epinio

In the Rancher Dashboard, go to the cluster on where you want to install Epinio.

Add the Epinio Helm repo in `Apps & Marketplace` >  `Repositories` > `Create`

Give a name to the repo and use `https://epinio.github.io/helm-charts` as index URL.

Once done, go to the "Charts" menu and install the `epinio` chart.

> NOTE: While you can select the version you want, it's strongly advised you choose the latest one (default). This how-to was written with version `0.7.1`. 

Click install in the top right corner.

On the next screen, you can select a namespace where the deployment will happen. You also have to set a name for the deployment.

The following screen is where you can configure Epinio according to your needs.<br />
The 2 most important settings here are:
- `Domain`: [Explained here](../installation/dns_setup.md)
- `Access control allow origin`:  It is mandatory to insert your Rancher dashboard URL into this field. It basically allows Rancher to talk with the Epinio API.

Once everything is configured, click on the install button and then wait a few minutes for the installation to complete.<br />
After that follow the instructions given by the Helm install command output.

## Access the Epinio menu

Click on the "burger" menu icon (☰) at the top left and then the Epinio icon under **GLOBAL APPS**.

You should see your fresh Epinio instance there.

> ATTENTION: If you use an untrusted certificate, you have to click on the URL, accept the security exception and use the refresh button shown below the page title, i.e. __Epinio instances__.
Now the state should be available and you can access the instance by clicking on its name.

Once you are in your Epinio instance, you can either deploy or delete things like applications, namespaces or configurations.
