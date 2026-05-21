"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Building2,
  ChevronsUpDown,
  Command,
  FileText,
  Inbox,
  LayoutDashboard,
  Receipt,
  Search,
  Settings,
  Users,
} from "lucide-react";
import { cn } from "@stoa/ui";
import { ThemeToggle } from "@/components/ThemeToggle";

const items = [
  { href: "/pm", label: "Dashboard", icon: LayoutDashboard },
  { href: "/pm/claims", label: "Claims", icon: Inbox, count: 4 },
  { href: "/pm/properties", label: "Properties", icon: Building2, count: 12 },
  { href: "/pm/tenants", label: "Tenants", icon: Users, count: 43 },
  { href: "/pm/rent-roll", label: "Rent roll", icon: Receipt },
  { href: "/pm/documents", label: "Documents", icon: FileText },
];

export function PMShell({ children }: { children: React.ReactNode }) {
  const path = usePathname() ?? "/pm";
  return (
    <div className="grid min-h-screen grid-cols-[232px_1fr]">
      <aside className="border-r border-[var(--border-subtle)] bg-cream-50/40">
        <div className="flex h-[60px] items-center justify-between border-b border-[var(--border-subtle)] px-4">
          <Link href="/pm" className="flex items-center gap-2">
            <span className="font-display text-[22px] lowercase tracking-tight text-brass-500">stoa</span>
          </Link>
          <button
            aria-label="Workspace switcher"
            className="rounded-md p-1 hover:bg-cream-100 dark:hover:bg-ink-700"
          >
            <ChevronsUpDown className="h-3.5 w-3.5 text-text-muted" />
          </button>
        </div>
        <div className="px-3 py-4">
          <div className="px-2 mb-3">
            <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-text-muted">Workspace</div>
            <div className="mt-1 text-[13px] font-medium text-text-primary">Hayes Property Group</div>
            <div className="text-[11px] text-text-muted">12 properties · 43 units</div>
          </div>
          <nav className="space-y-0.5">
            {items.map((it) => {
              const Icon = it.icon;
              const active =
                it.href === "/pm" ? path === "/pm" : path.startsWith(it.href);
              return (
                <Link
                  key={it.href}
                  href={it.href}
                  className={cn(
                    "group relative flex items-center justify-between rounded-md px-2 py-1.5 text-[13px] transition-colors duration-120",
                    active
                      ? "bg-brass-100/60 text-text-primary"
                      : "text-text-secondary hover:bg-cream-100 dark:hover:bg-ink-700"
                  )}
                >
                  {active ? (
                    <span className="absolute left-0 top-1.5 h-5 w-[2px] rounded bg-brass-500" />
                  ) : null}
                  <span className="flex items-center gap-2">
                    <Icon className="h-3.5 w-3.5" />
                    {it.label}
                  </span>
                  {typeof it.count === "number" ? (
                    <span className="font-mono tabular text-[11px] text-text-muted">{it.count}</span>
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 px-2">
            <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-text-muted">Agents · live</div>
            <ul className="mt-2 space-y-1.5 text-[12px]">
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Triage <span className="ml-auto text-text-muted">12</span></li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Diagnosis <span className="ml-auto text-text-muted">3</span></li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Ledger <span className="ml-auto text-text-muted">128</span></li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Comms <span className="ml-auto text-text-muted">41</span></li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Compliance <span className="ml-auto text-text-muted">guarding</span></li>
            </ul>
          </div>

          <div className="mt-8 px-2">
            <Link href="/pm/settings" className="flex items-center gap-2 text-[13px] text-text-secondary hover:text-text-primary">
              <Settings className="h-3.5 w-3.5" />
              Settings
            </Link>
          </div>
        </div>
      </aside>

      <div className="min-w-0">
        <div className="sticky top-0 z-10 flex h-[60px] items-center justify-between border-b border-[var(--border-subtle)] bg-white/90 px-6 backdrop-blur">
          <div className="flex items-center gap-3">
            <Search className="h-4 w-4 text-text-muted" />
            <span className="text-[13px] text-text-muted">Search properties, tenants, claims…</span>
            <span className="ml-3 flex items-center gap-1 rounded border border-[var(--border-subtle)] bg-cream-50 px-1.5 py-0.5 font-mono text-[11px] text-text-muted">
              <Command className="h-3 w-3" /> K
            </span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button aria-label="Notifications" className="relative rounded-md p-1.5 hover:bg-cream-100 dark:hover:bg-ink-700">
              <Bell className="h-4 w-4 text-text-secondary" />
              <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-brass-500" />
            </button>
            <div className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-cream-100 dark:hover:bg-ink-700">
              <div className="h-6 w-6 rounded-full bg-brass-300 flex items-center justify-center font-medium text-[11px] text-ink-900">
                JH
              </div>
              <span className="text-[13px] text-text-primary">Jenna Hayes</span>
            </div>
          </div>
        </div>
        <div className="p-6 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
