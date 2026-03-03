---
sidebar_label: "DNS setup"
sidebar_position: 3
title: "DNS setup"
description: How to setup DNS for Epinio and associated issues.
keywords: [epinio, kubernetes, k8s, DNS]
---

During an [Epinio installation](install_epinio.md),
you need to specify a "system" domain in the `global.domain` helm field.
You use this field for access to:

- an Epinio API server
- an Epinio WebUI
- a dex (OpenID Connect Provider)
- create default routes for the deployed applications.

The `global.domain` field must be a wildcard domain.
So, any subdomain should resolve to the same IP address as the domain itself.
That domain IP address, should target your cluster's Ingress controller (for example, Traefik)

:::note

Epinio will install successfully even if your DNS setup is not complete.
An exception is when the Lets Encrypt certificate issuer is used.
In this case, `cert-manager` will fail to create certificates. When the domain becomes accessible certificates can be created.
You can read more about certificate issuers [here](../howtos/other/certificate_issuers.md).
Epinio will work after the DNS setup is correct and the domain becomes available.

:::

For simplicity finish your DNS setup before installing Epinio.
You need to point your desired domain to the IP address of your Ingress controller.
The two steps in the process are described in these sections:

1. [Find](#find-ip-for-ic) the IP address of the ingress controller
1. [Configure](#config-dns) your DNS

:::note

For development or demo environments, an easy [wildcard](wildcardDNS_setup.md) DNS setup can be used.

:::

## Find the IP address of the ingress controller {#find-ip-for-ic}

Most Kubernetes clusters run a "load balancer" service.
It assigns IP addresses to load balanced services created on the cluster.
Ingress controllers are such services (for example, Traefik). They work only if they have an external accessible IP address.

You can find the load balancer IP address of any service using `kubectl`. For example:

```shell
kubectl get svc -n kube-system traefik -o jsonpath={@.status.loadBalancer.ingress}
```

will return output containing:

```shell
[map[ip:172.18.0.4]]
```

You use the IP field in the next step to configure your DNS.

## Configure your DNS {#config-dns}

If you own the domain `example.com`, you configure a subdomain, for example, `test.example.com` for Epinio.
You can now configure your DNS so that any request for `test.example.com` resolves to the address you got in the previous section.

- `test.example.com => "INGRESS-IP"`
- `*.test.example.com => "INGRESS-IP"`

:::tip

The setup of a wildcard entry is important. It allows automatic routing for applications to work in Epinio.

:::

We have some DNS configuration examples in the next section

## DNS configuration examples

### Amazon Route53 & AWS EKS

We will use the [Amazon Route53](https://aws.amazon.com/route53/) to create a wildcard domain within an existing "Hosted zone", like `example.com`.

If an Epinio ingress installation has provided you with the following hostname:

```bash
Traefik Ingress info: [{"hostname":"abcdefg12345671234567abcdefg1234-1234567890.eu-west-1.elb.amazonaws.com"}]
```

That hostname is in a AWS format.
Below, for brevity, we will use the hostname `abcd.aws.com`.

You need to add two `CNAME` records, for the subdomain and the wildcard. So, "test" for `test.example.com`, and `*.test.example.com` for the wildcard.

Use `abcd.aws.com` with your EKS FQDN, and `test.example.com` with your custom domain.

##### `test.example.com`

```bash
Record name: test
Record type: CNAME - Routes traffic to another domain name and some AWS resources
Value: abcd.aws.com
```

##### `*.test.example.com`

```bash
Record name: *.test
Record type: CNAME - Routes traffic to another domain name and some AWS resources
Value: abcd.aws.com
```

Now, the commands:


```bash
host test.example.com
```

or

```bash
> host epinio.test.example.com
```

should resolve to something like:

```bash
abcd.aws.com
```

### Azure AKS and "example-domain"

For this example we use the Azure resource group `example-domain`, with the zone `example.com`.

If the Epinio Ingress installation provides you with the following hostname:

```bash
Traefik Ingress info: [{"ip":"10.0.0.1"}]
```

You need to add two A records, for the subdomain and wildcard.
So, "test" to have `test.example.com` and `*.test.example.com` added to the DNS zone `example.com`.
Replace "10.0.0.1" with the IP from "Traefik Ingress info", and "test.example.com" with your custom domain.

##### `test.example.com`

```bash
Record name: test.example.com
Record type: A
IP address: 10.0.0.1
```

##### `*.test.example.com`

```bash
Record name: *.test.example.com
Record type: A
IP address: 10.0.0.1
```

Now, running:

```bash
host test.example.com
```

or

```bash
host epinio.test.example.com
```

should resolve to `10.0.0.1`.

### Bind DNS

If an Epinio ingress installation has provided you with the following hostname:

```bash
Traefik Ingress info: [{"ip":"10.0.0.1"}]
```

You need to add two A records, for the subdomain and wildcard, so "test" to have `test.example.com`, and `*.test.example.com` to `/var/lib/named/master/forward/example.com`.
This path will differ depending on distribution.
Replace `10.0.0.1` with the IP address from "Traefik Ingress info", and `test.example.com` with your custom domain.

```bash
$ORIGIN example.com.
test		A	10.0.0.1
$ORIGIN test.example.com.
*			A	10.0.0.1
```

Restart bind and verify that these commands resolve to `10.0.0.1`:

```bash
host test.example.com
```
or

```shell
host epinio.test.example.com
```
