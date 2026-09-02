---
sidebar_label: "Agent skill"
sidebar_position: 1
title: "Epinio CLI agent skill"
description: A downloadable agent skill that teaches an AI assistant to drive Epinio through the CLI, for environments where the MCP server is unavailable.
keywords: [epinio, cli, skill, ai, agent, claude, cursor, mcp, llm]
doc-type: [reference]
doc-persona: [epinio-developer]
doc-topic: [epinio, reference, cli, ai]
---

# Epinio CLI agent skill

The [MCP server](../mcp.md) is the richest way to let an AI agent manage Epinio,
but it is not always an option.

The **`epinio-cli` skill** closes that gap. It is a pair of markdown files that
organize the `epinio` command surface by task, together with the deploy and
staging guidance an agent needs to get a push to succeed. Load it into your
assistant and it can create namespaces, push applications, choose a build mode,
bind configurations and services, manage git credentials, shell into a running
instance, and read staging logs, without an MCP server anywhere in the picture.

It is deliberately conservative: where the CLI has no equivalent for something,
the skill says so rather than inventing a command. An appendix maps MCP tool
names to their CLI equivalents for anyone migrating from the server.

## Download

<a href="pathname:///skills/epinio-cli/SKILL.md" download><strong>Download SKILL.md</strong></a>

One self-contained file — the command surface grouped by task, preconditions,
buildpack and Dockerfile build guidance, a failure-symptom table, worked
workflows, and an appendix mapping MCP tool names to their CLI equivalents.

## Install

Skills are picked up from a directory named after the skill. Create
`epinio-cli/` in the location your assistant reads from and drop the file in:

| Assistant | Personal (all projects) | Project-local |
| --- | --- | --- |
| Claude Code / Claude Desktop | `~/.claude/skills/epinio-cli/` | `<project>/.claude/skills/epinio-cli/` |
| Cursor | `~/.cursor/skills/epinio-cli/` | `<project>/.cursor/skills/epinio-cli/` |

```bash
mkdir -p ~/.claude/skills/epinio-cli
curl -fsSL -o ~/.claude/skills/epinio-cli/SKILL.md \
  https://docs.epinio.io/skills/epinio-cli/SKILL.md
```

For an assistant with no skill directory, paste the file in as a system prompt
instead.

## Before you use it

The skill assumes a working session — it will not log in for you:

1. `epinio` is on `PATH` and reports **1.14.2 or later**.
2. `epinio login <URL>` has succeeded, so `epinio info -o json` returns cleanly.
3. A namespace is targeted with `epinio target <namespace>` (default is
   `workspace`). Namespaced commands act on the *targeted* namespace, with the
   sole exception of [`epinio app watch`](./app/epinio_app_watch.md), none of
   them take a `--namespace` flag to correct a wrong target mid-conversation.
