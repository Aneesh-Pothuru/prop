# 04 — Design References

**Audience:** The Design Agent (and humans pairing with it).
**Purpose:** A curated, opinionated bank of design references with explicit "do steal / don't steal" guidance for an AI-native property management platform that should feel like *Mercury × Ramp × Pilot* (confident fintech), with Linear-grade in-product craft, and warmth in the tenant PWA.
**Aesthetic north star:** deep navy + cream base, brass accent, display serif + clean sans, tabular figures, calm motion, quiet AI (no sparkle emojis, no chatbot bubbles).

---

## 0. How to read this document

Each reference has four parts:
1. **What we're borrowing** — the single most important thing.
2. **Specific URLs** — where to look on their site.
3. **Do steal** — patterns we will adopt.
4. **Don't steal** — where the reference would mislead us for a property-management use case.

Then we synthesize: a master table, a motion playbook, a landing-page recipe, dashboard and tenant-app reference lists, and anti-patterns to actively reject.

---

## 1. Mercury — confident fintech, dark editorial, calibrated type

**What we're borrowing:** the *posture* of a serious-money product, the muted dark palette, the obsession with calibrated type weights, and a separate typographic treatment for financial numerals.

**URLs of interest:**
- `https://mercury.com` — homepage, hero rotation, dashboard preview, editorial photography.
- `https://mercury.com/careers` — editorial layout, candid photography, all-caps section headers, generous vertical rhythm.
- `https://mercury.com/blog` — gradient washes, card grid, founder portraits, illustrated supporting assets.
- Visual-system breakdown: `https://blakecrosley.com/guides/design/mercury`
- Showcase: `https://siiimple.com/mercury-bank/`

**Concrete tokens worth knowing (from the breakdown):**
- Backgrounds: `rgb(15,15,20)` / `rgb(25,25,32)` / `rgb(38,38,48)` — three-tier elevation, not flat black.
- Text: `rgb(237,237,243)` primary, `rgb(170,170,185)` secondary, `rgb(120,120,140)` tertiary.
- Accent purple `rgb(108,92,231)` — Mercury's deliberately *non-banking* accent.
- Semantic financial: credit `rgb(52,211,153)`, debit `rgb(248,113,113)`, pending `rgb(251,191,36)`.
- Border `rgba(255,255,255,0.08)` — barely-there hairlines.
- Custom **Arcadia** variable font, with non-standard weights (480 for display, 420 for body) — "the brand's quiet typographic signature."
- **Financial-data type style:** 28px / weight 500 / tracking −0.5px / line-height 1.0. Distinct from body. Worth copying as a pattern even if our exact values differ.
- Card shadow `0 4px 24px rgba(0,0,0,0.4)`; CTA glow `0 0 24px rgba(108,92,231,0.3)` intensifying to `0.45` on hover.

**Do steal:**
- The idea that a fintech-credible product can be **dark-first or navy-first**, and that the dark *is* the message — not a toggle.
- A **three-tier elevation system** (background → surface → elevated) rather than a single panel color.
- A **dedicated typographic style for currency / numerals** that is visually distinct from headlines and body. This is the single most important borrow for us — rent rolls, balances, and ledgers will be everywhere.
- **Soft hairline borders** (`rgba(255,255,255,0.08)` or `rgba(10,20,40,0.08)` in light mode) over hard 1px lines.
- A muted, off-spectrum accent (our brass) instead of "banking blue" or "money green."
- All-caps section labels in careers/blog for editorial cadence.

**Don't steal:**
- The pure black background. We are navy + cream, not Mercury black. Black is monolithic; navy + cream lets us flex warmer in tenant surfaces.
- A single bright purple as the only accent — we want brass to be quieter and warmer; semantic colors should still feel restrained.
- The "founder portrait carousel" hero. Property operators do not respond to that genre; they respond to dashboards and numbers.
- Aspirational lifestyle photography. We are not selling lifestyle; we are selling fewer 9pm phone calls about leaks.

---

## 2. Ramp — operator-credible marketing, serif/sans pairing, density done well

**What we're borrowing:** the serif × sans pairing in marketing, the courage to put **product UI directly on the landing page at high density**, and the "Time is money. Save both." flavor of compressed headlines.

**URLs of interest:**
- `https://ramp.com` — homepage hero, product surfaces, partner logos.
- `https://ramp.com/expense-management` — high-density product screenshot strip ("Stay compliant with built-in guardrails," "Speed up spend approvals"), partner logos (Notion, Shopify), reimbursement timing copy.
- `https://ramp.com/customers` — alternating testimonial layouts, 20+ logo grid, executive-quote credibility model.
- `https://ramp.com/blog` — sans-dominant editorial, leadership bylines, sectioned category zones.
- Identity references: `https://fontsinuse.com/uses/38468/ramp-identity` — **TWK Lausanne** (sans) + **Burgess** (serif).

**Do steal:**
- **Sans for product / UI; serif (Burgess-like) for editorial moments** — large customer-story headlines, hero copy, pull-quotes. This is the single Ramp move that maps best to our "Mercury aesthetic + display serif" brief.
- The headline compression discipline: ≤8 words, value + value ("Time is money. Save both."). Our equivalents: "Run the building, not the inbox." / "Leases close themselves. You sign."
- **A trust strip immediately under hero** — partner / customer logos in grayscale, low-contrast, no animation. Quiet authority.
- **Showing actual product UI** in the marketing flow rather than illustrated metaphors. We will show rent rolls, lease pipelines, work-order queues — the real thing.
- Alternating testimonial layouts to prevent the case-study graveyard problem.
- Executive testimonials with explicit role (AP Manager, Controller, VP of Ops) — our equivalents need named roles ("Director of Operations, 1,400-unit portfolio").

**Don't steal:**
- Ramp's aggressive promotional offers and "Get started free" energy. We are not a self-serve PLG card; we are a contracted operating system. Tone is more like Pilot than Ramp on the bottom-of-funnel.
- The marketing emphasis on speed of onboarding ("get started in minutes"). Operators do not believe that, and saying it cheapens us.
- Ramp's full-bleed product screenshot density on every section — we'll selectively use it, but the dashboard surface is more complex and over-using it makes pages feel busy.

---

## 3. Pilot — accountant-credibility, problem-led headlines, calm purple

**What we're borrowing:** the *posture toward credibility*: relatable problem questions as headlines, named human experts, methodology breakdowns, and process clarity. Pilot proves that a "we-do-the-work-for-you" service can market itself without being giddy.

**URLs of interest:**
- `https://pilot.com` — homepage hero with problem-question headlines ("If you're buried in bookkeeping, who's leading the company?"), service area cards, case-study metrics.
- `https://pilot.com/bookkeeping` — service-page structure (value prop → feature showcase → process → integrations → resources), illustrated dashboard graphics, structured methodology callouts.

**Do steal:**
- **Problem-as-question headlines.** Operators respond to "If your rent roll closes on the 5th, why is your books closed on the 20th?" the same way SaaS founders respond to Pilot's bookkeeping question. This is a much stronger hook than "AI-powered property management."
- **Methodology / process panels** ("Onboarding → Communication → Accurate Books"). For us: "Import portfolio → Connect bank + GL → Agents take over inbox and renewals."
- **Named human credentials in marketing.** Pilot lists "Former investment banker," "Fortune 500 Finance Director." We should list our customer-success / implementation team's PM credentials (CPM, former regional director, etc.) on the customers / about page.
- **"Trusted by 3,000+ growth-driven startups"** style counters — we'll have "X buildings, Y units, $Z in rent processed."
- **Restrained CTA discipline:** two CTAs ("Get Started" / "Watch Demo") in the same purple, no third tertiary chip. Reduces decision fatigue.

**Don't steal:**
- The exact purple-on-purple palette. Reads slightly bookkeeperish and not as defensible as Mercury's restraint.
- Heavy reliance on illustrated dashboards (vector flat icons of clipboards / charts). We want real product UI, not metaphors.
- The "we're a service" framing. We are software with agents inside it; we should not signal we're a managed-service firm.

---

## 4. Linear — calm interface for a product in motion, craft motion

**What we're borrowing:** the design-refresh philosophy — *"don't compete for attention you haven't earned," "structure should be felt not seen"* — and the way Linear builds command palettes, status pills, and micro-motions.

**URLs of interest:**
- `https://linear.app` — hero, numbered section structure (1.0 Intake, 2.0 Plan, 3.0 Build), agent activity panels, customer logos.
- `https://linear.app/features` — looped product demos, modular feature cards (Plan, Build, AI, Insights), screenshot density.
- `https://linear.app/now/behind-the-latest-design-refresh` — the canonical write-up: dimmed sidebar, smaller icons, pill-shaped tabs, *warmer* gray for dark mode, softer separators.

**Concrete craft principles from the refresh:**
- Sidebar deliberately dimmed; primary content "wins" by being slightly louder, not by being loud.
- Top tabs as **compact pills** with rounded corners.
- Reduced icon usage; removed colored team-icon backgrounds.
- Default dark mode shifted from cool blue-ish to **warmer gray** for warmth.
- Animation timings: micro-interactions in the 150–250 ms range; layout transitions ≤300 ms; nothing performative.

**Do steal:**
- **Sidebar-recessed-by-default.** Make the table or workspace the loudest thing on screen.
- **Status pills as the language for state.** Renewal status, lease status, work-order status, payment status all live in a unified pill component family with consistent typography (small caps or all-caps, tabular figures, 11–12px).
- **Numbered section structure** in marketing (1.0 Collect rent, 2.0 Reconcile, 3.0 Renew, 4.0 Maintain) — gives the product a process feeling.
- The "warmer gray, not cool blue" lesson: our navy must have a *warm* undertone (slightly green/cream-shifted) so it doesn't feel like a 2014 SaaS gradient.
- **Command palette (`⌘K`)** as the universal action surface. Operators with 400-unit portfolios live in the command palette.
- **Quiet activity / agent stream pane** — separate from any conversation surface. Linear's agent surfaces are the closest existing model: an activity feed of what the agent is doing, with reasoning expandable.

**Don't steal:**
- The product is dark-by-default. We want a **light primary surface** (cream/off-white) for the operator dashboard so it pairs with the navy chrome and brass — and a navy variant for tenant-facing PWA. Dark is an option, not the default.
- The "engineering issue tracker" vibe of certain Linear surfaces — slightly too geek-coded for a property COO.
- Linear's monochrome palette across all states. We need warmer semantic color for "rent paid," "lease renewed," "vacancy filled" — small wins worth a quiet brass or sage signal.

---

## 5. Stripe — editorial premium, real animation engineering, scroll-pinned demos

**What we're borrowing:** the *engineering culture around motion*, not the specific cube. Stripe is the canonical reference for "animations that earn their performance budget" and scroll-pinned product demos.

**URLs of interest:**
- `https://stripe.com` — homepage waves, navigation morph, customer parallelogram photography.
- `https://stripe.com/sessions` — conference photography, breakout grouping, main-stage hierarchy.
- `https://stripe.com/blog/connect-front-end-experience` — the canonical engineering write-up on how Stripe builds its marketing motion: tiered animation strategy, custom cubic-bezier curves, Web Animations API for low dependency footprint, GPU-only animating of `transform` + `opacity`, `prefers-reduced-motion` support.
- Implementation deep-dive: `https://lokeshdhakar.com/dev-201-stripe.coms-main-navigation/`

**Concrete principles:**
- **Tiered animation system:** CSS transitions → CSS animations → Web Animations API → `requestAnimationFrame`. Pick the lowest-cost tool first.
- All animation durations **under 500ms** to stay responsive.
- **Custom `cubic-bezier()`** curves, never default `ease-in`/`ease-out`.
- **Intersection Observer** for trigger-on-visible, not scroll listeners.
- **`prefers-reduced-motion`** universally respected — animations downgrade to fades or off.
- 3D done with `transform-style: preserve-3d` and per-frame shading, not WebGL — keeps weight under 10 KB.

**Do steal:**
- The whole engineering posture: every animation has a budget and a reason.
- **Scroll-pinned product demos** for marketing — pin the dashboard, scroll narrates the agent doing rent collection, renewal, maintenance dispatch.
- **3D "building cutaway"** as a hero moment — done with `preserve-3d` + light/shadow interpolation, not Spline / a 10 MB GLB. A stylized navy building with floors lighting up as the camera pulls back, ≤8 KB.
- **Navigation morph** — popover container morphs to fit its content (good for our `⌘K` and notification panels).
- Photography that *forms the brand mark* (Stripe's parallelogram-from-real-scenes). For us: hallway / lobby / rooftop photography framed in a navy plate that echoes our wordmark.

**Don't steal:**
- The wave/gradient hero look. It's now strongly Stripe-coded; copying reads as cargo-cult.
- The "abstract globe / cube" hero metaphor. We have a literal subject (a building) — use it.
- Stripe's marketing density. Their pages are encyclopedic; ours should be operator-skim-friendly.

---

## 6. Vercel — dual-theme system, scroll-linked text reveal, status pulses

**What we're borrowing:** dual light/dark image and asset pipeline, scroll-linked text reveals on hero, and "live activity" indicators (pulsing globe nodes) as quiet AI signaling.

**URLs of interest:**
- `https://vercel.com` — hero, fluid-compute animations, light/dark asset pairs (e.g., `runway-light.svg` / `runway-dark.svg`), AI Gateway carousel through model providers.

**Do steal:**
- **Light/dark asset pairs for every illustration and screenshot.** Operator dashboard in light, tenant PWA in light, marketing in *both*.
- **Scroll-linked text reveal** on hero — words light up as the user scrolls past, dim as they scroll back. Use sparingly: only on the headline.
- **Pulse indicators on a map / floorplan** — when an agent is actively working in a building, the building pulses. Same idea as Vercel's globe activity.
- **Code/state carousel** — Vercel cycles through OpenAI/xAI/Anthropic provider snippets. We can cycle through agent tasks: "Drafting renewal letter… → Sent → Tenant signed → GL updated."

**Don't steal:**
- The fully developer-coded vibe. We borrow the pattern, not the audience signaling.
- Globe-as-hero. We're properties; the equivalent is a stylized building or a city block.

---

## 7. Raycast — keyboard-first density, glass surfaces, command-palette presentation

**What we're borrowing:** the command-palette as a marketing hero, glass-morphism on dark surfaces for the `⌘K` panel, keyboard-key visuals as content.

**URLs of interest:**
- `https://raycast.com` (also `https://www.raycast.com`) — "Your shortcut to everything" headline pattern, glass-effect backdrop in Snippets section, rendered Mac keyboards as illustration, all-caps feature labels ("Fast / Ergonomic / Native / Reliable").

**Do steal:**
- **Glass-morphism for the floating command palette and notification panels** — backdrop-filter blur on a translucent navy panel over the dashboard, with a hairline border. Used *only* for transient overlays.
- **Rendered keyboard shortcut chips** in marketing — show `⌘K`, `⌘ enter`, `g r` (go to rent roll) as actual key glyphs. Signals operator-power-tool.
- **All-caps adjective labels** ("FAST / AUDITED / WARM") as section dividers.
- Testimonials from named, design-credible roles ("Director of Ops, 3,200 units") in the same restrained card style.

**Don't steal:**
- The 3D isolated cube graphic. Now strongly Raycast-coded.
- The pure-dark marketing aesthetic. Raycast is single-mode; we are not.

---

## 8. Attio — dense, customizable table UI with breathing room

**What we're borrowing:** the dense-table-without-claustrophobia posture, multi-view (table / kanban / chart) parity, and the discipline of soft borders inside dense grids.

**URLs of interest:**
- `https://attio.com` — homepage (live-source thin, but indicative of CRM positioning).
- `https://www.saasui.design/application/attio` — 25 UI screenshots, full design language inventory.
- `https://dribbble.com/shots/11220447-Dark-Mode-Table` — dark-mode table reference shot.
- `https://nicelydone.club/components/df868c76-ee5f-4272-8537-401b9bd3075b` — Attio table component reference.
- Resource (250+ screens): `https://www.figma.com/community/file/1533024283737732966/attio-full-dashboard-ui-screens-250-screens-for-research-inspiration`

**Do steal:**
- **Custom objects + table parity.** Property, Unit, Lease, Tenant, WorkOrder, Vendor, Renewal each get a first-class table view with consistent column toolkit (sort, filter, group, view-as-kanban, view-as-chart).
- **Soft inner borders** — `rgba(0,0,0,0.06)` in light mode, `rgba(255,255,255,0.06)` in dark — rows are dense (32–36px) but never claustrophobic.
- **Sticky first column + sticky header** with subtle elevation shadow once scrolled.
- **Inline edit on click** — operators expect to edit a rent amount the way they'd edit a spreadsheet cell.
- **Row hover lifts** with a faint `1px` accent on the left edge (brass) showing focus.
- **Kanban/Chart parity** — every table can become a kanban (work-orders by status) or a chart (rent collected by month).

**Don't steal:**
- The full feature breadth in marketing. Attio's marketing shows every surface; that's overwhelming for our buyer. We sell one promise at a time.
- The unmodified Inter feel. Our dashboard sans should be slightly warmer (think Söhne, Inter Display, or General Sans) to pair with the display serif.

---

## 9. Height — AI-augmented dense PM tool, calm command surfaces (limited data)

**What we're borrowing:** Height was unreachable (503) at fetch time, but their established pattern in the category is worth naming: dense list/table UI with AI sidebar tasks, no chat-bubble UI, dark mode that uses warm grays.

**URLs of interest:**
- `https://height.app` — dense list/task UI, AI features integrated as agent actions, not chat.

**Do steal:**
- AI is a **column / action / drawer**, not a chat bubble. (E.g., "AI suggests rent uplift of $85" appears as a column value with a brass dot; clicking expands the reasoning.)
- Multi-pane layout: list (left/center), detail (right), agent activity (collapsible right-most).

**Don't steal:**
- Anything that feels like a Slack-clone with AI bolted on.

---

## 10. Condensed reference table

| # | Pattern | Reference URL | What we adopt | Where to use it in our product |
|---|---|---|---|---|
| 1 | Three-tier elevation in dark mode | `https://blakecrosley.com/guides/design/mercury` | Background → surface → elevated, with hairline borders @ 8% alpha | Operator dashboard chrome, modals, tenant PWA dark variant |
| 2 | Distinct typographic style for currency/numerals | Mercury financial-data spec (28/500/−0.5/1.0) | Dedicated currency style: tabular figures, slight negative tracking, tight leading | Every rent roll cell, balance, GL line, KPI card |
| 3 | Serif × sans pairing for editorial | `https://fontsinuse.com/uses/38468/ramp-identity` | Display serif (à la Burgess / GT Sectra / Tiempos Headline) + clean sans (à la Söhne / Inter Display) | Marketing headlines, customer stories, in-product page titles only |
| 4 | Numbered section structure | `https://linear.app` | 1.0 / 2.0 / 3.0 sections to signal a process | Landing page sections, onboarding flow, agent activity log |
| 5 | Status pills, unified family | `https://linear.app/now/behind-the-latest-design-refresh` | Single pill component for lease/payment/work-order/renewal states; 11–12px, tabular, all-caps | Every table cell that carries state |
| 6 | Scroll-pinned product demo | `https://stripe.com/blog/connect-front-end-experience` | Pin the dashboard, scroll narrates agent collecting / renewing / dispatching | Landing hero (one moment), product tour page |
| 7 | 3D building cutaway via `preserve-3d` | Same Stripe write-up | Stylized navy building, floors light up as camera pulls back, ≤10 KB | Single hero moment on homepage; never repeated |
| 8 | Layout-id status transitions | Motion React layout animations docs (`https://motion.dev/docs/react-layout-animations`) | Use `layoutId` so a card moving between columns (e.g., work-order from Open → In Progress → Done) animates as the same object | Kanban, renewal pipeline, payment pipeline |
| 9 | Glass-morphism command palette | `https://raycast.com` | Backdrop blur + translucent navy panel + hairline border for `⌘K`, notifications, agent peek | Floating overlays only, never persistent chrome |
| 10 | Dense table with soft borders | `https://www.saasui.design/application/attio` + `https://nicelydone.club/components/df868c76-ee5f-4272-8537-401b9bd3075b` | 32–36px rows, sticky header + first column, hairline borders, inline edit | Rent roll, leases, work-orders, vendors |
| 11 | Light/dark asset pairs | `https://vercel.com` | Every illustration & screenshot ships in both themes | Marketing, docs, in-product empty states |
| 12 | Trust strip below hero | `https://ramp.com` | Grayscale customer logos in a quiet strip, no carousel motion | Marketing homepage and pricing page |

---

## 11. Motion & animation playbook

All durations under 500 ms. All easings custom `cubic-bezier()`. All animations honor `prefers-reduced-motion`. Animate `transform` + `opacity` only.

### 11.1 Scroll-pinned hero demo (Stripe-class)
- **Pattern:** Pin the operator dashboard at 80vh; as user scrolls, three "scenes" play through (rent collection sweep → lease renewal sent → maintenance dispatched). Each scene is ~30vh of scroll.
- **Implementation hint:** Intersection Observer + GSAP `ScrollTrigger` *or* Motion React's `useScroll` + `useTransform`. Stripe's write-up: `https://stripe.com/blog/connect-front-end-experience`.
- **Where:** Landing hero, once.
- **Timing:** Each beat 600–900 ms; total scene ~2.5 s on dwell.

### 11.2 Agent-thinking stream (quiet, not chatty)
- **Pattern:** When an agent is working, a right-side activity drawer streams short past-tense lines:
  - `Reviewed lease #2042 · 14:02:11`
  - `Drafted renewal offer at +3.4% · 14:02:13`
  - `Awaiting tenant signature · sent via SMS`
- Each line fades in with a 6-frame typing-cursor flicker on the active line; no avatars, no bubbles.
- **References:** [AG-UI / A2UI streaming patterns](https://medium.datadriveninvestor.com/production-grade-agentic-apps-with-ag-ui-real-time-streaming-guide-2026-5331c452684a) — "separate the conversation from the activity stream."
- **Where:** Right rail of any object detail (lease, work-order, unit).
- **Anti-pattern to avoid:** ChatGPT-style bubbles. There is no chat. There is only an activity log.

### 11.3 3D building cutaway
- **Pattern:** Stylized navy building, 5–8 floors, brass-lit windows that pulse on/off as agents work. Camera pulls back from a single unit to whole building.
- **Implementation:** Pure CSS `transform: rotateX rotateY` with `transform-style: preserve-3d`; per-frame light interpolation in JS. ≤10 KB total. Pattern proven by Stripe's cube.
- **Where:** Landing hero, used once. Optionally a smaller version on the "Portfolio overview" empty state.
- **Don't:** Spline, Three.js, GLB models. Weight kills the brand promise.

### 11.4 Layout-id status transitions
- **Pattern:** When a work-order moves from `Open` to `In Progress` (drag, click, or agent action), the card animates as the same object across columns using `layoutId`. Same for renewal pipeline and rent collection pipeline.
- **Implementation:** Motion React `layoutId` + `AnimatePresence`. Reference: `https://motion.dev/docs/react-layout-animations`.
- **Timing:** ~250 ms, custom easing `cubic-bezier(0.32, 0.72, 0, 1)` (snappier than default).
- **Where:** Every kanban / pipeline surface.

### 11.5 Hover micro-interactions
- **Card hover:** 1px brass left-edge accent in, `translateY(-1px)`, shadow elevation increases by one tier. 150 ms.
- **Row hover (table):** background fill `rgba(brass, 0.04)`. No movement. 100 ms.
- **Button hover:** subtle glow expansion (Mercury pattern), filled buttons darken 4%, ghost buttons gain hairline. 120 ms.
- **Number tick on data update:** when a KPI changes (e.g., "Rent collected"), the digit rolls with a 180 ms odometer-style transition using tabular figures (so width never reflows).

### 11.6 Counter-on-scroll
- **Pattern:** Stats ("$X collected last month", "Y units managed") count up from 0 → final value when the section enters the viewport. Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out). Duration: 1100–1400 ms. Tabular figures keep the layout stable.
- **Where:** Marketing trust section (post-hero), customer story stat bars.
- **Reference:** general scroll-triggered animation discipline from `https://stripe.com/blog/connect-front-end-experience`.

### 11.7 Scroll-linked headline reveal
- **Pattern:** Hero headline words illuminate at full brand brass / cream as they cross 60% viewport; dim back to 35% opacity as they leave above. Used only once.
- **Reference:** Pattern documented in [Framer Motion scroll-linked component](https://www.framer.com/marketplace/components/motion-text-reveal/).
- **Where:** Landing hero headline only. Not in product.

### 11.8 Pulse-on-activity floorplan
- **Pattern:** On the portfolio map / floorplan, a building / unit emits a soft brass pulse (1.6 s loop, 0 → 0.6 opacity, 1.0 → 1.4 scale) when an agent action is in flight. Settles to a static brass dot when complete.
- **Reference:** Vercel's globe pulses.
- **Where:** Portfolio overview, unit-level activity.

### Motion budget summary
- Total JS for marketing motion: target **≤30 KB** (Motion React + GSAP ScrollTrigger or just Motion React).
- Total marketing-page hero animations: **3 max** (cutaway, scroll-pinned demo, counter-on-scroll).
- In-product motion: only state transitions and hovers. No decorative motion.

---

## 12. Landing-page section recipe (canonical structure)

Steal-list combined from Mercury, Ramp, Pilot. Tuned for an operator who has used AppFolio for ten years and is skeptical of the word "AI."

1. **Nav** — wordmark left, three sections (Product, Customers, Pricing), `Log in` and `Book a demo` right. Brass accent only on `Book a demo`. No mega-menu.
2. **Hero** (≤80vh):
   - Display-serif headline, ≤8 words. Problem-as-statement or capability-as-promise. Example: "Renewals that close themselves. Books that close on time."
   - Sans subhead, 16–18px, one sentence, names the operator: "An operating system for property managers who run real portfolios."
   - Primary CTA `Book a demo` (filled brass). Secondary `Watch the tour` (ghost).
   - Hero visual: **either** the 3D building cutaway **or** the scroll-pinned dashboard demo — *not both*.
   - Reference: Ramp's compressed headline + Mercury's dashboard preview pattern.
3. **Trust strip** — grayscale customer logos, 6–8 of them, no carousel motion. (Ramp pattern.)
4. **Numbered capability sections** (Linear pattern), 3–4 of them:
   - `1.0 Collect rent` — short paragraph + product UI screenshot (rent roll, partially filled).
   - `2.0 Close the books` — GL screenshot + animated reconciliation line.
   - `3.0 Renew leases` — pipeline kanban with one card mid-flight (layoutId animation).
   - `4.0 Maintain buildings` — work-order queue + agent activity stream.
   Each section: serif eyebrow ("01 / Collect"), sans headline, sans body, one screenshot, one customer quote inline.
5. **Quiet AI section** — single page-width band, navy field, brass accent. Headline: "Agents do the boring parts. You do the judgment calls." Three columns: *Renewals*, *Rent ops*, *Maintenance dispatch*. Each: a verb, one sentence, no illustration.
6. **Customer story spotlight** — one full-bleed quote, large serif, named operator with role + portfolio size. Counter-on-scroll stat row underneath (units managed, time saved, $ collected).
7. **Methodology / "how we onboard you"** (Pilot pattern) — four steps with named human owners on our side ("Implementation manager: Ana, former regional director, 8 yrs CBRE"). Calms the "rip out my AppFolio?" fear.
8. **Security / compliance band** — SOC 2, GLBA, encryption, audit trail. Quiet, single line, badges in grayscale. Mercury / Ramp put this near a CTA, not in the footer.
9. **Pricing teaser or CTA band** — "Book a demo" with a calendar embed or a Calendly-style availability strip. Single CTA.
10. **Footer** — three columns: Product / Company / Resources. Legal disclosures small but present (entity, NMLS-equivalent for any payment-processing partner, FDIC partner-bank language if applicable). Mercury / Ramp model.

**Don't put on the landing page:** comparison tables vs AppFolio, founder portrait carousel, blog feed, integration logo wall larger than 12 cells.

---

## 13. Dashboard reference list — what to mimic

For the **operator dashboard** (light-primary, navy chrome, cream surface, brass accents):

| Surface | Reference | What to mimic |
|---|---|---|
| Sidebar | Linear refresh (`https://linear.app/now/behind-the-latest-design-refresh`) | Dimmed by default; icons small; collapsible; warmer gray, not cool. |
| Top bar | Raycast (`https://raycast.com`) | Centered `⌘K`-style global search; right side: notification, agent activity icon, avatar. Hairline bottom border. |
| Tables | Attio (`https://www.saasui.design/application/attio`) | 32–36px rows; soft borders; sticky header + first column; inline edit; multi-select with bulk actions bar. |
| Status pills | Linear | All-caps 11px, tabular, single pill family across all states. |
| KPI cards | Mercury financial-data style | Tabular figures, currency style distinct from headlines, delta arrows in semantic color (sage / amber / rose — *not* primary green/red). |
| Kanban | Motion React `layoutId` | Same-object animation between columns; cards 240–280px wide; column header sticky. |
| Charts | Datawrapper-quality data type (`https://www.datawrapper.de/blog/fonts-for-data-visualization`) | Tabular figures in axis labels; series colors limited to 4 muted brand tones. |
| Detail drawer | Linear issue panel | Right-side drawer; three tabs (Details / Activity / Files); activity stream at bottom always visible. |
| Agent activity | Linear agent surfaces + AG-UI patterns | Right rail; past-tense lines; expand to see reasoning; no avatars. |
| Empty states | Mercury blog illustrations | Custom line illustrations in brass-on-navy, never stock vectors. |

**Density rule of thumb (operator):** target ~50–70% of an Attio screen's information density. Operators in 400+ unit portfolios want a lot on screen — but not Bloomberg-terminal levels.

---

## 14. Tenant-app reference list — softer, warmer, still in-system

The tenant PWA is where we soften. Same type system, same brass, but more cream, more white space, slightly larger touch targets, and one moment of warmth on each screen.

| Surface | Reference | What to mimic |
|---|---|---|
| Home | Mercury hero rotation (toned down) — `https://mercury.com` | One "next thing" card (rent due / package arrived / renewal coming up), serif greeting, calm imagery (no faces). |
| Pay rent | Mercury financial-data spec | Currency in display style, large, tabular. Clear breakdown (rent / fees / credits) on tap. |
| Maintenance request | Linear's compact issue creation | Single-screen form, three fields max above the fold, photo upload as a primary block, status pill on submitted requests. |
| Documents | Pilot bookkeeping presentation | Clean card list of lease, addenda, receipts. Serif file names, sans metadata. |
| Notifications | Vercel pulse pattern (toned down) | A single brass dot, no badge counts above 9. |
| Empty states | Custom warm illustrations | Brass + cream, one line of copy, never "Oops!" or exclamation marks. |
| Motion | Linear timing | 200–250 ms for all transitions. No bounce. |

**Tenant copy voice:** plain, no fintech bravado. "Your rent of $2,140 is due Tuesday. Pay now or set autopay." Never "Crush your rent goals."

---

## 15. Anti-pattern list — actively reject

These are the patterns we will see in 80% of property-management software competitors and 60% of AI-startup landing pages. We do not do them.

- **Sparkle emojis (✨, 🪄, ⚡) around AI features.** Quiet AI. The agent doesn't sparkle; it just does the work.
- **Chatbot bubble UI.** No avatars, no "Hi! I'm your AI assistant!" The agent is an activity stream and a set of column values, not a personality.
- **Generic SaaS hero copy.** Banned phrases: *supercharge*, *unlock*, *streamline*, *revolutionize*, *empower*, *next-generation*, *AI-powered*, *built for the modern X*. Replace with verbs that describe the work: *collect*, *close*, *renew*, *dispatch*, *reconcile*.
- **Decorative-only motion.** Parallax that does nothing; gradient meshes that fade in for no reason; cursor trails. Every animation must communicate state change or guide attention.
- **Stock illustrations** (Storyset, unDraw, Humaaans). Custom or nothing. If we cannot afford custom yet, use real product UI.
- **Gradient mesh backgrounds.** They were 2021. We are navy + cream with a single brass accent.
- **Carousels of testimonials with autoplay.** Static, alternating layouts (Ramp pattern) instead.
- **Comparison-vs-AppFolio tables on the landing page.** Punching down reads as insecure. Reserve for a dedicated `/vs/appfolio` page if needed.
- **"Founders" hero on the homepage.** That is a careers / about page move (Mercury careers). The product page belongs to the product.
- **Dark patterns in pricing** — no "Most popular" trickery, no fake discount timers. We are a serious-money product; act like one.
- **More than two CTAs above the fold.** One primary, one ghost. Pilot's discipline.
- **Bouncy easing curves** (`cubic-bezier(0.68, -0.55, 0.27, 1.55)`). Confident fintech does not bounce.
- **Glass-morphism on persistent chrome** (the sidebar, the top bar). Glass is for transient overlays only — `⌘K`, notifications, agent peek.
- **Skeleton loaders that shimmer.** Use static low-contrast bars; shimmer reads as "loading-spinner Etsy."
- **"Powered by GPT-4 / Claude" badges.** The model is implementation detail; do not put it on marketing.

---

## 16. Source URLs (for the Design Agent's reference run)

**Mercury**
- `https://mercury.com`
- `https://mercury.com/careers`
- `https://mercury.com/blog`
- `https://blakecrosley.com/guides/design/mercury` — design-system breakdown with exact tokens
- `https://siiimple.com/mercury-bank/`

**Ramp**
- `https://ramp.com`
- `https://ramp.com/expense-management`
- `https://ramp.com/customers`
- `https://ramp.com/blog`
- `https://fontsinuse.com/uses/38468/ramp-identity` — TWK Lausanne + Burgess

**Pilot**
- `https://pilot.com`
- `https://pilot.com/bookkeeping`

**Linear**
- `https://linear.app`
- `https://linear.app/features`
- `https://linear.app/now/behind-the-latest-design-refresh`

**Stripe**
- `https://stripe.com`
- `https://stripe.com/sessions`
- `https://stripe.com/blog/connect-front-end-experience` — engineering write-up on motion
- `https://lokeshdhakar.com/dev-201-stripe.coms-main-navigation/`

**Vercel**
- `https://vercel.com`
- `https://www.framer.com/marketplace/components/motion-text-reveal/` — scroll-linked text reveal

**Raycast**
- `https://raycast.com`
- `https://www.raycast.com`

**Attio**
- `https://attio.com`
- `https://www.saasui.design/application/attio`
- `https://dribbble.com/shots/11220447-Dark-Mode-Table`
- `https://nicelydone.club/components/df868c76-ee5f-4272-8537-401b9bd3075b`
- `https://www.figma.com/community/file/1533024283737732966/attio-full-dashboard-ui-screens-250-screens-for-research-inspiration`

**Height** (limited reach during research)
- `https://height.app`

**Motion / animation references**
- `https://motion.dev/docs/react-layout-animations` — layoutId, shared element transitions
- `https://motion.dev/docs/react-transitions` — easing, transitions
- `https://medium.datadriveninvestor.com/production-grade-agentic-apps-with-ag-ui-real-time-streaming-guide-2026-5331c452684a` — agent activity stream patterns
- `https://www.patterns.dev/react/ai-ui-patterns/` — AI UI patterns
- `https://www.datawrapper.de/blog/fonts-for-data-visualization` — tabular figures, dashboard fonts

---

## 17. One-paragraph brief for the Design Agent

Build a system that looks like Mercury after it grew up in a finance department: deep navy chrome, cream and off-white primary surfaces, a single brass accent, a display serif (Burgess/GT-Sectra/Tiempos-class) for marketing and page titles only, a clean warm sans (Söhne/Inter-Display-class) everywhere else, and tabular figures across every number on screen. Borrow Ramp's serif × sans editorial confidence, Pilot's problem-as-question headline discipline, Linear's calm-interface-in-motion philosophy and status-pill / command-palette craft, Stripe's engineering posture toward animation (tiered, performant, custom easings, ≤500ms), Vercel's dual-theme asset pipeline and scroll-linked reveals, Raycast's glass-overlay-for-transient-surfaces pattern, and Attio's dense-but-breathing tables. Animate state changes (layoutId, hovers, counter-on-scroll) but reject decorative motion. The agent appears in the product as an activity stream and as column values — never as a chat bubble, never with a sparkle emoji, never with an avatar. The operator dashboard is light-primary and dense; the tenant PWA is warmer, looser, and quieter — but uses the exact same primitives.
