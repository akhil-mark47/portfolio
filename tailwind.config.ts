import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './app/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'space-black': '#0A0A1B',
        'electric-blue': '#00D4FF',
        'neon-purple': '#D700FF',
        'starry-white': '#E6E6FA',
      },
    },
  },
  plugins: [],
};

export default config;