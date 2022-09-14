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
  # DRY_RUN is the environment variable used by Updatecli 
  # to know if Updatecli is execute in DRY_RUN mode or APPLY mode
  if test "$DRY_RUN" == "true"
  then
    echo "**DRY_RUN** new version $VERSION will be created"
    exit 0
  fi

  # Install dependencies to tmp directory
  yarn install --frozen-lockfile
  yarn run docusaurus docs:version "$VERSION"
fi
