---
sidebar_label: "Security"
title: "Epinio security"
description: Epinio security, concepts and context
keywords: [epinio, kubernetes, security, application development]
---

Epinio secures access to its API with TLS and basic authentication.

Use the `epinio login [URL]` command after installation to save the necessary credentials (user, password) and certificates.
Epinio stores credentials in its settings for use by other Epinio commands requiring them.

For a trial deployment the underlying cluster generates a certificate securing the API.
It's a self-signed certificate, and its certificate authority certificate is stored in the settings for verification.

For a production deployment,
with a domain specified (`--set global.domain=...`,
when installing the chart),
the certificate is obtained from [Let's Encrypt](https://letsencrypt.org/).
Credential storage in settings isn't necessary as Let's Encrypt is a known CA.

:::note

Read more on how to use Let's Encrypt with Epinio in the [certificate issuers](../howtos/other/certificate_issuers.md) documentation.

:::

Kubernetes accesses the Epinio registry (TLS or not) differently depending on installation flags.
There is more detail in the [Epinio registry](../explanations/advanced.md#container-registry) documentation.

### OpenID Connect (OIDC)

Since version **1.3.0**, Epinio has integrated [Dex](https://dexidp.io/)
as an identity provider which adds the support for external OIDC providers.

To authenticate through Dex, you use the login command with the `--oidc` flag.
This opens a web page where you can authenticate with the configured provider.

### Cosign and Epinio images

We use Cosign to sign the Epinio images, rather than signing all individual release assets.
Cosign can be used to check the images, following download.
There is further information in the [installation documentation](https://docs.epinio.io/installation/install_epinio_cli#verify-file-checksum-signature).
