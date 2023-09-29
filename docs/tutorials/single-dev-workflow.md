---
sidebar_label: "Epinio journey: Single developer"
sidebar_position: 3
title: "The Epinio single developer journey"
description: How the single developer works with Epinio
keywords: [epinio, developer, development, kubernetes]
---

## Introduction

The [Quickstart](./quickstart.md) gets you started, but,
as a developer, you'll want to see end-to-end workflow solutions for Epinio.
That's the aim of these "Epinio journeys",
where you'll be able to follow different use cases.

In this tutorial, you focus on the workflow for a solo developer.
An example takes you from a bare Kubernetes deployment to a first application deployment.

:::note

This tutorial describes a process for an *individual developer, working on a local machine*.
A future tutorial will discuss team working processes.

:::

## Prerequisites

Before you can use Epinio, you need a working Kubernetes cluster.

As an individual developer,
you might be using a local Kubernetes cluster such as
[Rancher Desktop](https://rancherdesktop.io/)
or [k3d](https://k3d.io/).

:::note

There are common installation scenarios examples in the
[installation documents](../installation/install_epinio.md).

:::

In this tutorial, we'll use
[Rancher Desktop](../installation/other_inst_scenarios/install_epinio_on_rancher_desktop.md)
as our local Kubernetes cluster.

If you don't have a Kubernetes installation you can install the
[latest version](https://github.com/rancher-sandbox/rancher-desktop/releases)
of Rancher Desktop for your operating system to get started.

### Additional tools

You should install two useful tools in your system:

- [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl)
for communicating with the Kubernetes cluster

- [helm](https://helm.sh/docs/intro/install/)
for deploying Epinio Helm Charts

Depending on the local Kubernetes cluster you installed,
these two binaries might be already installed.
For example, they're installed as part of Rancher Desktop.

These two binaries are used for [Installation](#installation) only.
The development workflow uses only the [Epinio CLI](#cli).

## Installation

Once you have your local Kubernetes cluster installed and running, you can
[install Epinio](../installation/install_epinio.md).

These are the steps for Rancher Desktop:

```shell
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.1/cert-manager.yaml

# Wait for cert-manager to stabilize. This should take approximately
# 30 seconds depending on your Internet connection.

helm repo add epinio https://epinio.github.io/helm-charts

helm repo update

helm install epinio -n epinio --create-namespace epinio/epinio --set global.domain=127.0.0.1.sslip.io
```

:::tip

You can find the password needed for the [login](#login) at the end of the installation output.

:::

### CLI

To use a CLI with your Epinio installation, download the [Epinio CLI
binary](https://github.com/epinio/epinio/releases/latest). The binary is
available for Linux, Windows and macOS.

### Login

The first task to perform after Epinio installation, is to
[login](../references/commands/cli/epinio_login.md) with the binary you
downloaded:

```shell
epinio login -u admin 'https://epinio.127.0.0.1.sslip.io'

# Trust the certificate by pressing 'y' and 'enter'
```

:::tip

If your local Kubernetes cluster restarts, you need to login again with the
command `epinio login`. Epinio stays installed and the certificates are still valid.

:::

You can confirm that you're logged in by checking the Epinio settings:

```shell
epinio settings show
```

You can also open the Epinio URL,
<https://epinio.127.0.0.1.sslip.io>, in your browser and use the web
UI.

## Deploy your application with Epinio

Now that you have completed the installation and setup tasks,
you can use Epinio to deploy your application.

Epinio uses [Paketo buildpacks](https://paketo.io/)
to create a container image for your application.
Then Epinio uses the image to create a container
with your application container image,
which runs on your Kubernetes cluster.
You can find more information about this in the
[detailed push process](../explanations/detailed-push-process.md#7-stage)
documentation.

Epinio also creates a new `ingress route`,
which allows you to access your application when it's deployed.

Epinio handles the whole process,
which enables you to concentrate on your application
rather than its deployment details.

As an example, we deploy a simple application:

```shell
# Example code: https://github.com/epinio/example-12factor

# Move to the source code directory.
cd /github/example-12factor

# Deploy your application
epinio push -n mysimpleapp
```

At the end of the deployment output, you get the URL to use for
your application:

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

If you're working on many applications, it's useful to see
their last deployment times and which URLs you use to check them.

You can get the application's information with the following two commands:

```shell
# List all deployed applications
epinio app list

# Display the applications information
epinio app show mysimpleapp
```

### View installation logs

For errors you can check your staging logs.

You can access the installation logs by running the command:

```shell
epinio app logs --staging mysimpleapp
```

### View application logs

You can access the application logs.
You might want to have realtime logs displayed to aid problem solving.

Epinio can display the logs either statically or dynamically as follows:

```shell
# Display logs statically
epinio app logs mysimpleapp

# Display logs dynamically
epinio app logs --follow mysimpleapp
```

### Create a new port-forward

As mentioned, Epinio creates a new `ingress route` for your application.
Epinio binds the route to port `443` by default.

However, you might need to test parts of your application using different
ports. For these cases, run the following command, for example:

```shell
epinio app port-forward mysimpleapp 8080:8080
```

:::tip

<!--TODO:I need some help here. One port number? You can only use one app
port-forward command? Is that correct? Or is it referring to epinio app
port-forward mysimpleapp 8080 where the local port number is selected at
random?, according to the doc.-->

You can specify only one port number.
In that case, Epinio will open the port of both `local` and `remote` targets.

For more information, see the
[port fowarding](../howtos/other/port_forwarding.md) page.

:::

### Scale your application

You can add (and remove) instances of your application.
To use Epinio scaling use the following command:

```shell
epinio app update mysimpleapp --instances 3
```

After you scale your application, up or down,
you can check the status with the command:

```shell
epinio app show mysimpleapp
```

## Remove your application

Once your application is no longer needed on your Kubernetes cluster, to
free resources, you can uninstall it as follows:

```shell
# Delete the application
epinio app delete mysimpleapp

# List the applications to verify mysimpleap has been deleted
epinio app list
```
