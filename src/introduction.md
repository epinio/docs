# Introduction

From App to URL in one step.

## What problem does Epinio solve

Epinio makes it easy for developers to deploy their applications to Kubernetes. Easy means:

- No previous experience with Kubernetes is required
- No steep learning curve
- Quick local setup with zero configuration
- Deploying to production similar to development

Kubernetes is becoming the de-facto standard for container orchestration.
Developers may want to use Kubernetes for all the benefits it provides or may
have to do so because that's what their Ops team has chosen. Whatever the case,
using Kubernetes is not simple. It has a steep learning curve and doing it right
is a full time job. Developers should spend their time working on their applications,
not doing operations.

Epinio is adding the needed abstractions and intelligence to allow Developers
to use Kubernetes as a PaaS (Platform as a Service).

## Features

- **Security**
  - mTLS: Epinio uses `linkerd` to secure all communication between epinio components inside the kubernetes cluster
  - Basic Authentication to access the API.
- **Epinio Clients**
  - Web UI
  - Epinio CLI
- **Apps**
  - CRUD operations of your app. (An app can be a tarball or in a github repo)
  - Cloud Native Buildpacks provide the runtime environment for your apps
- **Services**
  - CRUD operations of your service. A service can be a database, SaaS etc. A service can be an external component or can be created using `epinio service`
  - Bind services to apps.

## Quickstart

Follow the [quickstart](user/tutorials/quickstart.md) tutorial to get
started with Epinio.
