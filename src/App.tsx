
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/context/AuthContext';

import Home from '@/pages/home/index';
import Dashboard from '@/pages/dashboard/index';
import Training from '@/pages/training/index';
import AnalyticsPage from '@/pages/analytics/index';
import LMSPage from '@/pages/lms/index';
import AssessmentsPage from '@/pages/assessments/index';
import ThoughtLeadershipPage from '@/pages/thought-leadership/index';
import CommunityLeadershipPage from '@/pages/community-leadership/index';
import SummerCampsPage from '@/pages/summer-camps/index';
import SchoolProgramsPage from '@/pages/school-programs/index';
import ScholarshipsPage from '@/pages/scholarships/index';
import YouthDevelopmentPage from '@/pages/youth-development/index';
import UniversityProgramsPage from '@/pages/university-programs/index';
import DigitalSkillsPage from '@/pages/digital-skills/index';
import CareerJourneyPage from '@/pages/career-journey/index';
import CareerAdvisoryPage from '@/pages/career-advisory/index';
import IndustryExplorationPage from '@/pages/industry-exploration/index';
import InternshipsPage from '@/pages/internships/index';
import NationalServicePage from '@/pages/national-service/index';
import GraduateProgramsPage from '@/pages/graduate-programs/index';
import ResumeBuilderPage from '@/pages/resume-builder/index';
import PortfolioPage from '@/pages/portfolio/index';
import InterviewPreparationPage from '@/pages/interview-preparation/index';
import JobMatchingPage from '@/pages/job-matching/index';
import SkillsMarketplacePage from '@/pages/skills-marketplace/index';
import ProfessionalCertificationsPage from '@/pages/professional-certifications/index';
import LeadershipPage from '@/pages/leadership/index';
import BlockchainCredentialsPage from '@/pages/blockchain-credentials/index';
import MentorshipPage from '@/pages/mentorship/index';
import CommunitiesPage from '@/pages/communities/index';
import NetworkingPage from '@/pages/networking/index';
import CareerTransitionPage from '@/pages/career-transition/index';
import BusinessDevelopmentPage from '@/pages/business-development/index';
import StartupPage from '@/pages/startup/index';
import InnovationPage from '@/pages/innovation/index';
import BecomeMentorPage from '@/pages/become-mentor/index';
import SuccessStoriesPage from '@/pages/success-stories/index';
import AdvisoryPositionsPage from '@/pages/advisory-positions/index';
import FinancialPlanningPage from '@/pages/financial-planning';
import RetireeServicesPage from '@/pages/retiree/index';
import VolunteerProgramsPage from '@/pages/volunteer-programs/index';
import LegacyProjectsPage from '@/pages/legacy-projects/index';
import CareerPathComparisonPage from '@/pages/career-comparison/index';
import SalaryExplorerPage from '@/pages/salary-explorer/index';
import MentorMatchingPage from '@/pages/mentor-matching/index';

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
              <Route path="/retiree" element={<RetireeServicesPage />} />
              <Route path="/post-career" element={<RetireeServicesPage />} />
              <Route path="/retirement-benefits" element={<RetireeServicesPage />} />
              <Route path="/volunteer-programs" element={<VolunteerProgramsPage />} />
              <Route path="/legacy-projects" element={<LegacyProjectsPage />} />
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
