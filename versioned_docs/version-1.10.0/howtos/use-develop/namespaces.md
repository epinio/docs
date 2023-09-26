---
sidebar_label: "Working With Multiple Namespaces"
sidebar_position: 3
title: ""
---

# How to work with multiple namespaces

Like Kubernetes, Epinio has the concept of namespaces, and means of working with them.

Working with multiple of them however is different to Kubernetes.

In Kubernetes the `kubectl` client accepts an option `--namespace` for all its commands,
which provide the name of the namespace to work with.

Epinio on the other hand maintains a __current namespace__ in its local state, often
also called the __targeted namespace__.

To work with the applications, configurations, etc. in an existing namespace `foo`
invoke

```
epinio target foo
```

to set `foo` as the current namespace. All other commands of epinio needing
a namespace will from that point on use `foo` in their operation.

To start working with a different existing namespace `bar` simply invoke
`epinio target` again, i.e. run

```
epinio target bar
```

To see the name of the current namespace invoke the command without a namespace
argument, i.e.:

```
epinio target
```

:::note
The current namespace is __local state__, specific to the user invoking the Epinio
client. The information is not shared between users.
:::

:::caution
Creating a new namespace __does not__ make it the current namespace.
:::

:::caution
Deleting the current namespace __does not__ undo the targeting.
The removed namespace stays targeted.

However all commands using a namespace will report it as not existing
and fail to work.
:::

:::caution
While installation of Epinio creates a pre-defined namespace `workspace` the helm chart
is __not able__ to automatically target this namespace. This has to be done by the user.

This, and the previous caution also means that whatever namespace was targeted last in
a preceding installation of Epinio will still be targeted in a new installation.
:::

## References

  - [Namespaces](../../references/namespaces.md)
