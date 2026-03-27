#!/usr/bin/env bash
set -euo pipefail

: "${REMOTE_BUILD_DIR:?Missing REMOTE_BUILD_DIR}"
: "${REMOTE_WEB_ROOT:?Missing REMOTE_WEB_ROOT}"

SITE_HOST="${SITE_HOST:-me.zhangjiajia.me}"
DOCKER_IMAGE="${DOCKER_IMAGE:-node:20-bookworm}"

build_dir="${HOME}/${REMOTE_BUILD_DIR}"
archive_dir="${HOME}/archive"
stamp="$(date +%Y%m%d-%H%M%S)"

mkdir -p "$build_dir" "$archive_dir" "$REMOTE_WEB_ROOT"

cd "$build_dir"

docker run --rm \
  --user "$(id -u):$(id -g)" \
  -e NPM_CONFIG_CACHE=/tmp/npm-cache \
  -v "$PWD":/app \
  -w /app \
  "$DOCKER_IMAGE" \
  bash -lc 'npm ci && npm run build'

if [[ -d "$REMOTE_WEB_ROOT" ]]; then
  cp -a "$REMOTE_WEB_ROOT" "${archive_dir}/personal-website-pre-gha-${stamp}"
fi

rsync -a --delete out/ "${REMOTE_WEB_ROOT}/"

curl -I -fsS --resolve "${SITE_HOST}:443:127.0.0.1" "https://${SITE_HOST}/"
