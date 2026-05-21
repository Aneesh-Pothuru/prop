import type { Metadata } from "next";
import { PMShell } from "@/components/pm/PMShell";

export const metadata: Metadata = {
  title: "Stoa · PM Dashboard",
};

export default function PMLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-surface="pm" className="min-h-screen bg-white text-text-primary">
      <PMShell>{children}</PMShell>
    </div>
  );
}
