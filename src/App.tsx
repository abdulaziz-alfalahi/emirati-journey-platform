
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { QueryProvider } from './context/QueryProvider';
import { RoleProvider } from './context/RoleContext';
import { ErrorBoundary } from './components/ui/error-boundary';
import HomePage from './pages/home';
import AuthPage from './pages/auth';
import DashboardPage from './pages/dashboard';
import DigitalSkillsPage from './pages/digital-skills';
import ProfessionalCertificationsPage from './pages/professional-certifications';
import TrainingPage from './pages/training';
import AnalyticsPage from './pages/analytics';

// Education Pathway Pages
import SummerCampsPage from './pages/summer-camps';
import SchoolProgramsPage from './pages/school-programs';
import ScholarshipsPage from './pages/scholarships';
import UniversityProgramsPage from './pages/university-programs';
import LMSPage from './pages/lms';

// Career Entry Pages
import CareerPlanningHubPage from './pages/career-planning-hub';
import IndustryExplorationPage from './pages/industry-exploration';
import GraduateProgramsPage from './pages/graduate-programs';
import InternshipsPage from './pages/internships';
import JobMatchingPage from './pages/job-matching';
import CareerAdvisoryPage from './pages/career-advisory';
import ResumeBuilderPage from './pages/resume-builder';
import PortfolioPage from './pages/portfolio';
import InterviewPreparationPage from './pages/interview-preparation';

function App() {
  return (
    <ErrorBoundary
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-2">Something went wrong</h1>
            <p className="text-gray-600">Please refresh the page to try again.</p>
          </div>
        </div>
      }
    >
      <AuthProvider>
        <QueryProvider>
          <Router>
            <RoleProvider>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/digital-skills" element={<DigitalSkillsPage />} />
                <Route path="/digital-skills-development" element={<DigitalSkillsPage />} />
                <Route path="/professional-certifications" element={<ProfessionalCertificationsPage />} />
                <Route path="/training" element={<TrainingPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                
                {/* Education Pathway Routes */}
                <Route path="/summer-camps" element={<SummerCampsPage />} />
                <Route path="/school-programs" element={<SchoolProgramsPage />} />
                <Route path="/scholarships" element={<ScholarshipsPage />} />
                <Route path="/university-programs" element={<UniversityProgramsPage />} />
                <Route path="/lms" element={<LMSPage />} />
                
                {/* Career Entry Routes */}
                <Route path="/career-planning-hub" element={<CareerPlanningHubPage />} />
                <Route path="/industry-exploration" element={<IndustryExplorationPage />} />
                <Route path="/graduate-programs" element={<GraduateProgramsPage />} />
                <Route path="/internships" element={<InternshipsPage />} />
                <Route path="/job-matching" element={<JobMatchingPage />} />
                <Route path="/career-advisory" element={<CareerAdvisoryPage />} />
                <Route path="/resume-builder" element={<ResumeBuilderPage />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
                <Route path="/interview-preparation" element={<InterviewPreparationPage />} />
              </Routes>
            </RoleProvider>
          </Router>
        </QueryProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
