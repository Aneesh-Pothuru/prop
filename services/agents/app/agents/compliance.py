"""Compliance Agent — runtime guard on every legal-relevant action.

Loads YAML rules from rules/ca/*.yaml and evaluates them against the
action payload. Returns blocking=True if any rule denies the action.
"""

from __future__ import annotations

import time
import uuid
from pathlib import Path
from typing import Any

import yaml

from ..schemas import (
    AgentTrace,
    ComplianceCheckRequest,
    ComplianceCheckResponse,
    ComplianceRuleResult,
)

RULES_DIR = Path(__file__).resolve().parents[3] / "rules" / "ca"


def load_rules() -> list[dict[str, Any]]:
    """Load all YAML rule files. Cached at module init."""
    rules = []
    if not RULES_DIR.exists():
        return rules
    for path in sorted(RULES_DIR.glob("*.yaml")):
        with path.open() as f:
            rules.append(yaml.safe_load(f))
    return rules


_RULES = load_rules()


def _rule_applies(rule: dict[str, Any], action: str) -> bool:
    applies = rule.get("applies_to", [])
    return action in applies or any(action.startswith(a.rstrip("*")) for a in applies if a.endswith("*"))


def _evaluate_ab_12(rule: dict[str, Any], payload: dict[str, Any]) -> ComplianceRuleResult:
    rent = payload.get("monthly_rent_cents", 0)
    deposit = payload.get("deposit_cents", 0)
    small_landlord_exempt = (
        payload.get("owner_is_natural_person", False)
        and not payload.get("tenant_is_service_member", False)
        and payload.get("owner_property_count_residential", 0) <= 2
        and payload.get("owner_unit_count_total", 0) <= 4
    )
    cap = 2 * rent if small_landlord_exempt else 1 * rent
    passes = deposit <= cap
    reason = None if passes else (
        f"Deposit ${deposit/100:,.2f} exceeds the "
        f"{'2× ' if small_landlord_exempt else ''}1-month cap of ${cap/100:,.2f}."
    )
    return ComplianceRuleResult(
        rule_id=rule["id"],
        citation=rule["citation"],
        passes=passes,
        blocked=(not passes) and rule.get("severity") == "blocking",
        reason=reason,
    )


def _evaluate_ab_1482(rule: dict[str, Any], payload: dict[str, Any]) -> ComplianceRuleResult:
    current = payload.get("current_rent_cents", 0)
    proposed = payload.get("proposed_rent_cents", 0)
    if current == 0:
        return ComplianceRuleResult(
            rule_id=rule["id"], citation=rule["citation"], passes=True, blocked=False
        )
    # Default CPI 3.0 → cap 8.0%. In production this is jurisdiction-keyed.
    cpi = 0.030
    cap = min(0.05 + cpi, 0.10)
    increase = (proposed - current) / current
    passes = increase <= cap + 1e-6
    reason = None if passes else (
        f"Proposed increase of {increase*100:.1f}% exceeds AB-1482 cap of {cap*100:.1f}%."
    )
    return ComplianceRuleResult(
        rule_id=rule["id"],
        citation=rule["citation"],
        passes=passes,
        blocked=(not passes) and rule.get("severity") == "blocking",
        reason=reason,
    )


_EVALUATORS = {
    "ab-12.deposit-cap": _evaluate_ab_12,
    "ab-1482.rent-cap": _evaluate_ab_1482,
}


async def compliance_validate(req: ComplianceCheckRequest) -> ComplianceCheckResponse:
    start = time.perf_counter()
    run_id = str(uuid.uuid4())

    results: list[ComplianceRuleResult] = []
    for rule in _RULES:
        if not _rule_applies(rule, req.action):
            continue
        evaluator = _EVALUATORS.get(rule["id"])
        if evaluator is None:
            continue  # rule has no concrete evaluator yet — skip silently
        results.append(evaluator(rule, req.subject_payload))

    blocking = any(r.blocked for r in results)
    passes = all(r.passes for r in results)

    return ComplianceCheckResponse(
        passes=passes,
        blocking=blocking,
        rules_evaluated=results,
        trace=AgentTrace(
            run_id=run_id,
            agent="compliance",
            model="rule-engine",
            latency_ms=int((time.perf_counter() - start) * 1000),
        ),
    )
