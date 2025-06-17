
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';

// Lazy load pages for better performance
const HomePage = React.lazy(() => import('@/pages/home/index'));
const DashboardPage = React.lazy(() => import('@/pages/dashboard/index'));
const AuthPage = React.lazy(() => import('@/pages/auth/index'));
const NotFoundPage = React.lazy(() => import('@/pages/not-found'));

// Education Pathway pages
const SummerCampsPage = React.lazy(() => import('@/pages/summer-camps/index'));
const SchoolProgramsPage = React.lazy(() => import('@/pages/school-programs/index'));
const LMSPage = React.lazy(() => import('@/pages/lms/index'));
const ScholarshipsPage = React.lazy(() => import('@/pages/scholarships/index'));
const UniversityProgramsPage = React.lazy(() => import('@/pages/university-programs/index'));
const GraduateProgramsPage = React.lazy(() => import('@/pages/graduate-programs/index'));

// Career Planning Hub page
const CareerPlanningHubPage = React.lazy(() => import('@/pages/career-planning-hub/index'));

// Industry Exploration page
const IndustryExplorationPage = React.lazy(() => import('@/pages/industry-exploration/index'));

// Job Matching page
const JobMatchingPage = React.lazy(() => import('@/pages/job-matching/index'));

// Resume Builder page
const ResumeBuilderPage = React.lazy(() => import('@/pages/resume-builder/index'));

// CV Builder page
const CVBuilderPage = React.lazy(() => import('@/pages/cv-builder/index'));

// Interview Preparation page
const InterviewPreparationPage = React.lazy(() => import('@/pages/interview-preparation/index'));

// Internships page
const InternshipsPage = React.lazy(() => import('@/pages/internships/index'));

// Business Development page
const BusinessDevelopmentPage = React.lazy(() => import('@/pages/business-development/index'));

// Lifelong Engagement pages
const RetireeServicesPage = React.lazy(() => import('@/pages/retiree/index'));
const CommunitiesPage = React.lazy(() => import('@/pages/communities/index'));
const CommunityLeadershipPage = React.lazy(() => import('@/pages/community-leadership/index'));
const LegacyProjectsPage = React.lazy(() => import('@/pages/legacy-projects/index'));
const VolunteerProgramsPage = React.lazy(() => import('@/pages/volunteer-programs/index'));
const CivicEngagementPage = React.lazy(() => import('@/pages/civic-engagement/index'));
const WisdomSharingPage = React.lazy(() => import('@/pages/wisdom-sharing/index'));
const IntergenerationalProgramsPage = React.lazy(() => import('@/pages/intergenerational-programs/index'));
const CulturalPreservationPage = React.lazy(() => import('@/pages/cultural-preservation/index'));
const NationalServicePage = React.lazy(() => import('@/pages/national-service/index'));

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Suspense 
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/auth" element={<AuthPage />} />
            
            {/* Education Pathway Routes */}
            <Route path="/summer-camps" element={<SummerCampsPage />} />
            <Route path="/school-programs" element={<SchoolProgramsPage />} />
            <Route path="/lms" element={<LMSPage />} />
            <Route path="/scholarships" element={<ScholarshipsPage />} />
            <Route path="/university-programs" element={<UniversityProgramsPage />} />
            <Route path="/graduate-programs" element={<GraduateProgramsPage />} />
            
            {/* Career Planning Hub Route */}
            <Route path="/career-planning-hub" element={<CareerPlanningHubPage />} />
            
            {/* Industry Exploration Route */}
            <Route path="/industry-exploration" element={<IndustryExplorationPage />} />
            
            {/* Job Matching Route */}
            <Route path="/job-matching" element={<JobMatchingPage />} />
            
            {/* Resume Builder Route */}
            <Route path="/resume-builder" element={<ResumeBuilderPage />} />
            
            {/* CV Builder Route */}
            <Route path="/cv-builder" element={<CVBuilderPage />} />
            
            {/* Interview Preparation Route */}
            <Route path="/interview-preparation" element={<InterviewPreparationPage />} />
            
            {/* Internships Route */}
            <Route path="/internships" element={<InternshipsPage />} />
            
            {/* Business Development Route */}
            <Route path="/business-development" element={<BusinessDevelopmentPage />} />
            
            {/* Lifelong Engagement Routes */}
            <Route path="/retiree" element={<RetireeServicesPage />} />
            <Route path="/communities" element={<CommunitiesPage />} />
            <Route path="/community-leadership" element={<CommunityLeadershipPage />} />
            <Route path="/legacy-projects" element={<LegacyProjectsPage />} />
            <Route path="/volunteer-programs" element={<VolunteerProgramsPage />} />
            <Route path="/civic-engagement" element={<CivicEngagementPage />} />
            <Route path="/wisdom-sharing" element={<WisdomSharingPage />} />
            <Route path="/intergenerational-programs" element={<IntergenerationalProgramsPage />} />
            <Route path="/cultural-preservation" element={<CulturalPreservationPage />} />
            <Route path="/national-service" element={<NationalServicePage />} />
            
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
