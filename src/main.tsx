
import { createRoot } from 'react-dom/client'
import React from 'react'; // Add React import
import App from './App.tsx'
import './index.css'
import './lib/i18n' // Initialize i18n
import { AuthProvider } from './context/AuthContext'
import { QueryProvider } from './context/QueryContext'
import { ThemeProvider } from './components/theme-provider'; // Import ThemeProvider
import { LanguageProvider } from './context/LanguageContext' // Import LanguageProvider
import { initializePerformanceMonitoring } from './lib/performance'
import { initializeSentry } from './lib/sentry'

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
  // Register for background sync
  if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
    try {
      const registration = await navigator.serviceWorker.ready;
      console.log('Background sync is supported');
      
      // Register sync event for offline data
      window.addEventListener('online', () => {
        registration.sync.register('sync-offline-data');
      });
    } catch (error) {
      console.error('Background sync registration failed:', error);
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

// Ensure we have a root element
const rootElement = document.getElementById("root");
if (!rootElement) {
  // If root element is missing, create one
  const newRoot = document.createElement("div");
  newRoot.id = "root";
  document.body.appendChild(newRoot);
  console.warn("Root element was missing and has been created dynamically");
}

const root = document.getElementById("root");
createRoot(root!).render(
  <React.StrictMode>
    <LanguageProvider>
      <ThemeProvider defaultTheme="light">
        <AuthProvider>
          <QueryProvider>
            <App />
          </QueryProvider>
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  </React.StrictMode>
);

// Initialize PWA features after app loads
initializePWAFeatures();

console.log("Main rendering complete with PWA features initialized");
