## How to use Port Forwarding

If you would like to use port forwarding to access or debug your running application this how-to will show you how to do it.

If you want to debug your app you will need to set to `true` the [`BPL_DEBUG_ENABLED`](https://paketo.io/docs/howto/java/#enable-remote-debugging) flag.  
To do so you can use the cli to set the environment variable on your app:

```
epinio app env set samplejava BPL_DEBUG_ENABLED true
```

Then you can start port forwarding with the `port-forward` command:

```
epinio app port-forward samplejava 34505:8000 34506:8080
```

This will forward the traffic coming from `localhost:34505` to the remote `:8000` and the `localhost:34506` to the remote `:8080`.
The local port is optional, if none is provided then a random port will be selected.

### Point to a specific instance

You can also point to a specific instance of your app. Just list them and pick the corresponding ID, then point to the app specifying it with the `--instance` flag:

```
-> % epinio app show samplejava

🚢 Show application details
Namespace: workspace
Application: samplejava

✔️  Details:
|        KEY        |                    VALUE                    |
|-------------------|---------------------------------------------|
| Origin            | /home/user/sample                           |
| Status            | 1/1                                         |
| Username          | admin                                       |
| StageId           | cac0d6fec92e0a1f                            |
| Age               | 2m50s                                       |
| Active Routes     |                                             |
|                   | samplejava.172.19.0.4.omg.howdoi.website    |
| Desired Instances |                                           1 |
| Bound Services    |                                             |
| Environment       |                                             |

✔️  Instances: 
|            NAME             | READY |  MEMORY   | MILLICPUS | RESTARTS |  AGE  |
|-----------------------------|-------|-----------|-----------|----------|-------|
| samplejava-5f84c47f76-7mvv7 | true  | 214.0 MiB |         2 |        0 | 2m50s |
```



```
epinio app port-forward samplejava 34506:8080 --instance samplejava-5f84c47f76-7mvv7
```