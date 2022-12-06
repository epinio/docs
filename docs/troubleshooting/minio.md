---
sidebar_label: "Accessing Epinio's Internal Minio Service"
title: ""
---

# Accessing Epinio's Internal MinIO Service

There are several ways to make an internal S3-compatible MinIO service available for debugging purposes. In this document, we will cover only two of them, exposing the Minio-console web interface and accessing the Minio service through the AWS CLI. In both cases we will expose the internal service by using `NodePort` service type.

:::caution

For security reasons, make sure that you've deleted the exposed services immediately at the end of your debugging session.

:::

## Expose Minio console web interface

Simplest way to access internal Minio service is by using a web browser. Copy the block below and paste it to the terminal with configured access to your kubernetes cluster.

```bash
kubectl expose pod minio-0 -n epinio --name epinio-console-np --port=9001 --type=NodePort
PORT=$(kubectl get svc -n epinio epinio-console-np -o jsonpath='{.spec.ports[0].nodePort}')
NODE=$(kubectl get nodes -o jsonpath="{.items[0].status.addresses[0].address}")
MINIO_USER=$(kubectl get secrets/minio-creds -n epinio -o=go-template='{{index .data "rootUser" | base64decode}}')
MINIO_PASS=$(kubectl get secrets/minio-creds -n epinio -o=go-template='{{index .data "rootPassword" | base64decode}}')
echo "Minio Console https://$NODE:$PORT, Username: $MINIO_USER Password: $MINIO_PASS"
```

Output of the last line will be similar to this one:
```
Minio Console https://10.0.0.12:31689, Username: 20bDikQsszYpcrBc Password: kDRHftasmW0CyRjy
```

Now you can point your web browser to the Minio console using the provided URL and credentials.


At the end of your debugging session delete the created service by running:
```bash
kubectl delete service epinio-console-np -n epinio
```

## Access Minio by using AWS CLI
Another method is to use AWS CLI to communicate with internal S3-compatible Minio API endpoint. If you choose this method just simply copy the block below and paste it to the terminal with configured access to your kubernetes cluster.

```bash
kubectl expose pod minio-0 -n epinio --name epinio-api-np --port=9000 --type=NodePort
PORT=$(kubectl get svc -n epinio epinio-api-np -o jsonpath='{.spec.ports[0].nodePort}')
NODE=$(kubectl get nodes -o jsonpath="{.items[0].status.addresses[0].address}")
MINIO_KEY=$(kubectl get secrets/minio-creds -n epinio -o=go-template='{{index .data "accesskey" | base64decode}}')
MINIO_SECRET=$(kubectl get secrets/minio-creds -n epinio -o=go-template='{{index .data "secretkey" | base64decode}}')
```

Install AWS CLI according to this [document](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) and configure it to access internal Minio/S3 service as follows:

```bash
aws configure set aws_access_key_id $MINIO_KEY
aws configure set aws_secret_access_key $MINIO_SECRET
aws configure set default.region us-east-1
echo  "Usage: aws --no-verify-ssl --endpoint-url https://$NODE:$PORT s3 ls"
```

For information about using AWS CLI with S3, see the official [documentation](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) and also documentation from [MinIO](https://min.io/docs/minio/linux/integrations/aws-cli-with-minio.html).


At the end of your debugging session delete the created service by running:
```bash
kubectl delete service epinio-api-np -n epinio
```
