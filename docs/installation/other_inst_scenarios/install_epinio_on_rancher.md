---
sidebar_label: "Installing Epinio On Rancher"
sidebar_position: 17
title: ""
---

# Installing Epinio On Rancher

Before installing Epinio, you need a running Rancher instance.

If you do not have one, please use the Rancher's [installation guides](https://rancher.com/docs) to set one up.

This How-to was written using the following versions:
* [epinio helm chart 1.7.1](https://github.com/epinio/helm-charts/releases/tag/epinio-1.7.1)
* Rancher 2.7.1

## Kubernetes cluster

The two supported methods are to either deploy a new cluster or to import an existing one into Rancher. The steps to take for either method are in the Rancher documentation (See `Cluster Provisioning`).<br />
*While it is possible (for development) to deploy Epinio on the same node where Rancher is installed, this requires more steps and is not supported by Rancher.*


## Epinio Prerequisites

### Install an Ingress controller

If there's no Ingress controller running yet on the cluster, you need to install one. In the example below, Traefik is installed.

> NOTE: If you are using the rancher dashboard in the browser, it is likely you already have an Ingress controller running.

Go to `Apps` > `Repositories` > `Create`.

Give a name to the repo and use `https://helm.traefik.io/traefik` as the index URL.

Once done, go to the "Charts" menu and install the `traefik` chart.

You'll see a screen where you can edit the traefik helm yaml file, make sure to set the following settings:

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

Give a name to the repo and use `https://epinio.github.io/helm-charts` as index URL.

Once done, go to the "Charts" menu and install the `epinio` chart.

> NOTE: While you can select the version you want, it's strongly advised you choose the latest one (default). 

Click install in the top right corner.

On the next screen, you can select a namespace where the deployment will happen. You also have to set a name for the deployment.

The following screen is where you can configure Epinio according to your needs.<br />
The most important setting here is:
- `Domain`: [Explained here](../../installation/dns_setup.md)

Once everything is configured, click on the install button and then wait a few minutes for the installation to complete.<br />
Then follow the instructions given by the Helm install command output.

## Access the Epinio menu

There are several ways to access Epinio from the dashboard menu. 

The easiest one would be going through `Networking` > `Ingresses` and select the target URL preceding `epinio-ui`.

You may also access by clicking on `Workloads` > `Deployments`. On the right panel displayed click on `epinio-server:installed_version`, select tab `Ingreses` and later select the target URL preceding `epinio-ui`. 

> ATTENTION: If you use an untrusted certificate, you have to click on the URL, accept the security exception and use the refresh button shown below the page title, i.e. __Epinio instances__.
Now the state should be available and you can access the instance by clicking on its name.

Once you are in your Epinio instance, you can either deploy or delete applications, namespaces or configurations.
