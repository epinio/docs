---
sidebar_label: "AWS IAM integration"
sidebar_position: 27
title: "AWS IAM integration"
description: How-to use Amazon Web Services (AWS) Identity and Access Management (IAM) with Epinio.
keywords: [epinio, kubernetes, aws, iam]
doc-type: [how-to]
doc-topic: [epinio, customize, operations, aws-iam]
---

How-to use Amazon Web Services (AWS) Identity and Access Management (IAM) with Epinio.

## Authentication using an IAM profile

When using AWS S3 Epinio supports authentication by AWS IAM profile, instead of using regular credentials.
Epinio uses this mode when the credential keys are empty.
That is, `s3.accessKeyID=""`, and `s3.secretAccessKey=""`.
When using AWS, the Kubernetes cluster has to have an IAM policy attached.
This provides the permissions for access to S3.

### Example

Create a policy with

```console
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

Attach that policy to the instance role with

```console
aws iam attach-role-policy \
    --role-name "<your instance role here>" \
    --policy-arn "<your policy arn here>"
```

You can find the instance role with:

```console
kubectl -n kube-system describe configmap aws-auth \
  | grep rolearn | cut -d':' -f7 | cut -d'/' -f2
```

To clean up once finished, remove Epinio, detach and delete policies with:

```console
helm delete --wait epinio -n epinio
kubectl delete --wait ns epinio workspace

aws iam detach-role-policy \
  --role-name "<your instance role here>" \
  --policy-arn "<your policy arn here>"

# If created ad-hoc policy
aws iam list-policies #  find and copy EpinioECEKSClusterPolicy ARN used in next step
aws iam delete-policy --policy-arn arn:aws:iam::${AWS_ACCOUNT_ID}:policy/EpinioECEKSClusterPolicy

```

## Authentication with an AWS EKS service account

EKS is the Elastic Kubernetes Service.

For increased security you can attach the policy to the Epinio pod ServiceAccount.
You also need to create a specific ServiceAccount that you bind to the staging job with the `server.stagingWorkloads.serviceAccountName` value.

To use AWS IAM roles for service accounts, an IAM OIDC provider must exist for your cluster's OIDC issuer URL.

Find whether you have an existing IAM OIDC provider for your cluster with:

```console
oidc_id=$(aws eks describe-cluster --name ${CLUSTER_NAME} \
  --query "cluster.identity.oidc.issuer" \
  --output text | cut -d '/' -f 5)
aws iam list-open-id-connect-providers \
  | grep $oidc_id | cut -d "/" -f4
```

If the command returns any output, then you already have an IAM OIDC provider for your cluster so you can skip the next step.
If there is no output, then you must create an IAM OIDC provider for your cluster.
Check the [AWS guide](https://docs.aws.amazon.com/eks/latest/userguide/enable-iam-roles-for-service-accounts.html) for this task.

### Epinio server role

Make sure you have correctly deployed Epinio.
Later, you assign a new AWS Service Account to an existing Epinio installation with the `helm upgrade` command.

You need to create a IAM Role:

```bash
#!/bin/bash

set -euo pipefail

OIDC_PROVIDER=$(aws eks describe-cluster --name ${CLUSTER_NAME} --query "cluster.identity.oidc.issuer" --output text | sed -e "s/^https:\/\///")

FILENAME=trust-relationship.json

cat > ${FILENAME} <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::$AWS_ACCOUNT_ID:oidc-provider/$OIDC_PROVIDER"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "$OIDC_PROVIDER:aud": "sts.amazonaws.com",
          "$OIDC_PROVIDER:sub": "system:serviceaccount:epinio:epinio-server"
        }
      }
    }
  ]
}
EOF

aws iam create-role \
  --role-name epinio-server-role \
  --assume-role-policy-document file://${FILENAME} \
  --description "Epinio server role"

rm ${FILENAME}
```

You attach it to the policy:

```console
aws iam attach-role-policy \
    --role-name epinio-server-role \
    --policy-arn "arn:aws:iam::${AWS_ACCOUNT_ID}:policy/EpinioECEKSClusterPolicy"
```

And annotate the Epinio Service Account to bind it to the role:

```console
kubectl annotate serviceaccount epinio-server \
    --namespace epinio \
    "eks.amazonaws.com/role-arn=arn:aws:iam::${AWS_ACCOUNT_ID}:role/epinio-server-role"
```

### Epinio staging service account

The staging job needs a dedicated service account. You can create it with `eksctl`.
Since it's a new one, attach it directly to the existing policy:

```console
eksctl create iamserviceaccount \
    --name epinio-staging-service-account \
    --namespace epinio \
    --cluster ${CLUSTER_NAME} \
    --role-name "epinio-staging-role" \
    --attach-policy-arn "arn:aws:iam::${AWS_ACCOUNT_ID}:policy/EpinioECEKSClusterPolicy" \
    --approve
```

You can update your Helm deployment specifying this new service account by adding the flag<br/>
`--set server.stagingWorkloads.serviceAccountName=epinio-staging-service-account`<br/>
when upgrading Epinio:

```console
helm upgrade epinio epinio/epinio \
    --namespace epinio --create-namespace \
    --set global.domain=<MY_DOMAIN> \
    --set server.stagingWorkloads.serviceAccountName=epinio-staging-service-account \
    --wait
```

Once finished, to remove everything, remove Epinio, delete the service account, detach and delete the policies:

```console
helm delete --wait epinio -n epinio
kubectl delete --wait ns epinio workspace

eksctl delete iamserviceaccount \
--cluster $CLUSTER_NAME \
--name epinio-staging-service-account \
--namespace epinio

aws iam detach-role-policy \
--role-name epinio-server-role \
--policy-arn "arn:aws:iam::${AWS_ACCOUNT_ID}:policy/EpinioECEKSClusterPolicy"

aws iam delete-role \
--role-name epinio-server-role

aws iam list-policies #  find and copy EpinioECEKSClusterPolicy ARN used in next step
aws iam delete-policy \
--policy-arn arn:aws:iam::${AWS_ACCOUNT_ID}:policy/EpinioECEKSClusterPolicy
```
