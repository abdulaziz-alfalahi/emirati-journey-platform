
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/layout/Layout';
import { fetchPortfolio, canViewPortfolio } from '@/services/portfolioService';
import PortfolioViewer from '@/components/portfolio/PortfolioViewer';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ShieldAlert, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PortfolioViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [canView, setCanView] = useState<boolean | null>(null);

  // Check if the current user can view this portfolio
  useEffect(() => {
    const checkAccess = async () => {
      if (!id) return;
      if (!user) {
        setCanView(false);
        return;
      }
      
      // If it's the user's own portfolio
      if (user.id === id) {
        setCanView(true);
        return;
      }
      
      // Check permissions
      try {
        const hasAccess = await canViewPortfolio(user.id, id);
        setCanView(hasAccess);
      } catch (error) {
        console.error('Error checking portfolio access:', error);
        setCanView(false);
      }
    };
    
    checkAccess();
  }, [id, user]);
  
  // Fetch portfolio data
  const { 
    data: portfolio, 
    isLoading,
    error 
  } = useQuery({
    queryKey: ['portfolio', id],
    queryFn: async () => {
      if (!id || canView === false) return null;
      return await fetchPortfolio(id);
    },
    enabled: !!id && canView === true,
  });
  
  if (canView === false) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="max-w-lg mx-auto">
            <Alert variant="destructive">
              <Lock className="h-4 w-4" />
              <AlertTitle>Access Denied</AlertTitle>
              <AlertDescription>
                You don't have permission to view this portfolio. Please contact the portfolio owner for access.
              </AlertDescription>
            </Alert>
            
            <div className="mt-6 flex justify-center">
              <Button onClick={() => navigate(-1)} variant="outline">
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (error) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="max-w-lg mx-auto">
            <Alert variant="destructive">
              <ShieldAlert className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                There was a problem loading this portfolio. Please try again later.
              </AlertDescription>
            </Alert>
            
            <div className="mt-6 flex justify-center">
              <Button onClick={() => navigate(-1)} variant="outline">
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container py-8">
        {isLoading || canView === null ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <PortfolioViewer 
            portfolio={portfolio} 
            isOwnPortfolio={user?.id === id}
            onEdit={user?.id === id ? () => navigate('/portfolio') : undefined}
          />
        )}
      </div>
    </Layout>
  );
};

export default PortfolioViewPage;
