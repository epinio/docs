# Custom Routes

Epinio has the concept of a "system domain". This domain is set when installing
Epinio (with the `domain` helm value). It must be a [wildcard domain](https://en.wikipedia.org/wiki/Wildcard_DNS_record) and is used in 3 different cases:

- To create a URL for the Epinio API server
- To create a URL for the Epinio registry, when it's running inside the cluster (Optional)
- To create URLs for the applications deployed with Epinio (also known as "Routes")

For example, if you deployed Epinio with `domain` set to `myawesomedomain.org`:

- Epinio API would be accessed at `https://epinio.myawesomedomain.org`
- Epinio registry would be `https://epinio-registry.myawesomedomain.org`

and an application named "myapp" would be accessible at: `myapp.myawesomedomain.org`

This requires zero setup for each application but it is sometimes needed to add
a custom domain, a dedicated one to your application. Let's assume the ap
above must also be accessible on `https://i-own-this-awesome-domain.org`. 

You can add this domain to your application with the command below:

```
epinio app update sample --route i-own-this-awesome-domain.org
```

If you want to keep the original route too, you need to specify that explicitly:

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
resolve to the cluster's Ingress IP. Read more about the issuers here: [Certificate Issuers](./certificate_issuers.md)
