import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from '@/components/ErrorBoundary';
import ErrorToastContainer from '@/components/ErrorToastContainer';
import { ErrorProvider } from '@/hooks/useErrorHandler';
import { AuthProvider } from '@/context/AuthContext';
import { QueryProvider } from '@/context/QueryContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import './App.css';

// Lazy load pages for better performance
const HomePage = lazy(() => import('@/pages/home/index'));
const DashboardPage = lazy(() => import('@/pages/dashboard/index'));
const AuthPage = lazy(() => import('@/pages/auth/index'));
const ProfilePage = lazy(() => import('@/pages/profile/index'));
const ResumeBuilderPage = lazy(() => import('@/pages/resume-builder/index'));
const JobMatchingPage = lazy(() => import('@/pages/job-matching/index'));
const TrainingPage = lazy(() => import('@/pages/training/index'));
const AssessmentsPage = lazy(() => import('@/pages/assessments/index'));
const MentorshipPage = lazy(() => import('@/pages/mentorship/index'));
const CommunitiesPage = lazy(() => import('@/pages/communities/index'));
const AnalyticsPage = lazy(() => import('@/pages/analytics/index'));

// Lifelong Engagement Pages
const NationalServicePage = lazy(() => import('@/pages/national-service/index'));
const ThoughtLeadershipPage = lazy(() => import('@/pages/thought-leadership/index'));
const ShareSuccessStoriesPage = lazy(() => import('@/pages/share-success-stories/index'));
const RetireePage = lazy(() => import('@/pages/retiree/index'));
const YouthDevelopmentPage = lazy(() => import('@/pages/youth-development/index'));

// Career Entry Pages
const InternshipsPage = lazy(() => import('@/pages/internships/index'));
const UniversityProgramsPage = lazy(() => import('@/pages/university-programs/index'));
const GraduateProgramsPage = lazy(() => import('@/pages/graduate-programs/index'));
const ScholarshipsPage = lazy(() => import('@/pages/scholarships/index'));
const SummerCampsPage = lazy(() => import('@/pages/summer-camps/index'));
const SchoolProgramsPage = lazy(() => import('@/pages/school-programs/index'));

// Professional Growth Pages
const CareerAdvisoryPage = lazy(() => import('@/pages/career-advisory/index'));
const DigitalSkillsPage = lazy(() => import('@/pages/digital-skills/index'));
const ProfessionalCertificationsPage = lazy(() => import('@/pages/professional-certifications/index'));
const LMSPage = lazy(() => import('@/pages/lms/index'));
const NetworkingPage = lazy(() => import('@/pages/networking/index'));

// Other Pages
const NotFoundPage = lazy(() => import('@/pages/NotFound'));

// Error fallback component
const ErrorFallback = ({ error }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <button 
        onClick={() => window.location.reload()} 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Reload Page
      </button>
    </div>
  </div>
);

// Main App component with proper routing
function App() {
  return (
    <ErrorProvider>
      <AuthProvider>
        <QueryProvider>
          <Router>
            <ErrorBoundary fallback={ErrorFallback}>
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  {/* Home route */}
                  <Route path="/" element={<HomePage />} />
                  
                  {/* Authentication */}
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/auth/login" element={<AuthPage />} />
                  <Route path="/auth/register" element={<AuthPage />} />
                  
                  {/* Main dashboard */}
                  <Route path="/dashboard" element={<DashboardPage />} />
                  
                  {/* Core features */}
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/resume-builder" element={<ResumeBuilderPage />} />
                  <Route path="/job-matching" element={<JobMatchingPage />} />
                  <Route path="/training" element={<TrainingPage />} />
                  <Route path="/assessments" element={<AssessmentsPage />} />
                  <Route path="/mentorship" element={<MentorshipPage />} />
                  <Route path="/communities" element={<CommunitiesPage />} />
                  <Route path="/analytics" element={<AnalyticsPage />} />
                  
                  {/* Career Entry Phase */}
                  <Route path="/internships" element={<InternshipsPage />} />
                  <Route path="/university-programs" element={<UniversityProgramsPage />} />
                  <Route path="/graduate-programs" element={<GraduateProgramsPage />} />
                  <Route path="/scholarships" element={<ScholarshipsPage />} />
                  <Route path="/summer-camps" element={<SummerCampsPage />} />
                  <Route path="/school-programs" element={<SchoolProgramsPage />} />
                  
                  {/* Professional Growth Phase */}
                  <Route path="/career-advisory" element={<CareerAdvisoryPage />} />
                  <Route path="/digital-skills" element={<DigitalSkillsPage />} />
                  <Route path="/professional-certifications" element={<ProfessionalCertificationsPage />} />
                  <Route path="/lms" element={<LMSPage />} />
                  <Route path="/networking" element={<NetworkingPage />} />
                  
                  {/* Lifelong Engagement Phase */}
                  <Route path="/national-service" element={<NationalServicePage />} />
                  <Route path="/thought-leadership" element={<ThoughtLeadershipPage />} />
                  <Route path="/share-success-stories" element={<ShareSuccessStoriesPage />} />
                  <Route path="/retiree" element={<RetireePage />} />
                  <Route path="/youth-development" element={<YouthDevelopmentPage />} />
                  
                  {/* 404 page */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
              <ErrorToastContainer />
            </ErrorBoundary>
          </Router>
        </QueryProvider>
      </AuthProvider>
    </ErrorProvider>
  );
}

export default App;
