# Rancher Desktop configuration

## Rancher Desktop Prerequisites

* Running on Windows requires Windows Subsystem for Linux (WSL) which is automatically installed by Rancher Desktop

### Install Rancher Desktop

Install the [latest version](https://github.com/rancher-sandbox/rancher-desktop/releases) from Rancher Desktop for your operating system

## Setup Kubernetes

When running Rancher Desktop for the first time wait until the initialization is completed. Make sure that a supported Kubernetes version is selected under `Kubernetes Settings`, e.g. **v1.21.5**

## Install epinio

Make sure Rancher Desktop is running.

Rancher Desktop can report Kubernetes as running while some pods are actually not yet ready.
Manual verification is possible by executing the command `kubectl get pods -A` in a terminal and checking that all pods report either `Running` or `Completed` as their status.

Follow [Installation using a Custom Domain](./install_epinio_customDNS.md) for test and production environments.

### Linux

Linux is not yet supported by Rancher Desktop - see https://github.com/rancher-sandbox/rancher-desktop/issues/426
