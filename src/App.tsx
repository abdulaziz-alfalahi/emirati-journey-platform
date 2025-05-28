
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryProvider } from '@/context/QueryContext';
import { AuthProvider } from '@/context/AuthContext';
import { RoleProvider } from '@/context/RoleContext';
import { CVProvider } from '@/context/CVContext';
import { ResumeProvider } from '@/context/ResumeContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Toaster } from '@/components/ui/toaster';
import Index from '@/pages/Index';
import Dashboard from '@/pages/dashboard';
import Profile from '@/pages/profile';
import PortfolioPage from '@/pages/portfolio/index';
import PortfolioViewer from '@/pages/portfolio/[id]';
import ResumeBuilder from '@/pages/resume-builder';
import CareerJourney from '@/pages/career-journey';
import SummerCamps from '@/pages/summer-camps';
import Scholarships from '@/pages/scholarships';
import Internships from '@/pages/internships';
import TrainingPage from '@/pages/training';
import TrainingMaterials from '@/pages/training-materials';
import LMS from '@/pages/lms';
import Assessments from '@/pages/assessments';
import CollaborativeAssessments from '@/pages/collaborative-assessments';
import AssessmentReports from '@/pages/collaborative-assessments/reports/[id]';
import CareerAdvisory from '@/pages/career-advisory';
import AdvisorProfile from '@/pages/career-advisory/advisors/[id]';
import InterviewsList from '@/pages/career-advisory/interviews';
import ScheduleInterview from '@/pages/career-advisory/interviews/schedule';
import SessionDetails from '@/pages/career-advisory/sessions/[id]';
import JobMatching from '@/pages/job-matching';
import JobDescriptions from '@/pages/job-descriptions.jsx';
import JobDescriptionDetail from '@/pages/job-descriptions/[id].jsx';
import JobDescriptionsList from '@/pages/job-descriptions/list.jsx';
import MatchingDetail from '@/pages/matching/[id].jsx';
import RecruiterDashboard from '@/pages/recruiter';
import RecruiterMatching from '@/pages/recruiter/matching/[id]';
import MentorshipPage from '@/pages/mentorship';
import SkillsMarketplace from '@/pages/skills-marketplace';
import Credentials from '@/pages/credentials';
import BlockchainCredentials from '@/pages/blockchain-credentials';
import Analytics from '@/pages/analytics';
import OnboardingPage from '@/pages/onboarding';
import AuthPage from '@/pages/auth';
import ApiKeysPage from '@/pages/api-keys';
import TestFormPage from '@/pages/test-form';
import CVBuilder from '@/pages/cv-builder';
import Messages from '@/pages/messages';
import RetireePage from '@/pages/retiree';
import SuccessStoriesPage from '@/pages/success-stories';
import NotFound from '@/pages/NotFound';
import CommunitiesPage from '@/pages/communities';
import VirtualEventsPage from '@/pages/virtual-events';
import VirtualEventDetailPage from '@/pages/virtual-events/[id]';
import './App.css';

function App() {
  return (
    <QueryProvider>
      <ThemeProvider defaultTheme="system">
        <AuthProvider>
          <RoleProvider>
            <CVProvider>
              <ResumeProvider>
                <Router>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/portfolio" element={<PortfolioPage />} />
                    <Route path="/portfolio/:id" element={<PortfolioViewer />} />
                    <Route path="/resume-builder" element={<ResumeBuilder />} />
                    <Route path="/career-journey" element={<CareerJourney />} />
                    <Route path="/summer-camps" element={<SummerCamps />} />
                    <Route path="/scholarships" element={<Scholarships />} />
                    <Route path="/internships" element={<Internships />} />
                    <Route path="/training" element={<TrainingPage />} />
                    <Route path="/training-materials" element={<TrainingMaterials />} />
                    <Route path="/lms" element={<LMS />} />
                    <Route path="/assessments" element={<Assessments />} />
                    <Route path="/collaborative-assessments" element={<CollaborativeAssessments />} />
                    <Route path="/collaborative-assessments/reports/:id" element={<AssessmentReports />} />
                    <Route path="/career-advisory" element={<CareerAdvisory />} />
                    <Route path="/career-advisory/advisors/:id" element={<AdvisorProfile />} />
                    <Route path="/career-advisory/interviews" element={<InterviewsList />} />
                    <Route path="/career-advisory/interviews/schedule" element={<ScheduleInterview />} />
                    <Route path="/career-advisory/sessions/:id" element={<SessionDetails />} />
                    <Route path="/job-matching" element={<JobMatching />} />
                    <Route path="/job-descriptions" element={<JobDescriptions />} />
                    <Route path="/job-descriptions/[id]" element={<JobDescriptionDetail />} />
                    <Route path="/job-descriptions/list" element={<JobDescriptionsList />} />
                    <Route path="/matching/[id]" element={<MatchingDetail />} />
                    <Route path="/recruiter" element={<RecruiterDashboard />} />
                    <Route path="/recruiter/matching/:id" element={<RecruiterMatching />} />
                    <Route path="/mentorship" element={<MentorshipPage />} />
                    <Route path="/skills-marketplace" element={<SkillsMarketplace />} />
                    <Route path="/credentials" element={<Credentials />} />
                    <Route path="/blockchain-credentials" element={<BlockchainCredentials />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/success-stories" element={<SuccessStoriesPage />} />
                    <Route path="/onboarding" element={<OnboardingPage />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/api-keys" element={<ApiKeysPage />} />
                    <Route path="/test-form" element={<TestFormPage />} />
                    <Route path="/cv-builder" element={<CVBuilder />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/retiree" element={<RetireePage />} />
                    <Route path="/communities" element={<CommunitiesPage />} />
                    <Route path="/virtual-events" element={<VirtualEventsPage />} />
                    <Route path="/virtual-events/:id" element={<VirtualEventDetailPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <Toaster />
                </Router>
              </ResumeProvider>
            </CVProvider>
          </RoleProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}

export default App;
