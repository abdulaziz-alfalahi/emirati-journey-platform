
import { createRoot } from 'react-dom/client'
import React from 'react'; // Add React import
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { QueryProvider } from './context/QueryContext'
import { ThemeProvider } from './components/theme-provider'; // Import ThemeProvider

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
    <ThemeProvider defaultTheme="light">
      <AuthProvider>
        <QueryProvider>
          <App />
        </QueryProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);

console.log("Main rendering complete");
