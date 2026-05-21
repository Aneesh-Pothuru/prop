const featured = [
  {
    quote:
      "I used to spend Saturdays catching up on tenant texts. I now spend Saturdays not doing that.",
    name: "D. Ramirez",
    role: "Owner-operator · 42 units",
    location: "Oakland",
  },
  {
    quote:
      "The first time the compliance agent stopped me from posting a late fee that violated my own lease, I knew this was different.",
    name: "A. Singh",
    role: "Founder, Singh Properties · 14 units",
    location: "San Jose",
  },
  {
    quote:
      "The ledger matches my QuickBooks to the cent without me touching either. It should not be this rare.",
    name: "P. Goldstein",
    role: "Principal, Goldstein Residential · 78 units",
    location: "Santa Monica",
  },
];

export function Quotes() {
  return (
    <section className="px-6 py-20 lg:py-32 bg-[var(--surface-sunken)]">
      <div className="mx-auto max-w-content">
        <p className="font-mono text-overline uppercase text-text-muted tracking-[0.16em]">
          In pilot
        </p>
        <h2 className="mt-3 font-display text-[40px] leading-[1.1] tracking-[-0.02em] text-text-primary balance lg:text-[52px]">
          Hear from operators in the pilot.
        </h2>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {featured.map((q) => (
            <figure
              key={q.name}
              className="rounded-xl bg-[var(--surface-paper)] p-7 shadow-hairline"
            >
              <div className="font-display text-[44px] leading-none text-brass-500 mb-2">“</div>
              <blockquote className="text-[16px] leading-[24px] text-text-primary">
                {q.quote}
              </blockquote>
              <figcaption className="mt-5">
                <div className="text-[14px] font-medium text-text-primary">{q.name}</div>
                <div className="text-[12px] text-text-muted">{q.role}</div>
                <div className="text-[12px] text-text-muted">{q.location}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
