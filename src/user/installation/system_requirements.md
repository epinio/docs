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

A default storage class (with annotation `storageclass.kubernetes.io/is-default-class: "true"`) is needed.
