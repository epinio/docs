---
sidebar_label: "Installing Epinio on RKE2"
sidebar_position: 19
title: "Installing Epinio on RKE2"
description: Installing Epinio with RKE2. The needed environment and prerequisites.
keywords: [epinio, k8s, kubernetes, rke2, installation]
---

<head>
  <link rel="canonical" href="https://docs.epinio.io/installation/other_inst_scenarios/install_epinio_on_rke"/>
</head>

This guide will help you to deploy a suitable RKE2 Kubernetes cluster for Epinio.
More details for installing RKE2 can be found in the RKE2 [quickstart](https://docs.rke2.io/install/quickstart/) guide.

## Install RKE2 Kubernetes cluster {#install-rke2}

We're using a dedicated machine for the RKE2 server node.
The following steps are performed using the `root` account on that machine.

1. Run the installer, start and enable the rke2-server systemd service.

    ```bash
    curl -sfL https://get.rke2.io | sh -
    systemctl enable --now rke2-server.service
    ```

1. Configure environment variables for operating the RKE2 cluster.
    Execute these commands. Then add them to `/root/.bashrc` for persistence.

    ```bash
    export PATH=$PATH:/var/lib/rancher/rke2/bin:/opt/rke2/bin
    export KUBECONFIG=/etc/rancher/rke2/rke2.yaml
    ```

Make sure that you can communicate with your new RKE2 cluster by running:

```bash
kubectl get pods --all-namespaces
```

## RKE2 cluster prerequisities

Perform the following steps on your RKE2 node before installing Epinio:

1. Install the helm CLI.

    ```bash
    curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
    ```

1. Configure rke2-ingress-nginx-controller.
    While the `rke2-ingress-nginx-controller` cluster is installed by default on RKE2 clusters, we need to set the IngressClass `nginx` up as the `default` class.
    This is done by running:

    ```bash
    kubectl patch ingressClass nginx -p '{"metadata": {"annotations":{"ingressclass.kubernetes.io/is-default-class": "true"}}}'
    ```

    :::note

    If required, you can specify a non-default IngressClass during the installation of Epinio with the helm argument `--set ingress.ingressClassName=<className>`.

    :::

1. Deploy a dynamic storage provisioner.
    RKE2 clusters have no storage provisioner installed by default.
    To support Epinio a storage provisioner is needed.
    You can use any storage provisioner which provides, `ReadWriteMany` (RWX) Access Mode and a **default StorageClass** resource for dynamic storage provisioning.

    :::note

    To verify that your cluster provides a default StorageClass run the command  `kubectl get storageclass`. The default StorageClass is marked with the string `(default)` next to its name in the output list.

    :::

    As an example, you can deploy and configure a `local-path` dynamic storage provisioner by running:

    ```bash
    kubectl apply -f https://raw.githubusercontent.com/rancher/local-path-provisioner/master/deploy/local-path-storage.yaml
    kubectl patch storageclass local-path -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'
    ```

## Installation

For evaluation environments we recommend that you setup Epinio Ingress resources with a wildcard DNS service such as `omg.howdoi.website`, `sslip.io`, or `nip.io` that points to the `INTERNAL-IP` address of your kubernetes node.

For production environments you should configure an external load-balancer solution.
It should listen on a public IP with an associated public FQDN domain.
The load-balancer's role is to redirect HTTP(S) traffic, from the load-balancer endpoint to the internal Ingress resources of the kubernetes cluster.

There are two ways of installing DNS for Epinio:

1. [Wildcard DNS Service](../../installation/wildcardDNS_setup.md)

    For test environments.
    This should work on any kubernetes distribution.
    Epinio will try to create a magic wildcard DNS domain, for example, **10.0.0.1.omg.howdoi.website**.

1. [DNS setup](../../installation/dns_setup.md)

    For test and production environments.
    You'll define a system domain, for example, **test.example.com**.

Then continue with the [Epinio installation process](../../installation/install_epinio.md).
