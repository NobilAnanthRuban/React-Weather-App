/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neo: {
          bg: '#0f172a',
          glass: 'rgba(15,23,42,0.65)',
          accent: '#f97316',      // warm orange for highlights
          accentSoft: '#e5e7eb',  // soft light text / borders
          danger: '#fb7185'       // rose-400
        },
        aqi: {
          good: '#4ade80',        // green-400
          moderate: '#facc15',    // yellow-400
          unhealthy: '#fb923c',   // orange-400
          veryUnhealthy: '#f97373', // soft red
          hazardous: '#e879f9'    // fuchsia-400
        }
      },
      boxShadow: {
        glass: '0 18px 45px rgba(15,23,42,0.65)',
        neon: '0 0 30px rgba(148,163,184,0.55)'
      },
      fontFamily: {
        sans: ['"Poppins"', 'system-ui', 'ui-sans-serif', 'sans-serif']
      }
    }
  },
  plugins: []
};