---
sidebar_label: "Creating A Custom Service"
sidebar_position: 13
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
$ kubectl apply -f service.yaml
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

## Customization

Services can be customized in two possible ways. The first, system settings, is for operators to
configure the referenced chart so that it will actually work within the epinio environment. The
second, user settings, declares the settings of the chart the user is allowed to tweak when
deploying the service from the catalog.

Given that system settings are considered to be needed they have priority over user settings.  In
other words, declaring a field used by the system settings as user-settable will in the end be a `no
operation`. While the user can see that setting, and provide values, these values will be ignored in
favor of the system values.

### System settings

The system settings are entered through the `spec.values` field of the service declaration.

```yaml
apiVersion: application.epinio.io/v1
kind: Service
metadata:
  name: myservice
  ...
spec:
  values: |-
    ... text ...
```

The value of this field is text, albeit YAML formatted text.

As an example, the predefined development services coming with an Epinio installation use this to
set the `extraDeploy` field of the bitnami charts to inject supporting service accounts, roles,
bindings, and PVCs for the service to use.

### User-settable configuration values

The user settings are declared through the `spec.settings` field of the service declaration.

```yaml
apiVersion: application.epinio.io/v1
kind: Service
metadata:
  name: myservice
  ...
spec:
  settings:
    "ingress.enabled":
      type: "bool"
    "ingress.hostname":
      type: "string"
```

The example settings shown above are taking from the nginx service used in the epinio testsuite.

:::note
The syntax of the `settings` map is the same as the `settings` map used to customize app chart resources.
See section `User-settable configuration values` in the how to for
[Creating Custom Application Helm Charts](create_custom_appcharts.md)

Because of this the full specification is __not__ repeated here.
:::

:::note
There are semantic differences between the app chart and service declarations.

For app charts the keys are simple strings for the `userConfig` map. They do not allow nesting.

For service charts the keys are proper paths into the set of fields exposed by the chart through its
`values.yaml` file. Nesting is expressed using dots (`.`). As example see `ingress.enabled` above.
:::
