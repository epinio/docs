---
sidebar_label: "Using proxy headers"
title: "Using proxy headers with the Epinio CLI"
description: "Configure the Epinio CLI to use and optionally persist proxy authentication headers, such as Proxy-Authorization, when your API is behind an authenticating proxy."
keywords: [epinio, proxy, headers, authentication, iap]
doc-type: [how-to]
doc-topic: [operations]
---

Some environments place the Epinio API behind an authenticating proxy (for example
GCP IAP) which requires an additional HTTP header such as
`Proxy-Authorization: Bearer <ID_TOKEN>` on every request.

The Epinio CLI supports:

- passing custom headers with the global `--header` flag, and
- optionally persisting those headers in the settings file so they are reused
  automatically after login.

## One-off usage

To use a custom header for a single command:

```bash
epinio app list --header "Proxy-Authorization: Bearer ID_TOKEN"
```

This header is only applied to that command invocation.

## Remembering headers across commands

To avoid repeating the header on every command:

1. Log in with the header and the `--remember-header` flag:

   ```bash
   epinio login \
     -u admin \
     -p password \
     https://epinio.example.com \
     --header "Proxy-Authorization: Bearer ID_TOKEN" \
     --remember-header
   ```

2. After a successful login, the header is stored in the CLI settings file and
   is automatically sent with all subsequent API requests. You can then call:

   ```bash
   epinio app list
   epinio service create ...
   ```

   without repeating `--header`.

To stop sending previously stored headers, log in again **without**
`--remember-header`, or edit the settings file to remove the `headers` entry.

## Security considerations

Persisted headers (including bearer tokens) are written in plain text to the
CLI settings file on disk. Treat this file as sensitive:

- Ensure file permissions restrict access to your user.
- Prefer short‑lived tokens where possible.
- Clear headers when you no longer need them.

