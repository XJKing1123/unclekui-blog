#!/usr/bin/env sh
set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
PROJECT_DIR=$(dirname "$SCRIPT_DIR")
cd "$PROJECT_DIR"

ARCHIVE_NAME=${DEPLOY_ARCHIVE_NAME:-flutter-blog-deploy.tar.gz}
mkdir -p .deploy
TEMP_ARCHIVE=$(mktemp ".deploy/${ARCHIVE_NAME}.XXXXXX")
trap 'rm -f "$TEMP_ARCHIVE"' 0 HUP INT TERM

for required_path in \
  Dockerfile \
  docker-compose.yml \
  .dockerignore \
  package.json \
  pnpm-lock.yaml \
  pnpm-workspace.yaml \
  astro.config.mjs \
  tsconfig.json \
  README.md \
  articles \
  src \
  public \
  nginx \
  scripts
do
  if [ ! -e "$required_path" ]; then
    echo "Missing deployment input: $required_path"
    exit 1
  fi
done

tar -czf "$TEMP_ARCHIVE" \
  Dockerfile \
  docker-compose.yml \
  .dockerignore \
  package.json \
  pnpm-lock.yaml \
  pnpm-workspace.yaml \
  astro.config.mjs \
  tsconfig.json \
  README.md \
  articles \
  src \
  public \
  nginx \
  scripts

mv "$TEMP_ARCHIVE" "$ARCHIVE_NAME"
chmod 644 "$ARCHIVE_NAME"
trap - 0 HUP INT TERM

echo "Deployment archive created: $PROJECT_DIR/$ARCHIVE_NAME"
