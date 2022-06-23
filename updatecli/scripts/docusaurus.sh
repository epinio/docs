#!/bin/sh

set -eux

# Testing that we can run yarn command from the GitHub Runner
yarn --help > /dev/null

VERSION="$1"
if [ -z "$VERSION" ]
then
  echo "Empty version provided"
fi

if [ ! -d "versioned_docs/version-$VERSION" ]
then
  # Install dependencies to tmp directory
  yarn install --frozen-lockfile
  yarn run docusaurus docs:version "$VERSION"
fi
