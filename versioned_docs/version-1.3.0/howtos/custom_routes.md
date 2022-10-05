---
sidebar_label: "Custom Routes"
sidebar_position: 9
title: ""
---

# Custom Routes

Epinio has the concept of a "system domain". This domain is set when installing
Epinio (with the `global.domain` helm value). It must be a [wildcard domain](https://en.wikipedia.org/wiki/Wildcard_DNS_record) and is used in 2 different cases:

- To create a URL for the Epinio API server
- To create URLs for the applications deployed with Epinio (also known as "Routes")

For example, if Epinio was deployed with `global.domain` set to `myawesomedomain.org`:

- The Epinio API would be accessible at `https://epinio.myawesomedomain.org`
- An application named "myapp" would be accessible at: `https://myapp.myawesomedomain.org`

This requires zero setup for each application. However, sometimes it is needed or desired to add
a custom domain, dedicated to the application. Let's assume that the application
above must also be accessible on `https://i-own-this-awesome-domain.org`. 

Add this domain to your application with the command below:

```
epinio app update sample --route i-own-this-awesome-domain.org
```

__Attention__, this removed the original route! To keep it, it has to be explicitly specified:

```
epinio app update sample --route i-own-this-awesome-domain.org --route myapp.myawesomedomain.org
```

The `--route` parameter can also be passed when the app is first pushed:

```
epinio app push -n sample -p . --route myapp.myawesomedomain.org
```

Epinio will try to create a TLS certificate for any defined route, like it does
for the wildcard system domain ones. Depending on the issuer that is being used,
DNS may have to work before the domain can be used. In other words, the domain must
resolve to the cluster's Ingress IP. Read more about the issuers here: [Certificate Issuers](../howtos/certificate_issuers.md)
