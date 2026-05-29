---
sidebar_label: Performance Tuning
sidebar_position: 12
title: Epinio Performance Settings
description: How to change the performance settings available in Epinio
keywords: [epinio, kubernetes, rate limiting, performance tuning]
doc-type: [how-to]
doc-topic: [epinio, how-to, performance-tuning]
doc-persona: [epinio-developer, epinio-operator]
---

### Rate Limiting

By default, Epinio controls client-side Kubernetes API rate limiting with two environment variables.
See the [client-go rate limiting constants](https://pkg.go.dev/k8s.io/client-go/rest#pkg-constants)
for background on how these work.

| Variable | Default | Description |
|---|---|---|
| `KUBE_API_QPS` | `5` | Sustained queries per second to the Kubernetes API |
| `KUBE_API_BURST` | `10` | Maximum burst above the QPS limit |

The defaults are conservative. If you are running many concurrent users or high-frequency deployments,
increasing these values will reduce latency under load. Changes take effect after restarting the
Epinio server.

> **Note:** The Kubernetes API server has its own rate limits. Setting client-side limits too high
> can exhaust server-side capacity. If you see `429 Too Many Requests` errors, either lower
> `KUBE_API_QPS`/`KUBE_API_BURST` or increase the API server limits.
>
> Kubernetes 1.29+ uses
> [API Priority and Fairness](https://kubernetes.io/docs/concepts/cluster-administration/flow-control/)
> by default, configured via `FlowSchema` and `PriorityLevelConfiguration` objects.
> Older clusters use the `--max-requests-inflight` and `--max-mutating-requests-inflight`
> [kube-apiserver flags](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/).
