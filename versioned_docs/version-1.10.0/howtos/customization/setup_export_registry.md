---
sidebar_label: "Setting Up An Export Destination Registry"
sidebar_position: 8
title: ""
---

:::note

Do not confuse this topic with external Epinio registries.
These are where Epinio saves the images of staged applications for its own use.
See [Setting Up An External Container Registry](setup_external_registry.md) for more information.

Export destination registries on the other hand are where a user saves active applications to,
for pickup by and use with `helm` and other kubernetes tools.

It does not help that it is perfectly ok to configure the same registry both as external registry
and as export target.

:::

## How to set up a basic export destination registry

As an operator, replace the bracketed (`<...>`) placeholders in the command below, and then invoke it

```bash
kubectl apply -f - <<EOF
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
  # certs: "<name of cert secret>"
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
EOF
```

Note that the `auth` element is derived from username and password.
It has to be replaced as well.
Its value is the base64 encoding of `<user>:<password>`.

:::tip
An easy way to create the desired value is:

```
echo -n "<user>:<password>" | base64 -
```

Note the `-n` flag of `echo`.
Without it a trailing newline will be added, creating a bogus result.
:::

This creates the authentication secret for the destination, in the `epinio` namespace.
Change it, if `epinio` is not Epinio's system namespace, i.e. when Epinio was installed differently.

Epinio now knows the specified account at the docker hub as an export destination for use with
`epinio app export --registry`.

For other registries change the `registry.hub.docker.com` reference as well.

## Certificate secrets

If the desired registry requires additional TLS certificates to talk it is necessary to

 - Create a kubernetes secret with key `tls.crt` whose value is the set of additional certifcates in
   PEM-encoded form.

   This secret has to reside in the same namespace as the authentication secret, i.e. Epinio's
   system namespace. That namespace usually is `epinio`.

   For example:

   ```
   kubectl create secret generic \
       --namespace epinio \
       --from-file=tls.crt=tls-registry.pem \
       export-registry
   ```

 - Extend the authentication secret with a key `certs` (sibling to key `.dockerconfigjson`) whose
   value is the name of the secret created in the preceding step.
