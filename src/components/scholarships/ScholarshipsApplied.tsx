import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, ExternalLink, Bookmark, Download, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { Application } from '@/types/scholarships';
import { getUserApplications } from '@/services/scholarshipService';
import { useAuth } from '@/context/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';

interface ScholarshipsAppliedProps {
  filters: {
    providerType: string[];
    amount: [number | null, number | null];
  };
  searchQuery: string;
}

export const ScholarshipsApplied: React.FC<ScholarshipsAppliedProps> = ({ 
  filters, 
  searchQuery 
}) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchApplications = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        // Changed from getApplicationsByUser to getUserApplications
        const data = await getUserApplications(user.id);
        
        // Apply filters
        let filtered = data;
        
        // Filter by provider type
        if (filters.providerType && filters.providerType.length > 0) {
          filtered = filtered.filter(a => 
            a.scholarship && filters.providerType.includes(a.scholarship.provider_type)
          );
        }
        
        // Filter by amount range
        if (filters.amount && (filters.amount[0] !== null || filters.amount[1] !== null)) {
          filtered = filtered.filter(a => {
            if (!a.scholarship || a.scholarship.amount === undefined) return false;
            
            const min = filters.amount[0] ?? 0;
            const max = filters.amount[1] ?? Infinity;
            return a.scholarship.amount >= min && a.scholarship.amount <= max;
          });
        }
        
        // Filter by search query
        if (searchQuery) {
          const searchLower = searchQuery.toLowerCase();
          filtered = filtered.filter(a => 
            a.scholarship && (
              a.scholarship.title.toLowerCase().includes(searchLower) || 
              (a.scholarship.description && a.scholarship.description.toLowerCase().includes(searchLower)) ||
              a.scholarship.provider.toLowerCase().includes(searchLower)
            )
          );
        }
        
        setApplications(filtered);
      } catch (error) {
        console.error('Error fetching applications:', error);
        toast({
          title: "Failed to load applications",
          description: "Please try again later",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchApplications();
  }, [user, filters, searchQuery, toast]);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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

  if (applications.length === 0) {
    return (
      <div className="text-center py-12">
        <Bookmark className="h-12 w-12 mx-auto text-gray-400" />
        <h3 className="mt-4 text-xl font-medium">No applications found</h3>
        <p className="mt-2 text-gray-500">
          You haven't applied for any scholarships yet that match your filters
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {applications.map((application) => (
        application.scholarship && (
          <Card key={application.id}>
            <CardHeader>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <CardTitle>{application.scholarship.title}</CardTitle>
                  <CardDescription>{application.scholarship.provider}</CardDescription>
                </div>
                <Badge className={getStatusBadgeColor(application.status)}>
                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Applied: {format(new Date(application.submitted_at), 'MMMM d, yyyy')}</span>
              </div>
              
              {application.scholarship.application_deadline && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Deadline: {format(new Date(application.scholarship.application_deadline), 'MMMM d, yyyy')}</span>
                </div>
              )}
              
              {application.status === 'pending' && (
                <p className="text-sm font-medium text-yellow-600">
                  Your application is being reviewed
                </p>
              )}
              
              {application.status === 'approved' && (
                <p className="text-sm font-medium text-green-600">
                  Congratulations! Your application has been approved
                </p>
              )}
              
              {application.status === 'rejected' && (
                <p className="text-sm font-medium text-red-600">
                  Unfortunately, your application was not selected
                </p>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-2">
                {application.scholarship.website_url && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={application.scholarship.website_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Details
                    </a>
                  </Button>
                )}
              </div>
              
              {application.status === 'approved' && (
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-1" />
                  Download Certificate
                </Button>
              )}
            </CardFooter>
          </Card>
        )
      ))}
    </div>
  );
};
