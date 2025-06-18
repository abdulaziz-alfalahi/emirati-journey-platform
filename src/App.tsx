
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { QueryProvider } from './context/QueryContext';
import { RoleProvider } from './context/RoleContext';
import { PhaseProvider } from './context/PhaseContext';
import { PersonalizationProvider } from './context/PersonalizationProvider';
import { ErrorBoundary } from './components/ui/error-boundary';
import Home from './pages/Home';
import Analytics from './pages/analytics';

function App() {
  return (
    <ErrorBoundary
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-2">Something went wrong</h1>
            <p className="text-gray-600">Please refresh the page to try again.</p>
          </div>
        </div>
      }
    >
      <AuthProvider>
        <QueryProvider>
          <Router>
            <RoleProvider>
              <PhaseProvider>
                <PersonalizationProvider>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/analytics" element={<Analytics />} />
                  </Routes>
                </PersonalizationProvider>
              </PhaseProvider>
            </RoleProvider>
          </Router>
        </QueryProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
