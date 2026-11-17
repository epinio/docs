---
sidebar_label: Releasing Helm Charts
sidebar_position: 1
title: Releasing Helm Charts
description: Overview of the process for publishing updated Epinio Helm charts.
keywords: [epinio, contribute, helm, charts, release]
doc-type: [contribute]
doc-topic: [epinio, contribute, helm, charts]
doc-persona: [epinio-developer, epinio-operator]
---

# Releasing Helm Charts

The process for publishing updated Epinio Helm charts is automated and streamlined through GitHub Actions.

## Overview

There are two key GitHub Actions involved in the release workflow:

- Build epiniod image
- Release Charts

These actions work together to ensure charts are tested, packaged, and published automatically to the repository’s GitHub Pages branch.

## Deployment Process

### 1. Build epiniod image

Once changes have been made to the Helm charts (for example, updating templates, values, or dependencies) and all tests are passing:

- Navigate to the Actions tab in the repository.
- Run the “Build epiniod image” workflow.

This action will:

- Build and push the latest epiniod Docker image.
- Update the image reference used by the Helm charts.

> Ensure that the chart changes are already committed and merged into the default branch before running this action.

### 2. Release Charts

After the image build completes successfully:

- Run the “Release Charts” workflow.

This action will:

- Package the Helm charts.
- Create a new GitHub release with updated chart artifacts.
- Trigger the pages-build-deployment workflow.

### 3. GitHub Pages Deployment

The `pages-build-deployment` action automatically runs after the release.
It copies the packaged charts into the gh-pages branch, which serves as the Helm chart repository.

Once this completes successfully, the updated Helm charts are available for installation via Helm:

```
helm repo add epinio https://epinio.github.io/helm-charts
helm repo update
```