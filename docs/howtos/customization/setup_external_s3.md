---
sidebar_label: "Setting up external S3 storage"
sidebar_position: 7
title: "How to set up external S3 storage"
description: "How to set up external S3 storage"
keywords: [epinio, kubernetes, external S3 storage]
doc-type: [how-to]
doc-topic: [how-to, custom, external-s3-storage]
---

One of the steps involved in running `epinio push` is storing the requested version of the code in the configured Epinio S3 compatible storage.
By default, Epinio installs and configures [Minio](https://github.com/minio/minio) to use.
This document describes how to configure Epinio to use another S3 compatible storage and skip the Minio installation.

The Epinio Helm chart has the following optional parameters:

|Variable name|Description|Mandatory|Default|
|:---|:---|:---:|:---:|
|`minio.enabled`|Whether to install Minio or not|yes|"true"|
|`s3.bucket`|S3 bucket where you want to store your apps|yes|`epinio`|
|`s3.endpoint`|S3 endpoint|yes|`minio.epinio.svc.cluster.local`|
|`s3.accessKeyID`|S3 access key id to authenticate to the endpoint|no|random value when Minio is enabled|
|`s3.secretAccessKey`|S3 secret access key id to authenticate to the endpoint|no|random value when Minio is enabled|
|`s3.useSSL`|Use SSL for encryption|no|`true`|
|`s3.region`|S3 region where your bucket is|no|""|
|`s3.certificateSecret`|An existing TLS secret to be trusted (if self signed)|no|"minio-tls" if Minio is enabled|

To configure Epinio to store application sources to an external S3 compatible storage, at least the mandatory options should be set.

:::note

Some implementations don't need the location, for example, Minio and `s3.useSSL` has a default value of "true".

:::

For instance, add the following options to your Helm command to make Epinio pointing to AWS:

```console
--set minio.enabled=false \
--set s3.endpoint=s3.amazonaws.com \
--set s3.bucket=<your_bucket_here> \
--set s3.region=<your_region_here> \
--set s3.accessKeyID=<your_access_key_here> \
--set s3.secretAccessKey=<your_secret_access_key_here> \
```

If the bucket doesn't exist, Epinio will try to create it when it first writes to it.
Make sure the access key and the access secret have enough permissions to create a bucket and then write to it.

When you successfully push a new version of your application, Epinio removes the resources of the earlier staging process from the Kubernetes cluster.
It also deletes the earlier version of the sources from S3.
This way, Epinio doesn't store more than it needs on the S3 storage and no manual cleanup is necessary.
