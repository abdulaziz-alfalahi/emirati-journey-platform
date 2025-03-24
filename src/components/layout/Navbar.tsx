import React, { useState, useEffect } from 'react';
import { Menu, X, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';
import UserMenu from './UserMenu';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled 
          ? "py-3 bg-white/80 backdrop-blur-xl shadow-subtle" 
          : "py-5 bg-transparent"
      )}
    >
      <div className="container px-6 mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="w-10 h-10 rounded-xl bg-emirati-teal flex items-center justify-center">
            <span className="text-white font-display font-bold text-xl">E</span>
          </span>
          <span className="font-display font-medium text-xl">Emirati Journey</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#journey" className="text-foreground/80 hover:text-emirati-teal transition-colors duration-200">
            Journey
          </a>
          <a href="#personas" className="text-foreground/80 hover:text-emirati-teal transition-colors duration-200">
            Personas
          </a>
          <a href="#services" className="text-foreground/80 hover:text-emirati-teal transition-colors duration-200">
            Services
          </a>
          <Link to="/job-matching" className="text-foreground/80 hover:text-emirati-teal transition-colors duration-200 flex items-center">
            <Briefcase className="mr-1 h-4 w-4" />
            Job Matching
          </Link>
          <UserMenu />
        </nav>
        
        {/* Mobile Menu Button and User Menu */}
        <div className="md:hidden flex items-center space-x-4">
          <UserMenu />
          <button 
            className="text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl animate-fade-in border-t border-gray-100 shadow-md">
          <nav className="container py-6 px-6 mx-auto flex flex-col space-y-4">
            <a 
              href="#journey" 
              className="py-2 text-foreground/80 hover:text-emirati-teal transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Journey
            </a>
            <a 
              href="#personas" 
              className="py-2 text-foreground/80 hover:text-emirati-teal transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Personas
            </a>
            <a 
              href="#services" 
              className="py-2 text-foreground/80 hover:text-emirati-teal transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </a>
            <Link 
              to="/job-matching" 
              className="py-2 text-foreground/80 hover:text-emirati-teal transition-colors duration-200 flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <Briefcase className="mr-1 h-4 w-4" />
              Job Matching
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
