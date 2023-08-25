---
sidebar_label: "DNS setup"
sidebar_position: 3
title: "DNS setup"
description: How to setup DNS for Epinio and associated issues.
keywords: [epinio, kubernetes, k8s, DNS]
---

During an [Epinio installation](install_epinio.md),
a "system" domain must be specified in the `global.domain` helm field.
This field is used to access an Epinio API server and to create default routes for the deployed applications.

The `global.domain` domain must be a wildcard domain,
so any subdomain should resolve to the same IP address as the domain itself.
That domain IP address, should target your cluster's Ingress controller (for example, Traefik)

:::note

Epinio will install successfully even if your DNS setup is not complete.
There is an exception when the Lets Encrypt issuer is used.
Then `cert-manager` will fail to create certificates until the domain is accessible.
You can read more about certificate issuers [here](../howtos/other/certificate_issuers.md).
Epinio will work after the DNS setup is correct and the domain becomes available.

:::

For simplicity finish your DNS setup before installing Epinio.
You need to point your desired domain to the IP address of your Ingress controller.
The two steps in the process are described in the following sections:

1. [Find](#find-ip-for-ic) the IP address of the ingress controller
1. [Configure](#config-dns) your DNS

:::note

For development or demo environments, [an easy wildcard DNS setup can be used](wildcardDNS_setup.md).

:::

## Find the IP address of the ingress controller {#find-ip-for-ic}

Most Kubernetes clusters run a "load balancer" service.
It is responsible for assigning IP addresses to services, that are load balanced, created on the cluster.
Ingress controllers are such services (for example, Traefik) so should have an externally accessible IP address.
This is needed for any Ingress resource to work.

You can find the load balancer IP address of any service using `kubectl`. For example:

```
kubectl get svc -n kube-system traefik -o jsonpath={@.status.loadBalancer.ingress}
```
<!-- TODO: I would like a sample output from the previous command showing the IP address field.-->

Depending on the load balancer, the result of this command may have different fields populated.
We are interested in the `ip` field.
You use the IP field in the next step to configure your DNS.

## Configure your DNS {#config-dns}

Assuming you own the domain `example.com`, you would configure a subdomain, for example, `test.example.com` for Epinio.
You can now configure your DNS so that any request for `test.example.com`
resolves to the address you obtained in the previous step.

<!--TODO: We have described what needs to be configured in DNS, but not actually shown how to do it.
Do we need to? Or am I missing the point.-->

- `test.example.com => "INGRESS-IP"`
- `*.test.example.com => "INGRESS-IP"`

:::tip
The setup of a wildcard entry is important and allows automatic routing for applications to work in Epinio.
:::

We have some DNS configuration examples in the next section

## DNS configuration examples

### Amazon Route53 & AWS EKS

We will use the [Amazon Route53](https://aws.amazon.com/route53/) to create a wildcard domain within an existing "Hosted zone", like `example.com`.

Suppose an Epinio ingress installation has provided you with the following hostname:
<!--TODO: Is the hostname below an actual format of an Amazon AWS hostname.
If so that's fine, if not I think I will shorten it for a little more clarity.-->

```bash
Traefik Ingress info: [{"hostname":"abcdefg12345671234567abcdefg1234-1234567890.eu-west-1.elb.amazonaws.com"}]
```

You need to add two `CNAME` records, for the subdomain and the wildcard. So, "test" to have `test.example.com`, and `*.test.example.com`.

Replace `abcdefg12345671234567abcdefg1234-1234567890.eu-west-1.elb.amazonaws.com` with your EKS FQDN, and `test.example.com` with your custom domain.

##### `test.example.com`

```bash
Record name: test
Record type: CNAME - Routes traffic to another domain name and some AWS resources
Value: abcdefg12345671234567abcdefg1234-1234567890.eu-west-1.elb.amazonaws.com
```

##### `*.test.example.com`

```bash
Record name: *.test
Record type: CNAME - Routes traffic to another domain name and some AWS resources
Value: abcdefg12345671234567abcdefg1234-1234567890.eu-west-1.elb.amazonaws.com
```

Now, running the commands:


```bash
host test.example.com
```

or

```bash
> host epinio.test.example.com
```

should resolve to something like:

```bash
abcdefg12345671234567abcdefg1234-1234567890.eu-west-1.elb.amazonaws.com
```

### Azure AKS and "example-domain"

For this example we use the Azure resource group `example-domain`, with the zone `example.com`.

Suppose the Epinio ingress installation has provided you with the following hostname:

```bash
Traefik Ingress info: [{"ip":"10.0.0.1"}]
```

You need to add two A records, for the subdomain and widlcard.
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

Suppose an Epinio ingress installation has provided you with the following hostname:

```bash
Traefik Ingress info: [{"ip":"10.0.0.1"}]
```

You need to add two A records, for the subdomain and widlcard, so "test" to have `test.example.com`, and `*.test.example.com` to `/var/lib/named/master/forward/example.com`.
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
