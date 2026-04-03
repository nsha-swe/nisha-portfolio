import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      fontFamily: {
        headline: [
          "var(--font-headline)",
          "Cormorant Garamond",
          "Georgia",
          "Times New Roman",
          "serif",
        ],
        body: [
          "var(--font-body)",
          "Montserrat",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "var(--font-geist-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
    },
  },
} satisfies Config;
