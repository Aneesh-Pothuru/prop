"""Maintenance Diagnosis Agent — Socratic loop with the tenant.

System prompt and tool list. Asks 1-4 questions, optionally requests a
photo or video, cites § 1941.1 habitability when responsibility matters,
and proposes a path (self-resolve, schedule, or escalate).
"""

from __future__ import annotations

import time
import uuid

from ..schemas import AgentTrace, DiagnoseRequest, DiagnoseResponse

SYSTEM_PROMPT = """\
You are Diagnosis, the maintenance specialist for the Stoa property
management platform. Your job is to figure out what's going on in a
tenant's home, ask the minimum number of clarifying questions, and
either:
  (a) help the tenant resolve it themselves (GFCI reset, breaker, etc.),
  (b) propose a scheduled visit with a cost band, or
  (c) escalate as an emergency (gas, fire, flooding, no heat in winter).

You may use these tools:
  - request_media(reason): ask for a photo or video
  - lookup_lease_responsibilities(lease_id): see who pays for what
  - cite_civil_code_1941(): habitability obligations
  - propose_remediation(option_set): produce a final recommendation
  - flag_for_pm(reason): escalate to the property manager

Voice: short, plain, kind. Never alarm a tenant unnecessarily. Never
promise outcomes you can't keep. If you don't know, say so and escalate.
"""

TOOLS = [
    {
        "name": "request_media",
        "description": "Ask the tenant for a photo or video to clarify the issue.",
        "input_schema": {
            "type": "object",
            "properties": {"reason": {"type": "string"}},
            "required": ["reason"],
        },
    },
    {
        "name": "lookup_lease_responsibilities",
        "description": "Look up who is responsible for fixing what in this lease.",
        "input_schema": {
            "type": "object",
            "properties": {"lease_id": {"type": "string"}},
            "required": ["lease_id"],
        },
    },
    {
        "name": "cite_civil_code_1941",
        "description": "Return the plain-English summary of § 1941.1 habitability.",
        "input_schema": {"type": "object", "properties": {}},
    },
    {
        "name": "propose_remediation",
        "description": "Propose a final path (self_resolve | schedule_visit | escalate_emergency).",
        "input_schema": {
            "type": "object",
            "properties": {
                "path": {"type": "string"},
                "summary": {"type": "string"},
                "cost_band_low_cents": {"type": "integer"},
                "cost_band_high_cents": {"type": "integer"},
            },
            "required": ["path", "summary"],
        },
    },
    {
        "name": "flag_for_pm",
        "description": "Escalate this conversation for PM attention.",
        "input_schema": {
            "type": "object",
            "properties": {"reason": {"type": "string"}},
            "required": ["reason"],
        },
    },
]


async def diagnose_claim(req: DiagnoseRequest) -> DiagnoseResponse:
    """Run one turn of diagnosis. Real implementation streams tokens."""
    start = time.perf_counter()
    run_id = str(uuid.uuid4())

    # Placeholder response. Real implementation calls Claude with TOOLS.
    msg = req.last_tenant_message.lower()
    if "red" in msg and "button" in msg:
        next_msg = (
            "That fixed it — the GFCI is doing its job. I'd recommend a "
            "licensed electrician check the outlet within 30 days for peace "
            "of mind. I've logged this and flagged it for your PM."
        )
        path = "self_resolve"
        low, high = 15000, 25000
    elif "spark" in msg or "outlet" in msg:
        next_msg = (
            "Sounds like the GFCI tripped from a high-draw appliance. Before "
            "I send anyone out — can you look at the outlet face? Is there a "
            "red or black button between the two sockets?"
        )
        path = None
        low, high = None, None
    else:
        next_msg = "Tell me a little more — when did this start?"
        path = None
        low, high = None, None

    latency_ms = int((time.perf_counter() - start) * 1000)
    return DiagnoseResponse(
        next_message=next_msg,
        suggested_path=path,
        cost_band_low_cents=low,
        cost_band_high_cents=high,
        civil_code_cites=["Civ. § 1941.1"],
        trace=AgentTrace(
            run_id=run_id,
            agent="diagnosis",
            model="claude-sonnet-4-6",
            latency_ms=latency_ms,
        ),
    )
