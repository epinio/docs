---
title: ""
sidebar_label: "Load Balancers"
---

# Customization point: Load Balancers

By default Epinio-created ingress resources for applications are based on the
`networking/v1` Ingress and are not tagged with a specific ingress class name. They do use
`Traefik`-specific annotations however.

This behaviour is a combination of the main Epinio chart and the standard
[application chart](appcharts.md) it provides.

To force the use of a specific ingress controller supporting the `networking/v1` API it is
necessary to set the chart key `server.ingressClassName` to a name recognized by the
desired controller.

Note that custom [application charts](appcharts.md) may completely deviate from all of the
above.
