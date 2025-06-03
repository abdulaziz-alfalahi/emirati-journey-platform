
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Calendar, Book, Award, Users, School } from 'lucide-react';
import CampsList from '@/components/summer-camps/CampsList';
import CampsFilter from '@/components/summer-camps/CampsFilter';
import { useAuth } from '@/context/AuthContext';
import { CampFilters } from '@/types/summerCamps';
import { IconButton } from '@/components/ui/icon-button';

const SummerCampsPage: React.FC = () => {
  const { user, roles } = useAuth();
  const [activeTab, setActiveTab] = useState("available");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<CampFilters>({});

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-ehrdc-teal to-ehrdc-light-teal rounded-lg p-8 mb-8 text-white">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">Summer Knowledge Camps</h1>
            <p className="text-xl opacity-90 mb-6">
              Discover and register for educational summer camps across Dubai, designed to enrich students' learning experiences during school breaks.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <School className="h-8 w-8 mb-2" />
                <h3 className="font-semibold mb-1">40+ Camps</h3>
                <p className="text-sm opacity-90">Available across Dubai</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <Book className="h-8 w-8 mb-2" />
                <h3 className="font-semibold mb-1">12 Categories</h3>
                <p className="text-sm opacity-90">From tech to arts and sports</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <Award className="h-8 w-8 mb-2" />
                <h3 className="font-semibold mb-1">Certified Programs</h3>
                <p className="text-sm opacity-90">Government approved learning</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="bg-blue-50 p-4 rounded-lg flex items-center">
                <School className="h-10 w-10 text-blue-600 mr-4" />
                <div>
                  <h3 className="font-semibold">40+ Camps</h3>
                  <p className="text-sm text-muted-foreground">Available across Dubai</p>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg flex items-center">
                <Book className="h-10 w-10 text-green-600 mr-4" />
                <div>
                  <h3 className="font-semibold">12 Categories</h3>
                  <p className="text-sm text-muted-foreground">From tech to arts and sports</p>
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg flex items-center">
                <Users className="h-10 w-10 text-purple-600 mr-4" />
                <div>
                  <h3 className="font-semibold">Expert Instructors</h3>
                  <p className="text-sm text-muted-foreground">Qualified educators</p>
                </div>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg flex items-center">
                <Award className="h-10 w-10 text-amber-600 mr-4" />
                <div>
                  <h3 className="font-semibold">Certified Programs</h3>
                  <p className="text-sm text-muted-foreground">Government approved</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4">
              <h3 className="font-medium text-lg mb-4">Filter Camps</h3>
              <CampsFilter 
                onFilterChange={setSelectedFilters} 
                onSearchChange={setSearchQuery}
                selectedFilters={selectedFilters}
                searchQuery={searchQuery}
              />
            </div>
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
                    <IconButton 
                      className="ehrdc-button-primary"
                      icon={<Calendar className="h-4 w-4" />}
                    >
                      Create New Camp
                    </IconButton>
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
                    <h2 className="text-xl font-semibold">Managed Camps</h2>
                    <IconButton 
                      className="ehrdc-button-primary"
                      icon={<Calendar className="h-4 w-4" />}
                    >
                      Create New Camp
                    </IconButton>
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
