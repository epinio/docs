---
sidebar_label: "Cleaning up stale caches"
sidebar_position: 28
title: "Cleaning up stale caches"
description: How to periodically purge stale caches on Persistent Volumes (PVs) related to application pods.
keywords: [epinio, kubernetes, maintenance, cache, cleanup, persistent volumes]
doc-type: [how-to]
doc-topic: [epinio, customize, operations, cache-cleanup]
---

Epinio provides a maintenance API endpoint to clean up stale caches on Persistent Volumes (PVs) related to application pods. This helps maintain data hygiene by automatically removing caches that have been unused for an extended period.

## Overview

The cleanup process identifies caches that have been stale for a specified number of days (default: 30 days) by comparing the last build time and creation time. Caches that exceed the stale threshold are invalidated (deleted).

## API Endpoint

The cleanup endpoint is available at:

```
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

The API requires **admin-level** authentication. Only users with admin privileges can access this endpoint. You can get your credentials using:

```console
epinio config show
```

## Usage Examples

### Using curl with GET request (query parameters)

```console
curl -u username:password \
  "http://epinio-server/api/v1/maintenance/cleanup-stale-caches?staleDays=30&checkAppExists=true&dryRun=false"
```

### Using curl with POST request (JSON body)

```console
curl -u username:password \
  -X POST "http://epinio-server/api/v1/maintenance/cleanup-stale-caches" \
  -H "Content-Type: application/json" \
  -d '{"staleDays": 30, "checkAppExists": true, "dryRun": false}'
```

### Dry run mode

To preview what would be deleted without actually deleting anything:

```console
curl -u username:password \
  -X POST "http://epinio-server/api/v1/maintenance/cleanup-stale-caches" \
  -H "Content-Type: application/json" \
  -d '{"staleDays": 30, "checkAppExists": true, "dryRun": true}'
```

## Automated Cleanup with Kubernetes CronJob

You can automate the cleanup process by creating a Kubernetes CronJob that runs periodically. This example runs daily at 2 AM:

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

### Applying the CronJob

Save the above YAML to a file (e.g., `cache-cleanup-cronjob.yaml`) and apply it:

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

If your Epinio server requires authentication, you'll need to provide credentials. You can use a Kubernetes Secret:

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
