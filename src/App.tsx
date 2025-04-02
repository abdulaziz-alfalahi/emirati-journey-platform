import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "@/components/theme-provider"
import { AuthContextProvider } from './context/AuthContext';
import { QueryProvider } from './context/QueryContext';
import { Toaster } from '@/components/ui/toaster';
import HomePage from './pages/home';
import AuthPage from './pages/auth';
import DashboardPage from './pages/dashboard';
import ProfilePage from './pages/profile';
import OnboardingPage from './pages/onboarding';
import ResumeBuilderPage from './pages/resume-builder';
import ApiKeysPage from './pages/api-keys';
import JobMatchingPage from './pages/job-matching';
import JobDescriptionsPage from './pages/job-descriptions';
import JobDescriptionsListPage from './pages/job-descriptions/list';
import MatchingPage from './pages/matching';
import NotFoundPage from './pages/not-found';

const App: React.FC = () => {
  
  return (
    <div className="app">
      <BrowserRouter>
        <QueryProvider>
          <AuthContextProvider>
            <ThemeProvider defaultTheme="light" storageKey="ui-theme">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/onboarding" element={<OnboardingPage />} />
                <Route path="/resume-builder" element={<ResumeBuilderPage />} />
                <Route path="/api-keys" element={<ApiKeysPage />} />
                <Route path="/job-matching" element={<JobMatchingPage />} />
                <Route path="/job-descriptions" element={<JobDescriptionsPage />} />
                <Route path="/job-descriptions/list" element={<JobDescriptionsListPage />} />
                <Route path="/job-descriptions/:id" element={<React.lazy(() => import('./pages/job-descriptions/[id].jsx'))} />
                <Route path="/matching" element={<MatchingPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
              <Toaster />
            </ThemeProvider>
          </AuthContextProvider>
        </QueryProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
