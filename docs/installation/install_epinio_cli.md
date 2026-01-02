---
sidebar_label: "Install the Epinio CLI"
sidebar_position: 2
title: "Install the Epinio CLI"
description: How to install the Epinio CLI on Windows, Linux and Mac
keywords: [epinio, install, cli, windows, mac, linux, homebrew]
---

The `epinio` CLI can be used to interact with a cluster with Epinio installed.
Requests to the Epinio API server are authenticated with Basic Auth.
No direct access to the cluster is required (e.g. through kubectl).

## Install from Homebrew (Linux and Mac)

Epinio has a formula available in the homebrew/core tap.

```bash
brew install epinio
```

Alternatively, if you want to get the latest Epinio CLI faster, there is a custom tap you can use:

```bash
brew tap epinio/tap
brew install epinio/tap/epinio
```

## Install from the Binary Releases

Find the latest version at [Releases](https://github.com/epinio/epinio/releases).

### Linux

```bash
curl -o epinio -L https://github.com/epinio/epinio/releases/download/v1.11.0/epinio-linux-x86_64
```

### MacOS

```bash
curl -o epinio -L https://github.com/epinio/epinio/releases/download/v1.11.0/epinio-darwin-x86_64
```

### Windows

```bash
 curl -LO https://github.com/epinio/epinio/releases/download/v1.11.0/epinio-windows-x86_64.zip
```

Extract the zip archive then make sure that the `PATH` environment variable references the directory where the `epinio` binary is located.

### Make the Binary Executable (Linux and Mac)

```bash
chmod +x epinio
```

Make sure your `PATH` environment variable contains the directory where you placed the Epinio binary.

## Verify Downloaded Files

This is done using the `cosign` tool.
The following commands were tested using cosign version 2.1.1.

### Verify File Checksum Signature

Instead of signing all release assets, Epinio signs a file containing checksums for the release assets.
From the repository you can download the three files:

- `epinio_1.13.6_checksums.txt.pem`,
- `epinio_1.13.6_checksums.txt.sig`,
- `epinio_1.13.6_checksums.txt`


```
curl -LO https://github.com/epinio/epinio/releases/download/v1.13.6/epinio_1.13.6_checksums.txt.pem
curl -LO https://github.com/epinio/epinio/releases/download/v1.13.6/epinio_1.13.6_checksums.txt.sig
curl -LO https://github.com/epinio/epinio/releases/download/v1.13.6/epinio_1.13.6_checksums.txt
```

Once you have the three files locally, you can execute the following command

```
cosign verify-blob \
	--certificate-identity-regexp "https://github.com/epinio/epinio" \
	--certificate-oidc-issuer "https://token.actions.githubusercontent.com" \
	--cert      epinio_1.13.6_checksums.txt.pem \
	--signature epinio_1.13.6_checksums.txt.sig \
	epinio_1.13.6_checksums.txt
```

A successful output looks like

```
Verified OK
```

Now you can verify the asset's checksum integrity.

### Verify File Checksum Integrity

Before verifying the file integrity, you should first verify the checksum file signature.
Once you’ve downloaded both the checksums and your binary, you can verify integrity by running:

```
sha256sum --ignore-missing -c epinio_1.13.6_checksums.txt
```

:::note

For this check to work the local `epinio` binary must have the same name as
listed in the checksum file, i.e. `epinio-linux-x86_64`, `epinio-darwin-x86_64`, etc.

For Windows the checksum is for the zip archive, not for the binary inside.

:::

# Verify the Installation

Run `epinio version` to test the successful installation.

```bash
> epinio version
Epinio Version: v1.13.5
Go Version: go1.20
```

