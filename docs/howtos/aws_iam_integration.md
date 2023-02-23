---
sidebar_label: "AWS IAM integration"
sidebar_position: 26
title: ""
---

## Authentication through an IAM profile

When using AWS S3 Epinio further supports authentication by AWS IAM profile, instead of through regular credentials.

Epinio activates this mode when the credential keys are left empty. I.e. `s3.accessKeyID=""`, and `s3.secretAccessKey=""`.

In AWS the kubernetes cluster in question has to have an IAM policy attached to it which provides the permissions for access to S3.

### Example

Create a policy with

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

Attach that policy ot the instance role with

```
aws iam attach-role-policy \
    --role-name "<your instance role here>" \
    --policy-arn "<your policy arn here>"
```

The instance role can be determined with:

```
kubectl -n kube-system describe configmap aws-auth | grep rolearn | cut -d':' -f7 | cut -d'/' -f2
```

## Authentication with AWS EKS Service Account

For increased security the policy can be attached to just the Epinio pod ServiceAccount. You will also need to create a specific ServiceAccount that will be bound to the staging job with the `server.stagingServiceAccountName` value.

To use AWS IAM roles for service accounts, an IAM OIDC provider must exist for your cluster's OIDC issuer URL.  

Determine whether you have an existing IAM OIDC provider for your cluster with:

```
oidc_id=$(aws eks describe-cluster --name ${CLUSTER_NAME} --query "cluster.identity.oidc.issuer" --output text | cut -d '/' -f 5)
aws iam list-open-id-connect-providers | grep $oidc_id | cut -d "/" -f4
```

If output is returned, then you already have an IAM OIDC provider for your cluster and you can skip the next step. If no output is returned, then you must create an IAM OIDC provider for your cluster. Check the [AWS guide](https://docs.aws.amazon.com/eks/latest/userguide/enable-iam-roles-for-service-accounts.html) for this task.


### Epinio Server Role

You will need to create a IAM Role

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

attach it to the policy

```
aws iam attach-role-policy \
    --role-name epinio-server-role \
    --policy-arn "arn:aws:iam::${AWS_ACCOUNT_ID}:policy/EpinioECEKSClusterPolicy"
```

and annotate the Epinio Service Account to bind it to the role

```
kubectl annotate serviceaccount epinio-server \
    --namespace epinio \
    "eks.amazonaws.com/role-arn=arn:aws:iam::${AWS_ACCOUNT_ID}:role/epinio-server-role"
```

### Epinio staging Service Account

The staging job needs a dedicated Service Account. You can easily create it with `eksctl` since is a new one, attaching it directly with the existing policy:

```
eksctl create iamserviceaccount \
    --name epinio-staging-service-account \
    --namespace epinio \
    --cluster ${CLUSTER_NAME} \
    --role-name "epinio-staging-role" \
    --attach-policy-arn "arn:aws:iam::${AWS_ACCOUNT_ID}:policy/EpinioECEKSClusterPolicy" \
    --approve
```

and you can update your Helm deployment specifying this new service account:

```
helm upgrade epinio epinio/epinio \
    --namespace epinio --create-namespace \
    --set global.domain=<MY_DOMAIN> \
    --set server.stagingServiceAccountName=epinio-staging-service-account \
    --wait
```
