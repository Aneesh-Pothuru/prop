/**
 * Design tokens — the single source of truth.
 * Refer to docs/design/01-design-system.md for the contract.
 * Components never reference raw values — only token names.
 */

export const palette = {
  cream: {
    50: "#FBF8F2",
    100: "#F7F3EC",
    200: "#EDE7DA",
  },
  ink: {
    900: "#0B1733",
    800: "#142142",
    700: "#1F2D55",
    600: "#33415C",
    500: "#4B5878",
    400: "#6A7793",
    300: "#8B95B0",
    200: "#B6BDD0",
    100: "#D7DCE6",
  },
  brass: {
    700: "#8C6B1F",
    600: "#A6832E",
    500: "#C8A24B",
    400: "#D8B975",
    300: "#EAD7A6",
    100: "#F4E8C9",
  },
  red: {
    700: "#8E2A20",
    600: "#B0382C",
    500: "#D04A3C",
    300: "#EFAFA8",
    100: "#F5DCD8",
  },
  green: {
    700: "#125A3C",
    600: "#176F4B",
    500: "#1E8A5C",
    300: "#9BD2B5",
    100: "#D7ECDF",
  },
  amber: {
    700: "#8A540C",
    600: "#AC6810",
    500: "#C97B14",
    300: "#E9BE7C",
    100: "#F4E2C2",
  },
} as const;

export const space = {
  0: "0",
  px: "1px",
  0.5: "2px",
  1: "4px",
  1.5: "6px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  8: "32px",
  10: "40px",
  12: "48px",
  16: "64px",
  20: "80px",
  24: "96px",
  32: "128px",
} as const;

export const radius = {
  none: "0",
  sm: "6px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  "2xl": "20px",
  pill: "999px",
} as const;

export const font = {
  display: '"GT Sectra", "Tiempos Headline", "PT Serif", Georgia, serif',
  sans: '"Inter", "General Sans", system-ui, -apple-system, "Segoe UI", sans-serif',
  mono: '"JetBrains Mono", "IBM Plex Mono", ui-monospace, "SF Mono", monospace',
} as const;

export const shadow = {
  none: "none",
  hairline: "inset 0 0 0 1px rgba(11,23,51,0.06)",
  sm: "0 1px 2px rgba(11,23,51,0.06)",
  md: "0 4px 12px rgba(11,23,51,0.08)",
  lg: "0 12px 32px rgba(11,23,51,0.12)",
  xl: "0 24px 64px rgba(11,23,51,0.16)",
} as const;

export const motion = {
  instant: "80ms linear",
  fast: "120ms cubic-bezier(0.4, 0, 0.2, 1)",
  base: "180ms cubic-bezier(0.4, 0, 0.2, 1)",
  slow: "320ms cubic-bezier(0.22, 1, 0.36, 1)",
  hero: "600ms cubic-bezier(0.16, 1, 0.3, 1)",
} as const;

export const z = {
  base: 0,
  sticky: 20,
  dropdown: 100,
  overlay: 200,
  modal: 300,
  toast: 400,
  tooltip: 500,
  commandPalette: 600,
} as const;

export const tokens = {
  palette,
  space,
  radius,
  font,
  shadow,
  motion,
  z,
} as const;

export type Tokens = typeof tokens;
