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
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        silver: '#C0C0C0',
        gold: '#ffd700',
      },
      spacing: {
        '128': '32rem', // 512px if 1rem = 16px
        '144': '36rem', // 576px if 1rem = 16px
        // Add other custom sizes as needed
      }
    },
  },
  plugins: [],
};
export default config;
