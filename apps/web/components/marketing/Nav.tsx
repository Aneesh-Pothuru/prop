"use client";
import * as React from "react";
import Link from "next/link";
import { Button } from "@stoa/ui";

export function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-20 transition-all duration-180 ease-stoa-base",
        scrolled
          ? "bg-[color:var(--surface-canvas)]/80 backdrop-blur-xl border-b border-[var(--border-subtle)]"
          : "bg-transparent",
      ].join(" ")}
    >
      <nav className="mx-auto flex h-[72px] max-w-wide items-center justify-between px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-2" aria-label="Stoa home">
          <span className="font-display text-[28px] leading-none tracking-tight text-brass-500 lowercase">
            stoa
          </span>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          <Link href="#product" className="text-[14px] text-text-secondary underline-draw">Product</Link>
          <Link href="#pricing" className="text-[14px] text-text-secondary underline-draw">Pricing</Link>
          <Link href="#security" className="text-[14px] text-text-secondary underline-draw">Security</Link>
          <Link href="/login" className="text-[14px] text-text-secondary underline-draw">Sign in</Link>
          <Button size="sm" variant="primary">Get started</Button>
        </div>
      </nav>
    </header>
  );
}
