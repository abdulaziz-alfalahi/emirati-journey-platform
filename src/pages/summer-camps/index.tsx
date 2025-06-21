
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
    <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-ehrdc-teal/5 to-ehrdc-light-teal/10 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-ehrdc-teal">{t('meta.title')}</h1>
        <p className="text-muted-foreground">{t('meta.description')}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="border-l-4 border-l-ehrdc-teal shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ehrdc-teal">
              {t('stats.summerPrograms.label')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ehrdc-dark-teal">{formatNumber(25)}+</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ehrdc-gold shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ehrdc-gold">
              {t('stats.studentsEnrolled.label')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ehrdc-neutral-dark">{formatNumber(1200)}+</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-green-500 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-600">
              {t('stats.partnerInstitutions.label')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ehrdc-neutral-dark">{formatNumber(15)}+</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-blue-500 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-600">
              {t('stats.emiratesCovered.label')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ehrdc-neutral-dark">{formatNumber(7)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white shadow-md">
          <TabsTrigger 
            value="available" 
            className="data-[state=active]:bg-ehrdc-teal data-[state=active]:text-white"
          >
            {t('tabs.programs.label')}
          </TabsTrigger>
          <TabsTrigger 
            value="registered"
            className="data-[state=active]:bg-ehrdc-teal data-[state=active]:text-white"
          >
            {t('tabs.myRegistrations.label')}
          </TabsTrigger>
          <TabsTrigger 
            value="managed"
            className="data-[state=active]:bg-ehrdc-teal data-[state=active]:text-white"
          >
            Managed Camps
          </TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-ehrdc-light-teal/20">
              <CampsFilter
                onFilterChange={handleFilterChange}
                onSearchChange={handleSearchChange}
                selectedFilters={filters}
                searchQuery={searchQuery}
              />
            </Card>
          </div>

          {/* Camps Content */}
          <div className="lg:col-span-3">
            <TabsContent value="available" className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4 text-ehrdc-teal">{t('tabs.programs.title')}</h2>
                <CampsList
                  type="available"
                  filters={filters}
                  searchQuery={searchQuery}
                />
              </div>
            </TabsContent>

            <TabsContent value="registered" className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4 text-ehrdc-teal">{t('tabs.myRegistrations.title')}</h2>
                <CampsList
                  type="registered"
                  filters={filters}
                  searchQuery={searchQuery}
                />
              </div>
            </TabsContent>

            <TabsContent value="managed" className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4 text-ehrdc-teal">Managed Camps</h2>
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
