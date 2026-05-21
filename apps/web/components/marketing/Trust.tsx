const cards = [
  {
    title: "Audit log",
    body: "Every action — by you, your team, or an agent — is logged with actor, target, before, after, and a trace id. Replayable for 24 months.",
  },
  {
    title: "Reversible by default",
    body: "Any agent action can be reversed by you in one click within 24 hours. After that, by support within 30 days.",
  },
  {
    title: "Security posture",
    body: "Encrypted at rest (AES-256) and in transit (TLS 1.3). Row-level isolation per workspace. SOC 2 Type I in flight; Type II by end of pilot.",
  },
  {
    title: "Your data is yours",
    body: "One-click export of every property, lease, ledger entry, claim, and document in standard CSV + JSON. No retention after offboarding.",
  },
];

export function Trust() {
  return (
    <section id="security" className="px-6 py-20 lg:py-32">
      <div className="mx-auto max-w-content">
        <p className="font-mono text-overline uppercase text-text-muted tracking-[0.16em]">
          Trust
        </p>
        <h2 className="mt-3 font-display text-[40px] leading-[1.1] tracking-[-0.02em] text-text-primary balance lg:text-[52px]">
          The things that should be boring.
        </h2>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <div
              key={c.title}
              className="rounded-xl bg-[var(--surface-paper)] p-6 shadow-hairline"
            >
              <h3 className="font-display text-[20px] text-text-primary">{c.title}</h3>
              <p className="mt-3 text-[14px] leading-[22px] text-text-secondary">
                {c.body}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-[14px] text-text-muted max-w-prose">
          Piloting with twelve California operators across the Bay Area and Greater Los
          Angeles. Talk to one of them — <span className="font-mono">pilots@stoa.app</span>.
        </p>
      </div>
    </section>
  );
}
