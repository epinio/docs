---
sidebar_label: "Installing Epinio on EKS"
sidebar_position: 23
title: "Installing Epinio on EKS"
description: How to install Epinio on EKS, the Elastic Kubernetes Service.
keywords: [kubernetes, epinio, eks, elastic kubernetes service, install]
---

To install on Elastic Kubernetes Service (EKS) this How-to uses these versions:

* [epinio helm chart - v1.6.2](https://github.com/epinio/helm-charts/releases/tag/epinio-1.6.2)
* AWS EKS - Kubernetes v1.22, v1.23***** or v1.24*****
* [Ingress Nginx - v1.6.4](https://kubernetes.github.io/ingress-nginx/)
* [Cert Manager - v1.11.0](https://github.com/cert-manager/cert-manager)

:::caution Additional requirements for EKS v1.23 and v1.24

* Since EKS v1.23 you need to configure and install an out-of-tree AWS EBS CSI driver add-on into your EKS cluster.
Please refer to this [EKS documentation](https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html) for details.
* Since EKS v1.24 you need to explicitly allow pulling Epinio's app container images from its internal HTTP registry.
This is due to the removal of `dockershim` CRI support and its replacement by `containerd`, which supports only trusted HTTPS registries by default.
This configuration is needed on all EKS nodes before deploying an Epinio app:

  ```shell
  mkdir -p /etc/containerd/certs.d/127.0.0.1:30500
  cat > /etc/containerd/certs.d/127.0.0.1:30500/hosts.toml <<EOF
  server = "http://127.0.0.1:30500"

  [host."http://127.0.0.1:30500"]
    capabilities = ["pull"]
  EOF
  ```

  Rather than doing this manually, it's easier to apply [this manifest](https://raw.githubusercontent.com/epinio/epinio/main/scripts/eks-cri-allow-http-registries.yaml). This does the node configuration for you.
  You need to edit the manifest to use the correct node count for your cluster.

:::

## Prerequisites

* [kubectl - v1.22](https://kubernetes.io/docs/tasks/tools/)
* [helm - v3.11.0](https://helm.sh/docs/helm/helm_get/)
* [aws cli - v2.9.14](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
* [eksctl - v0.115.0](https://docs.aws.amazon.com/eks/latest/userguide/eksctl.html)

## Create EKS Kubernetes cluster

*You need to run **[aws configure](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html)** before proceeding with the steps below.*

```shell
eksctl create cluster \
  --name=<cluster-name> \
  --region=us-west-1 \
  --nodes=2 \
  --node-type=t3.xlarge \
  --node-volume-size=40 \
  --managed \
  --kubeconfig=kubeconfig-eks
```

Once the EKS cluster is deployed, try to access the cluster:

```shell
export KUBECONFIG=$PWD/kubeconfig-eks
kubectl get nodes
```

## Install Cert Manager

```shell
helm repo add cert-manager https://charts.jetstack.io
helm repo update
helm install cert-manager --namespace cert-manager --create-namespace jetstack/cert-manager --set installCRDs=true --set extraArgs={--enable-certificate-owner-ref=true}
```

## Install Nginx Ingress Controller

### Add Helm repo and then install

```shell
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
```

```shell
helm upgrade --install nginx ingress-nginx/ingress-nginx --namespace nginx --create-namespace --set controller.ingressClassResource.default=true
```

### Create a CNAME DNS entry pointing to a ELB endpoint

The ELB (Elastic Load Balancer) endpoint is automatically assigned after installing ingress-nginx-controller.
To get the assigned ELB endpoint in your cluster run:

```shell
kubectl get svc -n nginx nginx-ingress-nginx-controller \
  -o jsonpath='{.status.loadBalancer.ingress[0].hostname}'
```

This returns output like:
```console
a113b33f6500241a77dcacc1b62c54eb-1234567890.us-west-1.elb.amazonaws.com
```

Use that ELB endpoint value when creating the CNAME record for your DNS zone (for example, in the AWS Route53 service):

```
Record name: *.example.com
Type: CNAME
Value: a113b33f6500241a77dcacc1b62c54eb-1234567890.us-west-1.elb.amazonaws.com
```

Test it:

```shell
nslookup test.example.com
```

You will receive the ELB endpoint value as the answer.

## Install Epinio on the cluster

```shell
helm upgrade --install epinio epinio/epinio --namespace epinio \
  --create-namespace --set global.domain=example.com \
  --set global.tlsIssuer=letsencrypt-production \
  --set global.tlsIssuerEmail=email@example.com
```
