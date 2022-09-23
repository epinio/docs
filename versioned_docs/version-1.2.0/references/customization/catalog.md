---
title: ""
sidebar_label: "Service Catalog"
---

# Customization point: Service Catalog

Epinio uses Services classes as templates for service instances, i.e. of the kubernetes
resources required to run a specific kind of service.

An installation of Epinio provides five standard service classes, one each for

  1. mysql
  2. postgresql
  3. redis
  4. rabbitmq
  5. mongodb-dev

If custom service classes adapted to the local environment are desired or needed please
follow instructions on
[How To create a custom service](../../howtos/create_custom_service.md)
