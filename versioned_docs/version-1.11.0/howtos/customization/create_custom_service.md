---
sidebar_label: Creating a custom service
sidebar_position: 13
title: Creating a custom service
description: How to create a custom service
keywords: [epinio, kubernetes, create a custom service]
doc-type: [how-to]
doc-topic: [epinio, how-to, customize, create-custom-service]
doc-persona: [epinio-operator]
---

<head>
  <link rel="canonical" href="https://docs.epinio.io/howtos/customization/create_custom_service"/>
</head>

As described [in the Service reference page](../../references/services.md),
Epinio services are nothing but descriptions of Helm charts.
An operator may add more services simply by creating a Custom Resource in the namespace where Epinio is installed.

As a starting point, you can check the services installed by default for Epinio:

```console
kubectl get services.application.epinio.io -A
```

With Epinio installed in a namespace called `epinio`, the following command outputs the Service definition in `yaml` format:

```console
kubectl get services.application.epinio.io -n epinio mysql-dev -o yaml > service.yaml
```

Or, you can find the definition of the catalog services
[in the GitHub repository](https://github.com/epinio/helm-charts/blob/main/chart/epinio/templates/service-catalog.yaml).

Change the fields to point to the desired helm chart and apply the YAML with a command like:

```console
kubectl apply -f service.yaml
```

If everything worked correctly, you can see your Service in the Epinio `service-catalog`:

```console
epinio service catalog
```

## Adding an Image to the service

The consumers of the API (that is, the web UI of Epinio) can show an icon when listing the available services.
To assign an image to your custom service, make sure you add the `serviceIcon` field in the Custom Resource YAML.

Helm charts have an icon field defined which already provides such an image.
You can find the icon field with the `helm show` command. For example, for the Bitnami RabbitMQ Helm chart:

```console
helm show chart https://charts.bitnami.com/bitnami/rabbitmq-9.0.5.tgz | yq .icon
```

## Multiple secret types

By default, Epinio looks for Opaque secret types to label them as Configurations.
Sometimes this isn't enough,
so you can define different types with the `application.epinio.io/catalog-service-secret-types` annotation:

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

With this definition, Epinio gets all the `Opaque`, `BasicAuth`,
and `connection.crossplane.io/v1alpha1` secrets generated during the creation of this Service (you can list any type of secret).

## Customization

You can customize services in two possible ways.
The first, system settings, is for operators to configure the referenced chart so that it works within the Epinio environment.
The second, user settings, declares the chart settings the user can change when deploying the service from the catalog.

System settings have priority over user settings.
So, declaring a field used by system settings as user-settable is a `no operation`.
While the user can see that setting, and provide values, these values are ignored in favor of the system values.

### System settings

You enter system settings in the `spec.values` field of the service declaration.

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

The value of this field is YAML formatted text.

For example, the predefined development services coming with an Epinio installation
use this to set the `extraDeploy` field of the Bitnami charts.
This is to inject supporting service accounts, roles, bindings, and PVCs for the service to use.

### User-settable configuration values {#user-settable}

You declare user settings through the `spec.settings` field of the service declaration.

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

The example settings shown are taking from the nginx service used in the Epinio test suite.

The syntax of the `settings` map is the same as that of the `settings` map for app chart resources.
See section `User-settable configuration values` in the How-to for
[Creating Custom Application Helm Charts](create_custom_appcharts.md).

There are semantic differences between the app chart and service declarations.
For app charts the keys are simple strings for the `userConfig` map.
They don't permit nesting.

For service charts the keys are proper paths into the set of fields exposed by the chart through its `values.yaml` file.
You express nesting using full stops (`.`).
For example, see `ingress.enabled` in the YAML at the start of [this section](#user-settable).

### Private repositories and registries

You can use charts stored in private repositories or OCI registries.
You need to use a secret that provides credentials.

```yaml
apiVersion: application.epinio.io/v1
kind: Service
metadata:
  name: myservice
  ...
spec:
  helmRepo:
    name: myregistry
    url: oci://ghcr.io/myregistry
    secret: oci-secret
```

Epinio looks for the `oci-secret` in the namespace where it's installed.
This secret has to contain the registry, or repository, login `username` and `password` fields:

```console
kubectl create secret generic -n epinio oci-secret --from-literal=username=myusername --from-literal=password=mypassword
```

For example, to use the GitHub container registry you need a Personal Access Token (PAT) with the `package:read/write` scopes.
Use the PAT as both the username and the password.
