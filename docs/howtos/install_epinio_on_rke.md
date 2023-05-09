---
sidebar_label: "Installing Epinio On RKE2"
sidebar_position: 19
title: ""
---

# Creating an RKE2 Kubernetes Cluster
This guide will help you to deploy a suitable RKE2 Kubernetes cluster for Epinio. More details can be found in RKE2 [quickstart](https://docs.rke2.io/install/quickstart/) guide.

## Install RKE2 Kubernetes cluster {#install-rke2}
The following steps are performed using the `root` account on a dedicated machine for the RKE2 server node.

#### 1. Run the installer, start and enable the rke2-server systemd service
```bash
curl -sfL https://get.rke2.io | sh -
systemctl enable --now rke2-server.service
```
#### 2. Configure environment variables for operating the RKE2 cluster
Execute the following commands in the RKE2 node shell and/or store them in the `/root/.bashrc` file (or its equivalent) for persistence.

```bash
export PATH=$PATH:/var/lib/rancher/rke2/bin:/opt/rke2/bin
export KUBECONFIG=/etc/rancher/rke2/rke2.yaml
```

Make sure that you are able to communicate with your new RKE2 cluster by running `kubectl get pods --all-namespaces`.

## RKE2 cluster prerequisities
Perform the following steps on your RKE2 node before installing Epinio:

#### 1. Install helm CLI
```bash
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```

#### 2. Configure rke2-ingress-nginx-controller
While the `rke2-ingress-nginx-controller` is on RKE2 clusters preinstalled by default, there is a need to set the IngressClass named `nginx` up as the `default` class. This is done by running the command:
```bash
kubectl patch ingressClass nginx -p '{"metadata": {"annotations":{"ingressclass.kubernetes.io/is-default-class": "true"}}}'
```

> Note: You can specify a non-default IngressClass during the installation of Epinio with helm argument `--set ingress.ingressClassName=<className>`.

#### 3. Deploy a dynamic storage provisioner
RKE2 clusters have no storage provisioner installed by default. To support Epinio a storage provisioner is needed. You can use any storage provisioner which provides, preferably, `ReadWriteMany` (RWX) Access Mode and a **default StorageClass** resource for dynamic storage provisioning.

:::info
To verify that your cluster provides a default StorageClass run the command  `kubectl get storageclass`. The default StorageClass is marked with the string `(default)` next to its name in the output list.
:::

As an example, you can deploy and configure `local-path` dynamic storage provisioner by running:
```bash
kubectl apply -f https://raw.githubusercontent.com/rancher/local-path-provisioner/master/deploy/local-path-storage.yaml
kubectl patch storageclass local-path -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'
```

## Installation
For evaluation purposes of installing Epinio it's recommended to setup Epinio Ingress resources by using a wildcard DNS service as `omg.howdoi.website`, `sslip.io` or `nip.io` that points to the `INTERNAL-IP` address of your kubernetes node.

For advanced and production environments you should configure an external load-balancer solution that listens on a public IP with an associated public FQDN domain. The role of the load-balancer is to perform a redirection of HTTP(S) traffic from the load-balancer endpoint to internal Ingress resource(s) of kubernetes cluster.

Beside advanced installation options, there are two ways of installing Epinio:

1. [Installation using a Wildcard DNS Service](../installation/wildcardDNS_setup.md)

- For test environments. This should work on nearly any kubernetes distribution. Epinio will try to automatically create a magic wildcard DNS domain, e.g. **10.0.0.1.omg.howdoi.website**.

2. [DNS setup](../installation/dns_setup.md)

- For test and production environments. You will define a system domain, e.g. **test.example.com**.

Then, continue with the [Epinio installation process](../installation/install_epinio.md).
