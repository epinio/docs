---
sidebar_label: Custom Routes
sidebar_position: 12
title: Setting up custom routes
description: How to set up custom routes
keywords: [epinio, kubernetes, customization, custom routes]
doc-type: [how-to]
doc-topic: [epinio, how-to, customize, custom-routes]
doc-persona: [epinio-operator]
---

Epinio has the idea of a "system domain".
You set this domain when installing Epinio (with the `global.domain` helm value).
It must be a [wildcard domain](https://en.wikipedia.org/wiki/Wildcard_DNS_record) and it's used in 2 different cases:

- To create a URL for the Epinio API server
- To create URLs for the applications deployed with Epinio (also known as "Routes")

For example, if deploying Epinio with the `global.domain` set to `myawesomedomain.org`:

- The Epinio API would be accessible at `https://epinio.myawesomedomain.org`
- An application named "myapp" would be available at: `https://myapp.myawesomedomain.org`

Epinio tries to create a TLS certificate for any defined route, as it does for the wildcard system domain ones.
Depending on the issuer used, DNS may have to work before the domain can be correctly used.
In other words, the domain must fully resolve to the cluster's Ingress IP.
You can read more about issuers at [Certificate Issuers](../../how-to/operator/networking/certificate_issuers.md).
