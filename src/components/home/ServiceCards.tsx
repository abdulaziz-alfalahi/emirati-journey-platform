
import React, { useState, useEffect } from 'react';
import { FileText, Search, BookOpen, Users, Bell, Globe, Smartphone, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const services: Service[] = [
  {
    id: 'resume',
    title: 'Resume Builder',
    description: 'Create professional bilingual resumes with UAE-specific templates designed for different career stages.',
    icon: <FileText size={24} />
  },
  {
    id: 'job-matching',
    title: 'AI Job Matching',
    description: 'Find opportunities matching your skills, preferences, and career goals with advanced AI-powered search.',
    icon: <Search size={24} />
  },
  {
    id: 'training',
    title: 'Training Services',
    description: 'Access specialized training programs and upskilling opportunities aligned with industry demands.',
    icon: <BookOpen size={24} />
  },
  {
    id: 'mentorship',
    title: 'Mentorship Services',
    description: 'Connect with experienced professionals for guidance, support, and networking opportunities.',
    icon: <Users size={24} />
  },
  {
    id: 'notifications',
    title: 'Smart Notifications',
    description: 'Receive personalized alerts about relevant opportunities, events, and deadlines.',
    icon: <Bell size={24} />
  },
  {
    id: 'multilingual',
    title: 'Multi-Language Support',
    description: 'Access the platform in Arabic, English, and other languages common in the UAE.',
    icon: <Globe size={24} />
  },
  {
    id: 'mobile',
    title: 'Mobile Application',
    description: 'Stay connected on the go with our feature-rich mobile app and push notifications.',
    icon: <Smartphone size={24} />
  },
  {
    id: 'analytics',
    title: 'User Analytics',
    description: 'Track your progress, identify opportunities, and receive personalized recommendations.',
    icon: <Zap size={24} />
  }
];

const ServiceCards: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems((prev) => [...prev, index]);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );
    
    document.querySelectorAll('.service-card').forEach((card) => {
      observer.observe(card);
    });
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="services" className="section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-6 px-4 py-2 rounded-full bg-white shadow-subtle border border-gray-100">
            <p className="text-emirati-navy font-medium">Comprehensive Tools</p>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-semibold mb-6">Platform Services</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            The Emirati Journey platform offers a wide range of services designed to support
            UAE citizens throughout their career development.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div 
              key={service.id}
              className={cn(
                "service-card glass-card rounded-2xl p-6 border border-gray-100 transition-all duration-700 transform",
                visibleItems.includes(index) 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-12"
              )}
              style={{ 
                transitionDelay: `${(index % 3) * 100}ms`,
                backdropFilter: 'blur(10px)'
              }}
              data-index={index}
            >
              <div className="w-12 h-12 rounded-xl bg-emirati-teal/10 flex items-center justify-center text-emirati-teal mb-5">
                {service.icon}
              </div>
              <h3 className="text-xl font-display font-medium mb-3">{service.title}</h3>
              <p className="text-foreground/70 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button className="premium-button">
            Explore All Services
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;
