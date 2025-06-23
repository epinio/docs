---
sidebar_label: "Wildcard DNS setup"
sidebar_position: 4
title: "Wildcard DNS setup"
description: The description
keywords: [epinio, wildcard dns, dns]
---

You need a working [DNS](dns_setup.md) system domain for Epinio
Setting this up can be complicated.
You can use a wildcard domain for development and test environments.
It's much quicker to get up and running.

By "wildcard" we mean a domain that will always resolve to the IP address that is part of the domain itself.
So, it is a record in a DNS zone that will match requests for non-existent sub-domains.
There are a variety of free services doing this:

- sslip.io
- nip.io

As examples, all the following domains resolve to `127.0.0.1`:

- `127.0.0.1.sslip.io`
- `subdomain.127.0.0.1.sslip.io`
- `subsub.subdomain.127.0.0.1.sslip.io`

You can use domains like these as a wildcard system domain for Epinio.

Follow the instructions on the "DNS setup" [page](dns_setup.md#ingress-controller-ip-address) to find the IP address of your ingress controller.
You then use that IP address to construct a domain with one of the above services.
This is then the `global.domain` value when installing and configuring Epinio.

This will work for as long as the IP address still points to the ingress controller service.

## Troubleshooting

### DNS Rebind Protection

Some routers filter queries for private address ranges.
If the query resolves to a private IP address it is filtered.
So, for example, **10.0.0.1** and **192.168.3.5** would be filtered and not returned by the query.
This stops a malicious website from probing the local network for hosts.

This includes anything using [dnsmasq](https://thekelleys.org.uk/dnsmasq/docs/dnsmasq-man.html) with `stop-dns-rebind`. Examples are [pfSense](https://docs.netgate.com/pfsense/en/latest/services/dns/rebinding.html) or NetworkManager.

If you still want to use the default wildcard DNS, you'll have to whitelist `sslip.io`, or other providers, in your local DNS server.

### Cluster running in a VM

The IP address of the ingress controller may not be accessible by your browser. You may need to set the domain to another IP address.
This is the case for example when you run a Kubernetes cluster with docker (e.g. [k3d](https://k3d.io/) or [kind](https://github.com/kubernetes-sigs/kind)) inside a VM (for example when using docker on MacOS).
The IP address assigned to the ingress controller is the IP address of the docker container. This IP address is not accessible from your host.
You then need to bind the container's ports `80` and `443` to the VM's ports `80` and `443`. Then use the VM's IP address when constructing the wildcard domain.
