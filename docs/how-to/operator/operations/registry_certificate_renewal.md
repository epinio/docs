---
sidebar_label: Registry certificate errors after CA renewal
sidebar_position: 27
title: Fixing registry certificate errors after CA renewal
description: Diagnose and fix staging failures caused by the built-in registry serving a certificate signed by a renewed epinio-ca, without losing stored images
keywords: [epinio, kubernetes, cert-manager, epinio-ca, registry, certificate, x509, staging, troubleshooting]
doc-type: [how-to]
doc-topic: [epinio, how-to, operations, registry-certificate]
doc-persona: [epinio-operator]
---

Every `epinio push` from source suddenly fails during staging with an `x509` error from the built-in container registry, even though nothing in the cluster was changed by hand.
The usual cause is that cert-manager renewed the `epinio-ca` certificate authority, and the registry is still serving the certificate it loaded when it started.
This guide confirms the cause, fixes it without losing stored images, and shows how to stay ahead of the next renewal.

It applies to installations that use the built-in registry (`containerregistry.enabled: true`) with cert-manager, which is the default.
An [external registry](../cluster-config/setup_external_registry.md) uses its own certificate and is not affected.

## Symptoms

Staging stops at the `ANALYZING` phase, and the staging log shows one of these errors:

```console
ERROR: failed to initialize analyzer: validating registry read access: failed to ensure registry read access to registry.epinio.svc.cluster.local:5000/apps/...:
Get "https://registry.epinio.svc.cluster.local:5000/v2/": tls: failed to verify certificate: x509: certificate signed by unknown authority
(possibly because of "x509: ECDSA verification failure" while trying to verify candidate authority certificate "epinio-ca")
```

```console
... tls: failed to verify certificate: x509: certificate has expired or is not yet valid
```

View the staging log of a failed push with:

```bash
epinio app logs --staging <app>
```

Applications that are already running are not affected. They keep running from images their nodes have already pulled.

## Why it happens

Three defaults combine to cause this:

| What | Default | Effect |
| --- | --- | --- |
| Lifetime of `epinio-ca` and the certificates it signs | cert-manager default: 90 days, renewed after 60 | The CA and the registry certificate are both reissued every 60 days. |
| CA private key on renewal | cert-manager 1.18 and later: `rotationPolicy: Always` | Each renewed `epinio-ca` has a **new key**, so certificates signed by the previous CA no longer verify. |
| Registry certificate loading | Read once, at startup, from the `epinio-registry-tls` secret | The registry keeps serving its old certificate until its pod restarts. |

After a renewal, the staging job trusts the new `epinio-ca`, but the registry still presents a certificate signed by the old one.
With cert-manager older than 1.18, the CA keeps its key, so the old certificate keeps working until it expires 30 days later. You then see the `certificate has expired` error instead.

## Confirm the cause

Compare the certificate the registry is serving with the one in its secret.
The commands assume Epinio is installed in the `epinio` namespace.

1. Show the certificate the registry is serving:

   ```bash
   kubectl -n epinio run tls-check --rm -i --restart=Never --image=alpine/openssl --command -- \
     sh -c 'openssl s_client -connect registry.epinio.svc.cluster.local:5000 </dev/null 2>/dev/null | openssl x509 -noout -dates -fingerprint'
   ```

1. Show the certificate cert-manager last issued:

   ```bash
   kubectl -n epinio get secret epinio-registry-tls -o jsonpath='{.data.tls\.crt}' \
     | base64 -d | openssl x509 -noout -dates -fingerprint
   ```

1. Check when the registry pod started:

   ```bash
   kubectl -n epinio get pods -l app.kubernetes.io/name=epinio-registry
   ```

If the fingerprints differ, and the pod is older than the `notBefore` date of the secret's certificate, the registry is serving a stale certificate. Continue with the fix.

## Fix: restart the registry pod

Delete the registry pod. Its Deployment recreates it, and the new pod loads the current certificate:

```bash
kubectl -n epinio delete pod -l app.kubernetes.io/name=epinio-registry
kubectl -n epinio rollout status deployment/registry
```

:::note Stored images are kept

The registry stores images on the `epinio-registry` PersistentVolumeClaim, which survives the pod being replaced.
The registry is unavailable for the few seconds it takes the new pod to start. Pushes and image pulls during that window fail and need to be retried.

:::

:::tip Why not `kubectl rollout restart`?

`rollout restart` starts the new pod before stopping the old one.
With a `ReadWriteOnce` volume, which most block storage provides, the new pod can't attach the volume while the old pod holds it. If the new pod lands on another node, it waits forever and the old pod keeps serving the stale certificate.
Deleting the pod releases the volume first.

:::

Repeat the first command from [Confirm the cause](#confirm-the-cause). The fingerprint now matches the secret.
Push the application again to confirm staging succeeds.

## Stay ahead of the next renewal

The problem returns at every renewal unless the registry restarts after it.
Check when the next renewal is due:

```bash
kubectl -n cert-manager get certificate epinio-ca -o jsonpath='{.status.renewalTime}{"\n"}'
kubectl -n epinio get certificate epinio-registry -o jsonpath='{.status.renewalTime}{"\n"}'
```

The `epinio-ca` certificate lives in the cert-manager namespace, `cert-manager` by default.

Then pick one of these approaches:

- **Restart after each renewal.** Run the fix above shortly after the renewal time. This needs no extra components but is easy to forget.
- **Restart automatically when the secret changes.** A controller such as [Reloader](https://github.com/stakater/Reloader) restarts a Deployment when a secret it uses changes. With Reloader installed, annotate the registry Deployment:

  ```bash
  kubectl -n epinio annotate deployment registry \
    secret.reloader.stakater.com/reload=epinio-registry-tls
  ```

  The Epinio chart doesn't set this annotation, so check that it is still present after each Epinio upgrade.
  Reloader performs a rolling restart, so the `ReadWriteOnce` limit described in the tip above still applies.

## See also

- [Set up and use certificate issuers](../networking/certificate_issuers.md)
- [Cert Manager](../../../reference/security/cert-manager.md)
- [Cluster prerequisites: container registry](../cluster-prerequisites.md)
- [Helm chart values](../../../reference/helm.md)
