---
sidebar_label: 'Rancher Extension'
sidebar_position: 3
title: 'Getting The Rancher Extension Running'
description: How to set up the extension version of Epinio locally.
keywords: [epinio, contributing, ui, extension, rancher]
doc-type: [contribute]
doc-topic: [ui-contribution-extension]
doc-persona: [epinio-developer]
---

If you haven't already completed the [prerequisites](../prereqs), do those now.

1. Ensure your epinio instance is running, which is detailed in the [prerequisites](../prereqs) page.
2. Clone the repository `git clone git@github.com:epinio/ui.git`.
3. Navigate to the `dashboard` directory and run `yarn install`.
4. Run `API=<rancher ip> yarn dev`.
5. Navigate to the address displayed in your terminal; it should be something like `localhost:8005`.
