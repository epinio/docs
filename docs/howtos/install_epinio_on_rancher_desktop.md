---
sidebar_label: "Install Epinio on Rancher Desktop (local)"
---

# Rancher Desktop configuration

This how-to was written using the following versions:
* [epinio helm chart 0.7.1](https://github.com/epinio/helm-charts/releases/tag/epinio-0.7.1)
* Rancher desktop 1.1.1
## Rancher Desktop Prerequisites

* Running on Windows requires Windows Subsystem for Linux (WSL) which is automatically installed by Rancher Desktop.

### Install Rancher Desktop

Install the [latest version](https://github.com/rancher-sandbox/rancher-desktop/releases) of Rancher Desktop for your operating system.

## Setup Kubernetes

When running Rancher Desktop for the first time, wait until the initialization is completed.

Make sure that a supported Kubernetes version is selected under `Kubernetes Settings` (Epinio has been tested on **v1.22.7**, **v1.21.10** and **v1.20.15**).

## Install epinio

Make sure Rancher Desktop is running.

Rancher Desktop can report Kubernetes as running while some pods are actually not yet ready.
Manual verification is possible by executing the command `kubectl get pods -A` in a terminal and checking that all pods report either `Running` or `Completed` as their status.

For now, Rancher Desktop configures his own loadbalancer (Traefik through K3s) and you have to set Epinio system domain according to the provided IP, for example:
```
LB_IP=$(kubectl describe svc traefik --namespace kube-system \
        | awk '/Ingress/ { print $3 }')

export EPINIO_SYSTEM_DOMAIN=${LB_IP}.omg.howdoi.website
```
Previous commands are for Bash, but can be easily adapted for Windows shell.

If you don't want to use the default "magic" DNS, please follow [DNS setup](../installation/dns_setup.md).

The Epinio installation is pretty much identical on Linux, MacOS and Windows:
1. Start a terminal, use `cmd` or `powershell` on Windows (latest one is preferred) and your preferred one on Linux/MacOS.

2. Install the [Epinio CLI](../installation/install_epinio_cli.md).

3. Follow the [Epinio installation process](../installation/installation.md).

> NOTE: there is currently a [blocking issue](https://github.com/rancher-sandbox/rancher-desktop/issues/576) on Linux which prevent Epinio to push application!
> However, you will find a workaround at the end of the issue.
