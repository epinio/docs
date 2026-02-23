---
title: "Customization point: Buildpacks"
sidebar_label: "Buildpacks"
description: Using buildpacks in Epinio.
keywords: [kubernetes, epinio, application development, buildpacks]
---

:::note
This customization interacts with the [customization of staging scripts](staging-scripts.md).
:::

Epinio uses [Cloud Native Buildpacks](https://buildpacks.io/) to convert application sources into deployable container images.
By default, staging uses the [Paketo jammy full stack builder image](https://github.com/paketo-buildpacks/builder-jammy-full).
You can use any compatible buildpack builder image—including non-Paketo and custom builders—by configuring the default builder or overriding it per push.

### Default builder image

To set a different default builder image for the cluster, set these chart keys before installation:

- `image.builder.repository`
- `image.builder.tag`
- `image.builder.userid`
- `image.builder.groupid`

### Override per push

To use a different builder image for a single application, use the `--builder-image` option of [epinio push](../commands/cli/epinio_push.md), or set `staging.builder` in your [application manifest](../manifests.md).

### Using non-Paketo buildpacks

Epinio supports any [Cloud Native Buildpack](https://buildpacks.io/) builder image, not only Paketo. For example:

- **Custom builders**: Build your own builder with [`pack`](https://buildpacks.io/docs/tools/pack/) and use it with `--builder-image` or in the manifest. See [Deploying a complex application with a custom builder](../../tutorials/custom_builder_go.md).
- **Other ecosystems**: Use builder images from other buildpack ecosystems (e.g. Heroku-style or other CNB-compatible builders) by setting the default builder at install time or `--builder-image` / `staging.builder` when pushing.

The staging job runs the builder image you specify; Epinio selects the appropriate [staging scripts](staging-scripts.md) based on the builder image name (with a fallback for images that do not match Paketo patterns).

See also [supported applications](../supported_applications.md).
