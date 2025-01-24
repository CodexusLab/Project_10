/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1e40af",
        secondary: "#9333ea", 
        accent: "#14b8a6", 
      },
      spacing: {
        '12rem': '12rem',
        '25rem': '25rem',  // Adding custom max-widths
      },
    },
  },
  plugins: [],
};


