import colors from "./components/_/theme.ts";

export default {
  darkMode: "class",
  theme: {
    colors: {
      white: "white",
      black: "black",
      transparent: "transparent",
    },
    extend: {
      colors,
    },
  },
} as import("twind").Configuration;
