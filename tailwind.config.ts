import type { Config } from 'tailwindcss'
import { createThemes } from 'tw-colors'

const config: Config = {
  darkMode: ['selector'],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [
    createThemes({
      light: {
        'primary': '#000',
        'secondary': '#6b7280',
        'background': '#d6dbdc',
      },
      dark: {
        'primary': '#eee',
        'secondary': '#6b7280',
        'background': '#111',
      },
    })
  ],
};
export default config;
