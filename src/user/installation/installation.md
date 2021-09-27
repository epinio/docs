# Installation

The Epinio CLI will typically run on a host, which will need network access to your kubernetes cluster.
Usually you will use the same host to run tooling, like e.g. "kubectl" and "helm".

The compiled binary will use about 40-50MB disk space, incl. local configuration files.

### Install the Epinio CLI

Refer to [Install the Epinio CLI](user/installation/install_epinio_cli.md).

### Installation Methods (in Cluster)

Beside advanced installation options, there are two ways of installing Epinio:

1. [Installation using a MagicDNS Service](user/installation/install_epinio_magicDNS.md)

- For test environments. This should work on nearly any kubernetes distribution. Epinio will try to automatically create a magic DNS domain, e.g. **10.0.0.1.omg.howdoi.website**.

2. [Installation using a Custom Domain](user/installation/install_epinio_customDNS.md)

- For test and production environments. You will have to define a system domain, e.g. **test.example.com**.

### Installation on Specific Kubernetes Offerings

- [Install on K3d](user/installation/install_epinio_on_k3d.md) - Install K3d and then install Epinio
- [Install on EKS](user/installation/install_epinio_on_eks.md) - Install Epinio in Amazon EKS clusters
- [Install on AKS](user/installation/install_epinio_on_aks.md) - Install Epinio in Azure AKS clusters
- [Install on GKE](user/installation/install_epinio_on_gke.md) - Install Epinio in Google GKE clusters
- [Install on RKE2](user/installation/install_epinio_on_rke.md) - Install Epinio in Rancher RKE2 clusters
