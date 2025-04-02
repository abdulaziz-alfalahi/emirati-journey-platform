
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/home'
import NotFound from './pages/not-found'
import DashboardPage from './pages/dashboard'
import JobMatchingPage from './pages/job-matching'
import JobMatchingHomePage from './pages/job-matching/index'
import ResumeBuilderPage from './pages/resume-builder'
import ScholarshipsPage from './pages/scholarships'
import ProfilePage from './pages/profile'
import AuthPage from './pages/auth'
import ApiKeysPage from './pages/api-keys'
import OnboardingPage from './pages/onboarding'
import SummerCampsPage from './pages/summer-camps'
import InternshipsPage from './pages/internships'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/job-matching" element={<JobMatchingPage />} />
        <Route path="/job-matching/index" element={<JobMatchingHomePage />} />
        <Route path="/resume-builder" element={<ResumeBuilderPage />} />
        <Route path="/scholarships" element={<ScholarshipsPage />} />
        <Route path="/internships" element={<InternshipsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/api-keys" element={<ApiKeysPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/summer-camps" element={<SummerCampsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
