import { MoneyCell, StatusPill, ToolCallChip } from "@stoa/ui";

type Agent = {
  no: string;
  name: string;
  headline: string;
  body: string;
  demo: "triage" | "diagnosis" | "dispatch" | "ledger";
  badge?: string;
};

const agents: readonly Agent[] = [
  {
    no: "01",
    name: "Triage",
    headline: "It picks up before you do.",
    body: "Every inbound — chat, SMS, email — lands here first. Triage classifies category and urgency, decides who handles it, and either hands the conversation to a specialist or flags you. It does not pretend to be a chatbot. It is the thing that decides whether the next minute matters.",
    demo: "triage",
  },
  {
    no: "02",
    name: "Diagnosis",
    headline: "Half the visits never need to happen.",
    body: "A Socratic loop with the tenant — three or four questions, optional photo, occasional video. It cites § 1941.1 habitability when responsibility matters and proposes a path: self-resolve, schedule, or escalate. When a contractor is needed, it hands a full report to dispatch with a cost band so you know what to expect before you approve.",
    demo: "diagnosis",
  },
  {
    no: "03",
    name: "Dispatch",
    headline: "The right license, on the right day.",
    body: "When a job needs hands, dispatch sources a contractor with the right CSLB-verified license, a quote that respects your lease's expense thresholds, and a scheduled window the tenant has agreed to. You approve once, or you set a threshold and approve automatically below it. Every action is reversible within 24 hours.",
    demo: "dispatch",
    badge: "Available Q3 · currently in supervised pilot",
  },
  {
    no: "04",
    name: "Ledger",
    headline: "A trust account you can actually trust.",
    body: "Double-entry from day one. Every payment matched to an invoice, every late fee calculated against your lease policy and California's § 1671 reasonableness test, every owner statement reconcilable to the cent. If something looks wrong, it is — and the ledger will tell you which entry to look at first.",
    demo: "ledger",
  },
];

export function AgentSections() {
  return (
    <section id="product" className="px-6 py-20 lg:py-32">
      <div className="mx-auto max-w-content">
        <p className="font-mono text-overline uppercase text-text-muted tracking-[0.16em]">
          Four agents · one product
        </p>
        <h2 className="mt-3 font-display text-[40px] leading-[1.1] tracking-[-0.02em] text-text-primary balance lg:text-[52px]">
          The work that's already half done.
        </h2>

        <div className="mt-16 space-y-24 lg:space-y-32">
          {agents.map((a, i) => (
            <div
              key={a.no}
              className={[
                "grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center",
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : "",
              ].join(" ")}
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-overline uppercase tracking-[0.16em] text-brass-700">
                    {a.no} — {a.name}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-[34px] leading-[1.1] tracking-[-0.02em] text-text-primary balance lg:text-[44px]">
                  {a.headline}
                </h3>
                <p className="mt-5 max-w-prose text-[16px] leading-[26px] text-text-secondary">
                  {a.body}
                </p>
                {a.badge ? (
                  <p className="mt-4 font-mono text-caption text-text-muted">{a.badge}</p>
                ) : null}
              </div>

              <div>
                <AgentDemo kind={a.demo} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AgentDemo({ kind }: { kind: "triage" | "diagnosis" | "dispatch" | "ledger" }) {
  if (kind === "triage") return <TriageDemo />;
  if (kind === "diagnosis") return <DiagnosisDemo />;
  if (kind === "dispatch") return <DispatchDemo />;
  return <LedgerDemo />;
}

function TriageDemo() {
  const rows = [
    { msg: "the upstairs sink is leaking", category: "Plumbing", urgency: "High", route: "Diagnosis", chip: "diagnosis.handoff" },
    { msg: "i won't be able to pay rent until the 5th", category: "Payment", urgency: "Med", route: "PM + Ledger", chip: "ledger.draft_plan" },
    { msg: "are you the new manager? i never got a copy of my lease", category: "Documents", urgency: "Low", route: "Knowledge", chip: "knowledge.retrieve" },
  ];
  return (
    <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-paper)] p-5 shadow-hairline">
      <div className="text-overline text-text-muted mb-3">Inbound · last 6 minutes</div>
      <div className="space-y-3">
        {rows.map((r, i) => (
          <div key={i} className="grid grid-cols-[1fr_auto] items-start gap-3 border-b border-[var(--border-subtle)] pb-3 last:border-0 last:pb-0">
            <div>
              <p className="text-[14px] text-text-primary">“{r.msg}”</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                <span className="rounded bg-[var(--surface-sunken)] px-1.5 py-0.5 text-[11px] font-mono text-text-secondary">{r.category}</span>
                <span className="rounded bg-[var(--surface-sunken)] px-1.5 py-0.5 text-[11px] font-mono text-text-secondary">{r.urgency}</span>
                <span className="rounded bg-[var(--surface-sunken)] px-1.5 py-0.5 text-[11px] font-mono text-text-secondary">→ {r.route}</span>
              </div>
            </div>
            <ToolCallChip name={r.chip} latencyMs={120 + i * 60} />
          </div>
        ))}
      </div>
    </div>
  );
}

function DiagnosisDemo() {
  return (
    <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-paper)] p-5 shadow-hairline">
      <div className="space-y-3 text-[14px]">
        <div className="flex gap-2">
          <span className="rounded bg-[var(--surface-sunken)] px-1.5 py-0.5 text-[11px] font-mono text-text-muted">TENANT</span>
          <p>“Outlet sparked when I plugged in the toaster. Tripped the breaker.”</p>
        </div>
        <div className="rounded-md bg-cream-50 p-3 border border-[var(--border-subtle)]">
          <div className="text-[11px] font-mono uppercase tracking-[0.12em] text-text-muted">Diagnosis</div>
          <p className="mt-1 text-text-primary">
            “Sounds like the GFCI tripped from a high-draw appliance. Is there a red or
            black button between the two sockets?”
          </p>
        </div>
        <div className="flex gap-2">
          <span className="rounded bg-[var(--surface-sunken)] px-1.5 py-0.5 text-[11px] font-mono text-text-muted">TENANT</span>
          <p>“Yes — pressed the red one and the toaster works again.”</p>
        </div>
        <div className="rounded-md bg-cream-50 p-3 border border-[var(--border-subtle)]">
          <div className="text-[11px] font-mono uppercase tracking-[0.12em] text-text-muted">Resolution</div>
          <p className="mt-1 text-text-primary">
            “Logged. I'd recommend a licensed electrician check the outlet within 30
            days — non-urgent.”
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <ToolCallChip name="cite_civil_code_1941" latencyMs={42} />
            <ToolCallChip name="propose_remediation" latencyMs={612} />
          </div>
        </div>
      </div>
    </div>
  );
}

function DispatchDemo() {
  return (
    <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-paper)] p-5 shadow-hairline">
      <div className="flex items-center justify-between">
        <div className="text-overline text-text-muted">Draft dispatch · awaiting your approval</div>
        <StatusPill status="awaiting-pm" size="sm" />
      </div>
      <div className="mt-3 rounded-lg bg-white p-4 ring-1 ring-[var(--border-subtle)]">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="font-medium text-text-primary">Cordeiro Electric · Oakland</div>
            <div className="text-[12px] text-text-muted">CSLB #1098432 · C-10 license verified · 2.4 mi</div>
          </div>
          <MoneyCell cents={18500} size="md" />
        </div>
        <div className="mt-3 grid gap-1 text-[12px] text-text-secondary">
          <div>Window: Tue 8 Apr · 9–11am</div>
          <div>Includes: outlet replacement, GFCI test, in-wall inspection</div>
          <div>Within lease threshold ($250) · tenant has confirmed window</div>
        </div>
        <div className="mt-3 flex gap-2">
          <button className="rounded-md bg-brass-500 px-3 py-1.5 text-[13px] font-medium text-ink-900 hover:bg-brass-600">
            Approve and dispatch
          </button>
          <button className="rounded-md px-3 py-1.5 text-[13px] text-text-secondary hover:bg-cream-50">
            Suggest alternates
          </button>
        </div>
      </div>
    </div>
  );
}

function LedgerDemo() {
  const rows = [
    { d: "Mar 1", t: "Invoice posted · Mar rent", ref: "2417 Telegraph B", c: 240000, k: "debit" as const },
    { d: "Mar 1", t: "Auto-reminder sent · SMS", ref: "Maya Chen", c: null, k: "credit" as const },
    { d: "Mar 4", t: "Payment received · ACH", ref: "M. Chen", c: 240000, k: "credit" as const, brass: true },
    { d: "Mar 4", t: "Matched + posted", ref: "Ledger reconciled", c: null, k: "credit" as const, brass: true },
    { d: "Mar 6", t: "Owner share posted", ref: "Owner statement 03/2024", c: 192000, k: "debit" as const },
    { d: "Mar 6", t: "Mgmt fee retained", ref: "8% per agreement", c: 19200, k: "credit" as const },
    { d: "Mar 6", t: "Trust ledger updated", ref: "Running balance · $4,318.40", c: null, k: "credit" as const },
  ];
  return (
    <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-paper)] p-5 shadow-hairline">
      <div className="text-overline text-text-muted mb-3">2417 Telegraph · Unit B · March</div>
      <div className="rounded-lg bg-white border border-[var(--border-subtle)] overflow-hidden">
        <div className="grid grid-cols-[64px_1fr_auto] px-3 py-2 text-[11px] font-mono uppercase tracking-[0.08em] text-text-muted border-b border-[var(--border-subtle)]">
          <div>Date</div>
          <div>Description</div>
          <div className="text-right">Amount</div>
        </div>
        {rows.map((r, i) => (
          <div
            key={i}
            className={[
              "relative grid grid-cols-[64px_1fr_auto] items-center px-3 py-2.5 border-b border-[var(--border-subtle)] last:border-0",
              r.brass ? "bg-brass-100/30" : "",
            ].join(" ")}
          >
            {r.brass ? (
              <span className="absolute left-0 top-0 h-full w-[2px] bg-brass-500" />
            ) : null}
            <div className="font-mono tabular text-[12px] text-text-muted">{r.d}</div>
            <div>
              <div className="text-[13px] text-text-primary">{r.t}</div>
              <div className="text-[11px] text-text-muted">{r.ref}</div>
            </div>
            <MoneyCell
              cents={r.c}
              size="sm"
              intent={r.c === null ? "muted" : r.k === "credit" ? "success" : "default"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
