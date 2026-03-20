---
sidebar_label: "Ignoring Files"
title: ""
---

# Ignoring Files During Application Push

When pushing applications with `epinio push`, you can exclude files and directories from being included in the application tarball. This feature helps reduce upload bandwidth, prevent local build artifacts from being deployed, and ensure only necessary source code is pushed to the cluster.

## Overview

The ignore feature supports gitignore-style pattern matching and can be configured in two ways:

1. **`.epinioignore` file** - A file in your application directory (similar to `.gitignore`)
2. **`epinio.yaml` manifest** - Under the `configuration.ignore` field

When both are present, patterns from both sources are merged, with `.epinioignore` patterns processed after manifest patterns (so they can override if needed).

## Quick Start

### Using .epinioignore File

Create a `.epinioignore` file in the root of your application directory:

```bash
# Create .epinioignore file
cat > .epinioignore << EOF
node_modules/
*.log
dist/
.env
EOF
```

### Using epinio.yaml Manifest

Add ignore patterns to your `epinio.yaml`:

```yaml
name: myapp
configuration:
  ignore:
    - node_modules/
    - "*.log"
    - dist/
    - .env
```

### Combining Both Methods

You can use both `.epinioignore` and `epinio.yaml` together. Patterns from `.epinioignore` are processed after manifest patterns, allowing file-based patterns to override manifest patterns if needed.

## Pattern Syntax

The ignore feature supports gitignore-style pattern matching with the following capabilities:

### Basic Patterns

Match files and directories by name:

```
node_modules/     # Matches node_modules directory
*.log             # Matches all .log files
dist/             # Matches dist directory
.env              # Matches .env file
```

### Directory-Only Patterns

Patterns ending with `/` match only directories:

```
build/            # Only matches directories named "build"
src/temp/         # Only matches directories
*.tmp/            # Only matches directories ending with .tmp
```

**Note**: A file with the same name will not be ignored if the pattern ends with `/`.

### Wildcard Patterns

Use `*` to match any characters (except path separators):

```
*.log             # All .log files
*.tmp             # All .tmp files
temp.*            # Files starting with "temp."
*test*            # Files containing "test"
```

### Recursive Patterns with `**`

Use `**` to match any number of directories:

```
src/**/*.test.js          # All .test.js files in src and subdirectories
**/node_modules/          # node_modules directories at any level
a/**/b/**/c              # Complex nested patterns
**/*.log                 # All .log files at any level
```

**Examples**:
- `src/**/*.js` matches `src/file.js`, `src/components/file.js`, `src/deep/nested/file.js`
- `**/test/**` matches any path containing a `test` directory
- `a/**/b/**/c` matches `a/x/y/b/z/w/c`

### Root-Relative Patterns

Patterns starting with `/` match only at the root of the application:

```
/root-only          # Only matches "root-only" at the root
/subdir/            # Only matches "subdir" at the root
/config.yaml        # Only matches "config.yaml" at the root
```

**Note**: Without the leading `/`, these patterns would match anywhere in the directory tree.

### Negation Patterns

Patterns starting with `!` un-ignore files that were previously ignored:

```
*.log               # Ignore all .log files
!important.log      # But don't ignore important.log
*.tmp               # Ignore all .tmp files
!critical.tmp       # But don't ignore critical.tmp
```

**Important**: Negation patterns only work if the file was previously ignored by a non-negation pattern. They cannot be used to ignore files that weren't already ignored.

### Comments

Lines starting with `#` are treated as comments and ignored:

```
# This is a comment
node_modules/       # Ignore node_modules
# Another comment
*.log               # Ignore log files
```

## Common Use Cases

### Node.js/JavaScript Applications

```bash
# .epinioignore
node_modules/
npm-debug.log
.npm
dist/
build/
.next/
.nuxt/
.cache/
*.log
.env
.env.local
.env.*.local
```

### Python Applications

```bash
# .epinioignore
__pycache__/
*.py[cod]
*.pyc
*.pyo
*.pyd
.Python
venv/
env/
ENV/
.venv
*.egg-info/
dist/
build/
.env
.env.local
```

### Go Applications

```bash
# .epinioignore
vendor/
*.exe
*.exe~
*.dll
*.so
*.dylib
*.test
*.out
.env
```

### Build Artifacts

```bash
# .epinioignore
dist/
build/
target/
out/
bin/
*.o
*.class
*.jar
*.war
*.ear
```

### IDE and Editor Files

```bash
# .epinioignore
.vscode/
.idea/
*.swp
*.swo
*~
.DS_Store
Thumbs.db
```

### Local Configuration Files

```bash
# .epinioignore
.env
.env.local
.env.*.local
config.local.yaml
settings.local.json
```

## Examples

### Example 1: Simple Node.js Application

**`.epinioignore`**:
```
node_modules/
dist/
*.log
.env
```

**Result**: Excludes `node_modules` directory, `dist` directory, all log files, and `.env` file from the push.

### Example 2: Using Negation

**`.epinioignore`**:
```
*.log
!important.log
*.tmp
!critical.tmp
```

**Result**: Ignores all `.log` and `.tmp` files, except `important.log` and `critical.tmp`.

### Example 3: Recursive Patterns

**`.epinioignore`**:
```
src/**/*.test.js
**/node_modules/
build/
```

**Result**: 
- Ignores all `.test.js` files in `src` and any subdirectories
- Ignores `node_modules` directories at any level
- Ignores `build` directory at the root

### Example 4: Root-Relative Patterns

**`.epinioignore`**:
```
/root-only
/subdir/
/config.yaml
```

**Result**: Only matches these patterns at the root level. Files with the same names in subdirectories are not ignored.

### Example 5: Using epinio.yaml

**`epinio.yaml`**:
```yaml
name: myapp
configuration:
  ignore:
    - node_modules/
    - "*.log"
    - dist/
    - .env
```

**Result**: Same as Example 1, but configured in the manifest file.

### Example 6: Combining File and Manifest

**`epinio.yaml`**:
```yaml
name: myapp
configuration:
  ignore:
    - build/
    - "*.tmp"
```

**`.epinioignore`**:
```
node_modules/
*.log
!important.log
```

**Result**: All patterns are applied. The final ignore list includes:
1. `build/` (from manifest)
2. `*.tmp` (from manifest)
3. `node_modules/` (from file)
4. `*.log` (from file)
5. `!important.log` (from file, overrides `*.log` for this file)

## Best Practices

### What to Ignore

**Dependencies**: `node_modules/`, `vendor/`, `venv/`, etc.

**Build artifacts**: `dist/`, `build/`, `target/`, compiled binaries

**Local configuration**: `.env`, `.env.local`, local config files

**IDE/Editor files**: `.vscode/`, `.idea/`, editor-specific files

**Temporary files**: `*.log`, `*.tmp`, `*.swp`

**OS files**: `.DS_Store`, `Thumbs.db`


### What NOT to Ignore

**Source code**: Your application source files

**Required configuration**: Production configs that need to be deployed

**Dockerfiles**: If you use custom Dockerfiles

**Package files**: `package.json`, `requirements.txt`, `go.mod` (unless you have a good reason)

**Documentation**: README, docs that should be included


### Security Considerations

**Important**: The ignore feature excludes files from the tarball, but this is not a security feature. Sensitive files should not be in your repository in the first place.

- Never commit secrets, API keys, or passwords to version control
- Use environment variables or secret management for sensitive data
- The ignore feature is for convenience and performance, not security

### Performance Tips

- Ignore large dependency directories (`node_modules/`, `vendor/`) to significantly reduce upload time
- Ignore build artifacts that will be regenerated during staging
- Use specific patterns rather than overly broad ones to avoid accidentally excluding needed files

## How It Works

1. When you run `epinio push`, Epinio collects files from your application directory
2. Patterns from `epinio.yaml` (if present) are loaded first
3. Patterns from `.epinioignore` (if present) are loaded and merged
4. Each file and directory is checked against the ignore patterns
5. Ignored files are excluded from the tarball that gets uploaded
6. The `.epinioignore` file itself is automatically excluded from the tarball
7. Git-related files (`.git`, `.gitignore`, etc.) are always excluded regardless of patterns

## Troubleshooting

### Files Are Still Being Included

**Problem**: Files matching your ignore patterns are still being pushed.

**Solutions**:
1. Verify the `.epinioignore` file is in the root of your application directory
2. Check for typos in pattern names
3. Ensure patterns don't have leading/trailing spaces
4. Remember that negation patterns (`!`) only work if the file was previously ignored
5. Check if the file is being included via `epinio.yaml` manifest patterns

### Files Are Being Excluded When They Shouldn't Be

**Problem**: Files you need are being excluded.

**Solutions**:
1. Check if a pattern is too broad (e.g., `*` matches everything)
2. Use negation patterns to un-ignore specific files: `!important-file.txt`
3. Verify root-relative patterns (`/pattern`) aren't matching when they shouldn't
4. Check both `.epinioignore` and `epinio.yaml` for conflicting patterns

### Pattern Not Working as Expected

**Common Issues**:
- **Directory vs File**: Patterns ending with `/` only match directories
- **Root-relative**: Patterns starting with `/` only match at the root
- **Recursive**: Use `**` for matching across multiple directory levels
- **Negation order**: Negation patterns must come after the pattern they're negating

### Verifying What's Being Ignored

To see what files would be included/excluded, you can:

1. **Check the tarball** (if you have access to it after creation)
2. **Review patterns** in both `.epinioignore` and `epinio.yaml`
3. **Test patterns locally** using gitignore test tools (patterns are compatible)

## Pattern Matching Details

### Pattern Processing Order

1. Patterns are processed in the order they appear
2. Manifest patterns are processed first
3. File patterns (`.epinioignore`) are processed after
4. Later patterns can override earlier ones (especially with negation)

### Matching Rules

- Patterns are **case-sensitive**
- Path separators are normalized (works on both Windows and Unix)
- Unicode characters in paths are supported
- Empty lines and comments are ignored
- Patterns are matched against relative paths from the application root

### Special Cases

- The root directory (`.`) is never ignored
- The `.epinioignore` file itself is automatically excluded
- Git files (`.git`, `.gitignore`, `.gitmodules`, etc.) are always excluded
- If a directory is ignored, all its contents are also ignored

## Integration with epinio.yaml

The `ignore` field in `epinio.yaml` is part of the `configuration` section:

```yaml
name: myapp
configuration:
  ignore:
    - pattern1
    - pattern2
    - "pattern with spaces"
  # Other configuration options...
  instances: 2
  routes:
    - myapp.example.com
```

**Note**: Patterns in YAML lists should be quoted if they contain special characters or spaces.

## Additional Resources

- The ignore feature implementation follows gitignore-style pattern matching
- Patterns are compatible with `.gitignore` syntax (with some limitations)
- For complex patterns, test them in a `.gitignore` file first to verify behavior

## See Also

- [Application Manifests](./manifests.md) - Learn more about `epinio.yaml`
- [epinio push](./commands/cli/epinio_push.md) - How to push applications with Epinio

