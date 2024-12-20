import { fontFamily } from "tailwindcss/defaultTheme";


export default {
  content: [
    "./app/**/*.(js|ts|tsx)",
    "./components/**/*.(js|ts|tsx)",
    "./pages/**/*.(js|ts|tsx)"
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
