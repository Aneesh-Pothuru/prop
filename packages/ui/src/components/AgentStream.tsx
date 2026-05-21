"use client";
import * as React from "react";
import { cn } from "../cn";

interface AgentStreamProps {
  /** Text to type out. */
  text: string;
  /** Speed in chars per second. */
  speed?: number;
  /** Whether to start typing immediately. */
  autoStart?: boolean;
  /** Called when typing completes. */
  onComplete?: () => void;
  className?: string;
  /** Show a soft pulsing cursor while typing. */
  showCursor?: boolean;
  /** Optional pre-typed agent label (e.g., "Diagnosis · Sonnet 4.6"). */
  label?: string;
}

export function AgentStream({
  text,
  speed = 60,
  autoStart = true,
  onComplete,
  className,
  showCursor = true,
  label,
}: AgentStreamProps) {
  const [shown, setShown] = React.useState(autoStart ? "" : text);
  const [done, setDone] = React.useState(!autoStart);

  React.useEffect(() => {
    if (!autoStart) return;
    setShown("");
    setDone(false);
    let i = 0;
    const interval = window.setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) {
        window.clearInterval(interval);
        setDone(true);
        onComplete?.();
      }
    }, 1000 / speed);
    return () => window.clearInterval(interval);
  }, [text, speed, autoStart, onComplete]);

  return (
    <div className={cn("font-sans text-[14px] leading-[22px]", className)}>
      {label ? (
        <div className="mb-1 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted">
          <span className="h-1 w-1 rounded-full bg-brass-500" />
          {label}
        </div>
      ) : null}
      <p className="text-text-primary balance">
        {shown}
        {showCursor && !done ? (
          <span
            aria-hidden
            className="ml-0.5 inline-block h-[1em] w-[2px] -mb-0.5 align-middle bg-brass-500 animate-pulse"
          />
        ) : null}
      </p>
    </div>
  );
}
