# Competitive Teardown: Property Management SaaS

**Audience:** Product/founders designing an AI-native PM SaaS for California operators managing 1–500 units.
**Date:** May 2026
**Scope:** 10 incumbents + the new wave of AI-native challengers (2023–2026).

---

## 1. The Market Map

The SMB-PM market splits into four camps:

| Camp | Examples | Typical buyer | Price posture |
|---|---|---|---|
| **Mid-market incumbents** | AppFolio, Yardi Breeze | 200–2,000 units, professional PMC | $1.40–$5/unit/mo + minimums |
| **SMB incumbents** | Buildium, DoorLoop | 1–500 units, professional PMC | Flat tier or $3/unit/mo |
| **DIY / "free" landlord tools** | TurboTenant, Avail, RentRedi, Innago, Stessa | 1–50 units, individual owner | $0–$30/mo flat |
| **Hybrid leasing** | Hemlane | Owners who hate leasing | $30–$86/mo + a-la-carte agent fees |
| **AI-native challengers (2023–2026)** | EliseAI, Avery, HeyPurple, MagicDoor, Brickwise, Stan AI, Haven, Super | Anywhere from indie LL to enterprise | Per-unit, per-conversation, or $2.50/lease |

The wedge: between the "incumbent that bolted on a chatbot" and the "AI point tool that solves one task," there is no AI-native full-stack PM platform for the **20–500 unit operator who also lives in California-specific compliance hell**.

---

## 2. Per-Product Teardown

### 2.1 Buildium (RealPage)

- **Target:** Professional PMCs, 50–5,000 units. Residential + association + commercial.
- **Pricing (2026):** Essential $62/mo · Growth $192/mo · Premium $400/mo (no per-unit pricing; usage caps + add-on fees). ([Buildium pricing](https://www.buildium.com/pricing/), [KDS pricing breakdown](https://www.kdsdevelopment.net/articles/buildium-pricing-2026-property-management-costs))
- **Feature surface:** Tenant portal (full), owner portal (full), screening, eSign (Growth+), online payments (EFT free / cards 2.99%), full double-entry accounting w/ trust accounting, inspections (Growth+), eLeasing, maintenance, communications, reports, mobile apps for staff + tenants.
- **AI shipped — Lumina AI:** AI Assistant (in-product guidance) on all tiers; "Write with AI" message generation (Growth+); AI Bill Scan, Lumina AI Accounting Agent (beta), Business Operations Agent — **Premium-only at $400/mo**. ([Lumina AI](https://www.buildium.com/features/ai-property-management-software/))
- **Integrations:** RealPage ecosystem, Apartments.com syndication, MSI/HappyCo inspections (via partnerships), QuickBooks (export only — not a true sync), Open API on Premium only.
- **Does well:** Strong trust accounting & owner statements; broad feature surface; established brand; community association support.
- **Does poorly (per Capterra/G2/BBB):** Support is the #1 complaint — templated replies, ticket black holes, untrained reps, different answers per call. Reporting flagged as inflexible; users still need QuickBooks alongside. ACH funding delays and bounced ACH 5 days post-deposit on the payment rails reported in BiggerPockets threads. October 2025 complaint: a maintenance-coordinator integration was removed with no advance notice. ([Capterra reviews](https://www.capterra.com/p/47428/Buildium-Property-Management-Software/reviews/), [BBB complaints](https://www.bbb.org/us/ma/boston/profile/computer-software/buildium-llc-0021-28244/complaints), [BiggerPockets](https://www.biggerpockets.com/forums/80/topics/1279418-what-property-management-software-are-you-using-and-what-frustrates-you-most-about))

### 2.2 AppFolio Property Manager

- **Target:** 50+ units to enterprise (3,000+). Multifamily, SFR, student, HOA.
- **Pricing (2026):** Core $1.49/unit/mo (min $298) · Plus $3.20/unit/mo (min $960) · Max $5/unit/mo (min $7,500). Onboarding $400+. ACH ~$0.25 per txn, cards 2.99%. ([AppFolio pricing](https://www.appfolio.com/pricing), [Ledger Labs breakdown](https://theledgerlabs.com/how-much-does-appfolio-cost/))
- **Feature surface:** End-to-end — leasing CRM, screening, full accounting, AP/GL, maintenance with vendor network, inspections via mobile, owner/tenant portals, communications (text/email), 180+ reports, Investment Manager add-on.
- **AI shipped — Realm-X:** Realm-X Messages (suggested replies, +26s/message saved), Realm-X Flows (73% higher lead-to-showing), Realm-X Leasing Performer (autonomous lead handling + tour scheduling), Realm-X Maintenance Performer (diagnoses + creates work orders incl. via image). Lisa AI leasing assistant (legacy, now folded into Realm-X). Claims 10 hrs/week saved per user. ([AppFolio AI](https://www.appfolio.com/ai), [AppFolio AI Agents press release](https://www.appfolio.com/newsroom/appfolio-ai-agents))
- **Integrations:** Plaid, Knock CRM, RentSpree, NWP utility billing, Petscreening, etc. AppFolio Stack marketplace.
- **Does well:** Single integrated stack, strong mobile, best-in-class AI distribution to existing customers, deep CRM/leasing.
- **Does poorly:** **$298/mo minimum and 50-unit floor exclude the 1–49 unit segment entirely.** Support widely panned on G2/Capterra/Trustpilot — "no one to call, only a chat." Reporting inflexibility, accounting reconciliation friction. Most damning: a recent G2 review notes the maintenance AI chatbot "is incapable of handling more than a single issue at a time, removes all the details the tenant included, and unilaterally ends the chat with an incomplete report." ([G2 reviews](https://www.g2.com/products/appfolio/reviews), [Trustpilot](https://www.trustpilot.com/review/appfolio.com))

### 2.3 DoorLoop

- **Target:** Indie landlord up through mid-size PMC (1–500+). The "Buildium killer" positioning.
- **Pricing (2026):** Starter $69/mo (annual, up to 20 units) · Pro $149/mo annual ($189 monthly) + $3/unit · Premium $209/mo annual ($239 monthly) + $3/unit. ([DoorLoop pricing](https://www.doorloop.com/pricing))
- **Feature surface:** Tenant portal, owner portal, screening, eSign (Premium free; Pro paid), online payments, full accounting w/ QuickBooks two-way sync, maintenance, listings syndication (Pro+), CAM reconciliation (Premium), workflows automation (Pro+).
- **AI shipped:** **DoorLoop AI Assistant** (in-product chat, resolves "up to 80%" of tenant questions, drafts replies, surfaces trends) — Pro+ tier. **DoorLoop AI Inspections** (Feb 2026) — multi-photo capture turns hour-long inspections into minutes, included unlimited in Pro+. ([DoorLoop AI Assistant](https://www.doorloop.com/ai-assistant), [DoorLoop AI Inspections release](https://www.prnewswire.com/news-releases/doorloop-launches-ai-inspections-to-help-property-managers-work-smarter-and-faster-302682012.html))
- **Integrations:** QuickBooks Online (two-way), Zapier (Premium), open API (Premium), Plaid, listing syndication to Zillow/Trulia/Apartments.com.
- **Does well:** UX widely regarded as the cleanest in the SMB tier; QuickBooks two-way sync is best-in-class for the segment; fastest-shipping AI roadmap among incumbents.
- **Does poorly:** Initial data migration painful — "data lost in translation"; phone support hard to reach, messaging-first; payment processing settlement times slower than expected; pricing above Buildium for small portfolios. ([Capterra](https://www.capterra.com/p/211768/DoorLoop/reviews/), [Trustpilot](https://www.trustpilot.com/review/doorloop.com))

### 2.4 Yardi Breeze / Breeze Premier

- **Target:** Small-to-mid PMCs that want the Yardi brand without the full Voyager complexity.
- **Pricing (2026):** Breeze from $1/unit/mo, $100/mo minimum residential. Breeze Premier from $2/unit/mo, $400/mo minimum. ([Yardi Breeze pricing](https://www.g2.com/products/yardi-breeze/pricing))
- **Feature surface:** Tenant portal, owner portal, screening (RentGrow), Yardi Payments (ACH + cards), accounting, maintenance, inspections, eSign, reports. Premier adds Job Cost, custom reporting, more configurability.
- **AI shipped:** Limited — IntelliCheck for AI-assisted screening; some leasing-AI capabilities being layered in via Yardi RentCafe products. No public conversational AI agent at parity with Realm-X or Lumina. Spring 2026 update touted dashboard/maintenance/vendor enhancements but no headline AI agent.
- **Integrations:** Yardi's own ecosystem (deep); third-party integrations limited; no open API on Breeze base tier.
- **Does well:** Brand trust, accounting depth (Yardi DNA), price floor lower than AppFolio.
- **Does poorly:** UX described as "cumbersome," "not intuitive" — Yardi heritage UI; tenant/payment workflows confusing; lease date overlap restrictions hostile to pre-leasing; reporting weak vs. promise; support sometimes "knows less than the user." ([G2 pros/cons](https://www.g2.com/products/yardi-breeze/reviews?qs=pros-and-cons), [Capterra](https://www.capterra.com/p/164741/Yardi-Breeze/reviews/))

### 2.5 TurboTenant

- **Target:** Indie landlords, 1–50 units. 900K landlords, 12M renters claimed.
- **Pricing (2026):** Free plan · Premium from $8.25/mo billed annually (~$99/yr). Tenant pays screening ($45–$55). ([TurboTenant pricing](https://www.turbotenant.com/pricing/))
- **Feature surface:** Listings + syndication, applications & screening (Rent Butter partnership), state-specific leases (50+), eSign, online rent collection (ACH/card), rent reporting, maintenance, basic accounting, mobile apps.
- **AI shipped:** **Lease Agreement Audit AI** (free; analyzes lease for compliance in 15 seconds); **AI-guided lease generation**; **Maintenance AI** (asks diagnostic questions to triage tenant requests); AI listing description generator. ([TurboTenant Maintenance AI](https://www.turbotenant.com/product-updates/introducing-maintenance-ai/), [Lease Audit AI](https://www.turbotenant.com/landlord-toolbox/lease-agreement-audit-ai/))
- **Integrations:** Limited — Rent Butter, syndication partners, REI Hub for accounting bookkeeping.
- **Does well:** Best free tier in the segment; CA-specific lease library; fastest onboarding; strong landlord education content.
- **Does poorly (BBB/Pissed Consumer/Trustpilot):** "Secret review process" that suspends landlord and tenant accounts with no reason and no appeal; no phone support on free tier; bank-link breakage causes missed rent without notification; refund/billing disputes are a top complaint volume. ([BBB complaints](https://www.bbb.org/us/co/fort-collins/profile/rental-listings/turbotenant-0805-46092078/complaints), [Pissed Consumer](https://turbotenant.pissedconsumer.com/review.html))

### 2.6 Avail (by Realtor.com)

- **Target:** Landlords 1–50 units. ~50% have <5 units.
- **Pricing (2026):** Unlimited $0 (tenant pays $2.50/ACH) · Unlimited Plus $9/unit/mo (or $7/unit per some sources). ([Avail pricing](https://www.avail.com/pricing))
- **Feature surface:** Free rental listings (Realtor.com + 20 syndicated sites), applications, screening (credit/eviction/criminal), state-specific digital leases, eSign, ACH rent collection, FastPay (Plus), maintenance tracking, basic accounting, rent comp analysis.
- **AI shipped:** Minimal — no published AI agent products as of mid-2026.
- **Integrations:** Realtor.com (post-acquisition), TransUnion, Plaid.
- **Does well:** Realtor.com syndication = quality leads; clean UX for the use case; free tier is genuinely usable.
- **Does poorly:** Custom application questions paywalled to Plus; **no native mobile app**; payment settlement opaque to tenants ("tenants don't know when landlord gets paid"); ghosted listings on syndication partner sites due to filter bugs; fraud-recovery refused citing ToU; lead quality issues. ([Software Advice reviews](https://www.softwareadvice.com/property/avail-profile/reviews/), [BBB complaints](https://www.bbb.org/us/il/chicago/profile/real-estate-services/avail-0654-1000034703/complaints))

### 2.7 RentRedi

- **Target:** Indie landlord, BiggerPockets crowd. BiggerPockets endorsement.
- **Pricing (2026):** $12/mo annual · $20/mo 6-month · $29.95/mo monthly. All tiers include unlimited units + teammates. ([RentRedi pricing](https://rentredi.com/pricing/))
- **Feature surface:** Rent collection (ACH/card/cash via PayNearMe), screening (TransUnion), eSign, mobile-first apps (landlord + tenant), maintenance requests with photo/video, listing syndication, basic accounting via REI Hub integration.
- **AI shipped:** Limited — no headline AI agents publicly shipped.
- **Integrations:** REI Hub (accounting), Plaid, TransUnion, PayNearMe (cash), Zillow/Realtor.com syndication, integrations with Latchel for maintenance triage.
- **Does well:** Mobile-first experience for tenants; cash payment support; affordable; BiggerPockets-vetted.
- **Does poorly (BBB/Reddit):** Landlord mobile app is weaker than tenant app (forced to desktop); student-housing/pre-leasing has overlap-date bug; hacked-account incidents disclaimed via "2FA worked as intended"; support quality variable; UI learning curve. ([BBB complaints](https://www.bbb.org/us/ny/latham/profile/property-management/rentredi-0041-236023520/complaints), [Trustpilot](https://www.trustpilot.com/review/rentredi.com))

### 2.8 Hemlane

- **Target:** California/Bay Area landlords who want to outsource leasing/showings. SF-based.
- **Pricing (2026):** Starter free · Basic $30/mo + $2/unit · Essential $48/mo + $4/unit · Complete $86/mo + $8/unit (includes local leasing agent network). Tenant placement add-on: $695+. ([Hemlane pricing](https://www.hemlane.com/pricing/))
- **Feature surface:** Listings syndication, screening, state-specific leases, eSign, online rent, maintenance with **24/7 repair coordination team** (Essential+), on-demand local licensed agents for showings/move-ins (Complete).
- **AI shipped:** No headline AI agent — Hemlane's differentiation is the **human network** for repair triage and showings, which is precisely what AI-native players are trying to disintermediate.
- **Integrations:** Plaid, TransUnion, listing syndication, Zapier.
- **Does well:** Best fit when the owner truly wants hands-off in a high-touch market like SF; CA-aware leases.
- **Does poorly (G2/BBB):** "Compartmentalized" UI hard to navigate; misleading marketing — needing the top tier for agent access wasn't clear; tenant placement quality variable ("found the tenant and left"); BBB complaints around continued billing after management was transferred. ([G2 reviews](https://www.g2.com/products/hemlane-hemlane/reviews), [BBB](https://www.bbb.org/us/ca/san-francisco/profile/computer-software/hemlane-inc-1116-881555/complaints))

### 2.9 Innago

- **Target:** Indie landlords, mom-and-pop, budget-constrained.
- **Pricing (2026):** **$0 to the landlord, forever.** Monetization: tenant pays screening $30–$35; ACH free (or chargeable to tenant); card processing fees. ([Innago pricing](https://innago.com/pricing/))
- **Feature surface:** Listings, applications, screening, eSign leases, online rent, maintenance, basic accounting, document storage, unlimited units/users. Recent additions: damage reports, recurring maintenance tasks.
- **AI shipped:** No conversational AI agent shipped as of mid-2026.
- **Integrations:** TransUnion screening, Plaid, listing syndication.
- **Does well:** Free at the landlord level is unbeatable for the price-sensitive; functional core; responsive support praised in many reviews.
- **Does poorly (Capterra/BBB/BiggerPockets):** **Zero fraud protection** — multiple users report tenants reversing ACH months after lease end, with Innago pulling funds back without notice; BBB complaint admitted **anyone can upload another person's PII into the system** without verification or consent; invoice scan bugs; spotty support escalation. ([Capterra reviews](https://www.capterra.com/p/166893/Innago/reviews/), [BBB complaints](https://www.bbb.org/us/oh/cincinnati/profile/computer-software-developers/innago-llc-0292-90018766/complaints), [BiggerPockets thread](https://www.biggerpockets.com/forums/12/topics/1115538-tired-of-innago))

### 2.10 Stessa (Roofstock)

- **Target:** SFR investors, not professional PMs. Bookkeeping-first.
- **Pricing (2026):** Essentials free · Pro $28/mo (annual) / $35/mo (monthly). Unlimited properties on all tiers. ([Stessa pricing](https://www.stessa.com/pricing/))
- **Feature surface:** Bank-feed bookkeeping, auto-categorization, Schedule E export, depreciation schedules, P&L, rent collection (only via Stessa cash mgmt account), lease management, eSign, basic tenant screening, mobile app.
- **AI shipped:** Lightweight AI receipt-categorization heuristics — no agent.
- **Integrations:** Yodlee bank feeds (notably less reliable than Plaid), TransUnion for screening, Stessa Cash Management banking.
- **Does well:** Best free tax/accounting tool for investors; depreciation + Schedule E unmatched at price.
- **Does poorly (BiggerPockets/Capterra):** Bank-feed breakage frequent (Yodlee); cannot link manual transactions to accounts; no recurring bills/income; rent collection forces use of Stessa's checking account with low ACH limits and no banking license; receipt upload capped at 5/mo on free tier; **support is email-only with multi-day response times — "Friday → Tuesday"**; not a full PMS — no maintenance workflows, no full e-leasing, no syndication. ([Stessa support thread on BiggerPockets](https://www.biggerpockets.com/forums/899/topics/1164886-stessa-awful-customer-service), [Capterra](https://www.capterra.com/p/181042/Stessa/reviews/))

---

## 3. AI-Native Challengers (2023–2026)

### 3.1 EliseAI (a16z, $250M Series E, 2025)

- **What it is:** Conversational AI overlay across web chat, SMS, email, voice for leasing, maintenance triage, renewals, delinquency. Covers ~10% of the US apartment market. ([a16z announcement](https://a16z.com/announcement/investing-in-eliseai/), [BusinessWire on Agent app](https://www.businesswire.com/news/home/20260303649796/en/EliseAI-Launches-Agent-by-EliseAI-a-Mobile-App-for-Todays-AI-Powered-Leasing-Environment))
- **Pricing:** Quote-only, typically $200–$500/property/mo. Enterprise-priced. ([EliseAI pricing](https://eliseai.com/blog/ai-property-management-software-costs))
- **Wedge:** Layer on top of existing PMS (Yardi/AppFolio/RealPage). Not a replacement.
- **Limitation for our target:** Sells to 500+ unit operators. SMB priced out. Doesn't do accounting, no PMS-of-record.

### 3.2 Avery (averyiq.com, YC)

- **What it is:** "AI-powered Property Management Copilot" — full-stack: leasing (14 languages, 24/7), maintenance triage with vendor coordination, financial reporting (180+ reports incl. Schedule E, rent rolls, T-12), shared inbox. Positioned as a near-PMS replacement. ([Avery site](https://averyiq.com/))
- **Pricing:** Not publicly listed.
- **Wedge:** Closest direct competitor for our concept — full-stack AI-native for SMB.

### 3.3 HeyPurple (YC W24)

- **What it is:** AI leasing assistant — books tours after 10 minutes of self-serve config; SMS/email; smart escalation. $500K seed. ([YC launch](https://www.ycombinator.com/launches/KKp-heypurple-an-ai-leasing-assistant-for-landlords-and-property-managers))
- **Wedge:** Point solution, not a PMS.

### 3.4 MagicDoor

- **What it is:** AI-native end-to-end PMS at **$2.50/active lease/mo**, free up to 10 leases. AI dashboards, AI message summaries + translation, AI applicant scoring ("Magic Score"), AI lease generation, AI market trend analysis. ([MagicDoor pricing](https://magicdoor.com/pricing/), [MagicDoor features](https://magicdoor.com/features/))
- **Wedge:** Most aggressive price/feature combo in the AI-native segment; direct threat. Watch closely.

### 3.5 Brickwise (London, $3M+ pre-seed)

- **What it is:** AI property manager — 24/7 tenant calls + texts, contractor chasing, issue resolution. ([YC profile](https://www.ycombinator.com/companies/brickwise))
- **Wedge:** UK-first; weaker on US/CA compliance.

### 3.6 Assembly

- **What it is:** AI-native HOA management for SF Bay / LA. Niche — HOAs, not rentals.

### 3.7 Smart Bricks (a16z, $5M pre-seed, 2024)

- **What it is:** AI underwriting/acquisition layer for real estate, not operations. Not a competitor for our target.

### 3.8 Cambio (YC, $18M Series A @ $100M valuation)

- **What it is:** Agentic AI for commercial RE building data & investor reporting. CRE-focused, not SMB residential.

### 3.9 Propaya (YC), Stan AI, Haven, Super, hiresuper

Point tools for lease abstraction (Propaya, CRE), HOA AI agents (Stan), and AI-driven helpdesks/work-order routing (Haven, Super). Likely complements or build-vs-buy decisions, not direct competitors.

---

## 4. Feature Parity Matrix (25 features × 13 products)

**Legend:** Full (●) · Partial (◐) · None (○)

| Feature | Buildium | AppFolio | DoorLoop | Yardi Breeze | TurboTenant | Avail | RentRedi | Hemlane | Innago | Stessa | EliseAI | Avery | MagicDoor |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| Tenant portal (web+mobile) | ● | ● | ● | ● | ● | ● | ● | ● | ● | ◐ | ○ | ● | ● |
| Owner portal w/ statements | ● | ● | ● | ● | ○ | ○ | ◐ | ◐ | ◐ | ○ | ○ | ● | ● |
| Listing syndication (Zillow/Realtor) | ● | ● | ● | ● | ● | ● | ● | ● | ● | ○ | ○ | ● | ● |
| Online applications | ● | ● | ● | ● | ● | ● | ● | ● | ● | ◐ | ○ | ● | ● |
| Tenant screening (credit/eviction/criminal) | ● | ● | ● | ● | ● | ● | ● | ● | ● | ◐ | ○ | ● | ● |
| State-specific leases (CA-aware) | ◐ | ◐ | ◐ | ◐ | ● | ● | ◐ | ● | ◐ | ◐ | ○ | ◐ | ● |
| eSignature included (no add-on) | ◐ Growth+ | ● | ◐ Premium | ● | ● | ● | ● | ● | ● | ● | ○ | ● | ● |
| ACH rent collection | ● | ● | ● | ● | ● | ● | ● | ● | ● | ◐ | ○ | ● | ● |
| Card rent collection | ● | ● | ● | ● | ● | ● | ● | ● | ● | ◐ | ○ | ● | ● |
| Cash payments (e.g., PayNearMe) | ◐ | ● | ● | ● | ◐ | ○ | ● | ○ | ○ | ○ | ○ | ◐ | ◐ |
| Full double-entry accounting | ● | ● | ● | ● | ◐ | ◐ | ◐ | ◐ | ◐ | ● | ○ | ● | ● |
| Trust accounting (CA-required) | ● | ● | ● | ● | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ◐ | ◐ |
| QuickBooks two-way sync | ◐ | ◐ | ● | ◐ | ◐ | ○ | ◐ | ○ | ○ | ◐ | ○ | ◐ | ◐ |
| 1099 generation (vendors/owners) | ● | ● | ● | ● | ○ | ○ | ◐ | ◐ | ◐ | ◐ | ○ | ● | ● |
| Maintenance work orders | ● | ● | ● | ● | ● | ● | ● | ● | ● | ○ | ◐ | ● | ● |
| Vendor network / dispatch | ◐ | ● | ◐ | ◐ | ○ | ○ | ◐ | ● | ○ | ○ | ◐ | ● | ◐ |
| Mobile inspections w/ photos | ◐ | ● | ● | ◐ | ◐ | ○ | ● | ○ | ◐ | ○ | ○ | ● | ◐ |
| Tenant messaging (in-app SMS/email) | ● | ● | ● | ● | ● | ● | ● | ● | ● | ◐ | ● | ● | ● |
| Owner messaging | ● | ● | ● | ● | ○ | ○ | ◐ | ◐ | ◐ | ○ | ○ | ● | ● |
| Standard reports library | ● | ● | ● | ● | ◐ | ◐ | ◐ | ◐ | ◐ | ● | ◐ | ● | ● |
| Custom report builder | ◐ Growth+ | ● | ◐ Premium | ◐ Premier | ○ | ○ | ○ | ○ | ○ | ◐ | ○ | ◐ | ◐ |
| Open API / webhooks | ◐ Premium | ● | ◐ Premium | ○ | ○ | ○ | ○ | ◐ | ○ | ○ | ● | ◐ | ◐ |
| AI leasing agent (24/7 lead reply + tour) | ◐ | ● Realm-X | ◐ | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ● | ● | ◐ |
| AI maintenance triage (diagnose + create WO) | ◐ | ● Realm-X | ◐ | ○ | ◐ | ○ | ○ | ◐ | ○ | ○ | ● | ● | ● |
| AI accounting / bill scan | ◐ Premium | ◐ | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ◐ | ○ | ◐ | ● |

**Read of the matrix:** AppFolio is the only "everything" product but priced out of <50 units. Buildium and DoorLoop cover the SMB feature need, but their AI is bolted onto a transactional UI. The DIY tier has cheap rent collection but **none have true trust accounting, custom reports, or AI agents**. There is a clear empty quadrant: **trust-accounting-grade core + AI-native UX + SMB price**.

---

## 5. White-Space Analysis — Where Is the AI-Native Wedge?

Six concrete gaps no incumbent owns today, ranked by defensibility:

### 5.1 California-native compliance as a first-class feature
- No incumbent treats AB 1482 rent caps, just-cause eviction (SB 567), security-deposit limits (AB 12, capping at 1 month), source-of-income protection, mandatory non-electronic-payment option, or rent-increase notice rules as **first-class data model objects**. They're handled via state-specific lease templates and that's it.
- TurboTenant has an "AI lease audit" — useful but reactive. The wedge is **proactive compliance**: software that refuses to let you set a non-compliant rent increase, blocks an illegal late fee, generates the 60-day notice automatically, and logs every habitability complaint with timestamp.
- This is exactly what California operators get sued over and what no national tool gets right. ([2025 CA landlord law summary](https://atobpropertymanagement.com/california-rental-laws-2025-updates-for-landlords/))

### 5.2 AI maintenance triage that actually closes loops
- Reviews repeatedly call out the **AppFolio AI chatbot as broken** (can't handle multi-issue tickets, throws away tenant context). EliseAI and Avery do the triage well but don't own the PMS-of-record.
- Real wedge: AI that (a) takes the tenant's photo/video, (b) classifies the issue, (c) checks lease for who-pays, (d) checks CA habitability statute for SLA, (e) dispatches the right vendor with right scope, (f) confirms completion, (g) posts to ledger — **end-to-end, single thread**.

### 5.3 SMB-grade trust accounting + true QuickBooks two-way sync
- DoorLoop is the only SMB product with credible QuickBooks two-way sync. Buildium's is export-only. AppFolio's is paywalled. **No AI-native challenger (MagicDoor, Avery) has trust accounting at all** as of mid-2026.
- CA Bureau of Real Estate requires trust accounting for any PM licensee holding client funds. **This is the single largest reason a CA operator cannot switch to MagicDoor today.**

### 5.4 Owner-side communications and reporting
- DIY tools (TurboTenant, Avail, Innago, Stessa) have weak/no owner portal. AI challengers have not yet shipped strong owner-side surfaces.
- Wedge: AI-generated owner narratives ("Your unit at 432 Oak is 4 days into a vacancy; 19 inquiries received; 3 qualified; rent comp suggests $50/mo bump"), automated monthly owner emails, instant Schedule E exports.

### 5.5 Pre-leasing + overlap-friendly data model
- Multiple incumbents (RentRedi, Yardi Breeze) explicitly fail at overlapping leases (current tenant ends Aug 31, new tenant starts Aug 1 with prorate). CA student/seasonal market lives on this overlap.

### 5.6 Migration & onboarding
- Universal pain — "data lost in translation," "took weeks." A migration AI that ingests prior PMS exports (Buildium/AppFolio CSVs, even QuickBooks GL) and produces a clean, reconciled tenant + lease + ledger import in <24 hours is itself a defensible moat for switchers.

---

## 6. Pricing Benchmark — Small-PM Tier (1–50 units)

Indexed at a hypothetical 25-unit operator, monthly cost:

| Product | Base/mo | Per-unit overage | At 25 units | Notes |
|---|---:|---:|---:|---|
| Innago | $0 | $0 | **$0** | Landlord pays nothing; tenant pays screening/cards |
| Stessa Essentials | $0 | $0 | **$0** | Not a true PMS — bookkeeping only |
| TurboTenant Free | $0 | $0 | **$0** | Listings + leases + screening only; tenant pays card fees |
| Avail Unlimited | $0 | $0 | **$0** | Tenants pay $2.50/ACH |
| Stessa Pro (annual) | $28 | $0 | **$28** | Adds receipts, bulk export |
| Hemlane Basic | $30 | $2 | **$80** | Adds lease tracking |
| Avail Unlimited Plus | $0 | $9/unit | **$225** | Card-fee waiver + custom apps |
| Buildium Essential | $62 | included to cap | **$62** | Caps on units/eSigns |
| RentRedi (annual) | $12 | $0 | **$12** | Unlimited units |
| DoorLoop Starter (annual) | $69 | $0 (capped 20 u) | $69 (≤20 u) / **$149 Pro** at 25 u | Must upgrade to Pro at 21+ units |
| Yardi Breeze | $100 min | $1/unit above min | **$100** | Min meets 25 u at $1 |
| Yardi Breeze Premier | $400 min | $2/unit | **$400** | Custom reports begin here |
| AppFolio Core | $298 min | $1.49/unit | **$298** | Doesn't accept <50 unit accounts |
| Buildium Growth | $192 | included | **$192** | Adds eSign + inspections + Write-with-AI |
| Hemlane Complete | $86 | $8/unit | **$286** | Includes leasing agents |
| MagicDoor | $0 | $2.50/lease | **$62.50** | AI-native; no trust accounting yet |
| Avery | n/a | quote | **TBD** | Likely $100–$300/mo for SMB |
| EliseAI | n/a | $200–$500/property | **$5,000+** | Enterprise; not realistic for 25 units |

**Reading:** The sweet spot for a serious small-CA-PM is the **$60–$200/mo** band. Below $60 means "DIY landlord, not PM." Above $300 means "you bought AppFolio." Our pricing should land at **~$1.99–$2.99/unit/mo with a $79–$99/mo floor**, including AI agents in the base price (not paywalled like Buildium does at Premium-$400). MagicDoor sets the AI-native price ceiling at $2.50/lease; we must be close to that or differentiate on CA compliance + trust accounting to justify a premium.

---

## 7. The Five Things We MUST NOT Screw Up

Based on the totality of complaints mined from G2/Capterra/Trustpilot/BBB/BiggerPockets/Reddit:

### 1. Payments must clear cleanly, on time, and reversible only with notice
- Buildium ACH bouncing 5 days after deposit, Innago pulling funds from landlord accounts months later with no notice, RentRedi disclaiming hacked-account fund loss, Avail refusing fraud recovery, Stessa forcing funds into a low-limit non-bank checking account — **payments are the #1 trust-killer in this category.**
- Bar: 1–2 day ACH (Same-Day ACH where supported), clear settlement timeline visible to both parties, fraud-recovery policy that doesn't hide behind ToU, and **PCI/SOC 2 from day one**.

### 2. Trust accounting must be correct, auditable, and CA-DRE-compliant
- This is the bright-line difference between "landlord tool" and "PM tool" in California. If our books don't survive a CA Department of Real Estate audit, no licensed PM can touch us. Three-way reconciliation, separate client trust ledger per owner, vendor 1099s, owner statements — all must be tier-1 from launch.

### 3. Support must have a phone number and a human within 1 business day
- The single most common complaint across **every** incumbent above (AppFolio, Buildium, DoorLoop, Stessa, TurboTenant, Innago, Hemlane, RentRedi) is support being unreachable or templated. SMB PMs are not enterprise — they cannot wait a week.
- Bar: real phone support during business hours on every paid tier, response SLA of 4 hours business / 1 hour for payment incidents, and AI that augments (not replaces) human reps.

### 4. Migration must be a feature, not a service
- "Data lost in translation" (DoorLoop), "took weeks to onboard" (Buildium, AppFolio) — switchers walk away. A guided importer that handles Buildium/AppFolio/Yardi CSV exports and reconciles ledgers in <24 hours, with a visual diff before commit, is itself a moat.

### 5. AI must do the work, not just talk about the work
- The AppFolio maintenance chatbot disaster ("can't handle more than one issue, throws away tenant detail, unilaterally closes the chat") is the cautionary tale. **An AI that fails publicly to a tenant is worse than no AI.**
- Every agent we ship must: (a) have a measurable resolution rate published in the dashboard, (b) hand off cleanly with full context preserved, (c) never silently truncate or close a conversation, (d) escalate to a human with a one-tap mobile alert, (e) log every action to an audit trail. Treat AI quality like payments quality — observability, SLOs, rollback.

---

## 8. Bonus — California-Specific Sources & Notes

- **AB 12** — Security deposit cap at 1 month rent (effective July 2024).
- **AB 1482** — Statewide rent cap (5% + CPI, max 10%) + just-cause eviction. ([CAA reference](https://caanet.org/topics/ab-1482/))
- **SB 567** — Strengthens just-cause eviction (April 2024).
- **SB 611** — Limits fees/charges landlords can pass through.
- **AB 2747** — Requires opt-in for positive rent reporting.
- **AB 2801** — Security deposit deduction documentation requirements.
- **CA Civil Code §1947.3** — Requires landlords to offer at least one non-electronic payment method unless tenant voluntarily opts in.
- **CA DRE Trust Fund Handbook** — Trust accounting requirements for licensed PMs.

Sources for the above: [2025 California Rental Laws roadmap](https://atobpropertymanagement.com/california-rental-laws-2025-updates-for-landlords/), [Allen Matkins on SB 1103](https://www.allenmatkins.com/real-ideas/what-california-landlords-need-to-know-about-senate-bill-1103.html), [APM Help on CA regs](https://www.apmhelp.com/blog/property-management-laws-regulations-california), [OAG TPA factsheet](https://oag.ca.gov/system/files/media/Tenant-Protection-Act-Landlords-and-Property-Managers-English.pdf).

---

## 9. Source Index

**Incumbents:**
- [Buildium pricing](https://www.buildium.com/pricing/) · [Lumina AI](https://www.buildium.com/features/ai-property-management-software/) · [Capterra reviews](https://www.capterra.com/p/47428/Buildium-Property-Management-Software/reviews/) · [BBB](https://www.bbb.org/us/ma/boston/profile/computer-software/buildium-llc-0021-28244/complaints) · [BiggerPockets thread](https://www.biggerpockets.com/forums/80/topics/1279418-what-property-management-software-are-you-using-and-what-frustrates-you-most-about)
- [AppFolio pricing](https://www.appfolio.com/pricing) · [AppFolio AI](https://www.appfolio.com/ai) · [Realm-X AI Agents press release](https://www.appfolio.com/newsroom/appfolio-ai-agents) · [G2 reviews](https://www.g2.com/products/appfolio/reviews) · [Trustpilot](https://www.trustpilot.com/review/appfolio.com)
- [DoorLoop pricing](https://www.doorloop.com/pricing) · [DoorLoop AI Assistant](https://www.doorloop.com/ai-assistant) · [DoorLoop AI Inspections](https://www.prnewswire.com/news-releases/doorloop-launches-ai-inspections-to-help-property-managers-work-smarter-and-faster-302682012.html) · [Capterra](https://www.capterra.com/p/211768/DoorLoop/reviews/) · [Trustpilot](https://www.trustpilot.com/review/doorloop.com)
- [Yardi Breeze](https://www.yardibreeze.com/) · [G2 pricing](https://www.g2.com/products/yardi-breeze/pricing) · [Capterra reviews](https://www.capterra.com/p/164741/Yardi-Breeze/reviews/)

**DIY tier:**
- [TurboTenant pricing](https://www.turbotenant.com/pricing/) · [Maintenance AI](https://www.turbotenant.com/product-updates/introducing-maintenance-ai/) · [Lease Audit AI](https://www.turbotenant.com/landlord-toolbox/lease-agreement-audit-ai/) · [BBB complaints](https://www.bbb.org/us/co/fort-collins/profile/rental-listings/turbotenant-0805-46092078/complaints) · [Pissed Consumer](https://turbotenant.pissedconsumer.com/review.html)
- [Avail pricing](https://www.avail.com/pricing) · [Software Advice reviews](https://www.softwareadvice.com/property/avail-profile/reviews/) · [BBB](https://www.bbb.org/us/il/chicago/profile/real-estate-services/avail-0654-1000034703/complaints)
- [RentRedi pricing](https://rentredi.com/pricing/) · [BBB complaints](https://www.bbb.org/us/ny/latham/profile/property-management/rentredi-0041-236023520/complaints) · [Trustpilot](https://www.trustpilot.com/review/rentredi.com)
- [Hemlane pricing](https://www.hemlane.com/pricing/) · [G2](https://www.g2.com/products/hemlane-hemlane/reviews) · [BBB](https://www.bbb.org/us/ca/san-francisco/profile/computer-software/hemlane-inc-1116-881555/complaints)
- [Innago pricing](https://innago.com/pricing/) · [Capterra reviews](https://www.capterra.com/p/166893/Innago/reviews/) · [BBB complaints](https://www.bbb.org/us/oh/cincinnati/profile/computer-software-developers/innago-llc-0292-90018766/complaints) · [BiggerPockets](https://www.biggerpockets.com/forums/12/topics/1115538-tired-of-innago)
- [Stessa pricing](https://www.stessa.com/pricing/) · [BiggerPockets support thread](https://www.biggerpockets.com/forums/899/topics/1164886-stessa-awful-customer-service) · [Capterra](https://www.capterra.com/p/181042/Stessa/reviews/)

**AI-native challengers:**
- [EliseAI](https://eliseai.com/) · [a16z investment announcement](https://a16z.com/announcement/investing-in-eliseai/) · [EliseAI pricing analysis](https://eliseai.com/blog/ai-property-management-software-costs)
- [Avery](https://averyiq.com/)
- [HeyPurple YC launch](https://www.ycombinator.com/launches/KKp-heypurple-an-ai-leasing-assistant-for-landlords-and-property-managers)
- [MagicDoor pricing](https://magicdoor.com/pricing/) · [MagicDoor features](https://magicdoor.com/features/)
- [Brickwise YC profile](https://www.ycombinator.com/companies/brickwise)
- [Smart Bricks/a16z](https://www.techbuzz.ai/articles/smart-bricks-lands-5m-pre-seed-led-by-a16z-for-ai-proptech)
- [Cambio Crunchbase](https://news.crunchbase.com/real-estate-property-tech/cambio-cre-ai-asset-management-saas-software-funding/)
- [Propaya YC](https://www.ycombinator.com/companies/propaya) · [Haven AI](https://www.usehaven.ai/) · [Stan AI](https://www.stan.ai/) · [Super](https://www.hiresuper.com/)

**California compliance:**
- [2025 CA Rental Laws roadmap](https://atobpropertymanagement.com/california-rental-laws-2025-updates-for-landlords/) · [Allen Matkins SB 1103](https://www.allenmatkins.com/real-ideas/what-california-landlords-need-to-know-about-senate-bill-1103.html) · [APM Help CA](https://www.apmhelp.com/blog/property-management-laws-regulations-california) · [OAG Tenant Protection Act factsheet](https://oag.ca.gov/system/files/media/Tenant-Protection-Act-Landlords-and-Property-Managers-English.pdf) · [CAA AB 1482](https://caanet.org/topics/ab-1482/)
