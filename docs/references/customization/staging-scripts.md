---
title: "Customization point: Staging scripts"
sidebar_label: "Staging scripts"
description: Using staging scripts with Epinio.
keywords: [epinio, application development, staging scripts, kubernetes]
---

# Customization point: Staging Scripts

## Overview

:::note
This customization interacts with the
[customization of buildpacks](staging.md).
:::

Epinio uses staging scripts to interact with Paketo [Cloud Native Buildpacks](https://buildpacks.io/).

Epinio automatically selects the set of staging scripts based on the name of the chosen builder
image, and the images supported by a specific definition.

By default Epinio installs three definitions.

  1. One to support Bionic-based builder images (`paketo-buildpacks/builder:*`).
  1. One to support Jammy-based  builder images (`paketo-buildpacks/builder-jammy-*:*`).
  1. One to serve as fallback for any images not captured by the other two.

It is this last definition which is configured when [customizing buildpacks](staging.md)
with a different image.

By default this fallback is configured for Jammy-based images in general, and the
[jammy full stack paketo builder image](https://github.com/paketo-buildpacks/builder-jammy-full)
in particular

## Specification

A set of staging scripts is represented by a kubernetes ConfigMap resource labeled
with `app.kubernetes.io/component: epinio-staging`.

This ConfigMap is expected to have the following keys:

|Key		|Content   |
|---		|---	   |
|`builder`	|Glob-pattern to match the image references supported by this spec.	|
|`userID`	|User ID to run the `build` script with.				|
|`groupID`	|Group ID to run the `build` script with.				|
|||
|`base`		|Optional redirect to the actual ConfigMap with the scripts.		|
|||
|`build`	|Shell script to compile the unpacked sources into an image.		|
|		|Executed using the chosen builder image      	      			|
|`downloadImage`|Container image to run the `download` script with.			|
|`download`	|Shell script to retrieve the app sources from the Epinio's S3 storage.	|
|		|Executed using the `downloadImage`.      	      			|
|`unpackImage`	|Container image to run the `unpack` script with.			|
|`unpack`	|Shell script to unpack the app sources into a directory tree.		|
|		|Executed using the `unpackImage`.      	      			|

When `base` is specified it refers to a ConfigMap which contains all the keys listed after `base`.

If `base` and any of the keys listed after it are specified in the same resource then `base` has
priority.

This mechanism allows the sharing of script and image data between specifications differing only in
the user/group required to run the `build` script.

:::info
User and group IDs, and general support for multiple staging scripts, was added because
the Bionic and Jammy-based builders use different numeric ids for their `cnb` user.
:::

### Staging script API, Download

The `download` script is executed using the `downloadImage` and further configured
with four environment variables:

|Name	  	|Content						|
|---	  	|---							|
|`PROTOCOL`	|S3 storage, protocol					|
|`ENDPOINT`	|S3 storage, primary endpoint				|
|`BUCKET`	|S3 storage, name of bucket to read			|
|`BLOBID`	|S3 storage, blod id/name of app sources, in the bucket	|

### Staging script API, Unpack

The `unpack` script is executed using the `unpackImage` and further configured
with a single environment variable:

|Name	  	|Content							|
|---	  	|---								|
|`BLOBID`	|blob id / file name of the app source archive to unpack	|
|`USERID`	|Numeric id of the `cnb` user used to run the `build` script	|
|`GROUPID`	|Numeric id of the user group used to run the `build` script	|

### Staging script API, Build

The `build` script is executed using the using the chosen builder image and further configured with
a two environment variables:

|Name	  	|Content					|
|---	  	|---						|
|`PREIMAGE`	|url to the result image from a previous push	|
|`APPIMAGE`	|url to save the new application image under	|
|`USERID`	|Numeric id of the `cnb` user used to run the `build` script	|
|`GROUPID`	|Numeric id of the user group used to run the `build` script	|

When present the `PREIMAGE` is used by `/cnb/lifecycle/creator` as a cache for layers,
speeding up compilation.

## Search

Epinio determines the set of staging scripts to use by glob-matching the chosen builder image (name
__and__ tag) against the `builder` key of all found specifications and selecting the first matching.

To ensure a deterministic search order the specifications are sorted lexicographically by name.

The exception to the above are specifications with `builder == "*"` or `builder == ""`.  These
specifications match everything and the last found is used as the fallback if and only if no other
specification matched.

If no specification matched, and no fallback was found, staging fails.
