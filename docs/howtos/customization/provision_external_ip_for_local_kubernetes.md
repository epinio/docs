---
sidebar_label: "Provisioning Of An External IP Address For Local Kubernetes"
sidebar_position: 5
title: ""
---

## Provision of External IP for LoadBalancer service type in Kubernetes

Some platforms for deploying local Kubernetes clusters do not have the ability
to provide external IP addresses when creating Kubernetes services with service
type `LoadBalancer`. The following steps will enable this ability for various
platforms. Follow these steps before installing Epinio.

### K3s/K3d

* Provision of LoadBalancer IP is enabled by default.

### Kind 

* Install JQ from https://stedolan.github.io/jq/download/

* Install and configure MetalLB 
```
kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/v0.9.5/manifests/namespace.yaml
kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/v0.9.5/manifests/metallb.yaml
kubectl create secret generic -n metallb-system memberlist --from-literal=secretkey="$(openssl rand -base64 128)"

SUBNET_IP=`docker network inspect kind | jq -r '.[0].IPAM.Config[0].Gateway'`
## Use the last few IP addresses
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

* Install and configure MetalLB
```
INTERFACE=`ip route | grep default | awk '{print $5}'`
IP=`ifconfig $INTERFACE | sed -n '2 p' | awk '{print $2}'`
microk8s enable metallb:${IP}/16
```

### Digital Ocean

When installing Epinio on Rancher-provisioned RKE2 or RKE1
clusters on Digital Ocean, you might see this error message:

```
error installing Epinio:
timed out waiting for LoadBalancer IP on traefik service
Ensure your kubernetes platform has the ability to provision a LoadBalancer IP address.
```

In this case it is necessary to configure RKE/RKE2 with an external cloud
provider such as the [Digital Ocean CC Manager](https://github.com/digitalocean/digitalocean-cloud-controller-manager).
