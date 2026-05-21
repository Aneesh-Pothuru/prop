"use client";
import Link from "next/link";

export function OwnerShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-[var(--border-subtle)] bg-[var(--surface-canvas)]">
        <div className="mx-auto flex h-[72px] max-w-content items-center justify-between px-8">
          <Link href="/owner" className="flex items-center gap-3">
            <span className="font-display text-[26px] lowercase tracking-tight text-brass-500">stoa</span>
            <span className="text-overline text-text-muted">Owner</span>
          </Link>
          <nav className="hidden gap-7 md:flex">
            <Link href="/owner" className="text-[14px] text-text-primary underline-draw">Overview</Link>
            <Link href="/owner/statements" className="text-[14px] text-text-secondary underline-draw">Statements</Link>
            <Link href="/owner/approvals" className="text-[14px] text-text-secondary underline-draw">Approvals</Link>
            <Link href="/owner/properties" className="text-[14px] text-text-secondary underline-draw">Properties</Link>
            <Link href="/owner/documents" className="text-[14px] text-text-secondary underline-draw">Documents</Link>
          </nav>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-ink-900 text-cream-50 flex items-center justify-center font-medium text-[13px]">
              CW
            </div>
            <span className="text-[13px] text-text-primary">Carla Wong</span>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-content px-8 py-12">{children}</main>
    </div>
  );
}
