---
sidebar_label: Epinio's SeaweedFS (S3) service
sidebar_position: 30
title: Accessing Epinio's internal SeaweedFS S3 service
description: How to access Epinio's internal SeaweedFS S3-compatible service
keywords: [epinio, kubernetes, internal seaweedfs, s3 service]
doc-type: [how-to]
doc-topic: [epinio, how-to, other, access-s3-service]
doc-persona: [epinio-developer]
---

Epinio uses [SeaweedFS](https://github.com/seaweedfs/seaweedfs) as its default S3-compatible storage for application source code.
You can expose the internal S3 API for debugging, for example using the Amazon Web Services (AWS) CLI or the MinIO Client (`mc`).
In both cases you expose the internal service through a Kubernetes `NodePort` service.

:::caution

For security reasons, delete the exposed services when you finish debugging.

:::

## Access Epinio's S3 storage through the AWS CLI

Expose the SeaweedFS S3 service and use the AWS CLI to talk to it.

```bash
# Expose the SeaweedFS S3 service (service name may vary; typically seaweedfs-s3)
kubectl expose deployment seaweedfs-s3 -n epinio --name epinio-s3-np --port=8333 --type=NodePort
# If the S3 component is a different workload type, use the appropriate resource (e.g. pod or service)
PORT=$(kubectl get svc -n epinio epinio-s3-np -o jsonpath='{.spec.ports[0].nodePort}')
NODE=$(kubectl get nodes -o jsonpath="{.items[0].status.addresses[0].address}")
S3_KEY=$(kubectl get secrets/seaweedfs-creds -n epinio -o=go-template='{{index .data "accesskey" | base64decode}}')
S3_SECRET=$(kubectl get secrets/seaweedfs-creds -n epinio -o=go-template='{{index .data "secretkey" | base64decode}}')
```

Install the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) and configure it for the internal S3 endpoint:

```bash
aws configure set aws_access_key_id $S3_KEY
aws configure set aws_secret_access_key $S3_SECRET
aws configure set default.region us-east-1
echo "Usage: aws --no-verify-ssl --endpoint-url https://$NODE:$PORT s3 ls"
```

To list the Epinio bucket:

```bash
aws --no-verify-ssl --endpoint-url https://$NODE:$PORT s3 ls s3://epinio/
```

When you are done, remove the NodePort service:

```console
kubectl delete service epinio-s3-np -n epinio
```

## Access using MinIO Client (mc)

You can also use the [MinIO Client](https://min.io/docs/minio/linux/reference/minio-mc.html) (`mc`), which works with any S3-compatible API.
After exposing the S3 service as above, configure an alias and use `mc ls`, `mc cp`, etc. as needed.

For more on S3-compatible access, see [AWS CLI S3](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) and [MinIO Client with S3](https://min.io/docs/minio/linux/integrations/aws-cli-with-minio.html).
