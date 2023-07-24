"use strict";(self.webpackChunkepinio_docusaurus=self.webpackChunkepinio_docusaurus||[]).push([[68589],{3905:function(e,n,t){t.d(n,{Zo:function(){return p},kt:function(){return m}});var i=t(67294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,i,r=function(e,n){if(null==e)return{};var t,i,r={},o=Object.keys(e);for(i=0;i<o.length;i++)t=o[i],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)t=o[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var s=i.createContext({}),l=function(e){var n=i.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},p=function(e){var n=l(e.components);return i.createElement(s.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return i.createElement(i.Fragment,{},n)}},d=i.forwardRef((function(e,n){var t=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),d=l(t),m=r,h=d["".concat(s,".").concat(m)]||d[m]||u[m]||o;return t?i.createElement(h,a(a({ref:n},p),{},{components:t})):i.createElement(h,a({ref:n},p))}));function m(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=t.length,a=new Array(o);a[0]=d;var c={};for(var s in n)hasOwnProperty.call(n,s)&&(c[s]=n[s]);c.originalType=e,c.mdxType="string"==typeof e?e:r,a[1]=c;for(var l=2;l<o;l++)a[l]=t[l];return i.createElement.apply(null,a)}return i.createElement.apply(null,t)}d.displayName="MDXCreateElement"},61074:function(e,n,t){t.r(n),t.d(n,{assets:function(){return p},contentTitle:function(){return s},default:function(){return m},frontMatter:function(){return c},metadata:function(){return l},toc:function(){return u}});var i=t(83117),r=t(80102),o=(t(67294),t(3905)),a=["components"],c={sidebar_label:"AWS IAM integration",sidebar_position:27,title:""},s=void 0,l={unversionedId:"howtos/aws_iam_integration",id:"version-1.8.1/howtos/aws_iam_integration",title:"",description:"Authentication through an IAM profile",source:"@site/versioned_docs/version-1.8.1/howtos/aws_iam_integration.md",sourceDirName:"howtos",slug:"/howtos/aws_iam_integration",permalink:"/1.8.1/howtos/aws_iam_integration",draft:!1,editUrl:"https://github.com/epinio/docs/edit/main/versioned_docs/version-1.8.1/howtos/aws_iam_integration.md",tags:[],version:"1.8.1",sidebarPosition:27,frontMatter:{sidebar_label:"AWS IAM integration",sidebar_position:27,title:""},sidebar:"docs",previous:{title:"How To Install Wordpress With Epinio",permalink:"/1.8.1/howtos/install_wordpress_application"},next:{title:"Accessing Epinio's Internal Minio Service",permalink:"/1.8.1/howtos/minio"}},p={},u=[{value:"Authentication through an IAM profile",id:"authentication-through-an-iam-profile",level:2},{value:"Example",id:"example",level:3},{value:"Authentication with AWS EKS Service Account",id:"authentication-with-aws-eks-service-account",level:2},{value:"Epinio Server Role",id:"epinio-server-role",level:3},{value:"Epinio staging Service Account",id:"epinio-staging-service-account",level:3}],d={toc:u};function m(e){var n=e.components,t=(0,r.Z)(e,a);return(0,o.kt)("wrapper",(0,i.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"authentication-through-an-iam-profile"},"Authentication through an IAM profile"),(0,o.kt)("p",null,"When using AWS S3 Epinio further supports authentication by AWS IAM profile, instead of through regular credentials."),(0,o.kt)("p",null,"Epinio activates this mode when the credential keys are left empty. I.e. ",(0,o.kt)("inlineCode",{parentName:"p"},'s3.accessKeyID=""'),", and ",(0,o.kt)("inlineCode",{parentName:"p"},'s3.secretAccessKey=""'),"."),(0,o.kt)("p",null,"In AWS the kubernetes cluster in question has to have an IAM policy attached to it which provides the permissions for access to S3."),(0,o.kt)("h3",{id:"example"},"Example"),(0,o.kt)("p",null,"Create a policy with"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'aws iam create-policy \\\n    --policy-name EpinioECEKSClusterPolicy \\\n    --policy-document \\\n\'{\n    "Version": "2012-10-17",\n    "Statement": [\n        {\n            "Effect": "Allow",\n            "Action": [\n                "s3:ListBucket",\n                "s3:PutObject",\n                "s3:GetObject",\n                "s3:GetBucketLocation",\n                "s3:ListAllMyBuckets",\n                "s3:CreateBucket",\n                "s3:DeleteObject",\n                "sts:AssumeRole"\n            ],\n            "Resource": [\n                "*"\n            ]\n        }\n    ]\n}\'\n')),(0,o.kt)("p",null,"Attach that policy ot the instance role with"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'aws iam attach-role-policy \\\n    --role-name "<your instance role here>" \\\n    --policy-arn "<your policy arn here>"\n')),(0,o.kt)("p",null,"The instance role can be determined with:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"kubectl -n kube-system describe configmap aws-auth | grep rolearn | cut -d':' -f7 | cut -d'/' -f2\n")),(0,o.kt)("p",null,"To clean up once finished, remove Epinio, detach and delete policies with:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'helm delete --wait epinio -n epinio \nkubectl delete --wait ns epinio workspace \n \naws iam detach-role-policy \\\n  --role-name "<your instance role here>" \\\n  --policy-arn "<your policy arn here>"\n \n# If created ad-hoc policy\naws iam list-policies #  find and copy EpinioECEKSClusterPolicy ARN used in next step\naws iam delete-policy --policy-arn arn:aws:iam::${AWS_ACCOUNT_ID}:policy/EpinioECEKSClusterPolicy\n\n')),(0,o.kt)("h2",{id:"authentication-with-aws-eks-service-account"},"Authentication with AWS EKS Service Account"),(0,o.kt)("p",null,"For increased security the policy can be attached to just the Epinio pod ServiceAccount. You will also need to create a specific ServiceAccount that will be bound to the staging job with the ",(0,o.kt)("inlineCode",{parentName:"p"},"server.stagingServiceAccountName")," value."),(0,o.kt)("p",null,"To use AWS IAM roles for service accounts, an IAM OIDC provider must exist for your cluster's OIDC issuer URL.  "),(0,o.kt)("p",null,"Determine whether you have an existing IAM OIDC provider for your cluster with:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'oidc_id=$(aws eks describe-cluster --name ${CLUSTER_NAME} --query "cluster.identity.oidc.issuer" --output text | cut -d \'/\' -f 5)\naws iam list-open-id-connect-providers | grep $oidc_id | cut -d "/" -f4\n')),(0,o.kt)("p",null,"If output is returned, then you already have an IAM OIDC provider for your cluster and you can skip the next step. If no output is returned, then you must create an IAM OIDC provider for your cluster. Check the ",(0,o.kt)("a",{parentName:"p",href:"https://docs.aws.amazon.com/eks/latest/userguide/enable-iam-roles-for-service-accounts.html"},"AWS guide")," for this task."),(0,o.kt)("h3",{id:"epinio-server-role"},"Epinio Server Role"),(0,o.kt)("p",null,"Ensure Epinio has been deployed first. Later you will assign a new AWS Service Account to an existing Epinio installation via ",(0,o.kt)("inlineCode",{parentName:"p"},"helm upgrade")," command."),(0,o.kt)("p",null,"You will need to create a IAM Role"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},'#!/bin/bash\n\nset -euo pipefail\n\nOIDC_PROVIDER=$(aws eks describe-cluster --name ${CLUSTER_NAME} --query "cluster.identity.oidc.issuer" --output text | sed -e "s/^https:\\/\\///")\n\nFILENAME=trust-relationship.json\n\ncat > ${FILENAME} <<EOF\n{\n  "Version": "2012-10-17",\n  "Statement": [\n    {\n      "Effect": "Allow",\n      "Principal": {\n        "Federated": "arn:aws:iam::$AWS_ACCOUNT_ID:oidc-provider/$OIDC_PROVIDER"\n      },\n      "Action": "sts:AssumeRoleWithWebIdentity",\n      "Condition": {\n        "StringEquals": {\n          "$OIDC_PROVIDER:aud": "sts.amazonaws.com",\n          "$OIDC_PROVIDER:sub": "system:serviceaccount:epinio:epinio-server"\n        }\n      }\n    }\n  ]\n}\nEOF\n\naws iam create-role \\\n  --role-name epinio-server-role \\\n  --assume-role-policy-document file://${FILENAME} \\\n  --description "Epinio server role"\n\nrm ${FILENAME}\n')),(0,o.kt)("p",null,"attach it to the policy"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'aws iam attach-role-policy \\\n    --role-name epinio-server-role \\\n    --policy-arn "arn:aws:iam::${AWS_ACCOUNT_ID}:policy/EpinioECEKSClusterPolicy"\n')),(0,o.kt)("p",null,"and annotate the Epinio Service Account to bind it to the role"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'kubectl annotate serviceaccount epinio-server \\\n    --namespace epinio \\\n    "eks.amazonaws.com/role-arn=arn:aws:iam::${AWS_ACCOUNT_ID}:role/epinio-server-role"\n')),(0,o.kt)("h3",{id:"epinio-staging-service-account"},"Epinio staging Service Account"),(0,o.kt)("p",null,"The staging job needs a dedicated Service Account. You can easily create it with ",(0,o.kt)("inlineCode",{parentName:"p"},"eksctl")," since is a new one, attaching it directly with the existing policy:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'eksctl create iamserviceaccount \\\n    --name epinio-staging-service-account \\\n    --namespace epinio \\\n    --cluster ${CLUSTER_NAME} \\\n    --role-name "epinio-staging-role" \\\n    --attach-policy-arn "arn:aws:iam::${AWS_ACCOUNT_ID}:policy/EpinioECEKSClusterPolicy" \\\n    --approve\n')),(0,o.kt)("p",null,"and you can update your Helm deployment specifying this new service account adding the flag ",(0,o.kt)("inlineCode",{parentName:"p"},"--set server.stagingServiceAccountName=epinio-staging-service-account")," when upgrading Epinio:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"helm upgrade epinio epinio/epinio \\\n    --namespace epinio --create-namespace \\\n    --set global.domain=<MY_DOMAIN> \\\n    --set server.stagingServiceAccountName=epinio-staging-service-account \\\n    --wait\n")),(0,o.kt)("p",null,"Once finished, to remove everything remember to remove Epinio, delete service account, detach and delete policies:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'helm delete --wait epinio -n epinio\nkubectl delete --wait ns epinio workspace\n \neksctl delete iamserviceaccount \\\n--cluster $CLUSTER_NAME \\\n--name epinio-staging-service-account \\\n--namespace epinio\n \naws iam detach-role-policy \\\n--role-name epinio-server-role \\\n--policy-arn "arn:aws:iam::${AWS_ACCOUNT_ID}:policy/EpinioECEKSClusterPolicy"\n\naws iam delete-role \\\n--role-name epinio-server-role\n\naws iam list-policies #  find and copy EpinioECEKSClusterPolicy ARN used in next step\naws iam delete-policy \\\n--policy-arn arn:aws:iam::${AWS_ACCOUNT_ID}:policy/EpinioECEKSClusterPolicy\n')))}m.isMDXComponent=!0}}]);