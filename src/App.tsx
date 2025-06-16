
import React, { Suspense, startTransition } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { RoleProvider } from '@/context/RoleContext';
import { QueryProvider } from '@/context/QueryContext';
import { PhaseProvider } from '@/context/PhaseContext';
import { SkipNavigation } from '@/components/accessibility/SkipNavigation';
import { PersonalizationProvider } from '@/context/PersonalizationContext';
import BusinessIntelligencePage from '@/pages/business-intelligence';

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
const MessagesPage = React.lazy(() => import('@/pages/messages'));
const LMSPage = React.lazy(() => import('@/pages/lms'));
const TrainingPage = React.lazy(() => import('@/pages/training'));
const UniversityProgramsPage = React.lazy(() => import('@/pages/university-programs'));
const CareerJourneyPage = React.lazy(() => import('@/pages/career-journey'));
const CareerPlanningHubPage = React.lazy(() => import('@/pages/career-planning-hub'));
const CareerAdvisoryPage = React.lazy(() => import('@/pages/career-advisory'));
const IndustryExplorationPage = React.lazy(() => import('@/pages/industry-exploration'));
const GraduateProgramsPage = React.lazy(() => import('@/pages/graduate-programs'));
const ResumeBuilderPage = React.lazy(() => import('@/pages/resume-builder'));
const PortfolioPage = React.lazy(() => import('@/pages/portfolio'));
const InterviewPreparationPage = React.lazy(() => import('@/pages/interview-preparation'));
const JobMatchingPage = React.lazy(() => import('@/pages/job-matching'));
const CareerComparisonPage = React.lazy(() => import('@/pages/career-comparison'));
const SalaryExplorerPage = React.lazy(() => import('@/pages/salary-explorer'));
const FinancialPlanningPage = React.lazy(() => import('@/pages/financial-planning'));
const ThoughtLeadershipPage = React.lazy(() => import('@/pages/thought-leadership'));
const RetireeServicesPage = React.lazy(() => import('@/pages/retiree'));
const DesignSystemPage = React.lazy(() => import('@/pages/DesignSystem'));
const AnalyticsPage = React.lazy(() => import('@/pages/analytics'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ehrdc-teal mx-auto mb-4"></div>
      <p className="text-muted-foreground">Loading page...</p>
    </div>
  </div>
);

// Higher-order component to wrap routes with Suspense
const SuspenseRoute = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoadingFallback />}>
    {children}
  </Suspense>
);

function App() {
  return (
    <AuthProvider>
      <RoleProvider>
        <QueryProvider>
          <Router>
            <PhaseProvider>
              <PersonalizationProvider>
                <div className="min-h-screen bg-background">
                  <Routes>
                    <Route path="/" element={<SuspenseRoute><HomePage /></SuspenseRoute>} />
                    <Route path="/home" element={<SuspenseRoute><HomePage /></SuspenseRoute>} />
                    <Route path="/auth" element={<SuspenseRoute><AuthPage /></SuspenseRoute>} />
                    <Route path="/dashboard" element={<SuspenseRoute><DashboardPage /></SuspenseRoute>} />
                    <Route path="/profile" element={<SuspenseRoute><ProfilePage /></SuspenseRoute>} />
                    <Route path="/notifications" element={<SuspenseRoute><NotificationsPage /></SuspenseRoute>} />
                    <Route path="/messages" element={<SuspenseRoute><MessagesPage /></SuspenseRoute>} />
                    <Route path="/national-service" element={<SuspenseRoute><NationalServicePage /></SuspenseRoute>} />
                    <Route path="/youth-development" element={<SuspenseRoute><YouthDevelopmentPage /></SuspenseRoute>} />
                    <Route path="/professional-certifications" element={<SuspenseRoute><ProfessionalCertificationsPage /></SuspenseRoute>} />
                    <Route path="/digital-skills-development" element={<SuspenseRoute><DigitalSkillsDevelopmentPage /></SuspenseRoute>} />
                    <Route path="/assessments" element={<SuspenseRoute><AssessmentsPage /></SuspenseRoute>} />
                    <Route path="/blockchain-credentials" element={<SuspenseRoute><BlockchainCredentialsPage /></SuspenseRoute>} />
                    <Route path="/communities" element={<SuspenseRoute><CommunitiesPage /></SuspenseRoute>} />
                    <Route path="/mentorship" element={<SuspenseRoute><MentorshipPage /></SuspenseRoute>} />
                    <Route path="/share-success-stories" element={<SuspenseRoute><ShareSuccessStoriesPage /></SuspenseRoute>} />
                    {/* Redirect for old URL */}
                    <Route path="/success-stories" element={<Navigate to="/share-success-stories" replace />} />
                    
                    {/* Admin Routes */}
                    <Route path="/admin/user-roles" element={<SuspenseRoute><UserRolesAdminPage /></SuspenseRoute>} />
                    <Route path="/admin/content-management" element={<SuspenseRoute><ContentManagementPage /></SuspenseRoute>} />
                    
                    {/* Education Pathway routes */}
                    <Route path="/summer-camps" element={<SuspenseRoute><SummerCampsPage /></SuspenseRoute>} />
                    <Route path="/school-programs" element={<SuspenseRoute><SchoolProgramsPage /></SuspenseRoute>} />
                    <Route path="/scholarships" element={<SuspenseRoute><ScholarshipsPage /></SuspenseRoute>} />
                    <Route path="/university-programs" element={<SuspenseRoute><UniversityProgramsPage /></SuspenseRoute>} />
                    <Route path="/graduate-programs" element={<SuspenseRoute><GraduateProgramsPage /></SuspenseRoute>} />
                    <Route path="/lms" element={<SuspenseRoute><LMSPage /></SuspenseRoute>} />
                    <Route path="/training" element={<SuspenseRoute><TrainingPage /></SuspenseRoute>} />
                    
                    {/* Career Entry routes */}
                    <Route path="/career-planning-hub" element={<SuspenseRoute><CareerPlanningHubPage /></SuspenseRoute>} />
                    <Route path="/career-advisory" element={<SuspenseRoute><CareerAdvisoryPage /></SuspenseRoute>} />
                    <Route path="/industry-exploration" element={<SuspenseRoute><IndustryExplorationPage /></SuspenseRoute>} />
                    <Route path="/internships" element={<SuspenseRoute><InternshipsPage /></SuspenseRoute>} />
                    <Route path="/resume-builder" element={<SuspenseRoute><ResumeBuilderPage /></SuspenseRoute>} />
                    <Route path="/portfolio" element={<SuspenseRoute><PortfolioPage /></SuspenseRoute>} />
                    <Route path="/interview-preparation" element={<SuspenseRoute><InterviewPreparationPage /></SuspenseRoute>} />
                    <Route path="/job-matching" element={<SuspenseRoute><JobMatchingPage /></SuspenseRoute>} />
                    
                    {/* Legacy redirects to unified Career Planning Hub */}
                    <Route path="/career-journey" element={<Navigate to="/career-planning-hub" replace />} />
                    <Route path="/career-comparison" element={<Navigate to="/career-planning-hub" replace />} />
                    <Route path="/salary-explorer" element={<SuspenseRoute><SalaryExplorerPage /></SuspenseRoute>} />
                    <Route path="/financial-planning" element={<SuspenseRoute><FinancialPlanningPage /></SuspenseRoute>} />
                    <Route path="/thought-leadership" element={<SuspenseRoute><ThoughtLeadershipPage /></SuspenseRoute>} />
                    <Route path="/retiree" element={<SuspenseRoute><RetireeServicesPage /></SuspenseRoute>} />
                    <Route path="/mentor-matching" element={<SuspenseRoute><MentorMatchingPage /></SuspenseRoute>} />
                    <Route path="/design-system" element={<SuspenseRoute><DesignSystemPage /></SuspenseRoute>} />
                    <Route path="/analytics" element={<SuspenseRoute><AnalyticsPage /></SuspenseRoute>} />
                    <Route path="/business-intelligence" element={<BusinessIntelligencePage />} />
                  </Routes>
                </div>
              </PersonalizationProvider>
            </PhaseProvider>
          </Router>
        </QueryProvider>
      </RoleProvider>
    </AuthProvider>
  );
}

export default App;
