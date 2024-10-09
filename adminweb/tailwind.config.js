/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'verde-chef': '#619537', // Nombre personalizado para tu color
        'amarillo-chef':'#F5E7A0'
      },
    },
  },
  plugins: [],
}
