#!/bin/sh

set -eux

VERSION="$1"
if [ -z "$VERSION" ]
then
  echo "Empty version provided"
fi

if [ ! -d "versioned_docs/version-$VERSION" ]
then
  yarn run docusaurus docs:version "$VERSION"
fi
