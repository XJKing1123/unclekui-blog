#!/usr/bin/env sh
set -eu

if ! docker image inspect flutter-field-notes:previous >/dev/null 2>&1; then
  echo "No previous image is available."
  exit 1
fi

docker compose down
docker image tag flutter-field-notes:previous flutter-field-notes:latest
IMAGE_TAG=latest docker compose up -d --no-build --force-recreate
echo "Rolled back to flutter-field-notes:previous"
