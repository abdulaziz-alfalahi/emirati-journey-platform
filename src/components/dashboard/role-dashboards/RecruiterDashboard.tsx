
import React from 'react';
import { RecruiterDashboard } from './recruiter-dashboard';

interface RecruiterDashboardProps {
  activeTab: string;
}

export default function RecruiterDashboardWrapper({ activeTab }: RecruiterDashboardProps) {
  return <RecruiterDashboard activeTab={activeTab} />;
}
