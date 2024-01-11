---
sidebar_label: "Installing Epinio on public clouds"
sidebar_position: 22
title: "Installing Epinio on public clouds"
description: Installing Epinio on Kubernetes services provided by public cloud providers, such as Google, Amazon and Microsoft.
keywords: [kubernetes, amazon, microsoft, google, epinio, AKS, EKS, GKE]
---

<head>
  <link rel="canonical" href="https://docs.epinio.io/installation/other_inst_scenarios/install_epinio_on_public_cloud"/>
</head>

Epinio can be installed on any Kubernetes distribution,
including those provided by public clouds.

## Public clouds configuration

### Microsoft AKS

#### AKS prerequisites

* Epinio has been tested with AKS version **v1.21.9**
* To try out Epinio, two **Standard_D2_v2** nodes are enough

#### Create an AKS cluster

If you don't have an existing cluster,
follow the
[quickstart](https://docs.microsoft.com/en-us/azure/aks/kubernetes-walkthrough)
to create an AKS cluster.

:::note

In AKS, Epinio must be installed with an external registry.
Due to a
[change](https://github.com/epinio/epinio/issues/1373#issuecomment-1105231113)
in Azure
using the internal registry is no longer possible.

:::

### Amazon EKS

#### EKS prerequisites

* Epinio has been tested with EKS version **v1.22**, **v1.23** and **v1.24**
* To try out Epinio, two **t3a.large** nodes are enough

#### Create an EKS cluster

If you don't have an existing EKS cluster, follow the [quickstart](https://docs.aws.amazon.com/eks/latest/userguide/getting-started.html) to create one.

Details are in the dedicated [EKS documentation](./install_epinio_on_eks.md).

### Google GKE

#### GKE prerequisites

* Epinio has been tested with GKE version **v1.21.9**
* To try out Epinio, one **n2-standard-4** node is enough

#### Create a GKE cluster

If you don't have an existing GKE cluster, follow the [quickstart](https://cloud.google.com/kubernetes-engine/docs/quickstart) to create one.

## Install Epinio

Follow the [Epinio installation process](../../installation/install_epinio.md).

## Troubleshooting

If you have issues using Epinio's Traefik component
or Ingress controllers,
refer to the [Traefik](../../explanations/advanced.md#traefik) section
in the [Advanced Topics](../../explanations/advanced.md) document.
