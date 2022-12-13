---
sidebar_label: "Setting Up Routing Secrets"
sidebar_position: 8
title: ""
---

## How to set up routing secrets for use by applications

This is a how-to for operators.

### Introduction and Background

In regular operation Epinio automatically creates the `kubernetes.io/tls` Secrets needed
by a new application's Ingress to secure the communication with that application.

In a bit more detail, the application chart used to deploy that application creates both
the `Ingress` and a `Certificate` resource for it. The latter is then picked up by the
Cert manager component, which in turn creates the Secret holding the certificate data.

Even under the best of circumstances there will be a window where the Ingress is not
secured due to the time needed to see the new Certificate and then create the associated
Secret.

This situation can be worsened if an external provider for certificates is involved, for
example [Let's Encrypt](https://letsencrypt.org/), which may impose rate limits (Let's
Encrypt again), widening that window.

Epinio `routing secrets` are an (optional) means to side-step these issues by creating
secrets ahead of deploying the applications using them.

### Creating a routing secret

The steps to create a routing secret suitable for Epinio are:

  1. Create a regular `kubernetes.io/tls` Secret by some means, for some domain `D`. This
     can involve Cert manager, of course.

  1. Mark the resulting secret with the label `epinio.io/routing`.

     Note that the value of that label is not relevant, just its presence.

  1. Deploy an application into the namespace containing the marked secret, and requesting
     a route for domain `D`.

     Epinio will now see that there is a secret for `D` in the namespace and pass the name
     of the secret to the application chart responsible for the application's deployment.

     The chart will now create an `Ingress` directly referencing that secret and skip the
     creation of a `Certificate` for it.

### Issues and Solutions

When using routing secrets a fully automatic process is replaced by a manual one. In other
words, the load normally placed on the Cert manager component and the providers backing it
is now on the shoulders of the operator(s). The operator(s) now create Certificates and
Secrets, place them in the relevant namespaces, etc.

There are some mitigating factors however:

  1. Routing secrets are __optional__. Usage can be focused on just where they are
     considered as truly needed, with everything else keeping to the automatic process.

  1. Routing secrets may hold certificates for __wildcard domains__. The secret will be
     used whenever a requested application route matches the wildcard pattern.

     This reduces the number of Secrets needing to be created.

  1. Distribution of routing secrets can be automated by using a component like Kubed.
     Kubed can automatically copy secrets between namespaces based on annotations.

     Note that Kubed is a component of Epinio, i.e. readily available.

     As an example,

       1. Place a new routing secret `RS` into the namespace `epinio`.

       1. Annotate the secret with

       	  `kubed.appscode.com/sync="app.kubernetes.io/component=epinio-namespace"`

       1. kubed will now distribute `RS` to all namespaces which have the label
          `app.kubernetes.io/component=epinio-namespace`. These are all the namespaces
          under Epinio's control.

	  For more a limited distribution it is possible to add custom labels to the
	  desired namespaces and then add matching annotations on the relevant Secrets.

	  Note that the distribution will automatically include all new namespaces
	  matching whatever criteria are set up.
