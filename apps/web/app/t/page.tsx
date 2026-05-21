import Link from "next/link";
import {
  ChevronRight,
  Receipt,
  Wrench,
  MessageCircle,
  FileText,
  Calendar,
} from "lucide-react";
import { MoneyCell, StatusPill } from "@stoa/ui";

export default function TenantHome() {
  return (
    <div className="px-5 space-y-6">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-muted">
          Tuesday · April 8
        </p>
        <h1 className="mt-1 font-display text-[32px] leading-[1.1] tracking-tight text-text-primary">
          Hi, Maya.
        </h1>
        <p className="mt-1 text-[14px] text-text-secondary">
          You're all caught up. Next rent on May 1.
        </p>
      </div>

      {/* Rent card */}
      <Link
        href="/t/pay"
        className="block rounded-2xl bg-[var(--surface-paper)] p-6 shadow-hairline transition-shadow duration-180 hover:shadow-md"
      >
        <div className="flex items-baseline justify-between">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-muted">May rent</div>
            <div className="mt-1.5">
              <MoneyCell cents={240000} size="lg" />
            </div>
            <div className="mt-1.5 flex items-center gap-2 text-[13px] text-text-secondary">
              <Calendar className="h-3.5 w-3.5 text-text-muted" />
              Due May 1 · 23 days from now
            </div>
          </div>
          <StatusPill status="scheduled" />
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-cream-100 p-3">
            <div className="text-[11px] text-text-muted">Method</div>
            <div className="text-[13px] font-medium text-text-primary">Wells Fargo · 7421</div>
          </div>
          <div className="rounded-lg bg-cream-100 p-3">
            <div className="text-[11px] text-text-muted">Autopay</div>
            <div className="text-[13px] font-medium text-text-primary">On · 3 days before</div>
          </div>
        </div>
        <div className="mt-5 inline-flex items-center gap-1 text-[13px] text-brass-700">
          Manage payment <ChevronRight className="h-3.5 w-3.5" />
        </div>
      </Link>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3">
        <Action href="/t/claims/new" icon={Wrench} label="Report an issue" caption="Photo, video, or text" />
        <Action href="/t/chat" icon={MessageCircle} label="Ask your agent" caption="Diagnosis · Knowledge" />
        <Action href="/t/pay" icon={Receipt} label="Pay rent" caption="ACH · free · 1 click" />
        <Action href="/t/documents" icon={FileText} label="Lease & receipts" caption="3 documents" />
      </div>

      {/* Active conversation card */}
      <div className="rounded-2xl bg-[var(--surface-paper)] p-5 shadow-hairline">
        <div className="flex items-center justify-between">
          <div className="text-[11px] uppercase tracking-[0.12em] font-mono text-text-muted">
            Active claim · CLM-2417
          </div>
          <StatusPill status="in-progress" size="sm" />
        </div>
        <div className="mt-3">
          <div className="text-[15px] font-medium text-text-primary">
            Electrical outlet · kitchen
          </div>
          <div className="mt-1 text-[13px] text-text-muted">Updated 12 minutes ago</div>
        </div>

        <div className="mt-4 space-y-3">
          <div className="rounded-xl bg-cream-100 p-3.5">
            <div className="flex items-center gap-2 mb-1">
              <span className="h-1.5 w-1.5 rounded-full bg-brass-500" />
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">
                Diagnosis
              </span>
            </div>
            <p className="text-[14px] leading-[22px] text-text-primary">
              That fixed it — the GFCI is doing its job. I'd recommend a licensed electrician check the outlet within 30 days. I've logged this and flagged it for your PM.
            </p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              <button className="rounded-full bg-white px-3 py-1 text-[12px] text-text-secondary shadow-hairline">
                Sounds good
              </button>
              <button className="rounded-full bg-white px-3 py-1 text-[12px] text-text-secondary shadow-hairline">
                Schedule the electrician
              </button>
              <button className="rounded-full bg-white px-3 py-1 text-[12px] text-text-secondary shadow-hairline">
                Something else came up
              </button>
            </div>
          </div>
        </div>

        <Link href="/t/claims/clm-2417" className="mt-4 inline-flex items-center gap-1 text-[13px] text-brass-700">
          Open full conversation <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Property card */}
      <div className="rounded-2xl bg-[var(--surface-paper)] p-5 shadow-hairline">
        <div className="text-[11px] uppercase tracking-[0.12em] font-mono text-text-muted">
          Your home
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <div>
            <div className="text-[15px] font-medium text-text-primary">2417 Telegraph Ave · B</div>
            <div className="text-[13px] text-text-muted">Oakland, CA 94612</div>
          </div>
          <div className="text-right">
            <div className="text-[11px] text-text-muted">Lease ends</div>
            <div className="text-[13px] font-mono tabular text-text-primary">Sep 30, 2026</div>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Link href="/t/documents" className="rounded-md bg-white px-3 py-1.5 text-[12px] text-text-secondary shadow-hairline">
            View lease
          </Link>
          <Link href="#" className="rounded-md bg-white px-3 py-1.5 text-[12px] text-text-secondary shadow-hairline">
            Building rules
          </Link>
        </div>
      </div>
    </div>
  );
}

function Action({
  href,
  icon: Icon,
  label,
  caption,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  caption: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl bg-[var(--surface-paper)] p-4 shadow-hairline transition-shadow duration-180 hover:shadow-md"
    >
      <div className="h-9 w-9 rounded-full bg-brass-100 flex items-center justify-center text-brass-700">
        <Icon className="h-4.5 w-4.5" />
      </div>
      <div className="mt-3 text-[14px] font-medium text-text-primary">{label}</div>
      <div className="mt-0.5 text-[12px] text-text-muted">{caption}</div>
    </Link>
  );
}
