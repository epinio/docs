# Installation

## System requirements

Epinio is a Kubernetes application and thus needs a running Kubernetes
cluster for installation.

See [system requirements](system_requirements.md) about the Kubernetes
environment Epinio expects to run on.

## Installation Methods

There are at least 2 ways to install Epinio on a Kubernetes cluster. Which one
you choose depends on the target environment and the amount of customization
you want over the default Epinio installation.

1. [Install Epinio and automatically install dependencies](install_epinio_auto.md) - Start here if you are new to Epinio
2. [Install Epinio and manually install components](install_epinio_manual.md) - Full control over installation, mostly for production setups

Epinio is not just one application running on your cluster. It depends on other Kubernetes components for some of its functionality. The 2 different installation methods above, provide different level of configurability on how you get those dependencies installed on your cluster. If you are just starting out with a fresh cluster and you don't have an opinion on how things should be installed, then the first method is the best for you.

If you've done your due diligence and you are now ready to deploy Epinio on your production clusters, maybe your Dev Ops team wants to fully control what is being installed an how. In that case, the second installation option may be better.

## Installation on Specific Kubernetes Offerings

- [Install on Rancher](install_epinio_on_rancher.md) - Install Epinio on Rancher
- [Install on Public Cloud](install_epinio_on_public_cloud.md) - Install Epinio on Public Cloud cluster
- [Install on RKE2](install_epinio_on_rke.md) - Install Epinio on Rancher RKE2 cluster
- [Install on K3d](install_epinio_on_k3d.md) - Install Epinio on K3d cluster
- [Install on K3s](install_epinio_on_k3s.md) - Install Epinio on K3s cluster
- [Install on Rancher Desktop](install_epinio_on_rancher_desktop.md) - Install Epinio on Rancher Desktop
- [Install on Minikube](install_epinio_on_minikube.md) - Install Epinio on Minikube cluster
