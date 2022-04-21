# Additional Application Helm charts

Epinio deploys applications on Kubernetes as [Helm charts](https://helm.sh/). A default Helm chart is used but more can be added by the operators.
The developers can use the Helm charts created by the operators when deploying their applications.
This separation allows operators to define multiple ways to deploy applications without developers having to worry how this works.
This page describes how an operator can create a custom Helm chart and how developers can make use of that.

## Creating a custom Helm chart [Operators]

A good starting point is the default (or "standard") Epinio Helm chart. The source code for that lives here: https://github.com/epinio/helm-charts/tree/main/chart/application
Start by cloning that git repository:

```
$ git clone https://github.com/epinio/helm-charts.git
$ cd helm-charts/chart/application
```

Now let's make a little modification to this helm chart. Let's assume we want to add an annotation to every application Deployment so that we can use it to filter the Epinio applications in [fluentd](https://www.fluentd.org/). In this example we won't describe how to setup fluend for this, we will only focus on how a custom Helm chart can be used to add an annotation to the application Deployment.

In the [Deployment template](https://github.com/epinio/helm-charts/blob/main/chart/application/templates/deployment.yaml) in the [annotations section](https://github.com/epinio/helm-charts/blob/117d76834ba9578c2a594989397e61edf19c2708/chart/application/templates/deployment.yaml#L15), add the following annotations:

```
fluentd-enable: "true"
fluentd-application-name: {{ .Values.epinio.appName }}
```

As you can see, we expect Epinio to set the `.epinio.appName` value. There are more values Epinio sets, which can be found [in the values.yaml file](https://github.com/epinio/helm-charts/blob/main/chart/application/values.yaml)

Now it's time to build our modified helm chart. From the root of the checked-out
repository (see above):

```
$ helm package chart/epinio
```

This will create a tarball of the helm chart in the current directory.

> Normally we should at least also change the version of the Chart. The subject
> of this document is not Helm chart development though, so we keep things simple.

Now we need to copy this tarball on some publicly accessible server. There are
many options for this. For this guide, we will assume the helm chart tarball is
accessible on this example URL:

```
https://mydomain.org/epinio-0.8.1-custom.tgz
```

## Add the helm chart to Epinio [Operators]

TODO: Should we remove the `epinio app chart create` command?
      The operators have kubectl access and can create resources with yaml.
      We don't want developers to mess with how applications are deployed.
      After we decide, we should write this section.

## Listing available Helm charts [Developers]

Now the new application chart is ready and available to the Epinio users.
It can be passed as an argument to `epinio push`, `epinio app create` or `epinio app update`.


## Deploying application with a custom Helm chart [Developers]

## Changing the default Helm chart [Developers]
