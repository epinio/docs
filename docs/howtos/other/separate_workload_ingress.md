---
sidebar_label: Ingress separation
sidebar_position: 9
title: Separating application Ingress from Epinio API server Ingress
description: How to separate application Ingress from Epinio API server Ingress
keywords: [epinio, kubernetes, separate application ingress, epinio api server]
doc-type: [how-to]
doc-topic: [epinio, how-to, other, ingress-separation]
doc-persona: [epinio-developer, epinio-operator]
---

<head>
  <link rel="canonical" href="https://docs.epinio.io/howtos/other/separate_workload_ingress"/>
</head>

By default, applications deployed through Epinio share their ingress class with Epinio's API server.

For situations where this kind of behavior isn't wanted you achieve separation with a couple of steps.

Set the Helm template variable `server.ingressClassName` to the name of the Ingress class to use for application Ingress:

```console
helm install \
  --set server.ingressClassName=nginx
  ... (other options here) \
  epinio epinio/epinio
```

To use this application Ingress with a domain different to the Helm template variable `global.domain`,
the user can use `--route` flag.
Do this when pushing an application through the Epinio CLI or by setting a `Route` value using the Epinio Web UI.
The route value must contain the entire domain used by the application.

```console
epinio app push -n sample -p . --route sample.myawesomedomain.org
```

## References

- [Load Balancers](../../references/customization/lb.md)
- [Custom Routes](../customization/custom_routes.md)
