---
sidebar_label: "Separating Application Ingress From Epinio API Server Ingress"
sidebar_position: 9
title: ""
---

<head>
  <link rel="canonical" href="https://docs.epinio.io/howtos/other/separate_workload_ingress"/>
</head>

# How to separate the application's ingress from the epinio server ingress

By default applications deployed through Epinio share their ingress class with Epinio's API server.

In a situation where this kind of behaviour is not wanted the desired separation is achieved by
setting the helm template variable `server.ingressClassName` to the name of the ingress class to use
for application ingress':

```
helm install \
  --set server.ingressClassName=nginx
  ... (other options here) \
  epinio epinio/epinio
```

In order to use this application ingress together with a domain other than the one from the helm
template variable `global.domain`, the user can use `--route` flag when pushing an application
through the Epinio cli or similarly by setting a `Route` value via the Epinio Web UI.
The route value must contain the entire domain used by the application.

```
epinio app push -n sample -p . --route sample.myawesomedomain.org
```

## References
  - [Load Balancers](../../references/customization/lb.md)
  - [Custom Routes](../customization/custom_routes.md)
