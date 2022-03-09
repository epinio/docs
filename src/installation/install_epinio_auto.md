# Install Epinio (automatic dependencies)

As described [in the top level document](./installation.md#installation-methods) the easiest method to get Epinio
running is using a [`Helm`](https://helm.sh/) chart to deploy all Epinio's dependencies on the target cluster automatically.

## Prerequisites

You need to have these three binaries installed on your system:

- [helm](https://helm.sh/docs/intro/install/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- [epinio](install_epinio_cli.md)

The rest of this guide will assume they are in your PATH.

## Installation

### Choose a domain for Epinio

Epinio uses a "system domain" to create routes for the Epinio API and the applications it deploys.

**This must be a wildcard domain pointing to the Traefik ingress controller which the Epinio helm chart will deploy to your cluster.**

Depending on the Kubernetes cluster, an IP address that will point to the Traefik
service may be known even before Traefik is deployed (e.g. when using a k3d cluster,
the IP address of the k3d can be used).
In other cases, the IP address that the domain should point to, becomes known
only after Traefik is deployed (e.g. when the cluster is running on some public cloud
provider). And finally, sometimes, an IP address can be bought separately and
Epinio should be instructed to use it (using the `loadbalancerIP` helm value).

In any case, the deployment of Epinio can happen before the DNS setup. This means,
after installation, Epinio may not be accessible until the domain that was
specified during installation, points to the IP address of Traefik.

Set the `EPINIO_SYSTEM_DOMAIN` environment variable which will be used in the
next step:

```
$ export EPINIO_SYSTEM_DOMAIN=myepiniodomain.org
```

(replace the value with the desired domain)


### Deploy Epinio

Add the Epinio helm chart repository:


```
$ helm repo add epinio https://epinio.github.io/helm-charts
```


Install Epinio with the epinio-installer helm chart:

```
$ helm install --set domain=$EPINIO_SYSTEM_DOMAIN epinio-installer epinio/epinio-installer
```

### Setup DNS

After the installation is complete, the domain should point to the IP address of
Traefik. The following command may be used to find that IP address:

```
$ kubectl get svc -n traefik -o jsonpath="{.items[0].status.loadBalancer.ingress[0]}"
```

### Access Epinio

The following command will update your local Epinio settings file to point to the
Epinio instance that runs on the currently targeted Kubernetes cluster:

```
$ epinio settings update
```

Verify you can talk to Epinio:

```
$ epinio info
```

If this command succeeds, Epinio is accessible and you can now [deploy your first application](../tutorials/quickstart.md).
