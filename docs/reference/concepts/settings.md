---
sidebar_label: "CLI Settings"
title: "CLI settings"
description: "How the Epinio CLI stores connection settings, and how to authenticate from environment variables without a settings file."
keywords: [epinio, cli, settings, environment variables, EPINIO_PASSWORD, EPINIO_API_TOKEN]
doc-type: [reference]
doc-persona: [epinio-developer, epinio-operator]
doc-topic: [epinio, reference, concepts, settings]
---

The Epinio command line client uses a settings file to store
information which has to persist across invocations. This document
discusses that file, and how the same values can be supplied from
environment variables instead — including authenticating with no
settings file at all (for example in CI).

## Location

Epinio's settings file is located by default at `~/.config/epinio/settings.yaml`.

The location can be changed from command to command by specifying a
different path with the global command line option `--settings-file`.

A more permanent change is possible by setting the environment
variable `EPINIO_SETTINGS` to the desired path.

## Contents

Epinio's settings contains

  - The name of the namespace currently targeted.
  - Epinio API user name
  - Epinio API password (base64 encoded)
  - Epinio API Token
  - Epinio API urls (regular and websocket)
  - Epinio API certificate

The namespace can be changed by running `epinio target` with the
name of the desired namespace as its single argument.

Username and password are used by the client to authenticate itself
when talking to Epinio's API server. The `epinio login [URL]` command asks
for your username and password, checks the validity of the
credentials, and saves the information to the settings.

The `token` is an object generated when you log in
with an OIDC provider using the `epinio login --oidc` command.

The `token` combines the `access_token` and `refresh_token`.

If a token is present, it will be used to authenticate and takes precedence over the username and password.

The installation uses the wildcard domain `sslip.io` and the
`epinio-ca` issuer by default.

The `epinio login [URL]` checks if the associated certificate is signed by an
unknown CA and it asks you if you want to trust it and save it
to the settings so that future invocations of the client are able
to verify the actual certificate when talking to Epinio's API server.

The `epinio settings update-ca` updates the API url and the certificate.

## Environment variables

Many settings keys can be overridden (or supplied entirely) through
`EPINIO_*` environment variables. This is useful in CI and other
environments where writing `settings.yaml` is undesirable or
impossible (for example a read-only filesystem).

### Authentication without a settings file

When `EPINIO_API` is set and no settings file exists, the CLI runs in
**environment-only** mode: it authenticates from the environment and
does not create or update a settings file.

Credentials and tokens that come from the environment are never
written back to `settings.yaml`. If a settings file already exists and
you override password or token via the environment, a later save (for
example after `epinio target`) keeps the file's stored credentials and
does not persist the override.

Commands that would only update local settings — such as
`epinio target`, `epinio settings colors`, or setting a default app
chart — refuse to write a file in environment-only mode. The error
names the matching variable to set instead (`EPINIO_NAMESPACE`,
`EPINIO_COLORS`, or `EPINIO_APPCHART`).

Basic auth example:

```bash
export EPINIO_API=https://epinio.example.com
export EPINIO_USER=admin
export EPINIO_PASSWORD=password
# If the API uses a private CA and you have no trusted certs in a settings file:
# export EPINIO_SKIP_SSL_VERIFICATION=true

epinio app list
```

Token auth example:

```bash
export EPINIO_API=https://epinio.example.com
export EPINIO_API_TOKEN=<access-token>

epinio app list
```

### Variable reference

| Variable | Purpose |
|---|---|
| `EPINIO_SETTINGS` | Path to the settings file (same as `--settings-file`). |
| `EPINIO_API` | API base URL. Required for environment-only mode when no settings file is present. |
| `EPINIO_WSS` | Websocket API URL (optional override). |
| `EPINIO_USER` | API username for basic authentication. |
| `EPINIO_PASSWORD` | API password in **plaintext**. |
| `EPINIO_PASSWORD_B64` | API password, **base64-encoded**. |
| `EPINIO_API_TOKEN` | Bearer access token. Takes precedence over username/password when set. |
| `EPINIO_NAMESPACE` | Targeted namespace (same role as `epinio target`). |
| `EPINIO_APPCHART` | Default application chart name. |
| `EPINIO_COLORS` | Colorized CLI output (`true` / `false`). |
| `EPINIO_SKIP_SSL_VERIFICATION` | When `true` or `1`, skip TLS certificate verification. Useful for environment-only CI against a private CA. |

Password rules:

- Set **either** `EPINIO_PASSWORD` **or** `EPINIO_PASSWORD_B64`, not both.
- When a password variable is set, it overrides the `pass` value from
  the settings file for that invocation only and is not saved back.
- The older `EPINIO_PASS` name still works as a base64 password (same
  as `EPINIO_PASSWORD_B64`) but is deprecated; prefer
  `EPINIO_PASSWORD` or `EPINIO_PASSWORD_B64`.

Token rules:

- When `EPINIO_API_TOKEN` is set, it overrides the access token from
  the settings file for that invocation and is not saved back.
- Any stored refresh token and expiry from the settings file are
  ignored for that invocation, so an environment token is not mixed
  with a leftover OIDC refresh flow.

## Commands

The Epinio command line client currently provides 3 commands
explicitly targeting the settings. These are:

  1. `epinio target`

     As noted in the previous section, this command changes
     the namespace to use with all other commands.

  2. `epinio settings show`

     This command shows the details of the currently stored
     settings. An exception is made for the certificate
     field, due to its expected size. The command's output only notes
     if certificate data is present or not.

     When settings come from the environment alone, the shown origin
     is `<environment>` instead of a file path.

  3. `epinio login [URL]`

     Epinio allows users to switch between multiple installations (on
     different clusters) by simply using a different settings file.

     When such is done the credentials, cert data, and URLs stored in
     the settings will not match the newly targeted cluster,
     except by coincidence.

     Logging in and pointing to the newly targeted installation will create
     new settings file storing credentials, cert data, and URLs with
     information retrieved from the new cluster.
