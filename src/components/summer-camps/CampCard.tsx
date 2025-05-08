
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Users, MapPin, Clock } from 'lucide-react';
import { SummerCamp } from '@/types/summerCamps';
import { format } from 'date-fns';
import { getCampImage } from './utils/campImageMapping';

interface CampCardProps {
  camp: SummerCamp;
  type: "available" | "registered" | "managed";
  onEnroll?: (campId: string) => void;
  onCancel?: (campId: string) => void;
  isEnrolled?: boolean;
}

const CampCard: React.FC<CampCardProps> = ({ 
  camp, 
  type, 
  onEnroll, 
  onCancel,
  isEnrolled 
}) => {
  // Apply the name and location change for the specific camp
  const displayCamp = {
    ...camp,
    title: camp.title === "Tech Innovators Summer Camp" ? "Emirates Masar Program" : camp.title,
    location: camp.title === "Tech Innovators Summer Camp" ? "Dubai" : camp.location
  };
  
  // Get the image URL, ensuring it has a fallback
  const imageUrl = displayCamp.image_url || getCampImage(displayCamp);
  
  // Add error handler for images with better fallback chain
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error("Image failed to load:", e.currentTarget.src);
    
    // Set a default landscape image as fallback
    e.currentTarget.src = "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=60";
    
    // Remove any broken dimensions that might be causing display issues
    e.currentTarget.style.height = '100%';
    e.currentTarget.style.width = '100%';
    e.currentTarget.style.objectFit = 'cover';
  };

  return (
    <Card key={displayCamp.id}>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 h-48 md:h-auto overflow-hidden bg-gray-100 relative">
          <img 
            src={imageUrl}
            alt={displayCamp.title} 
            className="w-full h-full object-cover"
            onError={handleImageError}
            loading="lazy"
          />
        </div>
        <div className="md:w-3/4">
          <CardHeader>
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge>{displayCamp.category}</Badge>
              <Badge variant="outline">{displayCamp.age_group} years</Badge>
            </div>
            <CardTitle>{displayCamp.title}</CardTitle>
            <CardDescription>{displayCamp.organizer}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{displayCamp.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>
                  {format(new Date(displayCamp.start_date), 'MMM d, yyyy')} - {format(new Date(displayCamp.end_date), 'MMM d, yyyy')}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{displayCamp.duration}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{displayCamp.location}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{displayCamp.enrolled}/{displayCamp.capacity} enrolled</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <div className="font-semibold text-lg">{displayCamp.price} AED</div>
            {type === "available" ? (
              <Button 
                onClick={() => onEnroll && onEnroll(displayCamp.id)}
                disabled={displayCamp.enrolled >= displayCamp.capacity}
              >
                {displayCamp.enrolled >= displayCamp.capacity ? "Fully Booked" : "Register Now"}
              </Button>
            ) : type === "registered" ? (
              <div className="flex gap-2">
                <Button variant="outline">View Details</Button>
                <Button 
                  variant="destructive"
                  onClick={() => onCancel && onCancel(displayCamp.id)}
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
  );
};

export default CampCard;
