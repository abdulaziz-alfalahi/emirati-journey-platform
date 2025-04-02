
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchPortfolio } from '@/services/portfolioService';
import { useResume } from '@/context/ResumeContext';
import PortfolioViewer from '@/components/portfolio/PortfolioViewer';
import PortfolioEditor from '@/components/portfolio/PortfolioEditor';
import PortfolioVisibility from '@/components/portfolio/PortfolioVisibility';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const PortfolioPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { resumeData } = useResume();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('view');

  const { 
    data: portfolio, 
    isLoading,
    error,
    refetch 
  } = useQuery({
    queryKey: ['portfolio', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const portfolioData = await fetchPortfolio(user.id);
      return {
        ...portfolioData,
        resumeData: resumeData || portfolioData.resumeData,
      };
    },
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, navigate, isLoading]);

  useEffect(() => {
    // Error handling
    if (error) {
      console.error('Error fetching portfolio:', error);
      toast({
        title: 'Error',
        description: 'Failed to load portfolio data. Please try again.',
        variant: 'destructive',
      });
    }
  }, [error, toast]);

  const handleEditClick = () => {
    setActiveTab('edit');
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="space-y-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Portfolio Builder</h1>
              {activeTab === 'view' && (
                <Button onClick={handleEditClick}>
                  <Plus className="h-4 w-4 mr-2" />
                  Update Portfolio
                </Button>
              )}
            </div>

            <TabsList>
              <TabsTrigger value="view">View Portfolio</TabsTrigger>
              <TabsTrigger value="edit">Edit Portfolio</TabsTrigger>
              <TabsTrigger value="visibility">Visibility Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="view" className="pt-6">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : (
                <PortfolioViewer 
                  portfolio={portfolio} 
                  isOwnPortfolio={true}
                  onEdit={handleEditClick}
                />
              )}
            </TabsContent>

            <TabsContent value="edit" className="pt-6">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : portfolio ? (
                <PortfolioEditor portfolio={portfolio} onUpdate={refetch} />
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground mb-4">No portfolio data found</p>
                  <Button onClick={refetch}>Refresh</Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="visibility" className="pt-6">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : portfolio ? (
                <PortfolioVisibility portfolio={portfolio} />
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground mb-4">No portfolio data found</p>
                  <Button onClick={refetch}>Refresh</Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default PortfolioPage;
