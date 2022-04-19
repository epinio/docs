# Services

Most real world applications work together with other services to store data, logs, to exchange messages with other systems etc.
The most common example is probably a database. There are at least 2 ways to connect an Epinio application to a service.
The first one is to provision the service manually and [create an Epinio Configuration](configurations.md) to make the service connection details
available to the application.

The second one lets Epinio provision the service which you can later bind to your application with the `epinio service bind` command. This page explains how this works.

Services in Epinio are managed by the [epinio service](cli/epinio_service.md) commands.

## How does it work?

Epinio is very flexible on how a service is provisioned. Many public cloud providers maintain their own operators (e.g. [Azure](https://github.com/Azure/azure-service-operator)). There are also projects like [Crossplane](https://crossplane.io/) that allow you to provision services in various public cloud providers. All these solutions work by creating custom resources on a cluster which a running controller will pick up and create the desired service.
This shared method allows Epinio to stay agnostic of the provisioning method. The human operator only needs to create a Helm chart with the needed resources and [describe to Epinio how to install it](../howtos/create_custom_service.md).
The same method can be used with "in-cluster" services (e.g. a MySQL database running on the same cluster as Epinio). Actually, Epinio comes with such services available out of the box. They are based on off-the-shelf Helm charts from Bitnami and their names are suffixed with `-dev` because in the provided default configuration they might not be suitable for production usage.

## Provision a database

Here is an example on how to provision a database and make it available to some running application.

- Push a sample app:

  ```
  $ epinio app push -n sample --container-image-url splatform/sample-app
  ```

- [Optional] List catalog services:

  ```
  $ epinio service catalog
  ```

- Provision an in-cluster database:

  ```
  $ epinio service create mysql-dev mydb
  ```

- Wait until it's ready (status should be "deployed"):

  ```
  $ epinio service show mydb
  ```

- Bind the database secrets to the application:

  ```
  $ epinio service bind mydb sample
  ```

- Check that the database secrets are available to the application:

  ```
  $ epinio app exec sample

  🚢  Executing a shell
  Namespace: workspace
  Application: sample
  cnb@sample-7bc756989-tjvt9:/$ cat /configurations/workspace-mydb-mysql/
  ...
  cnb@sample-7bc756989-tjvt9:/$ exit
  ```

At this point, it's up to the application to make use of that secret. The helm chart that is used for this example, doesn't write the hostname of the database in the generated secret. That's because the Helm chart wasn't created specifically for Epinio. To figure out the hostname in this case, requires some knowledge on [how Kubernetes DNS works](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/).

In this case it is: `workspace-mydb-mysql.workspace.svc.cluster.local`.


When you are done with this example you can delete all generated resources:

```
$ epinio service delete mydb
$ epinio app delete sample
```
