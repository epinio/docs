---
title: "epinio app"
linkTitle: "epinio app"
weight: 1
---
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
      --config-file string       (EPINIO_CONFIG) set path of configuration file (default "~/.config/epinio/config.yaml")
  -c, --kubeconfig string        (KUBECONFIG) path to a kubeconfig, not required in-cluster
      --no-colors                Suppress colorized output
      --skip-ssl-verification    (SKIP_SSL_VERIFICATION) Skip the verification of TLS certificates
      --timeout-multiplier int   (EPINIO_TIMEOUT_MULTIPLIER) Multiply timeouts by this factor (default 1)
      --trace-level int          (TRACE_LEVEL) Only print trace messages at or above this level (0 to 5, default 0, print nothing)
      --verbosity int            (VERBOSITY) Only print progress messages at or above this level (0 or 1, default 0)
```

### SEE ALSO

* [epinio](../epinio)	 - Epinio cli
* [epinio app create](../epinio_app_create)	 - Create just the app, without creating a workload
* [epinio app delete](../epinio_app_delete)	 - Deletes an application
* [epinio app env](../epinio_app_env)	 - Epinio application configuration
* [epinio app list](../epinio_app_list)	 - Lists applications
* [epinio app logs](../epinio_app_logs)	 - Streams the logs of the application
* [epinio app manifest](../epinio_app_manifest)	 - Save state of the named application as a manifest
* [epinio app push](../epinio_app_push)	 - Push an application declared in the specified manifest
* [epinio app show](../epinio_app_show)	 - Describe the named application
* [epinio app update](../epinio_app_update)	 - Update the named application

