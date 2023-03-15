# Namespaces
## Introduction
The following workflow will help to get familiar when working with namespaces. It assumes Epinio has been previously installed. Should not be the case. please visit [Install Epinio](docs/installation/install_epinio.md) to achieve it.

This document explains the basics of working with namespaces. It assumes that Epinio is installed. If this is not the case please visit [Install Epinio](docs/installation/install_epinio.md) first.

---
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

Inspect the details of a given namespace like **creation date**, **applications** and **configurations** with:
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

By default, `Epinio` creates the namespace `workspace` during installation. If no previous local state existed the `epinio login` command used to get access to the installation also set this namespace as the current namespace. To see this use:

```
epinio target
```

Output:
``` 
✔️  
Currently targeted namespace: workspace
```

Target the namespace `newnamespace` created earlier to operate on its contents:

```
epinio target newnamespace
```

Output:
```
🚢  Targeting namespace...
Name: newnamespace

✔️  Namespace targeted.
```

At last delete the namespace `newnamespace` again:

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
