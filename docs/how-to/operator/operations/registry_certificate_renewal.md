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

1. Check when the registry container last started:

   ```bash
   kubectl -n epinio get pods -l app.kubernetes.io/name=epinio-registry -o jsonpath=\
   '{.items[0].status.containerStatuses[?(@.name=="registry")].state.running.startedAt}{"\n"}'
   ```

If the fingerprints differ, and the container started before the `notBefore` date of the secret's certificate, the registry is serving a stale certificate. Continue with the fix.

## Check where the registry stores images

Before restarting anything, check which volume holds the registry's images:

```bash
kubectl -n epinio get deployment registry \
  -o jsonpath='{.spec.template.spec.volumes[?(@.name=="registry")]}{"\n"}'
```

| Output contains | Storage | Images survive a new pod? |
| --- | --- | --- |
| `"emptyDir":{}` | Scratch space inside the pod. The chart default (`containerregistry.storage.emptyDir: true`). | **No.** Every image is deleted with the pod. |
| `"persistentVolumeClaim"` | The `epinio-registry` PersistentVolumeClaim (`containerregistry.storage.emptyDir: false`) | Yes |

:::warning Do not delete the registry pod on `emptyDir` storage

With `emptyDir` storage, deleting the registry pod, `kubectl rollout restart`, a node drain, or anything else that replaces the pod deletes every stored image.
Running applications keep working from images their nodes have already pulled, but an application that starts on a node without its image fails with `ImagePullBackOff` until you rebuild it with `epinio app restage <app>`.
Use the fix below, which restarts only the registry container and keeps the pod.

:::

## Fix: restart the registry container

Restarting the `registry` container inside the existing pod makes it read the current certificate.
The pod, and the images on its volume, stay in place. This works for both storage types.

1. Wait until the pod sees the renewed certificate.
   Kubernetes updates the mounted copy of the `epinio-registry-tls` secret within a minute or two of the renewal.
   Compare its fingerprint with the secret's, from step 2 of [Confirm the cause](#confirm-the-cause):

   ```bash
   kubectl -n epinio exec deploy/registry -c registry -- cat /certs/tls.crt \
     | openssl x509 -noout -fingerprint
   ```

   Repeat until the two fingerprints match.

1. Restart the container and wait for it to become ready:

   ```bash
   kubectl -n epinio exec deploy/registry -c registry -- kill 1
   sleep 5   # let Kubernetes notice the container stopped
   kubectl -n epinio wait pod -l app.kubernetes.io/name=epinio-registry \
     --for=condition=Ready --timeout=120s
   ```

   `kubectl get pods` now shows one more restart for the pod, and the same pod name.

The registry is unavailable for the few seconds it takes the container to start. Pushes and image pulls during that window fail and need to be retried.

Repeat the first command from [Confirm the cause](#confirm-the-cause). The fingerprint now matches the secret.
Push the application again to confirm staging succeeds.

:::tip With `persistentVolumeClaim` storage you can also delete the pod

Deleting the pod (`kubectl -n epinio delete pod -l app.kubernetes.io/name=epinio-registry`) also works when images are on the PersistentVolumeClaim.
Avoid `kubectl rollout restart`: it starts the new pod before stopping the old one, and with a `ReadWriteOnce` volume, which most block storage provides, a new pod on another node can't attach the volume while the old pod holds it.

:::

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
  Reloader performs a rolling restart, which replaces the pod. Use it only with `persistentVolumeClaim` storage: on `emptyDir` storage every renewal would delete all stored images. The `ReadWriteOnce` limit described in the tip above also applies.

To keep images across pod restarts, node failures and upgrades, move the registry to persistent storage. See [Run the registry and SeaweedFS on persistent storage](../cluster-config/persistent_storage.md).

## See also

- [Set up and use certificate issuers](../networking/certificate_issuers.md)
- [Cert Manager](../../../reference/security/cert-manager.md)
- [Cluster prerequisites: container registry](../cluster-prerequisites.md)
- [Helm chart values](../../../reference/helm.md)
