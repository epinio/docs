---
title: "Buildpacks"
sidebar_label: "Buildpacks"
description: Using buildpacks in Epinio.
keywords: [kubernetes, epinio, application development, buildpacks]
doc-type: [reference]
doc-persona: [epinio-developer, epinio-operator]
doc-topic: [epinio, reference, customization, staging]
---

:::note
This customization interacts with the [customization of staging scripts](./staging-scripts.md).
:::

:::note
This page covers the `buildpack` build mode, which is the default. Applications built
from a Dockerfile do not use a builder image at all, see
[Dockerfile builds](./dockerfile-builds.md).
:::

:::info Trigger-time overrides
You can override staging workload configuration (resources, nodeSelector, tolerations, affinity, TTL, storage, and more) at build trigger-time via the staging API, without changing ConfigMap defaults. See [Staging configuration override at trigger time](../../how-to/operator/cluster-config/staging_config_override.md).
:::

By default, Epinio's staging process uses the [jammy full stack paketo builder image](https://github.com/paketo-buildpacks/builder-jammy-full) for Paketo [Cloud Native Buildpacks](https://buildpacks.io/).
This converts application sources into deployable application images.

To use a different builder image set the chart keys

- `image.builder.repository`
- `image.builder.tag`
- `image.builder.userid`
- `image.builder.groupid`

to the desired values before installation.

To override the builder image on an individual basis use the option `--builder-image` of the [epinio push](../cli/epinio_push.md) command.

Note also the related documentation about the [supported applications](../concepts/supported_applications.md).

## See also

- [Build modes](../concepts/build_modes.md)
- [Dockerfile builds](./dockerfile-builds.md)
- [Staging scripts](./staging-scripts.md)
