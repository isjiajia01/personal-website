#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

REMOTE_HOST="${REMOTE_HOST:-oracle}"
REMOTE_PORT="${REMOTE_PORT:-22}"
REMOTE_BUILD_DIR="${REMOTE_BUILD_DIR:-deploy/personal-website-next}"
REMOTE_WEB_ROOT="${REMOTE_WEB_ROOT:-/var/www/personal-website}"
SITE_HOST="${SITE_HOST:-me.zhangjiajia.me}"
DOCKER_IMAGE="${DOCKER_IMAGE:-node:20-bookworm}"
SSH_COMMON_OPTS=(-o BatchMode=yes)

echo "Preparing remote build directory on ${REMOTE_HOST}..."
ssh -p "${REMOTE_PORT}" "${SSH_COMMON_OPTS[@]}" "${REMOTE_HOST}" "mkdir -p ~/${REMOTE_BUILD_DIR}/scripts"

echo "Syncing source files to ${REMOTE_HOST}..."
scp -P "${REMOTE_PORT}" "${SSH_COMMON_OPTS[@]}" -r \
  "${ROOT_DIR}/app" \
  "${ROOT_DIR}/public" \
  "${REMOTE_HOST}:${REMOTE_BUILD_DIR}/"

scp -P "${REMOTE_PORT}" "${SSH_COMMON_OPTS[@]}" \
  "${ROOT_DIR}/package.json" \
  "${ROOT_DIR}/package-lock.json" \
  "${ROOT_DIR}/next.config.mjs" \
  "${ROOT_DIR}/.gitignore" \
  "${ROOT_DIR}/scripts/deploy-static-on-remote.sh" \
  "${REMOTE_HOST}:${REMOTE_BUILD_DIR}/"

echo "Building and publishing on ${REMOTE_HOST}..."
ssh -p "${REMOTE_PORT}" "${SSH_COMMON_OPTS[@]}" "${REMOTE_HOST}" \
  "chmod +x ~/${REMOTE_BUILD_DIR}/deploy-static-on-remote.sh && \
   REMOTE_BUILD_DIR='${REMOTE_BUILD_DIR}' \
   REMOTE_WEB_ROOT='${REMOTE_WEB_ROOT}' \
   SITE_HOST='${SITE_HOST}' \
   DOCKER_IMAGE='${DOCKER_IMAGE}' \
   bash ~/${REMOTE_BUILD_DIR}/deploy-static-on-remote.sh"

echo "Verifying public site..."
curl -I -fsS "https://${SITE_HOST}/"

echo "Deployment finished."
