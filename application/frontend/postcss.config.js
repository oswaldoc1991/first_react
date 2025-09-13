// postcss.config.js
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import postcssNesting from 'postcss-nesting';

/** @type {import('postcss').Config} */
export default {
  plugins: [
    postcssNesting, // Must come before tailwindcss
    tailwindcss,
    autoprefixer,
  ],
};
