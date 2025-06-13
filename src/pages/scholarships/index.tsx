
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ScholarshipsList from '@/components/scholarships/ScholarshipsList';
import ScholarshipsFilter from '@/components/scholarships/ScholarshipsFilter';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { PlusCircle, School, GraduationCap, Award, Globe } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import ScholarshipsCreate from '@/components/scholarships/ScholarshipsCreate';
import ScholarshipsApplied from '@/components/scholarships/ScholarshipsApplied';
import ScholarshipsManage from '@/components/scholarships/ScholarshipsManage';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { IconButton } from '@/components/ui/icon-button';

const ScholarshipsPage = () => {
  const { user, roles } = useAuth();
  const [activeTab, setActiveTab] = useState("available");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<{
    providerType: string[];
    amount: [number | null, number | null];
  }>({
    providerType: [],
    amount: [null, null],
  });

  // Check if the user can create scholarships
  const canCreateScholarship = roles.some(role => 
    ['educational_institution', 'government_representative', 'private_sector_recruiter', 'administrator'].includes(role)
  );

  // Check if the user can apply for scholarships
  const canApplyForScholarship = roles.some(role => 
    ['school_student', 'university_student', 'national_service_participant'].includes(role)
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-ehrdc-teal to-ehrdc-light-teal rounded-lg p-8 mb-8 text-white">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">Scholarships</h1>
            <p className="text-xl opacity-90 mb-6">
              Discover and apply for educational scholarships across the UAE, designed to support Emirati students in achieving their academic goals and career aspirations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <School className="h-8 w-8 mb-2" />
                <h3 className="font-semibold mb-1">University Scholarships</h3>
                <p className="text-sm opacity-90">For higher education in the UAE</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <GraduationCap className="h-8 w-8 mb-2" />
                <h3 className="font-semibold mb-1">Merit-Based Funding</h3>
                <p className="text-sm opacity-90">Opportunities for academic excellence</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <Award className="h-8 w-8 mb-2" />
                <h3 className="font-semibold mb-1">Special Programs</h3>
                <p className="text-sm opacity-90">From government and private sector</p>
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
                  <h3 className="font-semibold">University Scholarships</h3>
                  <p className="text-sm text-muted-foreground">For higher education in the UAE</p>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg flex items-center">
                <GraduationCap className="h-10 w-10 text-green-600 mr-4" />
                <div>
                  <h3 className="font-semibold">Merit-Based Funding</h3>
                  <p className="text-sm text-muted-foreground">For academic excellence</p>
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg flex items-center">
                <Globe className="h-10 w-10 text-purple-600 mr-4" />
                <div>
                  <h3 className="font-semibold">International Study</h3>
                  <p className="text-sm text-muted-foreground">Global opportunities</p>
                </div>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg flex items-center">
                <Award className="h-10 w-10 text-amber-600 mr-4" />
                <div>
                  <h3 className="font-semibold">Special Programs</h3>
                  <p className="text-sm text-muted-foreground">Government and private sector</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid md:grid-cols-4 gap-6">
          {/* Filter Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4">
              <h3 className="font-medium text-lg mb-4">Filter Scholarships</h3>
              <ScholarshipsFilter 
                onFilterChange={setSelectedFilters}
                onSearchChange={setSearchQuery}
                selectedFilters={selectedFilters}
                searchQuery={searchQuery}
              />
            </div>
          </div>
          
          {/* Content Area */}
          <div className="md:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="available">Available</TabsTrigger>
                {canApplyForScholarship && (
                  <TabsTrigger value="applied">My Applications</TabsTrigger>
                )}
                {canCreateScholarship && (
                  <TabsTrigger value="managed">Managed Scholarships</TabsTrigger>
                )}
              </TabsList>
              
              <TabsContent value="available" className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Available Scholarships</h2>
                  {canCreateScholarship && (
                    <IconButton 
                      onClick={() => setIsCreateDialogOpen(true)}
                      className="ehrdc-button-primary"
                      icon={<PlusCircle className="h-4 w-4" />}
                    >
                      Create Scholarship
                    </IconButton>
                  )}
                </div>
                <ScholarshipsList 
                  type="available" 
                  filters={selectedFilters}
                  searchQuery={searchQuery}
                  canApply={canApplyForScholarship}
                />
              </TabsContent>
              
              {canApplyForScholarship && (
                <TabsContent value="applied" className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4">My Scholarship Applications</h2>
                  <ScholarshipsApplied 
                    filters={selectedFilters}
                    searchQuery={searchQuery}
                  />
                </TabsContent>
              )}
              
              {canCreateScholarship && (
                <TabsContent value="managed" className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Managed Scholarships</h2>
                    <IconButton 
                      onClick={() => setIsCreateDialogOpen(true)}
                      className="ehrdc-button-primary"
                      icon={<PlusCircle className="h-4 w-4" />}
                    >
                      Create Scholarship
                    </IconButton>
                  </div>
                  <ScholarshipsManage
                    onOpenCreateDialog={() => setIsCreateDialogOpen(true)}
                    filters={selectedFilters}
                    searchQuery={searchQuery}
                  />
                </TabsContent>
              )}
            </Tabs>
          </div>
        </div>

        {/* Create Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-ehrdc-teal">
                Create New Scholarship
              </DialogTitle>
            </DialogHeader>
            <div className="border-t border-gray-100 pt-4 mt-2">
              <ScholarshipsCreate onSuccess={() => setIsCreateDialogOpen(false)} />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default ScholarshipsPage;
