"""Pydantic schemas for the agent service request/response contracts.

Every agent endpoint accepts and returns a typed model. The frontend
consumes these via the FastAPI OpenAPI spec.
"""

from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, Field


# ─── Common ──────────────────────────────────────────────────────────────

class AgentTrace(BaseModel):
    """Per-run trace metadata returned with every agent response."""

    run_id: str
    agent: str
    model: str
    latency_ms: int
    cost_usd_microcents: int = 0
    langfuse_trace_id: str | None = None
    tool_calls: list[ToolCall] = Field(default_factory=list)


class ToolCall(BaseModel):
    name: str
    args: dict
    result: dict | None = None
    latency_ms: int
    error: str | None = None


# ─── Triage ──────────────────────────────────────────────────────────────

class TriageRequest(BaseModel):
    org_id: str
    tenant_user_id: str
    lease_id: str
    message: str
    channel: Literal["chat", "sms", "email", "voice"]
    media_urls: list[str] = Field(default_factory=list)


class TriageResponse(BaseModel):
    classification: Literal[
        "maintenance",
        "payment",
        "lease_question",
        "complaint",
        "emergency",
        "documents",
        "other",
    ]
    category: str | None = None  # e.g. "electrical"
    urgency: Literal["low", "medium", "high", "emergency"]
    routed_to: Literal[
        "diagnosis", "ledger", "knowledge", "communications", "pm"
    ]
    summary: str
    trace: AgentTrace


# ─── Diagnosis ───────────────────────────────────────────────────────────

class DiagnoseRequest(BaseModel):
    org_id: str
    claim_id: str
    last_tenant_message: str
    media_urls: list[str] = Field(default_factory=list)
    conversation_history: list[dict] = Field(default_factory=list)


class DiagnoseResponse(BaseModel):
    next_message: str
    likely_root_cause: str | None = None
    suggested_path: Literal["self_resolve", "schedule_visit", "escalate_emergency"] | None = None
    cost_band_low_cents: int | None = None
    cost_band_high_cents: int | None = None
    civil_code_cites: list[str] = Field(default_factory=list)
    trace: AgentTrace


# ─── Ledger ──────────────────────────────────────────────────────────────

class LedgerReconcileRequest(BaseModel):
    org_id: str
    payment_id: str
    lease_id: str
    amount_cents: int
    received_at: str  # ISO timestamp


class LedgerReconcileResponse(BaseModel):
    matched_invoice_id: str | None = None
    late_fee_cents: int = 0
    arrears_after_cents: int = 0
    posted_entries: list[str] = Field(default_factory=list)
    trace: AgentTrace


# ─── Compliance ──────────────────────────────────────────────────────────

class ComplianceCheckRequest(BaseModel):
    org_id: str
    action: str  # "lease.draft", "rent.increase", "deposit.set", "notice.send", "entry.schedule"
    subject_id: str
    subject_payload: dict
    jurisdiction_city: str | None = None


class ComplianceCheckResponse(BaseModel):
    passes: bool
    blocking: bool
    rules_evaluated: list[ComplianceRuleResult] = Field(default_factory=list)
    trace: AgentTrace


class ComplianceRuleResult(BaseModel):
    rule_id: str
    citation: str
    passes: bool
    blocked: bool
    reason: str | None = None


# ─── Knowledge ───────────────────────────────────────────────────────────

class KnowledgeRequest(BaseModel):
    org_id: str
    user_id: str
    role: Literal["pm", "owner", "tenant", "contractor"]
    question: str
    context_doc_ids: list[str] = Field(default_factory=list)


class KnowledgeResponse(BaseModel):
    answer: str
    citations: list[KnowledgeCitation] = Field(default_factory=list)
    trace: AgentTrace


class KnowledgeCitation(BaseModel):
    doc_id: str
    excerpt: str
    page: int | None = None
