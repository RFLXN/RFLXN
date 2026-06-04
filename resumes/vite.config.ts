import mdx from '@mdx-js/rollup';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  plugins: [mdx(), react()],
  build: {
    outDir: 'dist/site',
    emptyOutDir: true,
  },
});
