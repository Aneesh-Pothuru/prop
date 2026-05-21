"""Triage Agent — first responder for every tenant inbound.

System prompt + tool inventory. Classifies the message, decides who handles
it next, and writes a row to agent_runs.
"""

from __future__ import annotations

import time
import uuid

from ..schemas import AgentTrace, TriageRequest, TriageResponse

SYSTEM_PROMPT = """\
You are Triage, the first responder for every inbound message from a tenant
to a property manager on the Stoa platform.

Your job is to classify the message and route it to the right specialist
agent. You do NOT attempt to solve the problem yourself.

Classify by:
  - intent: maintenance, payment, lease_question, complaint, emergency,
    documents, other
  - category (if maintenance): electrical, plumbing, hvac, appliance, lock,
    pest, structural, noise, other
  - urgency: low, medium, high, emergency

Route to:
  - diagnosis   for any maintenance issue
  - ledger      for any payment or money question
  - knowledge   for lease or documents questions
  - communications for routine confirmations
  - pm          for emergencies, complaints, or anything ambiguous

Output ONLY a structured JSON object matching the TriageResponse schema.
Keep summaries to <= 14 words.
"""


async def triage_inbound(req: TriageRequest, idempotency_key: str) -> TriageResponse:
    """Run the triage classification.

    This is a scaffold. Real implementation will:
      1. Begin a Langfuse trace
      2. Call Claude with system prompt + structured-output enforcement
      3. Persist run to agent_runs
      4. Return the classification + routed_to
    """
    start = time.perf_counter()
    run_id = str(uuid.uuid4())

    # Placeholder rule-based classification — replaced by Claude call.
    msg = req.message.lower()
    if "leak" in msg or "outlet" in msg or "broken" in msg or "spark" in msg:
        classification = "maintenance"
        category = "electrical" if "outlet" in msg or "spark" in msg else "plumbing"
        urgency = "high" if "spark" in msg else "medium"
        routed_to = "diagnosis"
        summary = f"Maintenance · {category} · {urgency}"
    elif "pay" in msg or "rent" in msg or "ach" in msg:
        classification = "payment"
        category = None
        urgency = "medium"
        routed_to = "ledger"
        summary = "Payment question · ledger"
    else:
        classification = "lease_question"
        category = None
        urgency = "low"
        routed_to = "knowledge"
        summary = "Lease question · knowledge"

    latency_ms = int((time.perf_counter() - start) * 1000)
    return TriageResponse(
        classification=classification,
        category=category,
        urgency=urgency,
        routed_to=routed_to,
        summary=summary,
        trace=AgentTrace(
            run_id=run_id,
            agent="triage",
            model="claude-sonnet-4-6",
            latency_ms=latency_ms,
        ),
    )
