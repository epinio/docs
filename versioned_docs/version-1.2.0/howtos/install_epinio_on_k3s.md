---
sidebar_label: "Install Epinio on K3s (local)"
sidebar_position: 16
title: ""
---

# Creating a K3s Kubernetes Cluster

This how-to was written using the following versions:
* [epinio helm chart 0.7.1](https://github.com/epinio/helm-charts/releases/tag/epinio-0.7.1)
* k3s version v1.23.4+k3s1 and v1.22.7+k3s1 
* openSUSE Leap 15.3 and Tumbleweed

## Get K3s Kubernetes Cluster

### Install K3s

Follow the [instructions](https://k3s.io/) to install K3s on your system.

The K3s versions used in this how-to are the ones mentioned just above, with all the options set by default.

### Install Epinio on the Cluster

Export the k3s cluster configration first:

```bash
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml
```

Follow ["magic" DNS setup](../installation/magicDNS_setup) to install Epinio in your test environment.

`<IP>` can be found by running:
```
$ kubectl get svc -n kube-system traefik -o jsonpath="{.status.loadBalancer.ingress[0]}"
```

Then, continue with the [Epinio installation process](../installation/install_epinio.md).

### Troubleshooting

#### DNS Issues

In case of trouble with DNS resolution, for example if you have something like this in your logs:
```
dial tcp: lookup epinio-registry.192.168.1.10.omg.howdoi.website on 10.43.0.10:53: no such host
```

You can try to install K3s with one known-to-work DNS server:
```
curl -sfL https://get.k3s.io | K3S_RESOLV_CONF=/etc/my-good-resolv.conf sh -
```

With `/etc/my-good-resolv.conf` containing:
```
nameserver 1.1.1.1
```

This kind of issue could happen for example when you have multiple DNS servers and some of them are not able to resolve some domain names.

#### Traefik

In case of trouble with Epinio's Traefik component or Ingress controllers, the [Traefik](../explanations/advanced.md#traefik) section in the
[Advanced Topics](../explanations/advanced.md) document shall be your friend.
