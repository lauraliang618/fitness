import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync } from 'fs';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-headers',
      writeBundle() {
        try {
          const source = resolve(__dirname, '_headers');
          const target = resolve(__dirname, 'dist/_headers');
          copyFileSync(source, target);
          console.log('Successfully copied _headers file to dist directory');
        } catch (error) {
          console.error('Failed to copy _headers file:', error);
        }
      }
    }
  ],
  base: './', // 使用相对路径以确保资源正确加载
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  }
});
