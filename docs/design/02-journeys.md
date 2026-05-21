# 02 — User Journeys

Phase 1 covers tenant + rent + claims + chat plus the PM operator surface and the marketing landing. Seven journeys are in scope. Each is a mermaid flow plus narrative covering: entry point, key screens, decision branches, error / empty / loading states, AI touchpoints, and success criteria.

A reading note on syntax: `agent.triage` = the runtime Triage Agent; `agent.diagnosis` = Maintenance Diagnosis; `agent.ledger` = Rent & Ledger; `agent.comms` = Communications; `agent.compliance` = Compliance. Routes match Next.js paths in `apps/web`.

---

## J1 — Tenant onboarding

**Entry point:** Tenant receives an SMS or email from their PM with an invite link: `app.example.com/invite/<token>`. Token is single-use, 7-day TTL, scoped to a specific lease.

**Outcome:** Tenant has a verified account, has confirmed lease details, and has elected autopay (or skipped knowingly).

### Flow

```mermaid
flowchart TD
  A[Invite link received] --> B{/invite/[token]}
  B -->|valid| C[Welcome screen — PM-branded]
  B -->|expired| C1[Expired state — request new link]
  B -->|already used| C2[Sign in instead]
  C --> D[Verify phone via OTP]
  D -->|code ok| E[Set password / passkey]
  D -->|3 wrong| D1[Cooldown 5 min]
  E --> F[Confirm identity — name, DOB last4 SSN optional]
  F --> G[/onboarding/lease — read lease summary]
  G --> H{Details correct?}
  H -->|yes| I[/onboarding/autopay]
  H -->|no| H1[Flag for PM — captures discrepancy, continues anyway]
  I --> J{Enable autopay?}
  J -->|yes| K[Plaid link → bank verify]
  K -->|linked| L[Pick payment day — 1st default]
  K -->|failed| K1[Fallback: enter routing/account manually]
  L --> M[/t — home with first rent date]
  J -->|skip| M
  H1 --> I
```

### Key screens

1. `/invite/[token]` — welcome with PM logo + property address: "Welcome to **2417 Telegraph Ave, Unit B**." Single CTA: *Get started*.
2. `/onboarding/verify` — phone OTP. Resend after 30s.
3. `/onboarding/identity` — three fields, optional SSN last 4 with explainer (used only for ledger keying).
4. `/onboarding/lease` — read-only lease summary card: monthly rent, term, deposit on file, late-fee policy, contact. *Looks right* and *Something's off* buttons.
5. `/onboarding/autopay` — Plaid Link tile + *Skip for now* secondary.
6. `/t` — first run: top card greets by first name, shows next charge date and amount.

### Decision branches

- Token expired → CTA to request fresh invite (PM gets a notification).
- Token already redeemed → route to `/login` with email prefilled.
- Identity discrepancy at lease step → flagged to PM as a soft signal, tenant continues.
- Plaid failure → manual ACH fallback. Failures over 3 fall back to enter-on-pay flow (no autopay setup).

### States

- **Loading:** skeleton card on lease screen while ledger fetches; verify-phone shows inline progress dot.
- **Empty:** N/A in onboarding — every screen has content.
- **Error:** OTP wrong (3x lockout); Plaid bank-down banner with "Try again in a few minutes."

### AI touchpoints

- `agent.knowledge` reads the lease PDF in background to populate the summary card (rent, term, deposit, late-fee grace). If extraction confidence < 0.85, fields show in `text.muted` with a "PM hasn't confirmed this yet" caption rather than guessing.
- No agent voice appears to the tenant in onboarding. Pure utility.

### Success criteria

- ≥ 85% of invited tenants complete to `/t` within 10 minutes.
- ≥ 60% elect autopay at this step.
- Zero PM tickets opened because of unclear lease summary in pilot.

---

## J2 — Tenant pays rent

**Entry point:** Tenant opens the PWA on/before the 1st of the month (push reminder fires 3 days before due). Or autopay is on — in which case the journey is "see the receipt."

**Outcome:** Rent paid, ledger updated, receipt visible.

### Flow

```mermaid
flowchart TD
  A[/t — home] --> B[Balance card — $2,400.00 due Mar 1]
  B --> C[Pay now]
  C --> D[/t/pay — method select]
  D -->|bank| E[ACH — primary method]
  D -->|card| F[Card — fee disclosed]
  D -->|add method| G[Add bank or card]
  E --> H[/t/pay/confirm — review]
  F --> H
  H --> I{Funds sufficient?}
  I -->|yes via Plaid balance check| J[Confirm + pay]
  I -->|low / unknown| I1[Warning banner: you may overdraft]
  J --> K[Processing — 200–600ms]
  K -->|ok| L[/t/pay/receipt — success]
  K -->|fail| K1[Decline modal with reason + retry]
  L --> M[Add to calendar]
  L --> N[Back to /t]
```

### Key screens

1. `/t` — balance card at top: rent due, days until / past due, status pill (Due / Due soon / Overdue). Big *Pay $2,400.00* button.
2. `/t/pay` — payment method list, default selected. Card option shows "2.9% + $0.30 fee — $69.90 added" inline; ACH shows "Free — settles in 2 business days."
3. `/t/pay/confirm` — line items: rent, fee (if any), total. Big total in `mono-lg`. *Confirm and pay* primary; *Back* ghost.
4. `/t/pay/receipt` — green success state, ref id in mono, *Email receipt* + *Add to calendar* secondary.

### Decision branches

- Partial payment: tenant enters custom amount → `agent.ledger` accepts and computes new balance; pill becomes Partial.
- NSF likely (Plaid balance < amount): inline warning, tenant can override or pick card.
- Late fee applicable: shown as a separate line item with citation (e.g., "Per lease § 4, late fee of $50 added after 5-day grace; see CA Civil Code § 1671 reasonableness").

### States

- **Loading:** processing spinner inline on Confirm button; full-screen receipt is server-rendered post-redirect.
- **Empty:** when balance is $0.00 — card flips to "Paid in full" with next due date.
- **Error:** declined card / failed ACH → modal with the actual reason from Stripe (no jargon: "Your bank reported insufficient funds. Try a different method or wait until [date].")

### AI touchpoints

- `agent.ledger` runs server-side: matches the incoming payment to invoice, posts double-entry, applies late fee per the lease's configured policy, validates against `agent.compliance` (Orozco-reasonable late-fee check).
- The tenant never sees agent chrome during pay. The agent's name shows only in the receipt's audit footer: "Reconciled by Ledger Agent · 0.4s · trace #lr_8af2."

### Success criteria

- Time from `/t` open to receipt < 25 seconds for repeat payers.
- ACH adoption ≥ 70% (vs card) by month 2.
- Zero unreconciled payments after the ledger agent runs.

---

## J3 — Tenant files a claim

**Entry point:** Something is wrong. Tenant opens the PWA from a push notification reply or from `/t`.

**Outcome:** Claim filed; tenant has either a resolution path, a scheduled visit, or a PM-handled escalation; tenant has rated the experience.

### Flow

```mermaid
flowchart TD
  A[/t] --> B[Report an issue]
  B --> C[/t/claims/new — category]
  C --> D{Category}
  D -->|electrical| E1[Safety screen — power off?]
  D -->|plumbing| E2[Safety screen — water off?]
  D -->|hvac, appliance, other| E3[Standard intake]
  E1 -->|emergency yes| Z[Call PM + 911 prompt]
  E1 -->|no| F[Describe — text + voice optional]
  E2 --> F
  E3 --> F
  F --> G[Add photos / video — up to 5]
  G --> H[Submit]
  H --> I[/t/claims/[id] — Triage greeting]
  I --> J[agent.diagnosis socratic loop — 2–4 questions]
  J -->|resolved by tenant| K[Self-resolve + close]
  J -->|needs visit| L[Diagnosis report + scheduling proposal]
  L --> M[Confirm time window]
  M --> N[Wait state — contractor scheduled in Phase 2; PM-handled in Phase 1]
  N --> O[Resolved]
  O --> P[Rate experience 1–5 + optional note]
```

### Key screens

1. `/t/claims/new` — category grid: Electrical, Plumbing, HVAC, Appliance, Pest, Locks/Keys, Common Area, Other. Big square tiles, icons + label.
2. Safety screen (conditional) — single yes/no question. "Is there active smoke, sparks, or smell of burning?" If yes → emergency banner + click-to-call PM.
3. Describe — single textarea, "What's happening?" placeholder is real ("Outlet in kitchen sparked when I plugged in the toaster. Tripped the breaker."). Voice-to-text button next to send. Char count quiet at 280.
4. Media — drag/drop or tap. Photos + 60s video. EXIF stripped server-side.
5. `/t/claims/[id]` — the live thread. Triage greets first (text shown, no avatar pop), then Diagnosis. AgentStream component reveals reasoning slowly; tenant can interrupt with a reply at any time.

### Decision branches

- Emergency safety branch → bypass intake, surface PM contact, log as `urgency: emergency`.
- Diagnosis self-resolves (toaster outlet was on GFCI; reset solved it) → "Did that fix it?" → tenant taps Yes → claim closes with self-resolve flag.
- Diagnosis requires visit → handoff text appears: "I'll let your property manager know. They'll confirm a contractor and time." Status pill flips New → Awaiting PM.
- Tenant insists "this is urgent" mid-loop → urgency upgraded, PM pinged.

### States

- **Loading:** photo upload progress per-tile (ring around tile, 1.2s eased); agent typing cursor pulse between tokens.
- **Empty:** category grid is the empty state for `/t/claims` — no prior claims means a friendly line above the grid: "Nothing to report yet. We're glad."
- **Error:** photo upload failed → inline retry on the tile; full submit failure → toast + draft preserved locally.

### AI touchpoints (heavy)

- `agent.triage` runs first on submit: classifies category, urgency (low / med / high / emergency), routes to the right specialist. Surfaces in the timeline as "Triaged · electrical · medium" — caption type, no chrome.
- `agent.diagnosis` runs the socratic loop: asks at most 4 questions before producing a report. Uses photo analysis when available. Cites `agent.knowledge` for lease responsibilities (who pays for what under the lease + § 1941.1 habitability).
- `agent.compliance` is invisible — runs as a guard if the agent ever attempts to draft a notice or escalate beyond what's allowed.
- All agent outputs are streamed via AgentStream — soft pulse cursor, no robot avatars, the agent name shown once at the top of its turn in caption type.

### Success criteria

- < 60s from category tap to first agent response (p95).
- ≥ 35% of claims self-resolve in the diagnosis loop in Phase 1.
- ≥ 4.5 average rating on resolved claims.
- Zero emergency claims undetected by the safety screen.

---

## J4 — Tenant chats with AI (general)

**Entry point:** Tenant taps the chat icon in the bottom nav, or replies to an SMS from a previous notice.

**Outcome:** Question answered or routed to a human PM with full context.

### Flow

```mermaid
flowchart TD
  A[/t/chat or SMS reply] --> B[Triage classifies]
  B --> C{Intent}
  C -->|maintenance| D[Route to agent.diagnosis - opens a claim]
  C -->|payment q| E[agent.ledger answers from ledger]
  C -->|policy/lease q| F[agent.knowledge with citation]
  C -->|notice / legal| G[agent.comms drafts, agent.compliance guards]
  C -->|emotional / urgent| H[Hand to PM with summary]
  D --> I[/t/claims/[id]]
  E --> J[Inline answer with payment history snippet]
  F --> K[Inline answer with lease excerpt + page ref]
  G --> L[Routed to PM with draft attached]
  H --> M[PM notified — tenant sees: 'I have your PM on this.']
```

### Key screens

1. `/t/chat` — single-thread chat. Composer at the bottom, AgentStream above. No avatars on agent turns; small caption "Triage · just now" at the start of each agent turn.
2. Inline citations render as `[CA Civ. Code § 1941.1]` chips that expand on tap to show the statute text.

### Decision branches

- Triage cannot classify → asks one clarifying question.
- Tenant indicates distress / harassment / legal action → hard handoff to PM, agent does not attempt advice.
- Tenant asks for something out of scope (e.g., "can you waive my rent") → agent.comms drafts a request to the PM with the tenant's context, doesn't auto-grant.

### States

- **Loading:** typing pulse cursor.
- **Empty:** new conversation greeting: "Hi Maya — what's going on?" (Tenant's first name from lease; no robotic preamble.)
- **Error:** model timeout > 10s → "Give me one more second…" then fallback "Routing this to your PM directly."

### AI touchpoints

All four core agents can be activated from chat depending on intent. The handoff between them is opaque to the tenant — they see a single conversation with one continuous thread.

### Success criteria

- ≥ 70% of chats resolved without human PM intervention.
- < 8s p95 time-to-first-token.
- Hard handoff to PM is graceful — tenant never sees "I cannot help with that."

---

## J5 — PM signup

**Entry point:** PM lands on `/` from a referral, ad, or organic search. Reads the hero, scrubs the scroll demo, lands on pricing.

**Outcome:** PM has a workspace, has imported at least one property, has invited at least one tenant.

### Flow

```mermaid
flowchart TD
  A[/] --> B[/pricing or /signup direct]
  B --> C[Claim Free tier]
  C --> D[/signup — work email + password / Google]
  D --> E[Email verify]
  E --> F[/onboarding/org — workspace name, role, unit count band]
  F --> G[/onboarding/properties — import]
  G -->|CSV| H[Map columns + preview]
  G -->|manual| I[Add one property → first unit → first lease]
  G -->|skip| J[/pm — empty state]
  H --> K[/pm — populated]
  I --> K
  K --> L[Invite first tenant]
  L --> M[SMS / email sent → kicks off J1]
```

### Key screens

1. `/signup` — single column, brass CTA. Email + password or *Continue with Google*. Tenant signup is invite-only; this page is PM-only with a small "Are you a tenant?" link routing to `/login`.
2. `/onboarding/org` — workspace name (defaults to "PM First Name's Properties"), unit-count band (1–10 / 11–50 / 51–500), role (Solo landlord / Small PM company / Property manager at firm).
3. `/onboarding/properties` — three tiles: *Import CSV*, *Add one by one*, *Skip — set up later*. CSV import shows a mapping UI with auto-detection (column "rent" → monthlyRent) + preview of first 5 rows. Errors highlighted inline.
4. `/pm` first run — empty-state hero: "You're in. Add a property to start." See `06-illustrations.md` for the illustration.
5. Tenant invite modal — fields: phone, email, unit, lease start, monthly rent. *Send invite* primary.

### Decision branches

- Free tier limit (10 units) hit during import → soft block with upgrade prompt: "Importing 32 units. The free tier covers 10. You can preview the import and upgrade when you're ready." No payment required upfront.
- CSV mapping unmapped field → row marked, blocking continue until resolved or skipped.
- Tenant invite phone already exists → conflict resolution: "This phone is on a lease at [other address]." Multi-property tenants allowed.

### States

- **Loading:** CSV parse → progress bar; import preview renders incrementally.
- **Empty:** `/pm` post-skip — the illustrated empty state with one CTA: *Add your first property*.
- **Error:** CSV malformed → "We couldn't read row 14. Likely a quote issue. [Show row]." Always recoverable.

### AI touchpoints

- `agent.knowledge` ingests any uploaded lease PDFs in the background and pre-fills lease terms on the unit/lease form. PM sees pre-filled values with a "We pulled this from your lease — confirm or edit" caption.
- `agent.compliance` runs on save: flags deposit > 1 month (AB-12), rent above the AB-1482 cap by city + unit age, missing required disclosures. Surfaces as ComplianceCallout inline, not blocking yet (warning level) — blocking kicks in at notice/charge time.

### Success criteria

- 50% of PMs complete onboarding through first tenant invite in one session.
- Time-to-first-tenant-invite p50 < 8 minutes.
- < 5% of CSV imports fail in a way that can't be recovered in-flow.

---

## J6 — PM handles a claim

**Entry point:** New claim notification (toast in `/pm` if open, email + SMS otherwise). PM clicks through to claim detail.

**Outcome:** Claim moved to a terminal state — resolved, scheduled, or closed.

### Flow

```mermaid
flowchart TD
  A[/pm — claims badge increments] --> B[/pm/claims — queue]
  B --> C{Filter / sort}
  C --> D[/pm/claims/[id]]
  D --> E[Read agent trace — left rail or top tray]
  E --> F{Action}
  F -->|approve dispatch P2| G[Approve — agent.dispatch books contractor]
  F -->|approve reply| H[Send agent.comms draft]
  F -->|override| I[Override modal — capture reason]
  F -->|reply manually| J[Type custom reply → sends as PM]
  F -->|reassign| K[Pick teammate]
  F -->|close| L[Close + outcome tag]
  I --> M[Action proceeds + audit log entry]
  G --> N[Status: Scheduled]
  H --> N
  J --> N
  L --> O[Status: Resolved]
```

### Key screens

1. `/pm/claims` — queue. Kanban (New / In progress / Awaiting tenant / Awaiting PM / Resolved) **or** table view, PM-toggled. Filters: property, urgency, age, agent state. Each card: ClaimCard (title + tenant + unit + age + StatusPill + last actor caption).
2. `/pm/claims/[id]` — detail. Three regions:
   - **Left (320px):** claim summary, tenant card, unit card, lease snippet, related history.
   - **Center:** the conversation thread (ClaimTimeline) — every tenant message, agent message, PM message, tool call inline.
   - **Right (380px collapsible):** AgentTrace. Tree of agent runs with input, tool calls, outputs, cost, latency. Replayable.
3. Action bar bottom: *Reply* (composer that pre-fills with `agent.comms` draft when available), *Approve action*, *Override*, *Close*.

### Decision branches

- Action has compliance impact (e.g., 3-day pay-or-quit notice request) → ComplianceCallout intercepts with statute citation. Override requires typed reason logged to `audit_log` + `compliance_rule_results`.
- Tenant has responded since the agent's last turn → "Tenant replied 3m ago" banner at top of trace, with quick *Show new* scroll.
- Agent confidence on its draft reply < 0.7 → draft is shown collapsed under "Suggested reply (low confidence — review carefully)."

### States

- **Loading:** trace lazy-loads per agent run; conversation is server-rendered.
- **Empty:** queue with no claims — illustration + "All clear. Your tenants haven't reported anything."
- **Error:** failed agent run → trace shows a red bar with the error and a "Re-run from this step" button (within 24h).

### AI touchpoints

- The trace is the AI touchpoint. PM reads what each agent thought, what it called, what came back. This is the operator-facing AI surface.
- PM can re-prompt the agent from any step — typed instruction inserted as an additional system note for the rerun.

### Success criteria

- PM resolves a claim in < 4 minutes p50 (active time, not wall-clock).
- ≥ 80% of resolved claims required ≤ 1 PM action (one reply or one approval).
- 100% of compliance-blocking actions are either accepted or have a logged override reason.

---

## J7 — PM rent roll

**Entry point:** First of the month or PM checks dashboard mid-month. Often the second thing a PM does after checking new claims.

**Outcome:** PM has a clear picture of arrears; reminders sent to overdue tenants; any disputed payments triaged.

### Flow

```mermaid
flowchart TD
  A[/pm] --> B[Top KPIs — collected / outstanding / overdue]
  B --> C[/pm/rent-roll]
  C --> D[Sort by overdue desc — default]
  D --> E[Row flagged red — tenant Maya Chen, 4 days overdue]
  E --> F[/pm/leases/[id]]
  F --> G[Lease summary + ledger tab]
  G --> H{Action}
  H -->|send reminder| I[agent.comms drafts SMS + email]
  H -->|waive late fee| J[Override + reason → audit]
  H -->|call| K[Click-to-call via Twilio in P4]
  H -->|mark dispute| L[Tag for follow-up, flips status]
  I --> M[PM reviews draft + sends]
  M --> N[Status: Reminder sent · 2m ago]
```

### Key screens

1. `/pm` — top KPI band: *Collected this month*, *Outstanding*, *Overdue (count + total)*. KeyMetric components with 30-day sparklines.
2. `/pm/rent-roll` — dense table. Columns: Tenant · Unit · Lease term · Monthly rent (MoneyCell) · Status (StatusPill) · Days overdue · Last activity · Action menu. Sticky header. Sort + filter. Bulk select for sending reminders.
3. `/pm/leases/[id]` — tabbed: Overview / Ledger / Documents / Tenant. Ledger tab is the LedgerRow list with running balance.

### Decision branches

- Reminder for tenant who already received one in the last 48h → confirm "You sent a reminder 1d ago. Send again?" with the previous reminder text shown.
- Tenant has filed a maintenance claim and is withholding → flag in row; reminder action is intercepted with: "This tenant has an open claim. Sending a payment reminder while a habitability claim is open may have legal implications. Continue?" (Compliance Agent — soft warning.)
- Late fee assessable: `agent.ledger` proposes the fee with citation; PM one-click approves or waives.

### States

- **Loading:** skeleton rows.
- **Empty:** all leases paid → "Everything is paid. Nice month." with a subtle brass underline.
- **Error:** stale data → "Last sync 3m ago" caption + retry.

### AI touchpoints

- `agent.ledger` continuously reconciles. Status pills are agent-derived.
- `agent.comms` drafts reminder text per the lease's tone and history with that tenant ("Hi Maya, just a heads up rent for March is past due. Want to pay now? [link]"). Never threatens.
- `agent.compliance` blocks late-fee assessment that exceeds Orozco-reasonableness or violates the lease's late-fee clause.

### Success criteria

- ≥ 90% of overdue tenants get a first reminder within 24h of going overdue.
- PM can clear the rent roll review in < 3 minutes p50.
- Zero illegally-assessed late fees (compliance agent gate).

---

## Cross-journey notes

### Loading vocabulary

Every async surface has a defined loading state:
- < 200ms: no spinner (avoid flash)
- 200ms–1s: inline spinner or skeleton
- 1s–5s: progress with eta if known
- > 5s: route to background — "We're working on it. We'll notify you."

### Empty-state vocabulary

Empty states are warm, never blank. The tenant surface uses an illustration + sentence + action. The PM surface uses a tighter "all clear" or "nothing to do" caption plus the relevant primary action. Owner uses an editorial empty: "No statements yet — your first will arrive on the 5th."

### Error vocabulary

Errors are written in plain English with a path to recovery. We never surface a stack trace, an HTTP code, or a "something went wrong" — that's a failure of the design. See `07-voice.md` for the exact error-message rubric.

### Reduced motion

In every journey, motion is decorative-removable. Status transitions become opacity crossfades; the scroll-pinned demo becomes a static composite. Functionality never depends on motion.
