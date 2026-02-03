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

Epinio uses staging scripts to interact with [Cloud Native Buildpacks](https://buildpacks.io/).

Epinio automatically selects the set of staging scripts based on the name of the chosen builder
image, and the images supported by a specific definition.

By default Epinio installs three definitions.

  1. One to support Bionic-based builder images (`paketo-buildpacks/builder:*`).
  1. One to support Jammy-based  builder images (`paketo-buildpacks/builder-jammy-*:*`).
  1. One to serve as fallback for any images not captured by the other two.

It is this last definition which is configured when [customizing buildpacks](staging.md)
with a different image.

By default this fallback is configured for Jammy-based images in general, and the
[jammy full stack Cloud Native Buildpacks builder image](https://github.com/paketo-buildpacks/builder-jammy-full)
in particular

## Specification

A set of staging scripts is represented by a kubernetes ConfigMap resource labeled
with `app.kubernetes.io/component: epinio-staging`.

This ConfigMap is expected to have the following keys:

|Key		|Content   |
|---		|---	   |
|`builder`	|Glob-pattern to match the image references supported by this spec.	|
|`userID`	|User ID to run the `build` script with (as string, e.g., "1001").				|
|`groupID`	|Group ID to run the `build` script with (as string, e.g., "1000").				|
|`env`		|Standard environment for the scripts, YAML-formatted string, key/value map.	|
|`staging-values.json`|Optional JSON object containing Helm values for staging workload configuration (resources, nodeSelector, tolerations, etc.). When omitted, no custom workload configuration is applied.	|
|||
|`base`		|Optional redirect to the actual ConfigMap with the scripts.		|
|||
|`build`	|Shell script to compile the unpacked sources into an image.<br/>Executed using the chosen builder image	|
|`downloadImage`|Container image to run the `download` script with.			|
|`download`	|Shell script to retrieve the app sources from the Epinio's S3 storage.<br/>Executed using the `downloadImage`	|
|`unpackImage`	|Container image to run the `unpack` script with.			|
|`unpack`	|Shell script to unpack the app sources into a directory tree.<br/>Executed using the `unpackImage`	|

When `base` is specified it refers to a ConfigMap which contains all the keys listed after `base`.

If `base` and any of the keys listed after it are specified in the same resource then `base` has
priority.

This mechanism allows the sharing of script and image data between specifications differing only in
the user/group/environment required to run the `build` script.

:::info
User and group IDs, and general support for multiple staging scripts, was added because
the Bionic and Jammy-based builders use different numeric ids for their `cnb` user.

Env was added as the different builders may require different values for the `CNB_PLATFORM_API`
environment variable.
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

## Creating New Stage Scripts

Administrators can add new stage scripts for different build packs using two methods:

### Method 1: Using Helm Values (Recommended)

The easiest way to add new stage scripts is through Helm values. This approach allows you to add scripts without modifying the Helm chart templates. The Helm chart will automatically create ConfigMaps from these values during installation or upgrade.

Add your custom stage scripts to your `values.yaml` file or pass them via `--set` flags:

```yaml
stagingScripts:
  custom:
    - name: epinio-stage-scripts-custom-builder
      builder: "myorg/my-builder:*"
      userID: 1002  # Can be number or string
      groupID: 1000  # Can be number or string
      env: |
        CNB_PLATFORM_API: "0.12"
      base: epinio-stage-scripts  # Inherit download/unpack/build scripts from base
```

:::note
The `name` field is optional. If not provided, a name will be automatically generated from the builder pattern. However, it's recommended to provide a descriptive name for easier identification.
:::

**Using a base ConfigMap (recommended for most cases):**

When your builder only differs in user/group IDs or environment variables, you can inherit the download, unpack, and build scripts from an existing base ConfigMap. This is the most common use case:

```yaml
stagingScripts:
  custom:
    - name: epinio-stage-scripts-my-builder
      builder: "myorg/my-builder:*"
      userID: 1002
      groupID: 1000
      env: |
        CNB_PLATFORM_API: "0.12"
        MY_CUSTOM_VAR: "value"
      base: epinio-stage-scripts  # Inherits download, unpack, and build scripts
      # Optional: Custom staging workload configuration
      # When omitted, default workload settings from server.stagingWorkloads are used
      stagingValues:
        resources:
          requests:
            cpu: "500m"
            memory: "1Gi"
          limits:
            cpu: "2"
            memory: "4Gi"
        nodeSelector:
          workload-type: "build"
```

When using `base`, you only need to specify:
- `builder`: The glob pattern to match your builder image
- `userID` and `groupID`: The user/group IDs for the `cnb` user in your builder
- `env`: Environment variables (especially `CNB_PLATFORM_API`)
- `base`: The name of the base ConfigMap (usually `epinio-stage-scripts`)
- `stagingValues` (optional): Custom workload configuration. When omitted, the default workload settings from `server.stagingWorkloads` in values.yaml are used, or system defaults if not specified.

**Fully custom scripts:**

If you need completely custom scripts (not using a base), you must provide all three scripts (`download`, `unpack`, and `build`). You can also optionally override the `downloadImage` and `unpackImage`:

```yaml
stagingScripts:
  custom:
    - name: epinio-stage-scripts-fully-custom
      builder: "myorg/another-builder:*"
      userID: 1003
      groupID: 1000
      env: |
        CNB_PLATFORM_API: "0.13"
      # Optional: Override default images
      downloadImage: "ghcr.io/epinio/epinio-awscli:latest"
      unpackImage: "ghcr.io/epinio/epinio-unpacker:latest"
      # Required when not using base: All three scripts must be provided
      download: |-
        # Parameters available: PROTOCOL, ENDPOINT, BUCKET, BLOBID
        echo "Downloading from custom source..."
        aws --endpoint-url "${PROTOCOL}://${ENDPOINT}" s3 cp "s3://${BUCKET}/${BLOBID}" "/workspace/source/${BLOBID}"
      unpack: |-
        # Parameters available: BLOBID, USERID, GROUPID
        echo "Unpacking with custom logic..."
        mkdir -p /workspace/source/app
        tar -xzf "/workspace/source/${BLOBID}" -C /workspace/source/app
        chown -R ${USERID}:${GROUPID} /workspace
      build: |-
        # Parameters available: PREIMAGE, APPIMAGE, USERID, GROUPID
        echo "Building with custom process..."
        /cnb/lifecycle/creator \
          -app=/workspace/source/app \
          -cache-dir=/workspace/cache \
          -uid=${USERID} \
          -gid=${GROUPID} \
          -layers=/layers \
          -platform=/workspace/source \
          "-previous-image=${PREIMAGE}" \
          "${APPIMAGE}"
```

:::warning
When not using `base`, you must provide all three scripts (`download`, `unpack`, and `build`). The Helm chart will fail to render if any are missing.
:::

### Example: Adding Support for Paketo Tiny Builder

Here's a real-world example of adding support for the [Paketo Tiny Builder](https://github.com/paketo-buildpacks/builder-tiny), which is a minimal Cloud Native Buildpacks builder for smaller container images:

```yaml
stagingScripts:
  custom:
    - name: epinio-stage-scripts-tiny
      # Match all Paketo Tiny builder images
      builder: "paketobuildpacks/builder-tiny:*"
      # Tiny builder uses the same user/group IDs as Jammy builders
      userID: 1001
      groupID: 1000
      env: |
        CNB_PLATFORM_API: "0.11"
      # Inherit download, unpack, and build scripts from the base
      # The build script will use /cnb/lifecycle/creator with the tiny builder
      base: epinio-stage-scripts
```

After adding this configuration, you can use the Paketo Tiny builder when pushing applications:

```bash
epinio push --name myapp --builder-image paketobuildpacks/builder-tiny:latest
```

**Why use the Tiny builder?** The Tiny builder produces smaller container images by including only essential buildpacks and a minimal base image, making it ideal for applications that don't need the full set of buildpacks available in the full builder.

**Finding the correct configuration for other CNB builders:**

1. **Check the builder's documentation** for the Platform API version it supports
2. **Inspect the builder image** to find the `cnb` user IDs:
   ```bash
   docker run --rm paketobuildpacks/builder-tiny:latest id
   ```
3. **Test with a simple application** to verify the configuration works

### Method 2: Creating Template Files

For more complex scenarios or when you need to version control your scripts with the chart, you can create new template files in the Helm chart.

**Recommended: Use the helper template** for consistency with other stage script definitions:

Create a new template file in `helm-charts/chart/epinio/templates/` following the naming pattern `stage-scripts-*.yaml`:

```yaml
{{- include "epinio.stage-script" (dict
  "name" "epinio-stage-scripts-my-builder"
  "builder" "myorg/my-builder:*"
  "userID" "1002"
  "groupID" "1000"
  "env" "CNB_PLATFORM_API: \"0.12\"\n"
  "base" "epinio-stage-scripts"
  "context" .
) }}
```

**Alternative: Manual ConfigMap definition** (for advanced use cases where you need full control):

If you need to define the ConfigMap manually without using the helper template:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  labels:
    app.kubernetes.io/component: epinio-staging
    app.kubernetes.io/part-of: epinio
    app.kubernetes.io/version: {{ default .Chart.AppVersion .Values.image.epinio.tag }}
  name: epinio-stage-scripts-my-builder
  namespace: {{ .Release.Namespace }}
data:
  builder: "myorg/my-builder:*"
  userID: "1002"
  groupID: "1000"
  env: |-
    CNB_PLATFORM_API: "0.12"
  base: epinio-stage-scripts
```

### Best Practices

1. **Use the base mechanism**: Most of the time, you only need to override `builder`, `userID`, `groupID`, and `env`. Use the `base` field to inherit the standard download, unpack, and build scripts. This reduces maintenance and ensures consistency.

2. **Naming convention**: Use descriptive names that indicate the builder type, e.g., `epinio-stage-scripts-jammy`, `epinio-stage-scripts-bionic`, `epinio-stage-scripts-tiny`. If you don't provide a name, one will be auto-generated, but explicit names are easier to identify in logs and ConfigMap listings.

3. **Builder pattern matching**: Use glob patterns in the `builder` field to match multiple builder images. For example:
   - `"paketobuildpacks/builder-jammy-*:*"` matches all jammy-based builders (e.g., `builder-jammy-base`, `builder-jammy-full`)
   - `"myorg/my-builder:*"` matches all tags of a specific builder
   - `"*"` matches everything (use only for fallback ConfigMaps)

4. **User and Group IDs**: Different builder images may use different user/group IDs. Check your builder image documentation or inspect the image to determine the correct IDs:
   ```bash
   docker run --rm myorg/my-builder id
   # Look for the 'cnb' user output, e.g., uid=1001(cnb) gid=1000(cnb)
   ```
   You can specify IDs as numbers (`1001`) or strings (`"1001"`) in the YAML.

5. **CNB_PLATFORM_API**: Different builder versions may require different `CNB_PLATFORM_API` values. Check your builder's documentation for the correct version. Common values:
   - `"0.4"` for older Bionic-based builders
   - `"0.11"` for most Jammy-based builders
   - `"0.12"` or `"0.13"` for newer builders

6. **Staging workload configuration**: Use `stagingValues` to customize resource limits, node selectors, tolerations, and other workload settings for specific builders:
   ```yaml
   stagingValues:
     resources:
       requests:
         cpu: "1"
         memory: "2Gi"
       limits:
         cpu: "4"
         memory: "8Gi"
     nodeSelector:
       workload-type: "build"
     tolerations:
       - key: "build-workload"
         operator: "Equal"
         value: "true"
         effect: "NoSchedule"
   ```

7. **Testing**: After adding a new stage script:
   - Verify the ConfigMap was created: `kubectl get configmap -n epinio | grep stage-scripts`
   - Check the ConfigMap contents: `kubectl get configmap epinio-stage-scripts-<name> -n epinio -o yaml`
   - Test by pushing an application with the matching builder: `epinio push --name myapp --builder-image <your-builder>`

### Troubleshooting

- **Script not found**: 
  - Ensure your ConfigMap has the label `app.kubernetes.io/component: epinio-staging`
  - Verify the ConfigMap was created: `kubectl get configmap -n epinio -l app.kubernetes.io/component=epinio-staging`
  - Check Helm rendered output: `helm template epinio epinio/epinio --values your-values.yaml | grep -A 20 stage-scripts`

- **Wrong script selected**: 
  - Check the builder pattern matches your builder image name and tag exactly (including registry prefix)
  - Scripts are matched in lexicographic order by ConfigMap name, so more specific patterns should come first
  - Test the glob pattern: `filepath.Match("your-pattern", "your-builder-image:tag")`

- **Build fails**: 
  - Verify the `userID` and `groupID` match the `cnb` user in your builder image
  - Check staging job logs: `kubectl logs -n epinio -l app.kubernetes.io/component=epinio-staging --tail=100`

- **Environment issues**: 
  - Ensure `CNB_PLATFORM_API` matches your builder's requirements
  - Check that environment variables are properly formatted as YAML key-value pairs

- **Helm template errors**: 
  - If using custom scripts without `base`, ensure all three scripts (`download`, `unpack`, `build`) are provided
  - Verify YAML syntax is correct (proper indentation, quoted strings where needed)
  - Check for typos in field names (e.g., `userID` not `userId`)

- **ConfigMap not updating**: 
  - After modifying `stagingScripts.custom` in values.yaml, run `helm upgrade` to apply changes
  - Verify the new ConfigMap exists: `kubectl get configmap -n epinio | grep stage-scripts`
