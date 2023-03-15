---
sidebar_label: "Namespaces"
title: ""
---

# Namespaces

Epinio has the same concept of namespaces as the underlying Kubernetes, i.e.
a means of grouping applications, configurations, and services into some kind
of related sets.

In contrast to Kubernetes the Epinio client however maintains local state, the
__current namespace__, often also called the __targeted namespace__.

Where users of Kubernetes's client (`kubectl`) have to explicitly specify the
namespace to work with with each command, users of Epinio's client (`epinio`)
have one command to set and query the current namespace, and all other commands
of the client use that namespace in their operation.

The relevant command is [epinio target](commands/cli/epinio_target.md).

All other namespace management (creation, inspection, deletion) is done through
the [epinio namespace](commands/cli/namespace/epinio_namespace.md) ensemble. 

A full workflow of namespace can be found in the following [namespace tutorial](docs/tutorials/namespace-tutorial.md).
