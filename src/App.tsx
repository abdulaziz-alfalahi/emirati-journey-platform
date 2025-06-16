
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { useAuth } from '@/context/AuthContext';

// Lazy load pages for better performance
const HomePage = React.lazy(() => import('@/pages/home/index'));
const DashboardPage = React.lazy(() => import('@/pages/dashboard/index'));
const AuthPage = React.lazy(() => import('@/pages/auth/index'));
const NotFoundPage = React.lazy(() => import('@/pages/NotFound'));

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <React.Suspense 
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </React.Suspense>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
