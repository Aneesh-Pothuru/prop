export function ProblemFraming() {
  const oldBullets = [
    "Three apps that don't talk",
    "A spreadsheet you don't trust",
    "A vendor list in your head",
    "A compliance worry you push down",
    "Notices you write from memory",
  ];
  const newBullets = [
    "One thread per tenant, one ledger per property",
    "Agents that do the first hour of work",
    "A vendor network with the right license for the job",
    "Notices that cite the right statute on the first draft",
    "Reversible within 24 hours, audit-logged forever",
  ];

  return (
    <section className="px-6 py-20 lg:py-32">
      <div className="mx-auto max-w-content">
        <p className="font-mono text-overline uppercase text-text-muted tracking-[0.16em]">
          The old way
        </p>
        <h2 className="mt-3 font-display text-[40px] leading-[1.1] tracking-[-0.02em] text-text-primary balance lg:text-[52px]">
          What it actually feels like.
        </h2>

        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="rounded-xl bg-[var(--surface-sunken)] p-8 shadow-hairline">
            <h3 className="font-display text-[22px] text-text-primary">Today</h3>
            <p className="mt-4 text-[16px] leading-[26px] text-text-secondary">
              A tenant texts you at 9:14pm: <em>“the upstairs sink is leaking again.”</em>{" "}
              You don't remember if Jorge is the right plumber for this unit. You scroll
              back through three months of WhatsApp. You text Jorge. Jorge texts back
              tomorrow. Meanwhile the tenant is sleeping in a damp apartment. Rent posts to
              Stripe but you forgot to mark it in the sheet. The owner emails:{" "}
              <em>“did we collect this month?”</em> You don't have a clean answer.
            </p>
            <ul className="mt-6 space-y-2">
              {oldBullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-[13px] text-text-muted">
                  <span className="mt-2 h-px w-3 bg-text-muted" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative rounded-xl bg-[var(--surface-paper)] p-8 shadow-hairline">
            <span className="absolute left-0 top-8 h-12 w-[2px] bg-brass-500" aria-hidden />
            <h3 className="font-display text-[22px] text-text-primary">With stoa</h3>
            <p className="mt-4 text-[16px] leading-[26px] text-text-secondary">
              The same text arrives in the tenant's app. Triage classifies it. Diagnosis
              asks the right four questions, and half the time the tenant fixes it
              themselves. When a visit is needed, you see a draft dispatch with a
              contractor who has the right license and a quote that fits the lease. You
              approve, or you don't. Rent reconciles itself. The owner sees the same
              numbers you do.
            </p>
            <ul className="mt-6 space-y-2">
              {newBullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-[13px] text-text-primary">
                  <span className="mt-2 h-px w-3 bg-brass-500" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
