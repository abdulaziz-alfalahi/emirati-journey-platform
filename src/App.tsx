
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home';
import SummerCampsPage from './pages/summer-camps';
import ProfessionalGrowthPage from './pages/professional-growth';
import AnalyticsPage from './pages/analytics';
import BlockchainCredentialsPage from './pages/blockchain-credentials';
import SchoolProgramsPage from './pages/school-programs';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/summer-camps" element={<SummerCampsPage />} />
        <Route path="/professional-growth" element={<ProfessionalGrowthPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/blockchain-credentials" element={<BlockchainCredentialsPage />} />
        <Route path="/school-programs" element={<SchoolProgramsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
