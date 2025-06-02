
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/context/AuthContext';
import { RoleProvider } from '@/context/RoleContext';
import { ThemeProvider } from '@/components/theme-provider';

// Pages
import HomePage from '@/pages/home';
import DashboardPage from '@/pages/dashboard';
import ProfilePage from '@/pages/profile';
import PortfolioPage from '@/pages/portfolio';
import ResumeBuilderPage from '@/pages/resume-builder';
import CareerJourneyPage from '@/pages/career-journey';
import SummerCampsPage from '@/pages/summer-camps';
import ScholarshipsPage from '@/pages/scholarships';
import InternshipsPage from '@/pages/internships';
import TrainingPage from '@/pages/training';
import LMSPage from '@/pages/lms';
import AssessmentsPage from '@/pages/assessments';
import CollaborativeAssessmentsPage from '@/pages/collaborative-assessments';
import CareerAdvisoryPage from '@/pages/career-advisory';
import JobMatchingPage from '@/pages/job-matching';
import CommunitiesPage from '@/pages/communities';
import MentorshipPage from '@/pages/mentorship';
import SkillsMarketplacePage from '@/pages/skills-marketplace';
import CredentialsPage from '@/pages/credentials';
import BlockchainCredentialsPage from '@/pages/blockchain-credentials';
import SuccessStoriesPage from '@/pages/success-stories';
import AnalyticsPage from '@/pages/analytics';
import DesignSystemPage from '@/pages/DesignSystem';
import SchoolProgramsPage from '@/pages/school-programs';
import YouthDevelopmentPage from '@/pages/youth-development';
import UniversityProgramsPage from '@/pages/university-programs';
import GraduateProgramsPage from '@/pages/graduate-programs';
import ProfessionalCertificationsPage from '@/pages/professional-certifications';
import DigitalSkillsPage from '@/pages/digital-skills';
import IndustryExplorationPage from '@/pages/industry-exploration';
import NationalServicePage from '@/pages/national-service';

import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="ehrdc-ui-theme">
        <AuthProvider>
          <RoleProvider>
            <Router>
              <div className="min-h-screen bg-background">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/portfolio" element={<PortfolioPage />} />
                  <Route path="/resume-builder" element={<ResumeBuilderPage />} />
                  <Route path="/career-journey" element={<CareerJourneyPage />} />
                  <Route path="/summer-camps" element={<SummerCampsPage />} />
                  <Route path="/school-programs" element={<SchoolProgramsPage />} />
                  <Route path="/youth-development" element={<YouthDevelopmentPage />} />
                  <Route path="/university-programs" element={<UniversityProgramsPage />} />
                  <Route path="/graduate-programs" element={<GraduateProgramsPage />} />
                  <Route path="/professional-certifications" element={<ProfessionalCertificationsPage />} />
                  <Route path="/digital-skills" element={<DigitalSkillsPage />} />
                  <Route path="/industry-exploration" element={<IndustryExplorationPage />} />
                  <Route path="/national-service" element={<NationalServicePage />} />
                  <Route path="/scholarships" element={<ScholarshipsPage />} />
                  <Route path="/internships" element={<InternshipsPage />} />
                  <Route path="/training" element={<TrainingPage />} />
                  <Route path="/lms" element={<LMSPage />} />
                  <Route path="/assessments" element={<AssessmentsPage />} />
                  <Route path="/collaborative-assessments" element={<CollaborativeAssessmentsPage />} />
                  <Route path="/career-advisory" element={<CareerAdvisoryPage />} />
                  <Route path="/job-matching" element={<JobMatchingPage />} />
                  <Route path="/communities" element={<CommunitiesPage />} />
                  <Route path="/mentorship" element={<MentorshipPage />} />
                  <Route path="/skills-marketplace" element={<SkillsMarketplacePage />} />
                  <Route path="/credentials" element={<CredentialsPage />} />
                  <Route path="/blockchain-credentials" element={<BlockchainCredentialsPage />} />
                  <Route path="/success-stories" element={<SuccessStoriesPage />} />
                  <Route path="/analytics" element={<AnalyticsPage />} />
                  <Route path="/design-system" element={<DesignSystemPage />} />
                  
                  {/* Redirect old paths */}
                  <Route path="/cv-builder" element={<Navigate to="/resume-builder" replace />} />
                  
                  {/* Catch all route */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
              <Toaster />
            </Router>
          </RoleProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
