# Services

## Overview

Services are, in general, external components providing some kind of service (sic!) to
applications, without being a direct part of the applications.

Examples of services are

  - databases,
  - message brokers,
  - interfaces to other kinds of systems,
  - etc.

In epinio services are identified by a name and the namespace they are defined in. Beyond
that they consist of a collection of arbitrarily named attributes and values which, when
consumed by an application, tell that aplication how to connect to and interact with that
service.

Note that while there are guidelines what kind of attributes are required for the above, and
how they should be named, and what their content should be, these guidelines are outside
of the scope for Epinio. Epinio is not aware of such, and cannot validate service
definition against such. It will simply pass any attributes to using applications as they
are, and assumes that they are what the application requires for proper function.

For an application to use a service, the service has to be __bound__ to the application. In
other words, the application has to be made aware of the service.

Note how this constrains the lifetimes of services with respect to applications. A service
is expected to exist before a using application exists, and to only be deleted after all
using applications are gone.

Deleting a service used by an application is considered an error and generally
prevented. While it can be forced it should then be expected to break the application.

As a limitation, applications can only bind services defined in the same namespace as the
application itself.

## Management

Services in Epinio are managed by the [epinio service](cli/epinio_service.md)
command hierarchy.

The connections between services and applications specifically are managed by the
[bind](cli/epinio_service_bind.md) and [unbind](cli/epinio_service_unbind.md) commands.

## Application Interface

From the point of view of an epinio-staged application, a bound service appears in the
application's file system as a directory under the path `/services`. This directory will
have the same name as the service and contains a set of files holding the attributes of the
service. Each attribute is mapped to a file of the same name as the attribute, and this
file contains the value of the attribute.

### Example

To be a bit more concrete, let us assume that we have a service created by the command
`epinio service create orders host over-there port 99 user zetta password 92084dkls`.

When an application binds that service several additional paths will appear in the
filesystem of that application, namely:

|Path				|Kind		|Content	|
|---				|---		|---		|
|/services/orders		|Directory	|		|
|/services/orders/host		|File		|`over-there`	|
|/services/orders/port		|File		|`99`		|
|/services/orders/user		|File		|`zetta`	|
|/services/orders/password	|File		|`92084dkls`	|

The application can now read these files and use their content to connect to the service,
authenticate, and then use it.
