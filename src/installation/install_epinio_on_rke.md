# Rancher RKE2 configuration

## Create an RKE2 cluster

If you don't have an existing cluster, follow the [quickstart](https://docs.rke2.io/install/quickstart/) to create an RKE2 cluster.

## RKE2 Prerequisites

* A load-balancer is mandatory for Epinio to work on RKE2. Here [MetalLB](https://metallb.universe.tf) was used as load-balancer.
  See [Provision of External IP for LoadBalancer service type in Kubernetes](../howtos/02_provision_external_ip_for_local_kubernetes.md) for more information.
* Epinio Rancher RKE2 version v1.21.4+rke2r3 and v1.22.5+rke2r1
* Epinio installation passed on a 3 node cluster (1 server, 2 agents) with Longhorn v1.1.1 storage class

## Installation

Beside advanced installation options, there are two ways of installing Epinio:

1. [Installation using a MagicDNS Service](./install_epinio_magicDNS.md)

- For test environments. This should work on nearly any kubernetes distribution. Epinio will try to automatically create a magic DNS domain, e.g. **10.0.0.1.omg.howdoi.website**.

2. [Installation using a Custom Domain](./install_epinio_customDNS.md)

- For test and production environments. You will define a system domain, e.g. **test.example.com**.
