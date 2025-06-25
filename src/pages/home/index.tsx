
import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import HomeContent from '@/components/home/HomeContent';
import HomeGridSection from '@/components/home/HomeGridSection';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';

const HomePage: React.FC = () => {
  const { user, roles } = useAuth();
  const { ready } = useTranslation();
  
  // Wait for i18n to be ready before rendering
  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }
  
  // Check if user is a student based on role or email
  const isStudent = roles.includes('school_student') || 
                    (user?.email && user.email.includes('student'));

  return (
    <Layout>
      <Hero />
      <HomeContent />
      <HomeGridSection />
    </Layout>
  );
};

export default HomePage;
