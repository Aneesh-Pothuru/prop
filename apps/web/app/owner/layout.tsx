import type { Metadata } from "next";
import { OwnerShell } from "@/components/owner/OwnerShell";

export const metadata: Metadata = { title: "Stoa · Owner" };

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-surface="owner" className="min-h-screen bg-[var(--surface-canvas)]">
      <OwnerShell>{children}</OwnerShell>
    </div>
  );
}
