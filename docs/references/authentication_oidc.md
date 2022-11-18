---
sidebar_label: "OIDC authentication"
title: ""
---

# OIDC authentication

Since version **1.3.0**, Epinio has integrated [Dex](https://dexidp.io/) as an identity provider which adds the support for external OIDC providers.

To authenticate through Dex, you can use the login command with the `--oidc` flag. This will open a web page where you can authenticate with the configured providers.

```bash
epinio login --oidc https://epinio.mydomain.com
```

If you are using the `epinio` cli on a machine without a browser you can provide the `--prompt` flag. This will give you the url of a web page where you can authenticate even on a different machine. After logging in and pressing the `Grant Access` button the page will return the authorization code that you have to copy and paste back to the `epinio` cli input to finish the authentication process.

```bash
epinio login --oidc --prompt https://epinio.172.21.0.4.omg.howdoi.website
```

By default, only the local connector is setup with two users (`admin@epinio.io` and `epinio@epinio.io`).
To add more connectors you can edit the Dex configuration file (key `config.yaml`), stored in the `dex-config` secret in the `epinio` namespace.

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

The external identity providers may provide additional information about the user, for example the groups that he's member of.  

These groups can be used to associate a specific role to the user. To do so you need to add a `rolesMapping` key to the `dex-config` secret. The value of the key is a yaml string that will be used to map the groups of a provider to a specific role:

```
rolesMapping: |-
  - connectorId: github
    groups:
    - id: Org1:Admins
      role: admin
    - id: Org1:TeamBlue
      role: user

config.yaml: |-
  connectors:
  - type: github
    id: github
    name: GitHub
    config:
      loadAllGroups: true
      orgs:
      - name: Org1
```

The groups will be evaluated in order. In the previous example if the user is a member of both `Org1:Admins` and `Org1:TeamBlue` then that user will get the `admin` role.

Please note that the role is bound when the user is created. Any modification of the groups will not propagate to already existing users.
