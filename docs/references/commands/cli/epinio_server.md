---
sidebar_label: epinio server
title: ""
description: epinio server
keywords: [epinio, kubernetes, epinio server]
doc-type: [reference]
doc-topic: [epinio, reference, epinio-cli, epinio-server]
doc-persona: [epinio-developer, epinio-operator]
---
## epinio server

Starts the Epinio server.

### Synopsis

This command starts the Epinio server. `epinio install` ensures the server is running inside your cluster. Normally you don't need to run this command manually.

```
epinio server [flags]
```

### Options

```
      --access-control-allow-origin string    (ACCESS_CONTROL_ALLOW_ORIGIN) Domains allowed to use the API
      --app-image-exporter string             (APP_IMAGE_EXPORTER) Name of the container image used to download the application image from the 'export' API.
      --default-builder-image string          (DEFAULT_BUILDER_IMAGE) Name of the container image used to build images from staged sources.
      --disable-tracking                      (DISABLE_TRACKING) Disable tracking of the running Epinio and Kubernetes versions
  -h, --help                                  help for server
      --ingress-class-name string             (INGRESS_CLASS_NAME) Name of the ingress class to use for apps. Leave empty to add no ingressClassName to the ingress.
      --kube-api-burst int                    (KUBE_API_BURST) Maximum burst for throttle of the Kubernetes client. (default 10)
      --kube-api-qps float32                  (KUBE_API_QPS) The QPS indicates the maximum QPS of the Kubernetes client. (default 5)
  -n, --namespace string                      (NAMESPACE) The namespace to use (default "epinio")
      --port int                              (PORT) The port to listen on. Leave empty to auto-assign a random port
      --registry-certificate-secret string    (REGISTRY_CERTIFICATE_SECRET) Secret for the registry's TLS certificate
      --s3-certificate-secret string          (S3_CERTIFICATE_SECRET) Secret for the S3 endpoint TLS certificate. Can be left empty if S3 is served with a trusted certificate.
      --staging-resource-cpu string           (STAGING_RESOURCE_CPU)
      --staging-resource-disk string          (STAGING_RESOURCE_DISK)
      --staging-resource-memory string        (STAGING_RESOURCE_MEMORY)
      --staging-service-account-name string   (STAGING_SERVICE_ACCOUNT_NAME)
      --tls-issuer string                     (TLS_ISSUER) The cluster issuer to use for workload certificates
      --upgrade-responder-address string      (UPGRADE_RESPONDER_ADDRESS) Disable tracking of the running Epinio and Kubernetes versions (default "https://epinio.version.rancher.io/v1/checkupgrade")
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

* [epinio](./epinio.md)	 - Epinio cli

