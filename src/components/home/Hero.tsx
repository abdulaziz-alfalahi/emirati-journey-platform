
import React, { useEffect, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  return (
    <section className="relative min-h-[80vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden pt-16 pb-12 md:pt-20 md:pb-16">
      {/* Background Pattern - Using a blue overlay similar to Dubai Police */}
      <div className="absolute inset-0 bg-gradient-to-r from-emirati-navy/90 to-emirati-navy/80 pointer-events-none"></div>
      <div className="absolute inset-0 opacity-10 bg-dot-pattern pointer-events-none"></div>
      
      {/* Main Content */}
      <div className="container px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className={`text-4xl md:text-6xl lg:text-7xl font-display font-semibold leading-tight mb-6 text-white transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Your <span className="text-emirati-gold">Gateway</span> to Emirati Career Development
          </h1>
          
          <p className={`text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            A unified platform supporting Emiratis through every stage of their professional development, connecting education, employment, and lifelong learning.
          </p>
          
          {/* Search bar - Similar to the Dubai Police portal */}
          <div className={`flex flex-col sm:flex-row justify-center gap-4 mb-10 transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative w-full max-w-xl mx-auto">
              <div className="flex items-center bg-white rounded-full overflow-hidden shadow-lg">
                <input 
                  type="text" 
                  placeholder="Search for services..." 
                  className="flex-grow py-4 px-6 focus:outline-none text-emirati-navy" 
                />
                <Button className="bg-emirati-teal hover:bg-emirati-teal/90 text-white rounded-full h-full px-6 py-4 mr-1">
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Quick access buttons - Similar to Dubai Police portal service buttons */}
          <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-3xl mx-auto transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {["Scholarships", "Internships", "Assessments", "Training"].map((service, index) => (
              <div key={service} className="bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 rounded-xl p-3 text-white cursor-pointer">
                <p className="font-medium">{service}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <a href="#services" className="flex flex-col items-center text-white/60 hover:text-emirati-gold transition-colors">
            <span className="text-sm mb-2">Discover More</span>
            <ChevronDown className="animate-bounce" />
          </a>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-emirati-gold/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-emirati-teal/10 rounded-full filter blur-3xl"></div>
    </section>
  );
};

export default Hero;
