import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      colors: {
        ink: '#0f172a',
        mist: '#f8fafc',
        storm: '#334155',
        skybrand: '#2563eb',
        sunrise: '#f97316'
      },
      boxShadow: {
        soft: '0 18px 60px rgba(15, 23, 42, 0.10)'
      }
    }
  },
  plugins: []
} satisfies Config;
