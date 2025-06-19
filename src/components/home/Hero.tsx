
import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';

const Hero: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { user } = useAuth();
  const { t } = useTranslation('home');
  const { isRTL } = useLanguage();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section 
      className={`relative min-h-[75vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden pt-8 pb-8 md:pt-12 md:pb-12 ${
        isRTL ? 'text-right' : 'text-left'
      }`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Main Content */}
      <div className="container px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`inline-block mb-6 px-4 py-2 rounded-full bg-white/40 backdrop-blur-sm shadow-subtle border border-emirati-teal/10 ${
            isRTL ? 'font-arabic' : ''
          }`}>
            <p className={`text-emirati-navy font-medium transition-opacity duration-1000 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${isRTL ? 'text-base' : ''}`}>
              {t('hero.badge')}
            </p>
          </div>
          
          <h1 className={`text-4xl md:text-6xl lg:text-7xl font-display font-semibold leading-tight mb-6 transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } ${isRTL ? 'font-arabic leading-relaxed' : ''}`}>
            {t('hero.title.part1')}{' '}
            <span className="text-emirati-teal">{t('hero.title.highlight')}</span>{' '}
            {t('hero.title.part2')}
          </h1>
          
          <p className={`text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } ${isRTL ? 'font-arabic leading-relaxed text-right' : ''}`}>
            {t('hero.description')}
          </p>
          
          <div className={`flex flex-col sm:flex-row justify-center gap-4 transition-all duration-1000 delay-400 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
            {user ? (
              <Link to="/dashboard">
                <Button 
                  size="lg" 
                  className={`bg-emirati-teal hover:bg-emirati-teal/90 text-white px-8 py-3 text-lg ${
                    isRTL ? 'font-arabic' : ''
                  }`}
                >
                  {t('hero.buttons.dashboard')}
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/auth">
                  <Button 
                    size="lg" 
                    className={`bg-emirati-teal hover:bg-emirati-teal/90 text-white px-8 py-3 text-lg ${
                      isRTL ? 'font-arabic' : ''
                    }`}
                  >
                    {t('hero.buttons.signIn')}
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className={`border-emirati-teal text-emirati-teal hover:bg-emirati-teal hover:text-white px-8 py-3 text-lg ${
                      isRTL ? 'font-arabic' : ''
                    }`}
                  >
                    {t('hero.buttons.getStarted')}
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
        
        {/* Scroll Indicator - Moving down further to prevent overlap */}
        <div className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}>
          
        </div>
      </div>
      
      {/* Decorative Elements - Adjusted for RTL */}
      <div className={`absolute top-1/3 w-96 h-96 bg-emirati-teal/10 rounded-full filter blur-3xl ${
        isRTL ? '-left-20' : '-right-20'
      }`}></div>
      <div className={`absolute bottom-1/4 w-80 h-80 bg-emirati-gold/10 rounded-full filter blur-3xl ${
        isRTL ? '-right-20' : '-left-20'
      }`}></div>
    </section>
  );
};

export default Hero;
