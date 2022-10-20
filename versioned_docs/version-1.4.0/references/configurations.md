---
sidebar_label: "Configurations"
title: ""
---

# Configurations

## Overview

Configurations are, in general, external components providing some kind of configuration (sic!) to
applications, without being a direct part of the applications.

Examples of configurations are

  - databases,
  - message brokers,
  - interfaces to other kinds of systems,
  - etc.

In Epinio configurations are identified by a name and the namespace they are defined in. Beyond
that they consist of a collection of arbitrarily named attributes and values, which when
consumed by an application, tell that aplication how to connect to and interact with that
configuration.

Note that while there are guidelines what kind of attributes are required for the above, and
how they should be named, and what their content should be, these guidelines are outside
of the scope for Epinio. Epinio is not aware of such, and cannot validate configuration
definition against such. It will simply pass any attributes to using applications as they
are, and assumes that they are what the application requires for proper function.

For an application to use a configuration, the configuration has to be __bound__ to the application. In
other words, the application has to be made aware of the configuration.

Note how this constrains the lifetimes of configurations with respect to applications. A configuration
is expected to exist before a using application exists, and to only be deleted after all
using applications are gone.

Deleting a configuration used by an application is considered an error and generally
prevented. While it can be forced it should then be expected to break the application.

As a limitation, applications can only bind configurations defined in the same namespace as the
application itself.

## Management

Configurations in Epinio are managed by the [epinio configuration](./commands/cli/configuration/epinio_configuration.md)
command hierarchy.

The connections between configurations and applications specifically are managed by the
[bind](./commands/cli/configuration/epinio_configuration_bind.md) and [unbind](./commands/cli/configuration/epinio_configuration_unbind.md) commands.

## Application Interface

From the point of view of an epinio-staged application, a bound configuration appears in the
application's file system as a directory under the path `/configurations`. This directory will
have the same name as the configuration and will contain a set of files holding the attributes of the
configuration. Each attribute is mapped to a file of the same name as the attribute, and this
file contains the value of the attribute.

### Example

To be a bit more concrete, let us assume that we have a configuration created by the command
`epinio configuration create orders host over-there port 99 user zetta password 92084dkls`.

When an application binds that configuration several additional paths will appear in the
filesystem of that application, namely:

| Path | Kind	| Content	|
| ---- | ---- | ------- |
|/configurations/orders		|Directory	|		|
|/configurations/orders/host		|File		|`over-there`	|
|/configurations/orders/port		|File		|`99`		|
|/configurations/orders/user		|File		|`zetta`	|
|/configurations/orders/password	|File		|`92084dkls`	|

The application can now read these files and use their content to connect to the configuration,
authenticate, and then use it.
