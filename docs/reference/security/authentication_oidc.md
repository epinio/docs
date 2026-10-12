---
sidebar_label: "OIDC authentication"
title: "OIDC authentication"
description: Since version **1.3.0**, Epinio has integrated Dex as an identity provider, which adds support for external OIDC providers.
keywords: [epinio, oidc, authentication]
doc-type: [reference]
doc-persona: [epinio-developer, epinio-operator]
doc-topic: [epinio, reference, security, authentication-oidc]
---

Since version **1.3.0**, Epinio has integrated [Dex](https://dexidp.io/) as an identity provider, which adds support for external OIDC providers.

To authenticate through Dex, you can use the login command with the `--oidc` flag. This will open a web page where you can authenticate with the configured providers.

```bash
epinio login --oidc https://epinio.mydomain.com
```

If you are using the `epinio` cli on a machine without a browser, you can provide the `--prompt` flag. This will give you the URL of a web page where you can authenticate even on a different machine. After logging in and pressing the `Grant Access` button, the page will return the authorization code that you have to copy and paste back to the `epinio` CLI input to finish the authentication process.

```bash
epinio login --oidc --prompt https://epinio.172.21.0.4.sslip.io
```

By default, only the local connector is set up with two users (`admin@epinio.io` and `epinio@epinio.io`).
To add more connectors, set them in the Helm values. See [Configuring Dex](#configuring-dex).

After a successful login, a new Epinio user will be created with the username matching the email used to login and returned by the provider.


If you want to login with the same email through the Epinio UI, you should set a password for your user by patching the user secret.

Find the secret name:
```bash
export EPINIO_USERNAME=$(echo -n 'admin@epinio.io' | base64)
kubectl get secret -n epinio -o json -l epinio.io/api-user-credentials | jq -r ".items[] | select(.data.username==\"$EPINIO_USERNAME\") | .metadata.name"

ruser-adminepinioio-9341763ee7dcbce070e7c14f246ec8291e9a7278
```

Patch the secret with the encrypted password:
```bash
export EPINIO_PASSWORD=$(echo -n '$2a$10$6bCi5NMstMK781In7JGiL.B44pgoplUb330FQvm6mVXMppbXBPiXS' | base64 -w0)
kubectl patch secret -n epinio -p="{\"data\":{\"password\": \"$EPINIO_PASSWORD\"}}" ruser-adminepinioio-9341763ee7dcbce070e7c14f246ec8291e9a7278

secret/ruser-adminepinioio-9341763ee7dcbce070e7c14f246ec8291e9a7278 patched
```

You're now able to login with the credentials in Epinio UI.

## Configuring Dex

The Epinio chart renders the Dex configuration into the `dex-config` secret in
the `epinio` namespace. Configure Dex through Helm values, not by editing that
secret: the chart rewrites the secret on every `helm upgrade`, so hand edits are
lost.

| Value | Purpose |
|---|---|
| `dex.connectors` | Dex [connectors](https://dexidp.io/docs/connectors/), passed through as written. |
| `dex.rolesMapping` | Maps connector groups to Epinio roles. See [Groups and roles mapping](#groups-and-roles-mapping). |
| `dex.enablePasswordDB` | Enables the local password database. Default `true`. |
| `dex.staticPasswords` | Local users. Default `null` keeps `admin@epinio.io` and `epinio@epinio.io`; `[]` removes them. |
| `dex.additionalStaticClients` | Static clients added after Epinio's own. |
| `dex.extraConfig` | Other top-level Dex settings, such as `expiry`, `logger` or `frontend`. |

`dex.extraConfig` cannot set keys the chart renders itself (`web`, `issuer`,
`storage`, `oauth2`, `enablePasswordDB`, `staticPasswords`, `staticClients`,
`connectors`). The install fails with a message naming the key if it tries.

### Keeping client secrets out of values

Dex expands `$VARIABLE` references in its configuration. Put the client secret
in a Kubernetes secret, expose it to Dex as an environment variable with
`dex.envVars`, and reference the variable in the connector. The secret then
never appears in your values file or in the Helm release.

```bash
kubectl create secret generic dex-github -n epinio \
  --from-literal=clientSecret='<client-secret>'
```

```yaml
dex:
  connectors:
  - type: github
    id: github
    name: GitHub
    config:
      clientID: <client-id>
      clientSecret: $GITHUB_CLIENT_SECRET
      redirectURI: https://auth.<your-domain>/callback
      loadAllGroups: true
      orgs:
      - name: Org1
  envVars:
  - name: GITHUB_CLIENT_SECRET
    valueFrom:
      secretKeyRef:
        name: dex-github
        key: clientSecret
```

### Applying changes

```bash
helm upgrade epinio epinio/epinio -n epinio --reuse-values -f dex-values.yaml
kubectl rollout restart deployment dex -n epinio
```

Dex reads its configuration only at startup, and the upgrade does not restart
it, so the restart is required. A connector that fails to start (bad issuer,
unreachable provider, unset variable) does not stop Dex: it is skipped and
logged. Check after every change:

```bash
kubectl logs deployment/dex -n epinio | grep -i connector
```

### Upgrading from a hand-edited secret

If you added connectors or a `rolesMapping` by editing the `dex-config` secret,
copy them into Helm values **before** upgrading. Read the current values with:

```bash
kubectl get secret dex-config -n epinio -o jsonpath='{.data.config\.yaml}' \
  | base64 -d
kubectl get secret dex-config -n epinio -o jsonpath='{.data.rolesMapping}' \
  | base64 -d
```

### Managing the secret yourself

To supply `dex-config` from an external system instead, set
`dex.manageConfigSecret: false`. The chart then renders no secret, and yours
must carry every key Epinio and Dex read: `config.yaml`, `issuer`, `endpoint`,
`uiClientSecret` and, optionally, `rolesMapping`. The secret must be named
`dex-config`.

## Groups and Roles mapping

`dex.rolesMapping` links groups returned by a connector to Epinio roles. The
Epinio server reads it, not Dex, so changes apply without restarting Dex.

```yaml
dex:
  rolesMapping:
  - connectorId: github
    groups:
    - id: Org1:Admins
      roles:
      - admin
    - id: Org1:TeamBlue
      roles:
      - user
      - admin:workspace
```

`connectorId` must match the `id` of a connector. In the previous example, if
the user is a member of both `Org1:Admins` and `Org1:TeamBlue` then that user
will get the `admin`, `user` and `admin:workspace` roles. If no roles are found
and a default role is set then the user will receive that default Epinio role.

## Connector notes

Dex ships with a broad catalogue of connectors (GitHub, GitLab, Google, LDAP, generic OIDC, Azure/Entra ID, and more).  
Each connector exposes its own configuration keys and prerequisites. Refer to the official Dex connector
reference for the complete list and latest options.[^dex-connectors]

### Google (Gmail / Workspace) Example

Below is just an example of how to set up a connector. Please reference the [Dex connector documentation](https://dexidp.io/docs/connectors) for more information. 

When integrating Google accounts via the Dex `google` connector:

- Create an OAuth 2.0 **Web application** client in Google Cloud Console and note the `Client ID` and `Client secret`.
- Add your Dex callback (for example `https://dex.example.org/callback`) to the OAuth client’s authorized redirect URIs and reuse it as the connector `redirectURI`.
- Restrict access to specific Google Workspace domains by listing them under `hostedDomains`. Omit the field to allow personal Gmail accounts.
- If you need group information for role mapping, supply a service account with Admin SDK rights (`serviceAccount` and `adminEmail`) and list the Workspace group email addresses in `groups`.
- Optionally extend `scopes` or set `promptType: select_account` to let users pick among multiple Google logins.

Example connector snippet:

```yaml
dex:
  connectors:
  - type: google
    id: google
    name: Google
    config:
      clientID: <google-client-id>
      clientSecret: $GOOGLE_CLIENT_SECRET
      redirectURI: https://dex.example.org/callback
      hostedDomains:
      - example.com
      serviceAccount: |-
        {
          "type": "service_account",
          "...": "..."
        }
      adminEmail: admin@example.com
      groups:
      - name: engineering@example.com
      promptType: select_account
```

Supply `GOOGLE_CLIENT_SECRET` through `dex.envVars` as shown in
[Keeping client secrets out of values](#keeping-client-secrets-out-of-values).
Combine this connector definition with `dex.rolesMapping` to assign Epinio
roles to Google groups.

[^dex-connectors]: [Dex connector reference](https://dexidp.io/docs/connectors/)
