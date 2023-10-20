---
sidebar_label: "Advanced topics"
title: "Advanced topics"
description: Advanced topics in Epinio application development environments
keywords: [epinio, kubernetes, advanced topics]
---

## Prerequisites

There are components (Ingress controller and a Certificate Manager) required in a Kubernetes cluster before
an Epinio installation.
The Epinio helm chart doesn't deploy these components.

### Ingress controller

On a Kubernetes cluster, certain services need to be reachable from outside the cluster.
For Epinio, the `API server` is one of them.
Certain of the applications deployed with Epinio might also need to be reachable from outside.

One way to expose services externally is by creating [Ingress resources](https://kubernetes.io/docs/concepts/services-networking/ingress/).
Ingress resources on their own, have no effect.
They're descriptions of the needed routing.
An Ingress controller handles the implementation of this routing.

:::note

Most clusters have an Ingress controller deployed by default.
Install [Traefik](https://doc.traefik.io/traefik/providers/kubernetes-ingress/), or another, if an Ingress controller is absent.
Traefik is used in Epinio CI to test Epinio.

There is installation documentation for [Traefik](../installation/install_epinio.md#ingress-controller)

:::

Epinio creates an Ingress resource for the Epinio API server and each application deployed.

### Cert-manager

[Cert-manager documentation](https://cert-manager.io/docs/)

Cert-manager is a Kubernetes controller that generates and renews certificates.
You need these certificates  to securely serve the endpoints over TLS (for example, the Epinio API server).

Epinio supports options when it comes to certificate issuers (Let's Encrypt, your own private CA, self signed certs).
Cert-manager simplifies the handling of certificate issuers within Epinio.

You can read more about certificate issuers at the [certificate issuers documentation](../howtos/other/certificate_issuers.md)

## Epinio installed components

The official way to install Epinio is with the [Epinio Helm chart](https://artifacthub.io/packages/helm/epinio/epinio).
This Helm chart installs Epinio and component dependencies, listed below, needed for Epinio to work.

### Epinio API server

The main component of Epinio is the API server.
The same `epinio` binary is both the server and the CLI.
The server starts with the `epinio server` command within a Kubernetes Pod, configured for Epinio.

Epinio CLI and web UI functionality are implemented using the endpoints provided by the Epinio API server component.
For example, when the user asks Epinio to "push" an application,
the CLI contacts the "Upload", "Stage" and "Deploy" endpoints of the Epinio API to:

- upload the application code
- create a container image for the application using this code
- run the application on the cluster.

The Epinio API server runs on the cluster and is reached using Kubernetes resources like
Deployments, Services,  Ingresses and Secrets.

### Kubed

[Kubed documentation](https://github.com/kubeops/kubed)

Epinio installs Kubed to keep secrets, needed in more than one namespace, synced.
For example, the image pull secret is needed in every application namespace
so that Kubernetes can pull the built application images from the [Container Registry](#container-registry).

Kubed makes sure that if the source secret changes, the copies change too.

:::warning
<!--TODO:Will not or may not? Does this require further explanation? If may not then under what circumstances?-->
If a secret is re-generated manually this may not work.

:::

### Minio

[Minio project link](https://github.com/minio/minio)

Minio is a storage solution implementing the same API as [Amazon S3](https://aws.amazon.com/s3/).

When the user pushes an application using a source code directory
(with the [`epinio push`](../references/commands/cli/epinio_push.md) command),
the CLI packages the source code into a tarball, and uploads it to the Epinio API server.
The API server copies that to the configured S3 storage for use during the staging of the application.

When installing Epinio, you choose to use external S3 compatible storage, or let Epinio install one of Minio or s3gw on the cluster.
You can see a [How-to here](../howtos/customization/setup_external_s3.md).

### s3gw

[The s3gw project link](https://github.com/aquarist-labs/s3gw)

S3gw is a lightweight S3-compatible solution.
You can specify it in the Epinio Helm chart as an alternative to Minio or an external S3 provider.

### Container Registry

The result of Epinio's application staging is a container image.
You use this image to create a Kubernetes deployment to run the application code.
The staging job writes the image to a container registry.
There is further information in the [detailed push process](detailed-push-process.md) documentation.

By default, the Epinio installation deploys a container registry inside the Kubernetes cluster, making the process fast and convenient.

Epinio comes with two consumers of this registry:

1. Staging job - pushing the images
2. Kubernetes - pulling the images when creating a deployment for the application

All consumers should communicate with the registry using TLS to encrypt communication.
Epinio controls the staging job and it ensures that it trusts the CA used to sign the registry certificate.
Achieving the same for Kubernetes requires configuration that's impossible from within the cluster,
therefore Epinio has no way to ensure that it trusts the CA.
Epinio runs in a pod of the cluster and can't have permission to change cluster settings.
Changes are only possible, from outside, by a cluster administrator.

There are 3 options:

1. Let the Epinio user manually configure Kubernetes to trust the CA
1. Use a well-known trusted CA, so there's no configuration needed
1. Don't encrypt the communication at all

Currently Epinio doesn't support the first 2 options.
If `containerregistry.enabled` is `true` during installation (default),
Epinio will make Kubernetes pull the images unencrypted (option #3 above).
If encryption is needed, the container registry should be installed manually
and configured as an ["external" registry](../howtos/customization/setup_external_registry.md)
during Epinio installation.

:::note

Communication between the staging job and container registry is TLS encrypted even when using the built-in container registry.

:::

## Other Advanced Topics

### Git pushing

The quick way of pushing an application, explained in
[Quickstart: push an application](../tutorials/quickstart.md#push-an-application),
uses a local directory containing a checkout of the application's sources.

Internally this is a [complex](detailed-push-process.md) procedure.
The client creates and uploads an archive (tarball or zip) from the sources to the Epinio server,
copying into Epinio's internal (or external) S3 storage.
It's then copied from that storage to a `PersistentVolumeClaim` to use in the job for staging.
Staging is the compilation and creation of the docker image for use by the underlying Kubernetes cluster.

The process is different when using the Epinio client's "git mode".
In this mode [`epinio push`](../references/commands/cli/epinio_push.md) doesn't take a local directory of sources,
but the location of a git repository and the id of the revision to use.
The client then asks the Epinio server to pull those sources and store them to the S3 storage.
The rest of the process is the same.

The syntax is

```console
epinio push --name NAME --git GIT-REPOSITORY-URL,REVISION
```

For comparison all the relevant syntax:

```console
epinio push
epinio push MANIFEST-PATH
epinio push --name NAME
epinio push --name NAME --path DIRECTORY
epinio push --name NAME --git GIT-REPOSITORY-URL,REVISION
```
