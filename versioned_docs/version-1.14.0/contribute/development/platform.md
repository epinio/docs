---
sidebar_label: 'Platform'
sidebar_position: 3
title: 'Epinio Platform Development Guidelines'
description: How to set up the Epinio platform for local development.
keywords: [epinio, contributing]
doc-type: [contribute]
doc-topic: [ui-contribution-extension]
doc-persona: [epinio-developer]
---

## Run the current development build

Every time a change is made in the Epinio source code, the binary running inside
the epinio-server Pod has to be replaced with a freshly compiled one. This can
be achieved by running the following command:

```bash
make && make patch-epinio-deployment
```

This first compiles a new binary locally and then replaces the one running inside the Pod with it.

If the cluster is not running on linux-amd64 it will be necessary to set
`EPINIO_BINARY_PATH` to the correct binary to place into the epinio server
([See here](https://github.com/epinio/epinio/blob/a4b679af88d58177cecf4a5717c8c96f382058ed/scripts/patch-epinio-deployment.sh#L19)).

If the client operation is performed outside of a git checkout it will be
necessary to set `EPINIO_BINARY_TAG` to the correct tag
([See here](https://github.com/epinio/epinio/blob/a4b679af88d58177cecf4a5717c8c96f382058ed/scripts/patch-epinio-deployment.sh#L20)).

The make target `tag` can be used in the checkout the binary came from to
determine this value.

Also, the default `make build` target builds a dynamically linked
binary. This can cause issues if for example the glibc library in the
base image doesn't match the one on the build system. To get past that
issue it is necessary to build a statically linked binary with a
command like:

```bash
GOARCH="amd64" GOOS="linux" CGO_ENABLED=0 go build -o dist/epinio-linux-amd64
```
