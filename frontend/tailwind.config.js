/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        blue500: "#0A54C2",
        blue400: "#0066FF",
        textBlack: "#00091A",
        whiteButton: "#EAEFF5",
        neutral: "#78889B",
      },
      boxShadow: {
        blue: "0 4px 13px 0 rgba(0, 102, 255, 0.55)",
      },

      width: {
        100: "280px",
        200: "440px",
      },

      padding: {
        2.5: "10px",
      },
    },
  },
  plugins: [],
};
