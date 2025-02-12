import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom')
    }
  },
  server: {
    port: 3002,
    host: true,
    open: true
  },
  optimizeDeps: {
    include: ['jotai', 'react', 'react-dom']
  },
  build: {
    commonjsOptions: {
      include: [/jotai/],
    },
  },
}); 