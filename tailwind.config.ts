import { fontFamily } from "tailwindcss/defaultTheme";


export default {
  mode: "jit",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.(js|ts|tsx)"
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["var(--font-body)", ...fontFamily.sans],
      },
      colors: {
        primary: "#00A75D",
      },
    },
  },
  variants: {},
  plugins: [],
};
