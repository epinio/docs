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
the [epinio namespace](commands/cli/namespace/epinio_namespace.md) ensemble. Following next, there is an example of these commands in action.

## Showcase example with namespaces

Once `Epinio` is deployed, we can check the pre-configured namespace `workspace` using
`epinio namespace list` :

```
➜  epinio git:(main) epinio namespace list

🚢  Listing namespaces

✔️  Epinio Namespaces:
|   NAME    |            CREATED            | APPLICATIONS | CONFIGURATIONS |
|-----------|-------------------------------|--------------|----------------|
| workspace | 2023-03-14 09:48:11 +0100 CET |              |                |
```

We can create a new namespace using `epinio namespace create NAME`:

```
➜  epinio git:(main) epinio namespace create newnamespace

🚢  Creating namespace...
Name: newnamespace

✔️  Namespace created.
```

Also, we can see details of a given namespace like **creation date**, **applications** and **configurations** within using `epinio namespace show NAME`:

```
➜  epinio git:(main) epinio namespace show newnamespace 

🚢  Showing namespace...
Name: newnamespace

✔️  Details:
|      KEY       |             VALUE             |
|----------------|-------------------------------|
| Name           | newnamespace                  |
| Created        | 2023-03-14 15:27:48 +0100 CET |
| Applications   |                               |
| Configurations |                               |
```

By default, `Epinio` brings the namespace `workspace` as default. To see this use `epinio target`

```
➜  epinio git:(main) epinio target   
✔️  
Currently targeted namespace: workspace
```

Given that we have created earlier a new namespace named `newnamespace` let's target it to operate within:

```
➜  epinio git:(main) epinio target newnamespace

🚢  Targeting namespace...
Name: newnamespace

✔️  Namespace targeted.
```

Finally, let's delete the namespace `workspace` by using `epinio namespace delete NAME`:

```
➜  epinio git:(main) epinio namespace delete workspace   
You are about to delete namespace workspace and everything it includes, i.e. applications, configurations, etc. Are you sure? (y/n): y

🚢  Deleting namespace...
Name: workspace

✔️  Namespace deleted.
```