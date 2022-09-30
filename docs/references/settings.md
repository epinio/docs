---
sidebar_label: "CLI Settings"
title: ""
---

# Epinio, CLI settings

The Epinio command line client uses a settings file to store
information which has to persist across invocations. This document
discusses various aspects around this.

## Table Of Contents

  - [Location](#location)
  - [Contents](#contents)
  - [Commands](#commands)

## Location

Epinio's settings files is located by default at `~/.config/epinio/settings.yaml`.

The location can be changed from command to command by specifying a
different path with the global command line option `--settings-file`.

A more permanent change is possible by setting the environment
variable `EPINIO_SETTINGS` to the desired path.

## Contents

Epinio's settings contains

  - The name of the namespace currently targeted.
  - Epinio API user name
  - Epinio API password (base64 encoded)
  - Epinio API Token
  - Epinio API urls (regular and websocket)
  - Epinio API certificate

The namespace can be changed by running `epinio target` with the
name of the desired namespace as its single argument.

Username and password are used by the client to authenticate itself
when talking to Epinio's API server. The `epinio login [URL]` command asks
for your username and password, checks the validity of the
credentials, and saves the information to the settings.

The `token` is an object generated when you log in
with an OIDC provider using the `epinio login --oidc` command. 

The `token` combines the `access_token` and `refresh_token`.

If a token is present, it will be used to authenticate and takes precedence over the username and password.

The installation uses the wildcard domain `omg.howdoi.website` and the
`epinio-ca` issuer by default.

The `epinio login [URL]` checks if the associated certificate is signed by an
unknown CA and it asks you if you want to trust it and save it
to the settings so that future invocations of the client are able 
to verify the actual certificate when talking to Epinio's API server.

The `epinio settings update-ca` updates the API url and the certificate.

## Commands

The Epinio command line client currently provides 3 commands
explicitly targeting the settings. These are:

  1. `epinio target`

     As noted in the previous section, this command changes
     the namespace to use with all other commands.

  2. `epinio settings show`

     This command shows the details of the currently stored
     settings. An exception is made for the certificate
     field, due to its expected size. The command's output only notes
     if certificate data is present or not.

  3. `epinio login [URL]`

     Epinio allows users to switch between multiple installations (on
     different clusters) by simply using a different settings file.

     When such is done the credentials, cert data, and URLs stored in
     the settings will not match the newly targeted cluster,
     except by coincidence.

     Logging in and pointing to the newly targeted installation will create 
     new settings file storing credentials, cert data, and URLs with
     information retrieved from the new cluster.
