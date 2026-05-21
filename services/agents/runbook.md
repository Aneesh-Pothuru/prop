# Stoa Agent Service — Runbook

FastAPI service hosting the product-runtime AI agents. Deployed to Fly.io,
called from the Next.js app via tRPC adapters.

## Local dev

```bash
cd services/agents
uv venv && source .venv/bin/activate     # or: python -m venv .venv
uv pip install -e '.[dev]'
cp .env.example .env                     # add your Anthropic key
uvicorn app.main:app --reload --port 8000
```

Open http://localhost:8000/docs for the OpenAPI explorer.

## Agents in this build

| Path | Agent | Model | Notes |
|---|---|---|---|
| `POST /v1/agent/route` | Triage | Sonnet 4.6 | Classify + route |
| `POST /v1/agent/diagnose` | Diagnosis | Sonnet 4.6 | Socratic loop |
| `POST /v1/agent/ledger` | Rent & Ledger | rule-engine | Double-entry reconcile |
| `POST /v1/agent/compliance` | Compliance | rule-engine | Blocking guard |
| `POST /v1/agent/knowledge` | Knowledge | Sonnet 4.6 | RAG over PM docs |

Dispatch, Communications, Leasing, Owner Reporting follow in Phase 2/3.

## Idempotency

Every mutating endpoint requires an `Idempotency-Key` header. We dedupe
by `(provider, idempotency_key)` in the `webhook_events` table. A second
call with the same key returns the cached response.

## Tracing

Every agent run emits a Langfuse trace. The `agent_runs` row stores the
trace id so the PM dashboard can deep-link to the full transcript.

## Cost controls

- Default model is Sonnet 4.6 with prompt caching on.
- Opus 4.7 is reserved for ambiguous Diagnosis cases (`if confidence < 0.6`).
- Per-org daily cost ceiling enforced in middleware; over-limit returns 429.

## Rule library

CA rules live in `/rules/ca/*.yaml`. Loaded once at startup. To add a
rule, write the YAML and a matching evaluator in
`app/agents/compliance.py`.

## DR

- Service is stateless; safe to redeploy at any time.
- Long-running agent runs are checkpointed in `agent_runs` so the
  frontend can resume the stream after a redeploy.
