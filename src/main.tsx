
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import React from 'react';

// Ensure React is globally available FIRST
if (typeof window !== 'undefined') {
  (window as any).React = React;
}

import App from './App.tsx';
import './index.css';
import './lib/i18n'; // Initialize i18n
import { AuthProvider } from './context/AuthContext';
import { QueryProvider } from './context/QueryContext';
import { ThemeProvider } from './components/theme-provider';
import { LanguageProvider } from './context/LanguageContext';
import { initializePerformanceMonitoring } from './lib/performance';
import { initializeSentry } from './lib/sentry';

// Initialize monitoring in production
if (process.env.NODE_ENV === 'production') {
  initializeSentry();
}

// Initialize performance monitoring
initializePerformanceMonitoring({
  enableLogging: process.env.NODE_ENV === 'development',
  enableAnalytics: process.env.NODE_ENV === 'production',
});

// PWA Features Initialization
const initializePWAFeatures = async () => {
  // Register for background sync with proper type checking
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready;
      console.log('Service Worker is ready');
      
      // Check if Background Sync is supported with proper type checking
      if ('sync' in window.ServiceWorkerRegistration.prototype) {
        console.log('Background sync is supported');
        
        // Register sync event for offline data
        window.addEventListener('online', () => {
          // Use type assertion for the sync property
          (registration as any).sync?.register('sync-offline-data');
        });
      } else {
        console.log('Background sync is not supported');
      }
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }

  // Request notification permission
  if ('Notification' in window && Notification.permission === 'default') {
    try {
      const permission = await Notification.requestPermission();
      console.log('Notification permission:', permission);
    } catch (error) {
      console.error('Notification permission request failed:', error);
    }
  }

  // Initialize wake lock for important tasks
  if ('wakeLock' in navigator) {
    try {
      document.addEventListener('visibilitychange', async () => {
        if (!document.hidden) {
          // Request wake lock when app becomes visible
          console.log('Wake lock available');
        }
      });
    } catch (error) {
      console.error('Wake lock not available:', error);
    }
  }
};

// Get the root element and ensure it exists
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found. Make sure there is an element with id 'root' in your HTML.");
}

// Create and render the React app
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <LanguageProvider>
      <ThemeProvider defaultTheme="light">
        <AuthProvider>
          <QueryProvider>
            <App />
          </QueryProvider>
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  </StrictMode>
);

// Initialize PWA features after app loads
initializePWAFeatures();

console.log("Main rendering complete with PWA features initialized");
