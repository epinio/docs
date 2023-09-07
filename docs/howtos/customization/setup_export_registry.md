---
sidebar_label: "Setting Up An Export Destination Registry"
sidebar_position: 8
title: ""
---

:::note

Do not confuse this topic with external Epinio registries.
These are where Epinio stashes the images of staged applications for its own use.
See [Setting Up An External Container Registry](setup_external_registry.md) for more information.

Export destination registries on the other hand are where a user saves active applications to for
pickup by and use with `helm` and other kubernetes tools.

It does not help that it is perfectly ok to configure the same registry both as external registry
and as export target.

:::

## How to set up a basic export destination registry

As an operator, replace the placeholders in the command below, and then invoke it

```bash
kubectl apply -f - <<EOF
---
apiVersion: v1
kind: Secret
type: kubernetes.io/dockerconfigjson
metadata:
  annotations:
    epinio.io/registry-namespace: "placeholder-user"
  labels:
    epinio.io/api-export-registry: "true"
  name: (placeholder-name)
  namespace: epinio
stringData:
  .dockerconfigjson: |-
    {
      "auths": {
        "registry.hub.docker.com": {
          "auth":"cGxhY2Vob2xkZXItdXNlcjpwbGFjZWhvbGRlci1wYXNzd29yZAo=",
          "username":"placeholder-user",
          "password":"placeholder-password"
        }
      }
    }
EOF
```

Do not forget that the `auth` element is the base64 encoding of
`placeholder-user:placeholder-password` and thus requires replacement as well.

This creates the authentication secret for the destination.

Epinio now knows the specified account at the docker hub as an export destination for use with
`epinio app export --registry`.

## Certificate secrets

If the desired registry requires additional TLS certificates to talk it is necessary to

 - create a kubernetes secret with key `tls.crt` whose value is the set of additional certifcates in
   PEM-encoded form.

 - extend the authentication secret with a key `certs` whose value is the name of the secret created
   in the preceding step.
