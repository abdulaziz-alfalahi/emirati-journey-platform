
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
              </Routes>
            </div>
          </RoleProvider>
        </AuthProvider>
      </QueryProvider>
    </Router>
  );
}

export default App;
