---
title: ""
sidebar_label: "Buildpacks"
---

# Customization point: Buildpacks

By default Epinio's staging process uses the
[full stack paketo builder image](https://github.com/paketo-buildpacks/full-stack-release)
for Paketo [Cloud Native Buildpacks](https://buildpacks.io/) to convert application
sources into deployable application images.

To generally use a different image set the chart keys

  - `image.builder.repository`
  - `image.builder.full`

to the desired values.

To override the image on an individual basis use the option `--builder-image` of the
`epinio push` command.

Note also the related documentation about the
[supported applications](../supported_applications.md).
