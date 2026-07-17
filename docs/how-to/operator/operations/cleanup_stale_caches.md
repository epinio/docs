---
sidebar_label: "Cleaning up stale caches"
sidebar_position: 28
title: "Cleaning up stale caches"
description: How the stale-cache cleanup CronJob ships with Epinio, and how operators use the UI or CLI to run and verify cleanup.
keywords: [epinio, kubernetes, maintenance, cache, cleanup, cronjob, persistent volumes]
doc-type: [how-to]
doc-persona: [epinio-operator]
doc-topic: [epinio, how-to, operations, cache-cleanup]
---

Epinio provides a maintenance API endpoint to clean up stale caches on Persistent Volume Claims (PVCs) related to application pods. This helps maintain data hygiene by automatically removing caches that have been unused for an extended period.

The recommended way to run cleanup on a schedule is to enable the **CronJob shipped with the Epinio Helm chart**. Operators can also trigger cleanup manually from the **CLI** (`curl`, `kubectl`) or inspect the CronJob from a **cluster UI** (for example Rancher).

:::note Admin only

The maintenance API requires **admin** credentials. Non-admin users cannot call this endpoint.

:::

## Overview

The cleanup process identifies caches that have been stale for a specified number of days (default: 30 days) by comparing the last build time and creation time. Caches that exceed the stale threshold are invalidated (deleted).

## API Endpoint

The cleanup endpoint is available at:

```text
POST /api/v1/maintenance/cleanup-stale-caches
GET  /api/v1/maintenance/cleanup-stale-caches
```

Both endpoints support the same functionality:

- **POST**: Accepts parameters in JSON body (recommended for complex configurations)
- **GET**: Accepts parameters as query strings (useful for cron jobs and simple scripts)

### Parameters

- `staleDays` (integer, optional): Number of days after which a cache is considered stale. Default is 30 days.
- `checkAppExists` (boolean, optional): If `true`, only delete caches for applications that no longer exist. This prevents deleting caches for active applications. Default is `true` for safety.
- `dryRun` (boolean, optional): If `true`, the endpoint will only report what would be deleted without actually deleting anything. Default is `false`.

### Authentication

The API requires **admin-level** authentication. Use an admin account from your Epinio installation. To inspect CLI connection settings (API URL, user), run:

```console
epinio settings show
```

See [epinio settings show](../../../reference/cli/settings/epinio_settings_show.md).

## Configuring automated cleanup via the Helm chart

The recommended way to run cleanup automatically is to enable it in the Epinio Helm chart. This ships a CronJob with Epinio and avoids maintaining CronJob YAML by hand.

When installing or upgrading Epinio with the [Helm chart](../../../reference/helm.md), set:

```yaml
staleCacheCleanup:
  enabled: true
  schedule: "0 2 * * *"   # Daily at 2 AM (cron format)
  staleDays: 30
  checkAppExists: true
  credentialsSecret: "epinio-cache-cleanup-credentials"
```

You must create a Secret in the Epinio namespace with the API credentials used by the CronJob:

```bash
kubectl create secret generic epinio-cache-cleanup-credentials -n epinio \
  --from-literal=username=admin \
  --from-literal=password=YOUR_ADMIN_PASSWORD
```

Then install or upgrade with the chart, for example:

```bash
helm upgrade --install epinio epinio/epinio -n epinio \
  --set staleCacheCleanup.enabled=true \
  --set staleCacheCleanup.schedule="0 2 * * *"
```

If you use a custom Secret name, set `staleCacheCleanup.credentialsSecret` to that name.

## Using the UI

The Epinio dashboard does not include a dedicated stale-cache cleanup screen. To work with the shipped CronJob in a UI, use your Kubernetes cluster manager:

1. Open **CronJobs** (for example Rancher **Explore Cluster** → **Workloads** → **CronJobs**).
2. Select the Epinio namespace (often `epinio`).
3. Open the stale-cache cleanup CronJob (label `app.kubernetes.io/component=stale-cache-cleanup`).
4. Review the schedule and open **Jobs** created by the CronJob.
5. Open a Job pod and read **Logs** for the JSON API response (`deletedCount`, `staleCaches`, `dryRun`).

To run cleanup once without waiting for the schedule, use **Run now** / **Create Job** from the CronJob actions (wording depends on the UI), then inspect the new Job logs.

## Using the CLI

### Call the API with curl

GET with query parameters:

```console
curl -u username:password \
  "https://<EPINIO_API>/api/v1/maintenance/cleanup-stale-caches?staleDays=30&checkAppExists=true&dryRun=false"
```

POST with a JSON body:

```console
curl -u username:password \
  -X POST "https://<EPINIO_API>/api/v1/maintenance/cleanup-stale-caches" \
  -H "Content-Type: application/json" \
  -d '{"staleDays": 30, "checkAppExists": true, "dryRun": false}'
```

Dry run (recommended first):

```console
curl -u username:password \
  -X POST "https://<EPINIO_API>/api/v1/maintenance/cleanup-stale-caches" \
  -H "Content-Type: application/json" \
  -d '{"staleDays": 30, "checkAppExists": true, "dryRun": true}'
```

Dry run from inside the cluster:

```console
kubectl run curl --rm -it --restart=Never --image=curlimages/curl -n epinio -- \
  curl -u admin:YOUR_PASSWORD \
    "http://epinio-server.epinio.svc.cluster.local:8030/api/v1/maintenance/cleanup-stale-caches?staleDays=30&checkAppExists=true&dryRun=true"
```

### Inspect the Helm-managed CronJob

```console
kubectl get cronjob -n epinio -l app.kubernetes.io/component=stale-cache-cleanup
kubectl get jobs -n epinio -l app.kubernetes.io/component=stale-cache-cleanup
```

Force a one-off run and read logs:

```console
kubectl create job -n epinio stale-cache-manual --from=cronjob/<CRONJOB_NAME>
kubectl logs -n epinio job/stale-cache-manual
```

## Automated cleanup with a manual Kubernetes CronJob

If you prefer not to use the Helm chart option, you can create a CronJob yourself. This example runs daily at 2 AM:

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: epinio-cache-cleanup
  namespace: epinio
spec:
  schedule: "0 2 * * *"  # Run daily at 2 AM
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: cleanup
            image: curlimages/curl:latest
            command:
            - /bin/sh
            - -c
            - |
              curl -u ${EPINIO_USERNAME}:${EPINIO_PASSWORD} \
                -X POST "http://epinio-server.epinio.svc.cluster.local/api/v1/maintenance/cleanup-stale-caches" \
                -H "Content-Type: application/json" \
                -d '{"staleDays": 30, "checkAppExists": true, "dryRun": false}'
          restartPolicy: OnFailure
```

Save the YAML (for example `cache-cleanup-cronjob.yaml`) and apply it:

```console
kubectl apply -f cache-cleanup-cronjob.yaml
```

### Customizing the schedule

You can adjust the schedule using [cron syntax](https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/#cron-schedule-syntax). For example:

- `"0 2 * * *"` - Daily at 2 AM
- `"0 0 * * 0"` - Weekly on Sunday at midnight
- `"0 0 1 * *"` - Monthly on the 1st at midnight
- `"0 */6 * * *"` - Every 6 hours

### Adding authentication

Store credentials in a Kubernetes Secret:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: epinio-credentials
  namespace: epinio
type: Opaque
stringData:
  username: your-username
  password: your-password
```

Then update the CronJob to use the secret:

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: epinio-cache-cleanup
  namespace: epinio
spec:
  schedule: "0 2 * * *"
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: cleanup
            image: curlimages/curl:latest
            env:
            - name: EPINIO_USERNAME
              valueFrom:
                secretKeyRef:
                  name: epinio-credentials
                  key: username
            - name: EPINIO_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: epinio-credentials
                  key: password
            command:
            - /bin/sh
            - -c
            - |
              curl -u ${EPINIO_USERNAME}:${EPINIO_PASSWORD} \
                -X POST "http://epinio-server.epinio.svc.cluster.local/api/v1/maintenance/cleanup-stale-caches" \
                -H "Content-Type: application/json" \
                -d '{"staleDays": 30, "checkAppExists": true, "dryRun": false}'
          restartPolicy: OnFailure
```

## Response Format

The API returns a JSON response with the following structure:

```json
{
  "deletedCount": 5,
  "staleCaches": [
    {
      "pvcName": "namespace-cache-appname-abc123",
      "appName": "appname",
      "appNamespace": "namespace",
      "lastBuildTime": "2024-01-01T00:00:00Z",
      "daysSinceBuild": 35
    }
  ],
  "errors": [],
  "dryRun": false
}
```

- `deletedCount`: Number of cache PVCs successfully deleted
- `staleCaches`: Array of cache information for all stale caches found
- `errors`: Array of error messages if any deletions failed
- `dryRun`: Whether the operation was a dry run

## Best Practices

1. **Start with dry run**: Always test with `dryRun: true` first to see what would be deleted.
2. **Use checkAppExists**: Keep `checkAppExists: true` (the default) to prevent deleting caches for active applications. Only set it to `false` if you explicitly want to delete caches for apps that still exist.
3. **Regular cleanup**: Set up a CronJob to run cleanup periodically to prevent cache accumulation.
4. **Monitor results**: Check the API response to understand how many caches were cleaned up and review any errors.
5. **Adjust staleDays**: Depending on your workload, you may want to adjust the `staleDays` parameter. Longer periods preserve more caches but use more storage.
6. **Schedule during low activity**: Run cleanup during off-peak hours to minimize impact on active builds.

## Safety Features

- **App existence check**: By default, the cleanup only deletes caches for applications that no longer exist, preventing accidental deletion of caches for active apps.
- **Dry-run mode**: Test cleanup operations without actually deleting anything.
- **Error handling**: Errors are collected and returned in the response, but don't stop the cleanup process for other caches.
- **Admin-only access**: The endpoint requires admin-level authentication to prevent unauthorized cleanup operations.

## See also

- [Helm chart reference](../../../reference/helm.md)
- [Download report](./download_report.md)
