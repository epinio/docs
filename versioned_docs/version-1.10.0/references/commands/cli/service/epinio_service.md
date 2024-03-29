---
title: ""
sidebar_label: "epinio service"
---
## epinio service

Epinio service management

### Synopsis

Manage the epinio services

### Options

```
  -h, --help   help for service
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
* [epinio service bind](./epinio_service_bind.md)	 - Bind a service SERVICENAME to an Epinio app APPNAME
* [epinio service catalog](./epinio_service_catalog.md)	 - Lists all available Epinio catalog services, or show the details of the specified one
* [epinio service create](./epinio_service_create.md)	 - Create a service SERVICENAME of an Epinio catalog service CATALOGSERVICENAME
* [epinio service delete](./epinio_service_delete.md)	 - Delete one or more services
* [epinio service list](./epinio_service_list.md)	 - List all the services in the targeted namespace
* [epinio service port-forward](./epinio_service_port-forward.md)	 - forward one or more local ports to a service SERVICENAME
* [epinio service show](./epinio_service_show.md)	 - Show details of a service SERVICENAME
* [epinio service unbind](./epinio_service_unbind.md)	 - Unbinds a service SERVICENAME from an Epinio app APPNAME
* [epinio service update](./epinio_service_update.md)	 - Update a service

