import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  CalendarClock,
  Inbox,
  Receipt,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { Card, MoneyCell, StatusPill, ToolCallChip, ComplianceCallout } from "@stoa/ui";

const claims = [
  { id: "CLM-2417", category: "Electrical", unit: "2417 Telegraph · B", tenant: "Maya Chen", status: "in-progress" as const, age: "12m", agent: "Diagnosis · 3 turns" },
  { id: "CLM-2416", category: "Plumbing", unit: "1842 College · 3A", tenant: "Diego Ramirez", status: "awaiting-tenant" as const, age: "41m", agent: "Diagnosis · waiting" },
  { id: "CLM-2415", category: "Lockout", unit: "950 14th St · 12", tenant: "Priya Iyer", status: "resolved" as const, age: "3h", agent: "Closed by tenant" },
  { id: "CLM-2414", category: "Appliance", unit: "2417 Telegraph · A", tenant: "Jordan Kim", status: "new" as const, age: "5m", agent: "Triaging" },
  { id: "CLM-2413", category: "HVAC", unit: "3120 Adeline · 2", tenant: "Sara Park", status: "awaiting-pm" as const, age: "1d", agent: "Quote ready · $420" },
];

const rentRoll = [
  { tenant: "Maya Chen", unit: "2417 Telegraph · B", due: 240000, status: "paid" as const, due_on: "Mar 1" },
  { tenant: "Diego Ramirez", unit: "1842 College · 3A", due: 305000, status: "paid" as const, due_on: "Mar 1" },
  { tenant: "Priya Iyer", unit: "950 14th St · 12", due: 215000, status: "paid" as const, due_on: "Mar 1" },
  { tenant: "Jordan Kim", unit: "2417 Telegraph · A", due: 215000, status: "partial" as const, due_on: "Mar 1", over: 4 },
  { tenant: "Sara Park", unit: "3120 Adeline · 2", due: 388000, status: "overdue" as const, due_on: "Mar 1", over: 6 },
];

export default function PMDashboard() {
  return (
    <div className="space-y-8 max-w-[1400px]">
      <div className="flex items-baseline justify-between">
        <div>
          <p className="font-mono text-overline uppercase text-text-muted tracking-[0.16em]">
            Tuesday · April 8
          </p>
          <h1 className="mt-1 font-display text-[32px] tracking-tight text-text-primary">
            Good morning, Jenna.
          </h1>
          <p className="mt-1 text-[14px] text-text-secondary">
            5 claims open · 1 needs your approval · 3 leases ending in 60 days
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/pm/claims"
            className="rounded-md border border-[var(--border-subtle)] px-3 py-1.5 text-[13px] text-text-secondary hover:bg-cream-50 dark:hover:bg-ink-800"
          >
            Open inbox
          </Link>
          <Link
            href="/pm/properties/new"
            className="rounded-md bg-brass-500 px-3 py-1.5 text-[13px] font-medium text-ink-900 hover:bg-brass-600"
          >
            Add property
          </Link>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-4 gap-4">
        <KPI
          label="Collected this month"
          value={<MoneyCell cents={10384000} size="lg" />}
          delta="+4.2%"
          deltaUp
          icon={<Receipt className="h-4 w-4" />}
        />
        <KPI
          label="Outstanding"
          value={<MoneyCell cents={603000} size="lg" intent="default" />}
          delta="2 leases"
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <KPI
          label="Open claims"
          value={<span className="font-mono tabular text-[28px] text-text-primary">4</span>}
          delta="1 awaiting you"
          icon={<Inbox className="h-4 w-4" />}
        />
        <KPI
          label="Occupancy"
          value={<span className="font-mono tabular text-[28px] text-text-primary">96.4<span className="text-[18px] text-text-muted">%</span></span>}
          delta="41 of 43 units"
          deltaUp
          icon={<Building2 className="h-4 w-4" />}
        />
      </div>

      <div className="grid grid-cols-[1.4fr_1fr] gap-6">
        {/* Claims queue */}
        <Card padding="none" className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-5 py-3.5">
            <div>
              <div className="text-[14px] font-medium text-text-primary">Claims queue</div>
              <div className="text-[12px] text-text-muted">5 open · sorted by urgency</div>
            </div>
            <Link href="/pm/claims" className="text-[13px] text-brass-700 underline-draw">
              View all
            </Link>
          </div>
          <div className="divide-y divide-[var(--border-subtle)]">
            {claims.map((c) => (
              <Link
                href={`/pm/claims/${c.id.toLowerCase()}`}
                key={c.id}
                className="relative grid grid-cols-[140px_1fr_180px_120px_auto] items-center px-5 py-3 hover:bg-cream-50 dark:hover:bg-ink-800 transition-colors duration-120 group"
              >
                <span className="absolute left-0 top-0 h-full w-[2px] bg-brass-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div>
                  <div className="font-mono text-[11px] text-text-muted">{c.id}</div>
                  <div className="text-[13px] font-medium text-text-primary">{c.category}</div>
                </div>
                <div className="min-w-0">
                  <div className="text-[13px] text-text-primary truncate">{c.unit}</div>
                  <div className="text-[12px] text-text-muted truncate">{c.tenant}</div>
                </div>
                <div className="text-[12px] text-text-secondary">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-brass-500" aria-hidden />
                    {c.agent}
                  </span>
                </div>
                <StatusPill status={c.status} />
                <div className="text-right text-[12px] text-text-muted font-mono tabular">
                  {c.age} ago
                </div>
              </Link>
            ))}
          </div>
        </Card>

        {/* Rent roll snapshot */}
        <Card padding="none" className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-5 py-3.5">
            <div>
              <div className="text-[14px] font-medium text-text-primary">March rent roll</div>
              <div className="text-[12px] text-text-muted">5 of 43 leases shown</div>
            </div>
            <Link href="/pm/rent-roll" className="text-[13px] text-brass-700 underline-draw">
              Open
            </Link>
          </div>
          <div className="divide-y divide-[var(--border-subtle)]">
            {rentRoll.map((r) => (
              <div key={r.unit} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 px-5 py-3">
                <div className="min-w-0">
                  <div className="text-[13px] font-medium text-text-primary truncate">{r.tenant}</div>
                  <div className="text-[12px] text-text-muted truncate">{r.unit}</div>
                </div>
                <div className="text-right">
                  <MoneyCell cents={r.due} size="sm" />
                  <div className="text-[11px] text-text-muted mt-0.5 font-mono tabular">
                    {r.over ? `+${r.over}d` : `due ${r.due_on}`}
                  </div>
                </div>
                <StatusPill status={r.status} size="sm" />
              </div>
            ))}
          </div>
          <div className="border-t border-[var(--border-subtle)] bg-cream-50/50 px-5 py-3">
            <ToolCallChip name="ledger.reconcile" latencyMs={184} />
            <span className="ml-2 text-[12px] text-text-muted">All 41 paid leases reconciled to source · 0 anomalies</span>
          </div>
        </Card>
      </div>

      {/* Approval card + compliance feed */}
      <div className="grid grid-cols-[1.2fr_1fr] gap-6">
        <Card>
          <div className="flex items-baseline justify-between">
            <div>
              <div className="text-overline text-text-muted">Awaiting your approval</div>
              <h2 className="mt-1 font-display text-[22px] text-text-primary">
                Dispatch · Cordeiro Electric for CLM-2417
              </h2>
            </div>
            <StatusPill status="awaiting-pm" />
          </div>

          <div className="mt-5 rounded-lg bg-cream-50 p-4 border border-[var(--border-subtle)]">
            <div className="grid grid-cols-[1fr_auto] items-baseline">
              <div>
                <div className="text-[13px] font-medium text-text-primary">Cordeiro Electric · Oakland, CA</div>
                <div className="text-[12px] text-text-muted">CSLB #1098432 · C-10 license verified · 2.4 mi from property</div>
              </div>
              <MoneyCell cents={18500} size="md" />
            </div>
            <div className="mt-3 grid gap-1.5 text-[12px] text-text-secondary">
              <div className="flex items-center gap-2"><CalendarClock className="h-3.5 w-3.5 text-text-muted" /> Window: Tue 8 Apr · 9–11am · tenant confirmed</div>
              <div className="flex items-center gap-2"><Receipt className="h-3.5 w-3.5 text-text-muted" /> Includes outlet replacement, GFCI test, in-wall inspection</div>
              <div className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-text-muted" /> Within lease threshold ($250) · auto-bill landlord</div>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              <ToolCallChip name="vendor.verify_license_csl" latencyMs={312} />
              <ToolCallChip name="vendor.request_quote" latencyMs={2840} />
              <ToolCallChip name="schedule.book_window" latencyMs={612} />
            </div>
            <div className="mt-4 flex gap-2">
              <button className="rounded-md bg-brass-500 px-3 py-2 text-[13px] font-medium text-ink-900 hover:bg-brass-600">
                Approve and dispatch
              </button>
              <button className="rounded-md border border-[var(--border-subtle)] px-3 py-2 text-[13px] text-text-secondary hover:bg-white dark:hover:bg-ink-800">
                Suggest alternates
              </button>
              <button className="rounded-md px-3 py-2 text-[13px] text-text-secondary hover:bg-cream-100 dark:hover:bg-ink-700">
                View full diagnosis
              </button>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div className="text-overline text-text-muted">Compliance · this week</div>
            <span className="font-mono text-[11px] text-[var(--signal-success-fg)]">All passed</span>
          </div>
          <ul className="mt-5 space-y-3">
            <ComplianceCallout
              citation="AB-1482"
              intent="info"
              summary="Annual increase capped at 8.0%. Your draft for 950 14th #12 is at 5.8% — within cap."
            />
            <ComplianceCallout
              citation="AB-12"
              intent="info"
              summary="Deposits on new leases enforced at 1× monthly rent. 4 leases signed this month, all compliant."
            />
            <ComplianceCallout
              citation="Civ. § 1671"
              intent="info"
              summary="Late fee policy of 5% applied to one lease this month. Within Orozco reasonableness ceiling."
            />
            <ComplianceCallout
              citation="Civ. § 1954"
              intent="info"
              summary="Entry notice (24h) issued for inspection at 2417 Telegraph · B."
            />
          </ul>
        </Card>
      </div>
    </div>
  );
}

function KPI({
  label,
  value,
  delta,
  deltaUp,
  icon,
}: {
  label: string;
  value: React.ReactNode;
  delta?: string;
  deltaUp?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div className="text-overline text-text-muted">{label}</div>
        {icon ? <div className="text-text-muted">{icon}</div> : null}
      </div>
      <div className="mt-2">{value}</div>
      {delta ? (
        <div className="mt-1 inline-flex items-center gap-1 text-[12px]">
          {deltaUp ? (
            <ArrowUpRight className="h-3 w-3 text-[var(--signal-success-fg)]" />
          ) : null}
          <span className="text-text-muted">{delta}</span>
        </div>
      ) : null}
    </Card>
  );
}
