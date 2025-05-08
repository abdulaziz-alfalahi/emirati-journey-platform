
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

// Enhanced camp image mapping based on category and subcategories
const campImages = {
  'Technology': {
    default: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b', // Laptop
    'Coding': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085', // Code on screen
    'Robotics': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e', // Robot
    'Game Development': 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5' // Gaming setup
  },
  'Science': {
    default: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d', // Science lab
    'Chemistry': 'https://images.unsplash.com/photo-1617791160536-598cf32026fb', // Chemistry lab
    'Biology': 'https://images.unsplash.com/photo-1576086213369-97a306d36557', // Biology specimens
    'Physics': 'https://images.unsplash.com/photo-1636466497217-06a74db567f7' // Physics equipment
  },
  'Arts': {
    default: 'https://images.unsplash.com/photo-1500673922987-e212871fec22', // Yellow lights, artistic
    'Visual Arts': 'https://images.unsplash.com/photo-1513364776144-60967b0f800f', // Art supplies
    'Performing Arts': 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad', // Theater stage
    'Music': 'https://images.unsplash.com/photo-1511379938547-c1f69419868d' // Music instruments
  },
  'Leadership': {
    default: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e', // Mountain landscape
    'Public Speaking': 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2', // Speaking podium
    'Entrepreneurship': 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a', // Business meeting
    'Team Building': 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca' // Team activity
  },
  'Sports': {
    default: 'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3', // Mountain with grass
    'Soccer': 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55', // Soccer field
    'Swimming': 'https://images.unsplash.com/photo-1576013551627-0ae7d1d192c7', // Swimming pool
    'Basketball': 'https://images.unsplash.com/photo-1546519638-68e109498ffc' // Basketball court
  },
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

  // Get camp image based on camp category, title, and description
  const getCampImage = (camp: SummerCamp): string => {
    // First check if the category exists
    if (!camp.category || !campImages[camp.category as keyof typeof campImages]) {
      return campImages.default;
    }
    
    const categoryImages = campImages[camp.category as keyof typeof campImages];
    
    // If the category exists but is just a string (not an object with subcategories)
    if (typeof categoryImages === 'string') {
      return categoryImages;
    }
    
    // Look for keywords in the title and description to determine the best subcategory image
    const content = (camp.title + ' ' + camp.description).toLowerCase();
    
    // Check for specific subcategory keywords
    for (const [subCategory, imageUrl] of Object.entries(categoryImages)) {
      if (subCategory !== 'default' && content.includes(subCategory.toLowerCase())) {
        return imageUrl;
      }
    }
    
    // Fall back to the default image for this category
    return categoryImages.default || campImages.default;
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
