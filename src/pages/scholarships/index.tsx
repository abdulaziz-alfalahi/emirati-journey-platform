import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScholarshipsList } from '@/components/scholarships/ScholarshipsList';
import { ScholarshipsFilter } from '@/components/scholarships/ScholarshipsFilter';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { PlusCircle, School, GraduationCap, Award } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { ScholarshipsCreate } from '@/components/scholarships/ScholarshipsCreate';
import { ScholarshipsApplied } from '@/components/scholarships/ScholarshipsApplied';
import { ScholarshipsManage } from '@/components/scholarships/ScholarshipsManage';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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

  // Check if the user can create scholarships (educational institutions, government, private sector)
  const canCreateScholarship = roles.some(role => 
    ['educational_institution', 'government_representative', 'private_sector_recruiter', 'administrator'].includes(role)
  );

  // Check if the user can apply for scholarships (students mainly)
  const canApplyForScholarship = roles.some(role => 
    ['school_student', 'university_student', 'national_service_participant'].includes(role)
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Scholarships</h1>
            <p className="text-muted-foreground">
              Discover and apply for educational scholarships across the UAE
            </p>
          </div>
          
          {canCreateScholarship && (
            <Button 
              onClick={() => setIsCreateDialogOpen(true)}
              className="mt-4 md:mt-0"
            >
              <PlusCircle className="h-4 w-4 mr-2" /> Create Scholarship
            </Button>
          )}
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-3">
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
                  <p className="text-sm text-muted-foreground">Opportunities for academic excellence</p>
                </div>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg flex items-center">
                <Award className="h-10 w-10 text-amber-600 mr-4" />
                <div>
                  <h3 className="font-semibold">Special Programs</h3>
                  <p className="text-sm text-muted-foreground">From government and private sector</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <ScholarshipsFilter 
              onFilterChange={setSelectedFilters}
              onSearchChange={setSearchQuery}
              selectedFilters={selectedFilters}
              searchQuery={searchQuery}
            />
          </div>
          
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
                <ScholarshipsList 
                  type="available" 
                  filters={selectedFilters}
                  searchQuery={searchQuery}
                  canApply={canApplyForScholarship}
                />
              </TabsContent>
              
              {canApplyForScholarship && (
                <TabsContent value="applied" className="space-y-4">
                  <ScholarshipsApplied 
                    filters={selectedFilters}
                    searchQuery={searchQuery}
                  />
                </TabsContent>
              )}
              
              {canCreateScholarship && (
                <TabsContent value="managed" className="space-y-4">
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

        {/* Create Dialog - Fixed structure */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Create New Scholarship</DialogTitle>
            </DialogHeader>
            <div>
              <ScholarshipsCreate onSuccess={() => setIsCreateDialogOpen(false)} />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default ScholarshipsPage;
