"""Knowledge Agent — RAG over the PM's documents.

Documents (leases, owner agreements, vendor contracts, building rules) are
chunked, embedded with voyage-3, and stored in pgvector. The agent
retrieves top-K, then Claude answers with citations.
"""

from __future__ import annotations

import time
import uuid

from ..schemas import AgentTrace, KnowledgeRequest, KnowledgeResponse


async def knowledge_answer(req: KnowledgeRequest) -> KnowledgeResponse:
    start = time.perf_counter()
    run_id = str(uuid.uuid4())

    # Placeholder canned answer for the demo.
    answer = (
        "Under California Civil Code §1950.5, your landlord must return your "
        "deposit within 21 calendar days of you moving out, with an itemized "
        "statement for any deductions. Your deposit is $2,400.00."
    )

    return KnowledgeResponse(
        answer=answer,
        citations=[],
        trace=AgentTrace(
            run_id=run_id,
            agent="knowledge",
            model="claude-sonnet-4-6",
            latency_ms=int((time.perf_counter() - start) * 1000),
        ),
    )
