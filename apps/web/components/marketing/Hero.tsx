"use client";
import { Button } from "@stoa/ui";
import { ScrollDashboardDemo } from "./ScrollDashboardDemo";

export function Hero() {
  return (
    <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32">
      <div className="mx-auto max-w-prose px-6">
        <p className="font-mono text-overline uppercase text-text-muted tracking-[0.16em] mb-6">
          Property management, rewritten
        </p>
        <h1 className="font-display text-[44px] leading-[1.04] tracking-[-0.02em] text-text-primary balance md:text-[64px] lg:text-[80px]">
          Run a portfolio like a software company.
        </h1>
        <p className="mt-7 max-w-[640px] text-[17px] leading-[26px] text-text-secondary balance md:text-[19px]">
          Stoa is the AI-native property platform for California operators. Tenants
          pay rent, file claims, and chat with agents that triage, diagnose, dispatch,
          and reconcile — so you stop living in spreadsheets and SMS threads.
        </p>
        <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Button size="lg" variant="primary">
            Get started — free for 10 units
          </Button>
          <Button size="lg" variant="ghost">
            See a live demo
          </Button>
        </div>
        <p className="mt-6 text-caption text-text-muted">
          No credit card · Imports from Buildium and AppFolio · CA-compliant from day one
        </p>
      </div>

      <div className="mt-16 px-4 lg:mt-20 lg:px-10">
        <ScrollDashboardDemo />
      </div>
    </section>
  );
}
