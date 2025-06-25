
import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import HomeContent from '@/components/home/HomeContent';
import HomeGridSection from '@/components/home/HomeGridSection';
import { useAuth } from '@/context/AuthContext';

const HomePage: React.FC = () => {
  const { user, roles } = useAuth();
  
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
