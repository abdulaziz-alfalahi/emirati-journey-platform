
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { EducationPathwayLayout } from '@/components/layouts/EducationPathwayLayout';
import { Tent, Users, Calendar, Trophy, Filter, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import CampsList from '@/components/summer-camps/CampsList';
import CampsFilter from '@/components/summer-camps/CampsFilter';
import type { CampFilters } from '@/types/summerCamps';

const SummerCampsPage: React.FC = () => {
  const { t } = useTranslation('summer-camps');
  const [activeTab, setActiveTab] = useState<"available" | "registered" | "managed">("available");
  const [filters, setFilters] = useState<CampFilters>({
    category: [],
    ageGroup: [],
    location: [],
  });
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { value: "50+", label: t('stats.totalCamps'), icon: Tent },
    { value: "1,200+", label: t('stats.participants'), icon: Users },
    { value: "12", label: t('stats.weeks'), icon: Calendar },
    { value: "95%", label: t('stats.satisfaction'), icon: Trophy }
  ];

  const tabs = useMemo(() => [
    {
      id: "available",
      label: t('tabs.available'),
      icon: <Tent className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    {t('filters.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CampsFilter 
                    selectedFilters={filters}
                    onFilterChange={setFilters}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                  />
                </CardContent>
              </Card>
            </div>
            <div className="lg:w-3/4">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Search className="h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder={t('search.placeholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
              <CampsList 
                type="available"
                filters={filters}
                searchQuery={searchQuery}
              />
            </div>
          </div>
        </div>
      )
    },
    {
      id: "registered",
      label: t('tabs.registered'),
      icon: <Users className="h-4 w-4" />,
      content: (
        <CampsList 
          type="registered"
          filters={filters}
          searchQuery={searchQuery}
        />
      )
    },
    {
      id: "managed",
      label: t('tabs.managed'),
      icon: <Calendar className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{t('management.title')}</h2>
            <Button>
              {t('management.createNew')}
            </Button>
          </div>
          <CampsList 
            type="managed"
            filters={filters}
            searchQuery={searchQuery}
          />
        </div>
      )
    }
  ], [t, filters, searchQuery]);

  return (
    <EducationPathwayLayout
      title={t('page.title')}
      description={t('page.description')}
      icon={<Tent className="h-12 w-12 text-blue-600" />}
      stats={stats}
      tabs={tabs}
      defaultTab="available"
      actionButtonText={t('actions.explore')}
      actionButtonHref="#available"
      academicYear="2024-2025"
    />
  );
};

export default SummerCampsPage;
