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

Tracing and log export are disabled by default. Enabling them does not require restarting
with any other flags, and leaving them disabled has no effect on server behavior.

## Enabling tracing

Set the collector endpoint via either a flag or an environment variable when starting the
server:

| Variable / Flag | Default | Description |
|---|---|---|
| `OTEL_EXPORTER_OTLP_ENDPOINT` / `--otel-exporter-otlp-endpoint` | *(empty, tracing disabled)* | OTLP collector endpoint, including scheme, e.g. `http://collector:4317` (grpc) or `http://collector:4318` (http/protobuf) |
| `OTEL_EXPORTER_OTLP_PROTOCOL` / `--otel-exporter-otlp-protocol` | `grpc` | Export protocol: `grpc` or `http/protobuf` |

For example, to export traces to a collector reachable at `otel-collector:4318` over
http/protobuf:

```console
epinio server \
  --otel-exporter-otlp-endpoint http://otel-collector:4318 \
  --otel-exporter-otlp-protocol http/protobuf
```

`OTEL_EXPORTER_OTLP_ENDPOINT` enables both trace and log export. To enable just one of the
two signals, use its signal-specific endpoint instead — see
[Enabling only one signal](#enabling-only-one-signal) below.

## What gets traced

### API requests

Every HTTP request handled by the server's API router produces a span, tagged with the
`epinio-server` service name, tied to the request's route, method, and status code.

Websocket endpoints (used for `app exec`, `app logs`, `app port-forward`, and similar
long-lived connections) are excluded from tracing, since a span covering an entire
connection's lifetime isn't a meaningful unit of work.

### Kubernetes API calls

Every outbound call the server makes to the Kubernetes API — whether through the typed
clientset, the dynamic client, Helm, or the metrics client — produces its own client span,
nested under the API request span that triggered it. This makes it possible to see, for a
single slow request, how much time was spent waiting on the Kubernetes API versus the
server's own processing.

Only W3C trace context is propagated to the Kubernetes API server; OpenTelemetry
[baggage](https://opentelemetry.io/docs/concepts/signals/baggage/) is deliberately not
forwarded, so caller-controlled metadata is never sent to the privileged Kubernetes API.

## Correlating logs with traces

When log export is enabled (see [Enabling only one signal](#enabling-only-one-signal)),
request-scoped log lines gain `trace_id` and `span_id` fields alongside the existing
`requestId`, so a log line can be matched to the trace it happened during in the collector.
Console output is unaffected — these fields are only added to the records sent to the
collector.

## Enabling only one signal

`OTEL_EXPORTER_OTLP_TRACES_ENDPOINT` and `OTEL_EXPORTER_OTLP_LOGS_ENDPOINT` enable traces and
logs independently of each other, and independently of `OTEL_EXPORTER_OTLP_ENDPOINT`. There
are no `--flag` equivalents for these two — set them as environment variables.

For example, to export logs (with trace/span correlation fields) without exporting any
traces:

```console
OTEL_EXPORTER_OTLP_LOGS_ENDPOINT=http://otel-collector:4318 epinio server
```

## Collector unavailable

If the configured collector can't be reached, the server logs the failure and keeps serving
requests as normal — it does not fail startup or drop requests because tracing or log export
is unavailable.
