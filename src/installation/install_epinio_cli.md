#  Installation of the Epinio CLI

## Before you begin

If not done already, refer to [System Requirements](./system_requirements.md).

## Install Dependencies

- `kubectl`: Follow instructions here: https://kubernetes.io/docs/tasks/tools/#kubectl
- `helm`: Follow instructions here: https://helm.sh/docs/intro/install/

## Install Epinio CLI

### Download the Binary

Find the latest version at [Releases](https://github.com/epinio/epinio/releases).
Run one of the commands below, and replace \<epinio-version\> with the version of your choice, e.g. "v0.1.0".

##### Linux

```bash
curl -o epinio -L https://github.com/epinio/epinio/releases/download/<epinio-version>/epinio-linux-x86_64
```

##### MacOS

```bash
curl -o epinio -L https://github.com/epinio/epinio/releases/download/<epinio-version>/epinio-darwin-x86_64
```

##### Windows

```bash
 curl -LO https://github.com/epinio/epinio/releases/download/<epinio-version>/epinio-windows-amd64.exe
```

### Make the Binary Executable

For example on Linux and Mac:

```bash
chmod +x epinio
```

Move the binary to your PATH

```bash
sudo mv ./epinio /usr/local/bin/epinio
```

### Verify the Installation

Run e.g. `epinio version` to test the successful installation.

```bash
> epinio version
Epinio Version: v0.1.0
Go Version: go1.17
```
