---
sidebar_label: System Requirements
sidebar_position: 5
title: System Requirements
description: System requirements for the Epinio Kubernetes development environment.
keywords: [epinio, kubernetes, global system requirements, development environment]
doc-type: [reference]
doc-topic: [epinio/reference/sys-req]
doc-persona: [epinio-developer, epinio-operator]
---

## General requirements

Consider these system requirements to be minimal.
It's almost certain that you'll need more resources for typical development and production workloads.

| Component | Description |
| --- | --- |
| OS/Kubernetes <sup>1</sup> | Linux: RKE2, K3s, K3d, etc<br/>Windows, macOS: minikube, etc |
| CPU | 2–4 vCPUs |
| Memory | 8 GB RAM (system memory + 4 GB) |
| Storage | 10 GB Disk space minimum (system disk + 5 GB)<br/>**See [Storage recommendations](../reference/concepts/storage.md) for production deployments** |

<sup>1</sup> Linux: x86_64, arm64 and s390x; macOS: x86_64, arm64 (Epinio CLI only); Windows: x86_64

### General installation requirements

- An installed [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl) CLI tool with access to the Kubernetes cluster via configured [kubeconfig](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/#the-kubeconfig-environment-variable) file
- An installed [Helm](https://helm.sh/docs/intro/install/) CLI tool

### Running the Epinio CLI on Windows

The Epinio CLI and its supporting tools are command line tools available on any Unix
platform, but not normally on Windows. On Windows you need:

- `sh`
- `sed`
- `git`

and also:

- `kubectl`
- `helm`

The project recommends installing the [Git for Windows](https://gitforwindows.org/)
distribution, as it provides the first three and much more. You can get `helm`,
`kubectl`, and `epinio` itself from their release pages:

- [Epinio releases](https://github.com/epinio/epinio/releases)
- [Helm releases](https://github.com/helm/helm/releases)
- [kubectl instructions](https://kubernetes.io/docs/tasks/tools/install-kubectl-windows/)

## Kubernetes requirements

- A Kubernetes cluster (v1.34, v1.35, or v1.36)
- An optional, but recommended, deployed [cert-manager](https://cert-manager.io/docs/installation/helm/) resources
- A deployed [metrics-server](https://github.com/kubernetes-sigs/metrics-server#installation) resources
- A deployed Ingress Controller with a `default` IngressClass set. We recommend [Traefik](https://doc.traefik.io/traefik/getting-started/install-traefik/#use-the-helm-chart).
- A deployed Persistent Volume Provisioner that provides a `default` StorageClass (for example, [local-path](https://github.com/rancher/local-path-provisioner)).
For preference, use access mode `ReadWriteMany` (RWX).
- _Optional_. You need an external load-balancer solution in conjunction with an Ingress controller for exposing Epinio HTTP(S) workload on the Internet.
More information [here](../how-to/operator/cluster-config/provision_external_ip_for_local_kubernetes.md).

### Default IngressClass

Although there are ingress controllers that can work without the definition of a `default` IngressClass,
it's recommended to use the default IngressClass, with the annotation `ingressclass.kubernetes.io/is-default-class: "true"`.

### Default StorageClass

You will need a default StorageClass, with annotation `storageclass.kubernetes.io/is-default-class: "true"`.
