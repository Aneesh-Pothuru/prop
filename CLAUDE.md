# Property Management Platform — CLAUDE.md

Project memory for the AI-native property management platform. Read this first; defer to `docs/plan.md` for the full system plan and to `.claude/agents/*.md` for the build-time sub-agent crew.

## What this is

An AI-native property management platform for solo landlords and independent property managers (1–500 units), piloting in California. The vision is to fully replace incumbents (Buildium, AppFolio, DoorLoop, Yardi). AI agents — not a chat sidebar — do the actual work: triage tenant claims, diagnose maintenance, dispatch contractors, reconcile rent, draft notices, ensure compliance.

Four user roles: **PM**, **Owner**, **Tenant**, **Contractor**.

## Visual direction

Mercury / Ramp / Pilot — confident fintech. Deep navy + cream + brass accent, display serif + clean sans, tabular figures for money, craft-level motion (180–600ms). No sparkle emojis, no "✨ AI" badges, no chatbot bubbles. Quiet competence.

See `.claude/agents/design.md` for the full brand brief.

## Tech stack (locked recommendations)

- **Web:** Next.js 15 + React 19 + TypeScript (strict), Tailwind CSS + shadcn/ui + Radix, Framer Motion
- **Backend (CRUD):** Next.js API routes + tRPC
- **Backend (AI agents):** Python FastAPI service, Claude Agent SDK, Sonnet 4.6 default / Opus 4.7 for hard reasoning, prompt caching on
- **Database:** Postgres 16 (Neon), Drizzle ORM, Row-Level Security multi-tenant
- **Auth:** Clerk or WorkOS (multi-role)
- **Payments:** Stripe + Plaid + Stripe Connect (vendor payouts in Phase 2)
- **Comms:** Twilio (SMS), Resend (email), Pusher Channels (realtime); voice in Phase 4
- **Background jobs:** Inngest
- **Files:** Cloudflare R2
- **Hosting:** Vercel (web) + Fly.io (agent service) + Neon (DB)
- **Observability:** Sentry + Axiom + Langfuse (agent traces)
- **Testing:** Vitest + Playwright + axe-core + Lighthouse + Promptfoo (agent evals)

## Repo layout

```
apps/web              # Next.js — marketing + PM + tenant + owner + contractor
services/agents       # Python FastAPI agent service
packages/ui           # design system + components
packages/db           # Drizzle schema + RLS + seed
packages/integrations # Stripe, Plaid, Twilio, ...
packages/config       # shared tsconfig / eslint / tailwind preset
rules/ca              # YAML compliance rules
docs/                 # design, compliance, integrations, research
tests/                # e2e, a11y, compliance, agents
.claude/agents/       # build-time sub-agents
```

## Build-time sub-agents

Delegate domain work to these via the Agent tool. They live in `.claude/agents/`:

| Agent | Use when |
|---|---|
| `design` | Any UI, brand, journey, mock, landing, motion, illustration, or design-QA work |
| `compliance` | Adding/changing features that touch CA landlord-tenant law |
| `integrations` | Wiring or modifying Stripe, Plaid, Twilio, Resend, screening, e-sign, QB, voice |
| `agent-builder` | Building/modifying the runtime AI agents that ship inside the product |
| `schema` | Any data-model change — tables, columns, indexes, RLS, migrations, seed |
| `qa` | Test pyramid, E2E, visual regression, accessibility, perf, agent evals |
| `devops` | Monorepo, CI/CD, env, secrets, hosting, observability, DR |

## Runtime AI agents (the product agents that ship inside the platform)

Owned and built by `agent-builder`:

| Agent | Phase | Role |
|---|---|---|
| Triage | 1 | First responder; classifies inbound and routes |
| Maintenance Diagnosis | 1 | Socratic loop, photos+video, root-cause report |
| Rent & Ledger | 1 | Reconcile payments, late fees, arrears |
| Communications | 1 | Templated tenant/owner notices via SMS/email |
| Compliance (runtime) | 1 | Blocking guard on every relevant action |
| Knowledge | 1 | RAG over PM's docs |
| Vendor Dispatch | 2 | Source contractor, verify license, quote, schedule |
| Owner Reporting | 2 | Monthly statements + narrative performance |
| Leasing | 3 | Qualify lead, screen, draft lease, e-sign |

## Phasing

- **Phase 0** (week 1–2): foundations — monorepo, auth, DB, agent service, CI, design system v0
- **Phase 1** (week 3–10): **tenant + rent MVP** — tenant PWA (pay rent, file claim, chat), PM dashboard (claims + rent roll), Triage + Diagnosis + Ledger + Comms + Compliance + Knowledge agents
- **Phase 2** (week 11–18): vendor dispatch + owner portal
- **Phase 3** (week 19–26): leasing + screening + e-sign
- **Phase 4** (week 27+): marketplace, voice AI, commercial, STR

## Non-negotiables

1. **No sparkle emojis or `✨ AI` chrome.** Intelligence is shown via outcomes, not labels.
2. **Money is sacred.** Tabular monospace, right-aligned, `$X,XXX.XX`, no floats, no rounding, bigint cents.
3. **Multi-tenant safety.** RLS on every table. Every tool call validates `org_id`.
4. **Every agent action is reversible** within 24h. Every action writes to `audit_log` and `agent_runs`.
5. **Compliance is blocking, not warning.** The runtime Compliance Agent blocks illegal actions; override requires explicit confirmation + logged reason.
6. **Light + dark from day one.** No "dark mode coming soon."
7. **WCAG AA is P0.** Contrast and keyboard nav are merge blockers.
8. **CA-first.** Every feature is checked against the rule library before shipping.

## Common commands (post-scaffold)

```bash
pnpm install                   # install
pnpm db:up                     # start local Postgres in Docker
pnpm db:push                   # apply schema
pnpm db:seed                   # seed realistic CA data
pnpm dev                       # Next.js web on :3000
pnpm dev:agents                # FastAPI agent service on :8000
pnpm dev:jobs                  # Inngest local on :8288
pnpm test                      # unit + component
pnpm test:e2e                  # Playwright
pnpm test:a11y                 # axe-core
pnpm test:agents               # agent eval suites
pnpm test:perf                 # Lighthouse CI
```

## Pointers

- Full plan: `docs/plan.md`
- Brand brief: `.claude/agents/design.md`
- Compliance rules: `rules/ca/`
- Agent runbooks: `services/agents/<name>/runbook.md`
