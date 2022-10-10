---
sidebar_label: "Detailed Push Process"
title: ""
---

# Epinio Push in Detail

Epinio strives to make use of well supported, well known, and loved projects instead of re-inventing the wheel ([link](principles.md#guidelines-soft-principles)).
But while doing so, it makes sure those components are deployed correctly and work together seamlessly. Let's go through the `epinio push` process in detail,
so you can understand what each component does. You may also want to read the description of every component outside the push process here: [Advanced Topics](advanced.md).

You can see an image that visualises the process later in this page. Refer to it while reading the text to help you understand the process more.
The numbers on the various arrows on the image indicate the order of the various steps.

## 1. Epinio Push

Epinio exposes an API server running inside the kubernetes cluster for all clients including cli to talk to it. When you run the `epinio push` command, the first thing the cli is going to do, is to create an archive with the application's code and hit the relevant api endpoint to upload it to the API server (1a). There is a Traefik ingress which sits in front of the Epinio API server which routes your request to the API server (1b).

When the request lands on the server, the user is authenticated using BasicAuth, session cookie or (in the case of websockets) a token.

## 2. Copying the code to S3

One of the components Epinio installs on your cluster is [Minio](https://min.io/) (unless you [configured external S3](../howtos/setup_external_s3.md)). Minio is an S3 compatible storage solution. Epinio uses it to store the application's source code. It will later be used by the staging job.

After successful authentication (previous step), the API server uploads the tarball to the S3 endpoint and responds with a blobUID that can be later used to reference the uploaded tarball.

## 3. Staging the App

When the upload request is complete, the cli will send a request to the `stage` endpoint of the Epinio API server. This will instruct the server to start the staging of the uploaded code.

## 4. Trigger the Job

When the Epinio API server receives the stage request, it will create a [`Job`](https://kubernetes.io/docs/concepts/workloads/controllers/job/) that will run the staging scripts using the version of the code referenced in the request. This job has 3 steps and each one is a script stored in a ConfigMap called `epinio-stage-scripts` in the namespace where epinio is installed.
Their role is described in the following 3 sections.

## 5. Fetch the code

The first step of staging downloads the code from the S3 storage. This makes the code available to the following steps.

## 6. Unpack the sources

The second step of staging detects the type of the archive and unpacks it.
Supported formats are: **zip, tar, tgz, tbz, txz**

## 7. Stage

The third step of staging uses the [paketo buildpacks](https://paketo.io/) to create a container image for your application.
The result of a successful staging process is a new image pushed to the Registry component of Epinio.
Read more about the registry here: [Epinio Registry](../explanations/advanced.md#container-registry).

## 8. Run

To run a workload on Kubernetes having a container image is not enough. You need at least a Pod running with at least one container running that image.

This is done again by the API server, on demand by the client (8a) after noting the completion of the staging process.

The most important resources that are created (8c) are a [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/), a [Service](https://kubernetes.io/docs/concepts/services-networking/service/) and an [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) resource.

The needed resources are part of a Helm chart which epinio uses to deploy the application. The application helm chart source lives here: [Epinio application helm chart](https://github.com/epinio/helm-charts/tree/main/chart/application).

Because it's a helm release, the deployed applications can also be listed using helm: `helm list -n workspace`

(assuming the applications are deployed in the default namespace "workspace").

## 9. Pull Image

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
