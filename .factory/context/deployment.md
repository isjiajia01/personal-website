# Deployment Notes

## Production deployment paths

### 1. GitHub Actions

Workflow:

- `.github/workflows/deploy.yml`

Behavior:

- checks out the repo
- temporarily opens Oracle SSH access for the GitHub runner through OCI
- uploads project files to the remote build directory
- runs remote build/publish
- verifies the public site
- revokes the temporary OCI rule

### 2. Local SSH deploy

Script:

- `scripts/deploy-via-ssh.sh`

Behavior:

- uploads the project over SSH/SCP
- runs `scripts/deploy-static-on-remote.sh` remotely
- verifies the public site with `curl`

## Important operational detail

Direct local SSH deploys can fail if the current public IP is not allowlisted in Oracle security rules.

Existing helper discovered in the broader workspace:

- `/Users/zhangjiajia/Library/Mobile Documents/com~apple~CloudDocs/Life OS/00-09 Core/04.00 Agent Memory/ops/oracle/update-oracle-ssh-ip.sh`

## Remote publish model

- remote host builds the Next static export inside Docker
- published files are synced from `out/` into `/var/www/personal-website`
- site is served by Caddy
