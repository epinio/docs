---
sidebar_label: Documentation Guide
sidebar_position: 1
title: Documentation Contribution Guide
description: Conventions and a checklist for writing and reviewing Epinio documentation pages.
keywords: [epinio, documentation, contributing, style guide, checklist, diataxis]
doc-type: [contribute]
doc-topic: [epinio, contribute, documentation]
doc-persona: [epinio-developer, epinio-operator]
---

This guide keeps documentation pages consistent and helps you put content in the
right place. Use it when writing a new page, and use it to raise existing pages to
the same bar when you touch them.

## 1. Put the page in the right place (Diátaxis)

We organize docs by the **mode the reader is in**, following
[Diátaxis](https://diataxis.fr/). Decide which one your page is before choosing a
home, and set `doc-type` to match.

| Mode | Reader's need | Lives in | `doc-type` |
| --- | --- | --- | --- |
| **Tutorial** | "Teach me, step by step" (a guided lesson for a newcomer) | Getting Started, or How-to guides > Developer > journeys | `tutorial` |
| **How-to guide** | "Help me accomplish a specific task" | How-to guides > Developer or Operator | `how-to` |
| **Reference** | "Tell me the facts" (commands, APIs, values, fields) | Reference (cli / server-api / helm / configuration / customization / security) | `reference` |
| **Explanation** | "Help me understand why / how it works" | A `concepts/` folder within the relevant section | `explanation` |
| Web UI surface | "Show me how to do it in the dashboard" | Web UI / Dashboard | `how-to` |
| Contributor docs | Internal guidance for contributors | Contribute | `contribute` |

Quick decision questions:

- Am I teaching a beginner a lesson with a guaranteed outcome? → **tutorial**.
- Am I helping someone complete a real task they already understand? → **how-to**.
- Am I describing the machinery (a command, an API, chart values)? → **reference**.
- Am I explaining a concept or a design choice? → **explanation**.

If a page is doing two of these at once, that is usually a sign it should be split.

Within How-to guides, also pick the **persona**: a task aimed at someone deploying
and developing apps goes under **Developer**; a task aimed at someone installing,
configuring, or running Epinio goes under **Operator**.

## 2. Doc header (frontmatter)

Every content page starts with a frontmatter block. Do not leave placeholder text
in it (for example `doc-type: [one of how-to, explanation, tutorial, reference]` is
not a valid value, it is a leftover template).

| Field | Required | Rule |
| --- | --- | --- |
| `title` | yes | Full, descriptive page title. Renders as the page H1. |
| `sidebar_label` | yes | Short label for the navigation sidebar. |
| `sidebar_position` | recommended | Integer ordering within the section. |
| `description` | yes | One sentence. Used as the page meta description. |
| `keywords` | yes | List of search terms. |
| `doc-type` | yes | One of `tutorial`, `how-to`, `reference`, `explanation`, `contribute`. |
| `doc-persona` | yes | `epinio-developer`, `epinio-operator`, or both. Do not invent new values. |
| `doc-topic` | yes | Topic slug, e.g. `[epinio, how-to, namespaces]`. |

Copy-paste starting point:

```yaml
---
sidebar_label: Short label
sidebar_position: 2
title: A clear, descriptive title
description: One sentence describing what this page covers.
keywords: [epinio, kubernetes, topic]
doc-type: [how-to]
doc-persona: [epinio-developer]
doc-topic: [epinio, how-to, topic]
---
```

## 3. Page body

- Do **not** repeat the title as an `#` H1 in the body. The frontmatter `title`
  already renders it.
- Open with one or two sentences saying what the page covers and who it is for.
- Use sentence-case headings and a logical hierarchy (`##`, then `###`).
- Every code block declares a language (` ```bash `, ` ```console `, ` ```yaml `).
- Linking to docs uses **relative** links to the `.md`/`.mdx` file, not absolute
  `https://docs.epinio.io/...` URLs. Relative links are checked at build time and
  survive page moves; absolute self-links silently rot.

### Showing UI and CLI together

When a task can be done in both the dashboard and the CLI, use tabs. This project
runs MDX v1, which is strict about structure. Follow this exact pattern (see
[the namespaces page](../how-to/developer/concepts/namespaces.mdx) for a working
example):

- Name the file `.mdx` and import the components at the top.
- Put `<Tabs>` and `<TabItem>` at **column 0** (not indented).
- Leave a blank line after each opening `<TabItem>` and before each closing
  `</TabItem>`, and keep the Markdown content flush-left.
- Keep list items to a single line where possible.

```mdx
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="ui" label="UI" default>

Steps for the dashboard.

</TabItem>
<TabItem value="cli" label="CLI">

Steps for the CLI.

</TabItem>
</Tabs>
```

## 4. See also

Where applicable, end the page with a `## See also` section linking related
material. Good candidates:

- the Reference page(s) for any CLI commands, APIs, or chart values the page uses;
- closely related how-tos;
- the concept/explanation page behind the task.

Keep it to genuinely relevant links, not a dump.

## 5. Build

Run a production build before opening a PR:

```bash
yarn build
```

The build fails on broken internal links (`onBrokenLinks: throw`). A green build is
required to merge.

## Raising existing pages to the bar

When you edit an existing page, bring it up to this checklist. The most common gaps
in the current docs are:

- missing `doc-type`, `doc-persona`, or `description`;
- leftover template placeholders in frontmatter;
- non-standard `doc-persona` values (only `epinio-developer` and `epinio-operator`
  are valid);
- absolute `https://docs.epinio.io/...` self-links that should be relative;
- a missing `## See also` section.

You do not have to fix the whole site at once. Fix the page you are touching.
