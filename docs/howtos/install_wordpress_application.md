---
sidebar_label: "Install Wordpress with Epinio"
sidebar_position: 22
title: ""
---

# Installing Wordpress with Epinio

## Create a directory for your application:

```bash
mkdir wordpress
cd wordpress
```

## Get the code:

https://wordpress.org/download/#download-install

```bash
wget https://wordpress.org/latest.tar.gz
tar xvf latest.tar.gz
cd wordpress
```

## Enable needed php extensions

The PHP buildpack supports additional ini files for PHP through
[the PHP_INI_SCAN_DIR mechanism](https://paketo.io/docs/howto/php/#configure-php-with-a-custom-ini-file).

For Wordpress to work, there are some PHP extensions that need to be enabled:

```bash
# This is still needed
mkdir .php.ini.d
cat << EOF > .php.ini.d/extensions.ini
extension=zlib
extension=mysqli
extension=openssl
EOF
```

## Deploy

```
epinio push --name wordpress
```

## Additional steps

Wordpress needs a database to work. After visiting the route of your deployed
application you will have to set the connection details to the database.

You can use the [Service](../references/services.md) feature to deploy your database with Epinio.
Of course, deploying a database manually is still possible.

Check [the README of our example app](https://github.com/epinio/example-wordpress#step-4---create-a-database-for-wordpress),
on how to create a database and how to configure Wordpress to use it.
