export default {
  darkMode: 'class', // ✅ Add this line
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-up-1': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-up-2': {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pop-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.7s ease-out forwards',
        'fade-in-up-1': 'fade-in-up-1 0.8s ease-out forwards',
        'fade-in-up-2': 'fade-in-up-2 0.9s ease-out forwards',
        'pop-in-1': 'pop-in 0.9s ease-out forwards',
        'pop-in-2': 'pop-in 1s ease-out forwards',
        'slide-down': 'slide-down 0.3s ease-out forwards',
      }
    },
  },
  plugins: [],
};
