
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Users, BookOpen, TrendingUp, BarChart } from 'lucide-react';

const HomeGridSection: React.FC = () => {
  const { t } = useTranslation('home');

  const services = [
    {
      icon: Users,
      title: t('grid.services.assessments.title'),
      description: t('grid.services.assessments.description'),
      link: '/assessments'
    },
    {
      icon: BookOpen,
      title: t('grid.services.training.title'),
      description: t('grid.services.training.description'),
      link: '/training'
    },
    {
      icon: TrendingUp,
      title: t('grid.services.networking.title'),
      description: t('grid.services.networking.description'),
      link: '/networking'
    },
    {
      icon: BarChart,
      title: t('grid.services.analytics.title'),
      description: t('grid.services.analytics.description'),
      link: '/analytics'
    }
  ];

  return (
    <div className="container mx-auto px-4 pb-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('grid.title')}</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t('grid.subtitle')}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <Link key={index} to={service.link} className="group">
            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">{service.description}</CardDescription>
                <div className="flex items-center text-primary text-sm font-medium group-hover:translate-x-1 transition-transform">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeGridSection;
