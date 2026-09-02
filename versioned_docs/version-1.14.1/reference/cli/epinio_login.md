---
sidebar_label: epinio login
title: ""
description: epinio login
keywords: [epinio, kubernetes, epinio login]
doc-type: [reference]
doc-topic: [epinio, reference, epinio-cli, epinio-login]
doc-persona: [epinio-developer, epinio-operator]
---
## epinio login

Epinio login to the server

### Synopsis

The login command allows you to authenticate against an Epinio instance and updates the settings file with the generated authentication token

```
epinio login [URL] [flags]
```

### Options

```
  -h, --help              help for login
      --oidc              perform OIDC authentication (user and password will be ignored)
  -p, --password string   password that will be used to login
      --prompt            enable the prompt of the authorization code and disable the local server during OIDC authentication
      --trust-ca          automatically trust the unknown CA
  -u, --user string       username that will be used to login
```

### Options inherited from parent commands

```
  -H, --header stringArray       Add custom header to every request executed
  -c, --kubeconfig string        (KUBECONFIG) path to a kubeconfig, not required in-cluster
      --log-level string         (LOG_LEVEL) Only prints log messages at or above this level (debug, info, warn, error, fatal) (default "info")
      --no-colors                Suppress colorized output
      --settings-file string     (EPINIO_SETTINGS) set path of settings file (default "~/.config/epinio/settings.yaml")
      --skip-ssl-verification    (SKIP_SSL_VERIFICATION) Skip the verification of TLS certificates
      --timeout-multiplier int   (EPINIO_TIMEOUT_MULTIPLIER) Multiply timeouts by this factor (default 1)
      --verbosity int            (VERBOSITY) Only print progress messages at or above this level (0 or 1, default 0)
```

### SEE ALSO

* [epinio](./epinio.md)	 - Epinio cli

