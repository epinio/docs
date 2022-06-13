---
title: ""
sidebar_label: "Source Code Storage"
---

# Customization point: Source Code Storage

Epinio saves the uploaded sources of applications to be deployed to an S3 compatible
storage system. The staging process then retrieves the sources from that storage.

By default Epinio uses [minio](https://min.io/) as the store, as an internal component.

To use an external S3 compatible storage it is necessary to

  - Set chart key `minio.enabled=false`, and
  - the various S3 connection keys, i.e.

      - `s3.endpoint`
      - `s3.bucket`
      - `s3.region`
      - `s3.accessKeyID`
      - `s3.secretAccessKey`

    to suitable values. The keys `s3.useSSL` and `s3.certificateSecret` are usually not
    required.

  - Set `s3.useSSL=false` if and only if open unencrypted communication is truly desired.

  - Set `s3.certificateSecret` to the secret holding a cert if and only if the chosen
    storage uses a self-signed certificate. This is not expected to be the case in
    production deployments.
