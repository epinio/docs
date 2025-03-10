---
title: "Customization point: Buildpacks"
sidebar_label: "Buildpacks"
description: Using buildpacks in Epinio.
keywords: [kubernetes, epinio, application development, buildpacks]
---

<head>
  <link rel="canonical" href="https://docs.epinio.io/references/customization/staging"/>
</head>

:::note
This customization interacts with the [customization of staging scripts](staging-scripts.md).
:::

By default, Epinio's staging process uses the [jammy full stack paketo builder image](https://github.com/paketo-buildpacks/builder-jammy-full) for Paketo [Cloud Native Buildpacks](https://buildpacks.io/).
This converts application sources into deployable application images.

To use a different builder image set the chart keys

- `image.builder.repository`
- `image.builder.tag`
- `image.builder.userid`
- `image.builder.groupid`

to the desired values before installation.

To override the builder image on an individual basis use the option `--builder-image` of the [epinio push](../commands/cli/epinio_push.md) command.

Note also the related documentation about the [supported applications](../supported_applications.md).
