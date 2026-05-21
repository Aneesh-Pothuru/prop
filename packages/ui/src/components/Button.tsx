import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../cn";

const buttonStyles = cva(
  [
    "inline-flex items-center justify-center gap-2 font-sans font-medium",
    "transition-[background-color,color,box-shadow,transform] duration-120 ease-stoa-base",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "focus-visible:outline-2 focus-visible:outline-[var(--border-focus)] focus-visible:outline-offset-2",
    "active:translate-y-px",
    "select-none whitespace-nowrap",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--accent-bg)] text-[var(--accent-fg)] hover:bg-[var(--accent-bg-hover)] active:bg-[var(--accent-bg-pressed)]",
        secondary:
          "bg-[var(--surface-paper)] text-[var(--text-primary)] shadow-hairline hover:bg-[var(--surface-sunken)]",
        ghost:
          "bg-transparent text-[var(--text-primary)] hover:bg-[var(--surface-sunken)]",
        danger:
          "bg-[#D04A3C] text-white hover:bg-[#B0382C] active:bg-[#8E2A20]",
        link:
          "bg-transparent underline-offset-4 hover:underline text-[var(--text-primary)]",
        inverse:
          "bg-[var(--surface-inverse)] text-[var(--text-inverse)] hover:opacity-90",
      },
      size: {
        sm: "h-8 px-3 rounded-md text-[13px]",
        md: "h-10 px-4 rounded-md text-[14px]",
        lg: "h-12 px-6 rounded-md text-[15px]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  asChild?: boolean;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonStyles({ variant, size }), className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span
            aria-hidden
            className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-r-transparent"
          />
        ) : null}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
