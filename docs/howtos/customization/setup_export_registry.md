---
sidebar_label: "Setting up an export destination registry"
sidebar_position: 8
title: "Setting up an export destination registry"
description: How to set up an export destination registry
keywords: [epinio, kubernetes, export destination registry]
doc-type: [how-to]
doc-topic: [epinio, how-to, custom, setup-export-destination-registry]
---

:::note

Don't confuse this topic with **external Epinio registries**.
These are where Epinio saves the images of staged applications for its own use.
See [Setting Up An External Container Registry](setup_external_registry.md) for more information.

**Export destination registries** are where a user saves active applications for pickup by, and use with, `helm` and other Kubernetes tools.

It doesn't help that it's acceptable to configure the same registry both as external registry and as export target.

:::

## How to set up a basic export destination registry

Replace the highlighted `<placeholders>` in the command below, and then invoke it

```console showLineNumbers
kubectl apply -f - <<EOF
---
apiVersion: v1
kind: Secret
type: Opaque
metadata:
  annotations:
// highlight-next-line
    epinio.io/registry-namespace: "<registry-org>"
  labels:
    epinio.io/api-export-registry: "true"
// highlight-next-line
  name: "<destination-name>"
  namespace: epinio
stringData:
// highlight-next-line
  # certs: "<name of cert secret>"
  .dockerconfigjson: |-
    {
      "auths": {
        "registry.hub.docker.com": {
// highlight-next-line
          "auth":"PHVzZXI+OjxwYXNzd29yZD4=",
// highlight-next-line
          "username":"<user>",
// highlight-next-line
          "password":"<password>"
        }
      }
    }
EOF
```

As the `auth` element derives from the username and password it needs replacing as well.
Its value is the base64 encoding of `<user>:<password>`.

:::tip

An easy way to create the desired value is:

```console
echo -n "<user>:<password>" | base64 -
```

Note the `-n` flag of `echo`.
Without it a trailing newline is added, creating a wrong auth string result.

:::

This creates the authentication secret for the destination, in the `epinio` namespace.
If Epinio is differently configured, so that `epinio` isn't Epinio's system namespace then it needs changing.
That's in line 12 of the command above.

Epinio now knows the specified account at the docker hub as an export destination for use with `epinio app export --registry`.

For other registries change the `registry.hub.docker.com` reference as well (line 18).

## Certificate secrets

Should the selected registry requires more TLS certificates to communicate it's necessary to

- Create a Kubernetes secret with key `tls.crt` whose value is the set of extra certificates in PEM-encoded form.

  This secret has to reside in the same namespace as the authentication secret, that is, Epinio's system namespace.
  That namespace default is `epinio`.

  For example:

```console
  kubectl create secret generic \
    --namespace epinio \
    --from-file=tls.crt=tls-registry.pem \
    export-registry
  ```

- Extend the authentication secret with a key `certs` (sibling to key `.dockerconfigjson`) whose value is the name of the secret created in the preceding step.
