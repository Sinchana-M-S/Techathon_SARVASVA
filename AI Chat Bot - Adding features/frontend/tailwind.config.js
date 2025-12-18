/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tata-blue': '#003366',
        'tata-teal': '#00A3A1',
        'tata-gold': '#FFB81C',
        'tata-dark': '#1A1A1A',
        'tata-light-bg': '#E6F3F5',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

