---
sidebar_label: "Cert Manager"
title: ""
---

# Cert Manager

## Purpose

The [Cert Manager](https://cert-manager.io/) is a component watching for kubernetes
Certificate resources and generating Secrets holding the requested certificate data. It
can be configured with a variety of issuers for fulfilling these requests. One such
issuer is [Let's Encrypt](https://letsencrypt.org/).

Epinio uses it to generate the internal certificates used to secure the communication
between its components, as well as for the certificates used to secure the application
Ingresses.

## Installation

The Cert Manager is a dependency of Epinio, and not installed by it.  In other words,
Epinio expects to have a Cert Manager available to it on the cluster, when it is
installed.

## Version

Epinio development uses Cert Manager version 1.8.2.  For details of this version see the
[releases](https://cert-manager.io/docs/installation/supported-releases/).
