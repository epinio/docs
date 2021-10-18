## Kubernetes Cluster Requirements

For the Epinio server, and related deployments we recommend to consider the following resources:

- x86_64, ARM32, or ARM64 architecture
- Supported operating systems
  - Linux
    - k3s, k3d
    - minikube (not yet)
  - Windows
    - [Rancher Desktop](https://rancherdesktop.io)
  - MacOS
- Kubernetes versions 1.18 .. 1.21
- 2-4 VCPUs
- 8GB RAM (system memory + 4GB)
- 10GB Disk space (system disk + 5GB)

In addition, extensive requirements for your workload (apps) would add to that.

### Storage Class

A default storage class (with annotation `storageclass.kubernetes.io/is-default-class: "true"`) is needed.

### Load Balancer

Epinio (Traefik) requires a load-balancer. Depending on your target infrastructure, you can use embedded ones (like on Public Cloud, k3d, aso.) or configure your own.
Also see [Provision of External IP for LoadBalancer service type in Kubernetes](../howtos/provision_external_ip_for_local_kubernetes.md) for more information.

### Troubleshooting

While Kubernetes 1.22 is supported there is an issue when the container runtime is `containerd > 1.5.6`.
The [pack cli](https://github.com/buildpacks/pack) is placing too much information into the
image layers. The relevant issue is: https://github.com/paketo-buildpacks/full-builder/issues/415
