#!/usr/bin/env bash
set -euo pipefail

# One-click frontend deployment script
# - Sync local code to server
# - Rebuild/restart frontend container only
# - Keep backend data volumes untouched

HOST="1.13.254.94"
USER="root"
PASSWORD='c3_Y+S-@%(GwD2b'
REMOTE_DIR="/root/fhzb-1400"

# Set to 1 if you also changed nginx config and need gateway rebuild
REBUILD_GATEWAY="${REBUILD_GATEWAY:-0}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

if ! command -v rsync >/dev/null 2>&1; then
  echo "Error: rsync is required. Install it first."
  exit 1
fi

SSH_OPTS="-o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null"

HAS_SSHPASS=0
if command -v sshpass >/dev/null 2>&1; then
  HAS_SSHPASS=1
fi

run_ssh() {
  if [[ "$HAS_SSHPASS" == "1" ]]; then
    sshpass -p "$PASSWORD" ssh $SSH_OPTS "$USER@$HOST" "$1"
  else
    ssh $SSH_OPTS "$USER@$HOST" "$1"
  fi
}

run_rsync() {
  if [[ "$HAS_SSHPASS" == "1" ]]; then
    sshpass -p "$PASSWORD" rsync -az --delete -e "ssh $SSH_OPTS" "$@"
  else
    rsync -az --delete -e "ssh $SSH_OPTS" "$@"
  fi
}

if [[ "$HAS_SSHPASS" == "0" ]]; then
  echo "Info: sshpass not found. Will use interactive ssh/scp password prompts."
fi

cd "$PROJECT_ROOT"

echo "==> 1/4 Testing SSH connection"
run_ssh "echo 'SSH connected: ' \$(hostname)"

echo "==> 2/4 Preparing remote directory: $REMOTE_DIR"
run_ssh "mkdir -p '$REMOTE_DIR'"

echo "==> 3/4 Syncing project files to server"
run_rsync \
  --exclude ".git" \
  --exclude ".github" \
  --exclude "node_modules" \
  --exclude ".next" \
  --exclude ".DS_Store" \
  --exclude "npm-debug.log*" \
  --exclude "yarn-error.log*" \
  --exclude "pnpm-debug.log*" \
  --exclude "server/database.sqlite" \
  --exclude "server/uploads" \
  ./ "$USER@$HOST:$REMOTE_DIR/"

echo "==> 4/4 Deploying frontend containers (no data-volume removal)"
if [[ "$REBUILD_GATEWAY" == "1" ]]; then
  run_ssh "cd '$REMOTE_DIR' && docker compose up -d --build app gateway"
else
  run_ssh "cd '$REMOTE_DIR' && docker compose up -d --build app"
fi

echo
echo "Deploy complete."
echo "Tip: check status with:"
echo "  ssh $USER@$HOST \"cd '$REMOTE_DIR' && docker compose ps\""
echo "  ssh $USER@$HOST \"cd '$REMOTE_DIR' && docker compose logs --tail=100 app\""
echo
echo "Safety note: this script never runs 'docker compose down -v'."
