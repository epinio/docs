---
sidebar_label: System requirements
title: System requirements
description: System requirements for the Epinio Kubernetes development environment.
keywords: [epinio, kubernetes, global system requirements, development environment]
doc-type: [reference]
doc-topic: [epinio/reference/sys-req]
doc-persona: [epinio-developer, epinio-operator]
---

## General requirements

Consider these system requirements to be minimal.
It's almost certain that you'll need more resources for typical development and production workloads.

| Component | Description |
| --- | --- |
| OS/Kubernetes <sup>1</sup> | Linux: [RKE2](../../installation/other_inst_scenarios/install_epinio_on_rke.md), [K3s](../../installation/other_inst_scenarios/install_epinio_on_k3s.md),   [K3d](../../installation/other_inst_scenarios/install_epinio_on_k3d.md), [Rancher Desktop](../../installation/other_inst_scenarios/install_epinio_on_rancher_desktop.md)<br/>Windows, macOS: [Rancher Desktop](../../installation/other_inst_scenarios/install_epinio_on_rancher_desktop.md) |
| CPU | 2–4 vCPUs |
| Memory | 8 GB RAM (system memory + 4 GB) |
| Storage | 10 GB Disk space (system disk + 5 GB) |

<sup>1</sup> Linux: x86_64, arm64 and s390x; macOS: x86_64, arm64 (Epinio CLI only); Windows: x86_64

### General installation requirements

- An installed [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl) CLI tool with access to the Kubernetes cluster via configured [kubeconfig](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/#the-kubeconfig-environment-variable) file
- An installed [Helm](https://helm.sh/docs/intro/install/) CLI tool

## Kubernetes requirements

- A Kubernetes cluster v1.20-v1.28
- A deployed [cert-manager](https://cert-manager.io/docs/installation/helm/) resources
- A deployed [metrics-server](https://github.com/kubernetes-sigs/metrics-server#installation) resources
- A deployed Ingress Controller as [Traefik](https://doc.traefik.io/traefik/getting-started/install-traefik/#use-the-helm-chart)
or [nginx-ingress](https://docs.nginx.com/nginx-ingress-controller/installation/installation-with-helm/) with `default` IngressClass set
- A deployed Persistent Volume Provisioner as [Longhorn](https://longhorn.io)
or [local-path](https://github.com/rancher/local-path-provisioner) providing a `default` StorageClass.
For preference, use access mode `ReadWriteMany` (RWX).
- _Optional_. You need an external load-balancer solution in conjunction with an Ingress controller for exposing Epinio HTTP(S) workload on the Internet.
More information [here](../../howtos/customization/provision_external_ip_for_local_kubernetes). <!--TODO: What did this revisit the link mean?--><!--REVISIT the link-->

### Default IngressClass

Although there are ingress controllers that can work without the definition of a `default` IngressClass,
it's recommended to use the default IngressClass, with the annotation `ingressclass.kubernetes.io/is-default-class: "true"`.

### Default StorageClass

You will need a default StorageClass, with annotation `storageclass.kubernetes.io/is-default-class: "true"`.
