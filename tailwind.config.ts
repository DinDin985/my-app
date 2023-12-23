import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#444444",
        primaryLighter: "#696969",
        primaryDarker: "#363636",
        secondary: "#EEEEEE",
        hoverGray: "#b5b5b5",
      },
      transitionDelay: {
        "250": "250ms",
      },
      transitionDuration: {
        "250": "250ms",
      },
      inset: {
        "9px": "9px",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")({ nocompatible: true }),
    require("@tailwindcss/line-clamp"),
  ],
};
export default config;
