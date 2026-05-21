import Link from "next/link";
import { Download, Filter, MoreHorizontal, Search } from "lucide-react";
import { Card, MoneyCell, StatusPill } from "@stoa/ui";

type Row = {
  unit: string;
  property: string;
  tenant: string;
  rent: number;
  paid: number;
  due_on: string;
  status: "paid" | "partial" | "overdue" | "scheduled";
  days_late?: number;
  method?: string;
};

const rent: Row[] = [
  { unit: "2417 Telegraph · A", property: "2417 Telegraph", tenant: "Jordan Kim", rent: 215000, paid: 100000, due_on: "Apr 1", status: "partial", days_late: 4, method: "Plaid · BoA" },
  { unit: "2417 Telegraph · B", property: "2417 Telegraph", tenant: "Maya Chen", rent: 240000, paid: 240000, due_on: "Apr 1", status: "paid", method: "ACH · Wells Fargo" },
  { unit: "2417 Telegraph · C", property: "2417 Telegraph", tenant: "Felipe Cordero", rent: 215000, paid: 215000, due_on: "Apr 1", status: "paid", method: "ACH" },
  { unit: "2417 Telegraph · D", property: "2417 Telegraph", tenant: "Naomi Beck", rent: 240000, paid: 240000, due_on: "Apr 1", status: "paid", method: "ACH" },
  { unit: "1842 College · 1A", property: "1842 College", tenant: "Sara Loomis", rent: 305000, paid: 305000, due_on: "Apr 1", status: "paid", method: "ACH" },
  { unit: "1842 College · 2A", property: "1842 College", tenant: "Marc Lambert", rent: 305000, paid: 305000, due_on: "Apr 1", status: "paid", method: "Card" },
  { unit: "1842 College · 3A", property: "1842 College", tenant: "Diego Ramirez", rent: 305000, paid: 305000, due_on: "Apr 1", status: "paid", method: "ACH" },
  { unit: "1842 College · 4A", property: "1842 College", tenant: "Aisha Karim", rent: 305000, paid: 0, due_on: "Apr 1", status: "overdue", days_late: 8, method: "—" },
  { unit: "1842 College · 1B", property: "1842 College", tenant: "Henrik Sølvberg", rent: 315000, paid: 315000, due_on: "Apr 1", status: "paid", method: "ACH" },
  { unit: "1842 College · 2B", property: "1842 College", tenant: "Ava Pelletier", rent: 315000, paid: 315000, due_on: "Apr 1", status: "paid", method: "ACH" },
  { unit: "3120 Adeline · 1", property: "3120 Adeline", tenant: "Tomasa Galvez", rent: 318000, paid: 318000, due_on: "Apr 1", status: "paid", method: "ACH" },
  { unit: "3120 Adeline · 2", property: "3120 Adeline", tenant: "Sara Park", rent: 388000, paid: 0, due_on: "Apr 1", status: "overdue", days_late: 8, method: "Plaid · BoA" },
  { unit: "3120 Adeline · 3", property: "3120 Adeline", tenant: "Wendell Adair", rent: 318000, paid: 318000, due_on: "May 1", status: "scheduled", method: "Autopay" },
];

export default function RentRoll() {
  const collected = rent.reduce((sum, r) => sum + r.paid, 0);
  const expected = rent.reduce((sum, r) => sum + r.rent, 0);
  const outstanding = expected - collected;

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex items-baseline justify-between">
        <div>
          <p className="font-mono text-overline uppercase tracking-[0.16em] text-text-muted">Rent roll</p>
          <h1 className="mt-1 font-display text-[32px] tracking-tight text-text-primary">April 2026</h1>
          <p className="mt-1 text-[14px] text-text-secondary">
            {rent.filter(r => r.status === "paid").length} of {rent.length} leases paid in full · 2 overdue · 1 partial
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border-subtle)] px-3 py-1.5 text-[13px] text-text-secondary hover:bg-cream-50 dark:hover:bg-ink-800">
            <Filter className="h-3.5 w-3.5" /> Filter
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border-subtle)] px-3 py-1.5 text-[13px] text-text-secondary hover:bg-cream-50 dark:hover:bg-ink-800">
            <Download className="h-3.5 w-3.5" /> Export
          </button>
          <button className="rounded-md bg-brass-500 px-3 py-1.5 text-[13px] font-medium text-ink-900 hover:bg-brass-600">
            Send reminders
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <div className="text-overline text-text-muted">Collected</div>
          <div className="mt-2"><MoneyCell cents={collected} size="lg" intent="success" /></div>
          <div className="mt-1 text-[12px] text-text-muted font-mono">{((collected/expected) * 100).toFixed(1)}% of $34,830</div>
        </Card>
        <Card>
          <div className="text-overline text-text-muted">Outstanding</div>
          <div className="mt-2"><MoneyCell cents={outstanding} size="lg" intent="danger" /></div>
          <div className="mt-1 text-[12px] text-text-muted font-mono">3 leases · oldest 8d</div>
        </Card>
        <Card>
          <div className="text-overline text-text-muted">Scheduled</div>
          <div className="mt-2"><MoneyCell cents={318000} size="lg" /></div>
          <div className="mt-1 text-[12px] text-text-muted font-mono">1 lease · autopay May 1</div>
        </Card>
      </div>

      <Card padding="none" className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] bg-cream-50/40 px-5 py-3">
          <div className="flex items-center gap-2 text-text-muted">
            <Search className="h-3.5 w-3.5" />
            <input
              className="bg-transparent text-[13px] text-text-primary placeholder:text-text-muted focus:outline-none w-72"
              placeholder="Search by tenant, unit, or property…"
            />
          </div>
          <div className="text-[12px] text-text-muted font-mono">{rent.length} leases · sorted by property</div>
        </div>

        <table className="w-full">
          <thead>
            <tr className="text-overline text-text-muted">
              <th className="text-left px-5 py-2 font-medium">Unit</th>
              <th className="text-left px-3 py-2 font-medium">Tenant</th>
              <th className="text-right px-3 py-2 font-medium">Rent</th>
              <th className="text-right px-3 py-2 font-medium">Paid</th>
              <th className="text-left px-3 py-2 font-medium">Due</th>
              <th className="text-left px-3 py-2 font-medium">Method</th>
              <th className="text-left px-3 py-2 font-medium">Status</th>
              <th className="px-5 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {rent.map((r, idx) => {
              const isOverdue = r.status === "overdue" || r.status === "partial";
              return (
                <tr
                  key={r.unit}
                  className={[
                    "border-t border-[var(--border-subtle)] transition-colors duration-120",
                    isOverdue ? "bg-[var(--signal-danger-bg)]/30" : "",
                    "hover:bg-cream-50 dark:hover:bg-ink-800",
                    "group",
                  ].join(" ")}
                >
                  <td className="px-5 py-3 text-[13px] text-text-primary font-medium">{r.unit}</td>
                  <td className="px-3 py-3 text-[13px] text-text-secondary">{r.tenant}</td>
                  <td className="px-3 py-3 text-right"><MoneyCell cents={r.rent} size="sm" /></td>
                  <td className="px-3 py-3 text-right">
                    <MoneyCell cents={r.paid} size="sm" intent={r.paid === 0 ? "danger" : r.paid < r.rent ? "default" : "success"} />
                  </td>
                  <td className="px-3 py-3 text-[12px] text-text-secondary font-mono tabular">
                    {r.due_on}
                    {r.days_late ? <span className="ml-1 text-[var(--signal-danger-fg)]">+{r.days_late}d</span> : null}
                  </td>
                  <td className="px-3 py-3 text-[12px] text-text-muted">{r.method}</td>
                  <td className="px-3 py-3"><StatusPill status={r.status} size="sm" /></td>
                  <td className="px-3 py-3 text-right">
                    <button className="rounded p-1 text-text-muted hover:bg-cream-100 dark:hover:bg-ink-700 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="grid grid-cols-3 border-t-2 border-[var(--border-subtle)] bg-cream-50/60">
          <div className="px-5 py-3 text-[13px] font-medium text-text-primary">Totals · {rent.length} leases</div>
          <div className="px-3 py-3 text-right"><MoneyCell cents={expected} size="md" /></div>
          <div className="px-3 py-3 text-right">
            <MoneyCell cents={collected} size="md" intent="success" />
            <div className="text-[11px] text-text-muted font-mono">
              of <span className="tabular">{((collected/expected) * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
