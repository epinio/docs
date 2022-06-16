---
sidebar_label: "Global System Requirements"
title: ""
---

## Kubernetes Cluster Requirements

For the Epinio server, and related deployments we recommend to consider the following resources:

- x86_64, ARM32, or ARM64 architecture
- Supported operating systems
  - Linux
    - K3s, K3d
    - minikube
  - Windows
    - [Rancher Desktop](../../howtos/install_epinio_on_rancher_desktop.md)
  - MacOS
- Kubernetes versions 1.20 .. 1.23
- 2-4 VCPUs
- 8GB RAM (system memory + 4GB)
- 10GB Disk space (system disk + 5GB)

In addition, extensive requirements for your workload (apps) would add to that.

### Storage Class

A default storage class (with annotation `storageclass.kubernetes.io/is-default-class: "true"`) is needed.

### Load Balancer

Epinio (Traefik) requires a load-balancer. Depending on your target infrastructure, you can use embedded ones (like on Public Cloud, K3d, aso.) or configure your own.
Also see [Provision of External IP for LoadBalancer service type in Kubernetes](../../howtos/provision_external_ip_for_local_kubernetes.md) for more information.

### Troubleshooting

While Kubernetes **v1.22** is supported there is an issue when the container runtime is `containerd > 1.5.6`: the [pack cli](https://github.com/buildpacks/pack) is placing too much information into the
image layers ([relevant issue](https://github.com/paketo-buildpacks/full-builder/issues/415)).

This was fixed in version **v1.5.8** of `containerd`, and the updated runtime is available from Kubernetes **v1.22.4** onwward, so if you have a lower version please update.
