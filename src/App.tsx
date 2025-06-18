
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RoleProvider } from './context/RoleContext';
import { PersonalizationProvider } from './context/PersonalizationContext';
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
      <RoleProvider>
        <PersonalizationProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </Router>
        </PersonalizationProvider>
      </RoleProvider>
    </ErrorBoundary>
  );
}

export default App;
