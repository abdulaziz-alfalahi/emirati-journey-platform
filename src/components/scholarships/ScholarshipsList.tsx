
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, GraduationCap, School, Building, ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

interface ScholarshipsListProps {
  type: 'available';
  filters: {
    providerType: string[];
    amount: [number | null, number | null];
  };
  searchQuery: string;
  canApply: boolean;
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
  eligibility_criteria: Record<string, any> | null;
  requirements: string[] | null;
  website_url: string | null;
}

export const ScholarshipsList: React.FC<ScholarshipsListProps> = ({ 
  type, 
  filters, 
  searchQuery,
  canApply
}) => {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchScholarships = async () => {
      setLoading(true);
      try {
        let query = supabase.from('scholarships').select('*').eq('is_active', true);

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
      } catch (error) {
        console.error('Error fetching scholarships:', error);
        toast({
          title: 'Error fetching scholarships',
          description: 'Failed to fetch scholarships',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, [filters, searchQuery, toast]);

  const handleApply = async () => {
    if (!selectedScholarship) return;

    setIsApplying(true);
    try {
      const { error } = await supabase
        .from('scholarship_applications')
        .insert({
          scholarship_id: selectedScholarship.id,
          student_id: (await supabase.auth.getUser()).data.user?.id,
          application_data: { submitted_from: 'web' },
        });

      if (error) {
        console.error('Error applying for scholarship:', error);
        toast({
          title: 'Application Failed',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Application Submitted',
        description: 'Your scholarship application has been submitted successfully.',
      });
      
      setIsApplyDialogOpen(false);
    } catch (error) {
      console.error('Error applying for scholarship:', error);
      toast({
        title: 'Application Failed',
        description: 'There was a problem submitting your application.',
        variant: 'destructive',
      });
    } finally {
      setIsApplying(false);
    }
  };

  const getProviderIcon = (type: string) => {
    switch (type) {
      case 'government':
        return <School className="h-4 w-4" />;
      case 'university':
        return <GraduationCap className="h-4 w-4" />;
      case 'private_sector':
        return <Building className="h-4 w-4" />;
      default:
        return <School className="h-4 w-4" />;
    }
  };

  const getProviderLabel = (type: string) => {
    switch (type) {
      case 'government':
        return 'Government';
      case 'university':
        return 'University';
      case 'private_sector':
        return 'Private Sector';
      default:
        return type;
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
              <Skeleton className="h-20 w-full mb-4" />
              <div className="flex space-x-2">
                <Skeleton className="h-6 w-20" />
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
        <CardTitle className="mb-2">No Scholarships Found</CardTitle>
        <CardDescription>
          No scholarships match your current search criteria. Try adjusting your filters.
        </CardDescription>
      </Card>
    );
  }

  return (
    <div>
      <div className="space-y-4">
        {scholarships.map((scholarship) => (
          <Card key={scholarship.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{scholarship.title}</CardTitle>
                <Badge variant="outline" className="flex items-center gap-1">
                  {getProviderIcon(scholarship.provider_type)}
                  {getProviderLabel(scholarship.provider_type)}
                </Badge>
              </div>
              <CardDescription>{scholarship.provider}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">{scholarship.description}</p>
              <div className="flex flex-wrap gap-2">
                {scholarship.amount && (
                  <Badge variant="secondary" className="font-semibold">
                    {scholarship.amount.toLocaleString()} {scholarship.currency}
                  </Badge>
                )}
                {scholarship.application_deadline && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Deadline: {format(new Date(scholarship.application_deadline), 'MMM d, yyyy')}
                  </Badge>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline"
                size="sm"
                onClick={() => setSelectedScholarship(scholarship)}
              >
                View Details
              </Button>
              
              {canApply && (
                <Button 
                  size="sm" 
                  onClick={() => {
                    setSelectedScholarship(scholarship);
                    setIsApplyDialogOpen(true);
                  }}
                >
                  Apply Now
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Scholarship Details Dialog */}
      {selectedScholarship && (
        <Dialog open={!!selectedScholarship && !isApplyDialogOpen} onOpenChange={() => setSelectedScholarship(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-xl">{selectedScholarship.title}</DialogTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="flex items-center gap-1">
                  {getProviderIcon(selectedScholarship.provider_type)}
                  {getProviderLabel(selectedScholarship.provider_type)}
                </Badge>
                <span className="text-sm text-muted-foreground">by {selectedScholarship.provider}</span>
              </div>
            </DialogHeader>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-sm text-muted-foreground">{selectedScholarship.description}</p>
                
                <h3 className="font-medium mt-4 mb-2">Amount</h3>
                <p className="text-xl font-semibold">
                  {selectedScholarship.amount ? 
                    `${selectedScholarship.amount.toLocaleString()} ${selectedScholarship.currency}` : 
                    'Varies based on program'
                  }
                </p>
                
                {selectedScholarship.application_deadline && (
                  <>
                    <h3 className="font-medium mt-4 mb-2">Application Deadline</h3>
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      {format(new Date(selectedScholarship.application_deadline), 'MMMM d, yyyy')}
                    </div>
                  </>
                )}
              </div>
              
              <div>
                {selectedScholarship.eligibility_criteria && (
                  <>
                    <h3 className="font-medium mb-2">Eligibility Criteria</h3>
                    <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                      {Object.entries(selectedScholarship.eligibility_criteria).map(([key, value]) => (
                        <li key={key}>
                          <span className="font-medium">{key}:</span> {value?.toString()}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                
                {selectedScholarship.requirements && selectedScholarship.requirements.length > 0 && (
                  <>
                    <h3 className="font-medium mt-4 mb-2">Requirements</h3>
                    <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                      {selectedScholarship.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>

            <DialogFooter className="flex justify-between items-center mt-4">
              {selectedScholarship.website_url && (
                <Button variant="outline" size="sm" asChild>
                  <a href={selectedScholarship.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    Visit Website
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}
              
              {canApply && (
                <Button onClick={() => setIsApplyDialogOpen(true)}>
                  Apply for Scholarship
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Apply Dialog */}
      <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apply for Scholarship</DialogTitle>
            <DialogDescription>
              You're applying for {selectedScholarship?.title}. This will submit a basic application to the provider.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              By submitting this application, you agree to be contacted by {selectedScholarship?.provider} regarding your scholarship application.
            </p>

            <p className="text-sm text-muted-foreground">
              The provider may request additional information or documents to complete your application.
            </p>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApplyDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleApply} disabled={isApplying}>
              {isApplying ? 'Submitting...' : 'Submit Application'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
