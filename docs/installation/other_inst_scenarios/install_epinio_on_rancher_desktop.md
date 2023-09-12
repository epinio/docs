---
sidebar_label: "Installing Epinio on Rancher Desktop"
sidebar_position: 1
title: "Installing Epinio on Rancher Desktop"
description: How to install Epinio using a local Rancher Desktop installation.
keywords: [epinio, kubernetes, rancher, rancher desktop]
---

This How-to was written using the following versions:

<!--TODO:Work on version needed here. RD is now at 1.9.1. Technical talk through required,
K8s upto 1.27.5 stable.-->

* [epinio helm chart 1.0.0](https://github.com/epinio/helm-charts/releases/tag/epinio-1.0.0)
* Rancher desktop 1.4.1

## Rancher Desktop Prerequisites

* Running on Windows requires Windows Subsystem for Linux (WSL) which is automatically installed by Rancher Desktop.
* Epinio currently only supports x86 hence will not work with Rancher Desktop for Mac on the M1 chip.

### Install Rancher Desktop

Install the [latest version](https://github.com/rancher-sandbox/rancher-desktop/releases) of Rancher Desktop for your operating system.

## Setup Kubernetes

When running Rancher Desktop for the first time, wait until the initialization is complete.

Make sure that Kubernetes is enabled and a supported version is selected under `Kubernetes Settings` (Epinio has been tested on **v1.22.7**, **v1.21.10** and **v1.20.15**).

Make sure that Traefik is enabled or you have otherwise installed a Ingress controller.

## Install epinio

Make sure Rancher Desktop is running.

Rancher Desktop can report Kubernetes as running while some pods are actually not yet ready.
Manual verification is possible by executing the command `kubectl get pods -A` in a terminal and checking that all pods report either `Running` or `Completed` as their status.

Rancher Desktop configures its own load-balancer to expose Traefik on `127.0.0.1`. We can use this with a wildcard DNS to get a system domain of `127.0.0.1.sslip.io`

The Epinio installation is similar on Linux, MacOS and Windows:

<!--TODO: Any particular reason why the Windows sheel prefers the latest?-->
1. Start a shell, use `cmd` or `powershell` on Windows (latest one is preferred) and your preferred one on Linux/MacOS.

2. Install the [Epinio CLI](../../installation/install_epinio_cli.md).

3. Follow the [Epinio installation process](../../installation/install_epinio.md). Copied here:

```shell

kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.12.3/cert-manager.yaml

# Wait for cert-manager to stabilize

helm repo add epinio https://epinio.github.io/helm-charts
helm install epinio -n epinio --create-namespace epinio/epinio --set global.domain=127.0.0.1.sslip.io

epinio login -u admin https://epinio.127.0.0.1.sslip.io

```

:::caution

For RancherDesktop on Linux, in order to be able to open ports from `443` (and above), in order to access the URL set in `global.domain` (i.e. 127.0.0.1.sslip.io), you need to set the start port of the `unprivileged` list to a lower number:

<!--
TODO:Does this need to be 80 as per the RD installation docs?
https://docs.rancherdesktop.io/getting-started/installation/#traefik-port-binding-access
Or do the RD docs need changing to 443?
Or confusingly, 443 needed for global.domain and 80 needed for RD,
so sort of encapsulating the global domain requirement
-->
```bash

# [Optional] Check the current unprivileged port start
sysctl -n net.ipv4.ip_unprivileged_port_start

# Temporary modification of the unprivileged port start
sudo sysctl -w net.ipv4.ip_unprivileged_port_start=443

# Permanent modification of the unprivileged port start
sudo sh -c 'echo "net.ipv4.ip_unprivileged_port_start=443" >> /etc/sysctl.d/50-unprivileged-ports.conf'

# [Optional] Check the current unprivileged port start
sysctl -n net.ipv4.ip_unprivileged_port_start

```

You can find more information in this [issue](https://github.com/rancher-sandbox/rancher-desktop/issues/576).

:::
