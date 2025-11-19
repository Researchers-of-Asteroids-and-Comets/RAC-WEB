import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: ["./app/**/*.{ts,tsx}", "./sanity/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["OCR A Extended", "monospace"],
        serif: ["OCR A Extended", "monospace"],
        mono: ["OCR A Extended", "monospace"],
        ocra: ["OCR A Extended", "monospace"],
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [typography],
} satisfies Config;
