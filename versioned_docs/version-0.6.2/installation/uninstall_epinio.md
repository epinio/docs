---
sidebar_label: "Uninstall Epinio"
---

### Uninstall

NOTE: The command below will delete all the components Epinio originally installed.
**This includes all the deployed applications.**

If after installing Epinio, you deployed other things on the same cluster
that depended on those Epinio deployed components (e.g. Kubed, Minio etc),
then removing Epinio will remove those components and this may break your other
workloads that depended on these. Make sure you understand the implications of
uninstalling Epinio before you proceed.

Assuming you installed Epinio in a namespace `epinio`, uninstall with the command:

```bash
$ helm uninstall -n epinio epinio
```
