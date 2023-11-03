---
sidebar_label: "Installing a metrics server"
sidebar_position: 24
title: "Installing a metrics server"
description: Installing a metrics server for an Epinio environment.
keywords: [epinio, kubernetes, metrics server, installation]
doc-type: [how-to]
doc-topic: [epinio, customize, operations, metrics-server]
---

If you don't have a metrics server in your Kubernetes cluster,
the application Pods (instances) report errors when trying to show metrics (RAM, CPU etc).
You would do this with the command [`epinio app show`](../../references/commands/cli/app/epinio_app_show.md).

To have this command operating correctly you need a metrics server.

## Installation

Follow the
[documentation](https://github.com/kubernetes-sigs/metrics-server)
for installing a metrics server.
The documentation has requirements, installation methods (plain YAML, helm chart, and others),
and guidance for more configurations such as high availability and security.

As an example, this command installs a metrics server:

```console
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

<!--TODO:
Some more information please. Why is this for simple environments and what is
meant by simple environments. What would be a complex environment and how might
you go about installing a metrics server in one. Should this note be here?
-->

:::note
This installation method is for simple environments.
:::
