---
sidebar_label: "Epinio push process"
title: "The Epinio push process in detail"
description: The Epinio push process in detail
keywords: [epinio, kubernetes, push process]
---

Epinio makes use of well supported, well known projects.
There is further discussion about this in the  ([project principles](principles.md#guidelines-soft-principles)) document.
While doing so, Epinio makes sure those components are correctly deployed and work together seamlessly.
This detailed description of the Epinio push process lets you understand the components and their relationships.

There is a diagram of the Epinio push process later on this page.
You may want to refer to it while reading the text to aid understanding.
The numbers on the paths in the image indicate process ordering.

## Epinio push (step 1)

Epinio exposes an API server, running inside the Kubernetes cluster, for all clients, including the CLI, to communicate with Epinio.

Running the `epinio push` CLI command, creates an archive containing application code.
Then the archive package is uploaded to the API server (step 1a).
An Kubernetes Ingress controller (for example, Traefik) routes your request to the API server (1b).

Request authentication at the API server uses
BasicAuth, session cookie or, if using WebSockets, a token.

## Copying the code to S3 (step 2)

The Epinio helm-chart can install either [Minio](https://min.io/) (the default) or [s3gw](https://s3gw.io/) on your cluster.
You can also [configure external S3](../howtos/customization/setup_external_s3.md). Both Minio and s3gw are S3-compatible storage solutions which Epinio uses to store application source code.
The chosen S3 storage solution is later used by the staging job.

After successful authentication (step 1),
the API server uploads the tarball to the S3 endpoint and
responds with a `blobUID` that can be later used to reference the uploaded tarball.

## Staging the app (step 3)

When the upload request is complete, the cli will send a request to the `stage` endpoint of the Epinio API server. This will instruct the server to start the staging of the uploaded code.

## Trigger the job (step 4)

When the Epinio API server receives the stage request, it will create a [`Job`](https://kubernetes.io/docs/concepts/workloads/controllers/job/) that will run the staging scripts using the version of the code referenced in the request. This job has 3 steps and each one is a script stored in a ConfigMap called `epinio-stage-scripts` in the namespace where epinio is installed.
Their role is described in the following 3 sections.

## Fetch the code (step 5)

The first step of staging downloads the code from the S3 storage. This makes the code available to the following steps.

## Unpack the sources (step 6)

The second step of staging detects the type of the archive and unpacks it.
Supported formats are: **zip, tar, tgz, tbz, txz**

## Stage (step 7)

The third step of staging uses the [paketo buildpacks](https://paketo.io/) to create a container image for your application.
The result of a successful staging process is a new image pushed to the Registry component of Epinio.
Read more about the registry here: [Epinio Registry](../explanations/advanced.md#container-registry).

## Run (step 8)

To run a workload on Kubernetes having a container image is not enough. You need at least a Pod running with at least one container running that image.

This is done again by the API server, on demand by the client (8a) after noting the completion of the staging process.

The most important resources that are created (8c) are a [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/), a [Service](https://kubernetes.io/docs/concepts/services-networking/service/) and an [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) resource.

The needed resources are part of a Helm chart which epinio uses to deploy the application. The application helm chart source lives here: [Epinio application helm chart](https://github.com/epinio/helm-charts/tree/main/chart/application).

Because it's a helm release, the deployed applications can also be listed using helm: `helm list -n workspace`

(assuming the applications are deployed in the default namespace "workspace").

## Pull image (step 9)

The Deployment uses the image that was pushed as part of the staging step (7). Now, the kubelet will pull the image from the registry for the deployment resource to use it (9).

You can read how these resources work in Kubernetes following the provided links but if you have to know one thing is that Ingress is the thing that describes how a request that uses the Application's url is routed to the application container. In Kubernetes, the thing that reads that description and implements the routing is called an Ingress Controller. Such an Ingress Controller is provided by [Traefik](https://doc.traefik.io/traefik/providers/kubernetes-ingress/).

## Ingress Implementation

As described [in the "Advanced Topics"](./advanced.md#ingress-controller), Epinio needs an ingress controller to work. The ingress controller reads your Ingress Resource Definitions and implements the desired routing to the appropriate Services/Pods.

In Epinio, for every application we create an Ingress that routes the traffic for this application through a subdomain that looks something like this:

```
myapplication.my_epinio_system_domain.com
```

You can get the route of your application with `epinio apps list` or `epinio apps show myapplication`. By specifying one or more `--route` options, either with the `epinio push` command or later with `epinio app update`, it is possible to set and use arbitrary custom routes for the application . __Make sure__ that these custom domains point to the Ingress controller IP (that is the same IP address your system-domain points to).

## The Process Visualized

![epinio-push-detailed](epinio-push-detailed.svg?raw=true "Epinio push")

## Credits

- Icons from: https://materialdesignicons.com/ (Source: https://github.com/Templarian/MaterialDesign)
