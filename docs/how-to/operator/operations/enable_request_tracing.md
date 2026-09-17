---
sidebar_label: Request Tracing
sidebar_position: 13
title: Enable Request Tracing
description: How to export Epinio server request traces to an OpenTelemetry collector
keywords: [epinio, kubernetes, opentelemetry, otel, tracing, observability]
doc-type: [how-to]
doc-topic: [epinio, how-to, observability, tracing]
doc-persona: [epinio-operator]
---

The Epinio server can export a trace span for each API request it handles, using
[OpenTelemetry](https://opentelemetry.io/) (OTLP). This is useful for following a single
request's path through the server, and for spotting slow or failing endpoints.

Tracing is disabled by default. Enabling it does not require restarting with any other flags,
and leaving it disabled has no effect on server behavior.

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

## What gets traced

Every HTTP request handled by the server's API router produces a span, tagged with the
`epinio-server` service name, tied to the request's route, method, and status code.

Websocket endpoints (used for `app exec`, `app logs`, `app port-forward`, and similar
long-lived connections) are excluded from tracing, since a span covering an entire
connection's lifetime isn't a meaningful unit of work.

## Collector unavailable

If the configured collector can't be reached, the server logs the failure and keeps serving
requests as normal — it does not fail startup or drop requests because tracing is unavailable.
