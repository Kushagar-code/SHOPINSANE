import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'canvas-mist': '#f2f4f5',
        'pure-white': '#ffffff',
        'ink-black': '#000000',
        'faint-border': '#ebebeb',
        'muted-gray': '#787574',
        'cool-stone': '#cccccc',
        'warm-fog': '#acb0aa',
        'shop-violet': '#5433eb',
        'violet-wash': '#c0b5f3',
        'slate-ink': '#332f2d',
        'ash-veil': '#665a54',
        primary: {
          50: '#F3E8FF',
          100: '#E9D5FF',
          200: '#D8B4FE',
          300: '#C084FC',
          400: '#A855F7',
          500: '#9333EA',
          600: '#7E22CE',
          700: '#6B21A8',
          800: '#581C87',
          900: '#3B0764',
        },
        neutral: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#020617',
        },
        semantic: {
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
          info: '#3B82F6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
        'gt-standard': ["GT Standard", "Inter", "system-ui", "-apple-system", "sans-serif"],
        'shopify-sans': ["Shopify Sans", "Inter", "sans-serif"],
      },
      borderRadius: {
        'cards': '28px',
        'chips': '9999px',
        'pills': '20px',
        'inputs': '9999px',
        'search': '9999px',
        'buttons': '9999px',
      },
      boxShadow: {
        'glow-primary': '0 0 15px 0px rgba(147, 51, 234, 0.4)',
        'glow-intense': '0 0 25px 5px rgba(147, 51, 234, 0.6)',
        'shadow-sm': 'rgba(0, 0, 0, 0.06) 0px 2px 8px 0px',
        'shadow-sm-2': 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.1) 0px 2px 4px -2px',
        'shadow-lg': 'rgba(0, 0, 0, 0.12) 0px 4px 24px 0px',
        'shadow-lg-2': 'rgba(69, 36, 219, 0.34) 0px 4px 24px 0px',
      },
      animation: {
        "fade-in": "fadeIn 500ms ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      }
    },
  },
  plugins: [],
};
export default config;
