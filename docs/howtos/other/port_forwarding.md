---
sidebar_label: Port forwarding
sidebar_position: 11
title: Setting up and using port forwarding
description: How to set up and use port forwarding
keywords: [epinio, kubernetes, port forwarding]
doc-type: [how-to]
doc-topic: [epinio, how-to, port-forwarding]
doc-persona: [epinio-developer, epinio-operator]
---

This How-to shows how to use port forwarding to access a running application.

You start port forwarding with the `port-forward` command:

```console
epinio app port-forward samplejava 34506:8080
```

This forwards the traffic coming from `localhost:34506` to the remote `:8080`.
Specification of the local port is optional.
When none is provided a random port is selected.

## Point to a specific instance

You can direct port forwarding to a specific instance of your application.

To do this:

- list all the instances of the application
- pick the desired ID
- use the `--instance` flag to direct the port forwarding to that instance

```console
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



```console
epinio app port-forward samplejava 34506:8080 --instance samplejava-5f84c47f76-7mvv7
```
