# Rancher configuration

Before installing Epinio, you need a running Rancher instance.

If you don't get it installed yet, feel free to follow installation guides [here](https://rancher.com/docs).

## Epinio Prerequisites

### Kubernetes cluster
The supported configuration is to either deploy a new cluster or import an existing one in Rancher (those steps are detailed in the Rancher docs).</br>
*For development purpose, you can imagine deploying Epinio on the same node where Rancher is installed but it requires more steps and keep in mind it's not supported by Rancher.*

### Rancher settings
At the time of writing, Epinio is not included in the latest stable Rancher version.</br>
This means you need to update two settings in your Rancher dashboard.</br>
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

Once done, go to Chart menu and install the `epinio-installer` chart.

You can select the version you want but most of the time you will choose the latest one (default), then click install in the top right corner.

On the next screen, you can select a namespace where the deployment will happen and you have to set a name to the deployment.

Next screen is where you can configure Epinio according to your needs.</br>
One of the most important setting here is `Access control allow origin`, it's mandatory filling your Rancher dashboard URL there.</br>
It basically allows Rancher to talk with the Epinio API.

Once everything configured, click on the install button and wait few minutes for the installation to complete.</br>
Follow instructions given by the Helm install command output.

## Access the Epinio menu

Click on the Epinio icon in the main side menu (under **GLOBAL APPS**).

You should see your fresh Epinio instance there.

*Pay attention, if you use an untrusted certificate, you have to click on the URL, accept the security exception and use the refresh button below Epinio instances.</br>
Now the state should be available and you can access the instance by clicking on its name.*

Once you are in your Epinio instance, you can either deploy or delete things like applications, namespace or services.
