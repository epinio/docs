---
sidebar_label: Pushing with a Git job
sidebar_position: 6
title: Pushing with a Git job
description: How to do an Epinio push with a Git job.
keywords: [epinio, kubernetes, epinio push, git job]
doc-type: [how-to]
doc-topic: [epinio, how-to, other, gitjob-push]
doc-persona: [epinio-developer, epinio-operator]
---

<head>
  <link rel="canonical" href="https://docs.epinio.io/howtos/other/gitjob_push"/>
</head>

## Introduction

In certain other "application deployment" solutions,
there is a feature that lets you set up a deployment that rebuilds and republishes,
when your code repository in Git changes

You can have this functionality in Epinio using the GitJob CRD from [Rancher Fleet](https://fleet.rancher.io/).

## Setup

### Install GitJob

If you don't have Rancher, or stand-alone Fleet installed, you need to
[install the GitJob operator](https://github.com/rancher/gitjob#running).

Now you need to setup the Service Account to run your Jobs with.
You don't need to do anything using the Kube API, so you don't need to add any role bindings to it:

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: epinio-gitjob
```

### Check Epinio installation

If you are using Rancher, you can install Epinio directly from there.
For more information check the
[Rancher configuration](../../installation/other_inst_scenarios/install_epinio_on_rancher.md) with Epinio.

Once you have deployed Epinio,
log in as admin and verify that the namespace `workspace` exists.
It also needs to be the current target.
You can do this, if necessary, by running:

```console
epinio namespace create workspace 
epinio target workspace 
```

### Upload Epinio settings

For the GitJob to authenticate and push correctly, upload your Epinio settings file to the cluster with:

```console
kubectl create secret generic epinio-creds --from-file=$HOME/.config/epinio/settings.yaml
```

This creates a secret containing the settings.yaml when you do an `epinio login`

### Setup sample project

Next, as an example, you can use the 12factor app to write a GitJob.

Create a YAML file called `12factor-gitjob.yaml` containing:

```yaml
apiVersion: gitjob.cattle.io/v1
kind: GitJob
metadata:
  # The name of the GitJob, doesn't need to match the project.
  name: samplepush
spec:
  syncInterval: 15
  git:
    # The git repo and branch to track. 
    repo: https://github.com/epinio/example-12factor
    branch: main
  jobSpec:
    template:
      spec:
        # This should match what we created in the last step
        serviceAccountName: epinio-gitjob
        restartPolicy: "Never"
        containers:
        # This version should match your epinio deployment
        - image: "ghcr.io/epinio/epinio-server:v1.8.1"
          name: epinio-push
          volumeMounts:
          - name: settings
            mountPath: "/settings/"
            readOnly: true  
          - name: tmp
            mountPath: /tmp
            readOnly: false
          env:
          - name: EPINIO_SETTINGS
            value: "/settings/settings.yaml"
          command:
          - /epinio 
          args:
          - push
          - "--name"
          # This is the name of the app to push
          - test12factor
          workingDir: /workspace/source
        volumes:
        - name: settings
          secret:
            secretName: epinio-creds
        - name: tmp
          emptyDir: {}
```


You can apply this via:

```console
kubectl apply -f 12factor-gitjob.yaml
```

Once applied, you should see a Job and then Pod get created:

```console
kubectl get job,pod
```

You can follow the logs of the pod listed earlier with:

```console
kubectl logs <pod_name> -f
```

### Using Webhooks

If you prefer to use webhooks instead of polling,
set up the job in the same way as before but also follow the
[Rancher webhook instructions](https://github.com/rancher/gitjob#webhook).
