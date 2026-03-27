#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  oci-temporary-ssh-rule.sh allow
  oci-temporary-ssh-rule.sh revoke

Required environment for `allow`:
  OCI_SSH_NSG_ID
  RUNNER_CIDR
  RULE_DESCRIPTION
Optional environment for `allow`:
  SSH_PORT (defaults to 22)

Required environment for `revoke`:
  OCI_SSH_NSG_ID
  RULE_ID
EOF
}

command="${1:-}"

if [[ -z "$command" ]]; then
  usage
  exit 1
fi

case "$command" in
  allow)
    : "${OCI_SSH_NSG_ID:?Missing OCI_SSH_NSG_ID}"
    : "${RUNNER_CIDR:?Missing RUNNER_CIDR}"
    : "${RULE_DESCRIPTION:?Missing RULE_DESCRIPTION}"
    ssh_port="${SSH_PORT:-22}"

    payload="$(
      jq -nc \
        --arg cidr "$RUNNER_CIDR" \
        --arg description "$RULE_DESCRIPTION" \
        --argjson port "$ssh_port" \
        '[
          {
            direction: "INGRESS",
            protocol: "6",
            isStateless: false,
            source: $cidr,
            sourceType: "CIDR_BLOCK",
            tcpOptions: {
              destinationPortRange: {
                min: $port,
                max: $port
              }
            },
            description: $description
          }
        ]'
    )"

    response="$(oci network nsg rules add --nsg-id "$OCI_SSH_NSG_ID" --security-rules "$payload")"
    rule_id="$(printf '%s' "$response" | jq -r '.data["security-rules"][0].id')"

    if [[ -z "$rule_id" || "$rule_id" == "null" ]]; then
      echo "Failed to resolve rule id from OCI response" >&2
      exit 1
    fi

    jq -nc --arg ruleId "$rule_id" --arg cidr "$RUNNER_CIDR" --arg description "$RULE_DESCRIPTION" \
      '{ruleId: $ruleId, cidr: $cidr, description: $description}'
    ;;
  revoke)
    : "${OCI_SSH_NSG_ID:?Missing OCI_SSH_NSG_ID}"
    : "${RULE_ID:?Missing RULE_ID}"

    ids="$(jq -nc --arg id "$RULE_ID" '[ $id ]')"
    oci network nsg rules remove --nsg-id "$OCI_SSH_NSG_ID" --security-rule-ids "$ids" >/dev/null
    ;;
  *)
    usage
    exit 1
    ;;
esac
