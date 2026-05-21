import * as React from "react";
import { cn } from "../cn";

interface MoneyCellProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Amount in cents (bigint or number). Pass null for an em-dash. */
  cents: number | bigint | null | undefined;
  currency?: "USD";
  /** Show +/- delta sign even on positive values. */
  showSign?: boolean;
  /** Optional delta value in cents; renders an inline arrow + percent change. */
  deltaPct?: number;
  /** Visual posture. */
  intent?: "default" | "muted" | "danger" | "success";
  /** Display size: sm = body-sm; md = body; lg = mono-lg hero. */
  size?: "sm" | "md" | "lg";
}

const FALLBACK_DASH = "—";

function format(cents: number | bigint, currency: "USD"): string {
  const dollars = Number(cents) / 100;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(dollars);
}

export function MoneyCell({
  cents,
  currency = "USD",
  showSign = false,
  deltaPct,
  intent = "default",
  size = "md",
  className,
  ...rest
}: MoneyCellProps) {
  if (cents === null || cents === undefined) {
    return (
      <span
        aria-label="No value"
        className={cn(
          "font-mono tabular text-text-muted",
          size === "sm" && "text-mono-sm",
          size === "md" && "text-mono",
          size === "lg" && "text-mono-lg",
          className
        )}
        {...rest}
      >
        {FALLBACK_DASH}
      </span>
    );
  }

  const cn_ = Number(cents);
  const negative = cn_ < 0;
  const formatted = format(Math.abs(cn_), currency);
  const sign = negative ? "−" : showSign ? "+" : "";

  const colorByIntent =
    intent === "danger" || negative
      ? "text-[var(--signal-danger-fg)]"
      : intent === "success"
        ? "text-[var(--signal-success-fg)]"
        : intent === "muted"
          ? "text-text-muted"
          : "text-text-primary";

  return (
    <span
      className={cn(
        "font-mono tabular",
        size === "sm" && "text-mono-sm",
        size === "md" && "text-mono",
        size === "lg" && "text-mono-lg",
        colorByIntent,
        className
      )}
      {...rest}
    >
      {sign}
      {formatted}
      {typeof deltaPct === "number" ? (
        <span
          className={cn(
            "ml-2 text-mono-sm",
            deltaPct < 0 ? "text-[var(--signal-danger-fg)]" : "text-[var(--signal-success-fg)]"
          )}
        >
          {deltaPct >= 0 ? "▲" : "▼"} {Math.abs(deltaPct).toFixed(1)}%
        </span>
      ) : null}
    </span>
  );
}
