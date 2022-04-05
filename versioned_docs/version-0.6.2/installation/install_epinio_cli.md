---
sidebar_label: "Install Epinio CLI"
---

#  Installation of the Epinio CLI

The `epinio` cli can be used to interact with a cluster that has Epinio installed on it.
Application developers shouldn't need to access the cluster directly. Requests to
the Epinio API server are authenticated with Basic Auth. No direct access to the cluster
is required (e.g. through kubectl).

## Download the Binary

Find the latest version at [Releases](https://github.com/epinio/epinio/releases).
Run one of the commands below, and replace \<epinio-version\> with the version of your choice, e.g. "v0.6.0".

### Linux

```bash
curl -o epinio -L https://github.com/epinio/epinio/releases/download/<epinio-version>/epinio-linux-x86_64
```

### MacOS

```bash
curl -o epinio -L https://github.com/epinio/epinio/releases/download/<epinio-version>/epinio-darwin-x86_64
```

### Windows

```bash
 curl -LO https://github.com/epinio/epinio/releases/download/<epinio-version>/epinio-windows-x86_64.zip
```

Extract the zip archive and put the binary in a directory that is in your `PATH` environment variable. Instructions on how to add directories to the `PATH` vary depending on your version of Windows.

## Make the Binary Executable (Linux and Mac)

```bash
chmod +x epinio
```

Move the binary to your PATH

```bash
sudo mv ./epinio /usr/local/bin/epinio
```

## Verify the Installation

Run e.g. `epinio version` to test the successful installation.

```bash
> epinio version
Epinio Version: v0.6.0
Go Version: go1.17
```
