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

While Kubernetes 1.22 is supported there is an issue when the container runtime is `containerd > 1.5.6`.
The [pack cli](https://github.com/buildpacks/pack) is placing too much information into the
image layers. The relevant issue is: https://github.com/paketo-buildpacks/full-builder/issues/415


### Installing on Digital Ocean

When installing Epinio on Rancher-provisioned RKE2 or RKE1
clusters on Digital Ocean, you might see this error message:

```
error installing Epinio:
timed out waiting for LoadBalancer IP on traefik service
Ensure your kubernetes platform has the ability to provision a LoadBalancer IP address.
```

In this case you need to configure RKE/RKE2 with an external cloud
provider as [this one](https://github.com/digitalocean/digitalocean-cloud-controller-manager).