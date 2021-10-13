/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  mount: {
    public: '/',
    src: '/dist',
  },
  plugins: ['@snowpack/plugin-postcss', '@snowpack/plugin-babel'],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    knownEntrypoints: ['react/jsx-runtime', '@emotion/react/jsx-runtime'],
  },
  devOptions: {
    tailwindConfig: './tailwind.config.js',
  },
  buildOptions: {
    /* ... */
  },
};
