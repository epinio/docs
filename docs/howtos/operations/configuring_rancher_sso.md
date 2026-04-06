---
sidebar_label: "Rancher-aligned SSO"
sidebar_position: 22
title: "Rancher-aligned SSO"
description: How to align Epinio sign-in with authentication used by Rancher Manager.
keywords: [epinio, kubernetes, rancher, sso, oidc, dex, identity]
doc-type: [how-to]
doc-topic: [epinio, customize, operations, rancher, sso]
---

How to align Epinio single sign-on with the identity setup used by Rancher Manager.

# Aligning Epinio SSO with Rancher

[Rancher Manager](https://ranchermanager.docs.rancher.com/) signs users in through **external auth providers** (for example Generic OIDC, SAML, Active Directory, GitHub, and others). It is **not** an OpenID Connect issuer for arbitrary workloads: you cannot point Epinio’s Dex at “Rancher” as if Rancher were Keycloak or Entra ID.

The supported way to get a **consistent SSO experience** for operators who use both Rancher and Epinio is:

1. **Use the same upstream identity provider for both products.**  
   Configure Rancher’s auth with the provider you already use (see Rancher’s [Authentication configuration](https://ranchermanager.docs.rancher.com/how-to-guides/new-user-guides/authentication-permissions-and-global-configuration/authentication-config)).  
   Configure Epinio’s **Dex** with a connector for that **same** provider.

2. **Register Dex as a separate OAuth/OIDC client** (or equivalent) in that provider.  
   Rancher’s own OAuth client settings do not apply to Epinio. You need your IdP to allow a second client (or additional redirect URIs on one client, if your IdP supports it) for Dex’s callback URL, typically `https://auth.<your-epinio-domain>/callback` (match the host you use for Dex in your cluster).

3. **Sign in to Epinio with OIDC** after Dex is configured:

   ```bash
   epinio login --oidc https://epinio.<your-domain>
   ```

   See [OIDC authentication](../../references/authentication_oidc.md) for Dex configuration, the `dex-config` secret, and optional [groups and roles mapping](../../references/authentication_oidc.md#groups-and-roles-mapping).

## Examples by Rancher auth type

| Rancher auth | Epinio (Dex) approach |
|--------------|------------------------|
| **Generic OIDC** (Okta, Keycloak, Auth0, etc.) | Use Dex’s [`oidc` connector](https://dexidp.io/docs/connectors/oidc/) with the **same issuer** and metadata Rancher uses. Use a dedicated `clientID` / `clientSecret` (or public client + PKCE, per Dex docs) for Epinio. |
| **Microsoft Entra ID** (Azure AD) | Follow [Configuring Microsoft Entra ID SSO](./configuring_entra_id.md) for Dex; mirror the same tenant and app model Rancher uses, with a separate app registration (or additional redirect URI) for Dex. |
| **Active Directory / OpenLDAP** | If Rancher binds via LDAP, you can use Dex’s [`ldap` connector](https://dexidp.io/docs/connectors/ldap/) against the **same directory**, with a service account and filters appropriate for your org. |
| **SAML only** (no OIDC at the IdP) | Dex can use a [SAML connector](https://dexidp.io/docs/connectors/saml/) in some setups; otherwise prefer adding an **OIDC application** alongside SAML in your IdP for Epinio, or an OIDC-capable broker. Exact steps depend on the IdP—Rancher’s SAML settings are not reused by Dex automatically. |

## Generic OIDC connector sketch

After you create an OIDC client in your IdP with redirect URI `https://auth.<your-domain>/callback`, extend the `config.yaml` key inside the `dex-config` secret (namespace `epinio` by default) with a connector similar to:

```yaml
connectors:
  - type: oidc
    id: corporate-idp
    name: Corporate IdP
    config:
      issuer: https://your-idp.example.com
      clientID: <client-id-for-epinio-dex>
      clientSecret: <client-secret>
      redirectURI: https://auth.<your-domain>/callback
```

Use your IdP’s documentation for scopes and claim names. If you map **groups** from the IdP into tokens, you can tie them to Epinio roles via the `rolesMapping` key on the same secret, as described in [OIDC authentication](../../references/authentication_oidc.md#groups-and-roles-mapping).

Restart the Dex workload after changing `dex-config`.

## Related documentation

- [Installing Epinio on Rancher](../../installation/other_inst_scenarios/install_epinio_on_rancher.md)
- [OIDC authentication](../../references/authentication_oidc.md)
- [Configuring Microsoft Entra ID SSO](./configuring_entra_id.md)
