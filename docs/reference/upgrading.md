---
sidebar_label: Upgrading Epinio
sidebar_position: 5
title: Upgrading Epinio
description: Breaking changes and migration steps when upgrading Epinio between versions.
keywords: [epinio, upgrade, migration, breaking changes, versions]
doc-type: [reference]
doc-persona: [epinio-operator]
doc-topic: [epinio, reference, upgrade]
---

Review the breaking changes and migration steps for your target version before
upgrading. For the full list of releases and their release notes, see
[versions](../versions.md).

## 1.13.X and 1.14.0 to 1.14.1

Git configuration handling changed. Selecting a configuration when deploying from a **private**
repository is now **explicit**: Epinio no longer implicitly matches a stored configuration to a
repository URL at push time.

- **New private-repo pushes must select a git configuration.** In the dashboard, choose one in the
  application's Git source. From the CLI or automation, the git origin must carry
  `origin.git.gitconfig`; a push that sends no configuration clones unauthenticated and fails with
  `authentication required`.
- **Existing applications keep working.** On redeploy, a compatibility fallback still matches
  configuration-less apps to a stored configuration by repository URL, so they continue to clone as
  before.
- **Credentials are bound to their instance host.** A configuration's credentials are only sent to
  the host it is scoped to; selecting a configuration whose host does not match the repository is
  rejected.
- **Global configurations are administrator-only to create.** Non-admin users can use global
  configurations but cannot create them.

This release also adds a `spec.origin.git.gitconfig` field to the `apps` CRD. If you install CRDs
from the Helm chart's `crds/` directory out of band, apply the updated CRD on upgrade so the field
is not pruned. See [Git Configuration](./concepts/git_configuration.md).

## 1.13.X to 1.14.0

There are no breaking changes in this release. Documentation around performance was
added: see [performance tuning](../how-to/operator/operations/performance_tuning.md) for best
practices and recommendations for optimizing Epinio performance.

## 1.12 and 1.13.X to 1.13.10

Epinio **1.13.10** replaces MinIO with SeaweedFS as the default S3-compatible storage solution.

- **External S3 users**: No action needed. Remove any `minio.*` Helm values and upgrade.
- **Internal MinIO users**: Back up your source blobs before upgrading and restore them to SeaweedFS after. MinIO resources are removed automatically during the Helm upgrade. See the [MinIO to SeaweedFS migration guide](../how-to/operator/networking/migrate_minio_to_seaweedfs) for step-by-step instructions.

See the [SeaweedFS how-to](../how-to/operator/cluster-config/seaweedfs) for information on accessing the internal S3 service.

User permissions changed in **1.13.10**. While fully backwards compatible,
additional user-right actions and default installed roles were added. See the
[authorization documentation](./security/authorization.md#built-in-role-examples).

## 1.12 and 1.13.7 to 1.13.8

Epinio **1.13.8** switches from kubed to
[reflector](https://github.com/emberstack/kubernetes-reflector) for syncing
ConfigMaps and Secrets across namespaces, because kubed is deprecated and
unmaintained.

If you are upgrading from **1.13.7** or earlier to **1.13.8** or later, you must
manually uninstall kubed from your cluster after the upgrade completes.

You can view the changes in these files:

- [registry-secret.yaml](https://github.com/epinio/helm-charts/blob/main/chart/epinio/templates/registry-secret.yaml)
- [certificate.yaml](https://github.com/epinio/helm-charts/blob/main/chart/epinio/templates/certificate.yaml)
- [values.yaml](https://github.com/epinio/helm-charts/blob/main/chart/epinio/values.yaml)

By default all namespaces are allowed, but the reflector can be customized for your
deployment. If you were not customizing kubed previously, no action is needed other
than uninstalling kubed.

## 1.12 to 1.13

Epinio 1.13 rehomes configuration for staging workloads to a more
Kubernetes-standardized format that supports a wider variety of configs. These are
no longer set via environment variables on the Epinio Server or through CLI flags;
they are read from an in-cluster ConfigMap at staging time.

Documentation has been updated for both the
[Epinio Server](https://github.com/epinio/epinio?tab=readme-ov-file#112-to-113) and
the [Epinio Helm chart](https://github.com/epinio/helm-charts/tree/main/chart/epinio#112-to-113).
Refer to these before upgrading to **1.13**.
