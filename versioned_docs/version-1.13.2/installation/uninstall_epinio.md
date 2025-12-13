---
sidebar_label: "Uninstall Epinio"
sidebar_position: 5
title: "Uninstall Epinio"
description: Uninstalling Epinio and the implications of doing so.
keywords: [epinio, uninstallation]
---

You should understand the implications of uninstalling Epinio. Uninstallation may affect your cluster's operation.

Epinio uninstallation removes:

- Epinio and all the components that it installed at installation
- Any resources installed in the Epinio **default** workspace

If there are resources in the cluster that depend on Epinio, they will stop working.
Clearly, this will prevent your cluster workload from operating correctly.

If you installed Epinio in a namespace `epinio`, you uninstall with the command:

```bash
$ helm uninstall -n epinio epinio
```
