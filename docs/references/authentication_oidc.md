---
sidebar_label: "OIDC authentication"
title: ""
---

# OIDC authentication

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
To add more connectors, you can edit the Dex configuration file (key `config.yaml`), stored in the `dex-config` secret in the `epinio` namespace.

After a successful login, a new Epinio user will be created with the username matching the email used to login and returned by the provider.


If you want to login with the same email through the Epinio UI, you should set a password for your user by patching the user secret.

Find the secret name:
```
export EPINIO_USERNAME=$(echo -n 'admin@epinio.io' | base64)
kubectl get secret -n epinio -o json -l epinio.io/api-user-credentials | jq -r ".items[] | select(.data.username==\"$EPINIO_USERNAME\") | .metadata.name"

ruser-adminepinioio-9341763ee7dcbce070e7c14f246ec8291e9a7278
```

Patch the secret with the encrypted password:
```
export EPINIO_PASSWORD=$(echo -n '$2a$10$6bCi5NMstMK781In7JGiL.B44pgoplUb330FQvm6mVXMppbXBPiXS' | base64 -w0)
kubectl patch secret -n epinio -p="{\"data\":{\"password\": \"$EPINIO_PASSWORD\"}}" ruser-adminepinioio-9341763ee7dcbce070e7c14f246ec8291e9a7278

secret/ruser-adminepinioio-9341763ee7dcbce070e7c14f246ec8291e9a7278 patched
```

You're now able to login with the credentials in Epinio UI.

## Groups and Roles mapping

Dex is configured via the `dex-config` secret in the `epinio` namespace.  
The secret is of type `Opaque` and carries multiple string values that Epinio reads at start-up:

- `config.yaml`: the Dex configuration file (connectors, static clients, etc.).
- `rolesMapping`: optional mapping that links external groups to Epinio roles.

When creating or updating the secret, you must provide each entry as a separate key; do **not**
append the roles block to `config.yaml`. The snippet below shows the structure using
`stringData` for readability (Kubernetes will store the values base64-encoded under `data`):

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: dex-config
  namespace: epinio
type: Opaque
stringData:
  config.yaml: |-
    connectors:
    - type: github
      id: github
      name: GitHub
      config:
        loadAllGroups: true
        orgs:
        - name: Org1
  rolesMapping: |-
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

You can create the secret from files with
`kubectl create secret generic dex-config -n epinio --from-file=config.yaml --from-file=rolesMapping`,
or patch the existing secret using a YAML file structured as above.

In the previous example, if the user is a member of both `Org1:Admins` and `Org1:TeamBlue`
then that user will get the `admin`, `user` and `admin:workspace` roles. If no roles are found
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
config.yaml: |-
  connectors:
  - type: google
    id: google
    name: Google
    config:
      clientID: <google-client-id>
      clientSecret: <google-client-secret>
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

Combine this connector definition with the `rolesMapping` key shown earlier to assign Epinio roles to Google groups.

[^dex-connectors]: [Dex connector reference](https://dexidp.io/docs/connectors/)
