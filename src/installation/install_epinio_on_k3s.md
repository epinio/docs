# Creating a K3s Kubernetes Cluster

Note: this documentation was tested with Epinio v0.1.3 and k3s v1.21.5+k3s2 on openSUSE Leap 15.3.

## Get K3s Kubernetes Cluster

### Install K3s

Follow the [instructions](https://k3s.io/) to install k3d on your system.

### Install Epinio on the Cluster

Export the k3s cluster configration first:

```bash
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml
```

Follow [Installation using a MagicDNS Service](./install_epinio_magicDNS.md) to install Epinio in your test environment.

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
