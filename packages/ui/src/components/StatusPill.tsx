import * as React from "react";
import { cn } from "../cn";

type Status =
  | "new"
  | "in-progress"
  | "awaiting-tenant"
  | "awaiting-pm"
  | "resolved"
  | "paid"
  | "partial"
  | "overdue"
  | "blocked"
  | "draft"
  | "sent"
  | "scheduled";

interface StatusPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: Status;
  size?: "sm" | "md";
  withDot?: boolean;
}

const labels: Record<Status, string> = {
  new: "New",
  "in-progress": "In progress",
  "awaiting-tenant": "Awaiting tenant",
  "awaiting-pm": "Awaiting PM",
  resolved: "Resolved",
  paid: "Paid",
  partial: "Partial",
  overdue: "Overdue",
  blocked: "Blocked",
  draft: "Draft",
  sent: "Sent",
  scheduled: "Scheduled",
};

const variants: Record<Status, string> = {
  new: "bg-[var(--signal-info-bg)] text-[var(--signal-info-fg)] ring-[var(--border-subtle)]",
  "in-progress":
    "bg-[var(--signal-warning-bg)] text-[var(--signal-warning-fg)] ring-[var(--signal-warning-border)]",
  "awaiting-tenant":
    "bg-[var(--signal-warning-bg)] text-[var(--signal-warning-fg)] ring-[var(--signal-warning-border)]",
  "awaiting-pm":
    "bg-[var(--signal-warning-bg)] text-[var(--signal-warning-fg)] ring-[var(--signal-warning-border)]",
  resolved:
    "bg-[var(--signal-success-bg)] text-[var(--signal-success-fg)] ring-[var(--signal-success-border)]",
  paid:
    "bg-[var(--signal-success-bg)] text-[var(--signal-success-fg)] ring-[var(--signal-success-border)]",
  partial:
    "bg-[var(--signal-warning-bg)] text-[var(--signal-warning-fg)] ring-[var(--signal-warning-border)]",
  overdue:
    "bg-[var(--signal-danger-bg)] text-[var(--signal-danger-fg)] ring-[var(--signal-danger-border)]",
  blocked:
    "bg-[var(--signal-danger-bg)] text-[var(--signal-danger-fg)] ring-[var(--signal-danger-border)]",
  draft:
    "bg-[var(--signal-info-bg)] text-[var(--signal-info-fg)] ring-[var(--border-subtle)]",
  sent:
    "bg-[var(--signal-success-bg)] text-[var(--signal-success-fg)] ring-[var(--signal-success-border)]",
  scheduled:
    "bg-[var(--signal-info-bg)] text-[var(--signal-info-fg)] ring-[var(--border-subtle)]",
};

const dotColors: Record<Status, string> = {
  new: "bg-ink-400",
  "in-progress": "bg-amber-500",
  "awaiting-tenant": "bg-amber-500",
  "awaiting-pm": "bg-amber-500",
  resolved: "bg-green-500",
  paid: "bg-green-500",
  partial: "bg-amber-500",
  overdue: "bg-red-500",
  blocked: "bg-red-500",
  draft: "bg-ink-400",
  sent: "bg-green-500",
  scheduled: "bg-ink-400",
};

export function StatusPill({
  status,
  size = "sm",
  withDot = true,
  className,
  children,
  ...rest
}: StatusPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full ring-1 ring-inset font-sans font-medium",
        size === "sm" ? "h-5 px-2 text-[11px]" : "h-6 px-2.5 text-[12px]",
        variants[status],
        className
      )}
      {...rest}
    >
      {withDot ? (
        <span
          aria-hidden
          className={cn("h-1.5 w-1.5 rounded-full", dotColors[status])}
        />
      ) : null}
      {children ?? labels[status]}
    </span>
  );
}
