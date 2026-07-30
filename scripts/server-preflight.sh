#!/usr/bin/env sh
set -eu

echo "== System =="
uname -a
[ -f /etc/os-release ] && cat /etc/os-release

echo "== Docker =="
if command -v docker >/dev/null 2>&1; then
  docker --version
  docker compose version
else
  echo "Docker is not installed. Install Docker Engine and the Compose plugin before deployment."
  exit 1
fi

echo "== Port 80 =="
if command -v ss >/dev/null 2>&1; then
  ss -ltn | awk 'NR == 1 || /:80[[:space:]]/'
else
  echo "ss is unavailable; inspect port 80 manually."
fi

echo "== Disk =="
df -h .

echo "Preflight complete."
