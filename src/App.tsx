
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { QueryProvider } from './context/QueryContext';
import { RoleProvider } from './context/RoleContext';
import { ErrorBoundary } from './components/ui/error-boundary';
import HomePage from './pages/home';
import AuthPage from './pages/auth';
import DashboardPage from './pages/dashboard';
import DigitalSkillsPage from './pages/digital-skills';
import ProfessionalCertificationsPage from './pages/professional-certifications';
import AnalyticsPage from './pages/analytics';

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
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/digital-skills" element={<DigitalSkillsPage />} />
                <Route path="/digital-skills-development" element={<DigitalSkillsPage />} />
                <Route path="/professional-certifications" element={<ProfessionalCertificationsPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
              </Routes>
            </RoleProvider>
          </Router>
        </QueryProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
