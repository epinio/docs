---
sidebar_label: "Quickstart"
sidebar_position: 1
title: "Quickstart"
description: Get started quickly with Epinio.
keywords: [epinio, kubernetes, quickstart, installation]
---

This guide helps you deploy and use Epinio, with the default options.
This is a good configuration for evaluation or testing
on an existing Kubernetes cluster.
For advanced Epinio deployment scenarios look at the
[installation](../installation/install_epinio.md) documentation.

## Installation

Ensure your Kubernetes environment meets the Epinio [requirements](../references/system_requirements/global.md).
Both a default **StorageClass** and a default **IngressClass** are needed.
If you don't yet have a suitable Kubernetes cluster, you can follow the [RKE2 Installation](../installation/other_inst_scenarios/install_epinio_on_rke.md) section to get started.

### Deploy Epinio

Run the `kubectl get nodes -o wide` command to get the `INTERNAL-IP` value of the first Kubernetes node.
Later, you will use this value along with a wildcard DNS service domain
(for eg. `sslip.io`)
as the helm `global.domain` value for installing Epinio.

:::tip

<!--TODO: Not sure here. Both sentences are about a local cluster. First sentence says always home IP addr. Second says get it from somwhere. Needs some clarification.-->
If you use a local Kubernetes cluster, the value should be `127.0.0.1` no matter the output from the `kubectk get nodes` command above.
Please refer to your local Kubernetes cluster documentation for the IP address details of the Ingress endpoint.

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

Then Epinio can be installed by using `helm` as shown below. Replace the `<INTERNAL-IP>` placeholder with the correct IP address:

```bash
helm repo add epinio https://epinio.github.io/helm-charts
helm repo update
helm upgrade --install epinio epinio/epinio \
    --namespace epinio --create-namespace \
    --set global.domain=<INTERNAL-IP>.sslip.io
```

You can then point your browser and/or epinio CLI to the `https://epinio.<INTERNAL-IP>.sslip.io` url.

#### Download the Epinio CLI binary

Install the latest Epinio CLI with `brew`:
```bash
brew install epinio
```

Or, download the desired version from the Assets section of https://github.com/epinio/epinio/releases/.

## Deploy an application with Epinio

### Login

The first task to perform after an Epinio installation, is to [login](../references/commands/cli/epinio_login.md) with the `epinio` binary:

```shell
epinio login -u admin 'https://epinio.127.0.0.1.sslip.io'

# Trust the certificate by pressing 'y' and 'enter'
```

:::tip

You may encounter an x509 error due to mismatched certificates after a restart.
You can resolve it by reloading certificates with `epinio settings update-ca`.
It will not be necessary to log in again.

:::

You can confirm that you're logged in by checking the Epinio settings:

```shell
epinio settings show
```

### Push an application

#### Sample applications

If you just want to try an application that works use the one inside the
[sample-app directory](https://github.com/epinio/epinio/tree/main/assets/sample-app).

You can copy it to your system with the following commands:

```bash
git clone https://github.com/epinio/epinio.git
cd epinio/assets/
```

#### Push an application

There are two ways to push an application:

1. You can provide an [Application Manifest](../references/manifests.md) which has the needed configuration for the applications.

```bash
epinio push manifest.yaml
```

1. You can provide the configuration as parameters in which case the parameter `--name` is mandatory.
As the default route is used the name must be unique across all namespaces.

```bash
epinio push --name sample --path sample-app
```

:::note

The `--path` parameter is optional.
If not specified the current working directory is used.
Always ensure that the chosen directory contains a supported application.

:::

You can read about the kind of applications supported in [Epinio supported applications](../references/supported_applications.md).

We also have information about the more advanced [git model](../explanations/advanced.md#git-pushing).


:::note

If you want to know details of the `epinio push` process, read the [detailed push docs](../explanations/detailed-push-process.md).

:::

#### Check your application is working

When the application is pushed, a unique URL is printed.
You use this to access your application.
You can print this URL again by running:

```bash
epinio app show sample
```

The "Routes" section is what you're looking for.

Go ahead and open the application URL in your browser!

### List all commands

To see a list of deployed applications, use the command:

```bash
epinio apps list
```

### Delete an application

To delete the application named "sample" run the following command:

```bash
epinio delete sample
```

### Create a separate namespace

To keep your applications separated, you can use namespaces.
Create a new namespace with this command:

```bash
epinio namespace create newspace
```

To start deploying application to this new namespace you have to target it:


```bash
epinio target newspace
```

Until you target another namespace, `epinio push` deploys to `newspace`.