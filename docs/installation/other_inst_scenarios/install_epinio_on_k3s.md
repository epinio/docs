---
sidebar_label: "Installing Epinio on a local K3s"
sidebar_position: 20
title: "Installing Epinio on a local K3s"
description: Information about installing L3s on a local K3s cluster.
keywords: [kubernetes, epinio, k3s]
---

This How-to was written with these versions:
* [epinio helm chart 0.7.1](https://github.com/epinio/helm-charts/releases/tag/epinio-0.7.1)
* [k3s](https://k3s.io/) version v1.23.4+k3s1 and v1.22.7+k3s1
* openSUSE Leap 15.3 and Tumbleweed


## Install a K3s cluster

Follow the [K3s instructions](https://k3s.io/) to install K3s.

## Install Epinio on the K3s cluster

Export the K3s cluster configuration file in the `KUBECONFIG` environment variable:

```bash
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml
```

Follow the [wildcard DNS setup](../../installation/wildcardDNS_setup) to install DNS for Epinio in your environment.

You find the `<IP>` address with the next command. Example output is shown:

```console
$ kubectl get svc -n kube-system traefik -o jsonpath="{.status.loadBalancer.ingress[0]}" | jq .
{
  "ip": "192.168.5.15"
}
```

Then, continue with the [Epinio installation process](../../installation/install_epinio.md).

## Troubleshooting

### DNS Issues

If you experience issues with DNS resolution, if, for example, you have something like this in your logs:
```
dial tcp: lookup epinio-registry.192.168.1.10.omg.howdoi.website on 10.43.0.10:53: no such host
```

You can try to install K3s with this known-to-work DNS server:
```
curl -sfL https://get.k3s.io | K3S_RESOLV_CONF=/etc/my-good-resolv.conf sh -
```

With `/etc/my-good-resolv.conf` containing:
```
nameserver 1.1.1.1
```

This issue may happen with multiple DNS servers and some can't resolve some domain names.

### Traefik

In case of trouble with Epinio's Traefik component refer to the [Traefik](../../explanations/advanced.md#traefik) section in the [Advanced Topics](../../explanations/advanced.md) document.
