---
sidebar_label: Recovering applications after CRD cycling
sidebar_position: 4
title: Recovering applications after CRD cycling
description: How to recover applications after cycling the Epinio CRDs
keywords: [epinio, kubernetes, application recovery, crd]
doc-type: [how-to]
doc-topic: [epinio, how-to, recovery]
doc-persona: [epinio-operator]
---

<head>
  <link rel="canonical" href="https://docs.epinio.io/howtos/use-develop/app_recover"/>
</head>

Epinio uses 3 Kubernetes CRDs to manage its service catalog entries, app charts, and application data.

When deleting a CRD Kubernetes also deletes all associated CRs.

If, during an upgrade of an Epinio installation Epinio's CRDs were deleted, this means that Epinio's
service catalog entries, custom app charts, and applications data are **gone**.

Regarding the latter note that the active parts of Epinio applications use regular Kubernetes
resources, and thus keep running during such an operation. Epinio however will lose track of these
applications.

To recover from such a scenario the best way is to have made backups of all catalog entries, app
charts, and application data before the upgrade operation, and then re-apply them after.

```bash
# SAVE
kubectl get app.application.epinio.io      -A -o yaml > APPLICATIONS
kubectl get appchart.application.epinio.io -A -o yaml > APPCHARTS
kubectl get service.application.epinio.io  -A -o yaml > CATALOG

# UPGRADE

# RESTORE
kubectl apply -f APPLICATIONS
kubectl apply -f APPCHARTS
kubectl apply -f CATALOG
```

If taking a backup was forgotten then recovery should be relatively easy for service catalog entries
and app charts. The standard entries and app charts are re-created when Epinio is re-installed.  For
the non-standard entries and app-charts it is expected that the operator has their definitions
available, precisely because they are non-standard, and managed by the operator instead of Epinio.

This leaves the application data.

Scaling information, environment variables, bound configuration and services are stored in regular
Kubernetes resources (Secrets) and are therefore not affected by the deletion. Recovery is automatic
when the central application CR is created.

An application data resource has the form

```yaml
apiVersion: application.epinio.io/v1
kind: App
metadata:
  annotations:
    epinio.io/created-by: admin
  name: fox
  namespace: workspace
spec:
  blobuid: 5d00477c-9a2d-4c6f-bdc3-d1094f4e8901
  builderimage: paketobuildpacks/builder-jammy-full:0.3.290
  chartname: standard
  imageurl: registry.epinio.svc.cluster.local:5000/apps/workspace-fox:1642fcf755ab41e8
  origin:
    path: /home/work/SUSE/dev/epinio/assets/sample-app
  routes:
  - fox.172.18.0.4.omg.howdoi.website
  - foxy.172.18.0.4.omg.howdoi.website
  stageid: 1642fcf755ab41e8
```

Recovery of the missing application requires filling out `name`, `namespace`, and `spec`.
Most of the necessary information can be found in the application pods (runtime and staging), and ingresses.
For inactive applications, which do not have pods nor ingresses, this means that the `spec` information is left empty.

Use
```bash
kubectl get pod -A -l 'app.kubernetes.io/managed-by=epinio'
```

to locate all application pods managed by Epinio.
This includes the staging pods.

The labels of the application's runtime pods directly provide application `name`, `namespace`, and `stageid`.
The `chartname` is indirectly recoverable by cross-referencing the value of `helm.sh/chart` against the app chart resources.
These should be recovered already.

|Label|Content|
|---|---|
|`app.kubernetes.io/name`|name
|`app.kubernetes.io/part-of`|namespace
|`epinio.io/stage-id`|stageid|
|`helm.sh/chart`|chartname, indirect via app charts|

Example:
```yaml
  labels:
    app.kubernetes.io/component: application
    app.kubernetes.io/managed-by: epinio
    app.kubernetes.io/name: fox
    app.kubernetes.io/part-of: workspace
    epinio.io/app-container: rfox-ff0f0a8b656f0b44c26933acd2e367b6c1211290
    epinio.io/stage-id: 1642fcf755ab41e8
    helm.sh/chart: epinio-application-0.1.26
    pod-template-hash: 5f9fd5c945
```

The `imageurl` is recoverable from the pod's `spec.containers[0].image`:

```yaml
spec:
  containers:
  - image: 127.0.0.1:30500/apps/workspace-fox:1642fcf755ab41e8
```

Replace the `host:port` part of the url with `registry.<ns>.svc.cluster.local:5000`.
The placeholder `<ns>` refers to the namespace Epinio was installed in.

The `blobuid` is recovered from the application's staging pod, specifically its `epinio.io/blob-uid` label.
An alternative location is the `BLOBID` environment variable found in the container specifications of the staging pod.

The `APPIMAGE` environment variable in the same place is an alternate location for the `imageurl` as well.
It is arguably even better, as no editing is required.

```yaml
- name: BLOBID
  value: 5d00477c-9a2d-4c6f-bdc3-d1094f4e8901
[...]
- name: APPIMAGE
  value: registry.epinio.svc.cluster.local:5000/apps/workspace-fox:1642fcf755ab41e8
```

Furthermore, the `spec.containers[0].image` value provides the `builderimage`.

```yaml
spec:
  containers:
  - args:
    - -c
    - source /stage-support/build
    command:
    - /bin/bash
    env:
    [...]
    image: paketobuildpacks/builder-jammy-full:0.3.290
[...]
```

To recover the application routes look at the Ingress resources in the application's namespace.
The ingresses for an application `<name>` are named `r<name>-...` and the listed hosts are the routes:

```bash
% kubectl get ingress -n workspace
NAME                                                              CLASS     HOSTS                                [...]
rfox-fox1721804omghowd-5af9c73b3c19f041d061042e158408a5275b015e   traefik   fox.172.18.0.4.omg.howdoi.website    [...]
rfox-foxy1721804omghow-22ecdc59ff0c5c7b0f328802c6abea7739c2a388   traefik   foxy.172.18.0.4.omg.howdoi.website   [...]
```

Not recoverable is the `origin` data. It is stored nowhere else in the system.

It is of course possible to enter it manually, if it is remembered.
