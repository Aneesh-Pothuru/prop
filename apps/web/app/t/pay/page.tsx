import Link from "next/link";
import { ChevronLeft, Landmark, CreditCard, ShieldCheck, Sparkles, Calendar, ArrowRight } from "lucide-react";
import { MoneyCell, StatusPill, ComplianceCallout } from "@stoa/ui";

const history = [
  { period: "April 2026", paid_on: "Apr 1", cents: 240000 },
  { period: "March 2026", paid_on: "Mar 1", cents: 240000 },
  { period: "February 2026", paid_on: "Feb 1", cents: 240000 },
  { period: "January 2026", paid_on: "Jan 1", cents: 240000 },
];

export default function PayPage() {
  return (
    <div className="px-5 space-y-6">
      <Link href="/t" className="inline-flex items-center gap-1 text-[13px] text-text-secondary">
        <ChevronLeft className="h-3.5 w-3.5" /> Home
      </Link>

      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-muted">
          Pay rent
        </p>
        <h1 className="mt-1 font-display text-[30px] leading-[1.1] tracking-tight text-text-primary">
          May rent.
        </h1>
        <p className="mt-1 text-[14px] text-text-secondary">
          Scheduled to charge automatically. You can pay now or change anything below.
        </p>
      </div>

      {/* Big amount card */}
      <div className="rounded-2xl bg-[var(--surface-paper)] p-6 shadow-hairline">
        <div className="text-[11px] uppercase tracking-[0.12em] font-mono text-text-muted">
          Total due May 1
        </div>
        <div className="mt-2 font-mono tabular text-[48px] tracking-tight text-text-primary">
          $2,400.00
        </div>
        <div className="mt-1 text-[12px] text-text-muted">2417 Telegraph Ave · Unit B</div>

        <div className="mt-5 grid gap-2.5 text-[13px]">
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Base rent</span>
            <MoneyCell cents={240000} size="sm" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Utilities</span>
            <span className="text-text-muted">Included</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Late fee</span>
            <span className="text-text-muted">—</span>
          </div>
          <div className="border-t border-[var(--border-subtle)] pt-2.5 flex items-center justify-between">
            <span className="text-[14px] text-text-primary">Total</span>
            <MoneyCell cents={240000} size="md" />
          </div>
        </div>
      </div>

      {/* Method picker */}
      <div>
        <div className="text-[11px] uppercase tracking-[0.12em] font-mono text-text-muted mb-3">
          Pay with
        </div>
        <div className="space-y-2.5">
          <MethodCard
            primary
            icon={Landmark}
            label="Wells Fargo Checking"
            sub="•••• 7421 · ACH · free"
            badge="Default"
          />
          <MethodCard icon={CreditCard} label="Visa •••• 4382" sub="2.9% + $0.30" />
          <button className="w-full text-left rounded-xl border border-dashed border-[var(--border-default)] px-4 py-3 text-[13px] text-text-secondary hover:bg-[var(--surface-paper)]">
            + Add a new bank or card
          </button>
        </div>
      </div>

      {/* Autopay */}
      <div className="rounded-2xl bg-[var(--surface-paper)] p-5 shadow-hairline">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-[14px] font-medium text-text-primary">Autopay is on</div>
            <div className="text-[12px] text-text-muted mt-0.5">
              Wells Fargo · 3 days before due
            </div>
          </div>
          <button className="text-[12px] text-brass-700 underline-draw">Edit</button>
        </div>
        <div className="mt-3 flex items-center gap-2 text-[12px] text-text-secondary">
          <Calendar className="h-3.5 w-3.5 text-text-muted" />
          Next charge: <span className="font-mono tabular">Apr 28</span>
          <span>·</span>
          <ShieldCheck className="h-3.5 w-3.5 text-text-muted" />
          Reversible until <span className="font-mono tabular">Apr 29</span>
        </div>
      </div>

      {/* Submit area */}
      <div className="sticky bottom-24 pt-2 -mx-5 px-5 bg-gradient-to-t from-[var(--surface-canvas)] from-50% to-transparent">
        <button className="group w-full rounded-xl bg-brass-500 px-5 py-4 text-[15px] font-medium text-ink-900 hover:bg-brass-600 transition-colors duration-180 flex items-center justify-between">
          <span>Pay $2,400.00 now</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-180 group-hover:translate-x-0.5" />
        </button>
        <p className="mt-2 text-center text-[12px] text-text-muted">
          Free ACH · funds clear in 2–3 business days
        </p>
      </div>

      {/* Compliance + history */}
      <ComplianceCallout
        citation="Civ. § 1947.3"
        intent="info"
        summary="Cash and personal check accepted on request. Choose what works for you."
      />

      <div>
        <div className="text-[11px] uppercase tracking-[0.12em] font-mono text-text-muted mb-3">
          Recent payments
        </div>
        <div className="rounded-2xl bg-[var(--surface-paper)] divide-y divide-[var(--border-subtle)] shadow-hairline overflow-hidden">
          {history.map((h) => (
            <div key={h.period} className="flex items-center justify-between px-4 py-3">
              <div>
                <div className="text-[13px] font-medium text-text-primary">{h.period}</div>
                <div className="text-[11px] text-text-muted">Paid {h.paid_on} · Wells Fargo •••• 7421</div>
              </div>
              <div className="flex items-center gap-3">
                <MoneyCell cents={h.cents} size="sm" intent="success" />
                <StatusPill status="paid" size="sm" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MethodCard({
  icon: Icon,
  label,
  sub,
  badge,
  primary,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  sub: string;
  badge?: string;
  primary?: boolean;
}) {
  return (
    <button
      className={[
        "w-full text-left rounded-xl px-4 py-3.5 transition-shadow duration-180 flex items-center gap-3",
        primary
          ? "bg-[var(--surface-paper)] ring-1 ring-brass-500 shadow-hairline"
          : "bg-[var(--surface-paper)] shadow-hairline hover:shadow-md",
      ].join(" ")}
    >
      <div className="h-9 w-9 rounded-lg bg-cream-100 flex items-center justify-center">
        <Icon className="h-4 w-4 text-text-secondary" />
      </div>
      <div className="flex-1">
        <div className="text-[13.5px] font-medium text-text-primary">{label}</div>
        <div className="text-[11.5px] text-text-muted">{sub}</div>
      </div>
      {badge ? (
        <span className="rounded-full bg-brass-100 px-2 py-0.5 font-mono text-[10px] text-brass-700">
          {badge}
        </span>
      ) : null}
    </button>
  );
}
