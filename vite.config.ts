import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode } ) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'es2015',
    minify: 'esbuild',
    cssCodeSplit: true,
    sourcemap: mode === 'development',
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          if (id.includes('react') || id.includes('react-dom')) {
            return 'vendor';
          }
          if (id.includes('@radix-ui') || id.includes('radix-ui')) {
            return 'ui';
          }
          if (id.includes('date-fns') || id.includes('clsx') || 
              id.includes('class-variance-authority') || id.includes('tailwind-merge')) {
            return 'utils';
          }
          if (id.includes('@supabase/supabase-js')) {
            return 'supabase';
          }
          if (id.includes('recharts') || id.includes('lucide-react')) {
            return 'charts';
          }
          if (id.includes('react-hook-form') || id.includes('@hookform/resolvers')) {
            return 'forms';
          }
          if (id.includes('react-i18next') || id.includes('i18next')) {
            return 'i18n';
          }
          return undefined;
        },
      },
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        unknownGlobalSideEffects: false
      }
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      '@supabase/supabase-js',
      'date-fns',
      'clsx',
      'lucide-react'
    ],
  },
  esbuild: {
    drop: mode === 'production' ? ['console', 'debugger'] : [],
    loader: 'tsx',
    include: /\.(js|jsx|ts|tsx)$/,
    target: 'es2020',
  },
  css: {
    devSourcemap: mode === 'development',
  }
}));