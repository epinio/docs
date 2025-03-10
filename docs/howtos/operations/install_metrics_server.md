---
sidebar_label: "Installing a metrics server"
sidebar_position: 24
title: "Installing a metrics server"
description: Installing a metrics server for an Epinio environment.
keywords: [epinio, kubernetes, metrics server, installation]
doc-type: [how-to]
doc-topic: [epinio, customize, operations, metrics-server]
---

<head>
  <link rel="canonical" href="https://docs.epinio.io/howtos/operations/install_metrics_server"/>
</head>

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

:::note

This installation method is for simple environments,
meaning those which aren't high availability setup,
those that aren't large clusters needing custom scaling setups.

:::
