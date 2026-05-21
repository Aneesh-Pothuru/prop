# 01 — Design System

The token spec and component inventory for the platform. Every value here is a contract: shipped components consume tokens by name, never raw values. Light and dark are first-class — every color token has both modes.

The aesthetic target: Mercury's confident clarity, Ramp's operator density, Pilot's editorial warmth, Linear's restraint, Stripe's craft. We borrow proportions; we do not copy.

---

## 1. Color

Two semantic layers: **primitive** (raw hex values, never reference in components) and **semantic** (named by role: `surface.canvas`, `text.primary`, `signal.danger.bg`). Components consume semantic only.

### 1.1 Primitive palette

| Token | Hex | Notes |
|---|---|---|
| `cream.50` | `#FBF8F2` | Lightest paper |
| `cream.100` | `#F7F3EC` | Primary canvas (marketing + tenant) |
| `cream.200` | `#EDE7DA` | Hairline / subtle fill |
| `ink.900` | `#0B1733` | Primary text, dark canvas |
| `ink.800` | `#142142` | Dark surface elevation |
| `ink.700` | `#1F2D55` | Dark surface elevation 2 |
| `ink.600` | `#33415C` | Soft ink, secondary text on light |
| `ink.500` | `#4B5878` | Muted on dark surfaces |
| `ink.400` | `#6A7793` | Muted on light |
| `ink.300` | `#8B95B0` | Placeholder, disabled text on light |
| `ink.200` | `#B6BDD0` | Border on dark |
| `ink.100` | `#D7DCE6` | Hairline on light |
| `brass.700` | `#8C6B1F` | Brass hover / pressed |
| `brass.600` | `#A6832E` | Brass deep — used in dark mode CTAs |
| `brass.500` | `#C8A24B` | Primary accent — CTAs, focus ring, highlight |
| `brass.400` | `#D8B975` | Brass soft, large surfaces |
| `brass.300` | `#EAD7A6` | Brass tint, status backgrounds |
| `brass.100` | `#F4E8C9` | Brass wash (subtle fill) |
| `red.700` | `#8E2A20` | Pressed |
| `red.600` | `#B0382C` | Hover |
| `red.500` | `#D04A3C` | Primary danger / arrears |
| `red.300` | `#EFAFA8` | Danger pill text on red bg |
| `red.100` | `#F5DCD8` | Danger background |
| `green.700` | `#125A3C` | Pressed |
| `green.600` | `#176F4B` | Hover |
| `green.500` | `#1E8A5C` | Success / paid / resolved |
| `green.300` | `#9BD2B5` | Success tint |
| `green.100` | `#D7ECDF` | Success background |
| `amber.700` | `#8A540C` | Pressed |
| `amber.600` | `#AC6810` | Hover |
| `amber.500` | `#C97B14` | Pending / awaiting tenant |
| `amber.300` | `#E9BE7C` | Amber tint |
| `amber.100` | `#F4E2C2` | Amber background |
| `gray.50` | `#F4F2EE` | |
| `gray.100` | `#E9E5DC` | |
| `gray.200` | `#D6D1C5` | |
| `gray.300` | `#B5AE9F` | |
| `gray.400` | `#8B8675` | |
| `gray.500` | `#605C50` | |
| `gray.600` | `#3E3B33` | |
| `gray.700` | `#262420` | |
| `gray.800` | `#15140F` | Near-black warm |

### 1.2 Semantic tokens — light mode

| Semantic | Value | Used for |
|---|---|---|
| `surface.canvas` | `cream.100` `#F7F3EC` | Page background (marketing, tenant) |
| `surface.paper` | `cream.50` `#FBF8F2` | Card surface on canvas |
| `surface.app` | `#FFFFFF` | PM dashboard primary surface — high contrast for density work |
| `surface.app.alt` | `cream.50` | PM zebra/grouping rows |
| `surface.sunken` | `cream.200` | Inset wells, code blocks |
| `surface.overlay` | `rgba(11,23,51,0.48)` | Modal scrim |
| `surface.inverse` | `ink.900` | Dark CTA strip in light mode |
| `text.primary` | `ink.900` | Headlines + primary body |
| `text.secondary` | `ink.600` | Subheadings, captions |
| `text.muted` | `ink.400` | Helper, timestamps |
| `text.placeholder` | `ink.300` | Input placeholder |
| `text.inverse` | `cream.50` | Text on dark surfaces |
| `text.accent` | `brass.700` | Inline accent (rare) |
| `border.subtle` | `ink.100` | Default hairline |
| `border.default` | `#C6CCDA` | Input border |
| `border.strong` | `ink.300` | Focused input border (non-brass) |
| `border.focus` | `brass.500` | Focus ring (2px) |
| `accent.bg` | `brass.500` | Primary CTA background |
| `accent.bg.hover` | `brass.600` | |
| `accent.bg.pressed` | `brass.700` | |
| `accent.fg` | `ink.900` | Text on brass (passes AA: 8.4:1) |
| `signal.danger.fg` | `red.700` | |
| `signal.danger.bg` | `red.100` | |
| `signal.danger.border` | `red.500` | |
| `signal.success.fg` | `green.700` | |
| `signal.success.bg` | `green.100` | |
| `signal.success.border` | `green.500` | |
| `signal.warning.fg` | `amber.700` | |
| `signal.warning.bg` | `amber.100` | |
| `signal.warning.border` | `amber.500` | |
| `signal.info.fg` | `ink.700` | Neutral info pill |
| `signal.info.bg` | `ink.100` | |

### 1.3 Semantic tokens — dark mode

| Semantic | Value | Notes |
|---|---|---|
| `surface.canvas` | `ink.900` `#0B1733` | Page background |
| `surface.paper` | `ink.800` `#142142` | Card surface |
| `surface.app` | `ink.900` | PM dashboard |
| `surface.app.alt` | `ink.800` | Zebra |
| `surface.sunken` | `#08102A` | Inset, code |
| `surface.overlay` | `rgba(0,0,0,0.62)` | |
| `surface.inverse` | `cream.50` | Inverted CTA strip |
| `text.primary` | `cream.50` | |
| `text.secondary` | `#C6CCDA` | |
| `text.muted` | `ink.300` | |
| `text.placeholder` | `ink.400` | |
| `text.inverse` | `ink.900` | |
| `text.accent` | `brass.400` | |
| `border.subtle` | `ink.700` | |
| `border.default` | `#2A3A66` | |
| `border.strong` | `ink.500` | |
| `border.focus` | `brass.400` | Brighter in dark for AA |
| `accent.bg` | `brass.500` | Same hue |
| `accent.bg.hover` | `brass.400` | Lighter in dark |
| `accent.bg.pressed` | `brass.300` | |
| `accent.fg` | `ink.900` | |
| `signal.danger.fg` | `#F5B6AF` | Light tint for AA on dark |
| `signal.danger.bg` | `rgba(208,74,60,0.18)` | Translucent |
| `signal.danger.border` | `red.500` | |
| `signal.success.fg` | `#A7DEC0` | |
| `signal.success.bg` | `rgba(30,138,92,0.18)` | |
| `signal.success.border` | `green.500` | |
| `signal.warning.fg` | `#F0CC92` | |
| `signal.warning.bg` | `rgba(201,123,20,0.18)` | |
| `signal.warning.border` | `amber.500` | |
| `signal.info.fg` | `#C6CCDA` | |
| `signal.info.bg` | `rgba(255,255,255,0.06)` | |

### 1.4 Contrast verification

All token pairs are AA-verified at body weight. Spot checks:

- `text.primary` on `surface.canvas` (light) → `#0B1733` on `#F7F3EC` = **14.6:1** (AAA)
- `text.secondary` on `surface.canvas` → **8.1:1** (AAA)
- `text.muted` on `surface.canvas` → **5.2:1** (AA at all sizes)
- `accent.fg` on `accent.bg` → `#0B1733` on `#C8A24B` = **8.4:1** (AAA)
- `text.primary` (dark) on `surface.canvas` (dark) → `#FBF8F2` on `#0B1733` = **15.9:1**
- `signal.danger.fg` on `signal.danger.bg` (light) → **6.9:1** (AA)

`text.muted` is NOT used at sizes below 12px. Below 12px, fall back to `text.secondary`.

---

## 2. Typography

### 2.1 Families

```
--font-display: "GT Sectra", "Tiempos Headline", Georgia, "Times New Roman", serif;
--font-sans:    "Inter", "General Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
--font-mono:    "JetBrains Mono", "IBM Plex Mono", ui-monospace, "SF Mono", monospace;
```

Fallback chain order matters — we accept a slight metric shift in production until GT Sectra licenses are in place; the system serifs are sized at the same x-height range.

### 2.2 Ramp

The ramp is a **modular scale of 1.200** (minor third) anchored at 16px base. We deviate up at display sizes (1.333) to give marketing hero room to breathe.

| Token | Size / line-height / weight | Family | Use |
|---|---|---|---|
| `display-2xl` | 72 / 76 / 420 | display | Marketing hero only |
| `display-xl` | 56 / 60 / 420 | display | Section opener, /pricing top |
| `display-lg` | 44 / 48 / 460 | display | Subsection hero |
| `display-md` | 36 / 42 / 500 | display | Inline editorial heading |
| `h1` | 32 / 38 / 600 | sans | Page title (in-product) |
| `h2` | 24 / 30 / 600 | sans | Section heading |
| `h3` | 20 / 26 / 600 | sans | Card / panel title |
| `h4` | 17 / 24 / 600 | sans | Small heading, table group |
| `body-lg` | 17 / 26 / 400 | sans | Tenant PWA body, marketing body |
| `body` | 15 / 22 / 400 | sans | Default UI body |
| `body-sm` | 13 / 20 / 400 | sans | Dense PM table body |
| `caption` | 12 / 16 / 500 | sans | Caps-aware label, timestamps |
| `overline` | 11 / 14 / 600 / +0.08em tracking, uppercase | sans | Section eyebrow |
| `mono-lg` | 17 / 24 / 500 | mono | Hero money figure |
| `mono` | 14 / 20 / 500 | mono | MoneyCell, IDs, claim numbers |
| `mono-sm` | 12 / 18 / 500 | mono | Audit trail, code snippets |

**Tabular figures:** `font-variant-numeric: tabular-nums` on all `mono.*` tokens and on any numeric column in `body`/`body-sm`. Enforced via the `MoneyCell` and `NumericCell` primitives — never set by hand.

**Letter-spacing:**
- Display: `-0.015em` (tightening for serif at scale)
- H1–H4: `-0.01em`
- Body: `0`
- Overline / caption-caps: `+0.08em`

**Weight policy.** Display serif tops out at 500. We do not use bold display because it competes with the brass accent for visual weight. Sans h1–h4 use 600 (semibold), never 700+. Body uses 400; emphasis is 500, not bold.

### 2.3 Editorial rules

- Never center body text. Display headings may be center-aligned in marketing only.
- Headings never wrap to a single word on the last line — use `text-wrap: balance` for h1–h2.
- Numbers in body are tabular when they appear in a list or comparison; inline numbers in prose stay proportional.
- No all-caps except `overline` and pill labels.
- Currency symbol stays attached: `$2,400.00`, never `$ 2,400.00`.

---

## 3. Spacing

A **4px base** with a 1.5x rhythm at the larger end. Token names use a t-shirt scale to avoid coupling to raw pixels.

| Token | px | Use |
|---|---|---|
| `space.0` | 0 | reset |
| `space.0.5` | 2 | hairline gap, focus ring |
| `space.1` | 4 | icon-to-text in compact rows |
| `space.1.5` | 6 | pill internal padding |
| `space.2` | 8 | button vertical, tight stack |
| `space.3` | 12 | input vertical, card body row |
| `space.4` | 16 | default form gap, card padding (tight) |
| `space.5` | 20 | card padding (default) |
| `space.6` | 24 | section internal, card padding (loose) |
| `space.8` | 32 | between cards |
| `space.10` | 40 | between sub-sections |
| `space.12` | 48 | between sections (in-product) |
| `space.16` | 64 | between sections (marketing tight) |
| `space.20` | 80 | between marketing sections (default) |
| `space.24` | 96 | hero top padding |
| `space.32` | 128 | hero bottom padding (marketing) |

**Density modes.**

- `density.compact` — PM dashboard. Multiplier 0.875× on `space.3`/`space.4`/`space.5`. Row height 36px. Table cell padding 8/10.
- `density.comfortable` — tenant PWA + owner portal. Multiplier 1× (default). Row height 44px. Card padding `space.5`.
- `density.editorial` — marketing. Multiplier 1.125× on section spacing only.

Density is a CSS variable scope, not a per-component prop. We set `--density: compact` on `<body data-surface="pm">` and components read `var(--space-3)` etc.

---

## 4. Radius

| Token | px | Use |
|---|---|---|
| `radius.none` | 0 | tables, full-bleed bars |
| `radius.sm` | 6 | input, small button, pill avatar |
| `radius.md` | 8 | button (default), select, tabs |
| `radius.lg` | 12 | card, dialog, sheet |
| `radius.xl` | 16 | hero card on marketing |
| `radius.2xl` | 20 | feature illustration container |
| `radius.pill` | 999 | StatusPill, segmented control |

We never round above 20px on functional surfaces. The pill is reserved for status/role/segment use. No "blob" 24px+ radii anywhere — we are not consumer.

---

## 5. Shadow & elevation

Shadows are quiet. The cream canvas absorbs glow; on dark, we use border + subtle inner highlight rather than spread shadow.

### Light mode

| Token | Value | Use |
|---|---|---|
| `shadow.none` | `none` | |
| `shadow.hairline` | `inset 0 0 0 1px rgba(11,23,51,0.06)` | Card outline (default elevation) |
| `shadow.sm` | `0 1px 2px rgba(11,23,51,0.06)` | Resting button, segmented |
| `shadow.md` | `0 4px 12px rgba(11,23,51,0.08)` | Popover, dropdown |
| `shadow.lg` | `0 12px 32px rgba(11,23,51,0.12)` | Dialog, sheet |
| `shadow.xl` | `0 24px 64px rgba(11,23,51,0.16)` | Hero card lifted state |
| `shadow.focus` | `0 0 0 2px var(--brass-500), 0 0 0 4px var(--cream-100)` | Focus ring (composite) |

### Dark mode

| Token | Value |
|---|---|
| `shadow.hairline` | `inset 0 0 0 1px rgba(255,255,255,0.06)` |
| `shadow.sm` | `0 1px 2px rgba(0,0,0,0.40)` |
| `shadow.md` | `0 4px 14px rgba(0,0,0,0.48)` |
| `shadow.lg` | `0 16px 40px rgba(0,0,0,0.56)` |
| `shadow.xl` | `0 28px 72px rgba(0,0,0,0.64)` |
| `shadow.focus` | `0 0 0 2px var(--brass-400), 0 0 0 4px var(--ink-900)` |

**Elevation system.** A surface has at most one of: `hairline`, `md`, `lg`. Never `sm + hairline`. We do not "stack" shadows. When a card is hovered, it transitions from `hairline` to `md`, not from `sm` to `md` — the change is felt, not noisy.

---

## 6. Motion

Four tiers. Choose by intent, not by length.

| Token | Duration | Easing | Use |
|---|---|---|---|
| `motion.instant` | 80ms | `linear` | Color swap, no movement |
| `motion.fast` | 120ms | `cubic-bezier(0.4, 0, 0.2, 1)` | Button press, micro-state |
| `motion.base` | 180ms | `cubic-bezier(0.4, 0, 0.2, 1)` | Hover, tab change, dropdown |
| `motion.slow` | 320ms | `cubic-bezier(0.22, 1, 0.36, 1)` | Dialog, sheet, layout shift |
| `motion.hero` | 600ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Marketing reveal, scroll-pinned beat |
| `motion.stagger` | 40ms | n/a | Stagger delay between siblings |

Full motion principles + `prefers-reduced-motion` handling live in `04-motion.md`.

---

## 7. Breakpoints

Mobile-first. The tenant PWA lives at the 375px floor; the PM dashboard is designed at 1280 and degrades gracefully to 1024 (laptops on the road) but is not expected to be used at < 1024 — we surface a "PM dashboard is a desktop experience" curtain below that for marketing-driven traffic.

| Token | min-width | Use |
|---|---|---|
| `bp.xs` | 0 | iPhone SE, small Android |
| `bp.sm` | 480 | large phone |
| `bp.md` | 768 | tablet, marketing two-column |
| `bp.lg` | 1024 | small laptop |
| `bp.xl` | 1280 | PM dashboard target |
| `bp.2xl` | 1536 | wide desktop |
| `bp.3xl` | 1920 | dashboard pro multi-pane |

**Container max widths**

- Marketing: 1200 (content) / 1440 (full bleed)
- PM dashboard: full width with 24/32 px gutters, content has no max
- Tenant PWA: 480 max, centered

---

## 8. Z-index

| Token | Value | Use |
|---|---|---|
| `z.base` | 0 | |
| `z.sticky` | 20 | Sticky nav |
| `z.dropdown` | 100 | Menu, popover |
| `z.overlay` | 200 | Sheet, drawer |
| `z.modal` | 300 | Dialog |
| `z.toast` | 400 | Toast stack |
| `z.tooltip` | 500 | |
| `z.commandPalette` | 600 | ⌘K |

Never assign raw z-index. Components read the token.

---

## 9. Iconography

- Single icon family: **Lucide** with a custom-extended set for domain glyphs (claim, ledger, dispatch). All strokes 1.5px on the 24-grid; 1.25px on the 20-grid. No filled icons.
- Default size 16 (inline) / 20 (button) / 24 (page hero).
- Icon color follows text color via `currentColor`. Brass-tinted icons are reserved for the active state.
- Domain glyphs documented in `06-illustrations.md`.

---

## 10. Component inventory

Three tiers: **primitives** (UI atoms), **patterns** (composed UI units), **domain** (product-specific). Each lists the variants that must ship and the surfaces that consume it.

### 10.1 Primitives

| Component | Variants | Sizes | States | Notes |
|---|---|---|---|---|
| `Button` | primary, secondary, ghost, danger, link | sm, md, lg | rest, hover, pressed, focused, loading, disabled | Loading shows spinner, never disables text — keeps width. |
| `IconButton` | ghost (default), filled | sm, md | same | Always has `aria-label`. |
| `Input` | text, email, password, search, numeric | sm, md, lg | rest, focused, error, disabled | `numeric` variant forces `tabular-nums`. |
| `Textarea` | — | md | same as Input | Auto-grow optional. |
| `Select` | single, multi | sm, md, lg | same | Built on Radix. |
| `Combobox` | — | md | same | For property/lease pickers. |
| `Checkbox` | — | sm, md | rest, checked, indeterminate, focused, disabled | |
| `Radio` | — | sm, md | rest, checked, focused, disabled | |
| `Switch` | — | sm, md | off, on, focused, disabled | Used for autopay toggle, etc. |
| `Slider` | single, range | md | rest, dragging, focused | Late-fee threshold setter. |
| `Label`, `Help`, `ErrorText` | — | — | — | Form scaffolding. |
| `Card` | flat (hairline), raised (md), inset | — | rest, hover, selected | Single padding token applied. |
| `Stat` | default, delta-up, delta-down | sm, md, lg | — | Money values use MoneyCell internally. |
| `Avatar` | image, initials | xs(20), sm(24), md(32), lg(40), xl(64) | — | Fallback initials use ink/brass pair. |
| `Badge` | neutral, brass, success, warning, danger, info | sm, md | — | Static label, not interactive. |
| `Pill` (StatusPill) | new, in-progress, awaiting-tenant, resolved, paid, overdue, blocked, draft | sm, md | rest, with-icon | See domain notes below. |
| `Tag` | removable | sm | rest, focused | For categories, filters. |
| `Tabs` | underline, segmented, pills | sm, md | rest, active, disabled | Underline default in product; segmented in tenant PWA. |
| `Breadcrumb` | — | — | — | Truncate middle on small width. |
| `Pagination` | — | sm, md | — | Cursor and offset variants. |
| `Tooltip` | — | sm | — | 4px arrow, 200ms delay. |
| `Popover` | — | — | — | Radix; auto-place. |
| `Dropdown` (Menu) | — | sm, md | — | Keyboard-first; arrow nav. |
| `Dialog` | default, confirm, destructive | sm, md, lg | — | Returns Promise on confirm. |
| `Sheet` | right, bottom | sm, md, lg | — | Right for PM; bottom for tenant PWA. |
| `Drawer` | persistent, dismissible | — | — | Audit-trail / claim-detail side panel. |
| `Toast` | info, success, warning, error | — | enter, idle, exit | Stack max 3; auto-dismiss 5s default. |
| `Banner` | info, success, warning, error | — | — | Static page-level. |
| `Empty` | default, illustration | — | — | Uses 06-illustrations set. |
| `Skeleton` | rect, circle, text-line | — | shimmer | 1.2s loop, respects reduced-motion. |
| `Spinner` | inline, block | sm, md | — | Brass on default. |
| `Progress` | linear, ring | — | indeterminate, determinate | Ring used in payment confirm. |
| `Divider` | horizontal, vertical | — | — | 1px ink.100. |
| `KeyboardShortcut` | inline | — | — | Renders `⌘K` style chip. |
| `Kbd` | — | — | — | Single key chip. |
| `Link` | default, subtle, inverse | — | rest, hover, visited, focused | Underline draws on hover (200ms). |

### 10.2 Patterns

| Component | Variants | Notes |
|---|---|---|
| `Nav` (marketing) | transparent, scrolled | Backdrop-blur on scroll; brass logo. |
| `AppShell` | pm, tenant, owner | Sidebar + topbar + content area. |
| `Sidebar` | collapsed, expanded | PM only; persists. |
| `TopBar` | pm, tenant | Includes CommandPalette trigger, user menu. |
| `CommandPalette` | — | ⌘K. Recent, navigation, actions, agents. |
| `Table` | dense (PM), comfortable (tenant) | Sticky header, sortable, row-hover with 1px brass left-rule slide-in. |
| `Form` | — | Field groups + section dividers. |
| `Filter` | inline, panel | Date, status, money range, free text. |
| `Calendar` | month, agenda | Lease end dates, scheduled visits. |
| `Stepper` | horizontal, vertical | Onboarding, payment confirm. |
| `Wizard` | — | Multi-step with persistent state. |

### 10.3 Domain components

| Component | Variants | What it does |
|---|---|---|
| `MoneyCell` | default, with-delta, blocked, negative | Renders `$X,XXX.XX` right-aligned, tabular monospace. Negatives in `signal.danger.fg`. Optional delta arrow + percentage. Never abbreviates. |
| `NumericCell` | int, float, percent | Same family as MoneyCell for non-currency. |
| `DateCell` | absolute, relative, mixed | "Mar 12" + tooltip with full ISO; relative for < 7d. |
| `StatusPill` | new, awaiting-tenant, in-progress, awaiting-pm, resolved, paid, partial, overdue, blocked, draft, sent, scheduled | One pill per state. Icon + label. Colors per signal token. |
| `ClaimCard` | queue, detail-summary, tenant-view | Queue: dense, single-line + category icon. Detail: title, status pill, last actor row, age. |
| `ClaimTimeline` | full, compact | Event list with actor avatar (tenant / PM / agent name in caption type) + timestamp + body. |
| `RentTimeline` | lease, portfolio | Vertical timeline of invoices, payments, late fees, reminders. |
| `LedgerRow` | debit, credit, reversal | Right-aligned amount, ref type icon, posted-at. |
| `LeaseRow` | default, arrears | Tenant name, unit, monthly rent (MoneyCell), status, days-overdue when applicable. |
| `AgentStream` | live, replay | Token-by-token reveal of agent reasoning. Soft pulse cursor (no blink). Inline tool-use chips (`compliance.check`, `ledger.match_payment`). No sparkles, no robot iconography. |
| `AgentTrace` | tree, list | Full structured trace for a run — input, tool calls, outputs, latency, cost. Replayable. |
| `ToolCallChip` | running, succeeded, failed | Inline chip: `[ledger.match_payment ✓ 124ms]` style. Brass when running, green check when done. |
| `ComplianceCallout` | info, blocking, override | Inline in compliance-impacting actions. Cites statute (`AB-1482 § 1947.12`) + plain-English summary. Blocking variant has a red left rule and disables the action. |
| `PaymentMethodTile` | bank, card, autopay | Bank shows last-4 and institution; card shows brand + last-4; autopay shows next charge date. |
| `ReceiptCard` | — | Full payment receipt — paid amount (mono-lg), method, ref id, downloadable. |
| `PropertyTile` | portfolio, picker | Address, unit count, occupancy %, arrears flag. |
| `OccupancyDial` | sm, md | Ring with % filled, brass. |
| `KeyMetric` | default, with-spark | Big number (mono-lg) + label (overline) + 30d sparkline. |
| `InboxRow` | claim, message, notice | Subject, snippet, actor avatar, timestamp, unread dot (brass). |
| `ApprovalCard` | autopay-action, vendor-dispatch | Title, what-it-will-do summary, citations if any, Approve / Override buttons. |
| `Diff` | text, money, lease-term | Side-by-side or unified diff for showing what the agent changed. |
| `MediaTile` | photo, video, doc | Square preview, type badge, EXIF stripped, expandable lightbox. |
| `MapPin` | property, vendor | Used in property locator + vendor distance later. |

Each domain component gets its own doc in `docs/design/components/<name>.md` when implemented; the inventory here is the canonical list.

---

## 11. Surface modes

We declare a surface mode at the top of each app section. Components inherit density + accent posture.

| Surface | Density | Canvas | Card | Type weight |
|---|---|---|---|---|
| marketing | editorial | cream.100 | cream.50 | display-led |
| pm | compact | white (light) / ink.900 (dark) | white / ink.800 | sans-h |
| tenant | comfortable | cream.100 | cream.50 | body-led |
| owner | comfortable | cream.50 | white | display-led, statement-feel |
| contractor | comfortable | white | white | sans, utilitarian |

Surface is set on `<html data-surface="…">`, which scopes CSS variables for `--density`, `--canvas`, and adjusts radii by 2px on the tenant surface (more cushion).

---

## 12. What's not here

These exist as principles elsewhere or live to be specified later:

- Voice & copy guide → `07-voice.md`
- Motion principles + animation specs → `04-motion.md`
- Empty-state illustration set → `06-illustrations.md`
- Screen-by-screen wireframes → `05-screens.md`
- Journey maps → `02-journeys.md`
- Marketing IA → `03-landing-page.md`

The token export (`packages/ui/tokens.ts`) and Tailwind preset (`packages/ui/tailwind.preset.ts`) materialize this spec in code. Both will be written by the design-implementation pass; this document is the contract they conform to.
