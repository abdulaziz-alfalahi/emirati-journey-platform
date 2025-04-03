
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CalendarIcon, 
  Users, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  PlusCircle, 
  ExternalLink,
  Pencil,
  Trash2
} from 'lucide-react';
import { format } from 'date-fns';
import { 
  getScholarshipsWithApplicationCounts, 
  updateApplicationStatus,
  getApplicationsByScholarship
} from '@/services/scholarshipService';
import { useAuth } from '@/context/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
import { Scholarship, ScholarshipWithApplications, Application } from '@/types/scholarships';
import { useToast } from '@/components/ui/use-toast';

interface ScholarshipsManageProps {
  onOpenCreateDialog: () => void;
  filters: {
    providerType: string[];
    amount: [number | null, number | null];
  };
  searchQuery: string;
}

export const ScholarshipsManage: React.FC<ScholarshipsManageProps> = ({ 
  onOpenCreateDialog,
  filters,
  searchQuery 
}) => {
  const [scholarships, setScholarships] = useState<ScholarshipWithApplications[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  
  const fetchScholarships = useCallback(async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      let data = await getScholarshipsWithApplicationCounts(user.id);
      
      // Apply filters
      // Filter by provider type
      if (filters.providerType && filters.providerType.length > 0) {
        data = data.filter(s => filters.providerType.includes(s.provider_type));
      }
      
      // Filter by amount range
      if (filters.amount && (filters.amount[0] !== null || filters.amount[1] !== null)) {
        data = data.filter(s => {
          if (s.amount === undefined) return false;
          
          const min = filters.amount[0] ?? 0;
          const max = filters.amount[1] ?? Infinity;
          return s.amount >= min && s.amount <= max;
        });
      }
      
      // Filter by search query
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        data = data.filter(s => 
          s.title.toLowerCase().includes(searchLower) || 
          (s.description && s.description.toLowerCase().includes(searchLower)) ||
          s.provider.toLowerCase().includes(searchLower)
        );
      }
      
      setScholarships(data);
    } catch (error) {
      console.error('Error fetching scholarships:', error);
      toast({
        title: "Failed to load scholarships",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [user, filters, searchQuery, toast]);
  
  useEffect(() => {
    fetchScholarships();
  }, [fetchScholarships]);

  const viewApplications = async (scholarship: Scholarship) => {
    setSelectedScholarship(scholarship);
    
    try {
      const applications = await getApplicationsByScholarship(scholarship.id);
      setApplications(applications);
      setIsViewDialogOpen(true);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast({
        title: "Failed to load applications",
        description: "Could not fetch application details",
        variant: "destructive"
      });
    }
  };

  const handleUpdateStatus = async (applicationId: string, status: 'approved' | 'rejected') => {
    try {
      await updateApplicationStatus(applicationId, status);
      
      // Update the local state
      setApplications(applications.map(app => 
        app.id === applicationId ? { ...app, status } : app
      ));
      
      // Refresh the scholarships to update the counts
      fetchScholarships();
      
      toast({
        title: "Status updated",
        description: `Application ${status === 'approved' ? 'approved' : 'rejected'} successfully`,
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Failed to update status",
        description: "Please try again later",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20 w-full" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (scholarships.length === 0) {
    return (
      <div className="text-center py-12">
        <PlusCircle className="h-12 w-12 mx-auto text-gray-400" />
        <h3 className="mt-4 text-xl font-medium">No scholarships found</h3>
        <p className="mt-2 text-gray-500">
          Create your first scholarship to get started
        </p>
        <Button onClick={onOpenCreateDialog} className="mt-4">
          <PlusCircle className="h-4 w-4 mr-2" />
          Create Scholarship
        </Button>
      </div>
    );
  }

  const getApplicationStatusCounts = (applications: { pending: number; approved: number; rejected: number; total: number }) => {
    return (
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4 text-yellow-500" />
          <span className="text-sm">{applications.pending} pending</span>
        </div>
        <div className="flex items-center gap-1">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <span className="text-sm">{applications.approved} approved</span>
        </div>
        <div className="flex items-center gap-1">
          <XCircle className="h-4 w-4 text-red-500" />
          <span className="text-sm">{applications.rejected} rejected</span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={onOpenCreateDialog}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Create Scholarship
        </Button>
      </div>
      
      <div className="space-y-4">
        {scholarships.map((scholarship) => (
          <Card key={scholarship.id}>
            <CardHeader>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <CardTitle>{scholarship.title}</CardTitle>
                  <CardDescription>{scholarship.provider}</CardDescription>
                </div>
                <Badge variant={scholarship.is_active ? "default" : "secondary"}>
                  {scholarship.is_active ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">{scholarship.applications.total} applications</span>
                  </div>
                  {getApplicationStatusCounts(scholarship.applications)}
                </div>
                
                <div className="text-right">
                  <div className="font-semibold">
                    {scholarship.amount !== undefined ? new Intl.NumberFormat('en-AE', {
                      style: 'currency',
                      currency: scholarship.currency || 'AED',
                      maximumFractionDigits: 0
                    }).format(scholarship.amount) : 'Variable amount'}
                  </div>
                  
                  {scholarship.application_deadline && (
                    <div className="flex items-center justify-end gap-1 text-sm text-muted-foreground mt-1">
                      <CalendarIcon className="h-4 w-4" />
                      <span>Closes {format(new Date(scholarship.application_deadline), 'MMMM d, yyyy')}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-2">
                {scholarship.website_url && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={scholarship.website_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Website
                    </a>
                  </Button>
                )}
                
                <Button variant="outline" size="sm">
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
                
                <Button variant="default" size="sm" onClick={() => viewApplications(scholarship)}>
                  <Users className="h-4 w-4 mr-1" />
                  View Applications
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {selectedScholarship && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Applications for {selectedScholarship.title}</DialogTitle>
              <DialogDescription>
                Manage applications for this scholarship
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              {applications.length === 0 ? (
                <div className="text-center py-6">
                  <p>No applications received yet</p>
                </div>
              ) : (
                applications.map((app) => (
                  <Card key={app.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">Application #{app.id.substring(0, 8)}</p>
                          <p className="text-sm text-muted-foreground">
                            Submitted: {format(new Date(app.submitted_at), 'MMMM d, yyyy')}
                          </p>
                        </div>
                        <Badge className={
                          app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          app.status === 'approved' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }>
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardFooter className="pt-2">
                      <div className="flex justify-end space-x-2 w-full">
                        {app.status === 'pending' && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-red-200 text-red-700 hover:bg-red-50"
                              onClick={() => handleUpdateStatus(app.id, 'rejected')}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                            <Button 
                              variant="outline"
                              size="sm"
                              className="border-green-200 text-green-700 hover:bg-green-50"
                              onClick={() => handleUpdateStatus(app.id, 'approved')}
                            >
                              <CheckCircle2 className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                          </>
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
