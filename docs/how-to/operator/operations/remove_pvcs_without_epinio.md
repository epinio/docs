---
sidebar_label: Removing leftover PVCs without Epinio
sidebar_position: 26
title: Removing leftover PVCs without Epinio
description: Find, back up, and delete Epinio PersistentVolumeClaims that no longer belong to an application, using kubectl alone
keywords: [epinio, kubernetes, pvc, storage, cleanup, statefulset, staging]
doc-type: [how-to]
doc-topic: [epinio, how-to, operations, remove-pvcs]
doc-persona: [epinio-operator]
---

Epinio leaves two kinds of PersistentVolumeClaim behind, for two different reasons.
This guide finds both with one command, backs up the ones worth keeping, and deletes them using only `kubectl`.

:::tip Prefer Epinio when you can

If the application still exists and you are on Epinio **1.14.2+**, delete it with its data in one step:

```bash
epinio app delete <app> --delete-pvc
```

Use this guide when the application is already gone, when Epinio is unavailable, or when a claim was left behind by a delete that did not finish.

:::

## The two kinds of leftover claim

Almost every question about leftover claims comes from treating these as one thing. They are not.

| | Application data | Staging cache |
|---|---|---|
| Lives in | the application namespace | the Epinio install namespace (default `epinio`) |
| Named | `stateful-<statefulset>-<ordinal>` | `<ns>-<cache\|sourceblobs>-<app>-<sha1>` |
| Labeled | `app.kubernetes.io/name=<app>` | **nothing**: no labels, no owner references |
| Holds | data your application wrote | buildpack layers from the last build |
| Left behind because | you deleted the app without `--delete-pvc` (**by design**) | a delete did not finish (**a fault**) |
| Worth backing up | yes | no, the next build rebuilds it |
| Created by | the chart's `volumeClaimTemplates` | every staging run |

The consequences of that table are what make the two cases feel inconsistent:

- **Application data claims are labeled**, because Kubernetes copies the StatefulSet's selector onto every claim its template creates. That label is how `--delete-pvc` finds them.
- **Staging claims are not labeled at all.** Epinio finds them by recomputing their name from the application, so a staging claim whose application is gone can no longer be found by anything. It is invisible, and it keeps its disk.

:::caution Platform storage is not in scope

SeaweedFS, the registry, and `image-export-pvc` belong to the Epinio installation itself.
They are never leftovers. Do not delete them.

:::

## Step 1: Identify

This function lists every claim that no longer has an application behind it, of either kind.
Paste it into your shell once; the later steps reuse it.

```bash
# Lists Epinio PersistentVolumeClaims that no longer have an application.
# Usage: epinio-dangling-pvcs [--names]
epinio-dangling-pvcs() {
  local install_ns="${EPINIO_NAMESPACE:-epinio}" expected apps

  # Every staging claim name the surviving applications can account for.
  expected=$(kubectl get apps.application.epinio.io -A \
      -o jsonpath='{range .items[*]}{.metadata.namespace} {.metadata.name}{"\n"}{end}' |
    while read -r ns app; do
      [ -n "$app" ] || continue
      for kind in cache sourceblobs; do
        n="$ns-$kind-$app"
        printf '%s-%s\n' "${n:0:22}" "$(printf '%s' "$n" | sha1sum | cut -d' ' -f1)"
      done
    done)

  apps=$(kubectl get apps.application.epinio.io -A \
    -o jsonpath='{range .items[*]}{.metadata.namespace}/{.metadata.name}{"\n"}{end}')

  kubectl get pvc -A -o json | jq -r \
    --arg install_ns "$install_ns" --arg expected "$expected" \
    --arg apps "$apps" --arg names "${1:-}" '
    ($expected | split("\n") | map(select(length > 0))) as $ok |
    ($apps     | split("\n") | map(select(length > 0))) as $live |
    [ .items[]
      | . as $p
      | $p.metadata.namespace as $ns
      | $p.metadata.name      as $n
      | ($p.metadata.labels // {}) as $l
      | (if ($ns == $install_ns and ($n | test("-(cache|sourceblobs)-")))
         then (if ($ok | index($n)) then empty else {kind:"staging", app:"-"} end)
         elif ($l["app.kubernetes.io/name"] and ($l["app.kubernetes.io/instance"] | not))
         then (if ($live | index($ns + "/" + $l["app.kubernetes.io/name"]))
               then empty
               else {kind:"app-data", app:$l["app.kubernetes.io/name"]} end)
         else empty end) as $hit
      | {ns:$ns, name:$n, kind:$hit.kind, app:$hit.app,
         size:($p.status.capacity.storage // "-"), phase:$p.status.phase}
    ] as $rows |
    if $names == "--names" then
      $rows[] | "\(.ns) \(.name)"
    else
      (["KIND","NAMESPACE","CLAIM","SIZE","APP"] | @tsv),
      ($rows[] | [.kind, .ns, .name, .size, .app] | @tsv)
    end'
}
```

Run it:

```bash
epinio-dangling-pvcs | column -t -s$'\t'
```

```
KIND      NAMESPACE  CLAIM                                     SIZE  APP
staging   epinio     workspace-cache-exampl-1f9956f9...          1Gi   -
app-data  workspace  stateful-r-09b90aa6...-0                    1Gi   my-stateful-app
```

Anything not listed still has an application that owns it. Claims belonging to Epinio **services** are skipped, because a service chart also sets `app.kubernetes.io/instance` and this function treats that as a sign the claim is owned by something else.

:::note Custom application charts

The `app-data` check assumes the claim carries `app.kubernetes.io/name` and no `app.kubernetes.io/instance`, which is what the bundled charts produce.
A custom chart that sets extra labels is skipped rather than listed. That errs toward leaving claims alone, so review a custom chart's claims by hand.

:::

## Step 2: Back up

Only worth doing for `app-data` claims. A staging cache is rebuilt by the next `epinio push`, so there is nothing in it to lose.

```bash
# Copies the contents of a claim into a local tarball.
# Usage: epinio-pvc-backup <namespace> <claim> <output.tgz>
epinio-pvc-backup() {
  local ns="$1" claim="$2" out="$3" pod rc elsewhere

  if [ -z "$ns" ] || [ -z "$claim" ] || [ -z "$out" ]; then
    echo "usage: epinio-pvc-backup <namespace> <claim> <output.tgz>" >&2
    return 2
  fi

  if ! kubectl get pvc -n "$ns" "$claim" >/dev/null 2>&1; then
    echo "No claim '$claim' in namespace '$ns'." >&2
    elsewhere=$(kubectl get pvc -A \
      -o jsonpath="{range .items[?(@.metadata.name=='$claim')]}{.metadata.namespace}{'\n'}{end}" 2>/dev/null)
    if [ -n "$elsewhere" ]; then
      echo "It is in namespace '$elsewhere'. A staging claim is named after the" >&2
      echo "application's namespace but lives in the Epinio install namespace." >&2
    fi
    return 1
  fi

  pod="pvc-backup-$RANDOM$RANDOM"
  kubectl run "$pod" -n "$ns" --restart=Never --quiet --image=busybox:1.36 \
    --overrides="$(printf '%s' '{"spec":{"volumes":[{"name":"d","persistentVolumeClaim":{"claimName":"CLAIM"}}],
      "containers":[{"name":"b","image":"busybox:1.36","command":["sleep","3600"],
      "volumeMounts":[{"name":"d","mountPath":"/d","readOnly":true}]}]}}' | sed "s/CLAIM/$claim/")" >/dev/null || return 1

  if kubectl wait --for=condition=Ready "pod/$pod" -n "$ns" --timeout=5m >&2; then
    kubectl exec -n "$ns" "$pod" -- tar -czf - -C /d . > "$out"; rc=$?
  else
    echo "the backup Pod never became Ready. Inspect it with:" >&2
    echo "  kubectl describe pod -n $ns $pod" >&2
    rc=1
  fi

  kubectl delete pod -n "$ns" "$pod" --wait=false >/dev/null 2>&1
  [ "$rc" -eq 0 ] && echo "wrote $out ($(wc -c < "$out") bytes)" >&2
  return "$rc"
}
```

Pass the namespace from the `NAMESPACE` column of Step 1, not the one embedded in the claim's name:

```bash
epinio-pvc-backup workspace stateful-r-09b90aa6...-0 my-app-data.tgz
tar -tzf my-app-data.tgz
```

The claim is mounted read-only, and the Pod is removed whether the copy succeeds or fails.

:::caution A ReadWriteOnce claim in use cannot be read

These claims attach to one **node** at a time. If a Pod still mounts the claim, the backup Pod never becomes Ready unless it happens to schedule onto that same node, and the function reports that rather than hanging.
Scale the workload down first. See [Step 3](#step-3-delete).

:::

:::note Why this uses `kubectl exec` rather than an attached Pod

Streaming the archive out of `kubectl run -i` looks simpler and quietly produces a **truncated tarball**: the container starts writing before `kubectl` finishes attaching, and the output produced in that window is lost.
The symptom is a `couldn't fetch pre-attach logs` warning and an archive that fails `gzip -t`. On a small volume it can appear to work.
`kubectl exec` against an already-running Pod has no such race and is binary-safe, which is the same mechanism `kubectl cp` uses.

:::

## Step 3: Delete

Delete one claim:

```bash
kubectl delete pvc -n <namespace> <claim>
```

Delete every dangling claim of both kinds:

```bash
epinio-dangling-pvcs --names | while read -r ns name; do
  kubectl delete pvc -n "$ns" "$name"
done
```

Preview it first. The same loop with `--dry-run=client` changes nothing:

```bash
epinio-dangling-pvcs --names | while read -r ns name; do
  kubectl delete pvc -n "$ns" "$name" --dry-run=client
done
```

:::caution A claim in use will not go away

Deleting a claim that a Pod still mounts leaves it in `Terminating` until that Pod is gone.
Scale the workload down first:

```bash
kubectl get statefulset -n <namespace> -l app.kubernetes.io/name=<app>
kubectl scale statefulset -n <namespace> <statefulset> --replicas=0
kubectl wait --for=delete pod -n <namespace> -l app.kubernetes.io/name=<app> --timeout=120s
```

Force-deleting a Pod (`--grace-period=0 --force`) removes the Pod object without waiting for the kubelet to unmount, which can leave the volume attached and the claim stuck. Reserve it for a node that is genuinely unreachable.

:::

## Check the volumes were actually reclaimed

Deleting a claim does not guarantee the disk came back. That is decided by the StorageClass `reclaimPolicy` on the PersistentVolume behind it.

```bash
kubectl get pv -o custom-columns=\
'NAME:.metadata.name,STATUS:.status.phase,POLICY:.spec.persistentVolumeReclaimPolicy,CLAIM:.spec.claimRef.name' \
  | awk 'NR==1 || $2=="Released"'
```

- **`Retain`**: a `Released` volume here is expected. The data is intact and waiting for you. Remove it with `kubectl delete pv <name>`, then reclaim the disk through your storage provider if it does not free on its own.
- **`Delete`**: a `Released` volume here is a **fault**. The provisioner should have removed the volume and its data and did not, so that disk is still allocated with nothing pointing at it. `kubectl delete pv` removes the API object but does not necessarily reclaim the underlying disk; check the provisioner's logs and your storage backend.

## Verification

```bash
epinio-dangling-pvcs
```

Empty output means nothing is dangling. If you deleted data for an application you still intend to run, push it again and confirm a **new** empty claim is provisioned. StatefulSet charts create a fresh one on the next deploy.

## Related

- [What deletion removes](../../developer/concepts/applications/applications.mdx#what-deletion-removes): Epinio's built-in `--delete-pvc` / `--delete-image` behavior
- [Storage lifecycle](../../../reference/concepts/storage.md#storage-lifecycle): capacity planning for leftover data volumes
- [Migrating from MinIO to SeaweedFS](../networking/migrate_minio_to_seaweedfs.md): the Job-based pattern for larger storage work
