import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

import './App.css'
import HomePage from './pages/home'
import NotFound from './pages/not-found'
import DashboardPage from './pages/dashboard'
import JobMatchingPage from './pages/job-matching'
import JobMatchingHomePage from './pages/job-matching/index'
import ResumeBuilderPage from './pages/resume-builder'
import ScholarshipsPage from './pages/scholarships'
import ProfilePage from './pages/profile'
import AuthPage from './pages/auth'
import ApiKeysPage from './pages/api-keys'
import OnboardingPage from './pages/onboarding'
import SummerCampsPage from './pages/summer-camps'
import InternshipsPage from './pages/internships'
import AssessmentsPage from './pages/assessments'
import CareerAdvisoryPage from './pages/career-advisory'
import ScheduleSessionPage from './pages/career-advisory/schedule'
import SessionDetailsPage from './pages/career-advisory/sessions/[id]'
import AdvisorPortfolioPage from './pages/career-advisory/advisors/[id]'
import InterviewsPage from './pages/career-advisory/interviews'
import ScheduleInterviewPage from './pages/career-advisory/interviews/schedule'
import PortfolioPage from './pages/portfolio'
import PortfolioViewPage from './pages/portfolio/[id]'
import AnalyticsPage from './pages/analytics'

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/job-matching" element={<JobMatchingPage />} />
            <Route path="/job-matching/index" element={<JobMatchingHomePage />} />
            <Route path="/resume-builder" element={<ResumeBuilderPage />} />
            <Route path="/scholarships" element={<ScholarshipsPage />} />
            <Route path="/internships" element={<InternshipsPage />} />
            <Route path="/assessments" element={<AssessmentsPage />} />
            <Route path="/career-advisory" element={<CareerAdvisoryPage />} />
            <Route path="/career-advisory/schedule" element={<ScheduleSessionPage />} />
            <Route path="/career-advisory/sessions/:id" element={<SessionDetailsPage />} />
            <Route path="/career-advisory/advisors/:id" element={<AdvisorPortfolioPage />} />
            <Route path="/career-advisory/interviews" element={<InterviewsPage />} />
            <Route path="/career-advisory/interviews/schedule" element={<ScheduleInterviewPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/portfolio/:id" element={<PortfolioViewPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/api-keys" element={<ApiKeysPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/summer-camps" element={<SummerCampsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
