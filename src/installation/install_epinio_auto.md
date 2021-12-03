# Install Epinio auto

As described [in the top level document](src/installation/installation.md#installation-methods), this is the easiest method to get Epinio
running. It's using [`Helm`](https://helm.sh/) with a chart to deploy all Epinio's dependencies on the target cluster automatically.

## Prerequisites

You need to have these two binaries installed on your system:

- [helm](https://helm.sh/docs/intro/install/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)

The rest of this guide will assume they are on your PATH.

## Installation

Add the Epinio helm chart repository:

```
$ helm repo add epinio https://epinio.github.io/epinio-helm-chart
```

TODO: Describe system domain and pass it below

Install Epinio:

```
helm install epinio epinio/epinio-full --set systemDomain=TODO
```

TODO: Put a link to the values.yaml file and explain how they can change various options.
