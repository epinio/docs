#  Installation using a Custom Domain

For test and production environments. The installation will be done in three steps.

- Install ingress in cluster
- Install Epinio in cluster
- Configure your Custom Domain

## Install the Epinio CLI

If not done already, refer to [Install the Epinio CLI](./install_epinio_cli.md).

## Install Epinio on your cluster

Epinio is installed from a single Helm chart. You can follow the steps described in [Install Epinio](installation.md) page.

## Configure your Custom Domain

Currently we recommend to configure a wildcard domain for Epinio.

Given you own the domain **"example.com"**, you would configure a subdomain e.g. **"test.example.com"** for Epinio.
Now you will have to configure your DNS in a way, that any request towards "test.example.com" will resolve to the "EXTERNAL-IP" of Traefik, 
and Ingress will route the traffic accordingly.

- test.example.com => "EXTERNAL-IP"
- \*.test.example.com => "EXTERNAL-IP"

***

###### Note you can also check the "EXTERNAL-IP" by running the command `kubectl get svc -n traefik`.

***

Find [DNS Configuration Examples](#dns-configuration-examples) below.


## DNS Configuration Examples

### AWS EKS and Route53

As an example we will use the [AWS Service Route53](https://aws.amazon.com/route53/) to create a wildcard domain within one of your existing "Hosted zones", e.g. **example.com**.

Given Epinio ingress installation provided you with the following hostname:

```bash
Traefik Ingress info: [{"hostname":"abcdefg12345671234567abcdefg1234-1234567890.eu-west-1.elb.amazonaws.com"}]
```

***

###### Note you can also check the "EXTERNAL-IP"/FQDN by running the command `kubectl get svc -n traefik`.

***

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

***

###### Note you can also check the "EXTERNAL-IP"/FQDN by running the command `kubectl get svc -n traefik`.

***

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

***

###### Note you can also check the "EXTERNAL-IP"/FQDN by running the command `kubectl get svc -n traefik`.

***

Now you will have to add two A records, for the subdomain, e.g. "test" to have "test.example.com", resp. "\*.test.example.com" to e.g. "/var/lib/named/master/forward/example.com".
Replace "10.0.0.1" with the IP from "Traefik Ingress info", and "test.example.com" with your custom domain.

```bash
$ORIGIN example.com.
test			A	10.0.0.1
$ORIGIN test.example.com.
*			A	10.0.0.1
```

Restart bind and verify that e.g. `> host test.example.com` or `> host epinio.test.example.com` will resolve to "10.0.0.1".
