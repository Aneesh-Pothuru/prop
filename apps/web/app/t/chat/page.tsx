"use client";
import * as React from "react";
import Link from "next/link";
import { ChevronLeft, Paperclip, Camera, ArrowUp } from "lucide-react";
import { ToolCallChip, AgentStream } from "@stoa/ui";

export default function TenantChat() {
  return (
    <div className="px-5 space-y-5">
      <Link href="/t" className="inline-flex items-center gap-1 text-[13px] text-text-secondary">
        <ChevronLeft className="h-3.5 w-3.5" /> Home
      </Link>

      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-muted">
          Ask your agent
        </p>
        <h1 className="mt-1 font-display text-[28px] leading-[1.1] tracking-tight text-text-primary">
          Diagnosis, Knowledge, Ledger.
        </h1>
        <p className="mt-1 text-[14px] text-text-secondary">
          One thread. The right agent shows up for the right question.
        </p>
      </div>

      <div className="rounded-2xl bg-[var(--surface-paper)] shadow-hairline overflow-hidden">
        <div className="px-5 py-4 border-b border-[var(--border-subtle)] flex items-center justify-between">
          <div>
            <div className="text-[13px] font-medium text-text-primary">All inquiries</div>
            <div className="text-[11px] text-text-muted">Triage routes between Diagnosis, Knowledge, Ledger</div>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[11px] text-text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Online
          </span>
        </div>

        <div className="px-5 py-5 space-y-5">
          <YouBubble time="9:14 PM">
            How does the security deposit refund work after I move out?
          </YouBubble>

          <AgentBubble label="Triage · 0.4s" pre={<ToolCallChip name="route → knowledge" latencyMs={180} />}>
            Good question — routing you to Knowledge. They have your lease handy.
          </AgentBubble>

          <AgentBubble label="Knowledge · 1.1s">
            <p className="text-[14.5px] leading-[23px]">
              Under California Civil Code §1950.5, your landlord must return your deposit
              within <span className="font-mono tabular">21 calendar days</span> of you
              moving out, with an itemized statement for any deductions. Your deposit is{" "}
              <span className="font-mono tabular">$2,400.00</span>.
            </p>
            <p className="mt-2 text-[14.5px] leading-[23px]">
              You're also entitled to a pre-move-out inspection — we can schedule it 2 weeks
              before your lease ends. Want me to set that up?
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button className="rounded-full bg-white px-3 py-1.5 text-[12px] text-text-secondary shadow-hairline">
                Yes, schedule it
              </button>
              <button className="rounded-full bg-white px-3 py-1.5 text-[12px] text-text-secondary shadow-hairline">
                Read § 1950.5 in full
              </button>
              <button className="rounded-full bg-white px-3 py-1.5 text-[12px] text-text-secondary shadow-hairline">
                Show my deposit ledger
              </button>
            </div>
          </AgentBubble>

          <YouBubble time="Just now">
            Show my deposit ledger
          </YouBubble>

          <AgentBubble label="Ledger · 0.8s">
            <div className="rounded-lg border border-[var(--border-subtle)] bg-cream-50 p-3">
              <div className="text-[11px] font-mono uppercase tracking-[0.12em] text-text-muted">
                Deposit held in trust · Hayes Property Group
              </div>
              <div className="mt-2 grid grid-cols-2 gap-y-1.5 text-[13px]">
                <span className="text-text-secondary">Initial deposit</span>
                <span className="text-right font-mono tabular text-text-primary">$2,400.00</span>
                <span className="text-text-secondary">Interest accrued</span>
                <span className="text-right font-mono tabular text-text-primary">$8.12</span>
                <span className="text-text-secondary">Deductions to date</span>
                <span className="text-right font-mono tabular text-text-muted">$0.00</span>
                <span className="text-text-primary border-t border-[var(--border-subtle)] pt-2">Balance</span>
                <span className="text-right font-mono tabular text-text-primary border-t border-[var(--border-subtle)] pt-2">$2,408.12</span>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <ToolCallChip name="trust.read_balance" latencyMs={86} />
              <ToolCallChip name="cite_civil_code_1950" latencyMs={42} />
            </div>
          </AgentBubble>

          <AgentBubble label="Knowledge · streaming">
            <AgentStream
              text="Anything else you'd like to know about move-out — the 21-day rule, the inspection checklist, or what deductions are allowed?"
              speed={70}
            />
          </AgentBubble>
        </div>

        <div className="border-t border-[var(--border-subtle)] bg-cream-50/40 px-3 py-3">
          <div className="flex items-end gap-2 rounded-xl bg-white border border-[var(--border-subtle)] px-3 py-2">
            <button aria-label="Camera" className="text-text-muted hover:text-text-primary">
              <Camera className="h-4.5 w-4.5" />
            </button>
            <button aria-label="Attach" className="text-text-muted hover:text-text-primary">
              <Paperclip className="h-4.5 w-4.5" />
            </button>
            <input
              className="flex-1 bg-transparent text-[14px] text-text-primary placeholder:text-text-placeholder focus:outline-none"
              placeholder="Ask anything…"
              defaultValue=""
            />
            <button
              aria-label="Send"
              className="rounded-full bg-brass-500 p-2 text-ink-900 hover:bg-brass-600"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function YouBubble({ time, children }: { time: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[80%]">
        <div className="rounded-2xl rounded-br-md bg-ink-900 px-4 py-2.5 text-[14.5px] leading-[22px] text-cream-50">
          {children}
        </div>
        <div className="mt-1 text-right text-[10.5px] text-text-muted">{time}</div>
      </div>
    </div>
  );
}

function AgentBubble({
  label,
  children,
  pre,
}: {
  label: string;
  children: React.ReactNode;
  pre?: React.ReactNode;
}) {
  return (
    <div>
      {pre ? <div className="mb-2">{pre}</div> : null}
      <div className="rounded-2xl rounded-bl-md bg-cream-100 px-4 py-3">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-brass-500" />
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">{label}</span>
        </div>
        <div className="text-[14.5px] leading-[22px] text-text-primary">{children}</div>
      </div>
    </div>
  );
}
