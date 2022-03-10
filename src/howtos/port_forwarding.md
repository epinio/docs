## How to use Port Forwarding

This how-to demonstrates how to use port forwarding to access or debug a running application.

To prepare the application for debugging the flag [`BPL_DEBUG_ENABLED`](https://paketo.io/docs/howto/java/#enable-remote-debugging) has to be set to `true`.  
With the epinio cli this is done by setting the environment variable for the application:

```
epinio app env set samplejava BPL_DEBUG_ENABLED true
```

After the application has restarted (to integrate the change of the environment) port forwarding can be started with the `port-forward` command:

```
epinio app port-forward samplejava 34505:8000 34506:8080
```

This will forward the traffic coming from `localhost:34505` to the remote `:8000` and the `localhost:34506` to the remote `:8080`.
__Note__ that specification of the local port is optional. When none is provided a random port will be selected.

### Point to a specific instance

Port forwarding can be directed to a specific instance of your app. To do this list all the instances of the application, pick the desired ID, and then use the `--instance` flag to direct the port forwarding to that instance:

```
-> % epinio app show samplejava

🚢 Show application details
Namespace: workspace
Application: samplejava

✔️  Details:
|        KEY           |                    VALUE                    |
|----------------------|---------------------------------------------|
| Origin               | /home/user/sample                           |
| Status               | 1/1                                         |
| Username             | admin                                       |
| StageId              | cac0d6fec92e0a1f                            |
| Age                  | 2m50s                                       |
| Active Routes        |                                             |
|                      | samplejava.172.19.0.4.omg.howdoi.website    |
| Desired Instances    |                                           1 |
| Bound Configurations |                                             |
| Environment          |                                             |

✔️  Instances: 
|            NAME             | READY |  MEMORY   | MILLICPUS | RESTARTS |  AGE  |
|-----------------------------|-------|-----------|-----------|----------|-------|
| samplejava-5f84c47f76-7mvv7 | true  | 214.0 MiB |         2 |        0 | 2m50s |
```



```
epinio app port-forward samplejava 34506:8080 --instance samplejava-5f84c47f76-7mvv7
```
