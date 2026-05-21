"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageCircle, Receipt, FileText, Wrench } from "lucide-react";
import { cn } from "@stoa/ui";

const tabs = [
  { href: "/t", label: "Home", icon: Home },
  { href: "/t/pay", label: "Pay", icon: Receipt },
  { href: "/t/claims/new", label: "Report", icon: Wrench },
  { href: "/t/chat", label: "Chat", icon: MessageCircle },
  { href: "/t/documents", label: "Docs", icon: FileText },
];

export function TenantShell({ children }: { children: React.ReactNode }) {
  const path = usePathname() ?? "/t";

  return (
    <div className="mx-auto flex min-h-screen max-w-tenant flex-col">
      <header className="px-5 pt-7 pb-4">
        <div className="flex items-center justify-between">
          <Link href="/t" className="flex items-center gap-2">
            <span className="font-display text-[26px] lowercase tracking-tight text-brass-500">stoa</span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              aria-label="Notifications"
              className="relative rounded-full p-2 hover:bg-cream-200"
            >
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-brass-500" />
              <svg className="h-5 w-5 text-text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5m6 0a3 3 0 11-6 0" />
              </svg>
            </button>
            <div className="h-9 w-9 rounded-full bg-brass-300 flex items-center justify-center font-medium text-[13px] text-ink-900">
              MC
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 pb-28">{children}</main>

      <nav className="fixed bottom-0 left-0 right-0 mx-auto max-w-tenant border-t border-[var(--border-subtle)] bg-[color:var(--surface-canvas)]/95 backdrop-blur-xl">
        <div className="grid grid-cols-5">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = t.href === "/t" ? path === "/t" : path.startsWith(t.href);
            return (
              <Link
                key={t.href}
                href={t.href}
                className={cn(
                  "flex flex-col items-center gap-1 py-3 text-[11px]",
                  active ? "text-text-primary" : "text-text-muted"
                )}
              >
                <Icon className={cn("h-5 w-5", active && "text-brass-700")} />
                {t.label}
              </Link>
            );
          })}
        </div>
        <div className="h-[env(safe-area-inset-bottom)]" />
      </nav>
    </div>
  );
}
