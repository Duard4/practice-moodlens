import daisyui from 'daisyui';
import withMT from '@material-tailwind/react/utils/withMT';

/** @type {import('tailwindcss').Config} */
export default withMT({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        // Light Theme
        light: {
          primary: '#3BCEAC', // Vibrant blue
          secondary: '#7c3aed', // Purple
          accent: '#f59e0b', // Amber
          neutral: '#f3f4f6', // Light gray
          'base-100': '#ffffff', // White
          'base-200': '#f9fafb', // Slightly off-white
          'base-300': '#e5e7eb', // Light gray for borders
          'base-content': '#1f2937', // Dark gray for text
          info: '#3b82f6', // Blue
          success: '#10b981', // Green
          warning: '#f59e0b', // Amber
          error: '#ef4444', // Red
        },
        // Dark Theme
        dark: {
          primary: '#3b82f6', // Vibrant blue
          secondary: '#7c3aed', // Purple
          accent: '#f59e0b', // Amber
          neutral: '#374151', // Dark gray
          'base-100': '#1f2937', // Dark background
          'base-200': '#111827', // Darker background
          'base-300': '#374151', // Dark gray for borders
          'base-content': '#f3f4f6', // Light gray for text
          info: '#3b82f6', // Blue
          success: '#10b981', // Green
          warning: '#f59e0b', // Amber
          error: '#ef4444', // Red
        },
      },
    ],
  },
  darkMode: 'class',
});
