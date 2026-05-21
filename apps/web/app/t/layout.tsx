import type { Metadata, Viewport } from "next";
import { TenantShell } from "@/components/tenant/TenantShell";

export const metadata: Metadata = {
  title: "Stoa · Tenant",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function TenantLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-surface="tenant" className="min-h-screen bg-[var(--surface-canvas)]">
      <TenantShell>{children}</TenantShell>
    </div>
  );
}
