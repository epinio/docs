---
sidebar_label: "Create a custom Service"
sidebar_position: 10
title: ""
---

# Create a custom service

As described [in the Service reference page](../references/services.md), Epinio services are nothing but descriptions of Helm charts. An operator may add more services by simply creating a Custom Resource in the namespace where Epinio is installed.

As a starting point, you can check the services installed by default for Epinio:

```
$ kubectl get services.application.epinio.io -A
```

If Epinio is installed in a namespace called `epinio`, the following command outputs the Service definition in `yaml` format:

```
$ kubectl get services.application.epinio.io -n epinio mysql-dev -o yaml > service.yaml
```

or you can find the definition of the catalog services [here](https://github.com/epinio/helm-charts/blob/3a12bac7aee5ac36c6d43416f2e83ac10090c62a/chart/epinio/templates/service-catalog.yaml
).

Change the fields to point to the desired helm chart and apply the yaml with a command like:

```
$ kubeclt apply -f service.yaml
```

If everything worked correctly, you can see your Service in the Epinio `service-catalog`:

```
$ epinio service catalog
```

## Adding an Image to the service

The various consumers of the API (e.g. the web UI of Epinio) can show an icon when
listing the various available services. If you want to assign an image to your
custom service, make sure you add the `serviceIcon` field in the Custom Resource
yaml.

Generally, helm charts have an icon field defined which already provides such an
image. You can find the icon field with the `helm show` command. E.g. for the
bitnami rabbitmq helm chart:

```
helm show chart https://charts.bitnami.com/bitnami/rabbitmq-9.0.5.tgz | yq .icon
```

## Multiple Secret types

By default Epinio will look for Opaque secret types to label them as Configurations.  
Sometimes this is not enough, so you can define different types with the `application.epinio.io/catalog-service-secret-types` annotation:


```yaml
apiVersion: application.epinio.io/v1
kind: Service
metadata:
  name: myservice
  namespace: epinio
  annotations:
    application.epinio.io/catalog-service-secret-types: Opaque,BasicAuth,connection.crossplane.io/v1alpha1
    ...
```

With this definition, Epinio will get all the `Opaque`, `BasicAuth`, and `connection.crossplane.io/v1alpha1` secrets generated during the creation of this Service (any type of secret can be listed).  
