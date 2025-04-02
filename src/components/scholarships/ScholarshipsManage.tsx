
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, PlusCircle, Users, Settings, ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface ScholarshipsManageProps {
  onOpenCreateDialog: () => void;
  filters: {
    providerType: string[];
    amount: [number | null, number | null];
  };
  searchQuery: string;
}

interface Scholarship {
  id: string;
  title: string;
  provider: string;
  provider_type: string;
  description: string | null;
  amount: number | null;
  currency: string;
  application_deadline: string | null;
  is_active: boolean;
  _applicant_count?: number;
}

interface ApplicationSummary {
  scholarship_id: string;
  pending_count: number;
  approved_count: number;
  rejected_count: number;
  total_count: number;
}

export const ScholarshipsManage: React.FC<ScholarshipsManageProps> = ({ 
  onOpenCreateDialog, 
  filters,
  searchQuery
}) => {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [applicationStats, setApplicationStats] = useState<Record<string, ApplicationSummary>>({});
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchScholarships = async () => {
      setLoading(true);
      try {
        const { data: user } = await supabase.auth.getUser();
        
        let query = supabase
          .from('scholarships')
          .select('*')
          .eq('created_by', user.user?.id || '');

        // Apply filters
        if (filters.providerType.length > 0) {
          query = query.in('provider_type', filters.providerType);
        }

        if (filters.amount[0] !== null) {
          query = query.gte('amount', filters.amount[0]);
        }

        if (filters.amount[1] !== null) {
          query = query.lte('amount', filters.amount[1]);
        }

        if (searchQuery) {
          query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,provider.ilike.%${searchQuery}%`);
        }

        const { data, error } = await query;

        if (error) {
          console.error('Error fetching scholarships:', error);
          toast({
            title: 'Error fetching scholarships',
            description: error.message,
            variant: 'destructive',
          });
          return;
        }

        setScholarships(data || []);
        
        // Fetch application statistics for each scholarship
        if (data && data.length > 0) {
          const scholarshipIds = data.map(s => s.id);
          
          const { data: appStats, error: appStatsError } = await supabase
            .from('scholarship_applications')
            .select('scholarship_id, status')
            .in('scholarship_id', scholarshipIds);
            
          if (appStatsError) {
            console.error('Error fetching application statistics:', appStatsError);
          } else if (appStats) {
            // Process application stats
            const stats: Record<string, ApplicationSummary> = {};
            
            scholarshipIds.forEach(id => {
              stats[id] = {
                scholarship_id: id,
                pending_count: 0,
                approved_count: 0,
                rejected_count: 0,
                total_count: 0
              };
            });
            
            appStats.forEach(app => {
              const scholarshipId = app.scholarship_id;
              stats[scholarshipId].total_count += 1;
              
              if (app.status === 'pending') stats[scholarshipId].pending_count += 1;
              else if (app.status === 'approved') stats[scholarshipId].approved_count += 1;
              else if (app.status === 'rejected') stats[scholarshipId].rejected_count += 1;
            });
            
            setApplicationStats(stats);
          }
        }
      } catch (error) {
        console.error('Error fetching scholarships:', error);
        toast({
          title: 'Error fetching scholarships',
          description: 'Failed to fetch your scholarships',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, [filters, searchQuery, toast]);

  const toggleScholarshipStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('scholarships')
        .update({ is_active: !currentStatus })
        .eq('id', id);
        
      if (error) throw error;
      
      // Update local state
      setScholarships(scholarships.map(scholarship => 
        scholarship.id === id 
          ? { ...scholarship, is_active: !currentStatus } 
          : scholarship
      ));
      
      toast({
        title: `Scholarship ${!currentStatus ? 'activated' : 'deactivated'}`,
        description: `The scholarship has been ${!currentStatus ? 'activated' : 'deactivated'} successfully.`,
      });
    } catch (error) {
      console.error('Error toggling scholarship status:', error);
      toast({
        title: 'Error updating scholarship',
        description: 'Failed to update scholarship status.',
        variant: 'destructive',
      });
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

  if (scholarships.length === 0) {
    return (
      <Card className="text-center p-8">
        <CardTitle className="text-lg mb-2">No Scholarships Found</CardTitle>
        <CardDescription className="mb-6">
          You haven't created any scholarships yet or they don't match your current filters.
        </CardDescription>
        <Button onClick={onOpenCreateDialog}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Create New Scholarship
        </Button>
      </Card>
    );
  }

  return (
    <>
      <div className="mb-4">
        <Button onClick={onOpenCreateDialog}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Create New Scholarship
        </Button>
      </div>

      <div className="space-y-4">
        {scholarships.map((scholarship) => {
          const stats = applicationStats[scholarship.id] || {
            total_count: 0,
            pending_count: 0
          };
          
          return (
            <Card key={scholarship.id} className={scholarship.is_active ? '' : 'opacity-70'}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{scholarship.title}</CardTitle>
                    <CardDescription>{scholarship.provider}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`active-${scholarship.id}`} className="text-sm">
                        {scholarship.is_active ? 'Active' : 'Inactive'}
                      </Label>
                      <Switch
                        id={`active-${scholarship.id}`}
                        checked={scholarship.is_active}
                        onCheckedChange={() => toggleScholarshipStatus(scholarship.id, scholarship.is_active)}
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap justify-between items-center gap-4">
                  <div className="flex flex-wrap gap-3">
                    {scholarship.application_deadline && (
                      <Badge variant="outline" className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        Deadline: {format(new Date(scholarship.application_deadline), 'MMM d, yyyy')}
                      </Badge>
                    )}
                    {scholarship.amount && (
                      <Badge variant="secondary">
                        {scholarship.amount.toLocaleString()} {scholarship.currency}
                      </Badge>
                    )}
                    <Badge variant="outline" className="flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      {stats.total_count} Application{stats.total_count !== 1 ? 's' : ''}
                    </Badge>
                    {stats.pending_count > 0 && (
                      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                        {stats.pending_count} Pending
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setSelectedScholarship(scholarship)}
                    >
                      <Settings className="h-4 w-4 mr-1" />
                      Manage
                    </Button>
                    {scholarship.website_url && (
                      <Button variant="ghost" size="sm" asChild>
                        <a href={scholarship.website_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">Visit Website</span>
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Scholarship Management Dialog */}
      {selectedScholarship && (
        <Dialog open={!!selectedScholarship} onOpenChange={setSelectedScholarship}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Manage Scholarship</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 py-2">
              <div>
                <h3 className="font-medium text-lg">{selectedScholarship.title}</h3>
                <p className="text-muted-foreground">{selectedScholarship.provider}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium">Status</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Switch
                      id={`dialog-active-${selectedScholarship.id}`}
                      checked={selectedScholarship.is_active}
                      onCheckedChange={() => {
                        toggleScholarshipStatus(selectedScholarship.id, selectedScholarship.is_active);
                        setSelectedScholarship({
                          ...selectedScholarship,
                          is_active: !selectedScholarship.is_active
                        });
                      }}
                    />
                    <Label htmlFor={`dialog-active-${selectedScholarship.id}`}>
                      {selectedScholarship.is_active ? 'Active' : 'Inactive'}
                    </Label>
                  </div>
                </div>

                {selectedScholarship.application_deadline && (
                  <div>
                    <h4 className="text-sm font-medium">Application Deadline</h4>
                    <p className="mt-1 flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {format(new Date(selectedScholarship.application_deadline), 'MMMM d, yyyy')}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Applications Summary</h4>
                <div className="bg-muted p-4 rounded">
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold">{applicationStats[selectedScholarship.id]?.total_count || 0}</p>
                      <p className="text-xs text-muted-foreground">Total Applications</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-amber-600">
                        {applicationStats[selectedScholarship.id]?.pending_count || 0}
                      </p>
                      <p className="text-xs text-muted-foreground">Pending</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">
                        {applicationStats[selectedScholarship.id]?.approved_count || 0}
                      </p>
                      <p className="text-xs text-muted-foreground">Approved</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-red-600">
                        {applicationStats[selectedScholarship.id]?.rejected_count || 0}
                      </p>
                      <p className="text-xs text-muted-foreground">Rejected</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline">Edit Details</Button>
                <Button>View Applications</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
