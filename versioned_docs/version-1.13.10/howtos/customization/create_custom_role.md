---
sidebar_label: "Creating A custom role"
sidebar_position: 14
title: "Creating a custom role"
description: Creating a custom role in Epinio.
keywords: [epinio, kubernetes, create custom role]
doc-type: [how-to]
doc-topic: [epinio, how-to, customize, create-custom-role]
doc-persona: [epinio-operator]
---

As described in the [Authorization reference](../../references/authorization.md),
Epinio Roles are Kubernetes ConfigMaps with a particular label.

To create a role execute the `kubectl` command:

```console
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ConfigMap
metadata:
  labels:
    epinio.io/role: "true"
  name: epinio-custom-role
  namespace: epinio
data:
  id: custom-role
  name: "My Custom Role"
  actions: |
    app
    configuration_read
    service_read
EOF
```

After that restart the Epinio server pod to force Epinio to reload the extended set of roles.
This is done by deleting the pod, causing the Epinio deployment to restart it:

```console
kubectl delete pod -n epinio -l 'app.kubernetes.io/component=epinio-server'
```

Then, to assign the role to a user, update the user `epinio.io/roles` annotation:

```console
# get the old roles assigned to te user
OLD_ROLES=$(kubectl get secrets -n epinio MY_USER -o jsonpath='{.metadata.annotations.epinio\.io/roles}')

# append the new role to them
kubectl annotate secret -n epinio --overwrite MY_USER "epinio.io/roles=$OLD_ROLES,custom-role"
```

Check the [Authorization reference](../../references/authorization.md) for the list of actions
assignable to roles.
