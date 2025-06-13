import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { RoleProvider } from '@/context/RoleContext';
import { QueryProvider } from '@/context/QueryContext';
import { SkipNavigation } from '@/components/accessibility/SkipNavigation';

// Lazy-loaded page components
const HomePage = React.lazy(() => import('@/pages/home'));
const DashboardPage = React.lazy(() => import('@/pages/dashboard'));
const ProfilePage = React.lazy(() => import('@/pages/profile'));
const AuthPage = React.lazy(() => import('@/pages/auth'));
const NationalServicePage = React.lazy(() => import('@/pages/national-service'));
const YouthDevelopmentPage = React.lazy(() => import('@/pages/youth-development'));
const ProfessionalCertificationsPage = React.lazy(() => import('@/pages/professional-certifications'));
const DigitalSkillsDevelopmentPage = React.lazy(() => import('@/pages/digital-skills-development'));
const AssessmentsPage = React.lazy(() => import('@/pages/assessments'));
const SummerCampsPage = React.lazy(() => import('@/pages/summer-camps'));
const SchoolProgramsPage = React.lazy(() => import('@/pages/school-programs'));
const ScholarshipsPage = React.lazy(() => import('@/pages/scholarships'));
const MentorMatchingPage = React.lazy(() => import('@/pages/mentor-matching'));
const InternshipsPage = React.lazy(() => import('@/pages/internships'));
const BlockchainCredentialsPage = React.lazy(() => import('@/pages/blockchain-credentials'));
const CommunitiesPage = React.lazy(() => import('@/pages/communities'));
const MentorshipPage = React.lazy(() => import('@/pages/mentorship'));
const ShareSuccessStoriesPage = React.lazy(() => import('@/pages/share-success-stories'));
const UserRolesAdminPage = React.lazy(() => import('@/pages/admin/user-roles'));
const ContentManagementPage = React.lazy(() => import('@/pages/admin/content-management'));
const NotificationsPage = React.lazy(() => import('@/pages/notifications'));
const LMSPage = React.lazy(() => import('@/pages/lms'));
const TrainingPage = React.lazy(() => import('@/pages/training'));
const UniversityProgramsPage = React.lazy(() => import('@/pages/university-programs'));
const CareerJourneyPage = React.lazy(() => import('@/pages/career-journey'));
const CareerAdvisoryPage = React.lazy(() => import('@/pages/career-advisory'));
const IndustryExplorationPage = React.lazy(() => import('@/pages/industry-exploration'));
const GraduateProgramsPage = React.lazy(() => import('@/pages/graduate-programs'));
const ResumeBuilderPage = React.lazy(() => import('@/pages/resume-builder'));
const PortfolioPage = React.lazy(() => import('@/pages/portfolio'));
const InterviewPreparationPage = React.lazy(() => import('@/pages/interview-preparation'));
const JobMatchingPage = React.lazy(() => import('@/pages/job-matching'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ehrdc-teal mx-auto mb-4"></div>
      <p className="text-muted-foreground">Loading page...</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <QueryProvider>
        <AuthProvider>
          <RoleProvider>
            <div className="min-h-screen bg-background font-sans antialiased">
              <SkipNavigation />
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/notifications" element={<NotificationsPage />} />
                  <Route path="/national-service" element={<NationalServicePage />} />
                  <Route path="/youth-development" element={<YouthDevelopmentPage />} />
                  <Route path="/professional-certifications" element={<ProfessionalCertificationsPage />} />
                  <Route path="/digital-skills-development" element={<DigitalSkillsDevelopmentPage />} />
                  <Route path="/assessments" element={<AssessmentsPage />} />
                  <Route path="/blockchain-credentials" element={<BlockchainCredentialsPage />} />
                  <Route path="/communities" element={<CommunitiesPage />} />
                  <Route path="/mentorship" element={<MentorshipPage />} />
                  <Route path="/share-success-stories" element={<ShareSuccessStoriesPage />} />
                  {/* Redirect for old URL */}
                  <Route path="/success-stories" element={<Navigate to="/share-success-stories" replace />} />
                  
                  {/* Admin Routes */}
                  <Route path="/admin/user-roles" element={<UserRolesAdminPage />} />
                  <Route path="/admin/content-management" element={<ContentManagementPage />} />
                  
                  {/* Education Pathway routes */}
                  <Route path="/summer-camps" element={<SummerCampsPage />} />
                  <Route path="/school-programs" element={<SchoolProgramsPage />} />
                  <Route path="/scholarships" element={<ScholarshipsPage />} />
                  <Route path="/university-programs" element={<UniversityProgramsPage />} />
                  <Route path="/graduate-programs" element={<GraduateProgramsPage />} />
                  <Route path="/lms" element={<LMSPage />} />
                  <Route path="/training" element={<TrainingPage />} />
                  
                  {/* Career Entry routes */}
                  <Route path="/career-journey" element={<CareerJourneyPage />} />
                  <Route path="/career-advisory" element={<CareerAdvisoryPage />} />
                  <Route path="/industry-exploration" element={<IndustryExplorationPage />} />
                  <Route path="/internships" element={<InternshipsPage />} />
                  <Route path="/resume-builder" element={<ResumeBuilderPage />} />
                  <Route path="/portfolio" element={<PortfolioPage />} />
                  <Route path="/interview-preparation" element={<InterviewPreparationPage />} />
                  <Route path="/job-matching" element={<JobMatchingPage />} />
                  <Route path="/career-comparison" element={<CareerComparisonPage />} />
                  <Route path="/salary-explorer" element={<div className="p-8"><h1 className="text-2xl font-bold">Salary Explorer - Coming Soon</h1></div>} />
                  <Route path="/mentor-matching" element={<MentorMatchingPage />} />
                </Routes>
              </Suspense>
            </div>
          </RoleProvider>
        </AuthProvider>
      </QueryProvider>
    </Router>
  );
}

export default App;
