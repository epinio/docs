# Install the Epinio CLI

If not done already, refer to [Install the Epinio CLI](./install_epinio_cli.md).

# Install Epinio using a Magic DNS Service

In order to use a magic domain that will resolve to a local/private IP you can use the [auto installation method (aka. Method 1)](./install_epinio_auto.md) and set the **EPINIO_SYSTEM_DOMAIN** variable to `<IP>.omg.howdoi.website`.

## Troubleshooting

### Traefik

In case of trouble with Epinio's Traefik component or Ingress controllers, the [Traefik](../explanations/advanced.md#traefik) section in the
[Advanced Topics](../explanations/advanced.md) document shall be your friend.

### DNS Rebind Protection

Some routers filter queries where the answer consists of IP addresses from the private range, like **10.0.0.1**.

This stops a malicous website from probing the local network for hosts.

Amongst those routers is the AVM FRITZBox and everything that uses [dnsmasq](https://thekelleys.org.uk/dnsmasq/docs/dnsmasq-man.html) with `stop-dns-rebind`, like [pfSense](https://docs.netgate.com/pfsense/en/latest/services/dns/rebinding.html) or NetworkManager.

If you still want to use the default magic DNS, you'll have to whitelist `omg.howdoi.website` in your local DNS server.
