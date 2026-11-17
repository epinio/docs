---
title: "Service Catalog"
sidebar_label: "Service Catalog"
sidebar_position: 5
description: "Service classes, the templates Epinio uses to provision service instances from the catalog."
keywords: [epinio, service, catalog]
doc-type: [reference]
doc-persona: [epinio-developer, epinio-operator]
doc-topic: [epinio, reference, concepts, catalog]
---

Epinio uses Services classes as templates for service instances, i.e. of the kubernetes
resources required to run a specific kind of service.

An installation of Epinio provides five standard service classes, one each for

  1. mysql
  2. postgresql
  3. redis
  4. rabbitmq
  5. mongodb-dev

Services beyond what is listed here can also be added to the catalog for easy reuse.

The [services catalog how-to](../../how-to/developer/concepts/services/services.mdx) contains information on how to work with the services catalog via the UI or CLI.
