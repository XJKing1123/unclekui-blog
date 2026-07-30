#!/usr/bin/env sh
set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
PROJECT_DIR=$(dirname "$SCRIPT_DIR")
cd "$PROJECT_DIR"

mkdir -p .deploy
LOCK_DIR=.deploy/server-deploy.lock
if ! mkdir "$LOCK_DIR" 2>/dev/null; then
  echo "Another deployment is already running: $PROJECT_DIR/$LOCK_DIR"
  exit 1
fi
trap 'rmdir "$LOCK_DIR" 2>/dev/null || true' 0 HUP INT TERM

for command_name in git docker curl; do
  if ! command -v "$command_name" >/dev/null 2>&1; then
    echo "Required command is unavailable: $command_name"
    exit 1
  fi
done

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Not a Git repository: $PROJECT_DIR"
  exit 1
fi

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Tracked files have local changes. Commit or restore them before deploying."
  git status --short
  exit 1
fi

if [ ! -f .env ]; then
  echo "Missing $PROJECT_DIR/.env"
  echo "Create it with SITE_URL=https://www.unclekui.site and BLOG_PORT=8080."
  exit 1
fi

set -a
# The server-owned .env supplies deployment settings and is excluded from Git.
. ./.env
set +a

: "${SITE_URL:?SITE_URL is required in .env}"
BLOG_PORT=${BLOG_PORT:-8080}
export SITE_URL BLOG_PORT

DEPLOY_REMOTE=${DEPLOY_REMOTE:-origin}
DEPLOY_BRANCH=${DEPLOY_BRANCH:-main}

echo "Fetching $DEPLOY_REMOTE/$DEPLOY_BRANCH..."
git fetch --prune "$DEPLOY_REMOTE" "$DEPLOY_BRANCH"
git merge --ff-only "$DEPLOY_REMOTE/$DEPLOY_BRANCH"

echo "Deploying $(git rev-parse --short HEAD) to $SITE_URL..."
sh scripts/deploy.sh

echo "Verifying local container..."
curl -fsS "http://127.0.0.1:$BLOG_PORT/healthz" >/dev/null

echo "Deployment complete: $SITE_URL ($(git rev-parse --short HEAD))"
