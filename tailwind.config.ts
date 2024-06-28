import type { Config } from 'tailwindcss'
import { createThemes } from 'tw-colors'

const config: Config = {
  darkMode: ['selector'],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      screens: {
        xl: '1024px', // Change desktop max-width to 1024px, centers the content better
      }
    }
  },
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
    }),
    function ({ addUtilities }: { addUtilities: Function }) {
      const newUtilities = {
        '.translate-center': {
          transform: 'translate(-50%, -50%)',
        },
      }
      
      addUtilities(newUtilities, ['responsive', 'hover'])
    },
  ],
};
export default config;
