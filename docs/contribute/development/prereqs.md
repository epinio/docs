---
sidebar_label: 'Prerequisites'
sidebar_position: 2
title: 'Prerequisites'
description: Prerequisites to begin contributing to the Epinio UI.
keywords: [epinio, contributing, ui]
doc-type: [contribute]
doc-topic: [ui-contribution-prerequisites]
doc-persona: [epinio-developer]
---

There are two ways to set up a development environment for Epinio:

1. Set up a local Kubernetes cluster and install Epinio manually
2. Use VS Code Dev Containers

## Option A: Setting up a cluster

1. We can use Minikube, k3d, etc to do this. For these instructions, we will use Minikube. Go ahead and install Minikube.
2. After installation, run `minikube start`.
3. Install Traefik bound to the node's ports, so the cluster is reachable at its node IP:

   ```bash
   helm repo add traefik https://traefik.github.io/charts
   helm repo update
   helm upgrade --install traefik traefik/traefik --namespace traefik --create-namespace \
       --set ingressClass.isDefaultClass=true \
       --set ports.web.hostPort=80 \
       --set ports.websecure.hostPort=443
   ```

   Note: on Windows or macOS the node IP may not be directly reachable; run `minikube tunnel` in a separate terminal.
4. [Install Rancher](https://ranchermanager.docs.rancher.com/getting-started/installation-and-upgrade/install-upgrade-on-a-kubernetes-cluster) on your new cluster.

   4a. Ensure you have switched your context if minikube didn't do so already.

   4b. Note that when setting this up, your hostname should be `rancher.<minikube ip>.sslip.io`. To get your Minikube IP, run `minikube ip`.

   4c. Use the stable branch when adding your Helm charts locally unless you are testing specific features against Epinio.

   4d. Depending on your system resources, Rancher can take a while to get started up, so be patient.

   4e. Navigate to the Rancher URL you set up and complete the setup Rancher process; the default password is `admin`.

5. Set up your Epinio Helm Values file. You can save this as epinio-values.yaml for use in the next step.

```
global:
  domain: '<ip>.sslip.io'
rancher:
  url: '<url of the location that serves the dashboard, for dev this would be https://localhost:8005>'
```

6. [Install Epinio](../../getting-started/install-epinio.md)

6a. Note once you hit the installation step for epinio itself, you can supplement the command with `helm install epinio -n epinio --create-namespace epinio/epinio -f epinio-values.yaml` to target your newly created helm values file.

Congrats, you have completed all of the prerequisites to develop Epinio! Check out how to get started with the [Epinio Rancher Extension](./ui/extension) or [Standalone Application](./ui/standalone). Looking forward to your first PR!

## Option B: Using Devcontainers for Epinio Development

This guide walks you through setting up a local Epinio development environment using [VS Code Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers). The devcontainer provides a fully configured environment with k3d, Kubernetes, and Epinio — ready to go with a single command.

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
  - Recommended: allocate at least **64GB disk space** in Docker Desktop → Settings → Resources
- [Visual Studio Code](https://code.visualstudio.com/) with the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) installed
- The Epinio repository cloned locally

### Host Machine Setup

Before starting the devcontainer, add the following entries to your host machine's `/etc/hosts` file:

```
127.0.0.1  epinio.127.0.0.1.sslip.io auth.127.0.0.1.sslip.io
```

On macOS, edit the file and flush the DNS cache:

```bash
sudo nano /etc/hosts
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
```

On Linux:

```bash
sudo nano /etc/hosts
```

### Starting the Devcontainer

1. Open the Epinio repository folder in VS Code.
2. Open the command palette (`Ctrl+Shift+P` / `Cmd+Shift+P`).
3. Select **Dev Containers: Reopen in Container**.

VS Code will build the container and run the setup script automatically. This process takes several minutes on first run as it:

- Creates a k3d Kubernetes cluster
- Installs cert-manager, nginx ingress controller, and a local storage provisioner
- Deploys Epinio from the local helm chart
- Builds the Go binary and patches the running deployment with your local code

You can monitor progress in the terminal output.

Once complete, Epinio is accessible at: **https://epinio.127.0.0.1.sslip.io:8443**

> **Note:** You will need to accept a self-signed certificate warning in your browser.

### What's Included

The devcontainer comes pre-configured with:

- **Docker-in-Docker** for running containers inside the development environment
- **kubectl** and **helm** for Kubernetes management
- **Go 1.24** for building Epinio
- **VS Code extensions**: Kubernetes tools, Go language support, and Run On Save
- An `epinio` alias pointing to the locally built binary

### Development Workflow

#### Making Code Changes

After modifying Go source files, you need to rebuild the binary and patch the running deployment. There are two ways to do this:

**Automatic (on save):**

The devcontainer includes the Run On Save extension. Every time you save a `.go` file, the binary is automatically rebuilt and the deployment is patched. You can see the output in VS Code's **Output** panel under "Run On Save".

**Manual:**

Run the reload script from the terminal:

```bash
bash .devcontainer/dev-reload.sh
```

#### Using the Epinio CLI

The devcontainer sets up an `epinio` alias. Open a new terminal and use it directly:

```bash
epinio login -u admin -p password --trust-ca https://epinio.127.0.0.1.sslip.io
epinio push -n myapp
epinio app list
```

### Switching Helm Chart Sources

The devcontainer supports switching between a local helm chart and a remote (published) chart. This is controlled by environment variables in `devcontainer.json`:

**Using the local chart (default):**

```json
"EPINIO_CHART_SOURCE": "local",
"EPINIO_CHART_VERSION": ""
```

**Using a remote chart (latest):**

```json
"EPINIO_CHART_SOURCE": "remote",
"EPINIO_CHART_VERSION": ""
```

**Using a remote chart (specific version):**

```json
"EPINIO_CHART_SOURCE": "remote",
"EPINIO_CHART_VERSION": "1.13.7"
```

After changing these values, rebuild the container for the changes to take effect.

You can also switch without rebuilding by exporting the variables in the terminal and re-running setup:

```bash
export EPINIO_CHART_SOURCE=remote
export EPINIO_CHART_VERSION=1.13.7
bash .devcontainer/setup.sh
```

### Rebuilding the Container

**Rebuild with cache** (preserves the existing k3d cluster):

Command palette → **Dev Containers: Rebuild Container**

**Rebuild without cache** (creates a fresh cluster):

Command palette → **Dev Containers: Rebuild Without Cache**

Use a cached rebuild when you've made changes to `devcontainer.json` or the setup scripts. Use a no-cache rebuild when you want a completely clean environment.

### Troubleshooting

#### Port-forward not working

If the Epinio UI is not accessible from your browser, verify the port-forward is running:

```bash
ps aux | grep port-forward
```

If it's not running, restart it manually:

```bash
kubectl port-forward -n ingress-nginx svc/ingress-nginx-controller 8443:443 --address 0.0.0.0
```

#### Pods being evicted (DiskPressure)

If pods are getting evicted with `DiskPressure` errors, increase the disk allocation in Docker Desktop → Settings → Resources → Disk image size. A minimum of 64GB is recommended.

#### Helm upgrade conflicts

If you see field ownership conflicts during helm upgrades after using the dev-reload script, rebuild without cache to get a fresh cluster, or the setup script will attempt to fix ownership automatically.

#### DNS resolution issues

If `epinio.127.0.0.1.sslip.io` does not resolve from your host machine, ensure the `/etc/hosts` entries are in place as described in the [Host Machine Setup](#host-machine-setup) section.

#### Docker socket errors during staging

If `epinio push` fails with Docker socket errors, verify the socket is mounted in the k3d node:

```bash
docker exec k3d-epinio-server-0 ls -la /var/run/docker.sock
```

If it's missing, the cluster needs to be recreated. Rebuild the container without cache.

### File Reference

| File | Purpose |
|---|---|
| `.devcontainer/devcontainer.json` | Main configuration: base image, features, extensions, environment variables |
| `.devcontainer/setup.sh` | One-time setup: cluster creation, helm installs, binary build and patch |
| `.devcontainer/start.sh` | Runs on every container start: port-forwarding with readiness check |
| `.devcontainer/dev-reload.sh` | On-demand or on-save: rebuilds binary and patches deployment |
