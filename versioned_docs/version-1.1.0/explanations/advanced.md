---
sidebar_label: "Advanced topics"
title: ""
---

# Advanced Topics

## Contents

- [Epinio, Advanced Topics](#epinio-advanced-topics)
  - [Contents](#contents)
  - [Epinio prerequisites](#prerequisites)
    - [Ingress Controller](#ingress-controller)
    - [Cert Manager](#cert-manager)
  - [Epinio installed components](#epinio-installed-components)
    - [Kubed](#kubed)
    - [Minio](#minio)
    - [Container Registry](#container-registry)
  - [Other Advanced Topics](#other-advanced-topics)
    - [Git Pushing](#git-pushing)

## Prerequisites

There are some components that need to be installed on a Kubernetes cluster before
Epinio is installed. Epinio helm chart doesn't deploy these components.

### Ingress controller

On a kubernetes cluster, some services need to be accessible from outside.
For Epinio, the `API server` is one of them., and the various applications 
deployed with Epinio might need to be also reachable from outside.

One way to expose services to the world is by creating [Ingress resources](https://kubernetes.io/docs/concepts/services-networking/ingress/).
Ingress resources on their own, have no effect. They are just descriptions of what kind of routing is desired. The actual implementation of this
wiring is handled by what is called, an Ingress controller.

> NOTE: Most clusters will have an Ingress controller deployed by default. If that's not the case, [Traefik](https://doc.traefik.io/traefik/providers/kubernetes-ingress/) can be installed.
> Other Ingress controllers should work too but Traefik is what is used in Epinio CI to test it.
>
> Read the installation documentation on how to install Traefik: [Install ingress controller](../installation/install_epinio.md#ingress-controller)

An Ingress resource will be created for the Epinio API server and for each application deployed by Epinio.

### Cert Manager

[Upstream documentation](https://cert-manager.io/docs/)

Cert Manager is a Kubernetes controller that generates and renews Certificates needed in order to
serve the various accessible endpoints over TLS (e.g. the Epinio API server).

Epinio supports various options when it comes to certificate issuers (let's encrypt, private CA, bring your own CA, self signed certs).
Cert Manager simplifies the way we handle the various different certificate issuers within Epinio.

You can read more about certificate issuers here: [certificate issuers documentation](../howtos/certificate_issuers.md)

## Epinio installed components

The official way to install Epinio is with the [Epinio helm chart](https://artifacthub.io/packages/helm/epinio/epinio).
This helm chart installs Epinio and additional components, listed below, that are needed for Epinio to work.

### Epinio API server

The main component of Epinio is the API server. The same `epinio` binary is both
the server and the cli. The server is started with `epinio server` command in a properly configured Kubernetes Pod.

Epinio cli and web UI functionality are both implemented using the endpoints provided by the Epinio API server
component. For example, when the user asks Epinio to "push" an application, the
cli will contact the "Upload", "Stage" and "Deploy" endpoints of the Epinio API to upload the application code,
create a container image for the application using this code and run the application on the cluster.

The Epinio API server is running on the cluster and made accessible using Kubernetes resources like
Deployments, Services,  Ingresses and Secrets.

### Kubed

[Upstream documentation](https://github.com/kubeops/kubed)

Kubed is installed by Epinio to keep secrets that are needed in more than
one namespace synced. For example, the image pull secret is needed in every application namespace
so that Kubernetes can pull the built application images from the [Container Registry](#container-registry).

Kubed makes sure that if the source secret changes, the copy will change too.

Warning: this doesn't mean things will still work if you re-generate a secret manually. Secret rotation will be handled by Epinio in the future.

### Minio

[Upstream project link](https://github.com/minio/minio)

Minio is a storage solution that implements the same API as [Amazon S3](https://aws.amazon.com/s3/).

When the user pushes an application using a source code directory (with the [`epinio push`](../references/commands/cli/epinio_push.md) command), the first step taken by the cli is to put the source code into a tarball and upload that to the Epinio API server. The server copies that to the configured S3 storage to be used later during the staging of the application.

When installing Epinio, the user can choose to use an external S3 compatible storage or let Epinio install Minio on the cluster ([See here how](../howtos/setup_external_s3.md)).

### Container Registry

The result of Epinio's application staging is a container image. This image is used to create a Kubernetes deployment to run the application code.
The staging Job requires that image to be written to some container registry (See also [Detailed push process](detailed-push-process.md)). 

By default the Epinio installation deploys a container registry inside the Kubernetes cluster to make the process easy and fast.

Epinio comes with two consumers of this registry:

1. Staging job - pushing the images
2. Kubernetes - pulling the images when a Deployment is created for the Application

Ideally all consumers will communicate with the registry over TLS to keep the communication encrypted.
Epinio controls the staging job and ensures that whatever CA is used to sign the registry certificate is trusted by it. Achieving the same for Kubernetes however requires configuration that cannot happen from within the cluster, therefore Epinio has no way to ensure that. Theoretically there are 3 options:

1. Let the Epinio user manually configure Kubernetes to trust the CA
2. Use a well-known trusted CA, so there's no configuration needed
3. Don't encrypt the communication at all

Currently Epinio doesn't support the first 2 options. If `containerregistry.enabled` is `true` during installation (default), Epinio will make Kubernetes pull the images unencrypted (option #3 above).
If encryption is desired, the container registry should be installed manually and configured as an ["external" registry](../howtos/setup_external_registry.md) during Epinio installation.

> NOTE: Communication between the staging Job and the container registry is encrypted with TLS even when the built-in container registry is used.

## Other Advanced Topics

### Git Pushing

The quick way of pushing an application, as explained at
[Quickstart: Push an application](../tutorials/quickstart.md#push-an-application), uses a local
directory containing a checkout of the application's sources.

Internally this is actually [quite complex](detailed-push-process.md). It
involves the creation and upload of an archive (tarball or zip) from these sources by the client
to the Epinio server, copying into Epinio's internal (or external) S3 storage,
copying from that storage to a PersistentVolumeClaim to be used in the job for staging,
i.e. compilation and creation of the docker image to be used by the underlying kubernetes cluster.

The process is a bit different when using the Epinio client's "git mode". In
this mode [`epinio push`](../references/commands/cli/epinio_push.md) does not take a local directory of sources, but the
location of a git repository holding the sources, and the id of the revision to
use. The client then asks the Epinio server to pull those sources and store them to the
S3 storage. The rest of the process is the same.

The syntax is

```
epinio push --name NAME --git GIT-REPOSITORY-URL,REVISION
```

For comparison all the relevant syntax:

```
epinio push
epinio push MANIFEST-PATH
epinio push --name NAME
epinio push --name NAME --path DIRECTORY
epinio push --name NAME --git GIT-REPOSITORY-URL,REVISION
```
