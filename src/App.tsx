
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { RoleProvider } from '@/context/RoleContext';
import { QueryProvider } from '@/context/QueryContext';
import { SkipNavigation } from '@/components/accessibility/SkipNavigation';
import HomePage from '@/pages/home';
import DashboardPage from '@/pages/dashboard';
import ProfilePage from '@/pages/profile';
import NationalServicePage from '@/pages/national-service';
import YouthDevelopmentPage from '@/pages/youth-development';
import ProfessionalCertificationsPage from '@/pages/professional-certifications';
import DigitalSkillsDevelopmentPage from '@/pages/digital-skills-development';
import AssessmentsPage from '@/pages/assessments';
import SummerCampsPage from '@/pages/summer-camps';
import SchoolProgramsPage from '@/pages/school-programs';
import MentorMatchingPage from '@/pages/mentor-matching';
import InternshipsPage from '@/pages/internships';
import BlockchainCredentialsPage from '@/pages/blockchain-credentials';
import CommunitiesPage from '@/pages/communities';
import MentorshipPage from '@/pages/mentorship';
import ShareSuccessStoriesPage from '@/pages/share-success-stories';

function App() {
  return (
    <Router>
      <QueryProvider>
        <AuthProvider>
          <RoleProvider>
            <div className="min-h-screen bg-background font-sans antialiased">
              <SkipNavigation />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/profile" element={<ProfilePage />} />
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
                
                {/* Education Pathway routes */}
                <Route path="/summer-camps" element={<SummerCampsPage />} />
                <Route path="/school-programs" element={<SchoolProgramsPage />} />
                <Route path="/scholarships" element={<div className="p-8"><h1 className="text-2xl font-bold">Scholarships - Coming Soon</h1></div>} />
                <Route path="/lms" element={<div className="p-8"><h1 className="text-2xl font-bold">Learning Management System - Coming Soon</h1></div>} />
                <Route path="/training" element={<div className="p-8"><h1 className="text-2xl font-bold">Vocational Training - Coming Soon</h1></div>} />
                <Route path="/university-programs" element={<div className="p-8"><h1 className="text-2xl font-bold">University Programs - Coming Soon</h1></div>} />
                
                {/* Career Entry routes */}
                <Route path="/career-journey" element={<div className="p-8"><h1 className="text-2xl font-bold">Career Journey Map - Coming Soon</h1></div>} />
                <Route path="/career-advisory" element={<div className="p-8"><h1 className="text-2xl font-bold">Career Advisory - Coming Soon</h1></div>} />
                <Route path="/industry-exploration" element={<div className="p-8"><h1 className="text-2xl font-bold">Industry Exploration - Coming Soon</h1></div>} />
                <Route path="/internships" element={<InternshipsPage />} />
                <Route path="/graduate-programs" element={<div className="p-8"><h1 className="text-2xl font-bold">Graduate Programs - Coming Soon</h1></div>} />
                <Route path="/resume-builder" element={<div className="p-8"><h1 className="text-2xl font-bold">CV Builder - Coming Soon</h1></div>} />
                <Route path="/portfolio" element={<div className="p-8"><h1 className="text-2xl font-bold">Portfolio - Coming Soon</h1></div>} />
                <Route path="/interview-preparation" element={<div className="p-8"><h1 className="text-2xl font-bold">Interview Preparation - Coming Soon</h1></div>} />
                <Route path="/job-matching" element={<div className="p-8"><h1 className="text-2xl font-bold">Job Matching - Coming Soon</h1></div>} />
                <Route path="/career-comparison" element={<div className="p-8"><h1 className="text-2xl font-bold">Career Path Comparison - Coming Soon</h1></div>} />
                <Route path="/salary-explorer" element={<div className="p-8"><h1 className="text-2xl font-bold">Salary Explorer - Coming Soon</h1></div>} />
                <Route path="/mentor-matching" element={<MentorMatchingPage />} />
              </Routes>
            </div>
          </RoleProvider>
        </AuthProvider>
      </QueryProvider>
    </Router>
  );
}

export default App;
