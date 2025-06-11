import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { QueryProvider } from '@/context/QueryContext';
import { AccessibilityToolbar } from '@/components/accessibility/AccessibilityToolbar';
import { SkipNavigation } from '@/components/accessibility/SkipNavigation';
import DashboardPage from '@/pages/dashboard';
import ProfilePage from '@/pages/profile';
import SettingsPage from '@/pages/settings';
import NationalServicePage from '@/pages/national-service';
import YouthDevelopmentPage from '@/pages/youth-development';
import ResumeUploaderPage from '@/pages/resume-uploader';
import TrainingCenterDashboard from '@/pages/training-center';
import ProfessionalCertificationsPage from '@/pages/professional-certifications';

function App() {
  return (
    <Router>
      <QueryProvider>
        <AuthProvider>
          <div className="min-h-screen bg-background font-sans antialiased">
            <AccessibilityToolbar />
            <SkipNavigation />
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/national-service" element={<NationalServicePage />} />
              <Route path="/youth-development" element={<YouthDevelopmentPage />} />
              <Route path="/resume-uploader" element={<ResumeUploaderPage />} />
              <Route path="/training-center/*" element={<TrainingCenterDashboard />} />
              <Route path="/professional-certifications" element={<ProfessionalCertificationsPage />} />
            </Routes>
          </div>
        </AuthProvider>
      </QueryProvider>
    </Router>
  );
}

export default App;
