import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryProvider } from './context/QueryContext';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'sonner';

// Conditional imports - only import if they exist
let ErrorBoundary: React.ComponentType<any> = ({ children }: { children: React.ReactNode }) => <>{children}</>;
let RoleProvider: React.ComponentType<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;

// DO NOT LOAD ACCESSIBILITY COMPONENTS TO AVOID CONFLICTS
// This prevents the "useAccessibility must be used within AccessibilityProvider" error
let AccessibilityProvider: React.ComponentType<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;

try {
  const errorBoundaryModule = require('./components/ui/error-boundary');
  ErrorBoundary = errorBoundaryModule.ErrorBoundary || errorBoundaryModule.default;
} catch (e) {
  // Will use passthrough until component is available
}

try {
  const roleModule = require('./context/RoleContext');
  RoleProvider = roleModule.RoleProvider || roleModule.default;
} catch (e) {
  // Try alternative path
  try {
    const roleModule2 = require('./context/RoleProvider');
    RoleProvider = roleModule2.RoleProvider || roleModule2.default;
  } catch (e2) {
    // Will use passthrough until component is available
  }
}

// Pages - Fixed import paths to match actual file structure
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import AuthPage from './pages/auth';
import CareerAdvisory from './pages/career-advisory';
import Training from './pages/training';
import Jobs from './pages/job-matching';
import Internships from './pages/internships';
import CareerJourney from './pages/career-journey';
import Portfolio from './pages/portfolio';
// FIXED: Correct import path for communities
import Communities from './pages/communities';
import Analytics from './pages/analytics/index';
import DigitalSkills from './pages/digital-skills';
// FIXED: Add proper import for digital-skills-development
import DigitalSkillsDevelopment from './pages/digital-skills-development';
import ProfessionalCertifications from './pages/professional-certifications';
import MentorshipPrograms from './pages/mentorship';
import GraduatePrograms from './pages/graduate-programs';
import LegacyProjects from './pages/legacy-projects';
import AdvisoryPositions from './pages/advisory-positions';
import CommunityLeadership from './pages/community-leadership';
import NationalService from './pages/national-service';
import IndustryExploration from './pages/industry-exploration';
import InterviewPreparation from './pages/interview-preparation';
import JobMatching from './pages/job-matching';
import CareerComparison from './pages/career-comparison';
import AssessmentsPage from './pages/assessments';
import CollaborativeAssessments from './pages/collaborative-assessments';
import CVBuilder from './pages/cv-builder';
import BecomeMentor from './pages/become-mentor';
import MentorMatching from './pages/mentor-matching';
import Blockchain from './pages/blockchain-credentials';
import LMS from './pages/lms';
import Settings from './pages/not-found'; // Placeholder - adjust if actual page exists
import Profile from './pages/profile';
import Admin from './pages/not-found'; // Placeholder - adjust if actual page exists
import SummerCamps from './pages/summer-camps';
import SchoolPrograms from './pages/school-programs';
import Scholarships from './pages/scholarships';
import UniversityPrograms from './pages/university-programs';
import CareerPlanningHubPage from './pages/career-planning-hub';
import ResumeBuilderPage from './pages/resume-builder';
import YouthDevelopment from './pages/youth-development';
import SuccessStoriesPage from './pages/success-stories';
// ✅ FIXED: Add proper import for share-success-stories page with translations
import ShareSuccessStoriesPage from './pages/share-success-stories';
import ThoughtLeadershipPage from './pages/thought-leadership';
import FinancialPlanningPage from './pages/financial-planning';
import RetireeServicesPage from './pages/retiree';
import MVPTestPage from './pages/mvp-test';

// Day 2 Enhancement: Conditional imports for new authentication pages
// These will be available after copying the new components
let LoginPage: React.ComponentType = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Login Page</h2>
      <p className="text-gray-600 mb-4">
        This page will be available after copying Day 2 authentication components.
      </p>
      <p className="text-sm text-gray-500">
        Follow the QUICK_COPY_COMMANDS.md guide to add authentication features.
      </p>
    </div>
  </div>
);

let RegisterPage: React.ComponentType = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Registration Page</h2>
      <p className="text-gray-600 mb-4">
        This page will be available after copying Day 2 authentication components.
      </p>
      <p className="text-sm text-gray-500">
        Follow the QUICK_COPY_COMMANDS.md guide to add authentication features.
      </p>
    </div>
  </div>
);

let AuthTestPage: React.ComponentType = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication Test Page</h2>
      <p className="text-gray-600 mb-4">
        This page will be available after copying Day 2 authentication components.
      </p>
      <p className="text-sm text-gray-500">
        Follow the QUICK_COPY_COMMANDS.md guide to add authentication features.
      </p>
    </div>
  </div>
);

// Try to import new auth pages if they exist
try {
  LoginPage = require('./pages/auth/login').default;
} catch (e) {
  // Will use placeholder until components are copied
}

try {
  RegisterPage = require('./pages/auth/register').default;
} catch (e) {
  // Will use placeholder until components are copied
}

try {
  AuthTestPage = require('./pages/auth-test').default;
} catch (e) {
  // Will use placeholder until components are copied
}

// Day 2 Enhancement: Conditional import for new auth context
let NewAuthProvider: React.ComponentType<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;

try {
  NewAuthProvider = require('./contexts/AuthContext').AuthProvider;
} catch (e) {
  // Will use passthrough until context is copied
}

// Simple Error Boundary fallback component
const SimpleErrorFallback: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
      <div className="text-red-500 text-6xl mb-4">⚠️</div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h2>
      <p className="text-gray-600 mb-6">
        We encountered an unexpected error. Please try refreshing the page.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Refresh Page
      </button>
    </div>
  </div>
);

// Skip to content component for accessibility
const SkipToContent: React.FC = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50 transition-all duration-200"
  >
    تخطي إلى المحتوى الرئيسي / Skip to main content
  </a>
);

const App: React.FC = () => {
  return (
    <ErrorBoundary fallback={<SimpleErrorFallback />}>
      {/* REMOVED AccessibilityProvider to prevent conflicts */}
      {/* Day 2 Enhancement: Add new auth provider alongside existing ones */}
      <NewAuthProvider>
        <QueryProvider>
          <AuthProvider>
            <RoleProvider>
              <div className="min-h-screen bg-gray-50">
                {/* Skip to content link for accessibility */}
                <SkipToContent />
                
                {/* REMOVED AccessibilityToolbar to prevent conflicts */}
                
                {/* Toast notifications */}
                <Toaster 
                  position="top-right" 
                  richColors 
                  closeButton
                  toastOptions={{
                    duration: 5000,
                    style: {
                      fontFamily: 'Inter, system-ui, sans-serif'
                    }
                  }}
                />
                
                <Router>
                  <main id="main-content" role="main" className="focus:outline-none">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/auth" element={<AuthPage />} />
                      {/* Day 2 Enhancement: Add new authentication routes */}
                      <Route path="/auth/login" element={<LoginPage />} />
                      <Route path="/auth/register" element={<RegisterPage />} />
                      <Route path="/auth-test" element={<AuthTestPage />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/career-advisory" element={<CareerAdvisory />} />
                      <Route path="/career-planning-hub" element={<CareerPlanningHubPage />} />
                      <Route path="/training" element={<Training />} />
                      <Route path="/jobs" element={<Jobs />} />
                      <Route path="/internships" element={<Internships />} />
                      <Route path="/career-journey" element={<CareerJourney />} />
                      <Route path="/portfolio" element={<Portfolio />} />
                      {/* FIXED: Correct component for communities route */}
                      <Route path="/communities" element={<Communities />} />
                      <Route path="/analytics" element={<Analytics />} />
                      <Route path="/digital-skills" element={<DigitalSkills />} />
                      {/* FIXED: Correct component for digital-skills-development route */}
                      <Route path="/digital-skills-development" element={<DigitalSkillsDevelopment />} />
                      <Route path="/professional-certifications" element={<ProfessionalCertifications />} />
                      <Route path="/mentorship" element={<MentorshipPrograms />} />
                      <Route path="/graduate-programs" element={<GraduatePrograms />} />
                      <Route path="/university-programs" element={<UniversityPrograms />} />
                      <Route path="/legacy-projects" element={<LegacyProjects />} />
                      <Route path="/advisory-positions" element={<AdvisoryPositions />} />
                      <Route path="/community-leadership" element={<CommunityLeadership />} />
                      <Route path="/national-service" element={<NationalService />} />
                      <Route path="/industry-exploration" element={<IndustryExploration />} />
                      <Route path="/interview-preparation" element={<InterviewPreparation />} />
                      <Route path="/job-matching" element={<JobMatching />} />
                      <Route path="/career-comparison" element={<CareerComparison />} />
                      <Route path="/assessments" element={<AssessmentsPage />} />
                      <Route path="/collaborative-assessments" element={<CollaborativeAssessments />} />
                      <Route path="/cv-builder" element={<CVBuilder />} />
                      <Route path="/resume-builder" element={<ResumeBuilderPage />} />
                      <Route path="/become-mentor" element={<BecomeMentor />} />
                      <Route path="/mentor-matching" element={<MentorMatching />} />
                      <Route path="/blockchain" element={<Blockchain />} />
                      <Route path="/blockchain-credentials" element={<Blockchain />} />
                      <Route path="/lms" element={<LMS />} />
                      <Route path="/summer-camps" element={<SummerCamps />} />
                      <Route path="/school-programs" element={<SchoolPrograms />} />
                      <Route path="/scholarships" element={<Scholarships />} />
                      <Route path="/youth-development" element={<YouthDevelopment />} />
                      {/* ✅ FIXED: Use the correct component with translation support */}
                      <Route path="/share-success-stories" element={<ShareSuccessStoriesPage />} />
                      <Route path="/success-stories" element={<SuccessStoriesPage />} />
                      <Route path="/thought-leadership" element={<ThoughtLeadershipPage />} />
                      <Route path="/financial-planning" element={<FinancialPlanningPage />} />
                      <Route path="/retiree" element={<RetireeServicesPage />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/admin" element={<Admin />} />
                      <Route path="/mvp-test" element={<MVPTestPage />} />
                    </Routes>
                  </main>
                </Router>
              </div>
            </RoleProvider>
          </AuthProvider>
        </QueryProvider>
      </NewAuthProvider>
    </ErrorBoundary>
  );
};

export default App;

