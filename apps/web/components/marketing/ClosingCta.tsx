import { Button } from "@stoa/ui";

export function ClosingCta() {
  return (
    <section className="bg-[var(--surface-inverse)] px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-content">
        <p className="font-mono text-overline uppercase tracking-[0.16em] text-brass-400">
          The next first of the month
        </p>
        <h2 className="mt-3 font-display text-[44px] leading-[1.1] tracking-[-0.02em] text-text-inverse balance lg:text-[64px]">
          Get this off your plate before it lands again.
        </h2>
        <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Button size="lg" variant="primary">
            Get started — free for 10 units
          </Button>
          <Button size="lg" variant="inverse" className="bg-transparent text-text-inverse shadow-hairline hover:bg-white/5">
            Read the security overview
          </Button>
        </div>
        <p className="mt-7 text-caption text-ink-200">
          ~12 minutes to import a portfolio · No card to start.
        </p>
      </div>
    </section>
  );
}
