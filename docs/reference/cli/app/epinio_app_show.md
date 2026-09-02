---
sidebar_label: epinio app show
title: ""
description: epinio app show
keywords: [epinio, kubernetes, epinio app show]
doc-type: [reference]
doc-topic: [epinio, reference, epinio-cli, epinio-app-show]
doc-persona: [epinio-developer, epinio-operator]
---
## epinio app show

Describe the named application. Shows details such as status, instances, routes, bound configurations, and environment.

With `-o json`, the response includes application `configuration` with:

- **`environment`** — User-set environment variables (key-value map).
- **`environment_grouped`** — Environment variables grouped by origin (`user` and `service`), same structure as [epinio app env show](./env/epinio_app_env_show.md) when using the API with `?grouped=true`. Use this to tell user-defined variables apart from those injected by bound services.

```
epinio app show NAME [flags]
```

### Options

```
  -h, --help            help for show
  -o, --output string   sets output format [text|json] (default "text")
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

* [epinio app](./epinio_app.md)	 - Epinio application features

