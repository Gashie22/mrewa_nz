/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mint: '#a8e6cf',
        teal: {
          DEFAULT: '#55b3c5',
          dark: '#2a8a9e',
        },
        deep: '#1a5f6f',
        navy: '#0f3d4a',
        'off-white': '#f7fbfc',
        'text-light': '#3d6670',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #a8e6cf 0%, #7ec8c8 40%, #55b3c5 100%)',
        'hero-gradient': 'linear-gradient(135deg, #a8e6cf 0%, #80d4c0 25%, #5ec4c0 50%, #55b3c5 75%, #4aa3b8 100%)',
      },
      borderRadius: {
        'brand': '12px',
        'brand-lg': '20px',
      },
      boxShadow: {
        'brand-sm': '0 2px 8px rgba(15, 61, 74, 0.08)',
        'brand-md': '0 4px 20px rgba(15, 61, 74, 0.12)',
      }
    },
  },
  plugins: [],
}