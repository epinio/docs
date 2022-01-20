# Install Epinio on Public Clouds

Epinio can be installed on any Kubernetes distribution, including the Public Cloud ones.

## Public Clouds configuration

<details>
<summary>Microsoft AKS configuration</summary>

### AKS prerequisites

* Epinio has been tested with AKS version **v1.20.9** and **v1.21.7**
* To just try out Epinio, e.g. 2 **Standard_D2_v2** nodes are sufficient

### Create an AKS cluster

If you do not have an existing cluster, follow the [quickstart](https://docs.microsoft.com/en-us/azure/aks/kubernetes-walkthrough) to create an AKS cluster.
</details>

<details>
<summary>Amazon EKS configuration</summary>

### EKS prerequisites

* Epinio has been tested with EKS version **v1.20.7** and **v1.21.2**
* To just try out Epinio, e.g. 2 **t3a.large** nodes are sufficient

### Create an EKS cluster

If you don't have an existing cluster, follow the [quickstart](https://docs.aws.amazon.com/eks/latest/userguide/getting-started.html) to create an EKS cluster.
</details>

<details>
<summary>Google GKE configuration</summary>

### GKE prerequisites

* Epinio has been tested with GKE version **v1.20.7**, **v1.21.2** and **v1.21.5**
* To just try out Epinio, e.g. 1 **n2-standard-4** node is sufficient

### Create a GKE cluster

If you don't have an existing cluster, follow the [quickstart](https://cloud.google.com/kubernetes-engine/docs/quickstart) to create a GKE cluster.
</details>

## Installation on Public Clouds

Beside advanced installation options, there are two ways of installing Epinio:

1. [Installation using a MagicDNS Service](./install_epinio_magicDNS.md)

- For test environments, this should work on nearly any kubernetes distribution. Epinio will try to automatically create a magic DNS domain, e.g. **10.0.0.1.omg.howdoi.website**.

2. [Installation using a Custom Domain](./install_epinio_customDNS.md)

- For test and production environments, you will define a system domain, e.g. **test.example.com**.

## Troubleshooting

In case of trouble with Epinio's Traefik component or Ingress controllers, the [Traefik](../explanations/advanced.md#traefik) section in the [Advanced Topics](../explanations/advanced.md) document shall be your friend.
