## How to debug an app

This how-to demonstrates how to debug a running application.

### Java

To debug a Java application you have to set the [`BPL_DEBUG_ENABLED`](https://paketo.io/docs/howto/java/#enable-remote-debugging) environment variable to `true`.  
This is done with the epinio cli `app env set` command:

```
epinio app env set samplejava BPL_DEBUG_ENABLED true
```

After the application has restarted (to integrate the change of the environment) you can use [port forwarding](port_forwarding.md) to attach the debugger that will run by default on the port `8000`:

```
epinio app port-forward sample 8000:8000
```

This will forward the traffic coming from `localhost:8000` to the remote `:8000`.

### Node

To debug a Node application you will need to start the application with the `--inspect` flag, so your `package.json will be:

```json
{
  "name": "nodejs-sample-app",
  "version": "1.0.0",
  "scripts": {
    "start": "node --inspect index.js"
  }
}
```

After the application has been deployed use [port forwarding](port_forwarding.md) to attach the debugger. It runs by default on the port `9229`:

```
epinio app port-forward sample 9229:9229
```

This will forward the traffic coming from `localhost:9229` to the remote `:9229`.
