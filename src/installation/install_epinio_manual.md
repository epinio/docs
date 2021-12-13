# Install Epinio (the manual way)

As described [in the top level document](src/installation/installation.md#installation-methods), this method is intended for production level setups where operators want to have full control of the process.

## Prerequisites

Epinio needs a number of external components to be running on your cluster in order to work. You may already have those deployed, otherwise follow the instructions here to deploy them.

Important: Some of the namespaces of the components are hardcoded in the Epinio
code and thus are important to be the same as described here. In the future this
may be configurable on the Epinio Helm chart.

### Linkerd

- Optional

Download the linkerd cli from here: https://github.com/linkerd/linkerd2/releases/tag/stable-2.10.2

Install linkerd with:

```
$ kubectl create namespace linkerd
$ kubectl apply -f assets/embedded-files/linkerd/rbac.yaml 
$ linkerd install | kubectl apply -f - && linkerd check --wait 10m
```

### Traefik

Install Traefik with:

```
$ kubectl create namespace traefik
$ export LOAD_BALANCER_IP=$(LOAD_BALANCER_IP:-) # Set this to the IP of your load balancer if you know that
$ helm install traefik --namespace traefik "https://helm.traefik.io/traefik/traefik-10.3.4.tgz" \
		--set globalArguments='' \
		--set-string deployment.podAnnotations.linkerd\\.io/inject=enabled \
		--set-string ports.web.redirectTo=websecure \
		--set-string ingressClass.enabled=true \
		--set-string ingressClass.isDefaultClass=true \
		--set-string service.spec.loadBalancerIP=$LOAD_BALANCER_IP
```

### Install Kubed

```
$ kubectl create namespace kubed 
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm install kubed --namespace kubed --version v0.12.0 appscode/kubed
```

### Install Cert Manager

```
$ kubectl create namespace cert-manager
$ helm repo add jetstack https://charts.jetstack.io
$ helm repo update
$ helm install cert-manager --namespace cert-manager jetstack/cert-manager \
		--set installCRDs=true \
		--set extraArgs[0]=--enable-certificate-owner-ref=true
```

### Install Tekton

```
$ kubectl create namespace tekton
$ kubectl label namespace tekton "linkerd.io/inject"="enabled"
$ kubectl apply -f https://raw.githubusercontent.com/epinio/epinio/main/assets/embedded-files/tekton/pipeline-v0.28.0.yaml
```

### S3 compatible storage

Epinio needs an S3 compatible storage solution to store the code of the various applications
to be staged. Any S3 compatible storage can be used. [MinIO](https://github.com/minio/operator) 
also works and it is what the [epinio-installer](./install_epinio_auto.md) helm chart deploys.

### Install Registry (Optional)

Any container registry that supports basic auth authentication can be used (e.g. gcr, dockerhub etc)
The [container-registry chart](https://artifacthub.io/packages/helm/epinio/container-registry) which
the [epinio-install](.install_epinio_auto.md) deploys can also be used.

The deployment of a registry inside the cluster is out of scope for this guide.
One thing to keep in mind is that there are 2 consumers of that registry inside Epinio:

- The tekton pipeline that pushes the images
- Kubernetes when they pull the generated application images to create the application pods

Both of them should be able to access the registry and should trust the CA certificate that signs its TLS certificate.

### Install Epinio

The Epinio specific resources can be deployed on the cluster using [the epinio helm chart](https://artifacthub.io/packages/helm/epinio/epinio)

First create the epinio namespace and add it to the Linkerd mesh.

```
$ kubectl create namespace epinio
$ kubectl label namespace epinio "linkerd.io/inject"="enabled"
```

Create a `values.yaml` file for Epinio. Look at the available options here:

https://github.com/epinio/helm-charts/blob/main/chart/epinio/values.yaml

Install Epinio with:

```
$ helm repo add epinio https://epinio.github.io/helm-charts
$ helm upgrade --install epinio epinio/epinio -n epinio --values values.yaml
```

The following command will update the local Epinio config:

```
$ epinio config update
```

Now the installation is done. The configured system domain needs to point to the
Traefik ingress controller. Read here how to find the IP address of the controller: [configure DNS](./install_epinio_auto.md#setup-dns).
