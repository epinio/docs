---
sidebar_label: Get Familiar With Epinio Via Example Applications
sidebar_position: 4
title: Get Familiar With Epinio Via Example Applications
description: Get started with Epinio by deploying example applications.
keywords: [epinio, kubernetes, go, java, wordpress, html, install]
doc-type: [how-to]
doc-topic: [epinio, how-to, use-develop, install-example-apps]
doc-persona: [epinio-developer, epinio-operator]
---

## Introduction

This guide provides a collection of example applications that you can deploy using Epinio. These applications cover various programming languages and frameworks, allowing you to explore Epinio's capabilities in different contexts.

If you are using the latest version you can clone the example repository main branch. Some examples will have branches with specific versions like the Static HTML Example has a v1.11.0 branch.

If you are using the Epinio CLI you can just clone the below examples and use the 
Epinio push command with the specific instructions for each example. If you are using the Epinio UI can use the Create Application flow to deploy the examples.

## Compatibility Table
Below are the list of example app branches in relation to the currently supported
versions of Epinio. 

| Example App                                                | Epinio v1.13.* | Epinio v1.12.* | Epinio v1.11.* |
| ---------------------------------------------------------- | -------------  | -------------  | -------------- |
| [Static HTML](https://github.com/epinio/example-12factor)  | main           | main           | v1.11          |
| [Golang](https://github.com/epinio/example-go)             | main           | main           | main           |
| [Java/Spring Boot](https://github.com/epinio/example-java) | main           | main           | v1.11          |
| [Rails](https://github.com/epinio/example-rails)           | main           | main           | v1.11          |
| [Wordpress](https://github.com/epinio/example-wordpress)   | main           | main           | main           |

## Static HTML Example

This is a good starting point to get familiar with Epinio. It is a simple static HTML application that demonstrates the basic deployment process.

https://github.com/epinio/example-12factor

## Java Example

This example showcases a Java with Spring Boot application. It demonstrates how to deploy a Java application using Epinio.

https://github.com/epinio/example-java

## Golang Example

This example features a Go application. It illustrates the deployment of a Go-based application using Epinio. It also includes an example for bundling static files in your application binary if you are deploying a simple web server. 

https://github.com/epinio/example-go

## Rails Example

This example demonstrates a Ruby on Rails application. It highlights the deployment of a Rails application using Epinio. This is one of the more complex examples as it requires a database to be deployed alongside the application. There are also multiple environment variables that need to be set for the application to work. Its recommended to use the Epinio CLI for this example.

https://github.com/epinio/example-rails

## WordPress Example

This example illustrates the deployment of a WordPress application. It includes steps to set up the necessary PHP extensions and configure the application. WordPress requires a database to function, so additional steps are needed to connect it to a database service.

https://github.com/epinio/example-wordpress
