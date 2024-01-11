---
sidebar_label: Certificate issuers
sidebar_position: 2
title: Set up and use certificate issuers
description: How to set up and use certificate issuers
keywords: [epinio, kubernetes, certificate issuers]
doc-type: [how-to]
doc-topic: [epinio, how-to, certificate-issuer]
doc-persona: [epinio-developer, epinio-operator]
---

<head>
  <link rel="canonical" href="https://docs.epinio.io/howtos/other/certificate_issuers"/>
</head>

Epinio comes with many
[cert-manager ClusterIssuers](https://cert-manager.io/docs/configuration/)
for creating certificates.
By default, it installs the issuers `epinio-ca` and `selfsigned-issuer`.
If requested it also installs either `letsencrypt-staging` or `letsencrypt-production`,
to create certificates issued from [Let's Encrypt](https://letsencrypt.org/).

- epinio-ca (default)
- selfsigned-issuer (internal)
- letsencrypt-[staging|production] (optional)

You use the specified issuer for both Epinio API endpoint and workloads
(that is, the pushed applications).

## Choosing a different issuer

When [installing Epinio with helm](../../installation/install_epinio.md#install-epinio),
you can choose between those issuers by using the `global.tlsIssuer` helm variable.

It's also possible to create a cert-manager cluster issuer in the cluster,
before installing Epinio,
and referencing it by name when installing,
using `global.customTlsIssuer`.

When using either `letsencrypt-staging` or `letsencrypt-production`
then use the `global.tlsIssuerEmail` helm variable
to set an email address for the reception of the certificate notification e-mails sent by that issuer.

### Cluster issuer for ACME DNS challenge

For an example, to use Let's Encrypt with a DNS challenge,
which supports wildcards and private IP addresses,
create this cluster issuer after installing cert-manager:

```yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: dns-staging
spec:
  acme:
    server: https://acme-staging-v02.api.letsencrypt.org/directory
    privateKeySecretRef:
      name: example-issuer-account-key
    solvers:
    - dns01:
        cloudflare:
          email: user@example.com
          apiKeySecretRef:
            name: cloudflare-apikey-secret
            key: apikey
      selector:
        dnsNames:
        - 'example.com'
        - '*.example.com'
```

This uses the Let's Encrypt staging endpoint for testing.
There's more information in the
[cert-manager ACME](https://cert-manager.io/docs/configuration/acme/dns01/)
documentation.

You then install Epinio with the `global.tlsIssuer` pointing to the new cluster issuer:

```console
helm install epinio epinio/epinio --set global.tlsIssuer=dns-staging ...(other values here)
```

### Cluster issuer for an existing private CA

According to the instructions from
[cert-manager](https://cert-manager.io/docs/configuration/ca/),
follow these steps:

#### Create secret with CA certificate and key

If you don't already have a private CA,
use a tool like `openssl` or `easy-rsa` to create it.

The following one-liner creates a CA:

```console
openssl req -x509 -newkey rsa:4096 -sha256 -days 3650 -nodes \
  -keyout example.key -out example.crt -subj "/CN=*.yourdomainhere.org"
```

Make sure the `CN` field matches the domain you are planning to use with Epinio.

Create a Kubernetes secret from the CA, in the cert-manager namespace.

```console
kubectl create secret -n cert-manager tls private-ca-secret \
  --cert=./example.crt --key=./example.key
```

The cert-manager documentation has more details about this.

#### Create ClusterIssuer

Then create the cluster issuer:

```yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: private-ca
spec:
  ca:
    secretName: private-ca-secret
```

#### Install Epinio

Use the `global.tlsIssuer` variable to choose your cluster issuer:

```console
helm install --set global.tlsIssuer=private-ca epinio epinio/epinio --global.domain=epinio.yourdomainhere.org
```

## Background on Cert manager and issuers

Cert manager watches for a *certificate* resource and uses the referenced *cluster issuer* to generate a certificate.
The certificate is stored in a *secret*,
in the namespace the certificate resource was created in.
An *Ingress* resource can then use that secret to set up TLS.

Example:

1. The Epinio installation creates a certificate resource in the Epinio namespace

  ```yaml
  apiVersion: cert-manager.io/v1alpha2
  kind: Certificate
  metadata:
    name: epinio
    namespace: epinio
  spec:
    commonName: epinio.172.27.0.2.omg.howdoi.website
    dnsNames:
    - epinio.172.27.0.2.omg.howdoi.website
    issuerRef:
      kind: ClusterIssuer
      name: epinio-ca
    secretName: epinio-tls
  ```

1. cert-manager creates the 'epinio-tls' secret, using the referenced cluster issuer 'epinio-ca'

  ```yaml
  apiVersion: v1
  kind: Secret
  type: kubernetes.io/tls
  metadata:
    annotations:
      cert-manager.io/alt-names: epinio.172.27.0.2.omg.howdoi.website
      cert-manager.io/certificate-name: epinio
      cert-manager.io/common-name: epinio.172.27.0.2.omg.howdoi.website
      cert-manager.io/ip-sans: ""
      cert-manager.io/issuer-group: ""
      cert-manager.io/issuer-kind: ClusterIssuer
      cert-manager.io/issuer-name: epinio-ca
      cert-manager.io/uri-sans: ""
    name: epinio-tls
    namespace: epinio
  data:
    ca.crt: ...
    tls.crt: ...
    tls.key: ...
  ```

1. Epinio creates an ingress resource

  ```yaml
  apiVersion: networking.k8s.io/v1
  kind: Ingress
  metadata:
    annotations:
      kubernetes.io/ingress.class: traefik
      traefik.ingress.kubernetes.io/router.entrypoints: websecure
      traefik.ingress.kubernetes.io/router.middlewares: epinio-epinio-api-auth@kubernetescrd
      traefik.ingress.kubernetes.io/router.tls: "true"
    labels:
      app.kubernetes.io/name: epinio
    name: epinio
    namespace: epinio
  spec:
    rules:
    - host: epinio.172.27.0.2.omg.howdoi.website
      http:
        paths:
        - backend:
            service:
              name: epinio-server
              port:
                number: 80
          path: /
          pathType: ImplementationSpecific
    tls:
    - hosts:
      - epinio.172.27.0.2.omg.howdoi.website
      secretName: epinio-tls
  ```

## Epinio push

The same is true for applications,
`epinio push` creates a `certificate` in the app's workspace and
cert-manager creates a secret for the app's ingress.
