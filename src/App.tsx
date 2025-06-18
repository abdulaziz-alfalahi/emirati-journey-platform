
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryProvider } from './context/QueryContext';
import { AuthProvider } from './context/AuthContext';
import { RoleProvider } from './context/RoleContext';
import { ErrorBoundary } from './components/ui/error-boundary';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CareerAdvisory from './pages/CareerAdvisory';
import Training from './pages/Training';
import Jobs from './pages/Jobs';
import Internships from './pages/Internships';
import CareerJourney from './pages/CareerJourney';
import Portfolio from './pages/Portfolio';
import Communities from './pages/Communities';
import Analytics from './pages/Analytics';
import DigitalSkills from './pages/DigitalSkills';
import ProfessionalCertifications from './pages/ProfessionalCertifications';
import MentorshipPrograms from './pages/mentorship';
import GraduatePrograms from './pages/GraduatePrograms';
import LegacyProjects from './pages/LegacyProjects';
import AdvisoryPositions from './pages/AdvisoryPositions';
import CommunityLeadership from './pages/CommunityLeadership';
import NationalService from './pages/NationalService';
import IndustryExploration from './pages/IndustryExploration';
import InterviewPreparation from './pages/InterviewPreparation';
import JobMatching from './pages/JobMatching';
import CareerComparison from './pages/CareerComparison';
import AssessmentsPage from './pages/Assessments';
import CollaborativeAssessments from './pages/CollaborativeAssessments';
import CVBuilder from './pages/CVBuilder';
import BecomeMentor from './pages/BecomeMentor';
import MentorMatching from './pages/MentorMatching';
import Blockchain from './pages/Blockchain';
import LMS from './pages/LMS';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Admin from './pages/Admin';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <QueryProvider>
          <RoleProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/career-advisory" element={<CareerAdvisory />} />
                <Route path="/training" element={<Training />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/internships" element={<Internships />} />
                <Route path="/career-journey" element={<CareerJourney />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/communities" element={<Communities />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/digital-skills" element={<DigitalSkills />} />
                <Route path="/professional-certifications" element={<ProfessionalCertifications />} />
                <Route path="/mentorship" element={<MentorshipPrograms />} />
                <Route path="/graduate-programs" element={<GraduatePrograms />} />
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
                <Route path="/become-mentor" element={<BecomeMentor />} />
                <Route path="/mentor-matching" element={<MentorMatching />} />
                <Route path="/blockchain" element={<Blockchain />} />
                <Route path="/lms" element={<LMS />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </Router>
          </RoleProvider>
        </QueryProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
