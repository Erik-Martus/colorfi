const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{js,jsx}'],
  theme: {
    container: { center: true, padding: { DEFAULT: '1rem', sm: '2rem' } },
    fontFamily: {
      sans: ['inter', ...defaultTheme.fontFamily.sans],
    },
  },
  variants: {
    extend: {
      backgroundColor: ['checked'],
    },
  },
};
