---
slug: /
sidebar_label: "Introduction"
sidebar_position: 1
title: "Introduction"
description: An introduction to Epinio and how it benefits developers
keywords: [epinio, kubernetes, developer, operator, deployment]
---

Epinio lets developers to go from application sources to URL in a single step.

Epinio is an Application Development Platform.
It deploys on Kubernetes and lets application developers and operators work together without conflict.

Epinio is now a [Krumware](https://www.krum.io) project, in collaboration with [SUSE](https://www.suse.com).

**Developers**:

- use the `epinio` CLI to deploy applications
- don't have to know about the details of Kubernetes (no steep learning curve)
- use any available [Paketo buildpack](https://paketo.io/) or pre-built images to deploy their applications
- set up with zero configuration
- deploy to production in the same way as development

**Operators**:

- work directly with Kubernetes
- decide on cluster setup (including Epinio installation and setup)
- decide how application deployment happens

## Why Kubernetes

[Kubernetes](https://kubernetes.io/) is the standard for container orchestration.
Developers may want to use Kubernetes for its benefits or because their Ops team has chosen it.
In either case, working with Kubernetes can be complex depending on the environment.
It has a steep learning curve and doing it right is a full-time job.
Developers should spend their time working on their applications, not doing operations.

Epinio adds the needed abstractions and tools to let developers to use Kubernetes as a [PaaS](https://en.wikipedia.org/wiki/Platform_as_a_service).

## Features

- **Security**
  - Epinio uses TLS to encrypt communication between components. It also uses TLS for applications by default.
  - Basic Authentication to access the API.
- **Epinio Clients**
  - Epinio provides both a web UI and a CLI to support interactive work and automation.
- **Apps**
  - Using the UI or CLI you create, inspect, change and delete apps.
  - You use [Cloud Buildpacks](https://buildpacks.io/) for the runtime environment for your apps
- **Configurations**
  - Apps have configurations associated with them (configuration binding).
  - Using the UI or CLI you create, inspect and delete these application bindings
  - The configurations describe database connections, SaaS configurations and others.

## Next steps

To try Epinio, look at the [Quickstart](./tutorials/quickstart.md) tutorial.

For more detailed information, check the **Explanations** section, for a variety of topics.

The **How-tos** section describes scenarios with examples.
