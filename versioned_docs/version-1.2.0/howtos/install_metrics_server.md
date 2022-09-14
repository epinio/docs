---
sidebar_label: "Install Metrics Server"
sidebar_position: 21
title: ""
---

# What is the need for a Metrics Server ?

If no Metrics Server is running on a Kubernetes cluster, the application "instances" (aka
Pods) will report errors when it will try to show metrics (RAM, CPU etc) with the command
[epinio app show](../references/commands/cli/app/epinio_app_show.md)

# Install a Metrics Server

Please read and follow the
[instructions](https://github.com/kubernetes-sigs/metrics-server) for installing a Metrics
Server. You will get the information about the requirements, the various installation
methods (plain yaml, helm chart, etc), and guidance for additional configurations such as
high availability and security.

As an example, here is the command to install a Metrics Server:

> kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

:::note
This installation method should be used only for simple environments.
:::
