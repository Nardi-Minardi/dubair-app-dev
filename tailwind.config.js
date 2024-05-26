
const {nextui} = require("@nextui-org/react");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    nextui(),
    require("@vidstack/react/tailwind.cjs")({
      prefix: "media",
    }),
    function ({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-webkit": {
          "&::-webkit-scrollbar": {
            width: "12px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "white",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(209, 213, 219)",
            borderRadius: "6px",
            border: "3px solid white",
          },
        },
      };
      addUtilities(newUtilities, ["responsive", "dark"]);
    }
  ],
  darkMode: 'class'
};
