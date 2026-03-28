---
sidebar_label: "Supported Applications"
title: ""
---

# Epinio supported applications

This section describes what kind of application you can expect to work with Epinio.
To understand what enables an application to work with Epinio, you need to know how staging works.


## How it works

Epinio relies on [Cloud Native Buildpacks](https://buildpacks.io/) to create a container image for your
application. It does that by creating Kubernetes Jobs.

Staging starts with you (the developer) running `epinio push --name myapp` from the root of your application source code.
You can see a simplified diagram of the process in the image below:

![epinio-push-simplified](epinio-push-simple.svg?raw=true "Epinio push")

After pushing your code, Epinio creates a staging job that uses a buildpack builder image to build a runtime image.
By default Epinio uses the [Paketo full builder](https://paketo.io/); you can also use [non-Paketo or custom buildpack builders](customization/staging.md#using-non-paketo-buildpacks).
If you are not familiar with how buildpacks work, see the official docs: https://buildpacks.io/docs/

## Supported buildpacks

Epinio uses a **default** [Paketo full builder image](https://github.com/paketo-buildpacks/builder-jammy-full) (jammy stack), so you can use any of the buildpacks
documented here: https://paketo.io/docs/concepts/builders/#full

You can override the builder image per push (e.g. `--builder-image`) or set a different default at install time.
That allows using custom builders or other buildpack ecosystems; see [Buildpacks customization](customization/staging.md).

The various buildpacks provide various configuration options. You can read on how to generally configure a buildpack here: https://paketo.io/docs/buildpacks/configuration/
Each buildpack may support more configuration options, so you may have to read the documentation of the buildpacks you are interested in.

E.g.
- [Instructions on how to add custom php.ini files for php-web buildpack](https://github.com/paketo-buildpacks/php-web#configuring-custom-ini-files)
- [Go Buildpack](https://github.com/paketo-buildpacks/go)

Note: if your application needs to explicit a particular command to start, you should probably provide a [Procfile](https://devcenter.heroku.com/articles/procfile) in order to use the [Procfile Buildpack](https://github.com/paketo-buildpacks/procfile).


## Detailed push process

The above image is a simplified explanation of the `epinio push` process. If you don't want to know all the details on how that works, the above diagram should
be all the information you need. If you are curious about the details, then read here: [Detailed push docs](../explanations/detailed-push-process.md)
