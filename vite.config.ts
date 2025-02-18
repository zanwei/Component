import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
  base: './',
  plugins: [
    react({
      jsxRuntime: 'automatic',
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-jsx']
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
    },
    dedupe: ['react', 'react-dom']
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
    esbuildOptions: {
      mainFields: ['module', 'main'],
      resolveExtensions: ['.js', '.jsx', '.ts', '.tsx']
    }
  },
  build: {
    modulePreload: true,
    target: 'esnext',
    minify: 'terser',
    cssCodeSplit: true,
    sourcemap: true,
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    },
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        format: 'es',
        entryFileNames: '[name].[hash].js',
        chunkFileNames: '[name].[hash].js',
        assetFileNames: '[name].[hash].[ext]',
        inlineDynamicImports: false,
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'react';
            }
            if (id.includes('jotai')) {
              return 'jotai';
            }
            return 'vendor';
          }
        }
      }
    }
  },
}); 