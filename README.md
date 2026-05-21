# Stoa

The AI-native property management platform for California operators. Tenants pay rent, file claims, and chat with agents that triage, diagnose, dispatch, and reconcile — so PMs stop living in spreadsheets and SMS threads.

> **Status: Phase 1 (MVP) in build.** Tenant + rent surface is live in `apps/web`. Agent service is scaffolded in `services/agents`. Multi-tenant Drizzle schema in `packages/db`. California rule library in `rules/ca`.

## What's in this repo

```
prop/
├─ apps/web/                 # Next.js 15 — marketing, PM, tenant, owner, contractor
├─ services/agents/          # FastAPI — Triage, Diagnosis, Ledger, Compliance, Knowledge
├─ packages/
│  ├─ ui/                    # Design system: tokens, primitives, AI-domain components
│  └─ db/                    # Drizzle schema + RLS policies
├─ rules/ca/                 # YAML compliance rules (AB-12, AB-1482, § 1671, § 1954, § 1947.3)
├─ docs/
│  ├─ design/                # Design system, journeys, landing page, motion specs
│  └─ research/              # PM workflows, competitive teardown, CA compliance, design refs
├─ .claude/agents/           # Build-time agent definitions (design, compliance, schema, ...)
└─ tools/                    # Screenshot harness for visual review
```

## Phase 1 surfaces shipped

| Surface | Route | What it does |
|---|---|---|
| Marketing landing | `/` | Hero with scroll-pinned dashboard demo, four agent sections, compliance moat, pricing, dark Closing CTA |
| Tenant home | `/t` | Big rent card, 4-action grid, active claim with quick replies, lease summary |
| Tenant pay | `/t/pay` | Total + line items, ACH/card method picker, autopay state, payment history |
| Tenant chat | `/t/chat` | Threaded conversation with Triage→Knowledge→Ledger handoff visible |
| Tenant new claim | `/t/claims/new` | Category grid, urgency picker, multimodal description + photo + voice |
| PM dashboard | `/pm` | KPIs, claims queue, rent roll snapshot, awaiting-approval dispatch, compliance feed |
| PM claim detail | `/pm/claims/[id]` | Full thread, agent tool-call chips, AI-drafted reply, right-rail dispatch proposal |
| PM rent roll | `/pm/rent-roll` | Full lease table with payment status, methods, overdue highlighting, totals |
| Owner portal | `/owner` | Editorial header, statement narrative, AB-1482-cited renewal approval, portfolio table |

All surfaces support light + dark mode and pass WCAG AA contrast.

## Stack

**Frontend.** Next.js 15 (App Router) · React 19 · TypeScript strict · Tailwind CSS · Framer Motion · shadcn primitives via Radix.

**Backend.** Next.js API routes (CRUD) + Python FastAPI (agents) + Postgres 16 with Row-Level Security + Drizzle ORM + Inngest jobs + Cloudflare R2 files.

**AI.** Claude Sonnet 4.6 default, Opus 4.7 for hard reasoning, Claude Agent SDK orchestrator, Langfuse traces, Promptfoo evals.

**Integrations.** Stripe + Plaid (payments), Twilio (SMS + future voice), Resend (email), TransUnion SmartMove (screening · Phase 3), DocuSign (e-sign · Phase 3), QuickBooks (accounting · Phase 2).

**Hosting.** Vercel (web) + Fly.io (agents) + Neon (DB).

## Local dev

```bash
pnpm install
pnpm dev                          # Next.js on :3000
# In another shell:
cd services/agents
uv pip install -e '.[dev]'
uvicorn app.main:app --reload --port 8000
```

Screenshots: `node tools/screenshot.mjs http://localhost:3000/ .screens landing`.

## Non-negotiables

1. **No sparkle emojis, no "✨ AI" badges, no chatbot bubbles.** Intelligence shows up in outcomes.
2. **Money is bigint cents.** Never floats. Right-aligned tabular monospace.
3. **Multi-tenant RLS on every table.** Every tool call validates `org_id`.
4. **Every agent action is reversible** within 24h. Every action writes to `audit_log` and `agent_runs`.
5. **Compliance is blocking, not warning.** The runtime Compliance Agent blocks illegal actions; override requires explicit confirmation + logged reason.
6. **Light + dark from day one.** No "dark mode coming soon."
7. **WCAG AA is P0.** Contrast and keyboard nav are merge blockers.
8. **CA-first.** Every feature is checked against the rule library before shipping.

## The sub-agent crew

Build-time agents in `.claude/agents/`:

| Agent | Owns |
|---|---|
| `design` | Design system, journeys, mocks, landing, motion |
| `compliance` | CA legal rules library, runtime Compliance Agent data |
| `schema` | Drizzle schema, RLS, migrations, seed |
| `integrations` | Stripe / Plaid / Twilio / Resend / TransUnion / DocuSign |
| `agent-builder` | Runtime AI agents (Triage, Diagnosis, Ledger, etc.) |
| `qa` | E2E + agent evals + a11y + perf gates |
| `devops` | CI/CD, env, secrets, hosting, observability |

Communication topology in `.claude/agents/_collaboration.md`.

## Research

Before building, three deep-research passes were run and saved to `docs/research/`:
1. **PM workflows** — full lifecycle inventory, daily/weekly cadence, AI-opportunity ranking
2. **Competitive teardown** — Buildium, AppFolio, DoorLoop, MagicDoor, AI-native challengers
3. **California compliance** — statute-by-statute map with product implications
4. **Design references** — Mercury, Ramp, Pilot, Linear, Stripe pattern mining

Plus a journey-map and landing-page spec in `docs/design/`.
