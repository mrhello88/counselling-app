/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3490dc", // Your primary color
        secondary: "#ffed4a", // Your secondary color
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
 