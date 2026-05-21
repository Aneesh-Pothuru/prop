# 03 — Landing Page

The single most important artifact in Phase 1. A 50-unit PM in Oakland with eight tabs open should land here, scroll once, and decide we're worth a free-tier signup.

This document is the IA, the copy, and the interaction spec for `/`. Implementation lives in `apps/web/app/page.tsx` and `apps/web/components/marketing/*`.

**Voice anchor:** Mercury ("Banking — redesigned from the ground up") + Stripe (developer-pragmatic), with editorial restraint borrowed from Pilot. No exclamation points. No "supercharge." No "10x." No "AI-powered" qualifier slapped on nouns.

**Borrowed proportions:**
- Hero pacing from Mercury: short display headline, one positioning sentence, two CTAs, demo immediately below.
- Section opener structure from Linear: numbered eyebrow (`01 — Triage`), display headline, supporting paragraph, demo.
- Pricing presentation from Stripe: three tiers side-by-side, per-door pricing, no surprise asterisks.
- Trust band from Mercury: small logos + audited language.

---

## Page outline

```
NAV (sticky, blur on scroll)
HERO
  └─ scroll-pinned dashboard demo (3 viewport heights)
PROBLEM FRAMING (spreadsheet vs. us, two columns)
THE FOUR AGENTS
  ├─ 01 — Triage
  ├─ 02 — Diagnosis
  ├─ 03 — Dispatch
  └─ 04 — Ledger
COMPLIANCE MOAT (California-first)
TRUST (security, audit, reversibility, SOC 2 in flight)
PRICING (Free, Pro, Scale)
WALL OF QUOTES (placeholder testimonials)
CLOSING CTA
FOOTER
```

---

## Section 1 — Nav

**Layout.** 72px tall. Brass wordmark left. Right side: `Product`, `Pricing`, `Security`, `Sign in` (text link), `Get started` (brass button, md).

**Background behavior.** Transparent on top of hero. After 8px of scroll, transitions to `surface.canvas` with `backdrop-filter: blur(20px)` and `border-bottom: 1px solid border.subtle`. Transition: `motion.base` (180ms).

**Mobile.** Collapses to wordmark + hamburger. Hamburger opens a full-screen sheet with the same five items and a divider above *Get started*.

**Wordmark.** Lowercase, display serif, brass-on-ink at the canvas, brass-on-canvas when scrolled. Working placeholder name: **stoa** (we ship under a working name; the product name decision is deferred). Treat the word `stoa` in this doc as the wordmark; substitute the final name later.

**Copy:**
- `Product` `Pricing` `Security` `Sign in` `Get started`
- No "Resources." We earn that page when there's something to put on it.

---

## Section 2 — Hero

**Layout.**

- Outer padding: 96px top / 80px bottom desktop; 64/56 mobile.
- Centered narrow column for text (max 880px). Left-aligned, not centered.
- Two CTAs immediately under the positioning sentence.
- Below, full-bleed (within 1440 max) container holding the scroll-pinned dashboard demo. The demo's top edge sits 64px below the CTAs.

**Type.**

- Eyebrow `overline`: **PROPERTY MANAGEMENT, REWRITTEN**
- Headline `display-2xl` serif:
  > Run a portfolio like a software company.
- Subhead `body-lg`, `text.secondary`, 2 lines max:
  > Stoa is the AI-native property platform for California operators. Tenants pay rent, file claims, and chat with agents that triage, diagnose, dispatch, and reconcile — so you stop living in spreadsheets and SMS threads.

**CTAs.**

- Primary: `Get started — free for 10 units` (brass, md). Routes to `/signup`.
- Secondary: `See a live demo` (ghost, md). Anchors to the demo section (also activates a 4-second auto-scrub if user is on a desktop).

**Below the CTAs.**

Small caption row, `caption`, `text.muted`:
> No credit card · Imports from Buildium and AppFolio · CA-compliant from day one

**Scroll-pinned dashboard demo (the centerpiece).**

A fixed dashboard frame pins for ~3 viewport heights of scroll. Six beats animate inside:

1. **Beat 1 — Claim arrives.** Tenant text appears in the right-hand thread: *"Outlet in kitchen sparked when I plugged in the toaster. Tripped the breaker. Smells faintly of plastic."* StatusPill: `New`. ClaimCard slides into the queue on the left.
2. **Beat 2 — Triage.** Caption appears: *Triaged · electrical · medium · 0.6s*. The card in the queue lights with a 1px brass left rule.
3. **Beat 3 — Diagnosis.** AgentStream begins typing in the thread: *"Sounds like the GFCI tripped from a high-draw appliance. Before I send anyone out — can you look at the outlet face? Is there a red or black button between the two sockets?"*. Tenant replies (typed in by the demo): *"Yes, a red one. It clicked when I pressed it. Toaster works now."*
4. **Beat 4 — Resolution proposal.** Agent: *"That fixed it — the GFCI is doing its job. I'd recommend a licensed electrician check the outlet within 30 days. I'll log this and let your PM confirm. Anything else?"* Status pill flips New → Resolved (animated layout).
5. **Beat 5 — Ledger reconciles a payment in the corner.** A separate side-panel shows: *"Maya Chen · $2,400.00 ACH · matched to Mar invoice · posted · 0.4s."* MoneyCell counts up.
6. **Beat 6 — Compliance citation surfaces.** Bottom-left small badge: *"AB-1482 cap respected. Late fee within § 1671 reasonableness."* Quiet, no sparkle.

The pinned container has a thin caption line at top: *"Live demo · seeded data · not a recording"*. After the 6 beats, the pin releases and the page continues.

**Interaction notes.**

- The demo respects `prefers-reduced-motion`. In that mode, the demo becomes a static composite of all 6 beats stacked.
- Scrubbing supported: dragging the scroll wheel back and forth replays in either direction.
- Don't use Lottie. Use Framer Motion `useScroll`/`useTransform` mapped to per-beat opacity + transform timelines. Detail in `04-motion.md`.

---

## Section 3 — Problem framing

**Eyebrow:** `THE OLD WAY`

**Headline `display-lg`:** What it actually feels like.

**Layout.** Two columns. Left: "Today" — `surface.sunken`, cream tone, slight inset shadow. Right: "With stoa" — `surface.paper`, brass left rule.

**Today (left column).**

Title `h3`: *Today*

Body `body`:
> A tenant texts you at 9:14pm: "the upstairs sink is leaking again." You don't remember if Jorge is the right plumber for this unit. You scroll back through three months of WhatsApp. You text Jorge. Jorge texts back tomorrow. Meanwhile the tenant is sleeping in a damp apartment. Rent posts to Stripe but you forgot to mark it in the sheet. The owner emails: "did we collect this month?" You don't have a clean answer.

Below: a list of five bullets in `body-sm`, `text.muted`:
- Three apps that don't talk
- A spreadsheet you don't trust
- A vendor list in your head
- A compliance worry you push down
- Notices you write from memory

**With stoa (right column).**

Title `h3`: *With stoa*

Body `body`:
> The same text arrives in the tenant's app. Triage classifies it. Diagnosis asks the right four questions, and half the time the tenant fixes it themselves. When a visit is needed, you see a draft dispatch with a contractor who has the right license and a quote that fits the lease. You approve, or you don't. Rent reconciles itself. The owner sees the same numbers you do.

Below: five bullets in `body-sm`, `text.primary`:
- One thread per tenant, one ledger per property
- Agents that do the first hour of work
- A vendor network that has the right license for the job
- Notices that cite the right statute on the first draft
- Reversible within 24 hours, audit-logged forever

**Motion.** On scroll into view, each bullet on the right fades + slides 8px from the right with a 40ms stagger (`motion.base`).

---

## Section 4 — The four agents

A section per agent. Same template. Eyebrow with the agent number, display headline, supporting paragraph, demo block.

### 4.1 — Triage

**Eyebrow:** `01 — TRIAGE`

**Headline `display-lg`:** It picks up before you do.

**Paragraph `body-lg`:**
> Every inbound — chat, SMS, email — lands here first. Triage classifies category and urgency, decides who handles it, and either hands the conversation to a specialist or flags you. It does not pretend to be a chatbot. It is the thing that decides whether the next minute matters.

**Demo block.** A static-feel ClaimCard with three rows showing three different inbound messages and their classifications:

| Inbound | Category | Urgency | Routed to |
|---|---|---|---|
| "the upstairs sink is leaking" | Plumbing | High | Diagnosis Agent |
| "i won't be able to pay rent until the 5th" | Payment | Medium | PM + Ledger Agent |
| "are you the new manager? i never got a copy of my lease" | Documents | Low | Knowledge Agent |

The right column shows the resulting routes as small ToolCallChips lighting up in sequence on view.

### 4.2 — Diagnosis

**Eyebrow:** `02 — DIAGNOSIS`

**Headline `display-lg`:** Half the visits never need to happen.

**Paragraph `body-lg`:**
> A Socratic loop with the tenant — three or four questions, optional photo, occasional video. It cites § 1941.1 habitability when responsibility matters and proposes a path: self-resolve, schedule, or escalate. When a contractor is needed, it hands a full report to dispatch with a cost band so you know what to expect before you approve.

**Demo block.** Replays the GFCI exchange from the hero demo, but interactively — visitor can click to send the tenant's next reply. Three preset replies offered ("Yes, red button," "No red button," "Smells like burning"). The agent's response branches.

### 4.3 — Dispatch *(Phase 2 — shown as preview)*

**Eyebrow:** `03 — DISPATCH`

**Headline `display-lg`:** The right license, on the right day.

**Paragraph `body-lg`:**
> When a job needs hands, dispatch sources a contractor with the right CSLB-verified license, a quote that respects your lease's expense thresholds, and a scheduled window the tenant has agreed to. You approve once, or you set a threshold and approve automatically below it. Every action is reversible within 24 hours.

**Phase 2 badge.** Small caption: *Available Q3 — currently in supervised pilot.*

**Demo block.** Static dispatch card mock — vendor name, CSLB # (clickable to validate), distance, three-day availability window, quote $185, *Approve and dispatch* CTA.

### 4.4 — Ledger

**Eyebrow:** `04 — LEDGER`

**Headline `display-lg`:** A trust account you can actually trust.

**Paragraph `body-lg'`:**
> Double-entry from day one. Every payment matched to an invoice, every late fee calculated against your lease policy and California's § 1671 reasonableness test, every owner statement reconcilable to the cent. If something looks wrong, it is — and the ledger will tell you which entry to look at first.

**Demo block.** A LedgerRow list (compact table) showing 7 entries:

```
Mar 1  Invoice posted        Mar rent — 2417 Telegraph, Unit B   $2,400.00
Mar 1  Auto-reminder sent    SMS to tenant                              —
Mar 4  Payment received      ACH from M. Chen                    $2,400.00
Mar 4  Matched + posted      Ledger reconciled                          —
Mar 6  Owner share posted    Owner statement 03/2024             $1,920.00
Mar 6  Mgmt fee retained     8% per agreement                     $192.00
Mar 6  Trust ledger updated  Running balance: $4,318.40                 —
```

Right-aligned money in MoneyCell tabular. The reconciliation row is highlighted in a 1px brass left rule.

---

## Section 5 — Compliance moat

**Eyebrow:** `CALIFORNIA-FIRST`

**Headline `display-lg`:** Built for the law that's actually on the books here.

**Paragraph `body-lg`:**
> The incumbents were built in Texas or Utah and shoehorned to California later. We are doing the inverse. Stoa enforces California landlord-tenant law as a runtime guard, not a wiki page. Every action — drafting a notice, raising rent, withholding from a deposit — runs through the compliance agent before it goes out. If it would violate a statute, it does not go out.

**Statute list.** A two-column grid of compliance citations rendered in `mono-sm` code-style chips. Each chip has a tooltip with the plain-English summary.

Left column:
- `AB-12` Security deposit cap of one month's rent
- `AB-1482` Annual rent cap 5% + CPI, max 10%
- `Civ. § 1947.12` Just-cause termination
- `Civ. § 1671` Late fee reasonableness (Orozco)
- `Civ. § 1941.1` Habitability
- `Civ. § 1950.5` Deposit return timeline

Right column:
- `Civ. § 1954` 24-hour entry notice
- `AB-2347` 10-day UD response window
- `SB-329` Source-of-income protection
- `SB-1100` Fair Chance Housing
- `Gov. § 12955` Fair housing language scan
- `City overlays` SF, LA, Oakland, Berkeley, Santa Monica

Below the grid, a small `caption`:
> Rule library reviewed by external CA tenant-law counsel before pilot. New statutes patched in within 30 days of effective date.

---

## Section 6 — Trust

**Eyebrow:** `TRUST`

**Headline `display-lg`:** The things that should be boring.

**Layout.** Four cards in a row at `bp.lg+`, stacking on mobile.

| Card | Title | Body |
|---|---|---|
| 1 | Audit log | Every action — by you, your team, or an agent — is logged with actor, target, before, after, and a trace id. Replayable for 24 months. |
| 2 | Reversible by default | Any agent action can be reversed by you in one click within 24 hours. After that, by support ticket within 30 days. |
| 3 | Security posture | Encrypted at rest (AES-256) and in transit (TLS 1.3). Row-level isolation per workspace. SOC 2 Type I in flight; Type II by end of pilot. |
| 4 | Your data is yours | One-click export of every property, lease, ledger entry, claim, and document in standard CSV + JSON. No retention after offboarding. |

Each card: `surface.paper`, `radius.lg`, `space.6` padding, `shadow.hairline`. Title in `h3`, body in `body`.

**Below the cards.** A small horizontal `Trusted by` row of placeholder logos. In Phase 1 use a single line of caption type instead until we have real logos:
> Piloting with twelve California operators across the Bay Area and Greater Los Angeles. Talk to one of them — `pilots@stoa.app`.

---

## Section 7 — Pricing

**Eyebrow:** `PRICING`

**Headline `display-lg`:** Per door. No per-feature.

**Subhead `body-lg`:**
> Free for ten units. Then a flat per-door price that includes every agent, every integration, every compliance update. We don't sell features back to you.

**Three tiers, side-by-side at `bp.lg`+, stack on mobile.**

| | Free | Pro | Scale |
|---|---|---|---|
| Headline | Free | Pro | Scale |
| Per-unit price | **$0** | **$4 / unit / month** | **$3 / unit / month** |
| Unit cap | up to 10 | up to 100 | unlimited |
| Includes | Tenant PWA, rent collection (ACH only), claim filing, Triage + Diagnosis agents, Knowledge agent (5 docs), CA compliance | Everything in Free, plus card payments, Communications agent, Ledger agent with auto-reconciliation, all CA city overlays, owner portal *(Q3)*, vendor dispatch *(Q3)* | Everything in Pro, plus dedicated implementation, custom integrations, SAML SSO, prioritized agent capacity, audit log API |
| Support | Email, 48h | Email + chat, business hours | Slack channel + named CSM |

**CTA per tier.**

- Free: `Get started` (brass primary)
- Pro: `Start free, upgrade when you cross 10` (brass primary, same color — Pro is the default destination, no visual hierarchy game)
- Scale: `Talk to us` (ghost) → routes to a real human, not a form.

**Below the cards.** Caption `text.muted`:
> Per-door pricing includes Stripe and Plaid processing on the pass-through model: ACH is free, cards charge the standard 2.9% + $0.30 that we don't mark up. We do not charge per agent run or per message.

**No "Enterprise" tier without a price.** If a PM has 500+ units, they're on Scale and we publish the price.

---

## Section 8 — Wall of quotes (placeholder)

**Eyebrow:** `IN PILOT`

**Headline `display-lg`:** Hear from operators in the pilot.

**Layout.** Three large quote cards, plus a 9-quote masonry below (smaller).

**Three featured quotes (placeholder until pilot completes).**

> "I used to spend Saturdays catching up on tenant texts. I now spend Saturdays not doing that."
> — **D. Ramirez**, owner-operator, 42 units · Oakland

> "The first time the compliance agent stopped me from posting a late fee that violated my own lease, I knew this was different."
> — **A. Singh**, founder, Singh Properties · San Jose, 14 units

> "The ledger matches my QuickBooks to the cent without me touching either. It should not be this rare."
> — **P. Goldstein**, principal, Goldstein Residential · Santa Monica, 78 units

Smaller masonry: 9 single-line placeholders rotated through. We replace all 12 with real pilot quotes by end of Phase 1.

**Visual.** Each card: `surface.paper`, brass quote glyph upper-left at 28px, name + role in `body-sm` italic, location in `caption text.muted`.

---

## Section 9 — Closing CTA

**Layout.** Full-bleed band, `surface.inverse` (ink.900). Cream type.

**Type.**

- Eyebrow `overline` in `brass.400`: `THE NEXT FIRST OF THE MONTH`
- Headline `display-xl`:
  > Get this off your plate before it lands again.

**CTAs.**
- Primary: `Get started — free for 10 units` (brass, lg)
- Secondary: `Read the security overview` (ghost on dark, lg) → `/security`

**Below CTAs.** Small `caption`, `text.muted` on dark:
> ~12 minutes to import a portfolio. No card to start.

---

## Section 10 — Footer

**Layout.** Four columns at `bp.lg+`, stacked on mobile. `surface.canvas` (cream), `border-top: 1px solid border.subtle`.

| Product | Company | Compliance | Get in touch |
|---|---|---|---|
| Tenant PWA | About | California rules | Contact |
| PM dashboard | Security | Privacy | Pilot program |
| Pricing | Changelog | Terms | `hello@stoa.app` |
| Status | Press kit | DPA | |

Bottom band: brass wordmark + tagline ("Property management, rewritten.") + `© 2026 Stoa, Inc. · Made in California` in `caption`. Status indicator (small green dot + "All systems operational") links to `/status`.

---

## Motion summary for the page

| Element | Trigger | Spec |
|---|---|---|
| Nav background | scroll > 8px | crossfade to blurred canvas, 180ms |
| Hero headline | onLoad | 480ms staggered word reveal (display only; reduced-motion: instant) |
| Scroll-pinned demo | scroll within section | useScroll → 6 beat keyframes, 3vh per beat |
| Problem framing bullets | inView | 8px slide-in + fade, 40ms stagger |
| Agent demo cards | inView | 12px fade-up, 180ms |
| Statute chips | hover | tooltip 200ms delay, 120ms fade-in |
| Pricing cards | inView | fade-up sequential, 80ms stagger |
| Counters in trust band (Phase 2 stat callouts) | inView | 1.2s eased count, mono-lg |
| Closing CTA band | scroll | parallax 8px on ink surface only — subtle |

Reduced-motion globally: opacity-only fades, no transforms, demo becomes a 6-panel static grid.

---

## What the landing page must not do

- No "AI" in the H1.
- No sparkle emoji anywhere on the page.
- No "Trusted by leaders at Google, Stripe, Notion" — they aren't, yet.
- No animated counters of vanity metrics ("17M claims resolved!") before we've resolved them.
- No mega-menu in the nav. Five links is enough.
- No floating chat widget. The product is chat-quality; the marketing site is editorial.
- No "Book a demo" form as the only conversion path. Self-serve is the default.
- No exclamation points in copy. None.
