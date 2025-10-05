import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-grotesk)", "ui-sans-serif", "system-ui"], // paragraphs, body
        header: ["var(--font-brawler)", "serif"], // headings
      },
    },
  },
} satisfies Config;
