---
sidebar_label: epinio app
title: ""
description: epinio app
keywords: [epinio, kubernetes, epinio app]
doc-type: [reference]
doc-topic: [epinio, reference, epinio-cli, epinio-app]
doc-persona: [epinio-developer, epinio-operator]
---

<head>
  <link rel="canonical" href="https://docs.epinio.io/references/commands/cli/app/epinio_app"/>
</head>
## epinio app

Epinio application features

### Synopsis

Manage epinio application

```
epinio app [flags]
```

### Options

```
  -h, --help   help for app
```

### Options inherited from parent commands

```
  -H, --header stringArray       Add custom header to every request executed
  -c, --kubeconfig string        (KUBECONFIG) path to a kubeconfig, not required in-cluster
      --no-colors                Suppress colorized output
      --settings-file string     (EPINIO_SETTINGS) set path of settings file (default "~/.config/epinio/settings.yaml")
      --skip-ssl-verification    (SKIP_SSL_VERIFICATION) Skip the verification of TLS certificates
      --timeout-multiplier int   (EPINIO_TIMEOUT_MULTIPLIER) Multiply timeouts by this factor (default 1)
      --trace-file string        (TRACE_FILE) Print trace messages to the specified file
      --trace-level int          (TRACE_LEVEL) Only print trace messages at or above this level (0 to 255, default 0, print nothing)
      --trace-output string      (TRACE_OUTPUT) Sets trace output format [text,json] (default "text")
      --verbosity int            (VERBOSITY) Only print progress messages at or above this level (0 or 1, default 0)
```

### SEE ALSO

* [epinio](../epinio.md)	 - Epinio cli
* [epinio app chart](./chart/epinio_app_chart.md)	 - Epinio application chart management
* [epinio app create](./epinio_app_create.md)	 - Create just the app, without creating a workload
* [epinio app delete](./epinio_app_delete.md)	 - Deletes one or more applications
* [epinio app env](./env/epinio_app_env.md)	 - Epinio application configuration
* [epinio app exec](./epinio_app_exec.md)	 - creates a shell to the application
* [epinio app export](./epinio_app_export.md)	 - Export the named application into the directory or flag-specified registry
* [epinio app list](./epinio_app_list.md)	 - Lists applications
* [epinio app logs](./epinio_app_logs.md)	 - Streams the logs of the application
* [epinio app manifest](./epinio_app_manifest.md)	 - Save state of the named application as a manifest
* [epinio app port-forward](./epinio_app_port-forward.md)	 - forward one or more local ports to a pod
* [epinio app push](../epinio_push.md)	 - Push an application declared in the specified manifest
* [epinio app restage](./epinio_app_restage.md)	 - Restage the application, then restart, if running and not suppressed
* [epinio app restart](./epinio_app_restart.md)	 - Restart the application
* [epinio app show](./epinio_app_show.md)	 - Describe the named application
* [epinio app update](./epinio_app_update.md)	 - Update the named application

