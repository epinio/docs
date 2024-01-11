---
sidebar_label: Epinio's MinIO service
sidebar_position: 30
title: Accessing Epinio's internal MinIO service
description: How to access Epinio's internal MinIO service
keywords: [epinio, kubernetes, internal minio service]
doc-type: [how-to]
doc-topic: [epinio, how-to, other, access-minio-service]
doc-persona: [epinio-developer]
---

<head>
  <link rel="canonical" href="https://docs.epinio.io/howtos/other/minio"/>
</head>

There are several ways to make Epinio's internal S3-compatible MinIO service available to use for debugging.
Here, two are covered,
first exposing the MinIO console web interface,
then accessing the MinIO service through the Amazon Web Services (AWS) CLI.
In both cases you expose the internal service through a Kubernetes `NodePort` service.

:::caution

For security reasons, make sure that you delete the exposed services immediately at the end of your debugging session.

:::

## Expose MinIO console web interface

The simplest way to access Epinio's internal MinIO service is using a web browser.
Copy the block below and paste it to a terminal configured to have access to your Kubernetes cluster.

```bash
kubectl expose pod minio-0 -n epinio --name epinio-console-np --port=9001 --type=NodePort
PORT=$(kubectl get svc -n epinio epinio-console-np -o jsonpath='{.spec.ports[0].nodePort}')
NODE=$(kubectl get nodes -o jsonpath="{.items[0].status.addresses[0].address}")
MINIO_USER=$(kubectl get secrets/minio-creds -n epinio -o=go-template='{{index .data "rootUser" | base64decode}}')
MINIO_PASS=$(kubectl get secrets/minio-creds -n epinio -o=go-template='{{index .data "rootPassword" | base64decode}}')
echo "Minio Console https://$NODE:$PORT, Username: $MINIO_USER Password: $MINIO_PASS"
```

The output from the command on the last line is similar to:

```console
Minio Console https://10.0.0.12:31689, Username: 20bDikQsszYpcrBc Password: kDRHftasmW0CyRjy
```

Now you can point your web browser to the MinIO console using the provided URL and credentials.

At the end of your debugging session delete the created service by running:

```console
kubectl delete service epinio-console-np -n epinio
```

## Access Epinio's MinIO through the AWS CLI

Another method is using the AWS CLI to communicate with the internal S3-compatible MinIO API endpoint.
If you choose this method copy the block below and paste it to a terminal configured to have access to your Kubernetes cluster.

```bash
kubectl expose pod minio-0 -n epinio --name epinio-api-np --port=9000 --type=NodePort
PORT=$(kubectl get svc -n epinio epinio-api-np -o jsonpath='{.spec.ports[0].nodePort}')
NODE=$(kubectl get nodes -o jsonpath="{.items[0].status.addresses[0].address}")
MINIO_KEY=$(kubectl get secrets/minio-creds -n epinio -o=go-template='{{index .data "accesskey" | base64decode}}')
MINIO_SECRET=$(kubectl get secrets/minio-creds -n epinio -o=go-template='{{index .data "secretkey" | base64decode}}')
```

Install AWS CLI according to Amazon's
[Getting Started Guide](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
and configure it to access the internal MinIO/S3 service as follows:

```bash
aws configure set aws_access_key_id $MINIO_KEY
aws configure set aws_secret_access_key $MINIO_SECRET
aws configure set default.region us-east-1
echo "Usage: aws --no-verify-ssl --endpoint-url https://$NODE:$PORT s3 ls"
```

For more information about using AWS CLI with S3, see Amazon's
[Getting Started Guide](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
and also the documentation from
[MinIO](https://min.io/docs/minio/linux/integrations/aws-cli-with-minio.html) on this topic.

At the end of your debugging session delete the created service by running:

```console
kubectl delete service epinio-api-np -n epinio
```
