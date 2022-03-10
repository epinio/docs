# Introduction

From App to URL in one step.

## What problem does Epinio solve

Epinio makes it easy for developers to deploy their applications to Kubernetes. Easy means:

- No previous experience with Kubernetes is required
- No steep learning curve
- Quick local setup with zero configuration
- Deploying to production similar to development

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
  - mTLS: Epinio uses [`linkerd`](https://linkerd.io/) to secure all communication between Epinio components inside the Kubernetes cluster
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
our [quickstart](tutorials/quickstart.md) tutorial to get started with Epinio.

For a more detailed information, you can check the [Explanations](/explanations/explanations.md) section,
where different topics such as "Principles" or "Security" are explained.

Finally, if you want to test Epinio directly, our [`HowTos`](/howtos/howtos.md) section
will show concrete examples on how to use Epinio for different use-cases.
