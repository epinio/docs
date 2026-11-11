---
sidebar_label: "Application Builds"
title: "Application Builds"
description: "How application builds work in Epinio, and how building relates to deploying."
keywords: [epinio, application, builds, staging, deploy]
doc-type: [reference]
doc-persona: [epinio-developer, epinio-operator]
doc-topic: [epinio, reference, concepts, builds]
---

## Overview

An application build is the container image Epinio produces from an application's sources.

Deploying an application takes two stages:

  1. **Build** (also called staging). Epinio turns the application sources into a
     container image.

  2. **Deploy**. Epinio runs that image as a workload in the cluster.

`epinio (apps) push` does both in one step. Epinio also lets you run the stages
separately, building the image first and deploying it later.

## Cheat Sheet

  - `epinio app push` builds and deploys.

  - `epinio app build` builds and stores the image. It does not deploy.

  - `epinio app deploy` deploys the application's current build. It does not build anything.

Running `epinio app build` followed by `epinio app deploy` has the same end result as
`epinio app push`. The difference is that the build exists as its own step, which can be
inspected before anything is deployed.

## Applications without a workload

An application in Epinio can exist without a running workload. An application which was
built but not deployed has a stored image, but no workload. It has no running instances
and no routes serving traffic.

Each application has a *current build*. The commands `epinio app build show`,
`epinio app build delete`, and `epinio app deploy` all operate on it.

`epinio app build list` shows the applications which were built but not deployed, with
the status and image of their build.

## Sources

`epinio app build` takes the same source options as `epinio (apps) push`, and, like push,
also accepts an application manifest. See [Application Manifests](./manifests.md) for the
details of the options and the manifest format.

The sources of an application can be one of:

  - a path in the local filesystem,

  - a git repository and revision.

A container image URL is not a valid origin for a build. The image is already built, so
there is nothing to do. Use `epinio (apps) push` for such applications.

## Build modes

A build uses one of two modes, selected with `--build-mode` or with `staging.buildMode`
in a manifest, and defaulting to `buildpack`:

  - `buildpack`, building with Paketo buildpacks.

  - `dockerfile`, building from a Dockerfile in the sources.

The mode applies the same way for `epinio app build` and `epinio (apps) push`.
See [Build modes](./build_modes.md) for how the two modes differ.

## Deploying a build

`epinio app deploy` takes only the name of the application. It deploys the application's
current build and does not build anything new.

Settings describing the deployed application, i.e. routes, instances, environment
variables, bound configurations, and app chart, are given when the application is built,
or are set on the application with `epinio app update`.

## When to build separately

Use `epinio (apps) push` for the simplest path from sources to a running application.

Build and deploy separately when you want to:

  - Verify a build before it goes live, by inspecting its status and image with
    `epinio app build list` and `epinio app build show`.

  - Separate building from releasing, for example building in a pipeline and deploying
    later at a controlled time.

  - Deploy without rebuilding.

## See also

  - [Application Manifests](./manifests.md)

  - [Build modes](./build_modes.md)

  - [`epinio app build`](../cli/app/build//epinio_app_build.md)

  - [`epinio app deploy`](../cli/app/epinio_app_deploy.md)