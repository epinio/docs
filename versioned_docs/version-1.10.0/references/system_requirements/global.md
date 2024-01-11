---
sidebar_label: "Global System Requirements"
title: ""
---

<head>
  <link rel="canonical" href="https://docs.epinio.io/references/system_requirements/global"/>
</head>

## System Requirements

Please consider the following system requirements to be minimal, additional resources may be required for additional workload (apps).

| Component | Description |
| --- | --- |
| OS / Kubernetes <sup>1</sup> | Linux: [RKE2](../../installation/other_inst_scenarios/install_epinio_on_rke.md), [K3s](../../installation/other_inst_scenarios/install_epinio_on_k3s.md),   [K3d](../../installation/other_inst_scenarios/install_epinio_on_k3d.md), [Rancher Desktop](../../installation/other_inst_scenarios/install_epinio_on_rancher_desktop.md)<br/>Windows, MacOS: [Rancher Desktop](../../installation/other_inst_scenarios/install_epinio_on_rancher_desktop.md) |
| CPU | 2-4 vCPUs |
| Memory | 8GB RAM (system memory + 4GB) |
| Storage | 10GB Disk space (system disk + 5GB) |

<sup>1</sup> Linux: x86_64, arm64 and s390x; MacOS: x86_64, arm64 (epinio CLI only); Windows: x86_64

 #### Installation Requirements:
 * Installed [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl) CLI tool with access to the Kubernetes cluster via configured [kubeconfig](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/#the-kubeconfig-environment-variable) file
 * Installed [Helm](https://helm.sh/docs/intro/install/) CLI tool

### Kubernetes Requirements
:::info
* Kubernetes cluster v1.20-v1.26
* Deployed [cert-manager](https://cert-manager.io/docs/installation/helm/) resources
* Deployed [metrics-server](https://github.com/kubernetes-sigs/metrics-server#installation) resources
* Deployed Ingress Controller as [traefik](https://doc.traefik.io/traefik/getting-started/install-traefik/#use-the-helm-chart) or [nginx-ingress](https://docs.nginx.com/nginx-ingress-controller/installation/installation-with-helm/) with `default` IngressClass set
* Deployed Persistent Volume Provisioner as [Longhorn](https://longhorn.io) or [local-path](https://github.com/rancher/local-path-provisioner) providing a `default` StorageClass. Access mode `ReadWriteMany` (RWX) is preferred.
* [Optional] An external load-balancer solution in conjunction with an Ingress controller is needed for exposing Epinio HTTP(S) workload on Internet. More information [here](../../howtos/customization/provision_external_ip_for_local_kubernetes). <!--REVISIT the link-->
:::

### Default IngressClass

Although there are some ingress controllers that can work without the definition of a `default` IngressClass, it is recommended to use the default IngressClass (with the annotation `ingressclass.kubernetes.io/is-default-class: "true"`).

### Default StorageClass

A default StorageClass (with annotation `storageclass.kubernetes.io/is-default-class: "true"`) is needed.
