---
sidebar_label: "Download report"
sidebar_position: 25
title: "Download report"
description: Download a Rancher-like node and scaling report from the Epinio UI or API.
keywords: [epinio, report, nodes, scaling, support, dashboard]
doc-type: [how-to]
doc-topic: [epinio, operations, report]
---

Epinio provides a **report** that summarizes your cluster and application scaling. It is similar to Rancher’s node report and is useful for support and understanding usage (e.g. for pricing).

The report includes:

- **Cluster and nodes**: Node list with roles (etcd, control plane, worker), addresses, CPU/RAM capacity, OS, container runtime, creation time
- **System pods**: Epinio system pods with ready status, restarts, age
- **Applications**: Per-application desired instances and **last scale** (when, from/to, by whom), so you can see scaling history and average usage

## Download from the UI

1. In the Epinio dashboard, open **System** in the left sidebar.
2. Click **About**.
3. In the **Download report** section, click **Download Report**.
4. A text report file (e.g. `epinio-report-YYYY-MM-DD-HH-mm-ss.txt`) is downloaded.

:::note Admin only

Downloading the report requires admin permissions. If you see an authorization error, use an admin account or ask your operator to download the report.

:::

## Download via API

You can fetch the same report from the API for automation or scripting.

- **Text report** (human-readable):

  ```bash
  curl -H "Authorization: Bearer YOUR_TOKEN" "https://EPINIO_API_URL/api/v1/report/nodes?format=text"
  ```

- **JSON report** (machine-readable):

  ```bash
  curl -H "Authorization: Bearer YOUR_TOKEN" "https://EPINIO_API_URL/api/v1/report/nodes"
  ```

Use the same admin token you use for the Epinio UI or CLI. The JSON response includes `clusters`, `systemPods`, `applications` (with `lastScaleAt`, `lastScaleBy`, `lastScaleFrom`, `lastScaleTo`), and metadata such as `epinioVersion` and `kubernetesVersion`.
