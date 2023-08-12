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
        background: resolve(
          __dirname,
          'src',
          'app',
          'background',
          'background.html'
        ),
        popup: resolve(__dirname, 'src', 'app', 'popup', 'popup.html'),
        options: resolve(__dirname, 'src', 'app', 'options', 'options.html'),
        contentScript: resolve(__dirname, 'src', 'app', 'contentScript.ts'),
      },
      output: {
        dir: 'dist',
        format: 'es',
        sourcemap: false,
        entryFileNames: 'src/app/[name]/[name].js',
        assetFileNames: 'src/app/assets/[name][extname]',
      },
    },
  },
});
