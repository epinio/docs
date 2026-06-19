---
sidebar_label: "Helm Chart Options"
sidebar_position: 3
title: "Helm chart reference"
description: Reference for the Epinio Helm chart values that control server, staging, storage, identity, and registry configuration.
keywords: [epinio, helm, chart, values, configuration, installation]
doc-type: [reference]
doc-persona: [epinio-operator]
doc-topic: [epinio, reference, helm]
---

Epinio's behavior is controlled through Helm chart values. The chart lives in the
[epinio/helm-charts](https://github.com/epinio/helm-charts) repository; this page
documents the values you are most likely to set. For the install walkthrough, see
[Install Epinio](../getting-started/install-epinio.md).

## Server Configuration

- **`server.defaultTokenExpiry`**: Controls the default expiry time for auth tokens (e.g. `"30s"`, `"60s"`, `"2m"`). Use this to mitigate clock drift in environments where short-lived tokens may expire before use—for example, in staging workloads or when Kubernetes hosts have time synchronization issues. The value is capped at 5 minutes for security. Default is `"30s"`.

  ```yaml
  server:
    defaultTokenExpiry: "60s"  # Example: increase to 1 minute for clock drift
  ```

## Staging Workloads

Epinio uses staging workloads to build container images from source code.  As you can imagine, container builds can consume varying amounts of CPU, Memory, and Disk space depending on the application.  Because of this, it is important that these staging workloads can not only specify those resource amounts but also specify scheduling constraints so that your running applications can be protected from any buildtime resource consumption.  For example, you may configure your staging workloads to schedule to a particular node pool within your Kubernetes cluster that is dedicated to builds.

These configurations can be set using the `server.stagingWorkloads` section of the `values.yaml` file with which you may configure the following details:
- Resource Consumption
    - `server.stagingWorkloads.ttlSecondsAfterFinished`
        - Configure time-to-live for completed staging job resources
    - `server.stagingWorkloads.resources`
        - Provide Requests/Limits on CPU & Memory
    - `server.stagingWorkloads.storage`
        - `cache`
            - Optionally toggle `emptyDir` to bypass PVC creation
            - Provide parameters for `size`, `accessModes`, `volumeMode`, and `storageClassName`
        - `sourceBlobs`
            - Optionally toggle `emptyDir` to bypass PVC creation
            - Provide parameters for `size`, `accessModes`, `volumeMode`, and `storageClassName`
- Scheduling Constraints
    - `server.stagingWorkloads.nodeSelector`
        - Provide Node Selector labels to constrain scheduling to nodes that contain the specified label/value.
    - `server.stagingWorkloads.affinity`
        - Provide Affinity rules to constrain scheduling to nodes that meet the specified criteria.
    - `server.stagingWorkloads.tolerations`
        - Provide Tolerations to allow scheduling to nodes with matching taints.

There exists examples within the `values.yaml` file under the `server.stagingWorkloads` key.  Please review and modify these examples to suit your environmental needs.  Review these examples at the following lines:  [Epinio Helm Chart Values:  Staging Workloads](https://github.com/epinio/helm-charts/blob/4edcf8af4d6881da4162a04e532de1298f749662/chart/epinio/values.yaml#L64-L92).

The configurations under `server.stagingWorkloads` gets mapped to the build script ConfigMaps which is then processed by the Epinio Server when builds are kicked off.  These specifications are supplied to the newly created staging jobs.

## S3 storage

Epinio uses an S3 compatible storage to store the application source code.
This chart will install [SeaweedFS](https://github.com/seaweedfs/seaweedfs) when `.Values.seaweedfs.enabled` is
`true` (default).

In addition to SeaweedFS, Epinio offers [s3gw](https://s3gw.io/) as another S3 compatible store.
It is installed when `.Values.seaweedfs.enabled` is set to `false` and `.Values.s3gw.enabled` is set to `true`.

:::caution
The s3gw support is __experimental__.
The s3gw chart is configured to use a `host path` volume for storage.
This setup is risky, and not HA.
If there is an outage of the node where s3gw's pod is currently deployed, k8s will fail trying to assign the volume on another node.
:::

Both choices for internal S3 compatible storage can be configured to use a user-defined storageClass.
If no StorageClass is defined, the default storageClass is used.
When using SeaweedFS set the custom storageClass to the value of `.Values.seaweedfs.persistence.storageClass`.
When using s3gw set the custom storageClass to the value of `.Values.s3gw.storageClass.name`.

Use any external S3 compatible solution by setting `.Values.seaweedfs.enabled` to `false`
(`.Values.s3gw.enabled` is `false` by default) and using
[the values under `s3`](https://github.com/epinio/helm-charts/blob/main/chart/epinio/values.yaml)
to point to the required S3 server.

## Dex

[Dex](https://dexidp.io) OpenID Connect Provider is installed as a subchart when `.Values.global.dex.enabled` is set to `true` (default).

If you don't need to use an identity provider, set the value to `false` and use only local Epinio users. [OIDC Authentication](./security/authentication_oidc.md) has more information.

## Container Registry

When Epinio builds a container image for an application from source, it needs
to store that image in a container registry. Epinio installs a container registry
on the cluster when `.Values.containerregistry.enabled` is `true` (default).

Any container registry that supports basic auth authentication (e.g. gcr, dockerhub, etc) can be used
instead, by setting this value to `false` and using
[the relevant global values](https://github.com/epinio/helm-charts/blob/b389a4875af9f03b484a911c49a14f834ba04b64/chart/epinio/values.yaml#L107-L111)
to point to the desired container registry.

## Related

- Install walkthrough: [Install Epinio](../getting-started/install-epinio.md)
- Cluster prerequisites: [Cluster prerequisites](../how-to/operator/cluster-prerequisites.md)
