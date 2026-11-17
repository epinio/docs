---
sidebar_label: epinio service catalog update
title: ""
description: epinio service catalog update
keywords: [epinio, kubernetes, epinio service catalog update]
doc-type: [reference]
doc-topic: [epinio, reference, epinio-cli, epinio-service-catalog-update]
doc-persona: [epinio-developer, epinio-operator]
---
## epinio service catalog update

Update an Epinio catalog service

```
epinio service catalog update NAME [flags]
```

### Options

```
      --app-version string         application version
      --chart string               Helm chart
      --chart-version string       Helm chart version
      --description string         long description
      --helm-repo-name string      Helm repository name
      --helm-repo-secret string    Helm repository credentials secret
      --helm-repo-url string       Helm repository URL
  -h, --help                       help for update
      --secret-types strings       comma-separated secret types
      --service-icon string        service icon
      --short-description string   short description
      --values-file string         path to a YAML file whose contents are sent as the values string field
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

* [epinio service catalog](./epinio_service_catalog.md)	 - Lists all available Epinio catalog services, or show the details of the specified one

