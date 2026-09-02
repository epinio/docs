---
sidebar_label: "Build Modes"
title: "Build Modes: Buildpacks and Dockerfiles"
sidebar_position: 7
description: How Epinio's two build modes differ, and what changes about environment variables, the build context, and isolation when you build from a Dockerfile.
keywords: [epinio, build mode, buildpack, dockerfile, staging, kaniko, build args]
doc-type: [explanation]
doc-persona: [epinio-developer, epinio-operator]
doc-topic: [epinio, reference, concepts, build-modes]
---

Epinio turns application sources into a container image during staging. It can do
that two ways, and the application chooses which one through its build mode. This
page explains what actually differs between them, so you can pick one and know what
to expect from it.

For the task of setting a build mode, see the
[applications how-to guide](../../how-to/developer/concepts/applications/applications.mdx).
For the exact keys and flags, see
[application manifests](./manifests.md) and
[Dockerfile builds](../customization/dockerfile-builds.md).

## The two modes

**`buildpack`** is the default, and it is what Epinio has always done. Epinio hands
your sources to a [Cloud Native Buildpacks](https://buildpacks.io/) builder image,
which detects the language and framework, chooses buildpacks, and assembles the
image for you. You write no packaging code. In exchange, you accept the builder's
opinion about how your application should be built and run. The builder image is
selectable per application, so you can swap in a different stack or a
[custom builder](../../how-to/operator/customization/custom_builder.md).

**`dockerfile`** builds the image from a Dockerfile in your own sources. Epinio runs
a Dockerfile build engine over your source tree and pushes the result to the same
registry, under the same image reference, that buildpack staging would have used.
Everything downstream is identical: the same application chart deploys it, the same
routes, services, and configurations attach to it.

The mode is a property of the application's sources, so it is only meaningful for
source types that Epinio builds: archives, local folders, and git. An application
deployed from an existing container image has no build step at all, and therefore no
build mode.

## Why you would choose Dockerfile mode

Buildpacks are the better default for most applications, and choosing Dockerfile
mode means giving up automatic base image updates, automatic dependency caching
strategy, and the SBOM and rebase support that come with the CNB lifecycle.

The reasons to accept that trade are concrete:

- Your application already has a Dockerfile that is the source of truth for how it
  is built, and duplicating that knowledge as buildpack configuration is worse than
  reusing it.
- Your build needs a step no buildpack performs: compiling a native extension,
  pulling a private toolchain, generating code, or assembling several artifacts.
- Your language or framework has no buildpack you trust, or the detection order
  fights you.
- You need exact control over the final image contents, for example to satisfy a
  base image policy that the available builders do not meet.

If none of those apply, stay on buildpacks.

## Environment variables reach the build as build arguments

This is the difference most likely to surprise you.

In buildpack mode, the application's environment variables are written into the
build environment, and buildpacks that care about them read them directly. In
Dockerfile mode, a Docker build does not read files as environment, so Epinio passes
each of the application's environment variables to the build as a
`--build-arg NAME=value` instead.

The consequence is that a variable only reaches your build if your Dockerfile
declares a matching `ARG`. The build engine ignores every build argument the
Dockerfile does not declare. This is the same contract used by GitHub Actions,
GitLab CI, and Cloud Build, and it is opt-in per variable on your side:

```dockerfile
FROM golang:1.23 AS build
ARG BUILD_FLAVOR
WORKDIR /src
COPY . .
RUN go build -tags "${BUILD_FLAVOR}" -o /app ./cmd/server
```

Pushing that application with `BUILD_FLAVOR` set in its environment makes the value
available to the `RUN` step. An environment variable you never declare as an `ARG`
simply does not participate in the build.

Runtime environment is unaffected. The application's environment variables are still
injected into the running workload by the application chart, in both modes,
regardless of what the Dockerfile declares. `ARG` controls build-time visibility
only.

## Nothing Epinio generates enters the build context

Epinio's build context is the root of your uploaded sources, and Epinio deliberately
writes nothing into it. The files holding the application's environment live one
directory above the context, outside of it.

That placement is the reason the build argument mechanism above exists rather than
something more convenient. `COPY . .` is the opening line of most real Dockerfiles,
so anything Epinio placed in the context would be baked into a pushed image layer.
Epinio environment variables routinely hold database passwords and API keys, and an
image layer is not a place to keep them.

Build arguments are safer here than general Docker advice suggests, because the
engine Epinio uses does not record build argument values in image config history,
unlike `docker build`, which embeds them in `RUN` history lines. They are still
visible to any process inside your own build, so treat them as you would any
build-time credential.

There is no `RUN --mount=type=secret` equivalent available in Dockerfile mode. If
your build needs a credential that must not be a build argument, fetch it at runtime
instead, from a bound [configuration](./configurations.md) or
[service](./services.md).

## Dockerfile builds are less isolated

Buildpack staging executes only trusted lifecycle binaries, as a non-root user.
Dockerfile staging is the first time user-authored code runs inside the staging pod,
and `RUN` steps execute as root there.

Operators should read that as follows: in a namespace where you would not trust a
tenant with root inside the build, do not enable Dockerfile mode for that tenant.
Anything mounted into the build container is readable by the build. Epinio narrows
this where it can, and notably does not expose the installation's object storage
credentials to the build container, but the general property stands.

Builds are also hungrier than the buildpack lifecycle, and they reuse the staging
resource configuration as-is. If Dockerfile builds are being killed or throttled,
raise the staging resources rather than the application's.

## Path handling

The Dockerfile path is relative to the root of your sources and defaults to
`Dockerfile`. Epinio rejects absolute paths, any path containing a `..` segment, and
any character outside letters, digits, `.`, `_`, `-`, and `/`. The restriction keeps
the value from escaping the build context or breaking the staging scripts, and it is
enforced identically by the CLI, the API, and the dashboard.

When you push from a local folder, the CLI additionally checks that the Dockerfile
exists before uploading anything, so a typo fails immediately instead of at build
time. Pushes from an archive or from git are validated in the staging job, where the
sources are first available.

## See also

- [Applications](../../how-to/developer/concepts/applications/applications.mdx), for setting the build mode in the dashboard or the CLI
- [Application manifests](./manifests.md), for the `staging` keys
- [Dockerfile builds](../customization/dockerfile-builds.md), for the chart keys operators configure
- [Buildpacks](../customization/staging.md), for configuring the default builder image
- [Supported applications](./supported_applications.md)
