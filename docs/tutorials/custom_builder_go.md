---
sidebar_label: "Epinio Journey: Deploy complex applications with a custom builder image"
sidebar_position: 4
title: "Deploying a complex application"
description: A walk-through for a more complex application deployment with Epinio.
keywords: [Epinio, kubernetes, application development, application deployment, complex application]
---

<head>
  <link rel="canonical" href="https://docs.epinio.io/tutorials/custom_builder_go"/>
</head>

In this tutorial you use [Gitea](https://github.com/go-gitea/gitea)
to work through a more complex application with Epinio.

Gitea is a self-hosted Git service, written in Go and Node.js.

At the time of writing the Paketo Go buildpack doesn't support Node.js asset compilation,
(see [issue #671](https://github.com/paketo-buildpacks/go/issues/671)),
so you need to create a custom builder.

The builder checks the needed Go and Node dependencies,
and executes the `make` command to build both the front end and the back end.

The example code used during this tutorial is available in the
[example-builder-gitea](https://github.com/epinio/example-builder-gitea) repository.

```console
git clone https://github.com/epinio/example-builder-gitea
git submodule update --init --recursive
cd example-builder-gitea
```

## Basic concepts and prerequisites

Before starting, it's useful to understand the buildpacks concepts and have a few tools already installed.

The buildpack documentation describes:

- [stacks](https://buildpacks.io/docs/concepts/components/stack/)
- [builders](https://buildpacks.io/docs/concepts/components/builder/)
- [buildpacks](https://buildpacks.io/docs/concepts/components/buildpack/).

You should also have [`pack`](https://buildpacks.io/docs/tools/pack/) installed,
along with `docker` and `skopeo` (to manage Open Container Initiative (OCI) artifacts).

## Create the stack

It's impossible to reuse the [Paketo Full Stack](https://github.com/paketo-buildpacks/bionic-full-stack)
because of a missing dependency in the `run` image.
To make it easy there is a [forked](https://github.com/epinio/bionic-full-stack)
stack and added `git` to the run packages
(see [408e949](https://github.com/epinio/bionic-full-stack/commit/408e949558a437c99858ac7bb99a8b78e78935e8)).

:::note

We had to fork and reuse the same stack ID so that it's possible to reuse certain Paketo buildpacks.
They would work only with these stacks
(see [buildpack.toml#L29](https://github.com/paketo-buildpacks/node-engine/blob/main/buildpack.toml#L29)).

:::

### Build the stack and publish the image

To build the stack:

```console
./stacks/bionic-full-stack/scripts/create.sh
```

This creates two Open Container Initiative (OCI) images in the `stacks/bionic-full-stack/build` folder:

- build.oci
- run.oci

From this folder you can un-tar the OCI artifacts:

```console
cd stacks/bionic-full-stack/build
mkdir build && tar -xf build.oci -C build
mkdir run   && tar -xf run.oci   -C run
```

Use `skopeo` to copy the artifacts into the local Docker registry:

```console
skopeo -v copy oci:build docker-daemon:ghcr.io/<username>/bionic-full-stack-build:0.1.0
skopeo -v copy oci:run   docker-daemon:ghcr.io/<username>/bionic-full-stack-run:0.1.0
```

Push them to a public registry:

```console
docker push ghcr.io/<username>/bionic-full-stack-build:0.1.0
docker push ghcr.io/<username>/bionic-full-stack-run:0.1.0
```

## Creating the `make` buildpack

To build the Gitea application we created a `make` buildpack.

### `bin/detect`

During the `detect` phase of the `bin/detect` script it checks the needed dependencies.

It checks for the existence of the Makefile:

```bash
if [[ ! -f Makefile ]]; then
    echo Makefile not found
    exit 100
fi
```

It writes to the `plan.toml` file that this buildpack requires Go and Node.js:

```console
cat >> "${plan_path}" <<EOL
[[requires]]
name = "node"
# version = "*"

[requires.metadata]
build = true

[[requires]]
name = "go"

[requires.metadata]
build = true
EOL
```

### `bin/build`

During the `build` phase the buildpack runs `make` to build the application:

```console
TAGS="bindata" make build
```

Set up the app configuration changing the listening port in the `app.ini` file:

```console
cp custom/conf/app.example.ini custom/conf/app.ini
sed -i "s/;HTTP_PORT = 3000/HTTP_PORT = 8080/" custom/conf/app.ini
```

Define the launch process in the `launch.toml` file:

```console
cat >> "${layers_dir}/launch.toml" <<EOL
[[processes]]
type = "web"
command = "./gitea"
default = true
EOL
```

## Create and publish the builder

The `builder.toml` file has the buildpack references and their execution order/groups.

You reference the `make` buildpack locally:

```toml
[[buildpacks]]
id = "make"
version = "0.0.1"
uri = "../../buildpacks/make"
```

Also, you use the Paketo `node-engine` and `go-dist` Buildpacks:

```toml
[[buildpacks]]
uri = "docker://gcr.io/paketo-buildpacks/node-engine:1.3.0"
version = "1.3.0"

[[buildpacks]]
uri = "docker://gcr.io/paketo-buildpacks/go-dist:2.3.0"
version = "2.3.0"
```

These buildpacks contain the Node.js and Go dependencies:

- [node-engine buildpack](https://github.com/paketo-buildpacks/node-engine)
- [go-dist buildpack](https://github.com/paketo-buildpacks/go-dist)

Finally, create the builder image with `pack`:

```console
pack builder create ghcr.io/<username>/gitea-builder:0.1.0 --config builders/gitea-builder/builder.toml
```

Push it to a public registry:

```console
docker push ghcr.io/<username>/gitea-builder:0.1.0
```

## Deploy Gitea

To deploy Gitea you can download the code from the repository, or directly refer to it.

You need to deploy a stable release, so find the commit of the `v1.19.0` with a couple of curls:

```console
export GITEA_VERSION=v1.19.0
export GITEA_TAG_OBJECT_URL=$(curl -s https://api.github.com/repos/go-gitea/gitea/git/refs/tags/$GITEA_VERSION | jq -r '.object.url')
export GITEA_TAG_COMMIT_SHA=$(curl -s $GITEA_TAG_OBJECT_URL | jq -r '.object.sha')
```

You can now deploy Gitea with a simple `epinio push`:

```console
epinio push --name gitea \
    --git https://github.com/go-gitea/gitea,$GITEA_TAG_COMMIT_SHA \
    --builder-image ghcr.io/<username>/gitea-builder:0.1.0
```

It should be available on your cluster (that is, https://gitea.<SYSTEM_DOMAIN>).

### Create and bind the database

You can go a step further, creating and binding the `mysql` database to your application:

```console
epinio service create mysql-dev mydb
```

Check the status of the service:

```console
-> % epinio service show mydb

🚢  Showing Service...


✔️  Details:
|       KEY       |                                     VALUE                                      |
|-----------------|--------------------------------------------------------------------------------|
| Name            | mydb                                                                           |
| Created         | 2023-04-04 15:56:20 +0200 CEST                                                 |
| Catalog Service | mysql-dev                                                                      |
| Version         | 8.0.31                                                                         |
| Status          | deployed                                                                       |
| Used-By         |                                                                                |
| Internal Routes | xcca9aa0f19a036fb6389474a7be0-mysql-headless.workspace.svc.cluster.local:3306, |
|                 | xcca9aa0f19a036fb6389474a7be0-mysql.workspace.svc.cluster.local:3306           |
```

You can use the internal route `xcca9aa0f19a036fb6389474a7be0-mysql.workspace.svc.cluster.local:3306` to reach your DB.

Bind it to the Gitea application with `epinio service bind mydb gitea`.

Now you check the username and passwords in the configuration:

```console
-> % epinio configuration list

🚢  Listing configurations
Namespace: workspace


✔️  Epinio Configurations:
|                NAME                 |            CREATED             |  TYPE   | ORIGIN |          APPLICATIONS          |
|-------------------------------------|--------------------------------|---------|--------|--------------------------------|
| xcca9aa0f19a036fb6389474a7be0-mysql | 2023-04-04 15:56:22 +0200 CEST | service | mydb   | gitea (migrate to new access   |
|                                     |                                |         |        | paths)                         |
```

And:

```console
-> % epinio configuration show xcca9aa0f19a036fb6389474a7be0-mysql

🚢  Configuration Details
Name: xcca9aa0f19a036fb6389474a7be0-mysql
Namespace: workspace

🚢
Created: 2023-04-04 15:56:22 +0200 CEST
User:
Type: service
Origin: mydb
Used-By: gitea
Siblings:

⚠️  Attention: Migrate bound apps to new access paths
✔️
|      PARAMETER      |   VALUE    |               ACCESS PATH                |
|---------------------|------------|------------------------------------------|
| mysql-password      | 6oUDWVHVcv | /configurations/mydb/mysql-password      |
| mysql-root-password | eG83csnOLe | /configurations/mydb/mysql-root-password |

⚠️  Beware, the shown access paths are only available in the application's container
```

You can use these credential to access the database.
Access the first time Gitea configuration from your browser and fill the database fields with the host, username, and password.
The database name is `my_database`,
it's the default value for Bitnami charts that Epinio uses for its example services.
