# Create a custom service

As described [in the Service reference page](../references/services.md), Epinio services are nothing but descriptions of Helm charts. An operator may add more services by simply creating a Custom Resource in the namespace where Epinio is installed.

As a starting point, the services that come out of the box with Epinio can be used:

```
$ kubectl get services.application.epinio.io -A
```

If Epinio is installed in a namespace called `epinio`, the following command should give you a yaml to work on:

```
$ kubectl get services.application.epinio.io -n epinio mysql-dev -o yaml > service.yaml
```

or you can find the definition of the catalog services [here](https://github.com/epinio/helm-charts/blob/3a12bac7aee5ac36c6d43416f2e83ac10090c62a/chart/epinio/templates/service-catalog.yaml
).

https://github.com/epinio/helm-charts/blob/3a12bac7aee5ac36c6d43416f2e83ac10090c62a/chart/epinio/templates/service-catalog.yaml

Change the fields to point to the desired helm chart and apply the yaml with a command like:

```
$ kubeclt apply -f service.yaml
```

If everything worked correctly, the new service should appear when this command is run:

```
$ epinio service catalog
```
