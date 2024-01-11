---
sidebar_label: "Principles"
title: "Epinio design principles"
description: The design principles Epinio is based upon.
keywords: [epinio, kubernetes, design principles]
---

<head>
  <link rel="canonical" href="https://docs.epinio.io/explanations/principles"/>
</head>

These principles guide Epinio's development:

- Good developer experience
  - single command push for short learning curve
  - good documentation

- Edge computing friendly
  - fit in less than 4&nbsp;GB of RAM
  - consistent tooling across environments
  - open APIs

- Easy installation and removal, minimum complexity
  - installation time less than 5 minutes when images are warm
  - installation with a one-line command and zero configuration
  - removal with a single line command leaving the cluster in its prior state
  - must scale from a local desktop to a data center environment

- API driven architecture
  - splitting the client and server components
  - scalability, parallel, scalable developer development
  - hiding the complexity
  - DevOps friendly

- Security focused

- Other guidelines
  - prefer components written in Go
  - prefer Kubernetes primitives over custom resources
  - prefer well known components with active community over custom code
  - acceptance tests should complete less than 10 minutes
  - tests should be able to run on a minimal Epinio cluster installation
