
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Users, MapPin, Clock, School } from 'lucide-react';

// Mock data for summer camps
const mockCamps = [
  {
    id: 1,
    title: "Tech Innovators Summer Camp",
    organizer: "Abu Dhabi Innovation Center",
    category: "Technology",
    description: "Learn coding, robotics, and AI fundamentals in this immersive tech camp",
    ageGroup: "12-16",
    startDate: "2023-07-10",
    endDate: "2023-07-28",
    duration: "3 weeks",
    location: "Abu Dhabi",
    capacity: 30,
    enrolled: 18,
    price: 1500,
    image: "/placeholder.svg",
    tags: ["Coding", "Robotics", "STEM"]
  },
  {
    id: 2,
    title: "Young Scientists Academy",
    organizer: "Dubai Science Foundation",
    category: "Science",
    description: "Explore chemistry, physics, and biology through exciting experiments and projects",
    ageGroup: "8-14",
    startDate: "2023-07-03",
    endDate: "2023-07-21",
    duration: "3 weeks",
    location: "Dubai",
    capacity: 25,
    enrolled: 22,
    price: 1200,
    image: "/placeholder.svg",
    tags: ["Experiments", "Research", "STEM"]
  },
  {
    id: 3,
    title: "Creative Arts Workshop",
    organizer: "Sharjah Arts Institute",
    category: "Arts",
    description: "Develop skills in painting, sculpture, and digital art with professional artists",
    ageGroup: "10-18",
    startDate: "2023-06-26",
    endDate: "2023-07-14",
    duration: "3 weeks",
    location: "Sharjah",
    capacity: 20,
    enrolled: 15,
    price: 1000,
    image: "/placeholder.svg",
    tags: ["Painting", "Sculpture", "Digital Art"]
  },
  {
    id: 4,
    title: "Future Leaders Program",
    organizer: "Emirates Leadership Foundation",
    category: "Leadership",
    description: "Build essential leadership, communication, and problem-solving skills",
    ageGroup: "14-18",
    startDate: "2023-07-03",
    endDate: "2023-07-28",
    duration: "4 weeks",
    location: "Dubai",
    capacity: 25,
    enrolled: 10,
    price: 1800,
    image: "/placeholder.svg",
    tags: ["Leadership", "Communication", "Team Building"]
  },
];

// Filters for demo purposes
const filterCamps = (
  camps: typeof mockCamps,
  filters: { category: string[], ageGroup: string[], location: string[] },
  searchQuery: string,
  type: string
) => {
  let filteredCamps = [...camps];
  
  // Filter by type
  if (type === "registered") {
    // For demo purposes, just show fewer camps for "registered"
    filteredCamps = filteredCamps.slice(0, 2);
  } else if (type === "managed") {
    // For demo purposes, just show one camp for "managed"
    filteredCamps = filteredCamps.slice(0, 1);
  }
  
  // Apply category filter
  if (filters.category.length > 0) {
    filteredCamps = filteredCamps.filter(camp => 
      filters.category.includes(camp.category)
    );
  }
  
  // Apply location filter
  if (filters.location.length > 0) {
    filteredCamps = filteredCamps.filter(camp => 
      filters.location.includes(camp.location)
    );
  }
  
  // Apply age group filter
  if (filters.ageGroup.length > 0) {
    filteredCamps = filteredCamps.filter(camp => 
      filters.ageGroup.includes(camp.ageGroup)
    );
  }
  
  // Apply search query
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredCamps = filteredCamps.filter(
      camp => camp.title.toLowerCase().includes(query) || 
        camp.description.toLowerCase().includes(query) ||
        camp.organizer.toLowerCase().includes(query)
    );
  }
  
  return filteredCamps;
};

interface CampsListProps {
  type: "available" | "registered" | "managed";
  filters: {
    category: string[];
    ageGroup: string[];
    location: string[];
  };
  searchQuery: string;
}

const CampsList: React.FC<CampsListProps> = ({ type, filters, searchQuery }) => {
  const filteredCamps = filterCamps(mockCamps, filters, searchQuery, type);
  
  if (filteredCamps.length === 0) {
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
      {filteredCamps.map(camp => (
        <Card key={camp.id}>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 h-48 md:h-auto overflow-hidden bg-gray-100">
              <img 
                src={camp.image} 
                alt={camp.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-3/4">
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge>{camp.category}</Badge>
                  <Badge variant="outline">{camp.ageGroup} years</Badge>
                </div>
                <CardTitle>{camp.title}</CardTitle>
                <CardDescription>{camp.organizer}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{camp.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{new Date(camp.startDate).toLocaleDateString()} - {new Date(camp.endDate).toLocaleDateString()}</span>
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
                  <Button>Register Now</Button>
                ) : type === "registered" ? (
                  <div className="flex gap-2">
                    <Button variant="outline">View Details</Button>
                    <Button variant="destructive">Cancel</Button>
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
