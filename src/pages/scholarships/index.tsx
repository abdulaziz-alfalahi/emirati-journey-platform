
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScholarshipsList } from '@/components/scholarships/ScholarshipsList';
import { ScholarshipsFilter } from '@/components/scholarships/ScholarshipsFilter';
import { Button } from '@/components/ui/button';
import { PlusCircle, School, GraduationCap, Award, Users } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { ScholarshipsCreate } from '@/components/scholarships/ScholarshipsCreate';
import { ScholarshipsApplied } from '@/components/scholarships/ScholarshipsApplied';
import { ScholarshipsManage } from '@/components/scholarships/ScholarshipsManage';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { EducationHero } from '@/components/common/EducationHero';
import { StatCards } from '@/components/common/StatCards';

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

  const canCreateScholarship = roles.some(role => 
    ['educational_institution', 'government_representative', 'private_sector_recruiter', 'administrator'].includes(role)
  );

  const canApplyForScholarship = roles.some(role => 
    ['school_student', 'university_student', 'national_service_participant'].includes(role)
  );

  const heroStats = [
    {
      icon: School,
      title: '150+ Scholarships',
      description: 'Available nationwide',
      bgColor: '',
      iconColor: ''
    },
    {
      icon: GraduationCap,
      title: 'AED 50M',
      description: 'Total funding available',
      bgColor: '',
      iconColor: ''
    },
    {
      icon: Award,
      title: '85% Success',
      description: 'Application success rate',
      bgColor: '',
      iconColor: ''
    },
    {
      icon: Users,
      title: '1000+ Students',
      description: 'Funded annually',
      bgColor: '',
      iconColor: ''
    }
  ];

  const statCards = [
    {
      icon: School,
      title: 'University Scholarships',
      description: 'For higher education in the UAE',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      icon: GraduationCap,
      title: 'Merit-Based Funding',
      description: 'Opportunities for academic excellence',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      icon: Award,
      title: 'Special Programs',
      description: 'From government and private sector',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600'
    },
    {
      icon: Users,
      title: 'Need-Based Aid',
      description: 'Financial assistance programs',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <EducationHero
          title="Educational Scholarships"
          description="Discover and apply for educational scholarships across the UAE designed to support academic excellence and career development for Emirati students."
          stats={heroStats}
        />

        <StatCards cards={statCards} />

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
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Available Scholarships</h2>
                  {canCreateScholarship && (
                    <Button 
                      onClick={() => setIsCreateDialogOpen(true)}
                      className="ehrdc-button-primary"
                    >
                      <PlusCircle className="h-4 w-4 mr-2" /> Create Scholarship
                    </Button>
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
                  <h2 className="text-xl font-semibold mb-4">My Applications</h2>
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
                    <Button 
                      onClick={() => setIsCreateDialogOpen(true)}
                      className="ehrdc-button-primary"
                    >
                      <PlusCircle className="h-4 w-4 mr-2" /> Create Scholarship
                    </Button>
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

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Create New Scholarship</DialogTitle>
            </DialogHeader>
            <ScholarshipsCreate onSuccess={() => setIsCreateDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default ScholarshipsPage;
