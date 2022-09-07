---
sidebar_label: "Install Epinio CLI"
sidebar_position: 2
title: ""
---

# Installation of the Epinio CLI

The `epinio` cli can be used to interact with a cluster that has Epinio installed on it.
Application developers shouldn't need to access the cluster directly. Requests to
the Epinio API server are authenticated with Basic Auth. No direct access to the cluster
is required (e.g. through kubectl).

## From Homebrew (Linux and Mac)

Epinio has its own formula available in the homebrew/core tap.

```bash
brew install epinio
```

Alternatively, if you want to get the latest Epinio CLI faster, there is a custom tap you can use:
```bash
brew tap epinio/tap
brew install epinio/tap/epinio
```

## From the Binary Releases

Find the latest version at [Releases](https://github.com/epinio/epinio/releases).

### Linux

```bash
curl -o epinio -L https://github.com/epinio/epinio/releases/download/v1.2.0/epinio-linux-x86_64
```

### MacOS

```bash
curl -o epinio -L https://github.com/epinio/epinio/releases/download/v1.2.0/epinio-darwin-x86_64
```

### Windows

```bash
 curl -LO https://github.com/epinio/epinio/releases/download/v1.2.0/epinio-windows-x86_64.zip
```

Extract the zip archive and put the binary in a directory that is in your `PATH` environment variable. Instructions on how to add directories to the `PATH` vary depending on your version of Windows.

### Make the Binary Executable (Linux and Mac)

```bash
chmod +x epinio
```

Move the binary to your PATH

```bash
sudo mv ./epinio /usr/local/bin/epinio
```

# Verify the Installation

Run e.g. `epinio version` to test the successful installation.

```bash
> epinio version
Epinio Version: v1.2.0
Go Version: go1.18
```