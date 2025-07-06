import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode } ) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // Removed componentTagger() since lovable-tagger is not installed
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'es2015',
    minify: 'esbuild', // Changed from 'terser' to 'esbuild' (built-in)
    
    // Optimize CSS
    cssCodeSplit: true,
    
    // Additional optimizations
    sourcemap: mode === 'development',
    
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          // Core React libraries
          if (id.includes('react') || id.includes('react-dom')) {
            return 'vendor';
          }
          
          // UI component libraries
          if (id.includes('@radix-ui') || id.includes('radix-ui')) {
            return 'ui';
          }
          
          // Utility libraries
          if (id.includes('date-fns') || id.includes('clsx') || 
              id.includes('class-variance-authority') || id.includes('tailwind-merge')) {
            return 'utils';
          }
          
          // Backend/API libraries
          if (id.includes('@supabase/supabase-js')) {
            return 'supabase';
          }
          
          // Charts and visualization
          if (id.includes('recharts') || id.includes('lucide-react')) {
            return 'charts';
          }
          
          // Form handling
          if (id.includes('react-hook-form') || id.includes('@hookform/resolvers')) {
            return 'forms';
          }
          
          // Internationalization
          if (id.includes('react-i18next') || id.includes('i18next')) {
            return 'i18n';
          }
          
          // PDF and document handling
          if (id.includes('jspdf') || id.includes('html2canvas') || 
              id.includes('@react-pdf/renderer')) {
            return 'pdf';
          }
          
          // Large feature modules (split by functionality)
          if (id.includes('cv-builder') || id.includes('CVBuilder')) {
            return 'cv-builder';
          }
          
          if (id.includes('job-search') || id.includes('JobSearch')) {
            return 'job-search';
          }
          
          if (id.includes('dashboard') && !id.includes('node_modules')) {
            return 'dashboard';
          }
          
          // EHRDC Phase 2B components
          if (id.includes('ehrdc') || id.includes('EHRDC')) {
            return 'ehrdc-components';
          }
          
          // Default: return undefined to let Vite handle automatically
          return undefined;
        },
      },
      
      // Tree shaking optimizations
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
    exclude: [
      // Exclude large libraries that should be loaded dynamically
      '@react-pdf/renderer'
    ]
  },
  
  // Performance optimizations
  esbuild: {
    // Remove console.log in production
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },
  
  // CSS optimizations
  css: {
    devSourcemap: mode === 'development',
  }
}));
