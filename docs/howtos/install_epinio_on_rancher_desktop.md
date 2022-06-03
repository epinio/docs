---
sidebar_label: "Install Epinio on Rancher Desktop (local)"
title: ""
---

# Rancher Desktop configuration

This how-to was written using the following versions:
* [epinio helm chart 0.7.1](https://github.com/epinio/helm-charts/releases/tag/epinio-0.7.1)
* Rancher desktop 1.1.1
## Rancher Desktop Prerequisites

* Running on Windows requires Windows Subsystem for Linux (WSL) which is automatically installed by Rancher Desktop.
* Epinio currently only supports x86 and will not work with Rancher Desktop for Mac on the M1 chip.

### Install Rancher Desktop

Install the [latest version](https://github.com/rancher-sandbox/rancher-desktop/releases) of Rancher Desktop for your operating system.

## Setup Kubernetes

When running Rancher Desktop for the first time, wait until the initialization is completed.

Make sure that Kubernetes is enabled and a supported version is selected under `Kubernetes Settings` (Epinio has been tested on **v1.22.7**, **v1.21.10** and **v1.20.15**).

Make sure that Traefik is enabled or you have otherwise installed a Ingress controller. 

## Install epinio

Make sure Rancher Desktop is running.

Rancher Desktop can report Kubernetes as running while some pods are actually not yet ready.
Manual verification is possible by executing the command `kubectl get pods -A` in a terminal and checking that all pods report either `Running` or `Completed` as their status.

Rancher Desktop configures it's own loadbalancer to expose Traefik on `127.0.0.1`. We can use this with a wildcard DNS to get a system domain of `127.0.0.1.sslip.io`


The Epinio installation is pretty much identical on Linux, MacOS and Windows:
1. Start a terminal, use `cmd` or `powershell` on Windows (latest one is preferred) and your preferred one on Linux/MacOS.

2. Install the [Epinio CLI](../installation/install_epinio_cli.md).

3. Follow the [Epinio installation process](../installation/installation.md). Copied here:

```
$ kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.7.1/cert-manager.yaml  

# Wait for cert-manager to stabilize

$ helm repo add epinio https://epinio.github.io/helm-charts
$ helm install epinio -n epinio --create-namespace epinio/epinio --set global.domain=127.0.0.1.sslip.io

$ epinio login [URL]
```

> NOTE: there is currently a [blocking issue](https://github.com/rancher-sandbox/rancher-desktop/issues/576) on Linux which prevent Epinio to push application!
> However, you will find a workaround at the end of the issue.
