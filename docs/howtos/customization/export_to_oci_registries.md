---
sidebar_label: "Exporting applications to an OCI registry"
sidebar_position: 8
title: ""
---

:::note

Do not confuse this topic with external Epinio registries.
These are where Epinio stashes the images of staged applications for its own use.
See [Setting Up An External Container Registry](setup_external_registry.md) for more information.

Export destination registries on the other hand are where a user saves active applications to for
pickup by and use with `helm` and other kubernetes tools.

It does not help that it is perfectly ok to configure the same registry both as external registry
and as export target.

:::

## How to export applications to an OCI registry

Invoke

```bash
epinio export-registries
```

to see the list of valid destinations.

Then invoke

```bash
epinio app export --registry destination appname
```

to perform the export.

:::note

Replace `destination` with the name of the desired target.
Further replace `appname` with the name of the application to export.

:::

As given above the command uses defaults for the names, versions, and tags of helm chart and
container image. These are:

|Component	|Default Name			|Default Version/Tag	|
|---		|---				|---			|
|Helm chart	| (namespace)-(appname)-chart	| 0.0.0			|
|Container image| (namespace)-(appname)-image	| (stageID)		|

All parts can be changed with the command flags

 - `--chart-name`
 - `--chart-version`
 - `--image-name`
 - `--image-tag`
