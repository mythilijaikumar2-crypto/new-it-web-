/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brands
        primary: "#2563EB",
        primary_hover: "#3B82F6",
        secondary: "#06B6D4",
        secondary_hover: "#22D3EE",
        accent: "#6366F1",

        // Backgrounds
        bg_primary: "#050816",
        bg_secondary: "#0B1120",
        bg_tertiary: "#111827",
        card_bg: "#182234",
        surface: "#1E293B",

        // Text
        text_primary: "#F8FAFC",
        text_secondary: "#CBD5E1",
        text_muted: "#94A3B8",

        // Borders
        border_custom: "#334155",
        divider: "#1E293B",
      },
      spacing: {
        "space-1": "4px",
        "space-2": "8px",
        "space-3": "12px",
        "space-4": "16px",
        "space-5": "20px",
        "space-6": "24px",
        "space-8": "32px",
        "space-10": "40px",
        "space-12": "48px",
        "space-16": "64px",
        "space-20": "80px",
        "space-24": "96px",
        "space-32": "128px",
        "space-40": "160px",
      },
      borderRadius: {
        sm: "6px",
        md: "12px",
        lg: "20px",
        pill: "999px",
      },
      boxShadow: {
        card_default: "0 1px 3px rgba(5,8,22,0.5)",
        card_hover: "0 12px 32px rgba(5,8,22,0.8)",
      },
      fontFamily: {
        heading: ["Sora", "Inter", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      screens: {
        mobile_s: "375px",
        mobile_l: "480px",
        tablet: "768px",
        laptop: "1024px",
        desktop: "1280px",
        wide: "1536px",
      },
    },
  },
  plugins: [],
}
