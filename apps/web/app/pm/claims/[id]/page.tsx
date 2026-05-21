import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Calendar,
  ChevronRight,
  Clock,
  Image as ImageIcon,
  Phone,
  Receipt,
  ShieldCheck,
  User,
} from "lucide-react";
import {
  Card,
  MoneyCell,
  StatusPill,
  ToolCallChip,
  AgentStream,
  ComplianceCallout,
} from "@stoa/ui";

export default function ClaimDetail() {
  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex items-center gap-3 text-[13px] text-text-muted">
        <Link href="/pm/claims" className="inline-flex items-center gap-1 hover:text-text-primary">
          <ArrowLeft className="h-3.5 w-3.5" />
          Claims
        </Link>
        <span>·</span>
        <span className="font-mono">CLM-2417</span>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-[34px] tracking-tight text-text-primary">
              Electrical · outlet trip in kitchen
            </h1>
            <StatusPill status="in-progress" size="md" />
          </div>
          <div className="mt-2 flex items-center gap-3 text-[13px] text-text-secondary">
            <span className="inline-flex items-center gap-1"><Building2 className="h-3.5 w-3.5 text-text-muted" />2417 Telegraph Ave · Unit B</span>
            <span>·</span>
            <span className="inline-flex items-center gap-1"><User className="h-3.5 w-3.5 text-text-muted" />Maya Chen</span>
            <span>·</span>
            <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-text-muted" />Opened 12 min ago</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-md border border-[var(--border-subtle)] px-3 py-1.5 text-[13px] text-text-secondary hover:bg-cream-50 dark:hover:bg-ink-800">
            Reverse last action
          </button>
          <button className="rounded-md border border-[var(--border-subtle)] px-3 py-1.5 text-[13px] text-text-secondary hover:bg-cream-50 dark:hover:bg-ink-800">
            Call tenant
          </button>
          <button className="rounded-md bg-brass-500 px-3 py-1.5 text-[13px] font-medium text-ink-900 hover:bg-brass-600">
            Reply
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_360px] gap-6">
        {/* Thread */}
        <Card padding="lg">
          <div className="flex items-center gap-2 text-[12px] text-text-muted">
            <span className="font-mono">Triaged at 14:42:13 · 0.6s</span>
            <span>·</span>
            <span>Routed to Diagnosis</span>
          </div>

          <div className="mt-6 space-y-6">
            <Bubble who="tenant" name="Maya Chen" time="12 min ago">
              <p>
                Outlet in kitchen sparked when I plugged in the toaster. Tripped the
                breaker. Smells faintly of plastic. Should I be worried?
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2 max-w-[300px]">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="aspect-square rounded-md bg-cream-100 border border-[var(--border-subtle)] flex items-center justify-center">
                    <ImageIcon className="h-4 w-4 text-text-muted" />
                  </div>
                ))}
              </div>
            </Bubble>

            <AgentBubble label="Diagnosis · Sonnet 4.6 · 1.2s">
              <p>
                Sounds like the GFCI tripped from a high-draw appliance. Before I send
                anyone out — can you look at the outlet face? Is there a red or black
                button between the two sockets?
              </p>
              <ToolRow tools={[
                { name: "lookup_lease_responsibilities", ms: 84 },
                { name: "cite_civil_code_1941", ms: 42 },
                { name: "propose_remediation", ms: 612 },
              ]} />
            </AgentBubble>

            <Bubble who="tenant" name="Maya Chen" time="3 min ago">
              <p>Yes, a red one. It clicked when I pressed it. Toaster works now.</p>
            </Bubble>

            <AgentBubble label="Diagnosis · 0.8s">
              <AgentStream
                text="That fixed it — the GFCI is doing its job. I'd recommend a licensed electrician check the outlet within 30 days for peace of mind. I've logged this and flagged it for your PM. Anything else?"
                speed={80}
              />
              <ToolRow tools={[
                { name: "log_resolution", ms: 124 },
                { name: "flag_for_pm", ms: 58 },
              ]} />
            </AgentBubble>
          </div>

          <div className="mt-8 rounded-lg border border-[var(--border-subtle)] bg-cream-50 p-4">
            <div className="text-overline text-text-muted">Reply as Jenna</div>
            <textarea
              className="mt-2 w-full resize-none rounded-md border border-[var(--border-subtle)] bg-white p-3 text-[14px] text-text-primary placeholder:text-text-muted focus:outline-none"
              rows={3}
              placeholder="The agent will draft a reply for you to review. Or type your own…"
              defaultValue="Maya, glad it's working. I'll have Cordeiro Electric do a quick check on Tuesday between 9 and 11 — they're licensed and 2 miles away. Sound good? — Jenna"
            />
            <div className="mt-2 flex items-center justify-between">
              <div className="flex gap-1.5">
                <ToolCallChip name="ai.draft_reply" latencyMs={420} />
                <ToolCallChip name="compliance.scan_language" latencyMs={88} />
              </div>
              <div className="flex gap-2">
                <button className="rounded-md px-3 py-1.5 text-[13px] text-text-secondary hover:bg-white dark:hover:bg-ink-800">
                  Save draft
                </button>
                <button className="rounded-md bg-brass-500 px-3 py-1.5 text-[13px] font-medium text-ink-900 hover:bg-brass-600">
                  Send to Maya
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Right rail */}
        <div className="space-y-4">
          <Card padding="md">
            <div className="text-overline text-text-muted">Agent summary</div>
            <p className="mt-2 text-[13px] leading-[20px] text-text-primary">
              GFCI tripped from high-draw appliance · tenant self-resolved · no entry needed · light non-urgent follow-up recommended.
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-[12px]">
              <div className="rounded-md bg-cream-50 p-2.5">
                <div className="text-text-muted">Cost estimate</div>
                <MoneyCell cents={18500} size="sm" />
                <div className="text-[10px] text-text-muted mt-0.5">Within lease threshold</div>
              </div>
              <div className="rounded-md bg-cream-50 p-2.5">
                <div className="text-text-muted">Risk</div>
                <div className="font-medium text-[13px] text-text-primary">Low</div>
                <div className="text-[10px] text-text-muted mt-0.5">No habitability impact</div>
              </div>
            </div>
          </Card>

          <Card padding="md">
            <div className="text-overline text-text-muted">Proposed action</div>
            <div className="mt-3 rounded-lg border border-[var(--border-subtle)] bg-cream-50 p-3.5">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-[13px] font-medium text-text-primary">Cordeiro Electric · Oakland</div>
                  <div className="text-[11px] text-text-muted">C-10 · CSLB #1098432 · 2.4 mi</div>
                </div>
                <MoneyCell cents={18500} size="sm" />
              </div>
              <div className="mt-2 text-[12px] text-text-secondary space-y-1">
                <div className="inline-flex items-center gap-1.5"><Calendar className="h-3 w-3 text-text-muted" /> Tue Apr 8 · 9–11am</div>
                <div className="inline-flex items-center gap-1.5"><Phone className="h-3 w-3 text-text-muted" /> Tenant confirmed window</div>
                <div className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3 w-3 text-text-muted" /> Within $250 lease threshold</div>
              </div>
              <button className="mt-3 w-full rounded-md bg-brass-500 px-3 py-1.5 text-[13px] font-medium text-ink-900 hover:bg-brass-600">
                Approve and dispatch
              </button>
            </div>
          </Card>

          <Card padding="md">
            <div className="text-overline text-text-muted">Compliance</div>
            <div className="mt-3 space-y-2.5">
              <ComplianceCallout
                citation="Civ. § 1941.1"
                intent="info"
                summary="Habitability covered. Repair-and-deduct not triggered."
              />
              <ComplianceCallout
                citation="Civ. § 1954"
                intent="info"
                summary="Tenant scheduled entry herself. 24h notice not required."
              />
            </div>
          </Card>

          <Card padding="md">
            <div className="text-overline text-text-muted">Lease context</div>
            <div className="mt-3 space-y-2 text-[12px]">
              <Row label="Tenant" value="Maya Chen · since Oct 2024" />
              <Row label="Unit" value="2417 Telegraph · B · 1BR / 1BA" />
              <Row label="Rent" value={<MoneyCell cents={240000} size="sm" />} />
              <Row label="Deposit" value={<MoneyCell cents={240000} size="sm" />} />
              <Row label="Lease ends" value="Sep 30, 2026" />
              <Row label="Owner" value="Hayes Properties" />
            </div>
            <Link href="/pm/leases/L-1042" className="mt-3 inline-flex items-center gap-1 text-[13px] text-brass-700">
              Open lease <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </Card>
        </div>
      </div>
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
    <div className="flex gap-4">
      <div className="h-9 w-9 shrink-0 rounded-full bg-brass-300 text-ink-900 flex items-center justify-center font-medium text-[13px]">
        {name.split(" ").map((n) => n[0]).join("")}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-[14px] font-medium text-text-primary">{name}</span>
          <span className="text-[11px] text-text-muted">{time}</span>
        </div>
        <div className="mt-1.5 text-[14.5px] leading-[23px] text-text-primary">
          {children}
        </div>
      </div>
    </div>
  );
}

function AgentBubble({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-cream-50 border border-[var(--border-subtle)] p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="h-1.5 w-1.5 rounded-full bg-brass-500" />
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">
          {label}
        </span>
      </div>
      <div className="text-[14.5px] leading-[23px] text-text-primary">{children}</div>
    </div>
  );
}

function ToolRow({ tools }: { tools: { name: string; ms: number }[] }) {
  return (
    <div className="mt-2.5 flex flex-wrap gap-1.5">
      {tools.map((t) => (
        <ToolCallChip key={t.name} name={t.name} latencyMs={t.ms} />
      ))}
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-text-muted">{label}</span>
      <span className="text-text-primary text-right">{value}</span>
    </div>
  );
}
