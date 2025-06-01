
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from '@/context/AuthContext';
import { CVProvider } from '@/context/CVContext';
import { ResumeProvider } from '@/context/ResumeContext';
import { RoleProvider } from '@/context/RoleContext';
import { ThemeProvider } from '@/context/ThemeContext';

// Pages
import Dashboard from '@/pages/dashboard/index';
import Auth from '@/pages/auth/index';
import CVBuilder from '@/pages/cv-builder/index';
import ResumeBuilder from '@/pages/resume-builder/index';
import JobMatching from '@/pages/job-matching/index';
import JobDescriptions from '@/pages/job-descriptions';
import JobDescriptionsList from '@/pages/job-descriptions/list';
import JobDescriptionDetails from '@/pages/job-descriptions/[id]';
import Matching from '@/pages/matching/index';
import MatchingDetails from '@/pages/matching/[id]';
import Training from '@/pages/training/index';
import TrainingMaterials from '@/pages/training-materials/index';
import Internships from '@/pages/internships/index';
import Scholarships from '@/pages/scholarships/index';
import SummerCamps from '@/pages/summer-camps/index';
import SuccessStories from '@/pages/success-stories/index';
import VirtualEvents from '@/pages/virtual-events/index';
import VirtualEventDetails from '@/pages/virtual-events/[id]';
import CommunitiesPage from '@/pages/communities';
import SkillsMarketplace from '@/pages/skills-marketplace/index';
import LMS from '@/pages/lms/index';
import Mentorship from '@/pages/mentorship/index';
import CareerJourney from '@/pages/career-journey/index';
import CareerAdvisory from '@/pages/career-advisory/index';
import CareerAdvisorySchedule from '@/pages/career-advisory/schedule';
import CareerAdvisoryInterviews from '@/pages/career-advisory/interviews/index';
import CareerAdvisoryInterviewsSchedule from '@/pages/career-advisory/interviews/schedule';
import AdvisorDetails from '@/pages/career-advisory/advisors/[id]';
import SessionDetails from '@/pages/career-advisory/sessions/[id]';
import Portfolio from '@/pages/portfolio/index';
import PortfolioDetails from '@/pages/portfolio/[id]';
import Profile from '@/pages/profile/index';
import Messages from '@/pages/messages';
import Assessments from '@/pages/assessments/index';
import CollaborativeAssessments from '@/pages/collaborative-assessments/index';
import CollaborativeAssessmentReports from '@/pages/collaborative-assessments/reports/[id]';
import Recruiter from '@/pages/recruiter/index';
import RecruiterMatching from '@/pages/recruiter/matching/[id]';
import Retiree from '@/pages/retiree/index';
import Analytics from '@/pages/analytics/index';
import ApiKeys from '@/pages/api-keys/index';
import BlockchainCredentials from '@/pages/blockchain-credentials/index';
import Credentials from '@/pages/credentials/index';
import Onboarding from '@/pages/onboarding/index';
import NotFound from '@/pages/not-found';
import TestForm from '@/pages/test-form';
import Home from '@/pages/home/index';
import MobileOffline from '@/pages/mobile-offline/index';
import NativeFeatures from '@/pages/native-features/index';
import CommunityAnalyticsPage from '@/pages/communities/analytics';
import DesignSystem from "@/pages/DesignSystem";

import './App.css';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <TooltipProvider>
          <AuthProvider>
            <RoleProvider>
              <CVProvider>
                <ResumeProvider>
                  <Router>
                    <div className="min-h-screen bg-background">
                      <Routes>
                        <Route path="/" element={<Navigate to="/home" replace />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/auth" element={<Auth />} />
                        <Route path="/cv-builder" element={<CVBuilder />} />
                        <Route path="/resume-builder" element={<ResumeBuilder />} />
                        <Route path="/job-matching" element={<JobMatching />} />
                        <Route path="/job-descriptions" element={<JobDescriptions />} />
                        <Route path="/job-descriptions/list" element={<JobDescriptionsList />} />
                        <Route path="/job-descriptions/:id" element={<JobDescriptionDetails />} />
                        <Route path="/matching" element={<Matching />} />
                        <Route path="/matching/:id" element={<MatchingDetails />} />
                        <Route path="/training" element={<Training />} />
                        <Route path="/training-materials" element={<TrainingMaterials />} />
                        <Route path="/internships" element={<Internships />} />
                        <Route path="/scholarships" element={<Scholarships />} />
                        <Route path="/summer-camps" element={<SummerCamps />} />
                        <Route path="/success-stories" element={<SuccessStories />} />
                        <Route path="/virtual-events" element={<VirtualEvents />} />
                        <Route path="/virtual-events/:id" element={<VirtualEventDetails />} />
                        <Route path="/communities" element={<CommunitiesPage />} />
                        <Route path="/communities/analytics" element={<CommunityAnalyticsPage />} />
                        <Route path="/skills-marketplace" element={<SkillsMarketplace />} />
                        <Route path="/lms" element={<LMS />} />
                        <Route path="/mentorship" element={<Mentorship />} />
                        <Route path="/career-journey" element={<CareerJourney />} />
                        <Route path="/career-advisory" element={<CareerAdvisory />} />
                        <Route path="/career-advisory/schedule" element={<CareerAdvisorySchedule />} />
                        <Route path="/career-advisory/interviews" element={<CareerAdvisoryInterviews />} />
                        <Route path="/career-advisory/interviews/schedule" element={<CareerAdvisoryInterviewsSchedule />} />
                        <Route path="/career-advisory/advisors/:id" element={<AdvisorDetails />} />
                        <Route path="/career-advisory/sessions/:id" element={<SessionDetails />} />
                        <Route path="/portfolio" element={<Portfolio />} />
                        <Route path="/portfolio/:id" element={<PortfolioDetails />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/messages" element={<Messages />} />
                        <Route path="/assessments" element={<Assessments />} />
                        <Route path="/collaborative-assessments" element={<CollaborativeAssessments />} />
                        <Route path="/collaborative-assessments/reports/:id" element={<CollaborativeAssessmentReports />} />
                        <Route path="/recruiter" element={<Recruiter />} />
                        <Route path="/recruiter/matching/:id" element={<RecruiterMatching />} />
                        <Route path="/retiree" element={<Retiree />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/api-keys" element={<ApiKeys />} />
                        <Route path="/blockchain-credentials" element={<BlockchainCredentials />} />
                        <Route path="/credentials" element={<Credentials />} />
                        <Route path="/onboarding" element={<Onboarding />} />
                        <Route path="/test-form" element={<TestForm />} />
                        <Route path="/mobile-offline" element={<MobileOffline />} />
                        <Route path="/native-features" element={<NativeFeatures />} />
                        <Route path="/design-system" element={<DesignSystem />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </div>
                    <Toaster />
                  </Router>
                </ResumeProvider>
              </CVProvider>
            </RoleProvider>
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
