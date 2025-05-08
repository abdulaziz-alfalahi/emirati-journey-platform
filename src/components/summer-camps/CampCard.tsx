
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
  return (
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
                onClick={() => onEnroll && onEnroll(camp.id)}
                disabled={camp.enrolled >= camp.capacity}
              >
                {camp.enrolled >= camp.capacity ? "Fully Booked" : "Register Now"}
              </Button>
            ) : type === "registered" ? (
              <div className="flex gap-2">
                <Button variant="outline">View Details</Button>
                <Button 
                  variant="destructive"
                  onClick={() => onCancel && onCancel(camp.id)}
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
