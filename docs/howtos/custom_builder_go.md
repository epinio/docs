---
sidebar_label: "Deploy Gitea with a custom builder image"
sidebar_position: 14
title: ""
---

# Deploy Gitea with a custom builder image

This How To will show you how to deploy Gitea with Epinio and a custom builder.

[Gitea](https://github.com/go-gitea/gitea) is a self-hosted Git service. It's written in Go and Node.js.

At the time of writing the Paketo Go buildpack doesn't support Node.js asset compilation (see [issue #671](https://github.com/paketo-buildpacks/go/issues/671)), so we need to create a custom builder.

This builder will just check the needed Go and Node dependencies, and execute the `make` command to build both the frontend and the backend.

The code used during this guide is available in the [example-builder-gitea](https://github.com/epinio/example-builder-gitea) repository.


## Basic Concepts and prerequisites

Before starting it's useful to know some basic concepts around Buildpacks, and have some tools already installed.

You can find in the Buildpack documentation what [stacks](https://buildpacks.io/docs/concepts/components/stack/), [builders](https://buildpacks.io/docs/concepts/components/builder/), and [buildpacks](https://buildpacks.io/docs/concepts/components/buildpack/) are. You should also have [`pack`](https://buildpacks.io/docs/tools/pack/) installed, along with `docker` and `skopeo` (to manage OCI artifacts).


## Create the stack

Unfortunately we were not able to reuse the [Paketo Full Stack](https://github.com/paketo-buildpacks/bionic-full-stack) because of a missing dependency in the `run` image. To make it simpler we just [forked](https://github.com/epinio/bionic-full-stack) this stack and added `git` to the run packages (see [408e949](https://github.com/epinio/bionic-full-stack/commit/408e949558a437c99858ac7bb99a8b78e78935e8)).

> Note:  
> We had to fork and/or reuse the same stack ID in order to reuse some Paketo buildpacks, that are going to work only with these stacks (see https://github.com/paketo-buildpacks/node-engine/blob/main/buildpack.toml#L29).

### Build the stack and publish the image

To build the stack:

```
./stacks/bionic-full-stack/scripts/create.sh
```

This will create two OCI images in the `stacks/bionic-full-stack/build` folder:

- build.oci
- run.oci


From this folder we can untar the OCI artifacts

```
cd stacks/bionic-full-stack/build
mkdir build && tar -xf build.oci -C build
mkdir run   && tar -xf run.oci   -C run
```

use `skopeo` to copy the artifacts into our local Docker registry

```
skopeo -v copy oci:build docker-daemon:ghcr.io/enrichman/bionic-full-stack-build:0.1.0
skopeo -v copy oci:run   docker-daemon:ghcr.io/enrichman/bionic-full-stack-run:0.1.0
```

and push them to a public registry

```
docker push ghcr.io/enrichman/bionic-full-stack-build:0.1.0
docker push ghcr.io/enrichman/bionic-full-stack-run:0.1.0
```

## Create the `make` buildpack

To build the Gitea application we created a `make` buildpack.

### `bin/detect`

During the `detect` phase the `bin/detect` script it will check the needed dependencies. 

It will check for the existance of the Makefile

```bash
if [[ ! -f Makefile ]]; then
    echo Makefile not found
    exit 100
fi
```

and it will write to the plan.toml file that this buildpack requires Go and Node.js

```bash
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

During the `build` phase the buildpack will run the proper `make` command to build the application

```bash
TAGS="bindata" make build
```

setup the app configuration changing the listening port in the `app.ini` file


```bash
cp custom/conf/app.example.ini custom/conf/app.ini
sed -i "s/;HTTP_PORT = 3000/HTTP_PORT = 8080/" custom/conf/app.ini
```

and defining the launch process in the `launch.toml` file

```bash
cat >> "${layers_dir}/launch.toml" <<EOL
[[processes]]
type = "web"
command = "./gitea"
default = true
EOL
```

## Create and publish the builder

The `builder.toml` file contains the buildpacks references and their execution order/groups.

We are referencing our `make` buildpack locally

```toml
[[buildpacks]]
id = "make"
version = "0.0.1"
uri = "../../buildpacks/make"
```

and we are also using the Paketo `node-engine` and `go-dist` buildpacks

```toml
[[buildpacks]]
uri = "docker://gcr.io/paketo-buildpacks/node-engine:1.3.0"
version = "1.3.0"

[[buildpacks]]
uri = "docker://gcr.io/paketo-buildpacks/go-dist:2.3.0"
version = "2.3.0"
```

These buildpacks will provide the Node.js and Go dependencies

- https://github.com/paketo-buildpacks/node-engine
- https://github.com/paketo-buildpacks/go-dist


We can finally create the builder image with `pack`

```
pack builder create ghcr.io/enrichman/gitea-builder:0.1.0 --config builders/gitea-builder/builder.toml
```

and push it to a public registry

```
docker push ghcr.io/enrichman/gitea-builder:0.1.0
```
