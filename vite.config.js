import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shadcn': path.resolve(__dirname, './src')
    }
  },
  server: {
    proxy: {
      // Proxy NASA API to avoid browser CORS during local development
      '/nasa': {
        target: 'https://api.nasa.gov',
        changeOrigin: true,
        secure: true,
        rewrite: (p) => p.replace(/^\/nasa/, '')
      },
      // Proxy NASA Images API to avoid CORS in dev
      '/nasa-img': {
        target: 'https://images-api.nasa.gov',
        changeOrigin: true,
        secure: true,
        rewrite: (p) => p.replace(/^\/nasa-img/, '')
      }
    }
  }
});
