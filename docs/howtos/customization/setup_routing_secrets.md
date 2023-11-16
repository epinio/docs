---
sidebar_label: Setting up routing secrets
sidebar_position: 10
title: Setting up routing secrets for use by applications
description: How to set up routing secrets for use by applications
keywords: [epinio, kubernetes, setup routing secrets]
doc-type: [how-to]
doc-topic: [epinio, how-to, custom, setup-routing-secrets]
doc-persona: [epinio-operator]
---

This is a How-to for operators.

## Introduction

In regular operation Epinio automatically creates the `kubernetes.io/tls` Secrets needed by a new application's Ingress to secure communication with that application.

The application chart used to deploy that application creates both the `Ingress` and a `Certificate` resource for it.
The `Certificate` resource is then picked up by the Cert manager component, which in turn creates the Secret that holds the certificate data.

There's a window where the Ingress isn't secured due to the time needed to see the new Certificate and then create the associated Secret.

This situation can be worse if using an external provider for certificates, for example, [Let's Encrypt](https://letsencrypt.org/), which may impose rate limits, lengthening the time window.

Epinio `routing secrets` are an (optional) means to side-step these issues by creating secrets ahead of deploying the applications using them.

## Creating a routing secret

The steps to create a routing secret suitable for Epinio are:

1. Create a regular `kubernetes.io/tls` Secret, for a domain `D`.

1. Mark the resulting secret with the label `epinio.io/routing`.
The value of that label isn't relevant, just its presence.

1. Deploy an application into the namespace containing the marked secret, and requesting
a route for domain `D`.

Epinio now sees that there is a secret for `D` in the namespace and passes the name of the secret to the application chart responsible for deployment.

The chart now creates an `Ingress` directly referencing that secret and skips the creation of a `Certificate` for it.

## Issues and solutions

When using routing secrets, a manual process replaces a fully automatic one.
The load normally placed on the Cert manager component and the providers backing it, now belongs to the operator.
The operator now creates Certificates and Secrets, placing them in the relevant namespaces, etc.

There are mitigating factors however:

1. Routing secrets are **optional**.
Use them only where absolutely necessary with everything else keeping to the automatic process.

1. Routing secrets may hold certificates for **wildcard domains**.
The secret is used whenever a requested application route matches the wildcard pattern.
This reduces the number of Secrets needing creation.

1. You can automate distribution of routing secrets by using a component like Kubed.
Kubed can automatically copy secrets between namespaces based on annotations.
Kubed is a component of Epinio so is available.
As an example,

   1. Place a new routing secret `RS` into the namespace `epinio`.

   1. Annotate the secret with

      `kubed.appscode.com/sync="app.kubernetes.io/component=epinio-namespace"`

   1. Kubed now distributes `RS` to all namespaces which have the label `app.kubernetes.io/component=epinio-namespace`.
   These are all the namespaces under Epinio's control.

   For a more limited distribution it's possible to add custom labels to the
   desired namespaces and add matching annotations on the relevant Secrets.

   The distribution automatically includes all new namespaces
   matching whatever criteria are in place.
