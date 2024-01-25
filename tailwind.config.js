/** @type {import('tailwindcss').Config} */
import scrollbar from "tailwind-scrollbar";

export default {
  content: ["./src/pages/**/*.{html,tsx}", "./src/components/**/*.{html,tsx}"],
  theme: {
    extend: {
    },
  },
  plugins: [
    scrollbar({
      scrollbarWidth: "thin",
      scrollbarColor: {
        thumb: "#c4c4c4",
        track: "#f0f0f0",
      },
    })
  ],
};
