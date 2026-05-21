import * as React from "react";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { cn } from "../cn";

interface ComplianceCalloutProps {
  citation: string;
  intent?: "info" | "blocking" | "override";
  summary: string;
  children?: React.ReactNode;
  className?: string;
}

const intentStyles = {
  info: {
    container: "bg-[var(--signal-info-bg)] border-l-2 border-[var(--text-muted)]",
    icon: "text-[var(--text-muted)]",
    Icon: ShieldCheck,
  },
  blocking: {
    container: "bg-[var(--signal-danger-bg)] border-l-2 border-[var(--signal-danger-border)]",
    icon: "text-[var(--signal-danger-fg)]",
    Icon: ShieldAlert,
  },
  override: {
    container: "bg-[var(--signal-warning-bg)] border-l-2 border-[var(--signal-warning-border)]",
    icon: "text-[var(--signal-warning-fg)]",
    Icon: ShieldAlert,
  },
} as const;

export function ComplianceCallout({
  citation,
  intent = "info",
  summary,
  children,
  className,
}: ComplianceCalloutProps) {
  const style = intentStyles[intent];
  const Icon = style.Icon;
  return (
    <div
      role={intent === "blocking" ? "alert" : "note"}
      className={cn("flex gap-3 rounded-md p-3", style.container, className)}
    >
      <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", style.icon)} aria-hidden />
      <div className="text-[13px] leading-5">
        <span className="font-mono tabular text-[12px] tracking-tight">
          {citation}
        </span>
        <span className="ml-2 text-text-secondary">{summary}</span>
        {children ? <div className="mt-1.5">{children}</div> : null}
      </div>
    </div>
  );
}
