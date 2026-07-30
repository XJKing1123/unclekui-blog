#!/usr/bin/env sh
set -eu

SITE_URL=${SITE_URL:-http://localhost}
BLOG_PORT=${BLOG_PORT:-80}
export SITE_URL BLOG_PORT

mkdir -p .deploy

if docker image inspect flutter-field-notes:latest >/dev/null 2>&1; then
  docker image tag flutter-field-notes:latest flutter-field-notes:previous
  echo "Previous image tagged as flutter-field-notes:previous"
fi

docker compose build --pull
docker compose up -d --force-recreate

attempt=0
until curl -fsS "http://127.0.0.1:${BLOG_PORT}/healthz" >/dev/null; do
  attempt=$((attempt + 1))
  if [ "$attempt" -ge 20 ]; then
    echo "Health check failed. Run scripts/rollback.sh if a previous image exists."
    docker compose logs --tail=100
    exit 1
  fi
  sleep 1
done

echo "Deployment healthy at ${SITE_URL}"
