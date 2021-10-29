/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  mount: {
    public: '/',
    src: '/dist',
  },
  plugins: [
    '@snowpack/plugin-postcss',
    '@snowpack/plugin-babel',
    'snowpack-plugin-svgr',
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    knownEntrypoints: [
      'react/jsx-runtime',
      '@emotion/react/jsx-runtime',
      'highlight.js/lib/core',
      'prismjs/components/prism-core',
      'prismjs/components/prism-javascript',
      'prismjs/components/prism-clike',
      'prismjs/components/prism-css',
      'prismjs/components/prism-scss',
      'prismjs/components/prism-sass',
      'prismjs/components/prism-less',
    ],
  },
  devOptions: {
    tailwindConfig: './tailwind.config.js',
  },
  buildOptions: {
    /* ... */
  },
};
