---
sidebar_label: "Installing Epinio on a local K3d"
sidebar_position: 21
title: "Installing Epinio on a local K3d"
description: How to install Epinio on a locally hosted K3d system.
keywords: [kubernetes, k3d, epinio, installation]
---

<head>
  <link rel="canonical" href="https://docs.epinio.io/installation/other_inst_scenarios/install_epinio_on_k3d"/>
</head>


This How-to uses these versions:

- [epinio helm chart 0.7.1](https://github.com/epinio/helm-charts/releases/tag/epinio-0.7.1)
- [k3d](https://k3d.io/) version v5.3.0


## Install a K3d Kubernetes cluster

Follow the [K3d instructions](https://k3d.io/) to install K3d on your system.

### Create a K3d Kubernetes cluster

```bash
$ k3d cluster create epinio
```

### Create a K3d Kubernetes cluster inside a VM

Epinio needs to connect to pods inside the cluster.
The default installation uses the internal docker IP for this.
If docker is running in a VM, for example,
with Docker Desktop, that IP won't be reachable.

As a workaround, use the IP of the host instead, together with port-forwardings:

```bash
k3d cluster create epinio -p '80:80@loadbalancer' -p '443:443@loadbalancer'
```

After this, `kubectl` should be talking to your new cluster:

```bash
$ kubectl get nodes
NAME                  STATUS   ROLES                  AGE   VERSION
k3d-epinio-server-0   Ready    control-plane,master   38s   v1.22.6+k3s1
```

### Install Epinio on the cluster

Follow [wildcard DNS setup](../../installation/wildcardDNS_setup.md) to define the domain name you want to use for Epinio.

Then, continue with the [Epinio installation process](../../installation/install_epinio.md).

### Troubleshooting

#### Kubeconfig

To get `kubeconfig` to access the cluster:
```
k3d kubeconfig get epinio
```

#### Traefik

In case of issues with Epinio's Traefik component or Ingress controllers, refer to the [Traefik](../../explanations/advanced.md#traefik) section in the
[Advanced Topics](../../explanations/advanced.md) document.
