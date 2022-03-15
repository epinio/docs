## How to debug an app

This how-to demonstrates how to debug a running application.

To prepare the application for debugging the flag [`BPL_DEBUG_ENABLED`](https://paketo.io/docs/howto/java/#enable-remote-debugging) has to be set to `true`.  
With the epinio cli this is done by setting the environment variable for the application:

```
epinio app env set samplejava BPL_DEBUG_ENABLED true
```

After the application has restarted (to integrate the change of the environment) you can use [port forwarding](port_forwarding.md) to attach the debugger:

```
epinio app port-forward samplejava 34505:8000 34506:8080
```

This will forward the traffic coming from `localhost:34505` to the remote `:8000` and the `localhost:34506` to the remote `:8080`.
