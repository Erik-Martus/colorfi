const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{js,jsx}'],
  theme: {
    container: { center: true },
    fontFamily: {
      sans: ['inter', ...defaultTheme.fontFamily.sans],
    },
  },
};
