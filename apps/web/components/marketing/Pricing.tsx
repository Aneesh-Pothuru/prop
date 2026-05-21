import { Button } from "@stoa/ui";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Free",
    price: 0,
    unit: "",
    cap: "Up to 10 units",
    cta: "Get started",
    ctaVariant: "primary" as const,
    bullets: [
      "Tenant PWA",
      "Rent collection (ACH only)",
      "Claim filing",
      "Triage + Diagnosis agents",
      "Knowledge agent (5 docs)",
      "California compliance",
    ],
    support: "Email · 48h response",
  },
  {
    name: "Pro",
    price: 4,
    unit: "/ unit / mo",
    cap: "Up to 100 units",
    cta: "Start free, upgrade past 10",
    ctaVariant: "primary" as const,
    featured: true,
    bullets: [
      "Everything in Free",
      "Card payments",
      "Communications agent",
      "Ledger agent · auto-reconcile",
      "All CA city overlays",
      "Owner portal (Q3)",
      "Vendor dispatch (Q3)",
    ],
    support: "Email + chat · business hours",
  },
  {
    name: "Scale",
    price: 3,
    unit: "/ unit / mo",
    cap: "Unlimited",
    cta: "Talk to us",
    ctaVariant: "ghost" as const,
    bullets: [
      "Everything in Pro",
      "Dedicated implementation",
      "Custom integrations",
      "SAML SSO",
      "Priority agent capacity",
      "Audit log API",
    ],
    support: "Slack channel · named CSM",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="px-6 py-20 lg:py-32">
      <div className="mx-auto max-w-content">
        <p className="font-mono text-overline uppercase text-text-muted tracking-[0.16em]">
          Pricing
        </p>
        <h2 className="mt-3 font-display text-[40px] leading-[1.1] tracking-[-0.02em] text-text-primary balance lg:text-[52px]">
          Per door. No per-feature.
        </h2>
        <p className="mt-6 max-w-prose text-[17px] leading-[26px] text-text-secondary">
          Free for ten units. Then a flat per-door price that includes every agent, every
          integration, every compliance update. We don't sell features back to you.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={[
                "relative rounded-xl p-7 flex flex-col",
                t.featured
                  ? "bg-[var(--surface-paper)] shadow-lg ring-1 ring-brass-500"
                  : "bg-[var(--surface-paper)] shadow-hairline",
              ].join(" ")}
            >
              {t.featured ? (
                <span className="absolute -top-2.5 left-7 rounded-full bg-brass-500 px-2.5 py-0.5 font-mono text-[11px] tracking-tight text-ink-900">
                  Most operators
                </span>
              ) : null}
              <div className="font-display text-[22px] text-text-primary">{t.name}</div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-mono tabular text-[44px] tracking-tight text-text-primary">
                  ${t.price}
                </span>
                {t.unit ? (
                  <span className="text-[13px] text-text-muted">{t.unit}</span>
                ) : null}
              </div>
              <div className="mt-1 text-[13px] text-text-muted">{t.cap}</div>
              <ul className="mt-6 space-y-2">
                {t.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-[14px] text-text-primary">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brass-700" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-6 text-[12px] text-text-muted">{t.support}</div>
              <div className="mt-5">
                <Button variant={t.ctaVariant} size="md" className="w-full">
                  {t.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-prose text-caption text-text-muted">
          Per-door pricing includes Stripe and Plaid processing on a pass-through model:
          ACH is free, cards charge the standard 2.9% + $0.30 that we don't mark up. We do
          not charge per agent run or per message.
        </p>
      </div>
    </section>
  );
}
