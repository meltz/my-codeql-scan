import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: `cny-lion-dance-assets/[name].[ext]`,
        entryFileNames: `cny-lion-dance-assets/[name].js`,
        chunkFileNames: `cny-lion-dance-assets/[name].js`,
      },
    },
  },
});
