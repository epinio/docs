# Installation

## System requirements

Epinio is a Kubernetes application and thus needs a running Kubernetes
cluster for installation.

See [system requirements](system_requirements.md) about the Kubernetes
environment Epinio expects to run on.

## Installation Methods

There are at least 3 ways to install Epinio on a Kubernetes cluster. Which one
you choose depends on the target environment and the amount of customization
you want over the default Epinio installation.

- [Install Epinio and automatically install dependencies](installation/install_epinio_auto.md) - Start here if you are new to Epinio
- [Install Epinio and manually install components](installation/install_epinio_manual.md) - Full control over installation, mostly for production setups
- [Install Epinio and components using a manifest and the binary installer](installation/install_epinio_binary.md) - Automated installation with the ability to change what is being deployed

## Installation on Specific Kubernetes Offerings

- [Install on K3d](install_epinio_on_k3d.md) - Install K3d and then install Epinio
- [Install on Minikube](install_epinio_on_minikube.md) - Install Minikube and then install Epinio
- [Install on K3s](install_epinio_on_k3s.md) - Install Epinio in k3s clusters
- [Install on EKS](install_epinio_on_eks.md) - Install Epinio in Amazon EKS clusters
- [Install on AKS](install_epinio_on_aks.md) - Install Epinio in Azure AKS clusters
- [Install on GKE](install_epinio_on_gke.md) - Install Epinio in Google GKE clusters
- [Install on RKE2](install_epinio_on_rke.md) - Install Epinio in Rancher RKE2 clusters
