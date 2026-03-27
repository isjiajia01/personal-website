#!/usr/bin/env bash
set -euo pipefail

REMOTE_HOST="oracle"
REMOTE_BUILD_DIR="deploy/personal-website-next"
REMOTE_WEB_ROOT="/var/www/personal-website"
DOCKER_IMAGE="node:20-bookworm"

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "Preparing remote build directory..."
ssh -o BatchMode=yes "${REMOTE_HOST}" "mkdir -p ~/${REMOTE_BUILD_DIR}"

echo "Syncing source files..."
scp -r "${ROOT_DIR}/app" "${REMOTE_HOST}:${REMOTE_BUILD_DIR}/"
scp -r "${ROOT_DIR}/public" "${REMOTE_HOST}:${REMOTE_BUILD_DIR}/"
scp \
  "${ROOT_DIR}/package.json" \
  "${ROOT_DIR}/package-lock.json" \
  "${ROOT_DIR}/next.config.mjs" \
  "${ROOT_DIR}/.gitignore" \
  "${REMOTE_HOST}:${REMOTE_BUILD_DIR}/"

echo "Building static export on ${REMOTE_HOST}..."
ssh -o BatchMode=yes "${REMOTE_HOST}" "
  cd ~/${REMOTE_BUILD_DIR} && \
  docker run --rm \
    --user \"\$(id -u):\$(id -g)\" \
    -e NPM_CONFIG_CACHE=/tmp/npm-cache \
    -v \"\$PWD\":/app \
    -w /app \
    ${DOCKER_IMAGE} \
    bash -lc 'npm ci && npm run build'
"

echo "Backing up current site and publishing..."
ssh -o BatchMode=yes "${REMOTE_HOST}" "
  stamp=\$(date +%Y%m%d-%H%M%S) && \
  mkdir -p ~/archive && \
  cp -a ${REMOTE_WEB_ROOT} ~/archive/personal-website-pre-next-\$stamp && \
  cd ~/${REMOTE_BUILD_DIR} && \
  cp -a out/. ${REMOTE_WEB_ROOT}/
"

echo "Verifying deployed homepage..."
ssh -o BatchMode=yes "${REMOTE_HOST}" "
  curl -I -fsS --resolve me.zhangjiajia.me:443:127.0.0.1 https://me.zhangjiajia.me/
"

echo "Done."
