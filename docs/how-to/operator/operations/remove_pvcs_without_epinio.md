---
sidebar_label: Removing leftover PVCs without Epinio
sidebar_position: 26
title: Removing leftover PVCs without Epinio
description: How to find, inspect, and delete leftover Epinio application PVCs with kubectl Jobs when you cannot (or choose not to) use Epinio
keywords: [epinio, kubernetes, pvc, storage, cleanup, statefulset, job]
doc-type: [how-to]
doc-topic: [epinio, how-to, operations, remove-pvcs]
doc-persona: [epinio-operator]
---

Epinio preserves **application data** PersistentVolumeClaims by default when an application is deleted.
Staging volumes (build cache and source-blob PVCs) are removed automatically on delete; data volumes from a StatefulSet `volumeClaimTemplates` chart are not, unless you pass `--delete-pvc`.

This guide shows how to reclaim those leftover claims with `kubectl` and one-off Jobs.
It does **not** add or rely on Epinio maintenance API endpoints.

:::tip Prefer Epinio when you can

On Epinio **1.14.2+**, delete the application with PVC cleanup instead of this procedure:

```bash
epinio app delete <app> --delete-pvc
```

Use this document when the application is already gone, Epinio is unavailable, or the claim was never labeled for Epinio to discover.

:::

## Who needs to follow this guide

| Situation | Action required |
|---|---|
| App deleted **without** `--delete-pvc`, and StatefulSet data PVCs remain | Follow all steps below. |
| App scaled down; older ordinal PVCs remain | Follow all steps below. |
| Staging cache / source-blob PVC left behind (failed delete, manual edits, older install) | [Identify](#step-1-identify-target-pvcs) and [delete](#step-4-delete-the-pvc) those claims in the Epinio namespace. |
| You still have the app and run Epinio 1.14.2+ | Prefer `epinio app delete --delete-pvc` (or the UI checkbox). |
| Platform storage (SeaweedFS, registry, `image-export-pvc`) | **Do not** use this guide. Those claims belong to the Epinio install. |

## Overview of Epinio PVCs

| Kind | Namespace | Typical name | Created when | Removed by `epinio app delete` |
|---|---|---|---|---|
| Build cache | Epinio install namespace (default `epinio`) | `<ns>-cache-<app>-<hash>` | Staging with `server.stagingWorkload.storage.cache.emptyDir: false` (the default) | Always |
| Source blobs (staging workspace) | Epinio install namespace | `<ns>-sourceblobs-<app>-<hash>` | Staging with `sourceBlobs.emptyDir: false` (default is `true`, so usually absent) | Always |
| Application data | Application namespace | e.g. `stateful-r-<hash>-0` | App chart with `volumeClaimTemplates` (bundled `application-stateful` chart) | Only with `--delete-pvc` |
| Platform | Epinio install namespace | SeaweedFS / registry / `image-export-pvc` | Helm install | Never by app delete — leave alone |

Default staging storage (current chart):

```yaml
server:
  stagingWorkload:
    storage:
      cache:
        emptyDir: false
        size: 1Gi
      sourceBlobs:
        emptyDir: true
```

The bundled stateful app chart mounts application data at `/mnt/state` from a `volumeClaimTemplates` entry named `stateful`.
Kubernetes names each claim `{volumeClaimTemplate}-{statefulSetName}-{ordinal}` (for one replica, typically `stateful-r-<sha1>-0`).

Epinio discovers application data PVCs with label `app.kubernetes.io/name=<app>` in the application namespace.
Claims without that label are never deleted by Epinio and must be cleaned up with the steps below.

## Step 1: Identify target PVCs

List claims in the application namespace:

```bash
kubectl get pvc -n <app-namespace>
```

Narrow by app label when present (same selector Epinio uses):

```bash
kubectl get pvc -n <app-namespace> -l app.kubernetes.io/name=<app>
```

List staging claims in the Epinio namespace (replace `epinio` if you installed elsewhere):

```bash
kubectl get pvc -n epinio | grep -E 'cache|sourceblobs' || true
```

Confirm nothing important still uses a claim before you delete it:

```bash
kubectl describe pvc -n <namespace> <pvc-name>
kubectl get pods -n <namespace> -o json \
  | jq -r --arg pvc '<pvc-name>' '
      .items[]
      | select([.spec.volumes[]? | select(.persistentVolumeClaim.claimName == $pvc)] | length > 0)
      | .metadata.name'
```

:::caution

A PVC that is still mounted stays in `Terminating` until every Pod using it is gone.
Scale the workload to zero or delete the leftover Pods before Step 4.

:::

## Step 2: (Optional) Inspect or back up with a one-off Job

Mount the claim in a short-lived Job, the same pattern as the [MinIO → SeaweedFS migration](../networking/migrate_minio_to_seaweedfs.md) Jobs.
No Epinio API is involved.

```yaml title="inspect-pvc-job.yaml"
apiVersion: batch/v1
kind: Job
metadata:
  name: epinio-pvc-inspect
  namespace: <app-namespace>   # same namespace as the PVC
spec:
  ttlSecondsAfterFinished: 600
  template:
    spec:
      restartPolicy: Never
      volumes:
      - name: data
        persistentVolumeClaim:
          claimName: <pvc-name>   # e.g. stateful-r-....-0
      containers:
      - name: inspect
        image: busybox:1.36
        command: ["/bin/sh", "-c"]
        args:
        - |
          set -e
          echo "=== listing /data ==="
          ls -la /data
          du -sh /data 2>/dev/null || true
          # Optional: copy out anything you must keep, e.g. to another mounted volume
          # tar -czf /tmp/backup.tgz -C /data .
        volumeMounts:
        - name: data
          mountPath: /data
```

```bash
kubectl apply -f inspect-pvc-job.yaml
kubectl wait --for=condition=complete job/epinio-pvc-inspect -n <app-namespace> --timeout=120s
kubectl logs job/epinio-pvc-inspect -n <app-namespace>
```

:::note Sidecar alternative for a still-running Pod

If the application Pod is still running and you only need a quick look at the mounted volume, use an ephemeral debug container instead of a Job:

```bash
kubectl debug -n <app-namespace> <pod-name> -it --image=busybox:1.36 --target=<app-container> -- sh
```

Then inspect the same mount path the app uses (`/mnt/state` for the bundled stateful chart).
Scale the app down before deleting the PVC.

:::

## Step 3: Ensure the claim is unused

If the application still exists, scale it to zero (or delete it **without** expecting Epinio to remove data PVCs):

```bash
# Example for a leftover StatefulSet from the stateful chart
kubectl scale statefulset -n <app-namespace> <statefulset-name> --replicas=0
kubectl wait --for=delete pod -n <app-namespace> -l app.kubernetes.io/name=<app> --timeout=120s
```

If only orphan Pods remain:

```bash
kubectl delete pod -n <app-namespace> <pod-name> --grace-period=0 --force
```

Re-check that no Pod mounts the claim (command in Step 1).

## Step 4: Delete the PVC

```bash
kubectl delete pvc -n <namespace> <pvc-name>
```

Delete several labeled app-data claims at once:

```bash
kubectl delete pvc -n <app-namespace> -l app.kubernetes.io/name=<app>
```

Delete a known staging cache claim in the Epinio namespace:

```bash
kubectl delete pvc -n epinio <cache-pvc-name> --ignore-not-found
kubectl delete pvc -n epinio <sourceblobs-pvc-name> --ignore-not-found
```

:::caution Deletion is irreversible for the claim

Whether the underlying PersistentVolume and its data are removed depends on the StorageClass `reclaimPolicy`.
See Step 5 for `Retain`.

:::

## Step 5: Clean up `Retain` PersistentVolumes (if needed)

If the StorageClass uses `Retain`, deleting the PVC leaves a Released PV and the disk data:

```bash
kubectl get pv
kubectl describe pv <pv-name>
```

Only after you are sure the data can go:

```bash
kubectl delete pv <pv-name>
```

Your storage provider may still need a separate volume delete; follow that provider’s process if the PV does not free capacity on its own.

## Verification

Confirm the claims are gone:

```bash
kubectl get pvc -n <app-namespace> -l app.kubernetes.io/name=<app>
kubectl get pvc -n epinio | grep -E '<app>|cache|sourceblobs' || true
```

If you deleted data for an app you still intend to run, push or restage it and confirm a **new** empty claim is provisioned (StatefulSet charts create a fresh PVC on the next deploy).

## Cleanup

Remove the inspect Job after you are done:

```bash
kubectl delete job epinio-pvc-inspect -n <app-namespace> --ignore-not-found
```

## Related

- [What deletion removes](../../developer/concepts/applications/applications.mdx#what-deletion-removes) — Epinio’s built-in `--delete-pvc` / `--delete-image` behavior
- [Storage lifecycle](../../../reference/concepts/storage.md#storage-lifecycle) — capacity planning for leftover data volumes
- [Migrating from MinIO to SeaweedFS](../networking/migrate_minio_to_seaweedfs.md) — same Job-based operator pattern for storage work
