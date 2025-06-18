
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Layout from '@/components/layout/Layout';
import { useMobileDetection } from '@/hooks/use-mobile-detection';
import MobileLayout from '@/components/mobile/MobileLayout';

// Import pages
const HomePage = React.lazy(() => import('@/pages/Home'));

function App() {
  const { isMobile } = useMobileDetection();

  return (
    <Router>
      <div className="App">
        {isMobile ? (
          <MobileLayout>
            <Routes>
              <Route path="/" element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  <HomePage />
                </React.Suspense>
              } />
            </Routes>
          </MobileLayout>
        ) : (
          <Layout>
            <Routes>
              <Route path="/" element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  <HomePage />
                </React.Suspense>
              } />
            </Routes>
          </Layout>
        )}
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
