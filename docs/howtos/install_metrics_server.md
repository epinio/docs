---
sidebar_label: "Install Metrics Server"
sidebar_position: 19
title: ""
---

# Why Install A Metrics Server ?

If no metrics server is running on a cluster, the application "instances" (aka Pods) will
report errors when trying to show metrics (RAM, CPU etc) via
[epinio app show](../references/commands/cli/app/epinio_app_show.md)

# Install A Metrics Server

Please read and follow the
[instructions](https://github.com/kubernetes-sigs/metrics-server) for installing a metrics
server. They provide information about requirements, the various possible methods (plain
yaml, helm chart, etc), and issues like configuration for high availability and security,
etc.

The most simple form of installation, execution of

> kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

should be used only for simple environments.
