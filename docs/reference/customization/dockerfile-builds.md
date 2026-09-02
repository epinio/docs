---
title: "Dockerfile Builds"
sidebar_label: "Dockerfile Builds"
description: Configuring the image and behavior of Epinio's Dockerfile build mode.
keywords: [kubernetes, epinio, application development, dockerfile, build mode, kaniko]
doc-type: [reference]
doc-persona: [epinio-developer, epinio-operator]
doc-topic: [epinio, reference, customization, dockerfile-builds]
---

:::note
This customization interacts with the
[customization of staging scripts](./staging-scripts.md) and the
[customization of buildpacks](./staging.md).
:::

An application whose build mode is `dockerfile` is built from a Dockerfile in its own
sources instead of by Paketo [Cloud Native Buildpacks](https://buildpacks.io/). For
what that changes for the application, see
[Build modes](../concepts/build_modes.md).

Dockerfile builds are always available. There is no chart key that enables or
disables the mode.

## Build image

Dockerfile builds run [Kaniko](https://github.com/GoogleContainerTools/kaniko), which
builds a container image from a Dockerfile without a Docker daemon. To use a different
image, set the chart keys

- `image.dockerfileBuilder.registry`
- `image.dockerfileBuilder.repository`
- `image.dockerfileBuilder.tag`

The defaults are

```yaml
image:
  dockerfileBuilder:
    registry: gcr.io/
    repository: kaniko-project/executor
    tag: v1.23.2-debug
```

As with Epinio's other staging images, setting `global.cattle.systemDefaultRegistry`
overrides the `registry` key, so an air-gapped installation mirroring all Epinio
images does not need to set this key individually.

The `-debug` variant of the default image is required, not incidental: the build
script is invoked through the shell that variant provides. A replacement image must
ship a shell at `/busybox/sh` or the invocation must be adjusted along with it.

The reference is rendered into the `epinio-stage-scripts` ConfigMap as
`dockerfileBuildImage` rather than compiled into the Epinio server, so replacing the
build engine is a chart values and script change. See
[staging scripts](./staging-scripts.md) for the ConfigMap keys.

## Build behavior

The default `dockerfile-build` script runs the executor with:

- the root of the unpacked application sources as the build context;
- the application's `dockerfilePath`, defaulting to `Dockerfile`, resolved inside that
  context;
- the same destination image reference that buildpack staging would have produced, so
  the application chart deploys it unchanged;
- layer caching enabled, cached on the staging workspace volume;
- each of the application's environment variables passed as a `--build-arg`.

Build arguments are only received by builds whose Dockerfile declares a matching
`ARG`. The environment files are kept outside the build context deliberately. See
[Build modes](../concepts/build_modes.md) for why, and for the security properties
that follow from it.

To change any of this, override the `dockerfile-build` script through the
[staging scripts customization point](./staging-scripts.md).

## Staging workload configuration

Dockerfile builds reuse the staging workload configuration, including resource
requests and limits, unchanged from buildpack staging. Kaniko is typically hungrier
than the CNB lifecycle, so an installation adopting Dockerfile builds may need to
raise those defaults. They can be set per installation through the staging
configuration, or per build trigger, see
[Staging configuration override at trigger time](../../how-to/operator/cluster-config/staging_config_override.md).

## Path validation

The `dockerfilePath` of an application is validated before it reaches the build. A
path must be relative to the root of the sources, must not contain a `..` segment,
and may only use letters, digits, `.`, `_`, `-`, and `/`. The same rules are enforced
by the CLI, the API server, and the dashboard, and a rejected value fails the request
rather than falling back to a default.

## See also

- [Build modes](../concepts/build_modes.md)
- [Buildpacks](./staging.md)
- [Staging scripts](./staging-scripts.md)
- [Application manifests](../concepts/manifests.md)
