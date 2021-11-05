const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{js,jsx}'],
  theme: {
    container: { center: true, padding: { DEFAULT: '1rem', sm: '2rem' } },
    fontFamily: {
      sans: ['inter', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      transitionProperty: {
        sizing: 'height, width',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['checked'],
      borderColor: ['hocus'],
    },
  },
  plugins: [require('tailwindcss-interaction-variants')],
};
