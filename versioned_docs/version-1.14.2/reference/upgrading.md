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

This release also adds a new `BuilderImage` CRD and a `spec.origin.git.gitconfig` field on the
`apps` CRD. Helm never upgrades the contents of a chart's `crds/` directory on `helm upgrade`, so
the chart now runs a `pre-install`/`pre-upgrade` hook Job that applies the CRDs with `kubectl` and
waits for them to be established before the rest of the release. No manual `kubectl apply` is
required. See [Git Configuration](./concepts/git_configuration.md).

The upgrade blocks on this hook and fails if the Job cannot run, so make sure it can. The Job pulls
the `kubectl` image (`image.kubectl.*`; mirror it first on air-gapped or private-registry clusters),
relies on the cluster-scoped RBAC the chart creates for it to manage `CustomResourceDefinitions`,
and runs with no custom `securityContext` (a `restricted` Pod Security label on the Epinio namespace
can reject it). If an upgrade hangs or rolls back, inspect the `epinio-crd-upgrade-<release>` Job and
its logs in the Epinio namespace. If you instead manage CRDs out of band, apply the updated CRDs
yourself on upgrade so the new fields are not pruned.

App Charts, Builder Images, and Catalog Services are now manageable through the API, which adds new
authorization actions. The shipped default `user` role and the built-in roles (`view_only`,
`application_developer`, `application_manager`, `system_manager`) already include `builderimage_read`,
so a default installation picks it up automatically on upgrade.

If you use **custom roles**, add `builderimage_read` to them. It is required, not optional: it is not
implied by `app_read`, and the dashboard lists builder images both on the application create/deploy
screen and on the Builder Images page. Without it those views return `403 Forbidden`, so affected
users cannot deploy an application from the dashboard. Add the write actions only where users should
manage these resources: `builderimage_write` for Builder Images and `chart_write` to create, update,
or delete App Charts (`chart_read` is already implied by `app_read`). Creating, updating, or deleting
Catalog Services is now covered by the existing `service_write` right, so anyone granted
`service_write` can now manage the shared service catalog as well. See the
[authorization reference](./security/authorization.md#actions).

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
