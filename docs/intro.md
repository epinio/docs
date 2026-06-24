---
slug: /
sidebar_label: "Introduction"
sidebar_position: 1
title: "Introduction"
description: An introduction to Epinio and how it benefits developers
keywords: [epinio, kubernetes, developer, operator, deployment]
doc-type: [explanation]
doc-persona: [epinio-developer, epinio-operator]
doc-topic: [epinio, introduction]
---

Epinio is a [Krumware](https://www.krum.io) project that lets developers go from
application sources to URL in a single step.

Epinio is an Application Development Platform that deploys on Kubernetes using
Cloud Native standards, and lets application developers and operators work
together without conflict.

**Developers**:

- Use the `epinio` CLI or web UI to deploy applications with one command
- No Kubernetes knowledge needed (no steep learning curve)
- Use any available [Paketo buildpack](https://paketo.io/) or pre-built image to deploy your applications
- Set up with minimal configuration
- Deploy to production the same way as in development

**Operators and Platform Engineers**:

- Work directly with Kubernetes
- Decide on cluster setup (including Epinio installation and setup)
- Decide how application deployment happens
- Provide application, service, builder image, and app chart templates
- Configure authentication and role scoping

## Why Kubernetes

[Kubernetes](https://kubernetes.io/) is the standard for container orchestration.
Developers may want to use Kubernetes for its benefits, or because their Ops team
has chosen it. In either case, working with Kubernetes can be complex depending on
the environment. It has a steep learning curve, and doing it right is a full-time
job. Developers should spend their time working on their applications, not on
operations.

Epinio adds the abstractions and tools needed to let developers use Kubernetes as a
[PaaS](https://en.wikipedia.org/wiki/Platform_as_a_service).

## Features

- **Security**
  - Epinio uses TLS to encrypt communication between components, and uses TLS for applications by default.
  - Access the API with Basic Authentication or OIDC-based single sign-on, with role-based authorization.
- **Epinio Clients**
  - Epinio provides both a web UI and a CLI to support interactive work and automation.
- **Apps**
  - Using the UI or CLI you create, inspect, change, and delete apps.
  - [Cloud Native Buildpacks](https://buildpacks.io/) build and containerize your code for its runtime environment.
- **Configurations**
  - Apps have configurations bound to them (configuration binding).
  - Using the UI or CLI you create, inspect, and delete these bindings.
  - Configurations describe database connections, SaaS credentials, and similar.
- **Services**
  - Provision services, such as databases, from a catalog and bind them to your apps.
- **Namespaces**
  - Organize and isolate apps, configurations, and services into namespaces.

## Next steps

To try Epinio, follow the [Quickstart](./getting-started/quickstart.md) guide.

From there:

- The **How-to guides** section is split into **Developer** (the day-to-day
application workflow) and **Operator** (installation scenarios, cluster
configuration, and operations for platform engineers).
- **Reference** holds the CLI, server and API, Helm chart, and configuration details.
