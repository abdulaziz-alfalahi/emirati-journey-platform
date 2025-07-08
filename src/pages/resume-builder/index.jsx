import React from 'react';
import { useTranslation } from 'react-i18next';
import { CareerPageLayout } from '@/components/career/CareerPageLayout';
import { FileText, Download, Edit, Users, Eye, Mail, BarChart3, Lightbulb, Monitor, Smartphone, Tablet, TrendingUp, Clock, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const ResumeBuilderPage: React.FC = () => {
  const { t } = useTranslation('resume-builder');

  const stats = [
    { value: "10+", label: t('stats.templates') },
    { value: "5,000+", label: t('stats.created') },
    { value: "20+", label: t('stats.formats') },
    { value: "95%", label: t('stats.satisfaction') }
  ];

  // Define tips data directly to avoid i18n array issues
  const getTipsData = () => {
    return [
      {
        title: t('tips.general.0.title', 'Keep it concise and focused'),
        description: t('tips.general.0.description', 'Limit your resume to one or two pages maximum')
      },
      {
        title: t('tips.general.1.title', 'Use relevant keywords'),
        description: t('tips.general.1.description', 'Include keywords related to the target job position')
      },
      {
        title: t('tips.general.2.title', 'Quantify your achievements'),
        description: t('tips.general.2.description', 'Use numbers and percentages to show your impact')
      },
      {
        title: t('tips.general.3.title', 'Tailor for each job'),
        description: t('tips.general.3.description', 'Customize your resume for each job application')
      }
    ];
  };

  // Builder Tab Content
  const BuilderTabContent = () => (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {t('tabs.builder.description')}
        </p>
      </div>

      <div className="text-center py-12">
        <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">{t('builder.title')}</h3>
        <p className="text-muted-foreground mb-6">
          {t('builder.description')}
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
          <div className="text-center">
            <div className="bg-primary/10 rounded-lg p-4 mb-2">
              <FileText className="h-6 w-6 mx-auto text-primary" />
            </div>
            <p className="text-sm font-medium">{t('builder.features.templates')}</p>
          </div>
          <div className="text-center">
            <div className="bg-primary/10 rounded-lg p-4 mb-2">
              <Edit className="h-6 w-6 mx-auto text-primary" />
            </div>
            <p className="text-sm font-medium">{t('builder.features.customizable')}</p>
          </div>
          <div className="text-center">
            <div className="bg-primary/10 rounded-lg p-4 mb-2">
              <Download className="h-6 w-6 mx-auto text-primary" />
            </div>
            <p className="text-sm font-medium">{t('builder.features.export')}</p>
          </div>
          <div className="text-center">
            <div className="bg-primary/10 rounded-lg p-4 mb-2">
              <Users className="h-6 w-6 mx-auto text-primary" />
            </div>
            <p className="text-sm font-medium">{t('builder.features.ats')}</p>
          </div>
        </div>

        <Badge variant="secondary" className="mb-4">
          {t('builder.comingSoon')}
        </Badge>
        <br />
        <Button variant="outline">
          <Mail className="h-4 w-4 mr-2" />
          {t('builder.notifyMe')}
        </Button>
      </div>
    </div>
  );

  // Templates Tab Content
  const TemplatesTabContent = () => (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {t('tabs.templates.description')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {['classic', 'modern', 'creative', 'minimalist', 'executive', 'technical'].map((category) => (
          <Card key={category} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="bg-primary/10 rounded-lg p-4 mb-4">
                <FileText className="h-8 w-8 mx-auto text-primary" />
              </div>
              <CardTitle className="text-center">
                {t(`templates.categories.${category}`)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <Badge variant="outline">{t('templates.features.ats')}</Badge>
                <Badge variant="outline">{t('templates.features.customizable')}</Badge>
                <Badge variant="outline">{t('templates.features.professional')}</Badge>
                <Badge variant="outline">{t('templates.features.responsive')}</Badge>
              </div>
              <Button className="w-full" variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                {t('secondaryAction')}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // Analytics Tab Content
  const AnalyticsTabContent = () => (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {t('tabs.analytics.description')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { key: 'views', icon: Eye, value: '2,456' },
          { key: 'downloads', icon: Download, value: '1,234' },
          { key: 'applications', icon: FileText, value: '89' },
          { key: 'responses', icon: Mail, value: '34' },
          { key: 'interviews', icon: Users, value: '12' },
          { key: 'success', icon: TrendingUp, value: '78%' }
        ].map((metric) => (
          <Card key={metric.key}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t(`analytics.metrics.${metric.key}`)}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('analytics.insights.topSections')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">{t('sections.experience')}</span>
                <span className="text-sm text-muted-foreground">45%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">{t('sections.skills')}</span>
                <span className="text-sm text-muted-foreground">32%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">{t('sections.education')}</span>
                <span className="text-sm text-muted-foreground">23%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('analytics.insights.devices')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Monitor className="h-4 w-4 mr-2" />
                  <span className="text-sm">Desktop</span>
                </div>
                <span className="text-sm text-muted-foreground">65%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Smartphone className="h-4 w-4 mr-2" />
                  <span className="text-sm">Mobile</span>
                </div>
                <span className="text-sm text-muted-foreground">28%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Tablet className="h-4 w-4 mr-2" />
                  <span className="text-sm">Tablet</span>
                </div>
                <span className="text-sm text-muted-foreground">7%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Tips Tab Content
  const TipsTabContent = () => {
    const tipsData = getTipsData();
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('tabs.tips.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tipsData.map((tip, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 rounded-lg p-2">
                    <Lightbulb className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{tip.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{tip.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {['writing', 'formatting', 'keywords', 'industry'].map((category) => (
            <Card key={category} className="text-center">
              <CardHeader>
                <div className="bg-primary/10 rounded-lg p-4 mb-2 mx-auto w-fit">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-sm">
                  {t(`tips.categories.${category}`)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" className="w-full">
                  {t('secondaryAction')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const tabs = [
    {
      id: 'builder',
      label: t('tabs.builder.label'),
      icon: <FileText className="h-4 w-4" />,
      content: <BuilderTabContent />
    },
    {
      id: 'templates',
      label: t('tabs.templates.label'),
      icon: <Edit className="h-4 w-4" />,
      content: <TemplatesTabContent />
    },
    {
      id: 'analytics',
      label: t('tabs.analytics.label'),
      icon: <BarChart3 className="h-4 w-4" />,
      content: <AnalyticsTabContent />
    },
    {
      id: 'tips',
      label: t('tabs.tips.label'),
      icon: <Lightbulb className="h-4 w-4" />,
      content: <TipsTabContent />
    }
  ];

  return (
    <CareerPageLayout
      title={t('title')}
      description={t('description')}
      heroIcon={<FileText className="h-12 w-12" />}
      primaryActionLabel={t('primaryAction')}
      primaryActionIcon={<Edit className="h-4 w-4" />}
      secondaryActionLabel={t('secondaryAction')}
      stats={stats}
      quote={t('quote')}
      attribution={t('attribution')}
      quoteIcon={<FileText className="h-8 w-8" />}
      tabs={tabs}
      defaultTab="builder"
    />
  );
};

export default ResumeBuilderPage;

