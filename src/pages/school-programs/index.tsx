
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { School, Book, Award, Users, GraduationCap, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProgramsList from '@/components/school-programs/ProgramsList';
import ProgramsFilter from '@/components/school-programs/ProgramsFilter';
import InstitutionDirectory from '@/components/school-programs/InstitutionDirectory';
import SuccessStories from '@/components/school-programs/SuccessStories';
import ResourcesSection from '@/components/school-programs/ResourcesSection';
import { useAuth } from '@/context/AuthContext';
import { ProgramFilters } from '@/types/schoolPrograms';

const SchoolProgramsPage: React.FC = () => {
  const { user, roles } = useAuth();
  const [activeTab, setActiveTab] = useState("available");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<ProgramFilters>({});

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-ehrdc-teal to-ehrdc-light-teal rounded-lg p-8 mb-8 text-white">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">School Programs for Future Leaders</h1>
            <p className="text-xl opacity-90 mb-6">
              Discover exceptional educational initiatives designed to nurture and develop K-12 Emirati students, 
              preparing them for academic excellence and future leadership roles.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <School className="h-8 w-8 mb-2" />
                <h3 className="font-semibold mb-1">200+ Programs</h3>
                <p className="text-sm opacity-90">Across all grade levels</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <Users className="h-8 w-8 mb-2" />
                <h3 className="font-semibold mb-1">50+ Institutions</h3>
                <p className="text-sm opacity-90">Leading educational partners</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <Award className="h-8 w-8 mb-2" />
                <h3 className="font-semibold mb-1">Government Approved</h3>
                <p className="text-sm opacity-90">Quality assured programs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="bg-blue-50 p-4 rounded-lg flex items-center">
                <School className="h-10 w-10 text-blue-600 mr-4" />
                <div>
                  <h3 className="font-semibold">Elementary</h3>
                  <p className="text-sm text-muted-foreground">Grades K-5 programs</p>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg flex items-center">
                <Book className="h-10 w-10 text-green-600 mr-4" />
                <div>
                  <h3 className="font-semibold">Middle School</h3>
                  <p className="text-sm text-muted-foreground">Grades 6-8 programs</p>
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg flex items-center">
                <GraduationCap className="h-10 w-10 text-purple-600 mr-4" />
                <div>
                  <h3 className="font-semibold">High School</h3>
                  <p className="text-sm text-muted-foreground">Grades 9-12 programs</p>
                </div>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg flex items-center">
                <Award className="h-10 w-10 text-amber-600 mr-4" />
                <div>
                  <h3 className="font-semibold">Specialized</h3>
                  <p className="text-sm text-muted-foreground">Advanced & gifted programs</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <ProgramsFilter 
              onFilterChange={setSelectedFilters} 
              onSearchChange={setSearchQuery}
              selectedFilters={selectedFilters}
              searchQuery={searchQuery}
            />
          </div>
          
          <div className="md:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="available">Available Programs</TabsTrigger>
                <TabsTrigger value="enrolled">My Programs</TabsTrigger>
                {roles.includes('educational_institution') && (
                  <TabsTrigger value="managed">Manage Programs</TabsTrigger>
                )}
                <TabsTrigger value="institutions">Institutions</TabsTrigger>
                <TabsTrigger value="success-stories">Success Stories</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>
              
              <TabsContent value="available" className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Available School Programs</h2>
                  {roles.includes('educational_institution') && (
                    <Button className="ehrdc-button-primary">
                      <School className="h-4 w-4 mr-2" /> Add New Program
                    </Button>
                  )}
                </div>
                <ProgramsList 
                  type="available" 
                  filters={selectedFilters}
                  searchQuery={searchQuery}
                />
              </TabsContent>
              
              <TabsContent value="enrolled" className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">My Enrolled Programs</h2>
                <ProgramsList 
                  type="enrolled" 
                  filters={selectedFilters}
                  searchQuery={searchQuery}
                />
              </TabsContent>
              
              {roles.includes('educational_institution') && (
                <TabsContent value="managed" className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Manage Programs</h2>
                    <Button className="ehrdc-button-primary">
                      <School className="h-4 w-4 mr-2" /> Create Program
                    </Button>
                  </div>
                  <ProgramsList 
                    type="managed" 
                    filters={selectedFilters}
                    searchQuery={searchQuery}
                  />
                </TabsContent>
              )}

              <TabsContent value="institutions" className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">Educational Institutions</h2>
                <InstitutionDirectory />
              </TabsContent>

              <TabsContent value="success-stories" className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">Student Success Stories</h2>
                <SuccessStories />
              </TabsContent>

              <TabsContent value="resources" className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">Resources & Guides</h2>
                <ResourcesSection />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SchoolProgramsPage;
