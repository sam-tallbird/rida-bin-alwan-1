// tailwind.config.ts
import type { Config } from 'tailwindcss'
import logical from 'tailwindcss-logical'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './stories/**/*.{ts,tsx}'
  ],
  plugins: [logical],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#000000',
          white: '#f5f4ed',
          red: '#c82928',
          'black-surface': '#272424',
          'white-surface': '#eae7da'
        }
      },
      fontFamily: {
        sans: ['var(--font-aeonik)', 'sans-serif'],
        arabic: ['var(--font-noto-naskh-arabic)', 'Noto Naskh Arabic', 'Arial', 'sans-serif'],
        kurdish: ['var(--font-noto-naskh-arabic)', 'Noto Naskh Arabic', 'Arial', 'sans-serif'],
      }
    }
  }
}
export default config
