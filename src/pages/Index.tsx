
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import JourneyStages from '@/components/home/JourneyStages';
import PersonaSelector from '@/components/home/PersonaSelector';
import ServiceCards from '@/components/home/ServiceCards';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <JourneyStages />
      <PersonaSelector />
      <ServiceCards />
      
      {/* CTA Section */}
      <section className="section bg-emirati-navy text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-display font-semibold mb-8">Ready to Begin Your Journey?</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of Emiratis transforming their careers through our comprehensive platform.
          </p>
          <Link to="/resume-builder" className="inline-block bg-white text-emirati-navy hover:bg-emirati-gold hover:text-white transition-colors duration-300 font-medium py-4 px-8 rounded-full text-lg shadow-lg">
            Get Started Today
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
