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
mv wordpress htdocs
rm -rf latest.tar.gz
```

## Create a buildpack.yml for your application

```bash
cat << EOF > buildpack.yml
---
php:
  version: 8.0.x
  script: index.php
  webserver: nginx
  webdirectory: htdocs
EOF
```

## Enable needed php extensions

The PHP buildpack supports additional ini files for PHP through
[the PHP_INI_SCAN_DIR mechanism](https://paketo.io/docs/buildpacks/language-family-buildpacks/php/#php_ini_scan_dir).

We need zlib and mysqli extensions enabled:

```bash
mkdir .php.ini.d
cat << EOF > .php.ini.d/extensions.ini
extension=zlib
extension=mysqli
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
