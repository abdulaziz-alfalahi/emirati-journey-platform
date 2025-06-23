
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Initialize i18n first, before any React rendering
import './lib/i18n';
import i18n from './lib/i18n';

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

// Error fallback component
const ErrorFallback: React.FC<{ error: Error }> = ({ error }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <button 
        onClick={() => window.location.reload()} 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Reload Page
      </button>
    </div>
  </div>
);

// Create the App component with proper provider nesting and i18n initialization
const AppWithProviders: React.FC = () => {
  const [isI18nReady, setIsI18nReady] = React.useState(false);

  React.useEffect(() => {
    const initI18n = async () => {
      try {
        // Wait for i18n to be ready
        if (i18n.isInitialized) {
          setIsI18nReady(true);
        } else {
          await new Promise((resolve) => {
            const checkReady = () => {
              if (i18n.isInitialized) {
                setIsI18nReady(true);
                resolve(true);
              } else {
                setTimeout(checkReady, 50);
              }
            };
            checkReady();
          });
        }
      } catch (error) {
        console.error('Failed to initialize i18n:', error);
        setIsI18nReady(true); // Continue anyway
      }
    };

    initI18n();
  }, []);

  if (!isI18nReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <React.StrictMode>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <LanguageProvider defaultLanguage="en">
          <App />
        </LanguageProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
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

// Render with proper error boundaries and provider order
try {
  if (root) {
    createRoot(root).render(<AppWithProviders />);
  }

  // Initialize PWA features after app loads
  initializePWAFeatures();

  console.log("Main rendering complete with translation infrastructure and PWA features initialized");
} catch (error) {
  console.error("Failed to render app:", error);
  
  // Fallback error display
  if (root) {
    root.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: Arial, sans-serif;">
        <div style="text-align: center;">
          <h1 style="color: #ef4444; margin-bottom: 16px;">Application Error</h1>
          <p style="color: #6b7280;">Please refresh the page to try again.</p>
          <button onclick="window.location.reload()" style="margin-top: 16px; padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Reload
          </button>
        </div>
      </div>
    `;
  }
}
