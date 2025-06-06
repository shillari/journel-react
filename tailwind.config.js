/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}" 
  ],
  theme: {
    extend: {
      colors: {
          mycolor: '#ba81534f',
      }
    }
  }
}