import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'src', 'popup', 'popup.html'),
        options: resolve(__dirname, 'src', 'options', 'options.html'),
        background: resolve(__dirname, 'src', 'background', 'background.html'),
      },
      output: {
        dir: 'dist',
        format: 'es',
        sourcemap: false,
        entryFileNames: 'src/[name]/[name].js',
        assetFileNames: 'src/assets/[name][extname]'
      },
    },
  },
});
