---
slug: /
sidebar_label: "Introduction"
sidebar_position: 1
title: ""
---

# Introduction

From application sources to URL in one step.

Epinio is an application Platform. It deploys on Kubernetes and allows application developers and operators to work together without stepping on each others work.

Developers:

- They use the `epinio` cli to deploy applications
- They don't have to know about Kubernetes (no steep learning curve)
- They can use any available [paketo buildpack](https://paketo.io/) or pre-built images to deploy their applications
- Quick local setup with zero configuration
- Deploying to production similar to development

Operators:

- They work directly with Kubernetes
- They decide how the cluster is set up (including how Epinio is installed)
- They can decide how applications are deployed

## Why Kubernetes

[Kubernetes](https://kubernetes.io/) is becoming the de-facto standard for container orchestration.
Developers may want to use Kubernetes for all the benefits it provides or may
have to do so because that's what their Ops team has chosen. Whatever the case,
using Kubernetes is not simple. It has a steep learning curve and doing it right
is a full time job. Developers should spend their time working on their applications,
not doing operations.

Epinio is adding the needed abstractions and intelligence to allow Developers
to use Kubernetes as a [PaaS (Platform as a Service)](https://en.wikipedia.org/wiki/Platform_as_a_service).

## Features

- **Security**
  - Epinio uses TLS to encrypt communication between its components. It also uses TLS for applications by default.
  - Basic Authentication to access the API.
- **Epinio Clients**
  - Web UI
  - Epinio CLI
- **Apps**
  - CRUD operations of your app. (An app can be a tarball or in a github repo)
  - [Cloud Native Buildpacks](https://buildpacks.io/) provide the runtime environment for your apps
- **Configurations**
  - CRUD operations of your configuration. A configuration can be connection details for a database, SaaS etc.
  - Bind configurations to apps.

## Next steps

If you want to try Epinio, we suggest you to have a look at
our [quickstart](./tutorials/quickstart.md) tutorial to get started with Epinio.

For a more detailed information, you can check the **Explanations** section,
where different topics such as "Principles" or "Security" are explained.

Finally, if you want to test Epinio directly, our **HowTos** section
will show concrete examples on how to use Epinio for different use-cases.