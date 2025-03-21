
import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-emirati-sand bg-dot-pattern opacity-50 pointer-events-none"></div>
      
      {/* Main Content */}
      <div className="container px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 rounded-full bg-white/40 backdrop-blur-sm shadow-subtle border border-emirati-teal/10">
            <p className={`text-emirati-navy font-medium transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              The Complete Platform for Emirati Career Development
            </p>
          </div>
          
          <h1 className={`text-4xl md:text-6xl lg:text-7xl font-display font-semibold leading-tight mb-6 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Your <span className="text-emirati-teal">Lifelong</span> Journey from Education to Retirement
          </h1>
          
          <p className={`text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            A unified platform supporting Emiratis through every stage of their professional development, connecting education, employment, and lifelong learning.
          </p>
          
          <div className={`flex flex-col sm:flex-row justify-center gap-4 transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <button className="premium-button px-8 py-4 text-base">
              Explore Your Journey
            </button>
            <button className="bg-white/80 hover:bg-white text-emirati-navy font-medium py-4 px-8 rounded-full shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
              For Organizations
            </button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <a href="#journey" className="flex flex-col items-center text-foreground/60 hover:text-emirati-teal transition-colors">
            <span className="text-sm mb-2">Discover More</span>
            <ChevronDown className="animate-bounce" />
          </a>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-emirati-teal/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-emirati-gold/10 rounded-full filter blur-3xl"></div>
    </section>
  );
};

export default Hero;
