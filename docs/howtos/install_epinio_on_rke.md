---
sidebar_label: "Installing Epinio On RKE2 (Rancher)"
sidebar_position: 16
title: ""
---

# Rancher RKE2 configuration

This page was written using the following versions:
* [epinio helm chart 0.7.1](https://github.com/epinio/helm-charts/releases/tag/epinio-0.7.1)
* RKE2 version v1.22.7+rke2r2

## Create an RKE2 cluster

If you don't have an existing cluster, follow the [quickstart](https://docs.rke2.io/install/quickstart/) to create an RKE2 cluster.

## RKE2 Prerequisites

* A load-balancer is mandatory for Epinio to work on RKE2. Here [MetalLB](https://metallb.universe.tf) was used as load-balancer.
  See [Provision of External IP for LoadBalancer service type in Kubernetes](../howtos/provision_external_ip_for_local_kubernetes) for more information.

## Installation

Beside advanced installation options, there are two ways of installing Epinio:

1. [Installation using a MagicDNS Service](../installation/magicDNS_setup.md)

- For test environments. This should work on nearly any kubernetes distribution. Epinio will try to automatically create a magic DNS domain, e.g. **10.0.0.1.omg.howdoi.website**.

2. [DNS setup](../installation/dns_setup.md)

- For test and production environments. You will define a system domain, e.g. **test.example.com**.


Then, continue with the [Epinio installation process](../installation/install_epinio.md).
