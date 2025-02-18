import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
  base: './',
  plugins: [
    react({
      jsxRuntime: 'classic',
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-jsx', { runtime: 'classic' }]
        ]
      }
    }),
    svgr({
      svgrOptions: {
        icon: true,
        svgo: true,
        replaceAttrValues: { '#000': 'currentColor' },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'react': path.resolve(__dirname, './node_modules/react'),
      'jotai': path.resolve(__dirname, './node_modules/jotai')
    }
  },
  server: {
    port: 3002,
    host: true,
    open: true,
    hmr: {
      overlay: false
    }
  },
  optimizeDeps: {
    include: ['jotai', 'react', 'react-dom'],
    exclude: ['@heroicons/react/24/outline'],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    },
    rollupOptions: {
      external: ['react/jsx-runtime'],
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'jotai-vendor': ['jotai']
        }
      }
    }
  },
}); 