---
sidebar_label: "Separating Application Ingress From Epinio API Server Ingress"
sidebar_position: 8
title: ""
---

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

## References

  - [Load Balancers](../references/customization/lb.md)
