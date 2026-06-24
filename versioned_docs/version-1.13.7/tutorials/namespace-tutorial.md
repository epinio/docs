---
sidebar_position: 2
title: "Namespaces"
description: Tutorial about Epinio namespaces.
keywords: [tutorial, epinio, namespaces]
---

This guide explores working with namespaces.
It assumes that Epinio is installed.
If you need to install, please visit
[install Epinio](../installation/install_epinio.md).


## Workflow

Once `Epinio` is deployed, check the existence of the pre-configured namespace `workspace` with:

```
epinio namespace list
```
Output:

```
🚢  Listing namespaces

✔️  Epinio Namespaces:
|   NAME    |            CREATED            | APPLICATIONS | CONFIGURATIONS |
|-----------|-------------------------------|--------------|----------------|
| workspace | 2023-03-14 09:48:11 +0100 CET |              |                |
```

Create new namespaces with: 
```
epinio namespace create newnamespace
```
Output:
```
🚢  Creating namespace...
Name: newnamespace

✔️  Namespace created.
```

You can inspect the details of a namespace:

- creation date
- applications
- configurations

Use the command:

```
epinio namespace show newnamespace
```

Output:
```
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

Epinio creates the default namespace `workspace` at installation time.
The `epinio login` command sets the default namespace as the current namespace.

To see this use:

```
epinio target
```

Output:
``` 
✔️  
Currently targeted namespace: workspace
```

To target the namespace `newnamespace`, created earlier, for future Epinio command operation:

```
epinio target newnamespace
```

Output:
```
🚢  Targeting namespace...
Name: newnamespace

✔️  Namespace targeted.
```

Finally, delete the namespace `newnamespace`:

```
epinio namespace delete newnamespace  
```

Output:
```
You are about to delete namespace workspace and everything it includes, i.e. applications, configurations, etc. Are you sure? (y/n): y

🚢  Deleting namespace...
Name: newnamespace

✔️  Namespace deleted.
```

---
### See also

* [epinio namespace create](references/commands/cli/namespace/epinio_namespace_create.md)    - Creates an epinio-controlled namespace
* [epinio namespace delete](references/commands/cli/namespace/epinio_namespace_delete.md)    - Deletes an epinio-controlled namespace
* [epinio namespace list](references/commands/cli/namespace/epinio_namespace_list.md)    - Lists all epinio-controlled namespaces
* [epinio namespace show](references/commands/cli/namespace/epinio_namespace_show.md)    - Shows the details of an epinio-controlled namespace
* [epinio target](references/commands/cli/epinio_target.md)  - Targets an epinio-controlled namespace.

