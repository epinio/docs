---
sidebar_label: "Entra ID Authentication"
sidebar_position: 21
title: "Entra ID Authentication"
description: How-to configure SSO for Epinio using Microsoft Entra ID.
keywords: [epinio, kubernetes, microsoft, azure, sso, entraid, entra, id, activedirectory, active, directory]
doc-type: [how-to]
doc-topic: [epinio, customize, operations, microsoft, azure, entraId]
doc-persona: [epinio-operator]
---

How-to configure SSO for Epinio using Microsoft Entra ID

## Configuring Microsoft Entra ID SSO

In order to configure SSO using Microsoft Entra ID, we need to set up a client within Azure and configure Dex with that client's details.  This document will attempt to provide instructions as concisely as possible.  Here is the general outline of required steps:

1. Create App Registration
2. Create Client Secret
3. Grant Directory Permissions
4. Add Connector to Dex Configuration

Once completed, your Epinio instance should now allow signin through Entra ID instead of local user authentication.


## Create App Registration

1. Visit Microsoft Entra ID
2. Note the `Tenant ID`
3. Navigate to **App Registrations**
4. Click **New Registration**
5. Configure the new registration
	- The name is arbitrary, e.g. `epinio-sso`
	- Single Tenant
	- Set the platform as `Web`
	- Set the Redirect URI as `https://auth.<your-domain>/callback`
6. Click **Register**
7. Note the `Client ID`

We should now have a `Client ID` and `Tenant ID` which will be used later to configure our Dex connector.

## Create Client Secret

1. Navigate to your new app registration
2. Navigate to that app registration's **Certificates & secrets**
3. Click **New Client Secret**
4. Set an arbitrary description and expiration
5. Click **Add**
6. Copy the **Secret Value** for your newly added client secret

We should now have a `Client Secret` which will be used later to configure our Dex connector.

## Grant Directory Permissions

Our App Registration will need some permissions to be utilized in authentication.

1. Navigate to your new app registration
2. Navigate to the app registration's **API Permissions**
3. Click **Add a permission**
4. Click **Microsoft.Graph**
5. Click **Delegated permissions**
6. Search `Directory.Read.All`
7. Ensure `Directory.Read.All` is enabled
8. Click **Add permissions**
9. Using the information from the previous steps, following the substituted link:
	- `https://login.microsoftonline.com/<tenant-id>/adminconsent?client_id=<client-id>`

We should now be able to plug these details into Dex and configure SSO.

## Add Connector to Dex Configuration

Dex provides [documentation](https://dexidp.io/docs/connectors/microsoft/) on the exact process you may follow to set up SSO through Microsoft Entra ID.  Once you have created your **App Registration** and its respective **Client Secret**, we are ready to configure Dex with the resulting information:

- **Tenant ID**
- **Client ID** (for the App Registration, from Step #1)
- **Client Secret** (from Step #2)
- **Redirect URI**

Store the client secret in a Kubernetes secret, so it stays out of your Helm
values:

```bash
kubectl create secret generic dex-entra -n epinio \
  --from-literal=clientSecret='<client-secret>'
```

Add the connector to your Helm values, for example in `dex-values.yaml`:

```yaml
dex:
  connectors:
  - type: microsoft
    # Required field for connector id.
    id: microsoft
    # Required field for connector name.
    name: Microsoft
    config:
      clientID: <client-id>
      # Dex expands this from the environment variable set below.
      clientSecret: $ENTRA_CLIENT_SECRET
      redirectURI: https://auth.<your-domain>/callback
      tenant: <tenant-id>
  envVars:
  - name: ENTRA_CLIENT_SECRET
    valueFrom:
      secretKeyRef:
        name: dex-entra
        key: clientSecret
```

Apply it and restart Dex, which reads its configuration only at startup:

```bash
helm upgrade epinio epinio/epinio -n epinio --reuse-values -f dex-values.yaml
kubectl rollout restart deployment dex -n epinio
```

The Entra ID connector set up should now be complete and you should be able to log in through Microsoft Entra ID. Do not edit the `dex-config` secret directly: the next `helm upgrade` overwrites it. See [Configuring Dex](../../../reference/security/authentication_oidc.md#configuring-dex) for the full set of values.
