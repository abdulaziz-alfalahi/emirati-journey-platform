
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Users, MapPin, Clock, School } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';
import { SummerCamp, CampFilters } from '@/types/summerCamps';
import { getCamps, getUserEnrollments, enrollInCamp, cancelEnrollment, getCampsByInstitution } from '@/services/summerCampService';
import { format } from 'date-fns';

// Camp image mapping based on category
const campImages = {
  'Technology': 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9', // Pine trees
  'Science': 'https://images.unsplash.com/photo-1433086966358-54859d0ed716', // Waterfall
  'Arts': 'https://images.unsplash.com/photo-1500673922987-e212871fec22', // Yellow lights between trees
  'Leadership': 'https://images.unsplash.com/photo-1469474968028-56623f02e42e', // Mountain landscape
  'Sports': 'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3', // Mountain with grass
  'default': 'https://images.unsplash.com/photo-1501854140801-50d01698950b' // Bird's eye view of green mountains
};

interface CampsListProps {
  type: "available" | "registered" | "managed";
  filters: CampFilters;
  searchQuery: string;
}

const CampsList: React.FC<CampsListProps> = ({ type, filters, searchQuery }) => {
  const { user } = useAuth();
  const [camps, setCamps] = useState<SummerCamp[]>([]);
  const [enrolledCamps, setEnrolledCamps] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  // Combine filters into the format expected by the service
  const combinedFilters: CampFilters = {
    ...filters,
    searchQuery
  };
  
  useEffect(() => {
    const fetchCamps = async () => {
      setLoading(true);
      try {
        if (type === "available") {
          const fetchedCamps = await getCamps(combinedFilters);
          setCamps(fetchedCamps);
        } else if (type === "registered" && user) {
          const enrollments = await getUserEnrollments(user.id);
          setEnrolledCamps(
            enrollments.reduce((acc, enrollment) => {
              if (enrollment.camp) {
                acc[enrollment.camp.id] = enrollment.id;
              }
              return acc;
            }, {} as Record<string, string>)
          );
          
          setCamps(enrollments.map(e => e.camp).filter(Boolean) as SummerCamp[]);
        } else if (type === "managed" && user) {
          const managedCamps = await getCampsByInstitution(user.id);
          setCamps(managedCamps);
        }
      } catch (error) {
        console.error("Error fetching camps:", error);
        toast({
          title: "Error",
          description: "Failed to load summer camps. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCamps();
  }, [type, user, JSON.stringify(combinedFilters)]);

  // Get camp image based on camp category or use default
  const getCampImage = (camp: SummerCamp): string => {
    if (camp.category && campImages[camp.category as keyof typeof campImages]) {
      return campImages[camp.category as keyof typeof campImages];
    }
    return campImages.default;
  };

  const handleEnroll = async (campId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to enroll in a camp.",
        variant: "destructive",
      });
      return;
    }

    const result = await enrollInCamp(campId, user.id);
    if (result) {
      // Refresh the available camps list to show updated enrollment counts
      if (type === "available") {
        const updatedCamps = await getCamps(combinedFilters);
        setCamps(updatedCamps);
      }
    }
  };

  const handleCancelEnrollment = async (campId: string) => {
    if (!user || !enrolledCamps[campId]) return;
    
    const result = await cancelEnrollment(enrolledCamps[campId], campId);
    if (result) {
      // Refresh the registered camps list
      const enrollments = await getUserEnrollments(user.id);
      setCamps(enrollments.map(e => e.camp).filter(Boolean) as SummerCamp[]);
      setEnrolledCamps(
        enrollments.reduce((acc, enrollment) => {
          if (enrollment.camp) {
            acc[enrollment.camp.id] = enrollment.id;
          }
          return acc;
        }, {} as Record<string, string>)
      );
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          <div className="flex justify-center items-center h-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
          <h3 className="mt-4 text-lg font-medium">Loading camps...</h3>
        </CardContent>
      </Card>
    );
  }
  
  if (camps.length === 0) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          <School className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium">No camps found</h3>
          <p className="text-sm text-muted-foreground mt-2">
            {type === "available" ? 
              "No available camps match your filters. Try adjusting your search criteria." :
              type === "registered" ?
              "You haven't registered for any summer camps yet." :
              "You aren't managing any summer camps yet."
            }
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      {camps.map(camp => (
        <Card key={camp.id}>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 h-48 md:h-auto overflow-hidden bg-gray-100">
              <img 
                src={camp.image_url || getCampImage(camp)} 
                alt={camp.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-3/4">
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge>{camp.category}</Badge>
                  <Badge variant="outline">{camp.age_group} years</Badge>
                </div>
                <CardTitle>{camp.title}</CardTitle>
                <CardDescription>{camp.organizer}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{camp.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>
                      {format(new Date(camp.start_date), 'MMM d, yyyy')} - {format(new Date(camp.end_date), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{camp.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{camp.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{camp.enrolled}/{camp.capacity} enrolled</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="font-semibold text-lg">{camp.price} AED</div>
                {type === "available" ? (
                  <Button 
                    onClick={() => handleEnroll(camp.id)}
                    disabled={camp.enrolled >= camp.capacity}
                  >
                    {camp.enrolled >= camp.capacity ? "Fully Booked" : "Register Now"}
                  </Button>
                ) : type === "registered" ? (
                  <div className="flex gap-2">
                    <Button variant="outline">View Details</Button>
                    <Button 
                      variant="destructive"
                      onClick={() => handleCancelEnrollment(camp.id)}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline">Edit Camp</Button>
                    <Button>Manage Enrollments</Button>
                  </div>
                )}
              </CardFooter>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CampsList;
