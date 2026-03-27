# Deployment

This repository now deploys through GitHub Actions instead of local SSH from a developer machine.

## Model

The workflow in `.github/workflows/deploy.yml` uses this sequence:

1. Build context is checked out on a GitHub-hosted runner.
2. The runner discovers its current public IPv4 address.
3. OCI CLI adds a temporary ingress rule to the configured Network Security Group for `runner_ip/32` on the SSH port.
4. The workflow connects over SSH, uploads the site source, and runs the remote build/publish script.
5. The workflow verifies the site over HTTPS.
6. The temporary OCI rule is removed in an `always()` cleanup step.

This keeps the current safety model tighter than allowing the full GitHub Actions IP list.

## Required GitHub Secrets

Repository or environment secrets:

- `DEPLOY_HOST`: public hostname or IP of the target instance
- `DEPLOY_USER`: SSH user on the target instance
- `DEPLOY_PORT`: optional, defaults to `22`
- `DEPLOY_SITE_HOST`: optional, defaults to `me.zhangjiajia.me`
- `DEPLOY_REMOTE_BUILD_DIR`: optional, defaults to `deploy/personal-website-next`
- `DEPLOY_REMOTE_WEB_ROOT`: optional, defaults to `/var/www/personal-website`
- `DEPLOY_SSH_PRIVATE_KEY`: private SSH deploy key for `DEPLOY_USER`
- `DEPLOY_KNOWN_HOSTS`: pinned `known_hosts` entry for the target host
- `OCI_SSH_NSG_ID`: OCID of the NSG attached to the instance VNIC that controls SSH ingress
- `OCI_CLI_TENANCY_OCID`: OCI tenancy OCID
- `OCI_CLI_USER_OCID`: OCI user OCID
- `OCI_CLI_FINGERPRINT`: API signing key fingerprint for the OCI user
- `OCI_CLI_REGION`: OCI region, for example `eu-frankfurt-1`
- `OCI_CLI_PRIVATE_KEY`: OCI API private key in PEM format

## OCI IAM

The OCI user behind the API key needs permission to manage security rules on the target NSG. A minimal policy shape is:

```text
Allow group <group-name> to manage network-security-groups in compartment <compartment-name>
```

If the instance, VCN, or NSG live in a narrower compartment hierarchy, scope the policy there instead of using a broader compartment.

## Server prerequisites

The target instance should already have:

- Docker installed and runnable by `DEPLOY_USER`
- `rsync`
- `curl`
- the web root path created or creatable by `DEPLOY_USER`
- an NSG attached to the instance VNIC that governs SSH ingress

If the instance OS firewall also restricts SSH, mirror the same rule there or leave SSH open only inside the VCN and expose it another controlled way.

## Notes

- The workflow currently deploys on pushes to `main` or `master`, and also supports manual runs via `workflow_dispatch`.
- If your default branch is different, update `.github/workflows/deploy.yml`.
- This setup avoids the older `scripts/deploy-via-oracle.sh` path.
