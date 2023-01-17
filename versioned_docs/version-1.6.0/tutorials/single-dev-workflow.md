---
sidebar_label: "Epinio Journey: Single Dev Workflow"
title: ""
---

## Introduction

While the [quickstart](./quickstart.md) is great to get started, as a Developer, you might want to see end-to-end solutions and how Epinio can help you.
That's exactly the aim of the "Epinio Journeys", where you'll be able to follow different use-cases, according to your needs.

In this particular tutorial, we focus on the workflow for a solo developer with an example from a bare Kubernetes deployment to your first app.

:::note

This tutorial covers primarily a *solo and local development* process. While it still can help developers in teams, future journeys will address it more specifically.

:::

## Prerequisites

Before you can use Epinio, you need to have a Kubernetes cluster running.

As a solo developer, you might be using a local Kubernetes cluster such as [Rancher Desktop](https://rancherdesktop.io/), [Minikube](https://minikube.sigs.k8s.io/docs/) or [k3d](https://k3d.io/), just to name a few.

:::note

This tutorial will not explain how to install a local Kubernetes cluster and assumes you know how to do it.
However, depending on your choice, there's already some examples in the **Epinio Howtos** section which contains links to the respective clusters' installation docs.

:::

In this tutorial, we'll use [Rancher Desktop](../howtos/install_epinio_on_rancher_desktop.md) as our local Kubernetes cluster. However you should be able to follow this tutorial with the local Kubernetes cluster of your choice.

If not already done, you can install the [latest version](https://github.com/rancher-sandbox/rancher-desktop/releases) of Rancher Desktop for your operating system.

### [Optional] Additional binaries

Two additional binaries need to be installed in your system:

- [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl) for communicating with the Kubernetes cluster

- [helm](https://helm.sh/docs/intro/install/) for deploying the Epinio Helm Charts

Depending on the local Kubernetes cluster you installed (i.e. Rancher Desktop), these two binaries might be already installed.

These two binaries will be used for the [Installation](#installation) only. The development workflow will use the [Epinio CLI](#cli) alone.

## Installation

Once you have your local Kubernetes cluster installed and running, you can [install Epinio](../installation/install_epinio.md).

Here are the steps for Rancher Desktop:

```shell
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.7.1/cert-manager.yaml

# Wait for cert-manager to stabilize. This should take approximately 30 seconds depending on your Internet connection.

helm repo add epinio https://epinio.github.io/helm-charts

helm repo update

helm install epinio -n epinio --create-namespace epinio/epinio --set global.domain=127.0.0.1.sslip.io
```

:::tip

You can find the password needed for the [login](#login) at the end of the installation output.

:::

### CLI

To interact with your Epinio installation, you've to download the [Epinio CLI binary](https://github.com/epinio/epinio/releases/latest). The binary is available for the three main Operating Systems (OS), so pick the one suited for your own OS.

### Login

The first task to perform after Epinio installation, is to [login](../references/commands/cli/epinio_login.md) with the binary you downloaded:

```shell
epinio login -u admin 'https://epinio.127.0.0.1.sslip.io'

# Trust the certificate by pressing 'y' and 'enter'
```

:::tip

If your local Kubernetes cluster restarts, you only need to login again with the command above. Epinio stays installed and the certificates are still valid.

:::

You can confirm that you're logged in by checking the Epinio settings:

```shell
epinio settings show
```

Alternatively, you can also open the Epinio URL, <https://epinio.127.0.0.1.sslip.io>, in your preferred browser and use the web UI.

## Deploy your application with Epinio

Now that the "operational" tasks are done, it's time to concentrate on the most important task: use Epinio to deploy your application.

Epinio uses [Paketo buildpacks](https://paketo.io/) to create a container image for your application. This image is then used to create a container with your application, which will run on your local Kubernetes cluster. You can find additional information about [the push process explained here](../explanations/detailed-push-process.md#7-stage).

Epinio will also create a new `ingress route`, which will allow you to easily access your application once it's deployed.

The whole process is handled by Epinio, which enables you to concentrate on your application rather than knowing how you'll be able to deploy it.

Let's see first how to deploy a simple application:

```shell
# Example code: https://github.com/epinio/example-12factor

# Move to the source code directory. Here is an example:
cd /github/example-12factor

# Deploy your application
epinio push -n mysimpleapp
```

At the end of the deployment output, you have the URL to be used for checking your application:

```shell
Deploying application ...
..............
🕞  Creating application resources
✔️  App is online.
Name: mysimpleapp
Namespace: workspace
Builder Image:
Routes:
1: https://mysimpleapp.127.0.0.1.sslip.io
```

### List the applications deployed

If you're working on many applications, it can be really useful to see when was the last time they were deployed and which URL you should use to check them.

You can get the application's information with the following two commands:

```shell
# List all deployed applications
epinio app list

# Display the applications information
epinio app show mysimpleapp
```

### View installation logs

If your application couldn't be deployed, you might want to check your staging logs or, even better, save them into a file for a better screening with a text editor.

You can access the installation logs by running the command:

```shell
epinio app logs --staging mysimpleapp
```

### View application logs

Another type of logs that you can access is the application logs. And specially with web applications, you might want to have realtime logs displaying so you spot bugs faster.

Epinio can display the logs both statically or dynamically as follows:

```shell
# Display logs statically
epinio app logs mysimpleapp

# Display logs dynamically
epinio app logs --follow mysimpleapp
```

### Create a new port-forward

As described above, Epinio creates a new `ingress route` for your application. The route is bound by default to the port `443`.

However, you might need to test parts of your application using a different port. For these specific cases, you can run the following command:

```shell
epinio app port-forward 8080:8080 mysimpleapp
```

:::tip

You can specify only one port number. In that case, Epinio will open the port of both `local` and `remote` targets.

For more information, you can see the [Port Fowarding page](../howtos/port_forwarding.md).

:::

### Scale your application

Another common task with Cloud Native applications, is to add (and remove) several instances of your application. This feature, called scaling, can be achieved with Epinio with the following command:

```shell
epinio app update mysimpleapp --instances 3
```

After you scaled your application up or down, you can check the status with the command:

```shell
epinio app show mysimpleapp
```

## Remove your application

Once your application is no more needed on your local Kubernetes cluster, and you want to free resources, you can uninstall it with Epinio as follow:

```shell
# Delete the application
epinio app delete mysimpleapp

# List all the applications, the application should not be shown
epinio app list
```
