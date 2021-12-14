### Uninstall

NOTE: The command below will delete all the components Epinio originally installed.
**This includes all the deployed applications.**

If after installing Epinio, you deployed other things on the same cluster
that depended on those Epinio deployed components (e.g. Traefik, Tekton etc),
then removing Epinio will remove those components and this may break your other
workloads that depended on these. Make sure you understand the implications of
uninstalling Epinio before you proceed.

Depending on the method you used to install Epinio ([auto](./install_epinio_auto.md) or [manual](./install_epinio_manual.md)),
the uninstallation method is different. If you used the "auto" method, then you can uninstall
using the same helm chart:

```bash
$ helm uninstall epinio-installer
```

If you followed the manual method, you can uninstall each component using `helm` or `kubectl`, depending
on how you installed.
