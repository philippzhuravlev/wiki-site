/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cambria', 'Georgia', 'serif'],
      },
      colors: {
        primary: '#8B4513', // Saddle brown for primary actions
        background: {
          DEFAULT: '#F5E6D3', // Light parchment color
          dark: '#2C1810', // Deep brown for dark mode
        },
        surface: {
          DEFAULT: '#FFF8EC', // Lighter parchment for cards/surfaces
          dark: '#1F110B', // Darker brown for dark mode surfaces
        },
        border: {
          DEFAULT: '#D4B59E', // Lighter brown for borders
          dark: '#40241C', // Dark brown for borders in dark mode
        },
        text: {
          DEFAULT: '#2C1810', // Dark brown for text
          light: '#8B4513', // Saddle brown for secondary text
        }
      },
      textIndent: {
        tab: '2em',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 