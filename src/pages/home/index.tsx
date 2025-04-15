
import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import ServiceCards from '@/components/home/ServiceCards';
import PersonaSelector from '@/components/home/PersonaSelector';
import JourneyStages from '@/components/home/JourneyStages';
import TrainingOpportunities from '@/components/home/TrainingOpportunities';
import InternshipsPreview from '@/components/home/InternshipsPreview';
import { useAuth } from '@/context/AuthContext';

const HomePage: React.FC = () => {
  const { user, roles } = useAuth();
  
  // Check if user is a student based on role or email
  const isStudent = roles.includes('school_student') || 
                    (user?.email && user.email.includes('student'));

  return (
    <Layout>
      <Hero />
      <div className="container mx-auto py-12 px-4 space-y-16">
        <ServiceCards />
        <JourneyStages />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {isStudent ? (
              <div className="space-y-12">
                <InternshipsPreview limit={3} />
                <TrainingOpportunities limit={3} />
              </div>
            ) : (
              <TrainingOpportunities limit={3} />
            )}
          </div>
          <div className="lg:col-span-1">
            <PersonaSelector />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
