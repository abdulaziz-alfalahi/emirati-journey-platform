
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';
import { ProfessionalGrowthLayout } from '@/components/professional-growth/ProfessionalGrowthLayout';
import { School, Users, Clock, Award, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import ProgramsList from '@/components/school-programs/ProgramsList';
import { ProgramFilters } from '@/types/schoolPrograms';

const SchoolProgramsPage: React.FC = () => {
  const { t } = useTranslation('school-programs');
  const { isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<ProgramFilters>({});

  const stats = [
    {
      value: t('stats.partnerSchools.value'),
      label: t('stats.partnerSchools.label'),
      icon: School
    },
    {
      value: t('stats.studentsEnrolled.value'),
      label: t('stats.studentsEnrolled.label'),
      icon: Users
    },
    {
      value: t('stats.specializedPrograms.value'),
      label: t('stats.specializedPrograms.label'),
      icon: Award
    },
    {
      value: t('stats.successRate.value'),
      label: t('stats.successRate.label'),
      icon: Clock
    }
  ];

  const tabs = [
    {
      id: 'programs',
      label: t('tabs.programs.label'),
      icon: <School className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <School className="h-5 w-5" />
                {t('tabs.programs.title')}
              </CardTitle>
              <CardDescription>
                {t('meta.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="flex-1 relative">
                    <Search className={`absolute top-3 h-4 w-4 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
                    <Input
                      placeholder={t('ui.search.placeholder')}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={isRTL ? 'pr-10' : 'pl-10'}
                    />
                  </div>
                  <Button variant="outline" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Filter className="h-4 w-4" />
                    {t('ui.filters.title')}
                  </Button>
                </div>
                
                <ProgramsList 
                  type="available" 
                  filters={filters} 
                  searchQuery={searchQuery}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'my-registrations',
      label: t('tabs.myRegistrations.label'),
      icon: <Users className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Users className="h-5 w-5" />
                {t('tabs.myRegistrations.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ProgramsList 
                type="enrolled" 
                filters={filters} 
                searchQuery={searchQuery}
              />
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'resources',
      label: t('tabs.resources.label'),
      icon: <Award className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Award className="h-5 w-5" />
                {t('tabs.resources.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Award className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">{t('tabs.resources.title')}</h3>
                <p className="text-muted-foreground mb-6">
                  {t('meta.description')}
                </p>
                <Button>
                  {t('ui.buttons.browseProgramsShort')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }
  ];

  return (
    <div className={isRTL ? 'rtl-text' : ''}>
      <ProfessionalGrowthLayout
        title={t('meta.title')}
        description={t('meta.description')}
        icon={<School className="h-12 w-12 text-white" />}
        stats={stats}
        tabs={tabs}
        defaultTab="programs"
      />
    </div>
  );
};

export default SchoolProgramsPage;
