import * as React from "react";
import { Check, Loader2, X } from "lucide-react";
import { cn } from "../cn";

interface ToolCallChipProps {
  name: string;
  status?: "running" | "succeeded" | "failed";
  latencyMs?: number;
  className?: string;
}

export function ToolCallChip({
  name,
  status = "succeeded",
  latencyMs,
  className,
}: ToolCallChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md bg-[var(--surface-sunken)] px-2 py-1 font-mono text-[11px] text-text-secondary",
        status === "failed" && "text-[var(--signal-danger-fg)]",
        className
      )}
    >
      {status === "running" ? (
        <Loader2 className="h-3 w-3 animate-spin text-brass-500" aria-hidden />
      ) : status === "failed" ? (
        <X className="h-3 w-3 text-[var(--signal-danger-fg)]" aria-hidden />
      ) : (
        <Check className="h-3 w-3 text-[var(--signal-success-fg)]" aria-hidden />
      )}
      <span>{name}</span>
      {typeof latencyMs === "number" ? (
        <span className="text-text-muted">{latencyMs}ms</span>
      ) : null}
    </span>
  );
}
