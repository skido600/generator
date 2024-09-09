/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        text: ["Poppins", "sans-serif"], // Correct format for defining custom fonts
      },
    },
  },
  plugins: [],
};
