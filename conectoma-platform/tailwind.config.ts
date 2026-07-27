import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0D0F1A',
        paper: '#F7F8FC',
        accent: '#3A2FD8',
        accent2: '#00B4A0',
        l1: '#185FA5', // Sistemas Inteligentes
        l2: '#0F6E56', // Infraestructura
        l3: '#854F0B', // Manufactura
        cierre: '#7B2D8B',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
