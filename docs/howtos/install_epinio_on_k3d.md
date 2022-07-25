---
sidebar_label: "Install Epinio on k3d (local)"
sidebar_position: 18
title: ""
---

# Creating a K3d Kubernetes Cluster

This how-to was written using the following versions:
* [epinio helm chart 0.7.1](https://github.com/epinio/helm-charts/releases/tag/epinio-0.7.1)
* k3d version v5.3.0
## Get K3d Kubernetes Cluster

### Install K3d

Follow the [instructions](https://k3d.io/) to install k3d on your system.

#### Create a K3d kubernetes cluster

```bash
$ k3d cluster create epinio
```

#### Create a K3d kubernetes cluster when it is inside a VM

Epinio has to connect to pods inside the cluster. The default installation uses the internal docker IP for this. If docker is running in a VM, e.g. with Docker Desktop for Mac, that IP will not be reachable.

As a workaround the IP of the host can be used instead, together with port-forwardings:
```bash
k3d cluster create epinio -p '80:80@loadbalancer' -p '443:443@loadbalancer'
```

After the command returns, `kubectl` should already be talking to your new cluster:
```bash
$ kubectl get nodes
NAME                  STATUS   ROLES                  AGE   VERSION
k3d-epinio-server-0   Ready    control-plane,master   38s   v1.22.6+k3s1
```

### Install Epinio on the Cluster

Follow ["magic" DNS setup](../installation/magicDNS_setup.md) to define the domain name you will use for Epinio.

Then, continue with the [Epinio installation process](../installation/install_epinio.md).

### Troubleshooting

#### Kubeconfig

To get the kube config to access the cluster:
```
k3d kubeconfig get epinio
```

#### Traefik

In case of trouble with Epinio's Traefik component or Ingress controllers, the [Traefik](../explanations/advanced.md#traefik) section in the
[Advanced Topics](../explanations/advanced.md) document shall be your friend.
