---
sidebar_label: "Setting Up External S3 Storage"
sidebar_position: 6
title: ""
---

## How to setup external S3 storage

One of the steps involved in running `epinio push` is storing the requested version of the code
in the configured Epinio S3 compatible storage. By default, Epinio installs and configures [Minio](https://github.com/minio/minio)
to be used for this purpose. This document describes how to point Epinio to another S3 compatible storage and skip the Minio installation.

The Epinio Helm chart has the following optional parameters:

|  Variable name | Description | Mandatory |Default |
|:---|:---|:---:|:---:|
| `minio.enabled`  | Whether to install Minio or not | yes | "true" |
| `s3.bucket`  | S3 bucket where you want to store your apps | yes | `epinio` |
| `s3.endpoint`  | S3 endpoint | yes | `minio.epinio.svc.cluster.local` |
| `s3.accessKeyID`  | S3 access key id to authenticate to the endpoint | no | random value when Minio is enabled |
| `s3.secretAccessKey`  | S3 secret access key id to authenticate to the endpoint| no | random value when Minio is enabled |
| `s3.useSSL`  | Use SSL for encryption | no | `true` |
| `s3.region`  | S3 region where your bucket is | no | "" |
| `s3.certificateSecret`  | An existing TLS secret to be trusted (if self signed) | no | "minio-tls" if Minio is enabled |

To configure Epinio to store application sources to an external S3 compatible storage, at least the mandatory options should be set.
> NOTE: Some implementations don't need the location (e.g. Minio) and `s3.useSSL` has a default value of "true".

For instance, add the following options to your Helm command to make Epinio pointing to AWS:

```
--set minio.enabled=false \
--set s3.endpoint=s3.amazonaws.com \
--set s3.bucket=<your_bucket_here> \
--set s3.region=<your_region_here> \
--set s3.accessKeyID=<your_access_key_here> \
--set s3.secretAccessKey=<your_secret_access_key_here> \
```

If the bucket doesn't exist, Epinio will try to create it when it first tries
to write to it. Make sure the access key and the access secret have enough permissions
to create a bucket and then write to it.

When you successfully push a new version of your application, Epinio will remove the resources of the previous staging process from the Kubernetes cluster and
will also delete the previous version of the sources from S3. This way, Epinio doesn't store more than it needs on the S3 storage and the user doesn't need to manually cleanup.

## Authentication through an IAM profile

When using AWS S3 it is also possible to authenticate access via an AWS IAM profile, instead of through regular credentials.

On the Epinio side this is done by simply leaving the credential keys empty, i.e. `s3.accessKeyID=""`, and `s3.secretAccessKey=""`.

On the AWS side the kubernetes cluster in question has to have an IAM policy attached to it which provides the permissions for access to S3.

As an example a policy can be created with

```
aws iam create-policy \
    --policy-name EpinioECEKSClusterPolicy \
    --policy-document \
'{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:ListBucket",
                "s3:PutObject",
                "s3:GetObject",
                "s3:GetBucketLocation",
                "s3:ListAllMyBuckets",
                "s3:CreateBucket",
                "s3:DeleteObject",
                "sts:AssumeRole"
            ],
            "Resource": [
                "*"
            ]
        }
    ]
}'
```

and then attached to the instance role via

```
aws iam attach-role-policy \
    --role-name <your instance role here> \
    --policy-arn 'arn:aws:iam::0123456789:policy/EpinioECEKSClusterPolicy'
```

The instance role can be determined through

```
kubectl -n kube-system describe configmap aws-auth | grep rolearn | cut -d':' -f7 | cut -d'/' -f2
```
