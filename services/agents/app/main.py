"""Stoa Agent Service — FastAPI entrypoint.

Routes inbound events (a new tenant claim, an incoming payment webhook, a
PM command) to the right product-runtime agent and returns a structured
result. Each agent run writes to `agent_runs` and `audit_log` and emits a
trace to Langfuse.

Architecture:
    POST /v1/agent/route        # Triage Agent — first responder
    POST /v1/agent/diagnose     # Maintenance Diagnosis Agent
    POST /v1/agent/dispatch     # Vendor Dispatch Agent (phase 2)
    POST /v1/agent/ledger       # Rent & Ledger Agent
    POST /v1/agent/notify       # Communications Agent
    POST /v1/agent/compliance   # Compliance check (blocking guard)
    POST /v1/agent/knowledge    # Knowledge RAG Agent
    GET  /v1/agent/runs/{id}    # Replay a trace

Every endpoint is idempotent on `Idempotency-Key` header.

This is a scaffold — agents themselves are wired in app/agents/*.
"""

from __future__ import annotations

import os
from contextlib import asynccontextmanager
from typing import AsyncIterator

import structlog
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic_settings import BaseSettings, SettingsConfigDict

from .agents.compliance import compliance_validate
from .agents.diagnosis import diagnose_claim
from .agents.knowledge import knowledge_answer
from .agents.ledger import reconcile_payment
from .agents.triage import triage_inbound
from .schemas import (
    ComplianceCheckRequest,
    ComplianceCheckResponse,
    DiagnoseRequest,
    DiagnoseResponse,
    KnowledgeRequest,
    KnowledgeResponse,
    LedgerReconcileRequest,
    LedgerReconcileResponse,
    TriageRequest,
    TriageResponse,
)

logger = structlog.get_logger()


class Settings(BaseSettings):
    """Runtime configuration. Loaded from env."""

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    anthropic_api_key: str = ""
    database_url: str = ""
    langfuse_public_key: str = ""
    langfuse_secret_key: str = ""
    langfuse_host: str = "https://us.cloud.langfuse.com"

    model_default: str = "claude-sonnet-4-6"
    model_hard: str = "claude-opus-4-7"

    cors_origins: list[str] = ["http://localhost:3000"]


settings = Settings()


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    """App startup + shutdown. Open DB pool, load rule library."""
    logger.info("agent_service.startup", model_default=settings.model_default)
    # TODO: open asyncpg pool, load rules/ca/*.yaml into memory
    yield
    logger.info("agent_service.shutdown")


app = FastAPI(
    title="Stoa Agent Service",
    version="0.0.0",
    lifespan=lifespan,
    docs_url="/docs" if os.getenv("STOA_ENV", "dev") != "prod" else None,
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}


# ─── Triage ──────────────────────────────────────────────────────────────

@app.post("/v1/agent/route", response_model=TriageResponse)
async def route_inbound(req: TriageRequest, request: Request) -> TriageResponse:
    """First responder. Classifies the inbound, decides who handles it."""
    idem = request.headers.get("Idempotency-Key")
    if not idem:
        raise HTTPException(400, "Idempotency-Key header required")
    return await triage_inbound(req, idempotency_key=idem)


# ─── Diagnosis ───────────────────────────────────────────────────────────

@app.post("/v1/agent/diagnose", response_model=DiagnoseResponse)
async def diagnose(req: DiagnoseRequest) -> DiagnoseResponse:
    """Maintenance Diagnosis. Socratic loop with the tenant."""
    return await diagnose_claim(req)


# ─── Ledger ──────────────────────────────────────────────────────────────

@app.post("/v1/agent/ledger", response_model=LedgerReconcileResponse)
async def ledger(req: LedgerReconcileRequest) -> LedgerReconcileResponse:
    return await reconcile_payment(req)


# ─── Compliance (blocking guard) ─────────────────────────────────────────

@app.post("/v1/agent/compliance", response_model=ComplianceCheckResponse)
async def compliance(req: ComplianceCheckRequest) -> ComplianceCheckResponse:
    """Compliance guard. Returns blocking=true if a rule denies the action."""
    return await compliance_validate(req)


# ─── Knowledge (RAG) ─────────────────────────────────────────────────────

@app.post("/v1/agent/knowledge", response_model=KnowledgeResponse)
async def knowledge(req: KnowledgeRequest) -> KnowledgeResponse:
    return await knowledge_answer(req)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
