---
sidebar_label: "Installing Epinio On Public Clouds"
sidebar_position: 21
title: ""
---

# Install Epinio on Public Clouds

Epinio can be installed on any Kubernetes distribution, including the Public Cloud ones.

## Public Clouds configuration

<details>
<summary>Microsoft AKS configuration</summary>

### AKS prerequisites

* Epinio has been tested with AKS version **v1.21.9**
* To just try out Epinio, e.g. 2 **Standard_D2_v2** nodes are sufficient

### Create an AKS cluster

If you do not have an existing cluster, follow the [quickstart](https://docs.microsoft.com/en-us/azure/aks/kubernetes-walkthrough) to create an AKS cluster.

:::caution

In AKS, Epinio must be installed with an external registry because due to a [change](https://github.com/epinio/epinio/issues/1373#issuecomment-1105231113) in Azure, we cannot use internal registry anymore.

:::
</details>

<details>
<summary>Amazon EKS configuration</summary>

### EKS prerequisites

* Epinio has been tested with EKS version **v1.21**
* To just try out Epinio, e.g. 2 **t3a.large** nodes are sufficient

### Create an EKS cluster

If you do not have an existing cluster, follow the [quickstart](https://docs.aws.amazon.com/eks/latest/userguide/getting-started.html) to create an EKS cluster.
</details>

<details>
<summary>Google GKE configuration</summary>

### GKE prerequisites

* Epinio has been tested with GKE version **v1.21.9**
* To just try out Epinio, e.g. 1 **n2-standard-4** node is sufficient

### Create a GKE cluster

If you do not have an existing cluster, follow the [quickstart](https://cloud.google.com/kubernetes-engine/docs/quickstart) to create a GKE cluster.
</details>

## Install Epinio

Follow the [Epinio installation process](../installation/install_epinio.md).

## Troubleshooting

In case of trouble with Epinio's Traefik component or Ingress controllers, the [Traefik](../explanations/advanced.md#traefik) section in the [Advanced Topics](../explanations/advanced.md) document shall be your friend.
