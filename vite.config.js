import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // GitHub Pages: https://qaz989098-dev.github.io/portFo.io/
  base: '/portFo.io/',
});
