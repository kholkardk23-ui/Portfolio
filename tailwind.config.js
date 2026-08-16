/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        arcade: {
          bg: '#06070E',
          card: '#0D0E1E',
          cardHover: '#141630',
          border: '#1E2248',
          yellow: '#FFD700',
          yellowGlow: '#FFF066',
          blue: '#00F0FF',
          blueDark: '#0A2540',
          pink: '#FF2E93',
          purple: '#9D4EDD',
          green: '#00FF66',
        },
        ghost: {
          red: '#FF3333',
          pink: '#FF88BB',
          cyan: '#33FFFF',
          orange: '#FF9933',
          vulnerable: '#3B82F6',
          flash: '#FFFFFF',
        }
      },
      fontFamily: {
        arcade: ['"Press Start 2P"', 'cursive', 'monospace'],
        pixel: ['"VT323"', 'monospace'],
        sans: ['"Outfit"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'neon-yellow': '0 0 15px rgba(255, 215, 0, 0.5), 0 0 30px rgba(255, 215, 0, 0.2)',
        'neon-blue': '0 0 15px rgba(0, 240, 255, 0.5), 0 0 30px rgba(0, 240, 255, 0.2)',
        'neon-pink': '0 0 15px rgba(255, 46, 147, 0.5), 0 0 30px rgba(255, 46, 147, 0.2)',
        'neon-green': '0 0 15px rgba(0, 255, 102, 0.5), 0 0 30px rgba(0, 255, 102, 0.2)',
        'neon-purple': '0 0 15px rgba(157, 78, 221, 0.5), 0 0 30px rgba(157, 78, 221, 0.2)',
        'arcade-inset': 'inset 0 0 20px rgba(0, 0, 0, 0.8)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flicker': 'flicker 0.15s infinite',
        'float': 'float 3s ease-in-out infinite',
        'waka': 'waka 0.3s steps(2) infinite',
        'pellet-pulse': 'pelletPulse 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pelletPulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.3)', opacity: '0.7' },
        },
      }
    },
  },
  plugins: [],
}
