
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ScholarshipsAppliedProps {
  filters: {
    providerType: string[];
    amount: [number | null, number | null];
  };
  searchQuery: string;
}

interface Application {
  id: string;
  status: string;
  submitted_at: string;
  scholarship: {
    id: string;
    title: string;
    provider: string;
    amount: number | null;
    currency: string;
    application_deadline: string | null;
    provider_type: string;
  };
}

export const ScholarshipsApplied: React.FC<ScholarshipsAppliedProps> = ({ filters, searchQuery }) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        const { data: user } = await supabase.auth.getUser();
        
        let query = supabase
          .from('scholarship_applications')
          .select(`
            id,
            status,
            submitted_at,
            scholarship:scholarship_id (
              id, 
              title, 
              provider, 
              amount, 
              currency, 
              application_deadline,
              provider_type
            )
          `)
          .eq('student_id', user.user?.id || '');

        const { data, error } = await query;

        if (error) {
          console.error('Error fetching applications:', error);
          toast({
            title: 'Error fetching applications',
            description: error.message,
            variant: 'destructive',
          });
          return;
        }

        // Apply filters on the client side (for applications, we filter based on the scholarship data)
        let filteredData = data || [];

        if (filters.providerType.length > 0) {
          filteredData = filteredData.filter(app => 
            filters.providerType.includes(app.scholarship.provider_type)
          );
        }

        if (filters.amount[0] !== null) {
          filteredData = filteredData.filter(app => 
            app.scholarship.amount !== null && app.scholarship.amount >= (filters.amount[0] || 0)
          );
        }

        if (filters.amount[1] !== null) {
          filteredData = filteredData.filter(app => 
            app.scholarship.amount !== null && app.scholarship.amount <= (filters.amount[1] || 100000)
          );
        }

        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          filteredData = filteredData.filter(app => 
            app.scholarship.title.toLowerCase().includes(query) || 
            app.scholarship.provider.toLowerCase().includes(query)
          );
        }

        setApplications(filteredData as Application[]);
      } catch (error) {
        console.error('Error fetching applications:', error);
        toast({
          title: 'Error fetching applications',
          description: 'Failed to fetch your scholarship applications',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [filters, searchQuery, toast]);

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      case 'pending':
      default:
        return <Badge variant="outline" className="text-amber-600">Pending Review</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <div className="flex justify-between">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-24" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <Card className="text-center p-8">
        <CardTitle className="text-lg mb-2">No Applications Found</CardTitle>
        <CardDescription className="mb-6">
          You haven't applied to any scholarships yet or your applications don't match the current filters.
        </CardDescription>
        <Button variant="outline">View Available Scholarships</Button>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {applications.map((application) => (
          <Card key={application.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{application.scholarship.title}</CardTitle>
                {getStatusBadge(application.status)}
              </div>
              <CardDescription>{application.scholarship.provider}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Applied:</span>{' '}
                    {format(new Date(application.submitted_at), 'MMM d, yyyy')}
                  </div>
                  {application.scholarship.amount && (
                    <Badge variant="secondary">
                      {application.scholarship.amount.toLocaleString()} {application.scholarship.currency}
                    </Badge>
                  )}
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedApplication(application)}
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Application Details Dialog */}
      {selectedApplication && (
        <Dialog open={!!selectedApplication} onOpenChange={() => setSelectedApplication(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Application Details</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 py-2">
              <div>
                <h3 className="font-medium text-lg">{selectedApplication.scholarship.title}</h3>
                <p className="text-muted-foreground">{selectedApplication.scholarship.provider}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                  {getStatusBadge(selectedApplication.status)}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Application Date</h4>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{format(new Date(selectedApplication.submitted_at), 'MMM d, yyyy')}</span>
                  </div>
                </div>
                {selectedApplication.scholarship.amount && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Amount</h4>
                    <p>{selectedApplication.scholarship.amount.toLocaleString()} {selectedApplication.scholarship.currency}</p>
                  </div>
                )}
                {selectedApplication.scholarship.application_deadline && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Deadline</h4>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{format(new Date(selectedApplication.scholarship.application_deadline), 'MMM d, yyyy')}</span>
                    </div>
                  </div>
                )}
              </div>
              
              {selectedApplication.status.toLowerCase() === 'pending' && (
                <div className="bg-yellow-50 p-3 rounded flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-800">Application is under review</p>
                    <p className="text-sm text-yellow-700">
                      The provider is currently reviewing your application. You will be notified when there's an update.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
