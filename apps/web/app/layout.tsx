import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Fraunces } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// Fraunces stands in for GT Sectra. Same proportions, open source.
const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

export const metadata: Metadata = {
  title: "Stoa · Property management, rewritten.",
  description:
    "The AI-native property platform for California operators. Tenants pay rent, file claims, and chat with agents that triage, diagnose, dispatch, and reconcile.",
  metadataBase: new URL("http://localhost:3000"),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F3EC" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1733" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${mono.variable} ${display.variable}`}
      suppressHydrationWarning
    >
      <head>
        <style>{`
          :root {
            --font-sans: ${inter.style.fontFamily}, system-ui, sans-serif;
            --font-mono: ${mono.style.fontFamily}, ui-monospace, monospace;
            --font-display: ${display.style.fontFamily}, Georgia, serif;
          }
          html, body { font-family: var(--font-sans); }
          .font-display { font-family: var(--font-display) !important; }
          .font-mono   { font-family: var(--font-mono) !important; }
          .font-sans   { font-family: var(--font-sans) !important; }
        `}</style>
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
