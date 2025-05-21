
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Users, MapPin, Clock, Plane } from 'lucide-react';
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
    location: camp.title === "Tech Innovators Summer Camp" ? "Dubai" : camp.location,
    organizer: camp.organizer === "Abu Dhabi Innovation Center" ? "Emirates Group" : camp.organizer,
    description: camp.description === "Learn coding, robotics, and AI fundamentals in this immersive tech camp" ? 
      "Learn Aviation Basics, STEM Skills, Safety and Emergency Procedures, Teamwork and Leadership, and Growth in Aviation Sector" : 
      camp.description
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
    <Card key={displayCamp.id} className="overflow-hidden border-gov-lightGray">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 h-48 md:h-auto overflow-hidden bg-gov-lightGray relative">
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
              <Badge className="bg-gov-blue text-white">{displayCamp.category}</Badge>
              <Badge variant="outline" className="border-gov-lightGray text-gov-darkGray">{displayCamp.age_group} years</Badge>
            </div>
            <CardTitle className="text-gov-black font-gov">{displayCamp.title}</CardTitle>
            <CardDescription className="text-gov-darkGray">{displayCamp.organizer}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gov-darkGray">{displayCamp.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center text-gov-mediumGray">
                <Calendar className="h-4 w-4 mr-2 text-gov-blue" />
                <span>
                  {format(new Date(displayCamp.start_date), 'MMM d, yyyy')} - {format(new Date(displayCamp.end_date), 'MMM d, yyyy')}
                </span>
              </div>
              <div className="flex items-center text-gov-mediumGray">
                <Clock className="h-4 w-4 mr-2 text-gov-blue" />
                <span>{displayCamp.duration}</span>
              </div>
              <div className="flex items-center text-gov-mediumGray">
                <MapPin className="h-4 w-4 mr-2 text-gov-blue" />
                <span>{displayCamp.location}</span>
              </div>
              <div className="flex items-center text-gov-mediumGray">
                <Users className="h-4 w-4 mr-2 text-gov-blue" />
                <span>{displayCamp.enrolled}/{displayCamp.capacity} enrolled</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <div className="font-semibold text-lg text-gov-darkGray">{displayCamp.price} AED</div>
            {type === "available" ? (
              <Button 
                onClick={() => onEnroll && onEnroll(displayCamp.id)}
                disabled={displayCamp.enrolled >= displayCamp.capacity}
                className={`bg-gov-blue text-white hover:brightness-110 ${displayCamp.enrolled >= displayCamp.capacity ? 'opacity-50' : ''}`}
              >
                {displayCamp.enrolled >= displayCamp.capacity ? "Fully Booked" : "Register Now"}
              </Button>
            ) : type === "registered" ? (
              <div className="flex gap-2">
                <Button variant="outline" className="border-gov-blue text-gov-blue hover:bg-gov-blue/10">View Details</Button>
                <Button 
                  variant="destructive"
                  onClick={() => onCancel && onCancel(displayCamp.id)}
                  className="bg-gov-red text-white hover:brightness-110"
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" className="border-gov-blue text-gov-blue hover:bg-gov-blue/10">Edit Camp</Button>
                <Button className="bg-gov-blue text-white hover:brightness-110">Manage Enrollments</Button>
              </div>
            )}
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default CampCard;
