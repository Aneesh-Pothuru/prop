import * as React from "react";
import { cn } from "../cn";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "flat" | "raised" | "inset" | "outline";
  padding?: "none" | "sm" | "md" | "lg";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "flat", padding = "md", className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg bg-[var(--surface-paper)]",
          variant === "flat" && "shadow-hairline",
          variant === "raised" && "shadow-md",
          variant === "inset" && "bg-[var(--surface-sunken)] shadow-none",
          variant === "outline" && "border border-[var(--border-subtle)]",
          padding === "none" && "p-0",
          padding === "sm" && "p-4",
          padding === "md" && "p-5",
          padding === "lg" && "p-6",
          className
        )}
        {...rest}
      />
    );
  }
);
Card.displayName = "Card";
