---
sidebar_label: "Pushing With A Git Job"
sidebar_position: 5
title: ""
---

# Push with gitjob

In some other "application deployment" solutions, they have a feature that allows you to set up a deployment that rebuilds and republishes when your code stored in Git is changed.

We can recreate this functionality in Epinio using the GitJob CRD from [Rancher Fleet](https://fleet.rancher.io/).

NOTE: [We will improve this experience in the future](https://github.com/epinio/epinio/issues/1269)!

## Setup

### Install GitJob

If you don't have Rancher (or standalone Fleet) installed, we need to install the GitJob operator by following the instructions found at https://github.com/rancher/gitjob#running.


Then we need to setup the Service Account to run our Jobs with (since we don't need to do anything directly with the kube api, we don't need to add any role bindings to it):

```
apiVersion: v1
kind: ServiceAccount
metadata:
  name: epinio-push
```

### Upload Epinio Settings

So the GitJob can authenticate and push correctly, we can upload our Epinio settings file to the cluster with:

```
kubectl create secret generic epinio-creds --from-file=$HOME/.config/epinio/settings.yaml
```

This will create a secret containing the settings.yaml that was created locally when you do `epinio login`

### Setup Sample Project

Next, we can use the 12factor app to show how to write a GitJob.

Create a yaml file called `12factor-gitjob.yaml` containing:

``` yaml
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
        - image: "splatform/epinio-server:v0.6.0"
          name: epinio-push
          volumeMounts:
          - name: settings
            mountPath: "/settings/"
            readOnly: true
          env:
          - name: EPINIO_CONFIG
            value: "/settings/settings.yaml"
          command:
          - /epinio 
          args:
          - push 
          # This is the name of the app to push
          - test12factor
          workingDir: /workspace/source
        volumes:
        - name: settings
          secret:
            secretName: epinio-creds
```


You can apply this via:

```
kubectl apply -f 12factor-gitjob.yaml
```

Once applied, you should see a Job and then Pod get created:

```
kubectl get job,pod
```

You can follow the logs of the pod listed above with:

```
kubectl logs <pod_name> -f
```


### Using Webhooks

If you prefer to use webhooks instead of polling, set up the job in the same way as before but also follow the instructions found at: https://github.com/rancher/gitjob#webhook

