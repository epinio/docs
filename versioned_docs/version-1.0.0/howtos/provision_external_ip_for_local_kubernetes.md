---
sidebar_label: "Provision external IP address for local Kubernetes"
sidebar_position: 3
title: ""
---

## Provision of External IP for LoadBalancer service type in Kubernetes

Some local kubernetes platforms do not have the ability to provide external IP address when you create a kubernetes service with `LoadBalancer` service type. The following steps will enable this ability for different local kubernetes platforms. Follow these steps before installing epinio.

### K3s/K3d

* Provision of LoadBalancer IP is enabled by default in K3s/K3d.

### Minikube

See [Install Epinio on Minikube](install_epinio_on_minikube.md) on how to
configure minikube.

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

In this case you need to configure RKE/RKE2 with an external cloud
provider as [this one](https://github.com/digitalocean/digitalocean-cloud-controller-manager).
