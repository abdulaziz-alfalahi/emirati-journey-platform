
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { InternshipsList } from '@/components/internships/InternshipsList';
import { InternshipsFilter } from '@/components/internships/InternshipsFilter';
import { InternshipsManage } from '@/components/internships/InternshipsManage';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { InternshipsCreate } from '@/components/internships/InternshipsCreate';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const InternshipsPage: React.FC = () => {
  const [filters, setFilters] = useState<{
    industry?: string[];
    isPaid?: boolean;
    location?: string[];
    search?: string;
  }>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const { user, roles } = useAuth();
  const { toast } = useToast();

  // For demonstration purposes, use mock data
  const useMockData = true;

  const handleFilterChange = (newFilters: {
    industry?: string[];
    isPaid?: boolean;
    location?: string[];
    search?: string;
  }) => {
    setFilters(newFilters);
  };

  const handleSuccess = () => {
    setDialogOpen(false);
    toast({
      title: "Success",
      description: "Internship listing was created successfully"
    });
  };

  const isRecruiter = roles.includes('private_sector_recruiter') || 
                     (user?.email && user.email.includes('recruit'));

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Internships</h1>
            <p className="text-gray-600">
              Discover internship opportunities with leading organizations in the UAE
            </p>
          </div>
          
          {isRecruiter && (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="mt-4 md:mt-0">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Post Internship
                </Button>
              </DialogTrigger>
              <InternshipsCreate onSuccess={handleSuccess} />
            </Dialog>
          )}
        </div>

        {isRecruiter ? (
          <Tabs defaultValue="browse" className="space-y-6">
            <TabsList>
              <TabsTrigger value="browse">Browse Internships</TabsTrigger>
              <TabsTrigger value="manage">Manage Listings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="browse" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1">
                  <InternshipsFilter onFilterChange={handleFilterChange} />
                </div>
                <div className="md:col-span-3">
                  <InternshipsList filters={filters} useMockData={useMockData} />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="manage">
              <InternshipsManage />
            </TabsContent>
          </Tabs>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <InternshipsFilter onFilterChange={handleFilterChange} />
            </div>
            <div className="md:col-span-3">
              <InternshipsList filters={filters} useMockData={useMockData} />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default InternshipsPage;
