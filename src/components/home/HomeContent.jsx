
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Sparkles, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HomeContent: React.FC = () => {
  const { t } = useTranslation('home');

  const pathways = [
    {
      id: 'education',
      title: t('content.pathways.education.title'),
      description: t('content.pathways.education.description'),
      icon: '🎓',
      color: 'bg-blue-500',
      link: '/summer-camps'
    },
    {
      id: 'career',
      title: t('content.pathways.career.title'),
      description: t('content.pathways.career.description'),
      icon: '🚀',
      color: 'bg-green-500',
      link: '/assessments'
    },
    {
      id: 'growth',
      title: t('content.pathways.growth.title'),
      description: t('content.pathways.growth.description'),
      icon: '📈',
      color: 'bg-purple-500',
      link: '/training'
    },
    {
      id: 'lifelong',
      title: t('content.pathways.lifelong.title'),
      description: t('content.pathways.lifelong.description'),
      icon: '🌟',
      color: 'bg-yellow-500',
      link: '/national-service'
    }
  ];

  const features = [
    {
      icon: Sparkles,
      title: t('content.features.aiPowered.title'),
      description: t('content.features.aiPowered.description')
    },
    {
      icon: Award,
      title: t('content.features.blockchain.title'),
      description: t('content.features.blockchain.description')
    },
    {
      icon: Users,
      title: t('content.features.mentorship.title'),
      description: t('content.features.mentorship.description')
    }
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      {/* Pathways Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('content.pathways.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('content.pathways.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pathways.map((pathway) => (
            <Link key={pathway.id} to={pathway.link} className="group">
              <div className="bg-card rounded-lg p-6 h-full border transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className={`w-12 h-12 ${pathway.color} rounded-lg flex items-center justify-center mb-4 text-2xl`}>
                  {pathway.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{pathway.title}</h3>
                <p className="text-muted-foreground mb-4">{pathway.description}</p>
                <div className="flex items-center text-primary group-hover:translate-x-1 transition-transform">
                  <span className="text-sm font-medium">Explore</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('content.features.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('content.features.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeContent;
