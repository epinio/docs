---
sidebar_label: "Install Epinio on EKS"
sidebar_position: 23
title: ""
---

# Creating an EKS Kubernetes Cluster

This how-to was written using the following versions:

* [epinio helm chart - v1.1.0](https://github.com/epinio/helm-charts/releases/tag/epinio-1.1.0)
* AWS EKS - Kubernetes v1.22
* [Ingress Nginx- v1.3.0](https://kubernetes.github.io/ingress-nginx/)
* [Aws Load Balancer Controller - v2.4.2](https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.4/)
* [Cert Manager - v1.9.1](https://github.com/cert-manager/cert-manager)

## Prerequisites

* [kubectl - v1.22](https://kubernetes.io/docs/tasks/tools/)
* [aws cli - v2.7.19](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
* [eksctl - v0.106.0](https://docs.aws.amazon.com/pt_br/eks/latest/userguide/eksctl.html)
* [AWS Public Cetificate](https://docs.aws.amazon.com/acm/latest/userguide/gs-acm-request-public.html)
* [AWS WAF - Web ACL](https://docs.aws.amazon.com/waf/latest/developerguide/web-acl-creating.html)

## Create EKS Kubernetes Cluster

*Ensure that you ran **[aws configure](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html)** before you proceed with the steps bellow.*

```shell
eksctl create cluster \
  --name <cluster-name> \
  --version 1.22 \
  --nodegroup-name <node-group-name> \
  --node-type <node-size> \
  --nodes <node-qty>
```

## Install AWS Load Balancer Controller

The AWS controller is needed to let us interact with AWS ELB service.

Please follow the [Official Installation Guide](https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.4/deploy/installation/) to get it up and running.

## Install Cert Manager

```shell
helm repo add cert-manager https://charts.jetstack.io
helm repo update
helm install cert-manager --namespace cert-manager --create-namespace jetstack/cert-manager --set installCRDs=true --set extraArgs[0]=--enable-certificate-owner-ref=true
```

## Install Nginx Ingress Controller

### Add Helm repo

```shell
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
```

### Install

**Important:**

* *controller.service.type*: must be 'NodePort' to be able to create AWS Application LoadBalancer.
* *controller.config.use-forwarded-headers*: must be set TRUE, if not, you are not be able to run 'epinio app exec' command.

```shell
helm upgrade --install nginx ingress-nginx/ingress-nginx --namespace nginx --create-namespace --set controller.service.type=NodePort  --set-string controller.config.use-forwarded-headers="true"
```

### Create Ingress object for Nginx

* Create a file with the content below;
* Create [AWS Ceriticate Manager](https://docs.aws.amazon.com/acm/latest/userguide/gs-acm-request-public.html) and [AWS WAF Web ACL](https://docs.aws.amazon.com/waf/latest/developerguide/web-acl-creating.html);
* Place the resources ARN in the respective annotations section.
* Execute 'kubectl apply -f ....'

```shell
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: nginx-ingress
  namespace: nginx
  annotations:
    alb.ingress.kubernetes.io/healthcheck-path: /healthz
    alb.ingress.kubernetes.io/scheme: internet-facing
    alb.ingress.kubernetes.io/target-type: ip
    alb.ingress.kubernetes.io/ssl-redirect: '443'
    alb.ingress.kubernetes.io/listen-ports: '[{"HTTP": 80}, {"HTTPS":443}]'
    alb.ingress.kubernetes.io/certificate-arn: <put_your_certificate_arn_here>
    alb.ingress.kubernetes.io/wafv2-acl-arn: <put_your_waf_arn_here>
spec:
  ingressClassName: alb
  rules:
  - host: '*.example.com' #Change it to you domain
    http:
      paths:
      - pathType: Prefix
        path: "/"
        backend:
          service:
            name: nginx-ingress-nginx-controller
            port:
              number: 80
```

After execute 'kubectl apply', AWS will automatically:

* Provision a new Application LB;
* Create a Target Group pointing to your nginx-controller POD;
* Associate the Application LB and Target Group;
* Associate the Application LB with WAF.

Get the ALB DNS name and create a CNAME dns entry pointing to it:

* Record name: *.example.com
* Type: CNAME
* Value: ALB DNS name

Test it:

```shell
nslookup test.example.com
```

You should get the ALB dns name as an answer

## Install Epinio on the Cluster

```shell
helm install epinio -n epinio --create-namespace epinio/epinio --set global.domain=example.com --set global.tlsIssuer=letsencrypt-epinio --set ingress.ingressClassName=nginx
```
