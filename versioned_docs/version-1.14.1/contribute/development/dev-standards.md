---
sidebar_label: Dev Standards
sidebar_position: 1
title: Development Standards
description: Standards for contributing code to Epinio — pull requests, versioning, and coding style.
keywords: [epinio, contributing, pull requests, semantic versioning, coding style]
doc-type: [contribute]
doc-topic: [contribution-standards]
doc-persona: [epinio-developer]
---

These standards apply to code contributions across the Epinio repositories.

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

## Coding style

Epinio expects Go code formatted with `go fmt`.

Epinio further follows the style guidelines at:

- [Effective Go](https://go.dev/doc/effective_go) and
- [Go Wiki Code Review Comments](https://github.com/golang/go/wiki/CodeReviewComments)
- [Go Style At Google](https://google.github.io/styleguide/go/guide)
