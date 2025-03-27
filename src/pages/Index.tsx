
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import ServiceCards from "@/components/home/ServiceCards";
import JourneyStages from "@/components/home/JourneyStages";
import PersonaSelector from "@/components/home/PersonaSelector";
import OnboardingWrapper from "@/components/onboarding/OnboardingWrapper";
import { toast } from "@/components/ui/use-toast";
import ErrorBoundary from "@/components/ui/error-boundary";

export default function Index() {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      // Check if user has completed onboarding
      const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding') === 'true';
      setHasSeenOnboarding(hasCompletedOnboarding);
      
      // If returning user already has a profile, get their data
      if (hasCompletedOnboarding) {
        const userProfile = localStorage.getItem('userProfile');
        if (userProfile) {
          console.log("Returning user profile:", JSON.parse(userProfile));
          // In a real app, you would use this to personalize the experience
        }
      }
    } catch (error) {
      console.error("Error initializing index page:", error);
      toast({
        title: "Error initializing",
        description: "There was a problem loading your profile. Some features may not work correctly.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleGetStartedClick = () => {
    try {
      setShowOnboarding(true);
    } catch (error) {
      console.error("Error showing onboarding:", error);
      toast({
        title: "Error",
        description: "There was a problem loading the onboarding flow. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Style for decorative elements inspired by UAE heritage
  const decorationStyle: React.CSSProperties = {
    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 40%, rgba(204,170,102,0.1) 100%)",
    pointerEvents: "none" as const,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-emirati-teal">Loading...</div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="relative">
        {/* Decorative element inspired by UAE desert patterns */}
        <div 
          className="absolute top-0 right-0 w-64 h-64 -z-10 opacity-30 pointer-events-none"
          style={decorationStyle}
        ></div>
        
        <ErrorBoundary fallback={
          <div className="p-4 border border-red-300 bg-red-50 rounded-md text-red-900">
            <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
            <p>We're sorry, but there was an error loading this section. Please try refreshing the page.</p>
          </div>
        }>
          {/* Hero section with get started button */}
          <div className="relative">
            <Hero />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-16">
              <button onClick={handleGetStartedClick} className="premium-button px-8 py-4 text-base">
                Get Started Today
              </button>
            </div>
          </div>
          
          {/* Our existing sections */}
          <JourneyStages />
          <PersonaSelector />
          <ServiceCards />
          
          {/* Call to Action Section */}
          <section className="section bg-emirati-navy text-white py-16 rounded-3xl my-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emirati-teal/20 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emirati-gold/20 rounded-full filter blur-3xl"></div>
            
            <div className="container mx-auto text-center relative z-10 px-6">
              <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6">
                Ready to Begin Your Emirati Journey?
              </h2>
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Join thousands of UAE citizens who have found success through our platform. 
                Your future career path starts here.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button 
                  onClick={handleGetStartedClick}
                  className="bg-white text-emirati-navy font-medium py-4 px-8 rounded-full shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  Start Your Journey
                </button>
                <Link 
                  to="/resume-builder"
                  className="bg-emirati-teal/20 hover:bg-emirati-teal/30 text-white font-medium py-4 px-8 rounded-full border border-emirati-teal/30 transition-all duration-300"
                >
                  Create Your Resume
                </Link>
              </div>
            </div>
          </section>
        </ErrorBoundary>
        
        {/* Decorative element inspired by UAE desert patterns */}
        <div 
          className="absolute bottom-0 left-0 w-64 h-64 -z-10 opacity-30 pointer-events-none"
          style={decorationStyle}
        ></div>
      </div>
      
      {showOnboarding && (
        <OnboardingWrapper hasCompletedOnboarding={hasSeenOnboarding} />
      )}
    </Layout>
  );
}
