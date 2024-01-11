---
sidebar_label: Multiple namespaces
sidebar_position: 3
title: Working with multiple namespaces
description: How to use Epinio to work with multiple namespaces
keywords: [epinio, kubernetes, multiple namespaces]
doc-type: [how-to]
doc-topic: [epinio, how-to, multiple-namespace]
doc-persona: [epinio-developer, epinio-operator]
---

<head>
  <link rel="canonical" href="https://docs.epinio.io/howtos/use-develop/namespaces"/>
</head>

Like Kubernetes, Epinio has an idea of namespaces, and the means of working with them.
Working with many namespaces is a little different in Epinio than with Kubernetes.

In Kubernetes the `kubectl` client accepts an option `--namespace` for all its commands, and is the name of the namespace to work with.

Epinio maintains a **current namespace** in its local state, often also called the **targeted namespace**.

To work with the applications, configurations, etc. in an existing namespace `foo`
invoke:

```console
epinio target foo
```

This sets `foo` as the current namespace.
All other commands of `epinio` operating on a namespace now use `foo`.
To start working with a different existing namespace `bar` simply invoke
`epinio target` again, that is, run:

```console
epinio target bar
```

To see the name of the current namespace invoke the command without a namespace
argument, i.e.:

```console
epinio target
```

There are a few points to note:

- The current namespace is **local state**, specific to the user invoking the Epinio client.
The state information isn't shared between users.

- Creating a new namespace **doesn't** make it the current namespace.

- Deleting the current namespace **doesn't** undo the targeting.
The removed namespace stays targeted and so the next commands fail.

- While installation of Epinio creates the pre-defined namespace `workspace`,
the Helm chart is **not able** to automatically target this namespace.
The user must do this.
This, and the previous point means that whatever namespace was the last target
in a preceding installation of Epinio continues to be the target in a new installation.

## References

- [Namespaces](../../references/namespaces.md)
