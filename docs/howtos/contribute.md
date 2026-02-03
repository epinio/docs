---
sidebar_label: "Contributing to Epinio"
sidebar_position: 1
title: "Contributing to Epinio"
description: How to go about contributing to Epinio. What you need to know.
keywords: [epinio, contributing]
doc-type: [how-to]
doc-topic: [contribute-to-epinio]
---

Epinio welcomes your participation in the project.
Epinio accepts contributions via GitHub issues and pull requests.
This document outlines what you need to make a successful contribution to the project.

## Start with an issue

Before creating a pull request, [check the issues](https://github.com/epinio/epinio/issues).
Is the topic already live, are there any linked pull requests?
This is especially true if the change request is something large.
You can discuss the bug, feature request, or other type of issue with the team and others.
Lastly, [create an issue](https://github.com/epinio/epinio/issues/new), and perhaps a pull request, if needed.
This helps define common goals and reduces duplication of effort.

## Sign your commits

A sign-off is a line at the end of the explanation for a commit.
You must sign all your commits.
Your signature certifies that you wrote the patch or otherwise have the right to contribute the material.
When signing-off you agree to the following rules
(from [developercertificate.org](https://developercertificate.org/)):

```plain
Developer Certificate of Origin
Version 1.1

Copyright (C) 2004, 2006 The Linux Foundation and its contributors.
1 Letterman Drive
Suite D4700
San Francisco, CA, 94129

Everyone is permitted to copy and distribute verbatim copies of this
license document, but changing it is not allowed.

Developer's Certificate of Origin 1.1

By making a contribution to this project, I certify that:

(a) The contribution was created in whole or in part by me and I
    have the right to submit it under the open source license
    indicated in the file; or

(b) The contribution is based upon previous work that, to the best
    of my knowledge, is covered under an appropriate open source
    license and I have the right under that license to submit that
    work with modifications, whether created in whole or in part
    by me, under the same open source license (unless I am
    permitted to submit under a different license), as indicated
    in the file; or

(c) The contribution was provided directly to me by some other
    person who certified (a), (b) or (c) and I have not modified
    it.

(d) I understand and agree that this project and the contribution
    are public and that a record of the contribution (including all
    personal information I submit with it, including my sign-off) is
    maintained indefinitely and may be redistributed consistent with
    this project or the open source license(s) involved.
```

Then you add a line to every git commit message:

```console
Signed-off-by: Joe Smith <joe.smith@example.com>
```

You should use your real name (no pseudonyms or anonymous contributions please).

If you set your `user.name` and `user.email` in your local git configuration,
you can sign your commit automatically with `git commit -s`.

:::note

If your `git config` information is correctly set then viewing the `git log`
information for your commit looks something like this:

```console
Author: John Smith <john.smith@example.com>
Date:   Thu Feb 2 11:41:15 2023 -0800
    Update README
    Signed-off-by: John Smith <john.smith@example.com>
```

The `Author` and `Signed-off-by` lines match.
If not, the Developer Certificate of Origin (DCO) check rejects the pull request.

:::

## Pull requests

Pull requests for a code change should reference the issue they're for.
This enables issues to serve as a central point of reference for a change.
For example, if a pull request fixes or completes an issue, the commit or
pull request should include something like:

```markdown
Closes #123
```

This indicates that the PR closes issue #123 when merged.

## Semantic versioning

Epinio follows [semantic versioning](https://semver.org/).

This doesn't cover other tools included in Epinio.
Kubernetes has its own [release versioning](https://github.com/kubernetes/community/blob/master/contributors/design-proposals/release/versioning.md#kubernetes-release-versioning)
scheme that's similar to SemVer but semantically different.

## Version parity validation

Epinio includes automated validation so that the binary release version matches the Helm chart version. This prevents users from installing a Helm chart that points at CLI binaries that don't exist (see [GitHub issue #2774](https://github.com/epinio/epinio/issues/2774)).

- **Before creating a release**: Run `make validate-version-parity-strict` in the [epinio repository](https://github.com/epinio/epinio).
- **When updating versions**: If you change `internal/version/version.go` or the helm-charts submodule, CI runs validation; fix any mismatches before merging.
- **Local checks**: Use `make validate-version-parity` (informational) or `make validate-version-parity-strict` (fails on mismatch).

For details, see [Version parity validation](./version_parity_validation.md).

## Coding style

Epinio expects Go code formatted with `go fmt`.

Epinio further follows the style guidelines at:

- [Effective Go](https://go.dev/doc/effective_go) and
- [Go Wiki Code Review Comments](https://github.com/golang/go/wiki/CodeReviewComments)
- [Go Style At Google](https://google.github.io/styleguide/go/guide)
