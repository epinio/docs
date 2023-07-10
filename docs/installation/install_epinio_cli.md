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
curl -o epinio -L https://github.com/epinio/epinio/releases/download/v1.8.1/epinio-linux-x86_64
```

### MacOS

```bash
curl -o epinio -L https://github.com/epinio/epinio/releases/download/v1.8.1/epinio-darwin-x86_64
```

### Windows

```bash
 curl -LO https://github.com/epinio/epinio/releases/download/v1.8.1/epinio-windows-x86_64.zip
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

## Verify Downloaded Files

### Verify File Checksum Signature

Instead of signing all release assets, Epinio signs a checksums file containing the different
release assets checksums. You can download/copy the three files 'epinio_1.8.1_checksums.txt.pem',
'epinio_1.8.1_checksums.txt.sig', 'epinio_1.8.1_checksums.txt' from the latest release.

```
curl -LO https://github.com/epinio/epinio/releases/download/v1.8.1/epinio_1.8.1_checksums.txt.pem
...
```

Once you have the three files locally, you can execute the following command

```
COSIGN_EXPERIMENTAL=1 cosign verify-blob \
		      --cert      epinio_1.8.1_checksums.txt.pem \
		      --signature epinio_1.8.1_checksums.txt.sig \
		      epinio_1.8.1_checksums.txt
```

A successful output looks like

```
tlog entry verified with uuid: 73f57e4c16b830ccb615e00814a3481a33365bf48f9bba1c1588886b3344d0ec index: 9085154
Verified OK
```

Now you can verify the assets checksum integrity.

### Verify File Checksum Integrity

Before verifying the file integrity, you should first verify the checksum file signature. Once
you’ve download both the checksums and your binary, you can verify the integrity of your file by
running:

```
sha256sum --ignore-missing -c epinio_1.8.1_checksums.txt
```

:::note

For this check to be effective it is necessary that the local `epinio` binary has the proper name as
listed in the checksum file, i.e. `epinio-linux-x86_64`, `epinio-darwin-x86_64`, etc.

For windows the checksum is for the zip archive, not for the binary inside.

:::

# Verify the Installation

Run e.g. `epinio version` to test the successful installation.

```bash
> epinio version
Epinio Version: v1.8.1
Go Version: go1.20
```

