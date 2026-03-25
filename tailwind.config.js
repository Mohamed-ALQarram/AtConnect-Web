import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    path.join(__dirname, "./index.html"),
    path.join(__dirname, "./src/**/*.{js,ts,jsx,tsx}"),
  ],
  theme: {
    extend: {
      backgroundColor: {
        main: '#111121',
        card: '#1C1C2E',
        surface: '#292945',
      },
      textColor: {
        main: '#F1F5F9',
        muted: '#94A3B8',
      },
      borderColor: {
        dark: '#1E293B',
      },
      colors: {
        primary: '#7C3AED',
        success: '#22C55E',
        danger: '#EF4444',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      borderRadius: {
        '16': '16px',
        '24': '24px',
      }
    },
  },
  plugins: [],
}
