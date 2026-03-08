/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mrewa: {
          blue: '#0056b3', // Primary brand color
          dark: '#1a1a1a', // Industrial dark
          slate: '#64748b'
        }
      }
    },
  },
  plugins: [],
}