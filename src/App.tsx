import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/context/AuthContext';

import Home from '@/pages/Home';
import Dashboard from '@/pages/Dashboard';
import Training from '@/pages/Training';
import AnalyticsPage from '@/pages/Analytics';
import LMSPage from '@/pages/LMS';
import AssessmentsPage from '@/pages/Assessments';
import ThoughtLeadershipPage from '@/pages/thought-leadership';
import CommunityLeadershipPage from '@/pages/community-leadership';
import SummerCampsPage from '@/pages/SummerCamps';
import SchoolProgramsPage from '@/pages/SchoolPrograms';
import ScholarshipsPage from '@/pages/Scholarships';
import YouthDevelopmentPage from '@/pages/YouthDevelopment';
import UniversityProgramsPage from '@/pages/UniversityPrograms';
import DigitalSkillsPage from '@/pages/DigitalSkills';
import CareerJourneyPage from '@/pages/CareerJourney';
import CareerAdvisoryPage from '@/pages/CareerAdvisory';
import IndustryExplorationPage from '@/pages/IndustryExploration';
import InternshipsPage from '@/pages/Internships';
import NationalServicePage from '@/pages/NationalService';
import GraduateProgramsPage from '@/pages/GraduatePrograms';
import ResumeBuilderPage from '@/pages/ResumeBuilder';
import PortfolioPage from '@/pages/Portfolio';
import InterviewPreparationPage from '@/pages/InterviewPreparation';
import JobMatchingPage from '@/pages/JobMatching';
import SkillsMarketplacePage from '@/pages/SkillsMarketplace';
import ProfessionalCertificationsPage from '@/pages/ProfessionalCertifications';
import LeadershipPage from '@/pages/Leadership';
import BlockchainCredentialsPage from '@/pages/BlockchainCredentials';
import MentorshipPage from '@/pages/Mentorship';
import CommunitiesPage from '@/pages/Communities';
import NetworkingPage from '@/pages/Networking';
import CareerTransitionPage from '@/pages/CareerTransition';
import BusinessDevelopmentPage from '@/pages/BusinessDevelopment';
import StartupPage from '@/pages/Startup';
import InnovationPage from '@/pages/Innovation';
import BecomeMentorPage from '@/pages/BecomeMentor';
import SuccessStoriesPage from '@/pages/SuccessStories';
import AdvisoryPositionsPage from '@/pages/AdvisoryPositions';
import FinancialPlanningPage from '@/pages/FinancialPlanning';
import PostCareerOptionsPage from '@/pages/PostCareerOptions';
import RetirementBenefitsPage from '@/pages/RetirementBenefits';
import VolunteerProgramsPage from '@/pages/VolunteerPrograms';
import LegacyProjectsPage from '@/pages/LegacyProjects';
import AdminUsersPage from '@/pages/admin/Users';
import AdminSettingsPage from '@/pages/admin/Settings';
import CareerPathComparisonPage from '@/pages/CareerPathComparison';
import SalaryExplorerPage from '@/pages/SalaryExplorer';
import MentorMatchingPage from '@/pages/MentorMatching';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/training" element={<Training />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/lms" element={<LMSPage />} />
              <Route path="/assessments" element={<AssessmentsPage />} />
              <Route path="/thought-leadership" element={<ThoughtLeadershipPage />} />
              <Route path="/community-leadership" element={<CommunityLeadershipPage />} />
              <Route path="/summer-camps" element={<SummerCampsPage />} />
              <Route path="/school-programs" element={<SchoolProgramsPage />} />
              <Route path="/scholarships" element={<ScholarshipsPage />} />
              <Route path="/youth-development" element={<YouthDevelopmentPage />} />
              <Route path="/university-programs" element={<UniversityProgramsPage />} />
              <Route path="/digital-skills" element={<DigitalSkillsPage />} />
              <Route path="/career-journey" element={<CareerJourneyPage />} />
              <Route path="/career-advisory" element={<CareerAdvisoryPage />} />
              <Route path="/industry-exploration" element={<IndustryExplorationPage />} />
              <Route path="/internships" element={<InternshipsPage />} />
              <Route path="/national-service" element={<NationalServicePage />} />
              <Route path="/graduate-programs" element={<GraduateProgramsPage />} />
              <Route path="/resume-builder" element={<ResumeBuilderPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/interview-preparation" element={<InterviewPreparationPage />} />
              <Route path="/job-matching" element={<JobMatchingPage />} />
              <Route path="/skills-marketplace" element={<SkillsMarketplacePage />} />
              <Route path="/professional-certifications" element={<ProfessionalCertificationsPage />} />
              <Route path="/leadership" element={<LeadershipPage />} />
              <Route path="/blockchain-credentials" element={<BlockchainCredentialsPage />} />
              <Route path="/mentorship" element={<MentorshipPage />} />
              <Route path="/communities" element={<CommunitiesPage />} />
              <Route path="/networking" element={<NetworkingPage />} />
              <Route path="/career-transition" element={<CareerTransitionPage />} />
              <Route path="/business-development" element={<BusinessDevelopmentPage />} />
              <Route path="/startup" element={<StartupPage />} />
              <Route path="/innovation" element={<InnovationPage />} />
              <Route path="/become-mentor" element={<BecomeMentorPage />} />
              <Route path="/success-stories" element={<SuccessStoriesPage />} />
              <Route path="/advisory-positions" element={<AdvisoryPositionsPage />} />
              <Route path="/financial-planning" element={<FinancialPlanningPage />} />
              <Route path="/post-career" element={<PostCareerOptionsPage />} />
              <Route path="/retirement-benefits" element={<RetirementBenefitsPage />} />
              <Route path="/volunteer-programs" element={<VolunteerProgramsPage />} />
              <Route path="/legacy-projects" element={<LegacyProjectsPage />} />
              <Route path="/admin/users" element={<AdminUsersPage />} />
              <Route path="/admin/settings" element={<AdminSettingsPage />} />
              <Route path="/career-comparison" element={<CareerPathComparisonPage />} />
              <Route path="/salary-explorer" element={<SalaryExplorerPage />} />
              <Route path="/mentor-matching" element={<MentorMatchingPage />} />
            </Routes>
          </div>
          <Toaster />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
