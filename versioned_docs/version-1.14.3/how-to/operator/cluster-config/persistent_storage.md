---
sidebar_label: Persistent storage for the registry and SeaweedFS
sidebar_position: 9
title: Running the registry and SeaweedFS on persistent storage
description: Move Epinio's built-in container registry and SeaweedFS from pod and node storage to PersistentVolumeClaims, so images and application sources survive pod restarts and node replacement
keywords: [epinio, kubernetes, registry, seaweedfs, persistent volume, pvc, storage class, fsGroup, emptyDir, hostPath]
doc-type: [how-to]
doc-topic: [epinio, how-to, cluster-config, persistent-storage]
doc-persona: [epinio-operator]
---

By default, Epinio's built-in container registry and SeaweedFS keep their data where a routine cluster event can delete it.
This guide moves both to PersistentVolumeClaims.

| Component | Stores | Default storage | Lost when |
| --- | --- | --- | --- |
| Container registry | Application images built by staging | `emptyDir` inside the registry pod | The pod is replaced: a deleted pod, a rollout, a node drain, an Epinio upgrade that changes the registry |
| SeaweedFS (master, volume, filer) | Application source code from `epinio push` | `hostPath` directories on the node running each pod | The node is replaced or its disk is wiped, for example during a node pool rollout |

Running applications keep working after the registry loses its images, because nodes keep a copy of images they have already pulled.
An application that starts on a node without its image fails with `ImagePullBackOff` until it is rebuilt with `epinio app restage <app>`.
Restaging needs the application's source in SeaweedFS. If SeaweedFS has lost it too, push the application again from its source.

This guide applies to the built-in registry (`containerregistry.enabled: true`) and the bundled SeaweedFS (`seaweedfs.enabled: true`), which are the defaults.
An [external registry](./setup_external_registry.md) or [external S3 storage](./setup_external_s3.md) keeps its data outside the cluster and doesn't need these steps.

## Before you begin

- Pick a StorageClass that provides `ReadWriteOnce` volumes. List them with `kubectl get storageclass`. Leaving `storageClassName` empty uses the cluster default.
- Check how the storage handles file ownership. See [File ownership](#file-ownership). Most block storage needs nothing extra.
- Plan for the data already stored. This change does **not** copy existing data:
  - The registry starts empty. Restage applications with `epinio app restage <app>` afterwards.
  - SeaweedFS starts empty. Applications keep running, but restaging them fails until each one is pushed again from its source.

## Configure the values

Add these values to your Epinio values file, adjusting sizes and the StorageClass name:

```yaml
containerregistry:
  storage:
    emptyDir: false
    size: 20Gi
    storageClassName: gp3      # empty = cluster default

seaweedfs:
  master:
    data:
      type: persistentVolumeClaim
      size: 1Gi
      storageClass: gp3
  volume:
    dataDirs:                  # a list: Helm replaces it, so give every field
      - name: data1
        type: persistentVolumeClaim
        size: 20Gi
        storageClass: gp3
        maxVolumes: 0
  filer:
    data:
      type: persistentVolumeClaim
      size: 5Gi
      storageClass: gp3
```

The registry creates one PersistentVolumeClaim, `epinio-registry`.
SeaweedFS creates one per StatefulSet: `data-epinio-seaweedfs-master-0`, `data1-seaweedfs-volume-0` and `data-filer-seaweedfs-filer-0`.

The SeaweedFS master and filer still write their logs to `hostPath`. Set `seaweedfs.master.logs.type` and `seaweedfs.filer.logs.type` to `emptyDir` if your cluster doesn't allow `hostPath` volumes.

## Apply the change

### New installation

Pass the values file to `helm install` as usual. Nothing else is needed.

### Existing installation

1. **Delete the SeaweedFS StatefulSets.** Kubernetes doesn't allow adding volume claims to an existing StatefulSet, so `helm upgrade` fails with `spec: Forbidden: updates to statefulset spec for fields other than ...` unless they are deleted first:

   ```bash
   kubectl -n epinio delete statefulset \
     seaweedfs-master seaweedfs-volume seaweedfs-filer
   ```

   SeaweedFS is unavailable until the upgrade recreates the StatefulSets. Don't push applications in the meantime.

1. **Upgrade Epinio** with the new values:

   ```bash
   helm upgrade epinio epinio/epinio -n epinio --reuse-values -f persistent-storage.yaml
   ```

1. **Check that every claim is bound:**

   ```bash
   kubectl -n epinio get pvc
   ```

   A claim stuck in `Pending` usually means the StorageClass name is wrong, or the class uses `WaitForFirstConsumer` and its pod hasn't been scheduled yet.

1. **Restage or push your applications again**, as described in [Before you begin](#before-you-begin).

:::tip A new registry pod stuck in `ContainerCreating`

The registry Deployment replaces its pod by starting the new one first.
With a `ReadWriteOnce` volume, a new pod on a different node can't attach the volume while the old pod holds it, and its events show a `Multi-Attach error`.
Delete the old pod to release the volume. This can happen on any later upgrade that changes the registry, not only this one.

:::

## File ownership

The registry runs as user ID 1000, but a new volume is usually owned by `root`.
Epinio sets `fsGroup: 1000` on the registry pod, so Kubernetes gives the volume to group 1000 when it mounts it.
That works only on storage where Kubernetes manages ownership:

| Storage | Examples | What to do |
| --- | --- | --- |
| Applies `fsGroup` | AWS EBS, Longhorn (`ReadWriteOnce`), `local` volumes, most CSI block drivers | Nothing |
| Ignores `fsGroup`, but creates world-writable directories | `hostPath`, Rancher `local-path` (default mode), the minikube default class | Nothing |
| Ignores `fsGroup`, and the volume is owned by `root` | NFS exports with `root_squash`, CSI drivers with `fsGroupPolicy: None` | Make the volume writable by user ID 1000 yourself: `chown 1000:1000` the export's directory on the NFS server, or export it with `all_squash,anonuid=1000,anongid=1000` |

To check a CSI driver, read its `fsGroupPolicy`. `None` means Kubernetes never changes ownership:

```bash
kubectl get csidriver -o custom-columns=NAME:.metadata.name,FSGROUP:.spec.fsGroupPolicy
```

If the registry can't write to its volume, every source push fails during staging with:

```console
filesystem: mkdir /var/lib/registry/docker: permission denied
```

To override the registry's pod security context, for example to use a different group, set `containerregistry.podSecurityContext`. See [Container Registry](../../../reference/helm.md#container-registry) in the Helm chart reference.

SeaweedFS runs as `root`, so its volumes need no ownership change. It still can't write to an NFS export with `root_squash`, which maps `root` to an unprivileged user.

:::note Epinio 1.13.0 to 1.14.2

These releases support `containerregistry.storage.emptyDir: false` but don't set `fsGroup` on the registry pod, so on root-owned storage the registry can't write at all.
Upgrade Epinio, or patch the registry Deployment:

```bash
kubectl -n epinio patch deployment registry --type merge -p \
  '{"spec":{"template":{"spec":{"securityContext":{"fsGroup":1000,"fsGroupChangePolicy":"OnRootMismatch"}}}}}'
```

The chart in these releases doesn't manage this field, so the patch normally survives upgrades. Check it after each one.

:::

## See also

- [Helm chart reference](../../../reference/helm.md)
- [Fixing registry certificate errors after CA renewal](../operations/registry_certificate_renewal.md)
- [Epinio's SeaweedFS (S3) service](./seaweedfs.md)
- [Cluster prerequisites: container registry](../cluster-prerequisites.md#container-registry)
