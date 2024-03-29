---
sidebar_label: "Application Export And Transfer"
sidebar_position: 40
title: ""
---

# Transfer of an Epinio Application to another cluster

Epinio provides the ability to export all parts of a running application and then use these to run
the application in a different cluster.

Note however that the above only applies to the core application itself, and not to configurations
and services it may need / be bound to in the origin cluster.

## Export

Exporting an application `APP` is trivially done by running the command

```
epinio app export APP /path/to/a/directory/of/your/choice/
```

After the command has run the chosen directory contains the 3 parts of the application needed to run
it elsewhere, namely:

  - `app-image.tar`. The application's runtime image as generated by the staging process and saved
    into a tar archive as generated by `docker save`.

  - `app-chart.tar.gz`. The [application chart](../customization/create_custom_appcharts.md) used to deploy the
    application.

  - `values.yaml`. The configuration of the application chart. This part references the application
    image. Beware, this reference is only valid for the origin cluster.

## Import

To import `APP` into a new cluster

  1. Run `docker load app-image.tar` to import the image and its layers into the local docker
     setup. The output will contain a line referencing the `Loaded image ID`. This is the hash of
     the loaded image and needed in the next step.

     __Beware__. Do not use `docker import`, nor `docker image import` for this. While these
     commands do store the image into the local docker similar to `load` they do not preserve the
     layering, nor the Entrypoint information coming with these. It is the latter which makes the
     result unusable for our purposes.

  2. Run `docker tag HASH REGISTRY/ORG/NAME:TAG` where `HASH` is the hash of the image as reported
     by the previous step. `REGISTRY`, etc. are mostly arbitrary values chosen by the importer. The
     `REGISTRY` is optional, i.e. would default to dockerhub. If set it has to refer to an actual
     registry the destination cluster is able to pull from.

  3. Run `docker push REGISTRY/ORG/NAME:TAG` to save the image to the chosen registry. Without this
     step the image would only exist locally and could not be pulled later.

  4. Edit the `imageURL` field in the file `values.yaml` to replace the existing image reference,
     valid only for the origin cluster, with `REGISTRY/ORG/NAME:TAG`.

  5. Edit the `domain`/`id` information of the `routes` section of `values.yaml` to prevent clashes
     with the instance of `APP` running on the origin cluster. This will of course not be necessary
     if `APP` was not kept running on the origin cluster.

  6. Possibly edit the `appName` field in `values.yaml`.

  7. Run `helm upgrade --install NAME app-chart.tar.gz --values values.yaml` to deploy the modified
     application on the destination cluster under an arbitrarily chosen release name.
