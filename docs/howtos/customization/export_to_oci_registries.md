---
sidebar_label: "Exporting applications to an OCI registry"
sidebar_position: 8
title: "Exporting applications to an OCI registry"
description: Exporting applications to an OCI registry
keywords: [epinio, kubernetes, exporting, OCI registry]
---

:::note

Don't confuse this topic with **external Epinio registries**.
These are where Epinio stashes the images of staged applications for its own use.
See [Setting Up An External Container Registry](setup_external_registry.md) for more information.

**Export destination registries** are where a user saves active applications for pickup by, and use with, `helm` and other Kubernetes tools.

It doesn't help that it's acceptable to configure the same registry both as external registry and as export target.

:::

## How to export applications to an OCI registry

Invoke:

```bash
epinio export-registries
```

This prints the list of valid destinations.

Then invoke:

```bash
epinio app export --registry destination appname
```

This performs the export.

:::note

Replace `destination` with the name of the desired target and `appname` with the name of the application to export.

:::

As shown the command uses defaults for the names, versions, and tags of helm chart and container image. These are:

|Component|Default Name|Default Version/Tag|
|---|---|---|
|Helm chart|(namespace)-(appname)-chart|0.0.0|
|Container image|(namespace)-(appname)-image|(stageID)|

Use the command `epinio app show (the-app-name)` to see the `stageID` of the application.

You can change all parts with the command flags:

- `--chart-name`
- `--chart-version`
- `--image-name`
- `--image-tag`
