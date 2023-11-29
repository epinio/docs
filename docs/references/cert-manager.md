---
sidebar_label: "Cert Manager"
title: ""
---

# Cert Manager

## Purpose

The [Cert Manager](https://cert-manager.io/) is a component watching for kubernetes
Certificate resources and generating Secrets holding the requested certificate data. It
can be configured with a variety of issuers for fulfilling these requests. One such
issuer is [Let's Encrypt](https://letsencrypt.org/).

Epinio uses it to generate the internal certificates used to secure the communication
between its components, as well as for the certificates used to secure the application
Ingresses.

## Installation

The Cert Manager is a recommended dependency of Epinio, and not installed by it.
In other words, Epinio works best when it has Cert Manager available to it on the cluster, when it
is installed.

## Version

Epinio development uses Cert Manager version 1.8.2.  For details of this version see the
[releases](https://cert-manager.io/docs/installation/supported-releases/).

## Advanced - Epinio without Cert manager

When Cert Manager (CM) is not installed installation of Epinio is still possible.
It however requires more work on the part of the operator.

Use `--set certManager.enabled=false` to tell Epinio's helm chart that CM is not available.

Without CM various certificate-holding Secrets normally created automatically via Certificate
resources have to be provided by the operator instead.

The associated chart variables to `--set` are
`certManager.<placeholder>.cert`,
`certManager.<placeholder>.key`, and
`certManager.<placeholder>.ca`.

The recognized values for the `placeholder` above are
`dex`,
`epinio`,
`registry`,
`s3`, and
`ui`.

Both `dex` and `ui` are optional, even when these components are enabled.
The Epinio chart then falls back to the data for `epinio`.
The information is ignored when the `dex` and/or `ui` components are disabled.

The `s3` information applies to whichever internal S3-compatible store is configured when installing
Epinio, i.e. `minio` or `s3gw`. The `s3` information is not applied when Epinio is configured to use
an external S3 store.

:::note

The certificates for `epinio` (including workloads) and `dex` are served through public domains and
are permitted to use wildcard domains (e.g. `*.1.2.3.4.nip.io`) in their `CN`/`SAN` fields.
    
The certificates for `registry` and `s3`(minio) are inter-cluster "private" domains
(`registry.<ns>.svc.cluster.local` and
`minio.<ns>.svc.cluster.local`).
The placeholder `<ns>` refers to the namespace Epinio is installed in.

:::

:::caution

When used with Minio the `s3` certificate cannot use wildcard domains in its `CN`/`SAN` fields.

:::

The TLS keys/CSRs/certs can be created manually, see the guide below.
Adjust the `Subj`/`CN`/`SAN` values according to the local requirements.

### Certificate creation

#### Generate root CA key and certificate

Create and enter a directory for your files:

```bash
mkdir certs
cd certs
```

Create the root CA private key:

```bash
openssl genrsa -out CA.key 2048
```

Create the root CA certificate:

```bash
openssl req -x509 -new -nodes \
    -subj "/C=DE/ST=Germany/L=Nurnberg/O=SUSE/OU=Epinio/CN=SUSE CA cert/emailAddress=epinio@suse.com" \
    -key CA.key \
    -sha256 \
    -days 3650 \
    -out CA.pem
```

#### Create private key, CSR and signed certificate

Create the private key for your domain:

```bash
openssl genrsa -out domain.key 2048
```

Create a CSR request (The `CN` field contains your domain):

```bash
openssl req -new \
    -subj "/C=DE/ST=Germany/L=Nurnberg/O=SUSE/OU=Epinio/CN=registry.suse.dev/emailAddress=epinio@suse.com" \
    -key domain.key \
    -out domain.csr
```

Create an extra openssl configuration for additional `SAN` entries, if any.

```bash
cat > domain.ext <<EOF
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = registry.suse.dev
EOF
```

Create the signed registry certificate from CSR, CA and the extra configuration, if present:

```bash
openssl x509 -req -in registry.csr -CA CA.pem -CAkey CA.key \
    -CAcreateserial -out registry.pem -days 3650 -sha256 -extfile registry.ext
```

Verify the new certificate's `SAN` field.

```bash
openssl x509 -in registry.pem -text | grep -A1 'Subject Alternative Name'
>             X509v3 Subject Alternative Name: 
>                DNS:registry.suse.dev
```


### Applications

Under normal circumstances applications request their ingress certificates from CM.
Without CM use of [routing secrets](customization/routing_secrets.md) becomes **manadatory**.
