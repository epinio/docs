---
title: ""
sidebar_label: "Image Storage"
---

# Customization point: Image Storage

Epinio's staging process saves the generated application images to a docker compatible
registry.

By default Epinio uses the regular [docker registry](https://docs.docker.com/registry/) as
the store, as an internal component.

To use an external docker compatible registry it is necessary to

  - Set chart key `containerregistry.enabled=false`, and
  - the various registry keys, i.e.

      - `global.registryURL`
      - `global.registryUsername`
      - `global.registryPassword`
      - `global.registryNamespace`

    to suitable values.

__Note__ Do not confuse this registry with whatever registry is used to retrieve Epinio's
own images when Epinio is deployed.
