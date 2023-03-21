---
sidebar_label: "Magic DNS setup"
sidebar_position: 4
title: ""
---

# "Magic" DNS setup

A working system domain is needed for Epinio to work, as explained in the ["DNS setup" page](dns_setup.md).
This is a step that takes some time and needs you to own a domain which you can use. If you are just trying out
Epinio, you can use a "magic" domain to get running faster.

By "magic" we mean a domain that will always resolve to the IP address that is part of the domain itself. There are various free
services online that do that:

- omg.howdoi.website
- sslip.io
- nip.io

The way they work is better shown with some examples. All the following domains
resolve to `127.0.0.1`:

- `127.0.0.1.omg.howdoi.website`
- `subdomain.127.0.0.1.omg.howdoi.website`
- `subsub.subdomain.127.0.0.1.omg.howdoi.website`

This allows us to use a domain like that as a wildcard system domain for Epinio.

Follow the instructions on the ["DNS setup" page](dns_setup.md#ingress-controller-ip-address) to find the IP address of your ingress controller.
Then use that IP address to construct a domain with one of the above services.
Pass that as `global.domain` value when installing Epinio.

This should work for as long as the IP address is still valid, pointing to the ingress controller service.

## Troubleshooting

### DNS Rebind Protection

Some routers filter queries where the answer consists of IP addresses from the private range, like **10.0.0.1**.

This stops a malicious website from probing the local network for hosts.

Amongst those routers is the AVM FRITZBox and everything that uses [dnsmasq](https://thekelleys.org.uk/dnsmasq/docs/dnsmasq-man.html) with `stop-dns-rebind`, like [pfSense](https://docs.netgate.com/pfsense/en/latest/services/dns/rebinding.html) or NetworkManager.

If you still want to use the default magic DNS, you'll have to whitelist `omg.howdoi.website` in your local DNS server.

### Cluster running in a VM

Sometimes the IP address of the ingress controller may not be accessible by your browser and thus you may need to set the domain to another IP. This is the case for example when you run a Kubernetes cluster with docker (e.g. [k3d](https://k3d.io/) or [kind](https://github.com/kubernetes-sigs/kind)) inside a VM (for example when using docker on Mac). Then the IP address assigned to the ingress controller is the IP address of the docker container but that is not accessible from your host. You will need to bind the container's ports `80` and `443` to the VMs ports `80` and `443` and then use the VMs IP address when constructing the "magic" domain.
