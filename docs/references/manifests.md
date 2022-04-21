---
sidebar_label: "Application Manifests"
title: ""
---

# Application Manifests

## Overview

An application manifest is a YAML file containing the entire configuration of an
application as required by `epinio (apps) push` for succesful operation.

Manifests are irrelevant for all other epinio commands.

This is especially true for the commands `epinio apps create` and `epinio apps update`.
Neither of these uses manifests. They operate directly on a named application, and can
only set and modify a subset of the data provided by a manifest to `epinio (apps) push`.

## Cheat Sheet

The detailed specifications coming after this section provide the following essential ways
of pushing an application:

  1. With an explicit manifest file as argument.

  2. With a standard manifest file (`epinio.yml`) found in the current directory.

  3. With no manifest file at all. This simply uses all the defaults, except for the name,
     which has no such.

Further defaults:

  - No environment variables.
  - No bound configurations.
  - One replica/instance.
  - Standard paketo builder image (`paketobuildpacks/builder:full`).
  - Current directory for the application sources.

## Syntax `epinio (apps) push`

Outside of options `epinio (apps) push` supports only a single optional argument.
This argument is the path to the manifest file to use.

When no such path is specified the command looks for an `epinio.yml` file in the current
directory as the manifest to use.

When no manifest file is found defaults are applied.

Syntax:

  - `push [flags] [MANIFEST-PATH]`

The command does support a number of options with which the user can __override__ the
information read from the manifest. In other words, the data in the manifest is the
primary source, and the options just tweak things.

When an option is specified its value replaces the data from the manifest.
Options do not extend any manifest values.

### Options

  - `--instances`, `-i` `N`

    The application's number of desired instances/replicas.

  - `--env`, `-e` `NAME=VALUE`

    Adds the environment variable `NAME` to the application's environment, with the
    specified `VALUE`. Multiple uses of the option accumulate. In case of multiple
    assignments to the same `NAME` the last wins.

  - `--bind`, `-b` `CONFIGURATION`

    Binds the named configuration to the application. Multiple uses of the option accumulate.

__Side note__: The three preceding options are supported by the `apps create` and `apps
update` commands as well. The following options are not.

  - `--name`, `-n` `NAME`

    The application's name. When used more than once the last use wins.

The next three options specify the location of the application's sources. Only one form is
allowed. Mixing forms causes push to report an error.

  - `--path`, `-p` `SRC-PATH`

    A path in the local filesystem, the directory holding the application's sources.
    When used more than once the last use wins.

    A relative path is resolved relative to the current working directory.

  - `--container-image`, `-c` `URL`

    The url of the container image containing the ready-to-run application. In other
    words, this is a pre-staged application, not sources.
    When used more than once the last use wins.

  - `--git`, `-g` `REPO?,REV?`

    The url of the git repository holding the appliction's sources, and the revision to
    use. If the revision is not specified the head of the main branch is assumed.
    When used more than once the last use wins.

    __Note__: The comma (`,`) is used as separator between repo url and revision because
    the nicer separators (`:`, `@`) are both used in urls, making extraction difficult due
    to the ambiguities coming out of that.

The last option controls staging:

  - `--builder-image` `IMAGE`

    The name of the image to use for staging the application's sources.

## Manifest format

An application manifest is a YAML file containing a single mapping as its main structure.

The keys of this mapping specify the various elements of an application's configuration.

  - `name`. See `--name`. Required.

  - `configuration`. Optional. The value of this key is a mapping whose keys specify the
    basic configuration of the application, namely:

      - `instances`. See `--instances`. Optional. Defaults to `1`.

      - `environment`. See `--env`. Optional. Defaults to empty. The value of this key is
        a mapping whose keys are the names of the desired environment variables, and their
        desired values.

      - `configurations`. See `--bind`. Optional. Defaults to empty. The value of this keys is a
        sequence of names, for the configurations to bind.

  - `staging`. Optional. The value of this key is a mapping whose keys specify information
    controlling the application's staging.

      - `builder`. See `--builder-image`. Optional.

  - `origin`. Optional. The value of this key is a mapping whose keys specify the origin
    of the application (sources), namely:

      - `path`. See `--path`. Optional. See below.

        A relative path is resolved relative to the directory containing the manifest
        file.

      - `container`. See `--container-image`. Optional. See below.

      - `git`. See `--git`. Optional. See below. The value of this key is a mapping with
        keys `url` and `revision`, for the two part of the git reference. If revision is
        not present it defaults to the head of the repositories' main branch.

    As with the options the keys `path`, `container`, and `git` exclude each other.  Only
    one may be specified in the manifest.

    If none is specified the system defaults to `path` and the sources are expected to
    reside in the directory containing the manifest file.

    Note that specifying any of the origin options replaces any of the origin keys.
    I.e. a `--path` options replaces/displace/overides a `container` key. Etc.

Last, in case it was missed reading the descriptions above, `name` is the only required
key in a manifest file. The same as the `NAME` argument of pre-manifest `push` was the
only required argument.

### Example

```
name: zanzibar
configuration:
  instances: 333
  configurations:
  - snafu
  environment:
    DOGMA: "no"
staging:
  builder: "paketobuildpacks/builder:tiny"
origin:
  path: /somewhere/over/there

```
