---
sidebar_label: "Version parity validation"
sidebar_position: 28
title: "Version parity validation"
description: How Epinio ensures the binary release version matches the Helm chart version.
keywords: [epinio, version, helm, release, validation]
doc-type: [how-to]
doc-topic: [epinio, operations, release]
---

Version parity validation ensures that the Epinio binary release version matches the Helm chart version. This prevents issues where users might try to install a Helm chart that references CLI binaries that don't exist.

## Background

[GitHub issue #2774](https://github.com/epinio/epinio/issues/2774) identified a problem where the Helm chart version (v1.11.1) did not correspond with the available Epinio release binaries. Users attempting to download the CLI for that version would encounter 404 errors because the binaries were never released.

Epinio now includes automated validation to prevent this from happening again.

## How it works

The validation system includes:

1. **Validation script** (`scripts/validate-version-parity.sh` in the [epinio repository](https://github.com/epinio/epinio)): A script that compares the Epinio version with the Helm chart version.
2. **GitHub Actions workflow**: Automated validation on pull requests and scheduled checks.
3. **Release gate**: A validation step in the release workflow that blocks releases when versions do not match.
4. **Makefile targets**: Local validation commands for contributors.

## Usage (for contributors)

Validation runs automatically in the Epinio repository, but you can run it locally when working on version-related changes.

### Local validation

From the [epinio](https://github.com/epinio/epinio) repository:

Check version parity (informational):

```bash
make validate-version-parity
```

Strict validation (fails on mismatch):

```bash
make validate-version-parity-strict
```

Direct script usage:

```bash
# Check mode (default)
./scripts/validate-version-parity.sh check

# Warning mode (warns but doesn't fail)
./scripts/validate-version-parity.sh warn

# Strict mode (fails on mismatch)
./scripts/validate-version-parity.sh strict

# With custom Chart.yaml path
./scripts/validate-version-parity.sh check helm-charts/chart/epinio/Chart.yaml

# Override version
EPINIO_VERSION=v1.13.0 ./scripts/validate-version-parity.sh check
```

### When validation runs

Validation runs automatically:

- **On pull requests**: When version-related files (such as `internal/version/version.go`) are modified.
- **On the main branch**: When version files are updated.
- **Weekly**: Every Monday to catch version drift.
- **On release**: Before creating a new release (strict mode; release is blocked if versions do not match).
- **Manual trigger**: Via the GitHub Actions UI.

### Validation modes

| Mode    | Behavior                                      | Use case                          |
|---------|-----------------------------------------------|-----------------------------------|
| `check` | Reports mismatch but does not fail           | Default, informational            |
| `warn`  | Shows warnings and proceeds                   | Local testing, manual checks      |
| `strict`| Fails on version mismatch                     | PRs, release workflow, pre-release|

## Release process

During a release, validation runs in **strict mode**:

- If versions match, the release proceeds.
- If versions do not match, the release is **blocked** (preventing issues like #2774).
- Error messages explain how to fix the mismatch.

On pull requests, validation also runs in **strict mode** when version-related files change:

- Compares `internal/version/version.go` with the Helm chart version.
- Fails the PR check if versions do not match.
- Posts a comment on the PR with fix instructions.

## Troubleshooting

### Version mismatch

If validation reports a version mismatch:

1. **Check the Epinio version** (in the epinio repo):
   ```bash
   git describe --tags --abbrev=0
   ```

2. **Check the Helm chart version**:
   ```bash
   cat helm-charts/chart/epinio/Chart.yaml | grep 'appVersion'
   ```

3. **Update the helm-charts submodule** (in the epinio repo):
   ```bash
   git submodule update --init --recursive helm-charts
   cd helm-charts
   git checkout main
   git pull origin main
   cd ..
   git add helm-charts
   git commit -m "Update helm-charts submodule"
   ```

4. **Coordinate with the helm-charts repository**: Ensure the [helm-charts](https://github.com/epinio/helm-charts) repository has the correct version before releasing.

### Helm-charts submodule not initialized

The validation script can run without the submodule:

- It will try to initialize the submodule.
- If that fails, it fetches `Chart.yaml` from the remote repository.
- This allows validation to run in CI where the submodule may not be present.

### Unknown versions

- In `check` or `warn` mode: Validation is skipped with a warning.
- In `strict` mode: Validation fails so that releases are not created with unknown versions.

## Best practices

1. **Before creating a release tag** (in the epinio repo):
   ```bash
   make validate-version-parity-strict
   ```

2. **After updating the helm-charts submodule**:
   ```bash
   make validate-version-parity
   ```

3. **When modifying version-related files**: Expect CI to run validation in strict mode; fix any mismatches before merging.

## Version sources

**Epinio version** (priority order):

1. `EPINIO_VERSION` environment variable (explicit override).
2. `internal/version/version.go` → `ChartVersion` (for PR validation).
3. `GITHUB_REF_NAME` in GitHub Actions (for release tags).
4. `git describe --tags` (fallback).

**Helm chart version**:

- From `helm-charts/chart/epinio/Chart.yaml` (local), or from GitHub raw content (remote fallback).
- Uses the `appVersion` field, which must match the Epinio release version.

## Related

- [GitHub issue #2774](https://github.com/epinio/epinio/issues/2774) – Original issue that motivated this validation.
- [Contributing to Epinio](./contribute.md) – Includes a short version parity section and when to run validation.
