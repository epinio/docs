---
sidebar_label: "Rancher as OIDC Provider"
sidebar_position: 22
title: "Using Rancher as an OIDC Provider for Epinio"
description: How to configure Rancher Manager as an OIDC identity provider for Epinio via Dex.
keywords: [epinio, kubernetes, rancher, sso, oidc, dex, identity]
doc-type: [how-to]
doc-topic: [epinio, customize, operations, rancher, sso]
---

# Using Rancher as an OIDC Provider for Epinio

Rancher Manager (v2.12+) can act as an OpenID Connect (OIDC) identity provider. This guide walks through configuring Rancher as the OIDC issuer and connecting it to Epinio's Dex instance so that users authenticated in Rancher can sign in to Epinio with SSO.

## Prerequisites

- Rancher Manager with an external auth provider already configured (e.g., GitHub, Active Directory, SAML). Rancher's OIDC provider surfaces the identities from whatever upstream auth Rancher itself uses.
- The `oidc-provider` feature flag enabled on Rancher. Enable it under **☰ → Global Settings → Feature Flags**, or via:
  ```bash
  kubectl patch features oidc-provider -p '{"spec":{"value":true}}' --type merge
  ```
- Epinio installed with Dex enabled.
- Access to the `dex-config` secret in the `epinio` namespace.

## Overview

The integration has two sides:

1. **Rancher side** — Register an OIDC client for Dex in Rancher. Rancher generates a client ID and secret. See [Configure Rancher as an OIDC Provider](https://ranchermanager.docs.rancher.com/how-to-guides/advanced-user-guides/configure-oidc-provider).
2. **Dex side** — Configure an OIDC connector in Dex that points at Rancher's OIDC issuer, using the credentials from step 1.

```
User → Epinio UI → Dex → Rancher (OIDC) → Upstream IdP (e.g., GitHub)
                     ↑                          ↓
                     ←──── id_token + claims ────┘
```

## Step 1: Register Dex as an OIDC Client in Rancher

Follow the Rancher documentation to create an `OIDCClient` for Epinio's Dex, either via `kubectl` or through the Rancher UI (**☰ → Users & Authentication → OIDC Apps → Add Application**):

[Configure Rancher as an OIDC Provider](https://ranchermanager.docs.rancher.com/how-to-guides/advanced-user-guides/configure-oidc-provider)

When creating the client, set the **redirect URI** to match Dex's callback URL:

```
https://auth.<your-epinio-domain>/callback
```

Once created, note the generated **client ID** and **client secret** — you will need both for the Dex connector configuration in the next step.

## Step 2: Configure the Dex OIDC Connector

Edit the `config.yaml` key inside the `dex-config` secret in the `epinio` namespace. Add (or update) an OIDC connector block pointing at Rancher.

```yaml
connectors:
  - type: oidc
    id: rancher
    name: Rancher
    config:
      issuer: https://<rancher-url>/oidc
      clientID: <client-id-from-step-1>
      clientSecret: <client-secret-from-step-1>
      redirectURI: https://auth.<your-epinio-domain>/callback

      # Rancher's OIDC provider only supports these scopes.
      # Requesting others (e.g., "email", "groups") will cause errors.
      scopes:
        - openid
        - profile
        - offline_access

      # Required: Rancher does not return groups in the standard scopes.
      # This tells Dex to request them outside of the normal scope flow.
      insecureEnableGroups: true

      # Claim mapping — Rancher may not return an "email" claim.
      # If your upstream IdP populates the "name" claim but not "email",
      # map it so Dex can identify the user.
      claimMapping:
        email: name
```

### Key configuration notes

**Scopes:** Rancher's OIDC provider only supports `openid`, `profile`, and `offline_access`. Do not add `email` or `groups` to the `scopes` list — they are not recognized and will cause token request failures.

**`insecureEnableGroups`:** Because groups are not surfaced through a standard scope, this flag is required for Dex to include group information in the token. Without it, the `groups` claim will be empty even if the user belongs to groups in the upstream IdP.

**`claimMapping`:** Rancher's userinfo response depends on the upstream auth provider. If your provider does not populate a standard `email` claim, you need to map an alternative claim. For example, when Rancher uses GitHub auth, the `name` field is typically populated with the GitHub username, so `claimMapping.email: name` tells Dex to treat that value as the email identifier.

## Step 3: Group Claims and Roles Mapping

When Rancher's upstream auth is GitHub, group claims are returned as **numeric GitHub team IDs** in the format:

```
github_team://123456
```

These are not human-readable team names like `my-org:my-team`. This is a Rancher behavior — it maps GitHub teams to their numeric IDs internally.

To map these to Epinio roles, use the `rolesMapping` key in the `dex-config` secret. You can map both formats if you have connectors that return different group name styles:

```yaml
rolesMapping:
  # From a direct GitHub connector (human-readable)
  "my-org:my-team":
    - "user"
    - "admin:my-namespace"

  # From the Rancher OIDC connector (numeric GitHub team IDs)
  "github_team://123456":
    - "admin"
```

## Step 4: Apply and Restart

After updating the `dex-config` secret, restart the Dex workload so it picks up the new configuration:

```bash
kubectl rollout restart deployment dex -n epinio
```

Verify the OIDC flow:

```bash
epinio login --oidc https://epinio.<your-domain>
```

This should redirect you through Dex to the Rancher login page (which in turn may redirect to your upstream IdP, e.g., GitHub OAuth).

## Troubleshooting

**"Invalid scopes" or token errors:** Verify your connector only requests `openid`, `profile`, and `offline_access`. Remove any other scopes.

**Groups claim is empty:** Confirm `insecureEnableGroups: true` is set in the connector config. Also verify the user actually belongs to a team/group in the upstream IdP — org-level membership alone may not populate groups.

**Numeric group IDs don't match:** Use the GitHub API to confirm the team ID. Rancher uses the numeric `id`, not the `slug` or display name.

## Related Documentation

- [Configure Rancher as an OIDC Provider](https://ranchermanager.docs.rancher.com/how-to-guides/advanced-user-guides/configure-oidc-provider) (Rancher docs)
- [Dex OIDC Connector](https://dexidp.io/docs/connectors/oidc/)
- [OIDC authentication](../../references/authentication_oidc.md) (Epinio docs)
- [Groups and roles mapping](../../references/authentication_oidc.md#groups-and-roles-mapping) (Epinio docs)
