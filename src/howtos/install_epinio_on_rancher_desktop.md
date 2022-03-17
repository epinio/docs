# Rancher Desktop configuration

## Rancher Desktop Prerequisites

* Running on Windows requires Windows Subsystem for Linux (WSL) which is automatically installed by Rancher Desktop.

### Install Rancher Desktop

Install the [latest version](https://github.com/rancher-sandbox/rancher-desktop/releases) of Rancher Desktop for your operating system.

## Setup Kubernetes

When running Rancher Desktop for the first time wait until the initialization is completed.

Make sure that a supported Kubernetes version is selected under `Kubernetes Settings` (Epinio has been tested on **v1.21.8**, **v1.22.5** and **v1.23.1**).

## Install epinio

Make sure Rancher Desktop is running.

Rancher Desktop can report Kubernetes as running while some pods are actually not yet ready.
Manual verification is possible by executing the command `kubectl get pods -A` in a terminal and checking that all pods report either `Running` or `Completed` as their status.

For now, Rancher Desktop configures his own loadbalancer (Traefik through K3s) and you have to set Epinio system domain according to the provided IP, for example:
```
LB_IP=$(kubectl describe svc traefik --namespace traefik \
        | awk '/Ingress/ { print $3 }')

export EPINIO_SYSTEM_DOMAIN=${LB_IP}.omg.howdoi.website
```
Previous commands are for Bash, but can be easily adapted for Windows shell.

If you don't want to use the default "magic" DNS, please follow [DNS setup](dns_setup.md).

The Epinio installation is pretty much identical on Linux, MacOS and Windows:
1. Start a terminal, use `cmd` or `powershell` on Windows (latest one is preferred) and your preferred one on Linux/MacOS.

2. Download the [latest version](https://github.com/epinio/epinio/releases) of Epinio binary and copy it on your client. It is recommended to add it to the `PATH` variable (`export PATH=<epinio-binary-path>:$PATH` on Linux/MacOS with Bash and on Windows please follow [Kevin Berg's article](https://medium.com/@kevinmarkvi/how-to-add-executables-to-your-path-in-windows-5ffa4ce61a53)).

3. Use `helm` to install Epinio by following either the [Method 1](install_epinio_auto.md) (recommended for most cases) or the [Method 2](install_epinio_manual.md) (useful for advanced configuration or if you already have some components in your environment). As **Traefik** is already installed, just bypass this step (by adding option `--set skipTraefik=true` for Method 1).

**NOTE:** *there is currently a [blocking issue](https://github.com/rancher-sandbox/rancher-desktop/issues/576) on Linux which prevent Epinio to push application!*
