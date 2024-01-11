---
title: ""
sidebar_label: "Application Charts"
---

<head>
  <link rel="canonical" href="https://docs.epinio.io/references/customization/appcharts"/>
</head>

# Customization point: Application Charts

Epinio uses Application charts as templates for the structure of deployed applications,
i.e. of the kubernetes resources used to run an application image.

An installation of Epinio provides a single standard application chart.

If custom application charts adapted to the local environment are desired or needed please
follow the instructions on
[How To create custom application Helm charts](../../howtos/create_custom_appcharts.md)
and
[How To use custom application Helm charts](../../howtos/using_custom_appcharts.md).

Application charts are expected to create the following resources:

  - A `deployment` specifying the pod and container running the application image.
  - A `service` to route web requests to the application.
  - An [ingress](lb.md) per specified route to front the service.
