---
sidebar_label: "Namespaces"
title: "Namespaces"
---

Like Kubernetes, Epinio has an idea of namespaces, and the means of working with them. Working with many namespaces is a little different in Epinio than with Kubernetes.

In Kubernetes the `kubectl` client accepts an option `--namespace` for all its commands, naming the namespace to work with. Epinio instead maintains a **current namespace** in its local state, often also called the **targeted namespace**. Commands that operate on a namespace use the current one.

Where users of Kubernetes's client (`kubectl`) have to explicitly specify the
namespace to work with with each command, users of Epinio's client (`epinio`)
have one command to set and query the current namespace, and all other commands
of the client use that namespace in their operation.

The relevant command is [epinio target](../cli/epinio_target.md).

There are a few points to note:

- The current namespace is **local state**, specific to the user invoking the Epinio client. The state information isn't shared between users.
- Creating a new namespace **doesn't** make it the current namespace.
- Deleting the current namespace **doesn't** undo the targeting. The removed namespace stays targeted and so the next commands fail.
- While installation of Epinio creates the pre-defined namespace `workspace`, the Helm chart is **not able** to automatically target this namespace. The user must do this. This means whatever namespace was the last target in a preceding installation of Epinio continues to be the target in a new installation.

The [namespaces how-to](../../how-to/developer/concepts/namespaces/namespaces.mdx) contains information on how to work with namespaces via the UI or CLI.