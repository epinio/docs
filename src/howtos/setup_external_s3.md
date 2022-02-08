## How to setup external S3 storage

One of the steps involved in running `epinio push` is storing the requested version of the code
in the configured Epinio S3 compatible storage. By default, Epinio installs and configures [Minio](https://github.com/minio/minio)
to be used for this purpose. This document describes how to point Epinio to another S3 compatible storage and skip the Minio installation.

The Epinio Helm chart has the following optional parameters:

|  Variable name | Description | Mandatory |Default |
|:---|:---|:---:|:---:|
| `useS3Storage`  | Use S3 storage | yes | "" |
| `s3Bucket`  | S3 bucket where you want to store your apps | yes | `epinio` |
| `s3Endpoint`  | S3 endpoint | yes | `minio.minio-epinio.svc.cluster.local` |
| `s3AccessKeyId`  | S3 access key id to authenticate to the endpoint | yes | "" |
| `s3SecretAccessKey`  | S3 secret access key id to authenticate to the endpoint| yes | "" |
| `s3UseSSL`  | Use SSL for encryption | no | `false` |
| `s3Location`  | S3 region where your bucket is | no | "" |

To configure Epinio to store application sources to an external S3 compatible storage, at least the mandatory options should be set.
(Some implementations don't need the location (e.g. Minio) and `s3-use-ssl` has a default value of "false")

For instance, add the following options to your Helm command to make Epinio pointing to AWS:

```
--set useS3Storage=true \
--set s3UseSSL=true \
--set s3Bucket=<your_bucket_here> \
--set s3Location=<your_region_here> \
--set s3Endpoint=s3.amazonaws.com \
--set s3AccessKeyId=<your_access_key_here> \
--set s3SecretAccessKey=<your_secret_access_key_here> \
```

If the bucket doesn't exist, Epinio will try to create it when it first tries
to write to it. Make sure the access key and the access secret have enough permissions
to create a bucket and then write to it.

When you successfully push a new version of your application, Epinio will remove the resources of the previous staging process from the Kubernetes cluster and
will also delete the previous version of the sources from S3. This way, Epinio doesn't store more than it needs on the S3 storage and the user doesn't need to manually cleanup.
