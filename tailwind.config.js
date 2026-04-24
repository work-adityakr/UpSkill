/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      inter: ["Plus Jakarta Sans", "Inter", "sans-serif"],
      "edu-sa": ["Edu SA Beginner", "cursive"],
      mono: ["JetBrains Mono", "monospace"],
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#000000",


      background: {
        primary: "#020617",     
        secondary: "#0F172A",  
        card: "#1E293B",       
      },

      neutral: {
50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280", 
        700: "#374151",
        900: "#111827",
      },
      primary: {
        50: "#6366F1", 
        100: "#8B5CF6",
        500: "#6366F1",
        900: "#312E81",
      },

      richblack: {
        5: "#F8FAFC",  
        25: "#F1F5F9",
        50: "#E2E8F0",
        100: "#CBD5E1",
        200: "#94A3B8",
        300: "#64748B",
        400: "#475569",
        500: "#334155",
        600: "#1E293B",
        700: "#0F172A",
        800: "#0B0F1A", 
        900: "#020617",
      },

      yellow: {
        5: "#F5F3FF",
        25: "#EDE9FE",
        50: "#6366F1", 
        100: "#8B5CF6",
        200: "#7C3AED",
        500: "#6D28D9",
        900: "#4C1D95",
      },

      richblue: {
        5: "#EEF2FF",
        50: "#E0E7FF",
        100: "#C7D2FE",
        200: "#A5B4FC",
        500: "#6366F1", 
        900: "#312E81",
      },

      blue: {
        5: "#ECFEFF",
        100: "#CFFAFE",
        200: "#A5F3FC",
        500: "#06B6D4",
        900: "#164E63",
      },

      caribbeangreen: {
        5: "#F0FDF4",
        50: "#DCFCE7",
        100: "#BBF7D0",
        200: "#86EFAC",
        500: "#10B981",
        900: "#064E3B",
      },

      pink: {
        25: "#FFF1F2",
        50: "#FFE4E6",
        100: "#FECDD3",
        200: "#FDA4AF",
        500: "#F43F5E",
        900: "#881337",
      },
    },
    extend: {
      maxWidth: {
        maxContent: "1260px",
        maxContentTab: "650px",
      },
      boxShadow: {
        'glow-indigo': '0 0 20px rgba(99, 102, 241, 0.3)',
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.3)',
        'glass-inset': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.05)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};