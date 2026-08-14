/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Placeholder — a identidade visual será definida com a cliente.
        prisma: {
          50: '#eef4fb',
          500: '#185fa5',
          700: '#0c447c',
        },
      },
    },
  },
  plugins: [],
};
