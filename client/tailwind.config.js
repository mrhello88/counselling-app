/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#000000', // black color
        secondary: '#FACC15', // yellow color
        white:" #FFFFFF",
      },
  },
},
  plugins: [require("tailwind-scrollbar-hide")],
};
