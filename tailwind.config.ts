import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Neue Haas Display"', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        sub: ['"Swear Display"', '"Newsreader"', 'Georgia', 'serif'],
      },
      colors: {
        frame: '#14130F',
        canvas: '#F3F1EC',
        taupe: '#ABA295',
        ink: '#16150F',
        'ink-2': '#6E6B62',
        'ink-3': '#A7A399',
        'on-dark': '#F4F2EC',
        line: '#E1DFD8',
        'line-2': '#CDCAC0',
        accent: '#2236E8',
      },
      borderRadius: {
        frame: '26px',
        hero: '22px',
        card: '20px',
        chip: '40px',
      },
    },
  },
  plugins: [],
}

export default config
