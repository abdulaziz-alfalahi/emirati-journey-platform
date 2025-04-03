
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Calendar, Book, Award, Users, School } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CampsList from '@/components/summer-camps/CampsList';
import CampsFilter from '@/components/summer-camps/CampsFilter';
import { useAuth } from '@/context/AuthContext';
import { CampFilters } from '@/types/summerCamps';

const SummerCampsPage: React.FC = () => {
  const { user, roles } = useAuth();
  const [activeTab, setActiveTab] = useState("available");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<CampFilters>({});

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Summer Knowledge Camps</h1>
            <p className="text-muted-foreground">
              Discover and register for educational summer camps across the UAE
            </p>
          </div>
          
          {roles.includes('educational_institution') && (
            <Button className="mt-4 md:mt-0">
              <Calendar className="h-4 w-4 mr-2" /> Create New Camp
            </Button>
          )}
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="bg-blue-50 p-4 rounded-lg flex items-center">
                <School className="h-10 w-10 text-blue-600 mr-4" />
                <div>
                  <h3 className="font-semibold">40+ Camps</h3>
                  <p className="text-sm text-muted-foreground">Available across the UAE</p>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg flex items-center">
                <Book className="h-10 w-10 text-green-600 mr-4" />
                <div>
                  <h3 className="font-semibold">12 Categories</h3>
                  <p className="text-sm text-muted-foreground">From tech to arts and sports</p>
                </div>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg flex items-center">
                <Award className="h-10 w-10 text-amber-600 mr-4" />
                <div>
                  <h3 className="font-semibold">Certified Programs</h3>
                  <p className="text-sm text-muted-foreground">Government approved learning</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

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
                <CampsList 
                  type="available" 
                  filters={selectedFilters}
                  searchQuery={searchQuery}
                />
              </TabsContent>
              
              <TabsContent value="registered" className="space-y-4">
                <CampsList 
                  type="registered" 
                  filters={selectedFilters}
                  searchQuery={searchQuery}
                />
              </TabsContent>
              
              {roles.includes('educational_institution') && (
                <TabsContent value="managed" className="space-y-4">
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
