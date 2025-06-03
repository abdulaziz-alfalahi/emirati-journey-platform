
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Book, Award, Users, School, Star, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CampsList from '@/components/summer-camps/CampsList';
import CampsFilter from '@/components/summer-camps/CampsFilter';
import { useAuth } from '@/context/AuthContext';
import { CampFilters } from '@/types/summerCamps';
import { EducationHero } from '@/components/common/EducationHero';
import { StatCards } from '@/components/common/StatCards';

const SummerCampsPage: React.FC = () => {
  const { user, roles } = useAuth();
  const [activeTab, setActiveTab] = useState("available");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<CampFilters>({});

  const heroStats = [
    {
      icon: School,
      title: '40+ Camps',
      description: 'Available across Dubai',
      bgColor: '',
      iconColor: ''
    },
    {
      icon: Book,
      title: '12 Categories',
      description: 'From tech to arts and sports',
      bgColor: '',
      iconColor: ''
    },
    {
      icon: Award,
      title: 'Certified Programs',
      description: 'Government approved learning',
      bgColor: '',
      iconColor: ''
    },
    {
      icon: Users,
      title: '500+ Students',
      description: 'Enrolled this summer',
      bgColor: '',
      iconColor: ''
    }
  ];

  const statCards = [
    {
      icon: School,
      title: 'Elementary',
      description: 'Ages 6-10 programs',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      icon: Book,
      title: 'Middle School',
      description: 'Ages 11-14 programs',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      icon: Star,
      title: 'Advanced',
      description: 'Specialized programs',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      icon: Award,
      title: 'Certified',
      description: 'Certificate programs',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600'
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <EducationHero
          title="Summer Knowledge Camps"
          description="Discover and register for educational summer camps across Dubai designed to nurture young minds and develop essential skills for the future."
          stats={heroStats}
        />

        <StatCards cards={statCards} />

        <div className="grid md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <CampsFilter 
              onFilterChange={setSelectedFilters} 
              onSearchChange={setSearchQuery}
              selectedFilters={selectedFilters}
              searchQuery={searchQuery}
            />
          </div>
          
          <div className="md:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="available">Available Camps</TabsTrigger>
                <TabsTrigger value="registered">My Registered Camps</TabsTrigger>
                {roles.includes('educational_institution') && (
                  <TabsTrigger value="managed">Managed Camps</TabsTrigger>
                )}
              </TabsList>
              
              <TabsContent value="available" className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Available Summer Camps</h2>
                  {roles.includes('educational_institution') && (
                    <Button className="ehrdc-button-primary">
                      <Calendar className="h-4 w-4 mr-2" /> Create New Camp
                    </Button>
                  )}
                </div>
                <CampsList 
                  type="available" 
                  filters={selectedFilters}
                  searchQuery={searchQuery}
                />
              </TabsContent>
              
              <TabsContent value="registered" className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">My Registered Camps</h2>
                <CampsList 
                  type="registered" 
                  filters={selectedFilters}
                  searchQuery={searchQuery}
                />
              </TabsContent>
              
              {roles.includes('educational_institution') && (
                <TabsContent value="managed" className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Manage Camps</h2>
                    <Button className="ehrdc-button-primary">
                      <Calendar className="h-4 w-4 mr-2" /> Create Camp
                    </Button>
                  </div>
                  <CampsList 
                    type="managed" 
                    filters={selectedFilters}
                    searchQuery={searchQuery}
                  />
                </TabsContent>
              )}
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SummerCampsPage;
