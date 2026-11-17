---
sidebar_label: "An External IP address for local Kubernetes"
sidebar_position: 5
title: "Provisioning an external IP address for local Kubernetes"
description: Provisioning an external IP address for local Kubernetes
keywords: [epinio, kubernetes, external IP addresses]
doc-type: [how-to]
doc-topic: [epinio, how-to, customization, external-ip-addresses]
doc-persona: [epinio-operator]
---

Some platforms for deploying local Kubernetes clusters don't have the ability to provide external IP addresses when creating Kubernetes services with the service type `LoadBalancer`.
The following steps enable this ability for a few platforms.
You should follow these steps before installing Epinio.

### K3s/K3d

The provision of LoadBalancer IP is enabled by default.

### Kind

- [Install](https://stedolan.github.io/jq/download/) `jq`

- Install and configure MetalLB

```console
  kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/v0.9.5/manifests/namespace.yaml
  kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/v0.9.5/manifests/metallb.yaml
  kubectl create secret generic -n metallb-system memberlist --from-literal=secretkey="$(openssl rand -base64 128)"

  SUBNET_IP=`docker network inspect kind | jq -r '.[0].IPAM.Config[0].Gateway'`
  # Use the last few IP addresses
  IP_ARRAY=(${SUBNET_IP//./ })
  SUBNET_IP="${IP_ARRAY[0]}.${IP_ARRAY[1]}.255.255"

  cat <<EOF | kubectl apply -f -
  apiVersion: v1
  kind: ConfigMap
  metadata:
    namespace: metallb-system
    name: config
  data:
    config: |
      address-pools:
      - name: default
        protocol: layer2
        addresses:
        - ${SUBNET_IP}/28
  EOF
```

### MicroK8s

Install and configure MetalLB:

```console
INTERFACE=`ip route | grep default | awk '{print $5}'`
IP=`ifconfig $INTERFACE | sed -n '2 p' | awk '{print $2}'`
microk8s enable metallb:${IP}/16
```

### Digital Ocean

When installing Epinio on Rancher-provisioned RKE2 or RKE1 clusters on Digital Ocean, you might see this error message:

```console
error installing Epinio:
timed out waiting for LoadBalancer IP on traefik service
Ensure your kubernetes platform has the ability to provision a LoadBalancer IP address.
```

If this happens you need to configure RKE/RKE2 with an external cloud provider such as the [Digital Ocean CC Manager](https://github.com/digitalocean/digitalocean-cloud-controller-manager).
