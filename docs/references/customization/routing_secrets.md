---
sidebar_label: "Routing Secrets"
title: ""
---

# Routing Secrets

## Overview

Routing Secrets are kubernetes Secrets of type `kubernetes.io/tls` and marked by the
presence of the label `epinio.io/routing`. Note that the value of that label is not
relevant, just its presence.

## Usage

Usage is automatic. When deploying an application into a namespace containing routing
secrets, and requesting a route for a domain covered by the secrets (exactly, or as
wildcard), then the application chart is passed the name of the secret to use for the
Ingress of that route.

The matching process prefers exact matches over wildcard matches, and a shorter wildcard
over a longer one.

## Troubleshooting Question Sheet

  1. Is the Secret of type `kubernetes.io/tls` ?
  1. Is the Secret labeled with `epinio.io/routing` ?
  1. Is the Secret in the application's namespace ?
  1. Does the application route match the domain covered by the Secret ?
  1. If the application chart is a custom chart, does it support routing secrets ?

## Related

  - [Application Charts](appcharts.md)
