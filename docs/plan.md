# Plan: AI-Native Property Management Platform

## Context

The user is building an **AI-native property management platform** for solo landlords and independent property management companies (1–500 units), starting with a **California pilot**. The vision is to eventually replace incumbents (Buildium, AppFolio, DoorLoop, Yardi) — not be a thin AI skin on top of them. "AI-native" is the differentiator: not a marketing line, but the connective tissue of every workflow.

The flagship workflow that defines the product:
> A tenant files a maintenance claim (e.g., electrical issue) → AI agent triages it, asks follow-up questions with photos/video, attempts remote troubleshooting → if unresolved, autonomously sources a vetted local contractor, schedules, and dispatches with a PM approval gate → contractor completes work → AI reconciles invoice → tenant rates outcome → the entire trail is logged and ledger-reconciled.

The same agentic pattern applies across **maintenance, communications, leasing, and finance**.

### Four user roles
| Role | Primary surface | What they do |
|---|---|---|
| **Property Manager (PM)** | PM Dashboard (web) | Operates portfolio, approves AI actions, handles exceptions |
| **Owner** | Owner Portal (web) | Sees statements, approves large expenses, reviews performance |
| **Tenant** | Tenant PWA (mobile-first web) | Pays rent, files claims, chats with AI, gets notices |
| **Contractor** | Contractor mini-app (web + SMS) | Receives dispatched jobs, sends quotes, marks complete |

### Locked decisions
| Dimension | Decision |
|---|---|
| Target segment | Solo landlords + independent PMs (1–500 units) |
| Property types | SFR + multi-family priority in v1; commercial + STR roadmap |
| Geography | US — California pilot |
| Positioning | Full PM-suite replacement, AI-native ground-up |
| AI agent model | AI attempts resolution first, escalates to human (contractor / PM) |
| Agent powers (full vision) | Maintenance, comms (SMS+chat now, voice v2), leasing, finance |
| Tenant surface | Mobile-first responsive PWA |
| Owner | Full portal |
| Vendor network | Hybrid — PM's own vendors + curated CA marketplace fallback |
| Voice AI | Skip v1, add v2 |
| Pricing | Free tier + paid upgrades (PLG) |
| **MVP scope (Phase 1)** | **Tenant experience + rent collection only** — tenant PWA (pay rent, file claim, chat with AI), PM dashboard for rent + claims. No dispatch, no leasing, no owner portal yet. |
| Visual direction | Mercury / Ramp confident-fintech; craft-level polished motion; parallel marketing + product + design system |

---

## Recommended technology choices

(Final recommendations — the user delegated these. Will revisit after web research returns.)

| Layer | Pick | Why |
|---|---|---|
| Frontend | **Next.js 15 + React 19 + TypeScript** | One stack across PM dashboard, tenant PWA, owner portal, marketing site. App Router + RSC for fast loads. |
| Styling | **Tailwind CSS + shadcn/ui + Radix primitives** | Design-system fit, fast iteration, accessible by default. |
| Motion | **Framer Motion + Motion One** | Craft-level transitions; SSR-safe. |
| Backend (CRUD) | **Next.js API routes + tRPC** | Type-safe end-to-end, fast to ship MVP. |
| Backend (Agents) | **Python FastAPI** service, deployed separately | LLM/agent workflows live here; isolated scaling and observability. Communicates over signed HTTP + webhooks. |
| Agent framework | **Claude Agent SDK** (Anthropic), Claude Sonnet 4.6 as default, Opus 4.7 for hard reasoning | Native tool-use, sub-agent spawning, prompt caching. |
| Database | **Postgres 16** (Neon or Supabase) with **Row-Level Security** for multi-tenant isolation | Battle-tested. RLS is the right primitive when one row's owner matters legally. |
| ORM | **Drizzle ORM** | Type-safe, SQL-first, plays well with edge runtimes. |
| Auth | **Clerk** (orgs + invites) or **WorkOS** (better for owner/tenant role split) | Multi-role auth + B2B SSO without rebuild later. |
| Payments | **Stripe** (cards, ACH) + **Plaid** (bank link, balance check) + **Stripe Connect** for vendor payouts | ACH cap ~$5 makes it the most cost-effective rail at $2-3K rent. Plaid for instant verification + balance checks. |
| Comms | **Twilio** (SMS) + **Resend** (email) + **Pusher Channels** or **Ably** (realtime) | Twilio for voice when v2 lands; one provider continuity. |
| Screening (Phase 3) | **TransUnion SmartMove** | Tenant-paid model sidesteps CA AB-1157 fee caps, industry-standard data. |
| File / docs | **Cloudflare R2** + **DocuSign** for e-sign | R2 = cheap, no egress fees. DocuSign for legal-grade signatures. |
| Accounting (Phase 2) | **QuickBooks** sync + native trust ledger | PMs hate replacing QB; sync, don't replace, until we're worth replacing. |
| Background jobs | **Inngest** or **Trigger.dev** | Durable workflows for rent reminders, late-fee posting, agent runs. |
| Search | **Postgres full-text** v1, **Typesense** v2 | Defer until lease/document corpus grows. |
| Observability | **Vercel + Sentry + Axiom**, **Langfuse** for agent traces | Full agent trace visibility is non-negotiable when AI is touching money. |
| Hosting | Vercel (web) + Fly.io or Railway (Python agent service) + Neon (DB) | Low ops, fast iteration. |
| Testing | Vitest + Playwright (E2E) + **Promptfoo / Langfuse evals** for agent golden sets | Agent regression is a real risk; treat prompts as code. |

---

## Visual & brand direction

**Style:** Mercury / Ramp / Pilot — confident fintech. **Not** a chatbot toy.

**Brand pillars**
1. **Confident** — operators trust us with rent, deposits, legal notices. The UI must look like it knows what it's doing.
2. **Quiet AI** — AI is everywhere but doesn't shout. No sparkle emojis, no "✨ AI" badges. The intelligence shows up in the *quality* of the action, not the chrome.
3. **Operator-first density** — PMs scan portfolios in seconds. Information density matters more than negative space in the dashboard.
4. **Warm to tenants** — the tenant PWA is softer, more personal, less dense. Different sub-brand within the same system.

**Tokens (initial draft — Design Agent finalizes)**
- **Palette:** deep navy `#0B1733` primary, cream `#F7F3EC` canvas, brass `#C8A24B` accent, signal-red `#D04A3C` only for arrears/violations, success-green `#1E8A5C`
- **Type:** GT Sectra or Tiempos (display serif) for hero/H1; Inter or General Sans (sans) for UI; JetBrains Mono for tabular numbers
- **Numerals:** tabular figures everywhere money or counts appear
- **Corners:** 8px primary, 12px cards, 999px pills. No mega-rounded "consumer" feel.
- **Motion:** 180ms `cubic-bezier(0.4, 0, 0.2, 1)` standard; 400ms for hero transitions; respects `prefers-reduced-motion`

**Marketing animations / renders the Design Agent should explore**
- Scroll-pinned dashboard "live demo" where a tenant claim travels through the AI agents
- 3D isometric building cutaway showing units, leases, tenants as nodes (Three.js / R3F)
- "Agent-thinking" stream — typing-cursor reveal of AI reasoning on real claims
- Before/after slider — paper-spreadsheet PM workflow → our dashboard
- Numerical counters animating on scroll (claims resolved, hours saved)

---

## Architecture (high-level)

```
┌────────────────────────────────────────────────────────────────────────┐
│  Web surfaces (Next.js monorepo)                                       │
│  • Marketing site  • PM dashboard  • Tenant PWA  • Owner portal        │
│  • Contractor mini-app                                                 │
└──────────────────┬──────────────────────────────┬──────────────────────┘
                   │                              │
                   ▼                              ▼
        ┌─────────────────────┐         ┌──────────────────────┐
        │  Core API (tRPC)    │         │  Agent Service       │
        │  • CRUD             │◀───────▶│  (Python FastAPI)    │
        │  • Auth/permissions │         │  • Triage            │
        │  • Webhooks         │         │  • Diagnosis         │
        │  • Workflows        │         │  • Dispatch          │
        └────────┬────────────┘         │  • Ledger            │
                 │                      │  • Comms             │
                 │                      │  • Compliance        │
                 │                      │  Tools → Core API    │
                 ▼                      └──────────┬───────────┘
        ┌─────────────────────┐                    │
        │  Postgres (RLS)     │◀───────────────────┘
        │  multi-tenant       │
        └─────────────────────┘
                 │
                 ▼
        ┌──────────────────────────────────────────────────────────┐
        │  Integrations: Stripe, Plaid, Twilio, Resend, Pusher,    │
        │  TransUnion, DocuSign, QuickBooks, Cloudflare R2         │
        └──────────────────────────────────────────────────────────┘

Background workflows: Inngest (rent reminders, late-fee posting, agent retries)
Observability: Langfuse (agent traces), Sentry, Axiom
```

---

## Product-runtime sub-agents (the AI inside the platform)

These run **inside the product** and serve users. Each agent has a scoped system prompt, an allowlisted tool set, eval golden sets, and a human-approval gate for actions over a configurable threshold.

| Agent | Phase | Role | Key tools | Human gate |
|---|---|---|---|---|
| **Triage Agent** | 1 | First responder for every inbound (chat, SMS, email). Classifies and routes. | `classify`, `route_to`, `notify_pm`, `escalate_emergency` | None (read + route only) |
| **Maintenance Diagnosis Agent** | 1 | Socratic loop with tenant — photos, video, troubleshoot. Outputs root cause + remediation options + cost band. | `request_media`, `lookup_lease_responsibilities`, `propose_remediation`, `cite_civil_code_1941` | Report only in v1 |
| **Rent & Ledger Agent** | 1 | Reconciles incoming payments to invoices; partial pay, NSF, late fees per CA Orozco-reasonableness; arrears flagging. | `match_payment`, `post_invoice`, `apply_late_fee`, `flag_arrears`, `draft_reminder` | Auto-post under $X (PM-set) |
| **Communications Agent** | 1 | Drafts/sends tenant notices, reminders, owner updates. CA-jurisdiction aware. | `send_sms`, `send_email`, `render_notice_template`, `log_delivery` | Auto-send templated, hand to PM for custom |
| **Compliance Agent** | 1 | Background watcher. Blocks/warns on AB-12 deposit cap, AB-1482 rent-cap, fair housing language, illegal fees, retaliation. | `validate_action`, `cite_statute`, `block_with_reason` | Always blocks (cannot bypass without PM override + log) |
| **Vendor Dispatch Agent** | 2 | Sources contractor (PM-own → marketplace), verifies license/insurance, quotes, schedules. | `find_vendor`, `verify_license_csl`, `request_quote`, `schedule_appointment`, `create_work_order` | PM approval over $X |
| **Owner Reporting Agent** | 2 | Monthly statements, narrative portfolio performance, anomaly flagging. | `query_ledger`, `render_statement`, `narrate_performance` | Statements auto, narrative drafts for PM review |
| **Leasing Agent** | 3 | Inbound lead qualification, tour scheduling, screening, lease draft, e-sign coordination. | `qualify_lead`, `book_tour`, `order_screening`, `draft_lease`, `request_signature` | PM gate on lease approval |
| **Knowledge Agent** | 1 (lightweight) | RAG over PM's docs (leases, vendor contracts, owner agreements) for in-context Q&A. | `vector_search`, `retrieve_doc`, `cite_source` | None (read-only) |

**Orchestration:** One **Agent Router** in the Python service routes inbound events to the right agent. Each agent runs in its own conversation thread, can spawn the Compliance Agent as a check, and writes all actions to an audit log. **Every agent action is reversible by the PM within 24h.**

---

## Build-time Claude Code sub-agents (the dev crew)

This is the second meaning of "sub-agents the user asked about" — Claude Code subagents we'll use to **build** this product. Each has a focused scope, lives as a markdown agent definition in `.claude/agents/`, and is invoked during development.

### 1. **`design`** — Design Agent (NEW — explicitly requested)
**Role:** Owns design system, user journeys, UI mocks, landing page, animations, and design QA.

**Inputs it consumes**
- Brand direction (Mercury/Ramp confident fintech), tokens above
- Locked decisions table
- User-role surfaces (PM / Owner / Tenant / Contractor)
- Phase 1 MVP scope

**Deliverables**
1. **Design system** — token spec (colors, type, spacing, motion, elevation), foundational component library (button, input, table, card, dialog, toast, command palette, money cell, status pill, agent-thinking stream)
2. **User-journey maps** — full annotated flows for:
   - Tenant: onboard → first rent payment → file maintenance claim → AI diagnosis chat → resolution → rate experience
   - PM: signup → import properties → invite tenants → see claims queue → approve agent action → see rent posted → handle exception
   - Owner (Phase 2): receive invite → see portal → review statement → approve large expense
   - Contractor (Phase 2): receive SMS dispatch → accept → submit quote → mark complete → get paid
3. **UI mocks** — Figma frames (or v0/Frame URLs) for every MVP screen, both light + dark
4. **Marketing site IA** — hero, problem framing, agent-in-action demo, features, pricing tiers, trust signals (CA-compliant copy), signup
5. **Animations & renders** — spec'd in code-ready format:
   - Hero scroll-pinned dashboard demo
   - 3D isometric building cutaway (R3F)
   - Agent-thinking stream component
   - Empty-state illustrations (custom, not stock)
   - Motion principles doc
6. **Component library implementation plan** — order in which to build primitives in shadcn + Tailwind, with token mappings
7. **Design QA pass** on every shipped MVP screen before phase exit

**Tools needed**
- Read, WebSearch, WebFetch (research design references, scrape Mercury/Ramp pages for ideation)
- Write (design spec markdown files, mock URLs, component implementation plans)
- Edit (component code, Tailwind config, motion utilities)
- Optional: Image generation tool for mood boards if available; otherwise generate prompt scripts the user can run

**Model:** Opus 4.7 for the system + journey work; Sonnet for component-level implementation passes.

**Style brief handed to it:**
> Build it like Mercury would if Mercury did property management. Deep navy, cream, brass accent. Confident serif display + clean sans body, tabular figures for money. Quiet AI — no sparkle emojis, no chatbot bubbles. Density in PM dashboard, warmth in tenant app. Polished craft-level motion (180–400ms, ease-in-out, reduced-motion respected). Marketing has one or two hero moments (3D building, agent-thinking stream); in-app stays calm. Every screen passes WCAG AA.

### 2. **`compliance`** — California Compliance Agent (dev-time)
**Role:** Validates every feature against CA landlord-tenant law during build. Produces the legal-compliance test suite. Owns the `compliance_rules.yaml` that powers the runtime Compliance Agent.

**Deliverables**
- Annotated compliance map: every CA statute → product surface → test case
- `rules/ca/*.yaml` — machine-readable rule definitions (AB-12 deposit cap, AB-1482 rent cap + just-cause, security deposit timelines, late fee Orozco-reasonableness, 24-hour entry notice, AB-2347 10-day UD response, fair housing language scanner)
- City-overlay rules for SF, LA, Oakland, Berkeley, Santa Monica, San Jose
- Disclosure pack (lead-paint, megan's law, mold, bedbug, smoke detector) auto-attached at lease draft

**Tools:** Read, WebSearch, WebFetch (statute lookups), Write, Edit. Model: Opus 4.7.

### 3. **`integrations`** — Integration Agent
**Role:** Owns external service wiring. Stripe + Plaid (payments + ACH + Connect for vendor payouts), Twilio (SMS, later voice), Resend (transactional email), TransUnion SmartMove (screening), DocuSign (e-sign), QuickBooks (sync), Cloudflare R2 (files).

**Deliverables**
- Webhook handlers (signed, idempotent, replayable)
- Retry + DLQ patterns
- Test-mode harnesses for each service
- Per-integration runbook (keys, env vars, sandbox accounts)

**Tools:** Read, Write, Edit, Bash, WebFetch (vendor docs). Model: Sonnet 4.6.

### 4. **`agent-builder`** — Agent Engineering Agent
**Role:** Builds the runtime AI agents (Triage, Diagnosis, Dispatch, Ledger, Comms, Compliance, Owner, Leasing, Knowledge). Owns the agent prompts, tool definitions, eval suites, Langfuse traces.

**Deliverables**
- One folder per runtime agent: `prompts/`, `tools/`, `evals/` (golden set of 30–100 cases), `runbook.md`
- Agent Router code
- Promptfoo + Langfuse eval CI that gates merges on agent regressions
- Cost & latency dashboards per agent

**Tools:** Read, Write, Edit, Bash (run evals), WebFetch (Anthropic docs). Model: Opus 4.7 for prompt design, Sonnet for tool wiring.

### 5. **`schema`** — Data Model Agent
**Role:** Owns Drizzle schema, migrations, RLS policies, seed data.

**Deliverables**
- Schema for: orgs, users (with role enum), properties, units, leases, lease_terms, tenants, payments, invoices, ledger_entries, work_orders, claims, claim_messages, vendors, owners, owner_statements, documents, agent_runs, audit_log, compliance_rule_results
- Multi-tenant RLS on every table keyed by `org_id`
- Idempotent migrations + rollback plan
- Seed script: 1 PM, 3 properties (SFR + duplex + small apartment), 5 tenants, sample claims and rent payments

**Tools:** Read, Write, Edit, Bash (run migrations). Model: Sonnet 4.6.

### 6. **`qa`** — Quality / E2E Agent
**Role:** Owns Playwright E2E suite, Vitest unit tests, accessibility audits, performance budgets.

**Deliverables**
- Playwright suite covering every golden-path user journey from the Design Agent's maps
- Visual regression on key screens (Chromatic or Playwright snapshots)
- Lighthouse perf budget gate in CI
- Accessibility scan (axe-core) on every PR
- Agent eval suites integrated (handoff to `agent-builder`)

**Tools:** Read, Write, Edit, Bash. Model: Sonnet 4.6.

### 7. **`devops`** — Infra Agent
**Role:** Owns CI/CD, deploy pipelines, env management, secret rotation, observability wiring.

**Deliverables**
- Vercel project setup (web), Fly.io for Python service, Neon DB
- GitHub Actions: typecheck, lint, test, agent evals, deploy preview
- Secrets in Doppler or Vercel env
- Sentry + Axiom + Langfuse integration
- Backups & disaster recovery doc

**Tools:** Read, Write, Edit, Bash. Model: Sonnet 4.6.

### Sub-agent crew summary
| Agent | Phase 1 active? | Owns |
|---|---|---|
| `design` | ✅ | Design system, journeys, mocks, marketing, motion |
| `compliance` | ✅ | CA legal rules, runtime Compliance Agent data |
| `integrations` | ✅ | Stripe, Plaid, Twilio, Resend |
| `agent-builder` | ✅ | Triage, Diagnosis, Ledger, Comms agents |
| `schema` | ✅ | DB schema + RLS + seed |
| `qa` | ✅ | E2E + evals + a11y + perf |
| `devops` | ✅ | CI/CD, observability |

---

## Data model sketch (Phase 1 essentials)

```
orgs (id, name, type=[pm|owner|tenant], plan_tier, ...)
users (id, org_id, email, role, ...)             ← RLS on org_id

properties (id, org_id, address, type=[sfr|mf|comm|str], jurisdiction_city, ...)
units (id, property_id, label, beds, baths, sqft, ...)
leases (id, unit_id, tenant_user_id, start, end, monthly_rent, deposit_amount, ...)
lease_terms (id, lease_id, key, value)             ← flexible kv for late_fee_grace_days, etc.

invoices (id, lease_id, period, amount, due_date, status)
payments (id, invoice_id, amount, method, processed_at, stripe_charge_id, ...)
ledger_entries (id, account_id, debit, credit, ref_type, ref_id, posted_at)
                                                   ← trust accounting backbone

claims (id, lease_id, tenant_user_id, category, urgency, status, ...)
claim_messages (id, claim_id, sender_type=[tenant|pm|agent], body, media, ...)
agent_runs (id, agent_name, input, output, cost, latency_ms, trace_id, ...)

documents (id, org_id, type, url, signed_at, signer_id, ...)
audit_log (id, org_id, actor_id|agent_name, action, target_type, target_id, before, after, ts)
compliance_rule_results (id, action_id, rule_id, passed, reason, ts)
```

Every "agent-driven" action writes to `agent_runs` + `audit_log`. PM can replay, override, reverse within 24h.

---

## Phasing & task breakdown

### Phase 0 — Foundations (week 1–2)
Owner: `devops`, `schema`, `design`

- [ ] Monorepo scaffold (Turborepo, Next.js 15, TS strict)
- [ ] Auth (Clerk or WorkOS) with PM / Owner / Tenant / Contractor roles
- [ ] Postgres + Drizzle + RLS skeleton
- [ ] Python FastAPI agent service skeleton
- [ ] CI/CD (Vercel + Fly + GH Actions)
- [ ] Sentry + Axiom + Langfuse
- [ ] Design system v0.1 — tokens, button, input, card, dialog, money cell, status pill
- [ ] Marketing site shell (landing page wireframe, signup form)

### Phase 1 — Tenant + Rent MVP (week 3–10)
Owner: all dev sub-agents

**Tenant PWA**
- [ ] Onboard (invite-link flow, lease verification)
- [ ] Rent payment (Stripe + Plaid ACH; one-time + autopay)
- [ ] Payment history + receipts
- [ ] File maintenance claim (category, description, photos, video, urgency)
- [ ] Chat with Triage + Diagnosis agents
- [ ] Notification center

**PM Dashboard**
- [ ] Property/unit/lease CRUD (manual + CSV import)
- [ ] Invite tenant flow
- [ ] Rent roll view
- [ ] Claims queue (Kanban: new → in-progress → resolved)
- [ ] Claim detail with full agent trace
- [ ] Manual reply to claim
- [ ] Late fee config per lease
- [ ] CA-aware setup wizard (deposit max, rent cap warnings)

**Marketing site**
- [ ] Hero with scroll-pinned dashboard demo
- [ ] Problem framing + agent-in-action animation
- [ ] Features (4 cards: pay, claim, AI triage, compliance)
- [ ] Pricing (free tier + paid)
- [ ] Trust section (CA-built, secure, audit-logged)
- [ ] Signup → free tier onboarding

**Runtime AI agents (v1)**
- [ ] Triage Agent — classify + route
- [ ] Maintenance Diagnosis Agent — Socratic loop + report
- [ ] Rent & Ledger Agent — reconcile + late fee + arrears
- [ ] Communications Agent — SMS/email templated notices
- [ ] Compliance Agent — AB-12, AB-1482, late fee, entry notice
- [ ] Knowledge Agent — lightweight RAG over uploaded leases

**Verification gates**
- All golden-path E2E tests pass
- Agent evals ≥ 90% on the 30-case golden set
- Lighthouse perf ≥ 90 on tenant PWA + marketing
- WCAG AA on every shipped screen
- Live test rent payment via Stripe test mode end-to-end

### Phase 2 — Vendor Dispatch + Owner Portal (week 11–18)
- Vendor onboarding, license/insurance verification, Stripe Connect payouts
- Vendor Dispatch Agent with PM $-threshold approval gate
- Contractor SMS + web mini-app
- Owner Portal: statements, approvals, performance dashboards
- Owner Reporting Agent
- QuickBooks 2-way sync

### Phase 3 — Leasing (week 19–26)
- Listing & application
- Leasing Agent + TransUnion SmartMove
- CA-compliant application (AB-1157 fee cap, SB-329 source-of-income, SB-1100 Fair Chance, city overlays)
- E-sign + move-in workflow

### Phase 4 — Marketplace + Voice + Commercial + STR (week 27+)
- Curated CA contractor marketplace (vetted, insured)
- Voice AI (Vapi or Retell) for 24/7 tenant calls
- Commercial lease module (NNN/CAM reconciliation)
- STR module (Airbnb sync, dynamic pricing, TOT collection)

---

## Verification

### End-to-end manual check
1. Seed a CA SFR property + lease + tenant
2. Tenant logs in to PWA → pays rent via ACH (Stripe test) → payment posts to ledger
3. Tenant files electrical claim with photo → Triage classifies "maintenance/electrical/medium" → Diagnosis Agent asks 3 follow-ups → produces report with likely cause + 3 remediation options
4. PM logs in → sees rent in ledger → sees claim in queue with full agent trace → replies
5. Compliance smoke: attempt deposit >1 month rent → blocked with AB-12 citation; attempt 12% rent increase → blocked with AB-1482 citation

### Automated
- `pnpm test` (Vitest unit) — schema, agents tool layer, utilities
- `pnpm test:e2e` (Playwright) — golden journeys above
- `pnpm test:agents` (Promptfoo + Langfuse) — 30-case golden set per agent, gates merges
- `pnpm test:a11y` (axe-core) — every screen WCAG AA
- `pnpm test:perf` (Lighthouse CI) — perf budgets

### Dev-environment run
```bash
pnpm install
pnpm db:push && pnpm db:seed
pnpm dev               # starts web (Next.js)
pnpm dev:agents        # starts FastAPI agent service
pnpm dev:jobs          # starts Inngest local
```
Open `localhost:3000` for marketing + PM, `localhost:3000/t/[invite]` for tenant PWA.

---

## Risk register

| Risk | Mitigation |
|---|---|
| AI agent takes a costly autonomous action (e.g., dispatches $5K plumber unauthorized) | PM-set approval thresholds; every action reversible 24h; audit log + 1-click undo; pre-launch dry-run period where every action requires PM approval |
| CA compliance miss → customer legal exposure | Compliance Agent runs as a *blocking* guard on every relevant action; rule library reviewed by external CA tenant-law counsel before pilot; surface citations in UI |
| Trust-account / ledger bugs | Double-entry ledger from day 1; nightly reconciliation job; readonly historical entries; Stripe + QB cross-check |
| Agent hallucinates legal/medical advice | Strict system-prompt scoping; refuse-list; Compliance Agent blocks; "consult attorney" surfaced on every notice |
| Multi-tenant data leak | Postgres RLS on every table; per-org encryption keys for sensitive fields; pen-test before public launch |
| Stripe / Plaid / Twilio integration breakage in prod | Idempotent webhooks; DLQ + alerts; sandbox-mirror env; quarterly DR drill |
| Design Agent + frontend drift | Component library is single source; every PR runs visual regression against latest Figma snapshot |
| MVP scope creep | Phase 1 is **tenant + rent only**; everything else is explicitly "Phase 2+" |
| Vendor lock-in (Clerk, Vercel, Neon) | Stable adapters in our code; can swap each within 1 sprint if needed |

---

## Open items pending research

The three research agents stalled at planning (inherited plan mode); they will be re-launched **immediately after plan approval** to execute web research and enrich:

- [ ] Comprehensive PM workflow inventory (agent 1 — what PMs actually do across the lifecycle)
- [ ] Competitive feature parity table + white space (agent 2 — Buildium, AppFolio, DoorLoop, Yardi, TurboTenant, RentRedi, Hemlane, Innago, Stessa, and AI-native entrants)
- [ ] California compliance map with statute citations (agent 3 — AB-12, AB-1482, SB-567, SB-1100, SB-329, SB-1103, AB-2347, CCP, Civil Code, city overlays, STR rules, commercial)

A **fourth research agent** will also be launched after approval: **Design references mood-board** — scraping Mercury, Ramp, Pilot, Linear (for motion), Stripe (for editorial), to build the visual reference deck the `design` sub-agent uses as input.

These research outputs will be saved to `docs/research/*.md` in the repo and referenced by the relevant sub-agents.

---

## What I'll do immediately upon plan approval

1. Re-launch the four research agents (workflow, competitive, CA compliance, design references) in parallel — they'll populate `docs/research/*.md`
2. `devops` agent: scaffold the monorepo (Turborepo + Next.js 15 + FastAPI service)
3. `schema` agent: write initial Drizzle schema + RLS + seed
4. `design` agent: draft design tokens + first 6 primitives (button, input, card, dialog, money cell, status pill) + Tenant PWA home screen mock
5. `compliance` agent: draft `rules/ca/ab-12.yaml`, `ab-1482.yaml`, `late-fee.yaml` from existing knowledge (research will enrich)
6. First commit + push to `claude/property-management-platform-design-W8Rtv`

I'll check in after Phase 0 scaffolding is committed and ask whether to keep going through Phase 1 autonomously or gate at the design-tokens-approval milestone.
