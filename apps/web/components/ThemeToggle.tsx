"use client";
import * as React from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    const saved = (localStorage.getItem("stoa-theme") as "light" | "dark" | null) ?? null;
    const sys = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const next = saved ?? sys;
    setTheme(next);
    document.documentElement.dataset.theme = next;
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("stoa-theme", next);
  };

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggle}
      className="rounded-md p-1.5 text-text-secondary hover:bg-cream-100 transition-colors duration-180"
    >
      {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  );
}
