# Environment Variables Merge and Replace Behavior

## Overview

This document describes the behavior of environment variable management in Epinio, specifically how environment variables are handled when added via CLI commands versus those defined in the application manifest.

## Problem Statement

**Issue**: When environment variables are added outside of the epinio manifest (via CLI commands), those new values wipe out the epinio-manifest variables.

Previously, when environment variables were added to an application using CLI commands (outside of the manifest), they would replace all existing environment variables, including those defined in the `epinio.yml` manifest file. This behavior was unintuitive and could lead to loss of important configuration.

**Example of the problem:**
```bash
# Application has FOO=bar in epinio.yml manifest
epinio app push myapp

# Adding a new env var via CLI would wipe out FOO=bar
epinio app update myapp --env BAR=baz
# Result: Only BAR=baz exists, FOO=bar is lost
```

This meant that any environment variables defined in the `epinio.yml` manifest file would be completely removed when adding new environment variables through CLI commands, which was not the expected behavior for most users.

## Solution

Epinio now supports two modes for environment variable updates:

1. **Merge mode (default)**: New environment variables are merged with existing ones, preserving variables from both the manifest and previous CLI updates.
2. **Replace mode (optional)**: All existing environment variables are replaced with the new ones specified.

## Default Behavior: Merge

By default, when you add environment variables via CLI commands, they are merged with existing environment variables. This means:

- Variables from the manifest are preserved
- Variables added via previous CLI commands are preserved
- New variables are added to the existing set
- If a variable with the same name exists, it is updated with the new value

### Example: Merge Behavior

```bash
# 1. Push app with env var in manifest (epinio.yml contains: FOO=frommanifest)
epinio app push myapp

# 2. Add a new env var via CLI (merge mode - default)
epinio app update myapp --env BAR=fromupdate

# Result: Both FOO=frommanifest and BAR=fromupdate exist
```

## Replace Mode: Using --env-replace Flag

If you want to replace all existing environment variables with new ones, use the `--env-replace` flag. This is useful when you want to completely reset the environment variable configuration.

### Example: Replace Behavior

```bash
# 1. Push app with env var in manifest (epinio.yml contains: FOO=frommanifest)
epinio app push myapp

# 2. Replace all env vars with new ones
epinio app update myapp --env-replace --env BAR=replaced

# Result: Only BAR=replaced exists, FOO=frommanifest is removed
```

## Commands Supporting Environment Variable Management

### `epinio app push`

The `epinio app push` command supports the `--env-replace` flag when pushing applications.

**Syntax:**
```bash
epinio app push [PATH_TO_MANIFEST] [flags]
```

**Flags:**
- `--env KEY=VALUE`: Add or update environment variables (can be specified multiple times)
- `--env-replace`: Replace all existing environment variables instead of merging (optional)

**Examples:**

```bash
# Push with merge behavior (default)
epinio app push myapp --env DEBUG=true

# Push with replace behavior
epinio app push myapp --env-replace --env PRODUCTION=true --env LOG_LEVEL=info
```

### `epinio app update`

The `epinio app update` command supports the `--env-replace` flag when updating applications.

**Syntax:**
```bash
epinio app update APPNAME [flags]
```

**Flags:**
- `--env KEY=VALUE`: Add or update environment variables (can be specified multiple times)
- `--env-replace`: Replace all existing environment variables instead of merging (optional)

**Examples:**

```bash
# Update with merge behavior (default)
epinio app update myapp --env NEW_VAR=value

# Update with replace behavior
epinio app update myapp --env-replace --env VAR1=value1 --env VAR2=value2
```

## Use Cases

### Use Case 1: Adding Environment Variables Incrementally

When you need to add environment variables over time without losing existing ones:

```bash
# Initial push with manifest variables
epinio app push myapp

# Add staging-specific variables
epinio app update myapp --env STAGE=staging --env DEBUG=true

# Add more variables later
epinio app update myapp --env FEATURE_FLAG=enabled

# All variables are preserved: manifest vars + STAGE + DEBUG + FEATURE_FLAG
```

### Use Case 2: Resetting Environment Variables

When you need to completely replace the environment variable configuration:

```bash
# Reset all environment variables
epinio app update myapp --env-replace --env PRODUCTION=true --env LOG_LEVEL=warn
```

### Use Case 3: Environment-Specific Configuration

When deploying to different environments:

```bash
# Development environment
epinio app push myapp --env ENV=dev --env DEBUG=true

# Production environment (replace all)
epinio app update myapp --env-replace --env ENV=prod --env DEBUG=false --env LOG_LEVEL=info
```

## Best Practices

1. **Use merge mode (default) for incremental updates**: This is the safest approach and prevents accidental loss of configuration.

2. **Use replace mode sparingly**: Only use `--env-replace` when you intentionally want to reset the environment variable configuration.

3. **Document environment variables**: Keep track of which variables are set via manifest vs CLI to avoid confusion.

4. **Use manifests for base configuration**: Define stable, base environment variables in `epinio.yml` and use CLI for environment-specific or temporary overrides.

5. **Verify before replacing**: Before using `--env-replace`, list current environment variables to ensure you're not losing important configuration:
   ```bash
   epinio app env list myapp
   ```

## Technical Details

### Implementation

- The `ReplaceEnv` flag is added to both `ApplicationConfiguration` and `ApplicationUpdateRequest` models
- When `ReplaceEnv` is `nil` or `false`, the system uses merge behavior (backward compatible)
- When `ReplaceEnv` is `true`, the system replaces all existing environment variables
- The flag is only set when explicitly provided via the `--env-replace` CLI flag

### Backward Compatibility

The default merge behavior is backward compatible. Existing workflows that don't use the `--env-replace` flag will continue to work as expected, but now with the improved merge behavior that preserves existing variables.

### API Changes

The API endpoints for application push and update now accept an optional `replace_env` field in the request body:

```json
{
  "environment": {
    "KEY1": "value1",
    "KEY2": "value2"
  },
  "replace_env": true  // Optional: defaults to false (merge)
}
```

## Related Commands

- `epinio app env list APPNAME`: List all environment variables for an application
- `epinio app env set APPNAME KEY VALUE`: Set a single environment variable
- `epinio app env show APPNAME KEY`: Show a specific environment variable
- `epinio app env unset APPNAME KEY`: Remove a specific environment variable

## See Also

- [Application Manifests Documentation](https://docs.epinio.io/references/manifests/)
- [CLI Reference: app push](https://docs.epinio.io/references/cli/epinio_app_push/)
- [CLI Reference: app update](https://docs.epinio.io/references/cli/epinio_app_update/)
