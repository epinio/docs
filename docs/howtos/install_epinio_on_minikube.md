---
sidebar_label: "Installing Epinio On Minikube (local)"
sidebar_position: 20
title: ""
---

# Creating a Minikube Kubernetes Cluster

This how-to was written using the following versions:
* [epinio helm chart 0.7.1](https://github.com/epinio/helm-charts/releases/tag/epinio-0.7.1)
* minikube version v1.25.2
## Get Minikube Kubernetes Cluster

### Install Minikube

Follow the [instructions](https://minikube.sigs.k8s.io/docs/start/) to install Minikube on your system.

### Create a Minikube kubernetes cluster

Epinio installation was tested on Minikube with the following drivers: docker, kvm, virtualbox.

Specify the driver you want to use with the `--driver` option.

```bash
$ minikube start --driver=docker
```

Once the cluster is ready, you need to install the metallb addon:

```bash
$ minikube addons enable metallb
```

Then, you have to configure metallb by giving it an IP address range.<br />
For instance check your minikube IP with `minikube ip` and choose how many IP addresses you need.

```bash
$ minikube ip
192.168.49.2
```

As an example, we choose the range `192.168.49.100-192.168.49.120`.<br />
Configure the addon with those values.

```bash
$ minikube addons configure metallb
-- Enter Load Balancer Start IP: 192.168.49.100
-- Enter Load Balancer End IP: 192.168.49.120
     Using image metallb/speaker:v0.9.6
     Using image metallb/controller:v0.9.6
  metallb was successfully configured
```

Now you can install Epinio on the Cluster.


### Install Epinio on the Cluster

With Minikube, you'll need to deploy Traefik and cert-manager.
All is explained in the [Epinio installation process](../installation/install_epinio.md).
