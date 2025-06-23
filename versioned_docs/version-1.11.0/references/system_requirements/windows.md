---
sidebar_label: Windows
title: Windows installation requirements for Epinio
description: Windows installation requirements for the Epinio Kubernetes development environment.
keywords: [epinio, kubernetes, ]
doc-type: [one of how-to, explanation, tutorial, reference]
doc-topic: [root-branch]
doc-persona: [default]
---

## Epinio on Windows

Epinio uses command line tools which are available on any kind of Unix platform,
but not normally on Windows.

You need:

- `sh`
- `sed`
- `git`

and also:

- `kubectl`
- `helm`

The project recommends installing the [Git For Windows](https://gitforwindows.org/) distribution as it
provides the first three and much more.

For `helm`, `kubectl`, and `epinio` itself you can get them from the release pages:

- [Epinio releases](https://github.com/epinio/epinio/releases)
- [Helm releases](https://github.com/helm/helm/releases)
- [kubectl instructions](https://kubernetes.io/docs/tasks/tools/install-kubectl-windows/)
