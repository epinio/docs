---
sidebar_label: "Quickstart"
sidebar_position: 1
title: ""
---

# Quickstart
This guide will help you deploy and use Epinio with default options suitable for evaluation or testing purposes on an existing Kubernetes cluster. For advanced Epinio deployment scenarios look into [Installation Section](../installation/install_epinio.md).

## Installation
Make sure your Kubernetes environment fulfills the [Epinio Requirements](../references/system_requirements/global.md). A **default StorageClass**  as well as a **default IngressClass** are required. If you do not have a suitable Kubernetes cluster yet, you can follow the [RKE2 Installation](../howtos/install_epinio_on_rke.md) section.

### Deploy Epinio
Get the `INTERNAL-IP` value of the first Kubernetes node with `kubectl get nodes -o wide` command. Later you will use this value along with a wildcard DNS service domain (for eg. sslip.io) as helm `global.domain` value for installing Epinio.

:::tip
If you use Local Kubernetes Cluster, the value should be `127.0.0.1` regardless of the output from the command above. Please refer to your Local Kubernetes Cluster documentation for the IP address details of the Ingress endpoint.
:::

#### Install cert-manager
```bash
helm repo add jetstack https://charts.jetstack.io
helm repo update
helm upgrade --install cert-manager jetstack/cert-manager \
    --namespace cert-manager --create-namespace \
    --set installCRDs=true
```

#### Install Epinio
Then Epinio can be deployed by using `helm` as shown below. Replace the `<INTERNAL-IP>` placeholder with the correct IP address:

```bash
helm repo add epinio https://epinio.github.io/helm-charts
helm repo update
helm upgrade --install epinio epinio/epinio \
    --namespace epinio --create-namespace \
    --set global.domain=<INTERNAL-IP>.sslip.io
```

You can then point your browser and/or epinio CLI to the `https://epinio.<INTERNAL-IP>.sslip.io` url.

#### Download the Epinio CLI binary

Download the Epinio CLI for the desired version and architecture from the Assets section of https://github.com/epinio/epinio/releases/.

## Push an application

### Clone the sample app

If you just want an application that works use the one inside the
[sample-app directory](https://github.com/epinio/epinio/tree/main/assets/sample-app).

You can copy it to your system with
the following commands:

```bash
git clone https://github.com/epinio/epinio.git
cd epinio/assets/
```

### Login

The first task to perform after Epinio installation, is to [login](../references/commands/cli/epinio_login.md) with the `epinio` binary:

```shell
epinio login -u admin 'https://epinio.127.0.0.1.sslip.io'

# Trust the certificate by pressing 'y' and 'enter'
```

:::tip

If your local Kubernetes cluster restarts, Epinio stays installed and the certificates are still valid, so you don't have to login again.

:::

You can confirm that you're logged in by checking the Epinio settings:

```shell
epinio settings show
```

### Push an app

There are two ways to push an application:

1. You can provide an [Application Manifest](../references/manifests.md) which contains the required configuration for the applications.

```bash
epinio push manifest.yaml
```

2. You can provide the configuration as parameters in which case the parameter `--name` is mandatory.
Because of the default route the name has to be unique across all namespaces.

```bash
epinio push --name sample --path sample-app
```

***

###### Note that the `--path` parameter is optional. If not specified the current working directory will be used. Always ensure that the chosen directory contains a supported application.

***

If you want to know what applications are supported in Epinio, please read the
[notes about supported applications](../references/supported_applications.md).

We also provide information about the more advanced [git model](../explanations/advanced.md#git-pushing).

***

###### Note: If you want to know the details of the `epinio push` process, please read the [detailed push docs](../explanations/detailed-push-process.md)

***

#### Check that your application is working

After the application has been pushed, a unique URL is printed which you can use to access your application. If you don't have this URL available anymore you can find it again by running:

```bash
epinio app show sample
```

("Routes" is the part your are looking for)

Go ahead and open the application route in your browser!

### List all commands

To see all the applications you have deployed use the following command:

```bash
epinio apps list
```

### Delete an application

To delete the application you just deployed run the following command:

```bash
epinio delete sample
```

### Create a separate namespace

If you want to keep your various application separated, you can use the concept of namespaces. Create a new namespace with this command:

```bash
epinio namespace create newspace
```

To start deploying application to this new namespace you have to "target" it:


```bash
epinio target newspace
```

After this and until you target another namespace, whenever you run `epinio push` you will be deploying to this new namespace.