---
sidebar_label: "Quickstart"
sidebar_position: 1
title: "Quickstart"
description: Install Epinio on a cluster and push your first application, with copy-paste commands.
keywords: [epinio, kubernetes, quickstart, install, minikube, helm]
doc-type: [tutorial]
doc-persona: [epinio-developer, epinio-operator]
doc-topic: [epinio, getting-started, quickstart]
---

Install Epinio and push an application, with default options. Copy-paste the
commands below in order.

## Prerequisites

- [`kubectl`](https://kubernetes.io/docs/tasks/tools/) and [`helm`](https://helm.sh/docs/intro/install/) installed.
- A Kubernetes cluster with a default **StorageClass** and a default **IngressClass**.
  No cluster? Start one with [minikube](#no-cluster-start-minikube) below.

For anything beyond a trial, see [system requirements](./system-requirements.md)
and the full [installation](./install-epinio.md) guide.

## No cluster? Start minikube

```bash
minikube start --cpus 4 --memory 8g
helm repo add traefik https://traefik.github.io/charts
helm repo update
helm upgrade --install traefik traefik/traefik --namespace traefik --create-namespace \
    --set ingressClass.isDefaultClass=true \
    --set ports.web.hostPort=80 \
    --set ports.websecure.hostPort=443
```

This installs [Traefik](https://traefik.io/) bound to the node's `:80`/`:443`, so
the cluster is reachable at its node IP. minikube already provides a default
StorageClass, so storage needs no extra setup.

:::note
On macOS or Windows the minikube node IP isn't directly reachable from the host;
run `minikube tunnel` in a separate terminal, or use Linux.
:::

## Set your domain

Epinio needs a wildcard domain that points at your ingress. With minikube, use its
IP and a wildcard DNS service such as [`sslip.io`](https://sslip.io):

```bash
export EPINIO_DOMAIN="$(minikube ip).sslip.io"
```

On an existing cluster, set `EPINIO_DOMAIN` to a wildcard domain that resolves to
your ingress (for example `<INGRESS-IP>.sslip.io`).

## Install cert-manager

```bash
helm repo add jetstack https://charts.jetstack.io
helm repo update
helm upgrade --install cert-manager jetstack/cert-manager \
    --namespace cert-manager --create-namespace \
    --set crds.enabled=true
```

## Install Epinio

```bash
helm repo add epinio https://epinio.github.io/helm-charts
helm repo update
helm upgrade --install epinio epinio/epinio \
    --namespace epinio --create-namespace \
    --set global.domain="$EPINIO_DOMAIN"
```

## Install the Epinio CLI

Download the binary (Linux shown, for macOS replace `linux` with `darwin`):

```bash
curl -Lo epinio https://github.com/epinio/epinio/releases/latest/download/epinio-linux-x86_64
chmod +x epinio
sudo mv epinio /usr/local/bin/
```

For macOS, Windows, and signature verification, see
[Install the Epinio CLI](./install-cli.md). If you use Homebrew:

```bash
brew install epinio
```

## Log in

```bash
epinio login -u admin "https://epinio.$EPINIO_DOMAIN"
```

Press `y` to trust the self-signed certificate.

## Push your first application

```bash
git clone https://github.com/epinio/example-12factor.git
epinio push --name sample --path example-12factor
```

When the push finishes, Epinio prints the application URL. Open it in your browser,
or print it again with:

```bash
epinio app show sample
```

That is the whole loop: from sources to a live URL in one command.

## Next steps

- Work with [namespaces](../how-to/developer/concepts/namespaces/namespaces.mdx) to separate your apps.
- Browse every command in the [CLI reference](../reference/cli/index.md).
- See which application types are supported in [supported applications](../reference/concepts/supported_applications.md).
