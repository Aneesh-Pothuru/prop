export function Footer() {
  const cols = [
    { title: "Product", links: ["Tenant PWA", "PM dashboard", "Pricing", "Status"] },
    { title: "Company", links: ["About", "Security", "Changelog", "Press kit"] },
    { title: "Compliance", links: ["California rules", "Privacy", "Terms", "DPA"] },
    { title: "Get in touch", links: ["Contact", "Pilot program", "hello@stoa.app"] },
  ];

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--surface-canvas)] px-6 py-16">
      <div className="mx-auto max-w-content">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-overline text-text-muted">{c.title}</div>
              <ul className="mt-3 space-y-2">
                {c.links.map((l) => (
                  <li key={l}>
                    <a className="text-[14px] text-text-secondary underline-draw">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start gap-4 border-t border-[var(--border-subtle)] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="font-display text-[22px] tracking-tight text-brass-500 lowercase">stoa</span>
            <span className="text-[13px] text-text-muted">Property management, rewritten.</span>
          </div>
          <div className="flex items-center gap-4 text-caption text-text-muted">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              All systems operational
            </span>
            <span>© 2026 Stoa, Inc. · Made in California</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
