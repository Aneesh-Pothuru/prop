# Sub-Agent Collaboration Map

This is the cross-agent communication topology for the build-time crew. Treat it as the source of truth for "who do I call when…?"

Each agent owns a set of artifacts. When an artifact straddles boundaries, the **calling** agent escalates to the **owning** agent rather than forging the artifact itself.

---

## Ownership matrix

| Artifact | Owner | Stakeholders (must be consulted before changes) |
|---|---|---|
| `packages/ui/tokens.ts` + Tailwind preset | **design** | qa (a11y), agent-builder (AgentStream styling) |
| `packages/ui/components/*` | **design** | qa, agent-builder (domain components) |
| `apps/web/app/page.tsx` (landing) + marketing | **design** | compliance (any CA-statute copy), integrations (Stripe checkout link) |
| `apps/web/app/(pm|tenant|owner|contractor)/*` | **design** + **schema** | agent-builder (where AI shows up) |
| `packages/db/schema.ts` | **schema** | compliance (CA fields), agent-builder (agent_runs, audit_log), integrations (webhook payload shape) |
| `packages/db/rls.sql` policies | **schema** | devops (review for perf), qa (must be testable) |
| `rules/ca/*.yaml` | **compliance** | schema (rule_results shape), agent-builder (runtime validator hook) |
| `packages/integrations/{stripe,plaid,twilio,resend}` | **integrations** | schema (event tables), agent-builder (agent tool calls webhooks) |
| `services/agents/{triage,diagnosis,ledger,...}` | **agent-builder** | compliance (every action), schema (audit writes), integrations (tools) |
| Tests (e2e, a11y, agent-evals, perf) | **qa** | every agent that owns the surface under test |
| CI/CD, env, secrets, hosting | **devops** | integrations (env shape), schema (migration steps) |

---

## Communication patterns

### 1. Compliance is a blocking dependency for half the crew

The Compliance Agent is a **runtime guard** in the product, but it is also a **build-time gatekeeper**. Before any of these ship, the calling agent must check in with `compliance`:

- `agent-builder` — every runtime agent that drafts notices, posts late fees, raises rent, or schedules entry must wire up a `compliance.validate_action` tool call. Cite statute on response.
- `design` — every screen that exposes a money input, deposit field, rent-increase prompt, late-fee config, or notice draft must surface the relevant `ComplianceCallout` with the citation. Pull the rule list from `rules/ca/`.
- `schema` — every lease/deposit/payment/notice/eviction table must include the citations/blocks log so the runtime can prove compliance after the fact.
- `integrations` — payment-method storage and SMS notice copy both touch CA law (cash-refusal rule, retaliation 180-day window). Compliance reviews integration copy templates.

### 2. Agent-builder ↔ schema is a tight loop

Every runtime agent action writes to two tables: `agent_runs` (the trace) and `audit_log` (the user-facing reversibility surface). When `agent-builder` adds a new tool, `schema` must reflect the shape it writes. When `schema` evolves, `agent-builder` regenerates the typed tool wrappers.

**Protocol:** if a tool's return shape changes, open a small spec in `docs/agent-tools/<tool>.md`, ping `schema`, get a migration, then update the agent code.

### 3. Design ↔ agent-builder for AI-in-UI

The `AgentStream`, `AgentTrace`, `ToolCallChip`, and `ComplianceCallout` components live in `packages/ui/` (design's home) but their data shape is owned by `agent-builder` (the trace SDK + event stream contract). They co-author these components — neither ships in isolation.

**Protocol:** event-stream schema is published in `services/agents/contracts/stream.ts` (or a shared `packages/agent-contracts/`). Design consumes types from there.

### 4. Integrations ↔ schema for every webhook

Every external service (Stripe, Plaid, Twilio, Resend, DocuSign, TransUnion) sends events that need persisted shape: `payment_intents`, `bank_links`, `messages`, `email_deliveries`, `signature_envelopes`, `screening_reports`. `integrations` owns the handlers; `schema` owns the table shape. Idempotency keys are mandatory and shared (`provider`, `provider_event_id`).

**Protocol:** new integration → schema migration first, then handler. No webhook handler ships without a corresponding table that includes `received_at`, `provider`, `provider_event_id` (unique), `payload_json`, `processed_at`.

### 5. QA orchestrates phase exits

Before any phase exit (Phase 0 → Phase 1, Phase 1 → Phase 2, etc.), QA runs the gate suite:

1. `pnpm test` — Vitest unit
2. `pnpm test:e2e` — Playwright on golden journeys
3. `pnpm test:a11y` — axe-core on every shipped screen
4. `pnpm test:agents` — Promptfoo + Langfuse evals on every runtime agent
5. `pnpm test:perf` — Lighthouse budgets
6. Visual regression snapshot diff (Chromatic or Playwright snapshots)

A failing gate blocks the phase. QA writes the failure report and pings the **owning** agent for fix.

### 6. Devops underwrites everyone

When any agent introduces a new env var, secret, or external dependency, it MUST update:

- `apps/web/.env.example` (or `services/agents/.env.example`)
- The relevant runbook in `docs/runbooks/`
- The Doppler/Vercel/Fly secret mapping (devops handles the actual rotation)

Failure to update env-example breaks preview deploys for everyone — devops will revert the PR.

### 7. The orchestrator (main thread) routes

The main Claude thread (not a build-time agent) acts as the orchestrator. When the user requests a feature, the main thread:

1. Decomposes into agent-sized tasks
2. Launches the relevant build-time agent(s) — in parallel where independent
3. Cross-references the ownership matrix above to ensure each artifact is touched by the right hands
4. Reads each agent's report, then routes follow-ups to the right peer

The main thread never edits an artifact owned by a specialist agent without surfacing the change — the specialist gets the final word.

---

## Escalation triggers

| Trigger | Who decides |
|---|---|
| A CA statute is unclear or has city-overlay ambiguity | **compliance** → escalate to user (external counsel pending) |
| A token change would break light/dark contrast | **design** runs the contrast check; if it fails, the change is rejected |
| A schema change requires a destructive migration on prod | **schema** → **devops** → user confirmation required |
| An agent tool would take an irreversible action | **agent-builder** → must add `human_gate=True` and document in runbook |
| A vendor outage is in progress (Stripe, Plaid, etc.) | **integrations** → engages incident runbook, posts in Slack |

---

## Daily standup (in PR descriptions, not Slack)

When a PR ships, the contributing agent writes a 3-line check-in at the bottom:

```
## Agent check-in
- I touched: <artifacts>
- I notified: <peer agents who were consulted>
- I need: <blockers, if any>
```

This is the build-time analogue of the runtime `agent_runs` row — it makes cross-agent dependencies legible to humans.

---

## What's intentionally NOT here

- A **growth/content** agent — `design` owns marketing copy and the editorial voice. If we later split, growth would own the blog, SEO, and lifecycle email content (not the landing page itself).
- A **security** agent — split across `devops` (infra), `schema` (RLS), `integrations` (webhook signatures), and `qa` (pen-test prep before pilot). If we cross 50 engineers we'll consolidate.
- A **product** agent — the human PM (you, the user) owns scope. The main Claude thread is your operational arm.
- An **orchestrator** agent — the main thread is the orchestrator. Adding a meta-agent here would just add a hop.

If any of these surfaces becomes a bottleneck, split it out into its own `.claude/agents/<name>.md` and update this map.
