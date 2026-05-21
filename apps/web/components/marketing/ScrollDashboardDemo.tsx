"use client";
import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Building2,
  Inbox,
  LayoutDashboard,
  Receipt,
  ScrollText,
  Search,
  Settings,
  Users,
  Zap,
  Droplets,
  KeyRound,
} from "lucide-react";
import { MoneyCell, StatusPill, ToolCallChip, ComplianceCallout, AgentStream } from "@stoa/ui";

type QueueItem = {
  id: string;
  unit: string;
  tenant: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  status: "in-progress" | "awaiting-tenant" | "resolved" | "new";
  snippet: string;
  ageMin: number;
  selected?: boolean;
};

const queue: readonly QueueItem[] = [
  {
    id: "CLM-2417",
    unit: "2417 Telegraph · B",
    tenant: "Maya Chen",
    category: "Electrical",
    icon: Zap,
    status: "in-progress",
    snippet: "Outlet sparked when I plugged in the toaster…",
    ageMin: 12,
    selected: true,
  },
  {
    id: "CLM-2416",
    unit: "1842 College · 3A",
    tenant: "Diego Ramirez",
    category: "Plumbing",
    icon: Droplets,
    status: "awaiting-tenant",
    snippet: "Slow drain in upstairs sink, smells musty…",
    ageMin: 41,
  },
  {
    id: "CLM-2415",
    unit: "950 14th St · 12",
    tenant: "Priya Iyer",
    category: "Lockout",
    icon: KeyRound,
    status: "resolved",
    snippet: "Locked out — agent walked me through the lockbox…",
    ageMin: 178,
  },
  {
    id: "CLM-2414",
    unit: "2417 Telegraph · A",
    tenant: "Jordan Kim",
    category: "Appliance",
    icon: Zap,
    status: "new",
    snippet: "Dishwasher leaving residue on glasses…",
    ageMin: 5,
  },
];

const ledger = [
  { date: "Mar 1", desc: "Invoice posted · Mar rent", ref: "2417 Telegraph B", cents: 240000, kind: "debit" as const },
  { date: "Mar 4", desc: "Payment received · ACH", ref: "M. Chen", cents: 240000, kind: "credit" as const },
  { date: "Mar 4", desc: "Matched + posted", ref: "Ledger reconciled", cents: null, kind: "credit" as const },
  { date: "Mar 6", desc: "Owner share posted", ref: "Owner statement 03/2024", cents: 192000, kind: "debit" as const },
  { date: "Mar 6", desc: "Mgmt fee retained", ref: "8% per agreement", cents: 19200, kind: "credit" as const },
];

export function ScrollDashboardDemo() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const cardLift = useTransform(scrollYProgress, [0, 0.3], [40, 0]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.2], [0.4, 1]);

  return (
    <div ref={containerRef} className="mx-auto max-w-wide">
      <motion.div
        style={{ y: cardLift, opacity: cardOpacity }}
        className="relative rounded-xl shadow-xl ring-1 ring-[var(--border-subtle)] bg-white overflow-hidden"
      >
        {/* Window chrome */}
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] bg-cream-50/60 px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] text-text-muted">
            <span>app.stoa.app</span>
            <span>·</span>
            <span>live demo · seeded data</span>
          </div>
          <div className="w-12" />
        </div>

        <div className="grid grid-cols-[200px_1fr_320px] min-h-[640px]" data-surface="pm">
          {/* Sidebar */}
          <aside className="border-r border-[var(--border-subtle)] bg-cream-50/40 px-3 py-5">
            <div className="mb-6 px-2">
              <div className="font-display text-[20px] tracking-tight text-brass-500 lowercase">stoa</div>
              <div className="text-[11px] font-mono text-text-muted mt-0.5">Hayes Property Group</div>
            </div>
            <nav className="space-y-0.5">
              <SidebarItem icon={LayoutDashboard} label="Dashboard" />
              <SidebarItem icon={Inbox} label="Claims" active count={4} />
              <SidebarItem icon={Building2} label="Properties" count={12} />
              <SidebarItem icon={Users} label="Tenants" count={43} />
              <SidebarItem icon={Receipt} label="Rent roll" />
              <SidebarItem icon={ScrollText} label="Documents" />
              <SidebarItem icon={Settings} label="Settings" />
            </nav>

            <div className="mt-8 px-2">
              <div className="text-overline text-text-muted">This month</div>
              <div className="mt-2">
                <MoneyCell cents={10384000} size="lg" />
                <div className="text-caption text-text-muted">collected · 96.4%</div>
              </div>
            </div>
          </aside>

          {/* Main panel — Claims queue + selected claim */}
          <main className="grid grid-cols-[260px_1fr] min-h-full">
            <div className="border-r border-[var(--border-subtle)]">
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-4 py-3">
                <div className="font-medium text-[14px] text-text-primary">Claims</div>
                <div className="flex items-center gap-1.5 text-text-muted">
                  <Search className="h-3.5 w-3.5" />
                  <span className="text-[12px] font-mono">⌘K</span>
                </div>
              </div>
              <div className="divide-y divide-[var(--border-subtle)]">
                {queue.map((q) => {
                  const Icon = q.icon;
                  return (
                    <div
                      key={q.id}
                      className={[
                        "relative px-4 py-3 cursor-pointer transition-colors duration-120",
                        q.selected ? "bg-cream-50" : "hover:bg-cream-50/60",
                      ].join(" ")}
                    >
                      {q.selected ? (
                        <span className="absolute left-0 top-0 h-full w-[2px] bg-brass-500" />
                      ) : null}
                      <div className="flex items-center justify-between">
                        <div className="font-mono text-[11px] text-text-muted">{q.id}</div>
                        <StatusPill status={q.status as any} size="sm" />
                      </div>
                      <div className="mt-1.5 flex items-start gap-2">
                        <Icon className="h-3.5 w-3.5 shrink-0 mt-0.5 text-text-secondary" aria-hidden />
                        <div className="min-w-0">
                          <div className="text-[13px] font-medium text-text-primary truncate">
                            {q.category} · {q.unit}
                          </div>
                          <div className="mt-0.5 text-[12px] text-text-muted truncate">
                            {q.snippet}
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-[11px] text-text-muted">
                        <span>{q.tenant}</span>
                        <span className="tabular">{q.ageMin}m ago</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selected claim detail */}
            <div className="px-6 py-5 bg-white">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-mono text-[11px] text-text-muted">CLM-2417</div>
                  <h2 className="mt-1 font-display text-[26px] tracking-tight text-text-primary">
                    Electrical · outlet trip in kitchen
                  </h2>
                  <div className="mt-1.5 text-[13px] text-text-muted">
                    2417 Telegraph Ave, Unit B · Maya Chen · 12 min ago
                  </div>
                </div>
                <StatusPill status="in-progress" size="md" />
              </div>

              <div className="mt-6 space-y-4 max-w-prose">
                <Bubble who="tenant" name="Maya Chen" time="12 min ago">
                  Outlet in kitchen sparked when I plugged in the toaster. Tripped the
                  breaker. Smells faintly of plastic. Should I be worried?
                </Bubble>

                <div className="rounded-lg bg-cream-50 border border-[var(--border-subtle)] p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brass-500" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">
                      Diagnosis · Sonnet 4.6
                    </span>
                  </div>
                  <p className="text-[14px] leading-[22px] text-text-primary">
                    Sounds like the GFCI tripped from a high-draw appliance. Before I send
                    anyone out — can you look at the outlet face? Is there a red or black
                    button between the two sockets?
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <ToolCallChip name="lookup_lease_responsibilities" latencyMs={84} />
                    <ToolCallChip name="cite_civil_code_1941" latencyMs={42} />
                    <ToolCallChip name="propose_remediation" latencyMs={612} />
                  </div>
                </div>

                <Bubble who="tenant" name="Maya Chen" time="3 min ago">
                  Yes, a red one. It clicked when I pressed it. Toaster works now.
                </Bubble>

                <div className="rounded-lg bg-cream-50 border border-[var(--border-subtle)] p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brass-500" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">
                      Diagnosis
                    </span>
                  </div>
                  <AgentStream
                    text="That fixed it — the GFCI is doing its job. I'd recommend a licensed electrician check the outlet within 30 days for peace of mind. I've logged this and flagged it for your PM. Anything else?"
                    speed={80}
                    showCursor
                  />
                </div>

                <ComplianceCallout
                  citation="Civ. § 1941.1"
                  intent="info"
                  summary="Habitability covered. Repair-and-deduct not triggered."
                />
              </div>
            </div>
          </main>

          {/* Right rail — ledger + compliance */}
          <aside className="border-l border-[var(--border-subtle)] bg-cream-50/40 px-5 py-5">
            <div className="text-overline text-text-muted">Ledger · live</div>
            <div className="mt-3 rounded-lg border border-[var(--border-subtle)] bg-white p-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-caption text-text-muted">Trust balance</div>
                  <MoneyCell cents={431840} size="lg" />
                </div>
                <span className="text-[11px] font-mono text-[var(--signal-success-fg)]">▲ reconciled</span>
              </div>
              <div className="mt-4 space-y-2.5">
                {ledger.map((row, i) => (
                  <div key={i} className="flex items-start justify-between gap-3 text-[12px]">
                    <div className="min-w-0">
                      <div className="font-mono tabular text-text-muted text-[11px]">{row.date}</div>
                      <div className="text-text-primary truncate">{row.desc}</div>
                      <div className="text-text-muted truncate text-[11px]">{row.ref}</div>
                    </div>
                    <MoneyCell
                      cents={row.cents}
                      size="sm"
                      intent={row.cents === null ? "muted" : row.kind === "credit" ? "success" : "default"}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="text-overline text-text-muted">Recent payments</div>
              <div className="mt-3 rounded-lg border border-[var(--border-subtle)] bg-white p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[13px] font-medium text-text-primary">Maya Chen</div>
                    <div className="text-[11px] text-text-muted">ACH · matched to Mar invoice</div>
                  </div>
                  <MoneyCell cents={240000} size="md" intent="success" />
                </div>
                <div className="mt-2 flex items-center gap-1.5">
                  <ToolCallChip name="ledger.match_payment" latencyMs={124} />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <ComplianceCallout
                citation="AB-1482"
                intent="info"
                summary="Rent cap respected. Late fee within § 1671 reasonableness."
              />
            </div>
          </aside>
        </div>
      </motion.div>
      <p className="mt-3 text-center text-caption text-text-muted">
        Live demo · seeded data · not a recording
      </p>
    </div>
  );
}

function SidebarItem({
  icon: Icon,
  label,
  active,
  count,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
  count?: number;
}) {
  return (
    <div
      className={[
        "flex items-center justify-between rounded-md px-2 py-1.5 text-[13px] cursor-pointer",
        active ? "bg-brass-100/60 text-text-primary" : "text-text-secondary hover:bg-cream-50",
      ].join(" ")}
    >
      <span className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </span>
      {typeof count === "number" ? (
        <span className="font-mono tabular text-[11px] text-text-muted">{count}</span>
      ) : null}
    </div>
  );
}

function Bubble({
  who,
  name,
  time,
  children,
}: {
  who: "tenant" | "pm";
  name: string;
  time: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <div className="h-7 w-7 shrink-0 rounded-full bg-brass-300 text-ink-900 flex items-center justify-center font-medium text-[12px]">
        {name
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </div>
      <div className="min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="text-[13px] font-medium text-text-primary">{name}</span>
          <span className="text-[11px] text-text-muted">{time}</span>
        </div>
        <p className="mt-1 text-[14px] leading-[22px] text-text-primary">{children}</p>
      </div>
    </div>
  );
}
