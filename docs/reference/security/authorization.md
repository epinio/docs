---
sidebar_label: "Authorization"
title: "Authorization"
description: "Since version **1.11.0** Epinio is shipped with a new authorization layer with two default roles: **admin** and **user**."
keywords: [epinio, authorization]
doc-type: [reference]
doc-persona: [epinio-developer, epinio-operator]
doc-topic: [epinio, reference, security, authorization]
---

Since version **1.11.0** Epinio is shipped with a new authorization layer with two default roles: **admin** and **user**.
Roles can be "namescoped", and they can be also customized with different permissions.

A user with the admin role will have the permission to perform any operation. A standard user has read access across resources and can create namespaces (automatically gaining admin permission on namespaces they create). As of 1.14.1 the default `user` role also grants builder-image management; see the role definition below.

By default, after the installation two users are available: `admin` and `epinio`, both with the password `password`. The operator can control the creation of those users through the `api.users` key in [values.yaml](https://github.com/epinio/helm-charts/blob/main/chart/epinio/values.yaml).
In a production setup, the default `api.users` value needs to be overridden.

## Switch user

To switch users you need to set the `user` and `pass` keys of the Epinio settings file, located at `~/.config/epinio/settings.yaml`.
The password has to be base64 encoded. Below, `cGFzc3dvcmQ=` is the base64 encoded version of `password`.

You can also login again with the `epinio login [URL]` command.


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
pass: cGFzc3dvcmQ=
user: epinio
wss: wss://epinio.mydomain.com
```

## List the Epinio users

An Epinio user is a BasicAuth Kubernetes Secret, with the `epinio.io/api-user-credentials` reserved label.

To list the available users you can get the secrets from your cluster with `kubectl`, filtering them with the proper labels:

```bash
# list all the users
kubectl get secrets -n epinio -l 'epinio.io/api-user-credentials'
NAME                  TYPE        DATA   AGE
default-epinio-user   BasicAuth   3      5m10s
admin-epinio-user     BasicAuth   2      5m10s
```


## Add a new user

Since a user is simply a Kubernetes Secret you can create a new user with a `kubectl apply`:

```text
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Secret
type: BasicAuth
metadata:
  labels:
    epinio.io/api-user-credentials: "true"
    epinio.io/roles: "admin"
  name: my-epinio-user
  namespace: epinio
stringData:
  username: myuser
  password: "\$2a\$10\$6bCi5NMstMK781In7JGiL.B44pgoplUb330FQvm6mVXMppbXBPiXS"
EOF
```

## Roles

An Epinio role is a Kubernetes ConfigMap, with the `epinio.io/role` reserved label.

The following yaml shows you the default `user` role:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  labels:
    epinio.io/role: "true"
  name: "epinio-user-role"
  namespace: {{ $.Release.Namespace }}
data:
  id: user
  name: "Epinio User Role"
  default: "true"
  actions: |
    namespace_write
    app_read
    configuration_read
    service_read
    gitconfig_read
    export_registries_read
    builderimage_read
    builderimage_write
```

### Fields

| Key     | Description 
|---------|-------------
| id      | The ID of the Role
| name    | A friendly name for the Role
| default | (optional) if set to _true_ the role will be the one selected as default if no other roles were assigned to the user
| actions | The actions the roles can perform

## Actions

Each Role can perform some actions defined in the __actions__ field (newline separated). These actions are hardcoded in Epinio, and some of them depend on other actions. Enabling an action with a dependency will automatically enable the dependency as well.

### Namespace

These actions enable operations on Namespace commands and resources.

| Action ID         | Description 
|-------------------|-------------
| `namespace_read`    | Read permissions (list, show)
| `namespace_write`   | Write permissions (create, delete)<br/>Depends on: `namespace_read`
| `namespace`         | All the above<br/>Depends on: `namespace_read`, `namespace_write`

### App

These actions enable operations on App commands and resources, plus application environment variables. Read access to AppCharts comes bundled here (`app_read` depends on `chart_read`); AppChart *management* has its own actions, see [Chart](#chart) below.

| Action ID             | Description 
|-----------------------|-------------
| `app_read`            | Read permissions (app list and show, env list and show)
| `app_logs`            | Read application logs
| `app_restart`         | Restart permission (without write permissions) <br/>Depends on: `app_read`
| `app_create`          | Create and upload/import applications<br/>Depends on: `app_read`, `app_logs`
| `app_update`          | Generic application update (patch) covering routes, chart values, instances and settings
| `app_scale`           | Scale applications by changing the desired number of instances (implemented via the `AppUpdate` endpoint)
| `app_update_env`      | Update application environment variables (set and unset)
| `app_update_configs`  | Manage application configuration bindings (create and delete)
| `app_update_routes`   | Update application routes/domains (implemented via the `AppUpdate` endpoint)
| `app_update_settings` | Update application settings (chart values) stored on the App resource (implemented via the `AppUpdate` endpoint)
| `app_update_chart`    | Update application chart selection and values (implemented via the `AppUpdate` endpoint)
| `app_stage`           | Stage an application<br/>Depends on: `app_read`, `app_logs`
| `app_deploy`          | Deploy an application<br/>Depends on: `app_read`, `app_logs`
| `app_export`          | Export an application image and metadata
| `app_delete`          | Delete applications
| `app_write`           | Backward-compatible umbrella for app create/update/delete/export/stage/deploy and all application update operations (including scale, routes, settings, chart and env/config updates)
| `app_exec`            | Perform an exec into a running application
| `app_portforward`     | Open a tunnel with the `port-forward` command
| `app`                 | All app permissions (including granular app actions, logs, exec and port-forward)

### Chart

These actions enable operations on AppChart commands and resources (`epinio app chart`). AppCharts are cluster-scoped, so these actions are only effective when granted by a global (non-namespaced) role.

| Action ID      | Description
|----------------|-------------
| `chart_read`   | Read permissions (list, show, match). Granted automatically to any role with `app_read`.
| `chart_write`  | Write permissions (create, update, delete)<br/>Depends on: `chart_read`
| `chart`        | All the above<br/>Depends on: `chart_read`, `chart_write`

### Builder Image

These actions enable operations on BuilderImage commands and resources. BuilderImages are cluster-scoped, so these actions are only effective when granted by a global (non-namespaced) role.

| Action ID            | Description
|----------------------|-------------
| `builderimage_read`  | Read permissions (list, show, match)
| `builderimage_write` | Write permissions (create, update, delete)<br/>Depends on: `builderimage_read`
| `builderimage`       | All the above<br/>Depends on: `builderimage_read`, `builderimage_write`

### Configuration

These actions enable operations on Configuration commands and resources. Be aware that to bind a configuration you still need the `app_write` permission as well.


| Action ID           | Description 
|----------------------|-------------
| `configuration_read`  | Read permissions (list, show)
| `configuration_write` | Write permissions (create, delete)<br/>Depends on: `configuration_read`
| `configuration`       | All the above<br/>Depends on: `configuration_read`, `configuration_write`

### Service

These actions enable operations on Service commands and resources, covering both service instances (namespaced) and catalog services (cluster-scoped).

| Action ID             | Description 
|-----------------------|-------------
| `service_read`        | Read permissions (list, show) for service instances and catalog services
| `service_write`       | Write permissions for service instances (create, update, delete, bind, unbind) and catalog services (create, update, delete)<br/>Depends on: `service_read`
| `service_portforward` | Open a tunnel with the `port-forward` command
| `service`             | All the above<br/>Depends on: `service_read`, `service_write`, `service_portforward`

### Gitconfig

These actions enable operations on Gitconfig commands and resources.

| Action ID         | Description 
|-------------------|-------------
| `gitconfig_read`    | Read permissions (list, show)
| `gitconfig_write`   | Write permissions (create, delete)<br/>Depends on: `gitconfig_read`
| `gitconfig`         | All the above<br/>Depends on: `gitconfig_read`, `gitconfig_write`

### Export Registries

This action enable operations on Export Registries commands and resources. Only read operations are available.

| Action ID                 | Description 
|---------------------------|-------------
| `export_registries_read`  | Read permissions

### Resource scope: cluster-scoped vs namespaced

Epinio resources fall into two scopes, and the scope decides which of a user's roles can grant an action:

- **Namespaced** resources (applications, configurations, service instances, and deleting an existing namespace) live inside a namespace. Actions on them are evaluated against the roles the user holds *for that namespace*, whether a namespace-scoped role such as `admin:workspace` or a global role.
- **Cluster-scoped** resources (app charts, builder images, git configs, catalog services, and creating a namespace) do not live in a namespace. Actions on them are evaluated against the user's **global** (non-namespaced) roles only.

The practical consequence: a user who is admin of a single namespace (for example `admin:workspace`) can fully manage applications and delete that namespace, but cannot create an app chart, builder image, git config, catalog service, or a new namespace unless a global role grants it. The default `user` role is global, so everything it carries (including `namespace_write` and `builderimage_write`) applies cluster-wide.

## Built-in Role Examples

The following roles are shipped as ConfigMaps and can be assigned directly to users:

| Role ID | Intended scope |
|---------|----------------|
| `view_only` | Read-only access across all resource types (applications, builder images, configurations, services, git configs, export registries) |
| `application_developer` | Application create/update (no delete) and runtime, plus builder-image, configuration and service write. No app-chart write |
| `application_manager` | Full application CRUD and runtime operations, plus builder-image, configuration and service write. No app-chart write |
| `system_manager` | No-delete role: application create/update/runtime, plus builder-image, app-chart, configuration and service write |


## Assign Roles to User

The `epinio.io/roles` annotation is used to declare the list of the assigned roles. It's a comma separated string with the ID of the roles.

```yaml
apiVersion: v1
kind: Secret
type: BasicAuth
metadata:
  labels:
    epinio.io/api-user-credentials: "true" # indicates this secret represents a user
  annotations:
    epinio.io/roles: "user,admin" # comma-separated list of roles
  name: my-epinio-user
  namespace: epinio
stringData:
  username: myuser
  password: "$2a$10$6bCi5NMstMK781In7JGiL.B44pgoplUb330FQvm6mVXMppbXBPiXS" # password hashed with the Bcrypt algorithm
```

### Define Role Access to a Namespace

Users may be granted access to a particular namespace via two mechanisms:

1. **Role Annotations with Scoping Delimiter `:` (recommended)**
    - The roles assigned via the `epinio.io/roles` annotation on a user object may be namespace-scoped via the `:` delimiter.
        - Format:  `roleName:namespace`
    - For example, a user may be granted administrator privileges to a specific namespace while maintaining non-admin access elsewhere:
        - Specifically, note the `admin:some-namespace` annotation item

        ```yaml
        apiVersion: v1
        kind: Secret
        type: BasicAuth
        metadata:
          labels:
            epinio.io/api-user-credentials: "true"
          annotations:
            epinio.io/roles: "user,admin:some-namespace"
          name: my-epinio-user
          namespace: epinio
        stringData:
          username: myuser
          password: "some-hashed-password"
        ```
    - We recommend this approach as it aligns with the automated flow through OIDC authentication, expanded upon below.

2. **Namespaces Array on User Object**
    - Namespaces can be assigned to a user via an additional `namespaces` key in the user Secret's data
    - These namespaces are represented as an array separated by newlines.

        ```yaml
        apiVersion: v1
        kind: Secret
        type: BasicAuth
        metadata:
          labels:
            epinio.io/api-user-credentials: "true"
            epinio.io/roles: "user,admin"
          name: my-epinio-user
          namespace: epinio
        stringData:
          username: myuser
          password: "some-hashed-password"
          namespaces: |
            workspace
            workspace2
        ```

Additionally, this concept may be automated as part of **OIDC authentication** via Epinio's reference to a `rolesMapping` key within the `dex-config` secret data.  Please refer to our [documentation on OIDC Authentication](./authentication_oidc.md#groups-and-roles-mapping) for further explanation.  Note specifically that the `roles` array within the `rolesMapping` secret value can include the same `:` delimiter described above.