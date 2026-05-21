# 04 — Motion

Motion is a language, not a layer. Every animation in this product earns its place by communicating one of three things:

1. **State** — what changed, and where to look next.
2. **Continuity** — this thing came from there.
3. **Hierarchy** — which surface is the active one.

If an animation does none of those, we delete it. Decoration is rejected.

---

## 1. Principles

### 1.1 Quiet by default

Animation in-product is felt, not noticed. Marketing earns one or two hero moments — the scroll-pinned demo and the isometric building. Everything else, in marketing and in-product, sits at or below 320ms.

### 1.2 Time tiers

We have four durations. Every spring, tween, or keyframe maps to one.

| Tier | Duration | When |
|---|---|---|
| `instant` | 80ms | Color swap, focus ring appearance. No translation. |
| `fast` | 120ms | Button press, hover-fill, micro-state. |
| `base` | 180ms | Hover, dropdown open, tab swap, toast enter. |
| `slow` | 320ms | Dialog enter, sheet open, layout shift, status pill morph. |
| `hero` | 600ms | Marketing reveal, scroll-pinned demo per-beat, page-level hero. |

We do not animate between 320 and 600ms. The gap is intentional — it forces a choice: this is in-product (≤ 320ms) or this is a marketing moment (= 600ms).

### 1.3 Easing

Two curves only.

```ts
export const ease = {
  // Standard — everything in-product
  standard: [0.4, 0, 0.2, 1] as const,
  // Hero — marketing-only, entrances and demo beats
  hero:     [0.16, 1, 0.3, 1] as const,
};
```

Exits use the reverse of standard: `[0.4, 0, 1, 1]` (ease-in). We do not bounce, we do not overshoot, we do not "spring." If a designer asks for a spring on a status pill, the answer is no.

### 1.4 prefers-reduced-motion

This is treated as a P0 requirement, not a P3 toggle.

```ts
const reduce = useReducedMotion();

// All transforms collapse to opacity-only
const motion = reduce
  ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.12 } }
  : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.18, ease: ease.standard } };
```

Specific reduced-motion rules:

- Scroll-pinned demo → static 6-panel grid, all beats visible at once.
- Status pill morph → opacity crossfade only.
- Counter on scroll → final number renders immediately.
- AgentStream typing → full message renders, no token-by-token reveal.
- Skeleton shimmer → static `text.muted` placeholder, no pulse.
- Page transitions → instant.

Functionality never depends on motion. Every animation has a non-motion equivalent that delivers the same information.

### 1.5 Stagger

Sibling reveals stagger at 40ms. Lists with > 8 items cap stagger at 6 items, then last item is instant — we do not animate-in a 50-row table.

### 1.6 GPU and layout discipline

- Animate `transform` and `opacity`. Avoid `top/left/width/height` except in `layout` motion (Framer Motion's `layout` prop, which runs FLIP under the hood).
- `will-change` only on actively animating elements — applied at animation start, removed at end.
- No `filter: blur()` animations in-product (taxing on low-end laptops). Backdrop-filter on nav is static once scrolled — it doesn't ramp.

### 1.7 Frame budget

Every animation must hold 60fps on a 2019 MacBook Air. We measure with the Performance panel before shipping. If an animation dips below 55fps, it gets simplified or dropped.

---

## 2. Animation spec sheet

For each required animation: purpose, input, output, timing, code sketch.

### 2.1 Scroll-pinned dashboard demo (hero)

**Purpose.** Show the product working in 12 seconds of scroll without a video.

**Where.** `/`, hero section, below the CTAs.

**Input.** Vertical scroll progress within a 3 × 100vh container that pins the demo to viewport center.

**Output.** Six beats inside a fixed dashboard frame. Each beat is a coordinated mini-animation: text appears in a thread, a card slides into a queue, a status pill morphs, a money cell counts.

**Timing.**

- Pin range: `scrollYProgress 0 → 1` over 3 × 100vh.
- Each beat consumes ~0.166 of progress (≈ 0.5 vh per beat plus 0.5 vh of dwell).
- Within a beat, internal motion runs at `motion.hero` (600ms eased with hero curve) when the beat first becomes "active," then holds.

**Code sketch (Framer Motion).**

```tsx
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

function ScrollPinnedDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // 6 beats: split [0,1] into 6 segments
  const beat = (i: number) => useTransform(
    scrollYProgress,
    [i / 6, (i + 0.2) / 6, (i + 0.8) / 6, (i + 1) / 6],
    [0, 1, 1, 0],
  );

  if (reduce) return <StaticDemoGrid />;

  return (
    <section ref={ref} className="relative h-[300vh]">
      <div className="sticky top-[12vh] h-[76vh]">
        <DashboardFrame>
          <Beat opacity={beat(0)}><ClaimArrives /></Beat>
          <Beat opacity={beat(1)}><TriageRoutes /></Beat>
          <Beat opacity={beat(2)}><DiagnosisChat /></Beat>
          <Beat opacity={beat(3)}><ResolutionProposed /></Beat>
          <Beat opacity={beat(4)}><LedgerReconciles /></Beat>
          <Beat opacity={beat(5)}><ComplianceBadge /></Beat>
        </DashboardFrame>
      </div>
    </section>
  );
}
```

**Notes.**

- Beats overlap by 20% to avoid hard cuts.
- The dashboard "chrome" never animates — only the contents of its three panes.
- Scrubbing must feel direct, not lagged. We use `useTransform` directly, not `animate()`.
- Reduced-motion: render `StaticDemoGrid` — a single non-animated frame showing all six beats in a 2×3 grid.

### 2.2 Agent-thinking stream (AgentStream)

**Purpose.** Show that the agent is thinking, not buffering. Convey continuous progress without faking it.

**Where.** Tenant `/t/chat`, tenant `/t/claims/[id]`, PM `/pm/claims/[id]`, hero demo beat 3.

**Input.** A streaming token source (Anthropic SDK stream).

**Output.** Tokens appended to a text node with a single soft pulse cursor at the tail. Occasional 80–240ms pauses between sentences. No flashing.

**Timing.**

- Token append: as received, no artificial delay.
- Cursor pulse: 1.2s loop, opacity 0.4 → 1 → 0.4, `ease.standard`.
- Tool-call chip insertion (`[ledger.match_payment]`): `motion.base` fade-up + scale 0.96 → 1.

**Code sketch.**

```tsx
function AgentStream({ stream }: { stream: AsyncIterable<Token> }) {
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    (async () => {
      for await (const token of stream) {
        setText((t) => t + token.text);
        // No artificial throttle. The model's pacing is the pacing.
      }
      setDone(true);
    })();
  }, [stream]);

  if (reduce) {
    // Don't reveal — show full text on first paint when stream resolves
    return <p className="agent-stream">{text}</p>;
  }

  return (
    <p className="agent-stream">
      {text}
      {!done && <motion.span
        className="cursor"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      />}
    </p>
  );
}
```

**Anti-patterns.**

- No typewriter throttle that pretends to type slower than the stream returns. We are not faking thinking.
- No "thinking…" placeholder. The cursor is enough.
- No robot/sparkle iconography next to the stream. The agent name appears once in `caption` type above its turn.

### 2.3 3D isometric building (marketing accent)

**Purpose.** A single visual anchor on `/` and `/product` that says "this is about real buildings with real units." One per page, restrained.

**Where.** Below the four-agents section on `/` (between agents and compliance moat), as a quiet aside.

**Input.** Mouse-near intent triggers load. Until then a static SVG/PNG fallback is rendered.

**Output.** An isometric 4-unit building, React-Three-Fiber. Units light up softly when an event "flows through" them — a claim filed, a payment posted, a lease renewed. Slow rotation (~6° amplitude) tied to mouse position.

**Timing.**

- Load on intent (`mouseenter` within 240px of the component bounding box).
- Unit-light fade-in: `motion.slow` (320ms), brass glow at 0.4 opacity, decays over 1.2s.
- Rotation: 600ms ease-out follow on mouse delta.
- Idle state: imperceptible 0.5° drift over 8s loop.

**Code sketch.**

```tsx
function IsometricBuilding() {
  const [loaded, setLoaded] = useState(false);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const onNear = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const near = e.clientX > r.left - 240 && e.clientX < r.right + 240
                && e.clientY > r.top - 240 && e.clientY < r.bottom + 240;
      if (near) setLoaded(true);
    };
    window.addEventListener("mousemove", onNear, { passive: true });
    return () => window.removeEventListener("mousemove", onNear);
  }, [reduce]);

  if (reduce || !loaded) return <BuildingFallbackSVG />;

  return <Canvas><BuildingScene /></Canvas>;
}
```

**Performance.**

- Bundle is code-split and dynamic-imported. Not in initial JS.
- Triangle count < 12k. No PBR materials — flat shaded with one rim light.
- Pauses rendering when not in viewport (intersection observer).

### 2.4 Status transitions (claim, payment, lease)

**Purpose.** Show that a thing changed state, where it went, and that we noticed.

**Where.** ClaimCard in queue (`/pm/claims`), StatusPill anywhere, RentTimeline rows.

**Input.** State change in the data layer (via tRPC subscription or refetch).

**Output.** The card morphs its background pill from one signal color to the next, and — in Kanban view — the card itself slides to its new column via shared-layout transition. In Table view, the row's StatusPill morphs in place and a 1px brass left-rule slides in for 2s as a "this just changed" cue.

**Timing.**

- Pill color morph: `motion.slow` (320ms, standard ease). Background and border crossfade; text color changes at half-way (180ms in).
- Card layout move: `motion.slow` via `layoutId`.
- "Just changed" left-rule: 2s persistence, fades out over 320ms.

**Code sketch.**

```tsx
function ClaimCard({ claim }: { claim: Claim }) {
  return (
    <motion.div
      layoutId={`claim-${claim.id}`}
      transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
      className="claim-card"
    >
      <StatusPill status={claim.status} />
      {/* … */}
    </motion.div>
  );
}

function StatusPill({ status }: { status: Status }) {
  const tone = toneFor(status);
  return (
    <motion.span
      animate={{ backgroundColor: tone.bg, borderColor: tone.border, color: tone.fg }}
      transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
      className="pill"
    >
      <StatusIcon status={status} />
      {labelFor(status)}
    </motion.span>
  );
}
```

### 2.5 Counter on scroll (marketing)

**Purpose.** Numerical proof on the marketing page. Used in the trust band only — we don't sprinkle counters everywhere.

**Where.** `/security` and (Phase 2) a stats band on `/`.

**Input.** `useInView` fires once when component is 30% in viewport.

**Output.** 1.2s eased count from 0 to target. Tabular monospace, never abbreviated. After completion, the number is plain text (no perpetual animation).

**Timing.**

- Duration: 1200ms.
- Easing: hero curve `[0.16, 1, 0.3, 1]`.
- Trigger once. If user scrolls away and back, the number stays at its final value.

**Code sketch.**

```tsx
function Counter({ to, format }: { to: number; format: (n: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const start = performance.now();
    const duration = 1200;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3); // ease-out cubic ≈ hero

    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setN(Math.round(to * ease(t)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, to]);

  return <span ref={ref} className="tabular-nums font-mono">{format(n)}</span>;
}
```

### 2.6 Microinteractions

**Button press.**

- Scale on press: 0.98 over 80ms in, 120ms out.
- No color shift on press (already shifted on hover).
- Spacebar / Enter trigger the press animation in keyboard.

```tsx
<motion.button
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.08, ease: [0.4, 0, 0.2, 1] }}
/>
```

**Link hover underline draw.**

- Underline draws left-to-right over 200ms on hover.
- Brass color on light surfaces, brass.400 on dark.
- Implemented as a 1px `background` line with `background-size: 0 1px → 100% 1px` transition.

```css
.link {
  background-image: linear-gradient(currentColor, currentColor);
  background-position: 0 100%;
  background-repeat: no-repeat;
  background-size: 0 1px;
  transition: background-size 200ms cubic-bezier(0.4, 0, 0.2, 1);
}
.link:hover { background-size: 100% 1px; }
```

**Table row hover (1px brass left border slides in).**

- 1px brass rule slides in from `left: -1px` to `left: 0` on hover, 120ms.
- Optional: row background gets a 4% brass tint.
- Sticky on selected rows.

```tsx
<tr className="row group">
  <td className="row-rail" />
  {/* … */}
</tr>
```

```css
.row-rail {
  width: 1px;
  background: var(--brass-500);
  transform: translateX(-1px);
  transition: transform 120ms cubic-bezier(0.4, 0, 0.2, 1);
}
.row:hover .row-rail,
.row[data-selected="true"] .row-rail { transform: translateX(0); }
```

**Focus ring.**

- 2px brass ring + 2px canvas spacer (composite shadow).
- 80ms in, instant out (no fade on blur — keyboards expect snappy).

```css
:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--brass-500), 0 0 0 4px var(--surface-canvas);
  transition: box-shadow 80ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Toast enter / exit.**

- Enter: `motion.base`, fade + slide 8px up.
- Exit: `motion.fast` (120ms), fade only.

**Dialog enter / exit.**

- Scrim: 180ms fade.
- Dialog: 320ms scale 0.96 → 1 + fade + 8px y, hero ease for the entrance.
- Exit: 180ms reverse, standard ease (faster out than in).

**Sheet enter / exit.**

- 320ms slide from edge. Standard ease.
- Backdrop fades over the same duration.

**Skeleton shimmer.**

- Linear gradient sweeping right at 1.2s loop. Opacity 0.0 → 0.4 → 0.0 over the sweep.
- Disabled under reduced-motion (static fill at the midpoint).

---

## 3. Where motion is forbidden

- Money figures do not animate on update unless it's a counter-on-scroll on marketing. In-product, the new number snaps; the row's left rule briefly highlights to show the change.
- The PM dashboard sidebar does not animate on collapse/expand beyond a 180ms width transition. No bounce, no spring.
- Loading spinners do not have icons that "morph" — a spinner is a spinner.
- Page transitions are not animated by default. We rely on the `motion.base` of individual elements as they enter. Animating the whole page slows perceived performance.
- The compliance citation surfaces (ComplianceCallout, statute chips) do not animate beyond a hover tooltip. Legal content stays still — animation here suggests uncertainty.

---

## 4. Implementation locations

- Tokens: `packages/ui/tokens.ts` exports `motion` map.
- Tailwind preset: `packages/ui/tailwind.preset.ts` extends `theme.transitionDuration` and `theme.transitionTimingFunction`.
- Hook helpers: `packages/ui/motion/useReduced.ts` wraps Framer Motion's `useReducedMotion`. `packages/ui/motion/stagger.ts` exports `staggerChildren(40)` etc.
- Component-local motion lives next to the component. Page-level / marketing motion lives in `apps/web/components/marketing/motion/`.

---

## 5. QA checklist for motion

Every PR that adds or modifies motion runs this checklist:

- [ ] Easing is `standard` (in-product) or `hero` (marketing) — no custom curves.
- [ ] Duration maps to one of the four tiers.
- [ ] `prefers-reduced-motion` collapses to opacity-only or instant.
- [ ] Holds 60fps on the slowest target hardware (2019 MBA).
- [ ] Animation conveys state, continuity, or hierarchy — name it explicitly in the PR description.
- [ ] No animated `top/left/width/height` (except via `layoutId`).
- [ ] No autoplaying loops without user intent (the AgentStream cursor is the only exception).
