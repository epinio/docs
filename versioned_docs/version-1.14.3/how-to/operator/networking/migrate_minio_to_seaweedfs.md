---
sidebar_label: Migrating from MinIO to SeaweedFS
sidebar_position: 31
title: Migrating from MinIO to SeaweedFS
description: How to migrate Epinio's internal S3 storage from MinIO to SeaweedFS when upgrading to 1.13.10
keywords: [epinio, kubernetes, minio, seaweedfs, s3, migration, upgrade]
doc-type: [how-to]
doc-topic: [epinio, how-to, other, migrate-minio-seaweedfs]
doc-persona: [epinio-operator]
---

Epinio **1.13.10** replaces MinIO with [SeaweedFS](https://github.com/seaweedfs/seaweedfs) as the default internal S3-compatible storage.
This guide covers how to safely migrate when upgrading from an earlier version.

## Who needs to follow this guide

| Situation | Action required |
|---|---|
| You use the **default internal MinIO** installation | Follow all steps below. |
| You use an **external** S3-compatible store (`seaweedfs.enabled: false`, `s3.*` values set) | [Step 2 only](#step-2-upgrade-epinio). No data migration needed. |
| You use the **internal s3gw** installation | None. s3gw is unaffected. |

## Overview of changes

The MinIO subchart is removed in 1.13.10. SeaweedFS is installed in its place and configured automatically by the Helm chart. **MinIO resources are removed automatically by Helm during the upgrade**, including its credentials secret, so source blobs must be backed up before upgrading.

| Setting | MinIO (pre-1.13.10) | SeaweedFS (1.13.10+) |
|---|---|---|
| `values.yaml` key | `minio.enabled` | `seaweedfs.enabled` |
| Internal endpoint | `minio.epinio.svc.cluster.local:9000` | `seaweedfs-s3.epinio.svc.cluster.local:8333` |
| Credentials secret | `minio-creds` | `seaweedfs-creds` |
| TLS secret | `minio-tls` | `seaweedfs-tls` |
| Storage class | `minio.persistence.storageClass` | `seaweedfs.persistence.storageClass` |

## Step 1: Back up source blobs to a temporary PVC

Run a Job that copies all source blobs from MinIO into a temporary PVC before the upgrade. No local tooling is required beyond `kubectl`.

Create the temporary PVC:

```yaml title="migration-pvc.yaml"
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: epinio-migration-temp
  namespace: epinio
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
```

:::tip

Adjust `storage` to fit your workload. You can estimate the required size by checking the MinIO PVC: `kubectl get pvc -n epinio -l app.kubernetes.io/name=minio`.

:::

Apply the PVC, then run the backup Job:

```bash
kubectl apply -f migration-pvc.yaml
```

```yaml title="backup-job.yaml"
apiVersion: batch/v1
kind: Job
metadata:
  name: epinio-s3-backup
  namespace: epinio
spec:
  template:
    spec:
      restartPolicy: Never
      volumes:
      - name: migration-data
        persistentVolumeClaim:
          claimName: epinio-migration-temp
      containers:
      - name: backup
        image: minio/mc
        command: ["/bin/sh", "-c"]
        args:
        - |
          set -e
          mc alias set src https://minio.epinio.svc.cluster.local:9000 \
            "$MINIO_KEY" "$MINIO_SECRET" --insecure
          for obj_path in $(mc find --insecure src/epinio/); do
            obj=$(basename "$obj_path")
            mc cp --insecure "$obj_path" "/data/${obj}"
            app=""
            ns=""
            while IFS= read -r line; do
              case "$line" in
                *X-Amz-Meta-App*|*x-amz-meta-app*)
                  app="${line#*: }"
                  app="$(printf '%s' "$app" | tr -d ' \t\r')"
                  ;;
                *X-Amz-Meta-Namespace*|*x-amz-meta-namespace*)
                  ns="${line#*: }"
                  ns="$(printf '%s' "$ns" | tr -d ' \t\r')"
                  ;;
              esac
            done <<< "$(mc stat --no-color --insecure "$obj_path")"
            printf 'App=%s;Namespace=%s' "$app" "$ns" > "/data/${obj}.meta"
          done
        env:
        - name: MINIO_KEY
          valueFrom:
            secretKeyRef:
              name: minio-creds
              key: accesskey
        - name: MINIO_SECRET
          valueFrom:
            secretKeyRef:
              name: minio-creds
              key: secretkey
        volumeMounts:
        - name: migration-data
          mountPath: /data
```

```bash
kubectl apply -f backup-job.yaml
kubectl wait --for=condition=complete job/epinio-s3-backup -n epinio --timeout=600s
kubectl logs job/epinio-s3-backup -n epinio
```

## Step 2: Upgrade Epinio

Export your current deployed values:

```bash
helm get values epinio -n epinio -o yaml > epinio-values.yaml
```

Open `epinio-values.yaml`, remove the `minio:` block if present, and add the following `seaweedfs` block. If you previously customized `minio.persistence.storageClass`, set `persistence.storageClass` in the same block; otherwise omit `persistence`:

```yaml title="epinio-values.yaml"
seaweedfs:
  enabled: true
  fullnameOverride: seaweedfs
  existingSecret: seaweedfs-creds
  s3:
    existingConfigSecret: seaweedfs-creds
  tls:
    enabled: false
  persistence:
    storageClass: <your-storage-class>  # omit this block if you did not customize MinIO storage
```

Then upgrade:

```bash
helm repo update
helm upgrade epinio epinio/epinio --namespace epinio -f epinio-values.yaml
```

:::caution Avoid `--reuse-values` for this upgrade

`--reuse-values` only carries over values you previously set explicitly, not the old chart's defaults. The new chart templates dereference keys that did not exist in older releases, causing nil pointer errors. Use `-f` with the exported values file instead.

:::

:::note External S3 users

If you use an external S3 provider (`seaweedfs.enabled: false`, `s3.*` values set), remove any `minio.*` keys from `epinio-values.yaml` and upgrade. SeaweedFS will not be installed and no further steps are needed.

:::

Wait for SeaweedFS to become ready before continuing:

```bash
kubectl rollout status deployment seaweedfs-s3 -n epinio --timeout=120s
```

## Step 3: Restore source blobs to SeaweedFS

Run a restore Job that reads from the temporary PVC and writes to SeaweedFS:

```yaml title="restore-job.yaml"
apiVersion: batch/v1
kind: Job
metadata:
  name: epinio-s3-restore
  namespace: epinio
spec:
  template:
    spec:
      restartPolicy: Never
      volumes:
      - name: migration-data
        persistentVolumeClaim:
          claimName: epinio-migration-temp
      containers:
      - name: restore
        image: minio/mc
        command: ["/bin/sh", "-c"]
        args:
        - |
          set -e
          mc alias set dst http://seaweedfs-s3.epinio.svc.cluster.local:8333 \
            "$SEAWEED_KEY" "$SEAWEED_SECRET"
          mc mb --ignore-existing dst/epinio
          for meta in /data/*.meta; do
            obj_name=$(basename "${meta%.meta}")
            attrs=$(cat "$meta")
            mc cp --attr "$attrs" "/data/${obj_name}" "dst/epinio/${obj_name}"
          done
        env:
        - name: SEAWEED_KEY
          valueFrom:
            secretKeyRef:
              name: seaweedfs-creds
              key: accesskey
        - name: SEAWEED_SECRET
          valueFrom:
            secretKeyRef:
              name: seaweedfs-creds
              key: secretkey
        volumeMounts:
        - name: migration-data
          mountPath: /data
```

```bash
kubectl apply -f restore-job.yaml
kubectl wait --for=condition=complete job/epinio-s3-restore -n epinio --timeout=600s
kubectl logs job/epinio-s3-restore -n epinio
```

## Verification

Restage an already-deployed application that was pushed from **local source** (not a git repository) to confirm that the source blobs were migrated correctly. Restage rebuilds from the blob stored in SeaweedFS without re-uploading source code, making it a direct test of the migration:

```bash
epinio app restage <your-app>
```

:::note

Apps configured with a git source (repo and commit) will fetch from the repository instead of reading from SeaweedFS if there is no blob. Restaging a git-sourced app does not verify the blob migration.

:::

A successful restage confirms that Epinio can read the migrated source blobs from SeaweedFS and produce a working build. If restage fails, check that the restore Job completed without errors and that the object count in the SeaweedFS bucket matches what was in MinIO before the upgrade.

## Cleanup

Once verification passes, remove the migration Job and temporary PVC:

```bash
kubectl delete job epinio-s3-backup epinio-s3-restore -n epinio
kubectl delete pvc epinio-migration-temp -n epinio
```
