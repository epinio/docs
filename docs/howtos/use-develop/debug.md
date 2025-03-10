---
sidebar_label: Debugging an application
sidebar_position: 4
title: Debugging an application
description: How to debug an Epinio application.
keywords: [epinio, kubernetes, application debugging]
doc-type: [how-to]
doc-topic: [epinio, how-to, use-develop, debug]
doc-persona: [epinio-developer, epinio-operator]
---

<head>
  <link rel="canonical" href="https://docs.epinio.io/howtos/use-develop/debug"/>
</head>

## Java

To debug a Java application you have to set the
[`BPL_DEBUG_ENABLED`](https://paketo.io/docs/howto/java/#enable-remote-debugging) environment variable to `true`.
You can do this with the Epinio CLI `app env set` command:

```console
epinio app env set samplejava BPL_DEBUG_ENABLED true
```

After the application has restarted (to integrate the change of the environment),
use [port forwarding](../other/port_forwarding.md) to attach the debugger.
It runs by default on the port `8000`:

```console
epinio app port-forward sample 8000:8000
```

This forwards the traffic coming from `localhost:8000` to the remote `:8000`.

## Node

To debug a Node application you need to start the application with the `--inspect` flag.
Your `package.json` has to be similar to:

```json
{
  "name": "nodejs-sample-app",
  "version": "1.0.0",
  "scripts": {
    "start": "node --inspect index.js"
  }
}
```

After deploying the application ,
use [port forwarding](../other/port_forwarding.md)
to attach the debugger.
By default, it runs on port `9229`:

```console
epinio app port-forward sample 9229:9229
```

This forwards the traffic coming from `localhost:9229` to the remote `:9229`.
