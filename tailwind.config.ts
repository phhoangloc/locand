import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      width: {
        'full-12': 'calc(100% - 3rem)',
        'full-16': 'calc(100% - 4rem)',
        'full-20': 'calc(100% - 5rem)',
        'full-64': 'calc(100% - 16rem)',
      },
    },
    screens: {
      xs: '375px',
      sm: '575px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1600px',
    },
  },
  plugins: [],
};
export default config;