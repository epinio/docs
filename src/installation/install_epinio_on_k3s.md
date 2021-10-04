# Creating a K3s Kubernetes Cluster

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

#### Traefik

In case of trouble with Epinio's Traefik component or Ingress controllers, the [Traefik](../explanations/advanced.md#traefik) section in the
[Advanced Topics](../explanations/advanced.md) document shall be your friend.
