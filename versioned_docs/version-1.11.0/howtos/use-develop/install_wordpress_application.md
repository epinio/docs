---
sidebar_label: Install WordPress with Epinio
sidebar_position: 25
title: Installing WordPress with Epinio
description: How to install WordPress using Epinio.
keywords: [epinio, kubernetes, wordpress, install]
doc-type: [how-to]
doc-topic: [epinio, how-to, use-develop, install-wordpress]
doc-persona: [epinio-developer, epinio-operator]
---

<head>
  <link rel="canonical" href="https://docs.epinio.io/howtos/use-develop/install_wordpress_application"/>
</head>

## Create a directory for your application

```console
mkdir wordpress
cd wordpress
```

## Get the code

https://wordpress.org/download/#download-install

```console
wget https://wordpress.org/latest.tar.gz
tar xvf latest.tar.gz
cd wordpress
```

## Enable the needed PHP extensions

The PHP buildpack supports additional INI files for PHP through
[the PHP_INI_SCAN_DIR mechanism](https://paketo.io/docs/howto/php/#configure-php-with-a-custom-ini-file).

For WordPress to work, there are certain PHP extensions that need enabling:

```console
# This is still needed
mkdir .php.ini.d
cat << EOF > .php.ini.d/extensions.ini
extension=zlib
extension=mysqli
extension=openssl
EOF
```

## Deploy

```console
epinio push --name wordpress
```

## Additional steps

WordPress needs a database to work.
After visiting the route of your deployed application,
you have to set the connection details to the database.

You can use the [Service](../../references/services.md) feature to deploy your database with Epinio.
Deploying a database manually is still possible.

Check [the README of the example app](https://github.com/epinio/example-wordpress#step-4---create-a-database-for-wordpress),
on how to create a database and how to configure WordPress to use it.
