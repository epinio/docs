---
sidebar_label: "Installing Epinio on Rancher Desktop (RD)"
sidebar_position: 1
title: "Installing Epinio on Rancher Desktop (RD)"
description: How to install Epinio using a local Rancher Desktop installation.
keywords: [epinio, kubernetes, rancher, rancher desktop]
---

This How-to uses the following versions:

* \\\\\\\\\\\\\\\\\\\\\\\\\\\[epinio helm chart 1.13.7\]\\\\\\\\\\\\\\\\\\\\\\\\\\\(https://github.com/epinio/helm-charts/releases/tag/epinio-1.13.7\)
* Rancher Desktop 1.20.0

## Rancher Desktop prerequisites

* Running on Windows needs Windows Subsystem for Linux (WSL).
It's installed by RD as a prerequisite.
* Epinio currently only supports x86 so won't work with RD for Mac on the M1 chip.

### Install Rancher Desktop

Install the [latest version](https://github.com/rancher-sandbox/rancher-desktop/releases) of RD for your operating system.

## Setup Kubernetes

When running RD for the first time, wait until the initialization is complete. It may take some time to download and install the necessary components.

Check that Kubernetes is enabled in RD and a supported version is selected.
Look under `Kubernetes Settings` in RD (Epinio has been tested on **v1.22.7**, **v1.21.10** and **v1.20.15**).

Ensure Traefik is enabled, or you are using a different Ingress controller.

## Install epinio

Make sure Rancher Desktop is running.

RD can report Kubernetes as running when some pods aren't ready yet.
You can check this by running the command `kubectl get pods -A` in a terminal session.
Check that all pods report either a `Running` or `Completed` status.

RD configures its own load-balancer which exposes Traefik on `127.0.0.1`.
Use this with a wildcard DNS to get a system domain of `127.0.0.1.sslip.io`

The Epinio installation is similar on Linux, macOS and Windows:

1. Start a shell. Use `cmd` or `powershell` on Windows and your preferred shell on Linux/MacOS.

1. Install the [Epinio CLI](../../installation/install_epinio_cli.md).

1. Follow the [Epinio installation process](../../installation/install_epinio.md). It uses:

    ```shell
    kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.18.2/cert-manager.yaml

    # Wait for cert-manager to stabilize

    helm repo add epinio https://epinio.github.io/helm-charts
    helm install epinio -n epinio --create-namespace epinio/epinio --set global.domain=127.0.0.1.sslip.io

    epinio login -u admin https://epinio.127.0.0.1.sslip.io

    ```

    :::note

    For RD on Linux, you need to be able to open ports from `80` (and above).
    This allows access to the URL set in `global.domain` (that is, 127.0.0.1.sslip.io).
    You need to set the start port of the `unprivileged` list to a lower number.

    The [RD installation](https://docs.rancherdesktop.io/getting-started/installation/#traefik-port-binding-access) needs ports open from 80 so:

    ```bash

    # [Optional] Check the current unprivileged port start
    sysctl -n net.ipv4.ip_unprivileged_port_start

    # Temporary modification of the unprivileged port start
    sudo sysctl -w net.ipv4.ip_unprivileged_port_start=80

    # Permanent modification of the unprivileged port start can be done
    # with something like this
    sudo sh -c 'echo "net.ipv4.ip_unprivileged_port_start=80" >> /etc/sysctl.d/50-unprivileged-ports.conf'

    # Check the current unprivileged port start
    sysctl -n net.ipv4.ip_unprivileged_port_start

    ```

    You can find more information in this [issue](https://github.com/rancher-sandbox/rancher-desktop/issues/576).

    :::
