---
sidebar_label: "Authorization"
title: ""
---

<head>
  <link rel="canonical" href="https://docs.epinio.io/references/authorization"/>
</head>

# Authorization

Since version **0.8.0** Epinio is shipped with an authorization layer recognizing two basic roles: **admin** and **user**.
A user with the admin role will have access to every resource, while a standard user will have access only to the resources created on its namespaces.
When a user creates a namespace, it will have automatically permission for it.

After the installation two users are available: `admin` and `epinio`, both with the password `password`.


## Switch user

To switch users you need to set the `user` and `pass` keys of the Epinio settings file, located at `~/.config/epinio/settings.yaml`

```yaml
api: https://epinio.mydomain.com
appchart: ""
certs: |
  -----BEGIN CERTIFICATE-----
  MIICUTCCAfigAwIBAgIQXJq3y/ouo90Db7BWy34gbDAKBggqhkjOPQQDAjAUMRIw
  ****************************************************************
  ****************************************************************
  ****************************************************************
  qCPZOyTsHKnjmj7zxg57+Kq2KLFT
  -----END CERTIFICATE-----
colors: true
namespace: workspace
pass: password
user: epinio
wss: wss://epinio.mydomain.com
```

## List the Epinio users

An Epinio user is a BasicAuth Kubernetes Secret, with two reserved labels:

- `epinio.suse.org/api-user-credentials`
- `epinio.suse.org/role` used to get the assigned role

```yaml
apiVersion: v1
kind: Secret
type: BasicAuth
metadata:
  labels:
    epinio.suse.org/api-user-credentials: "true"
    epinio.suse.org/role: "admin"
  name: my-epinio-user
  namespace: epinio
stringData:
  username: myuser
  password: mypassword
```

To list the available users you can get the secrets from your cluster with `kubectl`, filtering them with the proper labels:

```bash
# list all the users
kubectl get secrets -n epinio -l 'epinio.suse.org/api-user-credentials'
NAME                  TYPE        DATA   AGE
default-epinio-user   BasicAuth   3      5m10s
admin-epinio-user     BasicAuth   2      5m10s
```

```bash
# list all the admins
kubectl get secrets -n epinio -l 'epinio.suse.org/api-user-credentials,epinio.suse.org/role=admin'
NAME                TYPE        DATA   AGE
admin-epinio-user   BasicAuth   2      5m24s
```

## Add a new user

Since a user is simply a Kubernetes Secret you can create a new user with a `kubectl apply`:

```
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Secret
type: BasicAuth
metadata:
  labels:
    epinio.suse.org/api-user-credentials: "true"
    epinio.suse.org/role: "user"
  name: my-epinio-user
  namespace: epinio
stringData:
  username: myuser
  password: mypassword
EOF
```

## Assign namespaces

The authorized user's namespaces are an additional `namespaces` field in the Secret data, separated by a newline `\n`.  
To modify them edit just that field:

```
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Secret
type: BasicAuth
metadata:
  labels:
    epinio.suse.org/api-user-credentials: "true"
    epinio.suse.org/role: "user"
  name: my-epinio-user
  namespace: epinio
stringData:
  username: myuser
  password: mypassword
  namespaces: |
    workspace
    workspace2
EOF
```
