## How to setup external Epinio registry

Epinio allows the use of an external registry for the storage of application images.  This can be achieved by setting the following arguments during `epinio install`:

```
epinio install \
  --external-registry-namespace=$REGISTRY_NAMESPACE \
  --external-registry-password=$REGISTRY_PASSWORD \
  --external-registry-url=$REGISTRY_URL \
  --external-registry-username=$REGISTRY_USER \
  ...
```

(See also `epinio install --help`)

Using [dockerhub](https://hub.docker.com/) as an example, the user would have to set the value of `$REGISTRY_URL` to `registry.hub.docker.com`, `$REGISTRY_USER` and `$REGISTRY_PASSWORD` would be set to the dockerhub credentials, and `$REGISTRY_NAMESPACE` would be either an organization or the username.

When the above arguments are set, Epinio doesn't deploy a registry on the cluster. Also the `--force-kube-internal-registry-tls` flag should not be used because it would have no effect.
