import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink:    '#0A0A0A',
        surface: '#141414',
        edge:   '#1E1E1E',
        bone:   '#F5F1E8',
        dim:    '#888888',
        hazard: '#FFD100',
        accent: {
          DEFAULT: '#C8102E',
          dark:    '#A50D25',
          glow:    'rgba(200,16,46,0.15)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      backgroundImage: {
        'accent-glow': 'radial-gradient(ellipse at top, rgba(200,16,46,0.08) 0%, transparent 60%)',
      },
    },
  },
  plugins: [],
}

export default config
