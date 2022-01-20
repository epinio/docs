# Rancher configuration

Before installing Epinio, you need a running Rancher instance.

If you do not have such, please use the Rancher's [installation guides](https://rancher.com/docs) to set one up.

When I wrote this documentation, I used the following versions:
* epinio-installer (Helm chart) 0.3.5 
* Rancher 2.6.3

## Epinio Prerequisites

### Kubernetes cluster
The two supported methods are to either deploy a new cluster or to import an existing one into Rancher. The steps to take for either method are detailed in the Rancher documentation (See `Cluster Provisioning`).</br>
*While it is possible (for development) to deploy Epinio on the same node where Rancher is installed, this requires more steps and is not supported by Rancher either.*

### Rancher settings
At the time of writing, Epinio is not included in the latest stable Rancher version.</br>
This means that you have to update two settings in your Rancher dashboard.</br>
Go to `Global settings` > `Advanced settings`  and update the following settings:</br>

| | |
|--|--|
| `ui-dashboard-index`  | `https://releases.rancher.com/dashboard/epinio-v0.3.0/index.html` |
| `ui-offline-preferred`  | `Remote` |

*Please, keep in mind that `ui-dashboard-index` value will change over the time until it is not merged in stable Rancher version.*


## Install Epinio

In the Rancher Dashboard, go to the cluster on where you want to install Epinio.

Add the Epinio Helm repo in `Apps & Marketplace` >  `Repositories` > `Create`

Give a name to the repo and use `https://epinio.github.io/helm-charts` as index URL.

Once done, go to the Chart menu and install the `epinio-installer` chart.

While you can select the version you want most of the time you should choose the latest one (default). Then click install in the top right corner.

On the next screen, you can select a namespace where the deployment will happen. You also have to set a name for the deployment.

The following screen is where you can configure Epinio according to your needs.</br>
The most important setting here is `Access control allow origin`. It is mandatory to insert your Rancher dashboard URL into this field.</br>
It basically allows Rancher to talk with the Epinio API.

Once everything is configured, click on the install button and then wait a few minutes for the installation to complete.</br>
After that follow the instructions given by the Helm install command output.

## Access the Epinio menu

Click on the Epinio icon in the main side menu (under **GLOBAL APPS**).

You should see your fresh Epinio instance there.

__Attention__. If you use an untrusted certificate, you have to click on the URL, accept the security exception and use the refresh button shown below the page title, i.e. __Epinio instances__.</br>
Now the state should be available and you can access the instance by clicking on its name.*

Once you are in your Epinio instance, you can either deploy or delete things like applications, namespace or services.
