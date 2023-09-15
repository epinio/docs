---
title: ""
sidebar_label: "Export Destination Registries"
---

# Customization point: Export Destination Registries

Epinio uses `Export Destination Registries` (short: `EDR`) as targets for the `app export
--registry` command. With this command a users is able to export an active application to one of the
available registries, as a pair of helm chart and linked container image.

An installation of Epinio does not provide any kind of standard destinations.

If EDR's are desired or needed please follow the instructions on
[How to create export destination registries](../../howtos/customization/setup_export_registry.md)
and
[How to export applications to an OCI registry](../../howtos/customization/export_to_oci_registries.md)

The remainder of this document contains the definition of EDRs.

## Definition

An EDR is defined by one or two kubernetes secrets, to be placed into the kubernestes cluster by the
Epinio __operator__.

All secrets have to be placed into Epinio's system namespace.
This namespace is usually named `epinio`.

The `authentication secret` is labeled with `epinio.io/api-export-registry: "true"` and has to
contain a stringData key `.dockerconfigjson`. The value for this key is a string in JSON format:

```
stringData:
  .dockerconfigjson: |-
    {
      "auths": {
        "(set registry host here)": {
          "auth":"(set base64 encoded string of (user:password) here)",
          "username":"(set the user name here)",
          "password":"(set the password here)"
        }
      }
    }
```

The name of the authentication secret is the symbolic name of the destination. It will be listed by
`epinio export-registries` and becomes a suitable value for the `--registry` flag of `epinio app
export`.

The `epinio.io/registry-namespace` annotation provides Epinio with the name of the
namespace/organization in the registry to place uploaded charts and images into.

If the authentication secret contains the optional key `certs` (as sibling to `.dockerconfigjson`)
then the value of that key is the name of the `certificate secret`. This secret has to contain a key
`tls.crt` whose value is a PEM-formatted string containing the set of additional secrets required to
securely talk to the destination registry.

:::note
The type of the authentication secret does not matter to Epinio.
The examples use the generic type `Opaque`.
:::

## Example authentication secret, without certificate secret 

Note the placeholders in brackets (`<...>`). `auth` is derived from the placeholders.

```
---
apiVersion: v1
kind: Secret
type: Opaque
metadata:
  annotations:
    epinio.io/registry-namespace: "<registry-org>"
  labels:
    epinio.io/api-export-registry: "true"
  name: "<destination-name>"
  namespace: epinio
stringData:
  .dockerconfigjson: |-
    {
      "auths": {
        "registry.hub.docker.com": {
          "auth":"PHVzZXI+OjxwYXNzd29yZD4=",
          "username":"<user>",
          "password":"<password>"
        }
      }
    }
```
