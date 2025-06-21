
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CampsList from '@/components/summer-camps/CampsList';
import CampsFilter from '@/components/summer-camps/CampsFilter';
import { CampFilters } from '@/types/summerCamps';
import { formatNumber } from '@/lib/translationUtils';

const SummerCampsPage: React.FC = () => {
  const { t } = useTranslation('summer-camps');
  const [activeTab, setActiveTab] = useState<"available" | "registered" | "managed">("available");
  const [filters, setFilters] = useState<CampFilters>({});
  const [searchQuery, setSearchQuery] = useState('');

  const handleTabChange = (value: string) => {
    setActiveTab(value as "available" | "registered" | "managed");
  };

  const handleFilterChange = (newFilters: CampFilters) => {
    setFilters(newFilters);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{t('meta.title')}</h1>
        <p className="text-muted-foreground">{t('meta.description')}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t('stats.summerPrograms.label')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(25)}+</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t('stats.studentsEnrolled.label')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(1200)}+</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t('stats.partnerInstitutions.label')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(15)}+</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t('stats.emiratesCovered.label')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(7)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="available">{t('tabs.programs.label')}</TabsTrigger>
          <TabsTrigger value="registered">{t('tabs.myRegistrations.label')}</TabsTrigger>
          <TabsTrigger value="managed">Managed Camps</TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <CampsFilter
              onFilterChange={handleFilterChange}
              onSearchChange={handleSearchChange}
              selectedFilters={filters}
              searchQuery={searchQuery}
            />
          </div>

          {/* Camps Content */}
          <div className="lg:col-span-3">
            <TabsContent value="available" className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">{t('tabs.programs.title')}</h2>
                <CampsList
                  type="available"
                  filters={filters}
                  searchQuery={searchQuery}
                />
              </div>
            </TabsContent>

            <TabsContent value="registered" className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">{t('tabs.myRegistrations.title')}</h2>
                <CampsList
                  type="registered"
                  filters={filters}
                  searchQuery={searchQuery}
                />
              </div>
            </TabsContent>

            <TabsContent value="managed" className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Managed Camps</h2>
                <CampsList
                  type="managed"
                  filters={filters}
                  searchQuery={searchQuery}
                />
              </div>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default SummerCampsPage;
