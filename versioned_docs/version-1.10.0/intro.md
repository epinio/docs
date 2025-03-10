---
slug: /
sidebar_label: "Introduction"
sidebar_position: 1
title: "Introduction"
description: An introduction to Epinio and its benefits
keywords: [epinio, kubernetes, developer, operator, deployment]
---

<head>
  <link rel="canonical" href="https://docs.epinio.io"/>
</head>

Epinio allows developers to go from application sources to URL in one step.

Epinio is an Application Platform. It deploys on Kubernetes and allows application developers and operators to work together without conflicts between their work.

Epinio is a [SUSE](https://suse.com) project.

**Developers**:

- use the `epinio` cli to deploy applications
- don't have to know about the details of Kubernetes (so, no steep learning curve)
- can use any available [paketo buildpack](https://paketo.io/) or pre-built images to deploy their applications
- can quickly setup with zero configuration
- can deploy to production in the same way as to development

**Operators**:

- work directly with Kubernetes
- decide how the cluster is set up (including how Epinio is installed)
- decide how applications are deployed

## Why Kubernetes

[Kubernetes](https://kubernetes.io/) is the standard for container orchestration.
Developers may want to use Kubernetes for its benefits or because their Ops team has chosen it.
In either case, working with Kubernetes can be complex depending on the environment.
It has a steep learning curve and doing it right is a full-time job.
Developers should spend their time working on their applications, not doing operations.

Epinio adds the needed abstractions and tools to allow developers to use Kubernetes as a [PaaS](https://en.wikipedia.org/wiki/Platform_as_a_service).

## Features

- **Security**
  - Epinio uses TLS to encrypt communication between its components. It also uses TLS for applications by default.
  - Basic Authentication to access the API.
- **Epinio Clients**
  - Epinio provides both a web UI and a CLI to support interactive work and automation.
- **Apps**
  - Using the UI or CLI you can create, inspect, modify and delete apps.
  - You can use [Cloud Native Buildpacks](https://buildpacks.io/) provide the runtime environment for your apps
- **Configurations**
  - Apps can have configurations associated with them (configuration binding).
  - Using the UI or CLI you can create, inspect and delete these application bindings
  - The configurations describe database connections, SaaS configurations, etc.

## Next steps

To try Epinio, look at our [quickstart](./tutorials/quickstart.md) tutorial.

For more detailed information, check the **Explanations** section, for a variety of topics.

Our **How-tos** section describes some scenarios with examples.
