---
sidebar_label: "Quick Start"
sidebar_position: 1
title: ""
---

# QuickStart 

If you have not already installed `epinio` follow these links

- [Installation Section](../installation/install_epinio.md)

In this tutorial, you will learn how to create a namespace and how to push, list and delete an application in it.

## Push an application

### Clone the sample app

If you just want an application that works use the one inside the
[sample-app directory](https://github.com/epinio/epinio/tree/main/assets/sample-app).

You can copy it to your system with
the following commands:

```bash
git clone https://github.com/epinio/epinio.git
cd epinio/assets/
```

### Login

The first task to perform after Epinio installation, is to [login](../references/commands/cli/epinio_login.md) with the `epinio` binary:

```shell
epinio login -u admin 'https://epinio.127.0.0.1.sslip.io'

# Trust the certificate by pressing 'y' and 'enter'
```

:::tip

If your local Kubernetes cluster restarts, Epinio stays installed and the certificates are still valid, so you don't have to login again.

:::

You can confirm that you're logged in by checking the Epinio settings:

```shell
epinio settings show
```

### Push an app

There are two ways to push an application:

1. You can provide an [Application Manifest](../references/manifests.md) which contains the required configuration for the applications.

```bash
epinio push manifest.yaml
```

2. You can provide the configuration as parameters in which case the parameter `--name` is mandatory.
Because of the default route the name has to be unique across all namespaces.

```bash
epinio push --name sample --path sample-app
```

***

###### Note that the `--path` parameter is optional. If not specified the current working directory will be used. Always ensure that the chosen directory contains a supported application.

***

If you want to know what applications are supported in Epinio, please read the
[notes about supported applications](../references/supported_applications.md).

We also provide information about the more advanced [git model](../explanations/advanced.md#git-pushing).

***

###### Note: If you want to know the details of the `epinio push` process, please read the [detailed push docs](../explanations/detailed-push-process.md)

***

#### Check that your application is working

After the application has been pushed, a unique URL is printed which you can use to access your application. If you don't have this URL available anymore you can find it again by running:

```bash
epinio app show sample
```

("Routes" is the part your are looking for)

Go ahead and open the application route in your browser!

### List all commands

To see all the applications you have deployed use the following command:

```bash
epinio apps list
```

### Delete an application

To delete the application you just deployed run the following command:

```bash
epinio delete sample
```

### Create a separate namespace

If you want to keep your various application separated, you can use the concept of namespaces. Create a new namespace with this command:

```bash
epinio namespace create newspace
```

To start deploying application to this new namespace you have to "target" it:


```bash
epinio target newspace
```

After this and until you target another namespace, whenever you run `epinio push` you will be deploying to this new namespace.