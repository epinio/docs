---
sidebar_label: epinio app build
title: ""
description: epinio app build
keywords: [epinio, kubernetes, epinio app build]
doc-type: [reference]
doc-topic: [epinio, reference, epinio-cli, epinio-app-build]
doc-persona: [epinio-developer, epinio-operator]
---
## epinio app build

Build and store an application image without deploying it

### Synopsis

Build and store an application image without deploying it.

Use the same source flags as 'epinio app push' (path, git, manifest). After a
successful build, deploy with: epinio app deploy NAME

Subcommands manage existing builds:
  list, show, delete

```
epinio app build [flags] [PATH_TO_APPLICATION_MANIFEST]
```

### Options

```
      --app-chart string           App chart to use for deployment
      --build-mode string          Staging build mode: buildpack (default) or dockerfile
      --builder-image string       Paketo builder image to use for staging
      --container-image-url string Container image url (not usable with build; use push/deploy instead)
      --dockerfile-path string     Path to Dockerfile within the application sources (default: Dockerfile)
      --env-replace                Replace existing environment instead of merging
  -g, --git string                 Git repository and revision of sources separated by comma (e.g. GIT_URL,REVISION)
  -h, --help                       help for build
  -n, --name string                Application name. (mandatory if no manifest is provided)
  -p, --path string                Path to application sources.
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
* [epinio app build delete](./epinio_app_build_delete.md)	 - Delete the named application's current build
* [epinio app build list](./epinio_app_build_list.md)	 - List applications and their current build
* [epinio app build show](./epinio_app_build_show.md)	 - Show the named application's current build