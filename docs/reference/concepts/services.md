---
sidebar_label: "Services"
sidebar_position: 4
title: "services.md"
description: Most real world applications work together with other services to store data, logs, to exchange messages with other systems etc.
keywords: [epinio, ]
doc-type: [reference]
doc-persona: [epinio-developer, epinio-operator]
doc-topic: [epinio, reference, concepts, services]
---

Most real world applications work together with other services to store data, logs, to exchange messages with other systems etc.
The most common example is probably a database. There are at least 2 ways to connect an Epinio application to a Service.
The first way is to provision the service manually and [create an Epinio Configuration](./configurations.md) to define the Service connection details available to the application.

The second way lets Epinio provision the Service, and afterwards create a binding to your application with the `epinio service bind` command. For additional information, please refer to the [epinio service](../cli/service/epinio_service.md) page.

## How does it work?

Epinio is very flexible on how a service is provisioned. Many public cloud providers maintain their own operators (e.g. [Azure](https://github.com/Azure/azure-service-operator)). There are also projects like [Crossplane](https://crossplane.io/) that allow services provisioning for various public cloud providers. All these solutions work by creating custom resources on a cluster, and a controller will create the desired service.
This shared method allows Epinio to stay agnostic of the provisioning method. You only need to create a Helm chart with the needed resources and [describe how to install the Service with Epinio](../../how-to/operator/customization/create_custom_service.md).
The same method can be used with "in-cluster" services (e.g. a MySQL database running on the same cluster as Epinio). Actually, the Epinio services available by default are based on off-the-shelf Helm charts from Bitnami and their names are suffixed with `-dev` because in the provided default configuration they might not be suitable for production usage.

The [services how-to](../../how-to/developer/concepts/services/services.mdx) contains information on how to work with services via the UI or CLI.
