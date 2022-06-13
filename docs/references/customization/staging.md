---
title: ""
sidebar_label: "Buildpacks"
---

# Customization point: Buildpacks

By default Epinio's staging process uses the full builder image for Paketo buildpacks to
convert application sources to deployable application images.

To generally use a different image set the chart keys

  - `image.builder.repository`
  - `image.builder.full`

to the desired values.

To override the image on an individual basis use the option `--builder-image` of the
`epinio push` command.
