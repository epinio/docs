---
sidebar_label: Request Tracing
sidebar_position: 13
title: Enable Request Tracing
description: How to export Epinio server request traces and correlated logs to an OpenTelemetry collector
keywords: [epinio, kubernetes, opentelemetry, otel, tracing, observability, logging]
doc-type: [how-to]
doc-topic: [epinio, how-to, observability, tracing]
doc-persona: [epinio-operator]
---

The Epinio server can export a trace span for each API request it handles, along with a
client span for every Kubernetes API call that request makes, using
[OpenTelemetry](https://opentelemetry.io/) (OTLP). This is useful for following a single
request's path through the server and into the cluster, and for spotting slow or failing
endpoints. Log records can optionally be correlated with these traces too.

Tracing and log export are disabled by default. Enabling them is a Helm values change, and
the upgrade rolls the `epinio-server` pod. Nothing else needs configuring, and leaving them
disabled has no effect on server behavior.

## Prerequisites

- An OpenTelemetry collector reachable from the Epinio namespace, with an OTLP receiver
  listening on port 4317 (grpc) or 4318 (http/protobuf).
- An existing Epinio release installed with Helm, and the values file you installed it with.
- An up to date chart index (`helm repo update epinio`). A stale index resolves
  `epinio/epinio` to an older chart, which downgrades the release.

## Enabling tracing

The collector endpoint is set through environment variables on the Epinio server, which the
chart passes through with `extraEnv`:

| Environment variable | Default | Description |
|---|---|---|
| `OTEL_EXPORTER_OTLP_ENDPOINT` | *(empty, tracing disabled)* | OTLP collector endpoint, including scheme, e.g. `http://collector:4317` (grpc) or `http://collector:4318` (http/protobuf) |
| `OTEL_EXPORTER_OTLP_PROTOCOL` | `grpc` | Export protocol: `grpc` or `http/protobuf` |

For example, to export traces to a collector reachable at `otel-collector:4318` over
http/protobuf, add them to your values file:

```yaml
extraEnv:
  - name: OTEL_EXPORTER_OTLP_ENDPOINT
    value: "http://otel-collector:4318"
  - name: OTEL_EXPORTER_OTLP_PROTOCOL
    value: "http/protobuf"
```

and apply it:

```bash
helm upgrade --install epinio epinio/epinio --namespace epinio -f epinio-values.yaml
```

This moves the release to the newest chart in your index as well as setting the variables.
To change only the environment, pass the version you already run, as shown by
`helm list --namespace epinio`:

```bash
helm upgrade --install epinio epinio/epinio --namespace epinio \
    --version 1.14.2 -f epinio-values.yaml
```

Or with `--set`, if you do not keep a values file:

```bash
helm upgrade --install epinio epinio/epinio --namespace epinio \
    --set extraEnv[0].name=OTEL_EXPORTER_OTLP_ENDPOINT \
    --set extraEnv[0].value=http://otel-collector:4318 \
    --set extraEnv[1].name=OTEL_EXPORTER_OTLP_PROTOCOL \
    --set extraEnv[1].value=http/protobuf
```

:::caution
`extraEnv` is a list, so setting it replaces it wholesale. Include any other variables you
already pass to the server, or they will be dropped on upgrade.
:::

`OTEL_EXPORTER_OTLP_ENDPOINT` enables both trace and log export. To enable just one of the
two signals, use its signal-specific endpoint instead, as described below.

:::caution Traces-only backends
Because that variable turns on both signals, the endpoint has to accept OTLP logs as well as
traces. A traces-only backend such as Jaeger answers the log endpoint with `404 Not Found`,
and the server retries about once a second, filling the log with `otel error` lines. Traces
are still exported normally, but for those backends set `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT`
instead and leave the global variable unset.
:::

## Enabling only one signal

`OTEL_EXPORTER_OTLP_TRACES_ENDPOINT` and `OTEL_EXPORTER_OTLP_LOGS_ENDPOINT` enable traces and
logs independently of each other, and independently of `OTEL_EXPORTER_OTLP_ENDPOINT`. Like
the variables above, they are set through `extraEnv`.

For example, to export logs (with trace/span correlation fields) without exporting any
traces:

```yaml
extraEnv:
  - name: OTEL_EXPORTER_OTLP_LOGS_ENDPOINT
    value: "http://otel-collector:4318"
```

and apply it:

```bash
helm upgrade --install epinio epinio/epinio --namespace epinio -f epinio-values.yaml
```

## Verifying the export

Once the upgrade has rolled the pod, confirm the server is running with the endpoint set:

```bash
kubectl -n epinio get deployment epinio-server \
    -o jsonpath='{.spec.template.spec.containers[0].env[?(@.name=="OTEL_EXPORTER_OTLP_ENDPOINT")].value}'
```

Then make an API request so there is something to trace:

```bash
epinio app list
```

The spans arrive in your collector under the service name `epinio-server`. If nothing shows
up there, check the server log for export errors, which are recorded as `otel error`:

```bash
kubectl -n epinio logs deployment/epinio-server | grep "otel error"
```

## How it works

### What gets traced

Every HTTP request handled by the server's API router produces a span, tagged with the
`epinio-server` service name and tied to the request's route, method, and status code.
Websocket endpoints (used for `app exec`, `app logs`, `app port-forward`, and similar
long-lived connections) are excluded, since a span covering an entire connection's lifetime
isn't a meaningful unit of work.

Every outbound call the server makes to the Kubernetes API, whether through the typed
clientset, the dynamic client, Helm, or the metrics client, produces its own client span
nested under the API request span that triggered it. For a slow request, this shows how much
time went to the Kubernetes API versus the server's own processing.

Only W3C trace context is propagated to the Kubernetes API server; OpenTelemetry
[baggage](https://opentelemetry.io/docs/concepts/signals/baggage/) is deliberately not
forwarded, so caller-controlled metadata is never sent to the privileged Kubernetes API.

### Log correlation

When log export is enabled (see [Enabling only one signal](#enabling-only-one-signal)),
request-scoped log lines gain `trace_id` and `span_id` fields alongside the existing
`requestId`, so the collector can match a log line to the trace it belongs to. Console
output is unaffected: the fields are only added to the records sent to the collector.

### When the collector is unavailable

If the configured collector can't be reached, the server logs the failure and keeps serving
requests as normal. It does not fail startup or drop requests because the collector is down.

An unusable configuration behaves differently. If the exporter cannot be built at all, for
example when `OTEL_EXPORTER_OTLP_PROTOCOL` is set to something other than `grpc` or
`http/protobuf`, the server fails to start.
