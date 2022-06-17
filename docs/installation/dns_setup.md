---
sidebar_label: "DNS setup"
sidebar_position: 3
title: ""
---

#  DNS setup

During [Epinio installation](install_epinio.md), a "system" domain must be specified specified (`global.domain` helm value).
This is used to access Epinio API server and to create default routes for the deployed applications. This page describes
how to prepare the domain.

This domain must be a wildcard domain, meaning any subdomain should resolve to the
same IP address as the domain itself. That IP address, should target your cluster's Ingress controller (e.g. Traefik)

***
Epinio will install successfully even if your DNS setup is not complete. There is an exception to this,
when letsencrypt issuer is used. Cert-Manager will fail to create certificates until the domain is accessible, due to
the challenges that must be solved (read more about issuers [here](../howtos/certificate_issuers.md)). Even in that
case though, after you finish your DNS setup, the challenges will be solved and Epinio should become functional but
it may take a while before things balance out.
***

To keep things simple, it is preferable that you finish your DNS setup before you install Epinio. To do so, you need
to point your desired domain to the IP address of your Ingress controller. There are two steps in this process:

1. Find the IP address of the ingress controller
2. Setup your DNS

> **NOTE:** For development or demo environments, [an easy magic DNS setup can be used](magicDNS_setup.md) instead.

## Ingress controller IP address

Most Kubernetes clusters are running a "load balancer" service which is responsible of assigning
IP addresses to load balanced services created on the cluster. Ingress controllers
are such services (e.g. Traefik) and they should have an externally accessible IP address.
This is needed for any Ingress resource to work. You can find the load balancer IP
address of any service using `kubectl`. E.g.

```
kubectl get svc -n kube-system traefik -o jsonpath={@.status.loadBalancer.ingress}
```

Depending on the load balancer, the result of this command may have different fields populated, most usually `ip`.
Keep this information available for the next step where you will configure your DNS.

## Configure your DNS

Given you own the domain **"example.com"**, you would configure a subdomain e.g. **"test.example.com"** for Epinio.
Now you will have to configure your DNS in a way, that any request towards "test.example.com" will resolve to the address found in the previous step.

- test.example.com => "INGRESS-IP"
- \*.test.example.com => "INGRESS-IP"

***

###### The "wildcard" entry is what makes the automatic routes for applications to work in Epinio. Don't skip it.

***

Find [DNS Configuration Examples](#dns-configuration-examples) below.

## DNS Configuration Examples

### AWS EKS and Route53

As an example we will use the [AWS Service Route53](https://aws.amazon.com/route53/) to create a wildcard domain within one of your existing "Hosted zones", e.g. **example.com**.

Given Epinio ingress installation provided you with the following hostname:

```bash
Traefik Ingress info: [{"hostname":"abcdefg12345671234567abcdefg1234-1234567890.eu-west-1.elb.amazonaws.com"}]
```

Now you will have to add two CNAME records, for the subdomain, e.g. "test" to have "test.example.com", resp. "\*.test.example.com".
Replace "abcdefg12345671234567abcdefg1234-1234567890.eu-west-1.elb.amazonaws.com" with the your EKS FQDN, and "test.example.com" with your custom domain.

##### test.example.com

```bash
Record name: test
Record type: CNAME - Routes traffic to another domain name and some AWS resources
Value: abcdefg12345671234567abcdefg1234-1234567890.eu-west-1.elb.amazonaws.com
```

##### \*.test.example.com

```bash
Record name: *.test
Record type: CNAME - Routes traffic to another domain name and some AWS resources
Value: abcdefg12345671234567abcdefg1234-1234567890.eu-west-1.elb.amazonaws.com
```

Finally, running 

`> host test.example.com`, or even

`> host epinio.test.example.com`

should resolve to e.g. "abcdefg12345671234567abcdefg1234-1234567890.eu-west-1.elb.amazonaws.com".

### Azure AKS and "example-domain"

As an example we will use the Azure resource group "example-domain", with the zone "example.com".

Given Epinio ingress installation provided you with the following hostname:

```bash
Traefik Ingress info: [{"ip":"10.0.0.1"}]
```

Now you will have to add two A records, for the subdomain, e.g. "test" to have "test.example.com", resp. "\*.test.example.com" to the DNS zone "example.com".
Replace "10.0.0.1" with the IP from "Traefik Ingress info", and "test.example.com" with your custom domain.

##### test.example.com

```bash
Record name: test.example.com
Record type: A
IP address: 10.0.0.1
```

##### \*.test.example.com

```bash
Record name: *.test.example.com
Record type: A
IP address: 10.0.0.1
```

Finally, running

`> host test.example.com`, or even

`> host epinio.test.example.com`

should resolve to e.g. "10.0.0.1".

### Bind DNS

Given Epinio ingress installation provided you with the following hostname:

```bash
Traefik Ingress info: [{"ip":"10.0.0.1"}]
```

Now you will have to add two A records, for the subdomain, e.g. "test" to have "test.example.com", resp. "\*.test.example.com" to e.g. "/var/lib/named/master/forward/example.com".
Replace "10.0.0.1" with the IP from "Traefik Ingress info", and "test.example.com" with your custom domain.

```bash
$ORIGIN example.com.
test			A	10.0.0.1
$ORIGIN test.example.com.
*			A	10.0.0.1
```

Restart bind and verify that e.g. `> host test.example.com` or `> host epinio.test.example.com` will resolve to "10.0.0.1".
