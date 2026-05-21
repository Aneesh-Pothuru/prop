const left = [
  { code: "AB-12", desc: "Security deposit cap of one month's rent" },
  { code: "AB-1482", desc: "Annual rent cap 5% + CPI, max 10%" },
  { code: "Civ. § 1947.12", desc: "Just-cause termination" },
  { code: "Civ. § 1671", desc: "Late fee reasonableness (Orozco)" },
  { code: "Civ. § 1941.1", desc: "Habitability" },
  { code: "Civ. § 1950.5", desc: "Deposit return timeline" },
];

const right = [
  { code: "Civ. § 1954", desc: "24-hour entry notice" },
  { code: "AB-2347", desc: "10-day UD response window" },
  { code: "SB-329", desc: "Source-of-income protection" },
  { code: "SB-1100", desc: "Fair Chance Housing" },
  { code: "Gov. § 12955", desc: "Fair housing language scan" },
  { code: "City overlays", desc: "SF, LA, Oakland, Berkeley, Santa Monica" },
];

export function ComplianceMoat() {
  return (
    <section id="compliance" className="px-6 py-20 lg:py-32">
      <div className="mx-auto max-w-content">
        <p className="font-mono text-overline uppercase text-text-muted tracking-[0.16em]">
          California-first
        </p>
        <h2 className="mt-3 font-display text-[40px] leading-[1.1] tracking-[-0.02em] text-text-primary balance lg:text-[52px]">
          Built for the law that's actually on the books here.
        </h2>
        <p className="mt-6 max-w-prose text-[17px] leading-[26px] text-text-secondary">
          The incumbents were built in Texas or Utah and shoehorned to California later.
          We are doing the inverse. Stoa enforces California landlord-tenant law as a
          runtime guard, not a wiki page. Every action — drafting a notice, raising rent,
          withholding from a deposit — runs through the compliance agent before it goes
          out. If it would violate a statute, it does not go out.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {[left, right].map((col, idx) => (
            <ul key={idx} className="space-y-3">
              {col.map((c) => (
                <li
                  key={c.code}
                  className="group flex items-start gap-4 rounded-md border border-[var(--border-subtle)] bg-[var(--surface-paper)] p-3"
                >
                  <span className="font-mono text-[12px] text-text-primary bg-[var(--surface-sunken)] rounded px-2 py-1 tabular shrink-0">
                    {c.code}
                  </span>
                  <span className="text-[14px] text-text-secondary mt-0.5">{c.desc}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>

        <p className="mt-8 max-w-prose text-caption text-text-muted">
          Rule library reviewed by external CA tenant-law counsel before pilot. New
          statutes patched in within 30 days of effective date.
        </p>
      </div>
    </section>
  );
}
