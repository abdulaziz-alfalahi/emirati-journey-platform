
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, School, Bookmark, BookmarkCheck, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';
import { Scholarship } from '@/types/scholarships';
import { getScholarships, applyForScholarship } from '@/services/scholarshipService';
import { useAuth } from '@/context/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';

interface ScholarshipsListProps {
  type: 'available' | 'applied' | 'managed';
  filters: {
    providerType: string[];
    amount: [number | null, number | null];
  };
  searchQuery: string;
  canApply?: boolean;
}

export const ScholarshipsList: React.FC<ScholarshipsListProps> = ({ 
  type, 
  filters, 
  searchQuery,
  canApply = true
}) => {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [appliedScholarships, setAppliedScholarships] = useState<string[]>([]);
  const { toast } = useToast();
  const { user } = useAuth();
  
  useEffect(() => {
    const fetchScholarships = async () => {
      setIsLoading(true);
      try {
        const data = await getScholarships({
          providerType: filters.providerType,
          amount: filters.amount,
          search: searchQuery
        });
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
    };
    
    fetchScholarships();
  }, [filters, searchQuery, toast]);

  const handleApply = async (scholarshipId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to apply for scholarships",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await applyForScholarship(scholarshipId, user.id);
      setAppliedScholarships([...appliedScholarships, scholarshipId]);
      toast({
        title: "Application submitted",
        description: "Your scholarship application has been submitted successfully",
        variant: "default"
      });
    } catch (error) {
      console.error('Error applying for scholarship:', error);
      toast({
        title: "Application failed",
        description: "There was an error submitting your application",
        variant: "destructive"
      });
    }
  };

  const formatCurrency = (amount?: number, currency: string = 'AED') => {
    if (amount === undefined) return 'Variable';
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getProviderTypeColor = (type: string) => {
    switch (type) {
      case 'government':
        return 'bg-green-100 text-green-800';
      case 'private_sector':
        return 'bg-blue-100 text-blue-800';
      case 'university':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="pb-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20 w-full" />
              <div className="flex gap-2 mt-4">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
              </div>
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
        <School className="h-12 w-12 mx-auto text-gray-400" />
        <h3 className="mt-4 text-xl font-medium">No scholarships found</h3>
        <p className="mt-2 text-gray-500">
          Try adjusting your filters or search criteria
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {scholarships.map((scholarship) => (
        <Card key={scholarship.id}>
          <CardHeader>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <CardTitle>{scholarship.title}</CardTitle>
                <CardDescription>{scholarship.provider}</CardDescription>
              </div>
              <Badge className={getProviderTypeColor(scholarship.provider_type)}>
                {scholarship.provider_type.replace('_', ' ')}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">{scholarship.description}</p>
            
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center">
                <span className="font-semibold text-lg">
                  {formatCurrency(scholarship.amount, scholarship.currency)}
                </span>
              </div>
              
              {scholarship.application_deadline && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Deadline: {format(new Date(scholarship.application_deadline), 'MMMM d, yyyy')}</span>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex gap-2">
              {scholarship.website_url && (
                <Button variant="outline" size="sm" asChild>
                  <a href={scholarship.website_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Details
                  </a>
                </Button>
              )}
            </div>
            
            {canApply && (
              appliedScholarships.includes(scholarship.id) ? (
                <Button disabled className="gap-2">
                  <BookmarkCheck className="h-4 w-4" />
                  Applied
                </Button>
              ) : (
                <Button onClick={() => handleApply(scholarship.id)} className="gap-2">
                  <Bookmark className="h-4 w-4" />
                  Apply Now
                </Button>
              )
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
