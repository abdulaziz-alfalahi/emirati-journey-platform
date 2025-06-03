
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, BookOpen, Award, Briefcase, ExternalLink, Search } from 'lucide-react';

// Mock data - in a real implementation this would come from an API
const trainingOpportunities = [
  {
    id: 1,
    title: "Introduction to Cloud Computing",
    provider: "Emirati Tech Academy",
    category: "Technology",
    duration: "4 weeks",
    format: "Online",
    level: "Beginner",
    matchScore: 92,
    icon: "graduation-cap"
  },
  {
    id: 2,
    title: "Advanced Business Management",
    provider: "UAE Business School",
    category: "Business",
    duration: "8 weeks",
    format: "Hybrid",
    level: "Intermediate",
    matchScore: 86,
    icon: "book"
  },
  {
    id: 3,
    title: "Digital Marketing Essentials",
    provider: "Marketing Institute of Emirates",
    category: "Marketing",
    duration: "6 weeks",
    format: "In-Person",
    level: "Beginner",
    matchScore: 79,
    icon: "award"
  },
  {
    id: 4,
    title: "Leadership Skills for Managers",
    provider: "Leadership UAE",
    category: "Management",
    duration: "3 weeks",
    format: "Online",
    level: "Advanced",
    matchScore: 74,
    icon: "briefcase"
  },
  {
    id: 5,
    title: "Data Analytics Fundamentals",
    provider: "UAE Analytics Institute",
    category: "Data Science",
    duration: "5 weeks",
    format: "Online",
    level: "Intermediate",
    matchScore: 88,
    icon: "graduation-cap"
  },
  {
    id: 6,
    title: "Project Management Professional",
    provider: "PMI Emirates Chapter",
    category: "Project Management",
    duration: "12 weeks",
    format: "Hybrid",
    level: "Advanced",
    matchScore: 82,
    icon: "briefcase"
  }
];

// Helper function to render the appropriate icon
const renderIcon = (iconName: string) => {
  switch (iconName) {
    case 'graduation-cap':
      return <GraduationCap className="h-5 w-5 text-ehrdc-teal" />;
    case 'book':
      return <BookOpen className="h-5 w-5 text-ehrdc-teal" />;
    case 'award':
      return <Award className="h-5 w-5 text-ehrdc-teal" />;
    case 'briefcase':
    default:
      return <Briefcase className="h-5 w-5 text-ehrdc-teal" />;
  }
};

interface TrainingOpportunitiesProps {
  limit?: number;
}

const TrainingOpportunities: React.FC<TrainingOpportunitiesProps> = ({ limit = 3 }) => {
  const [isLoading, setIsLoading] = useState(false);
  const displayedOpportunities = trainingOpportunities.slice(0, limit);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {isLoading ? (
        <div className="col-span-full flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-ehrdc-teal"></div>
        </div>
      ) : (
        displayedOpportunities.map((opportunity) => (
          <Card key={opportunity.id} className="overflow-hidden h-full flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  {renderIcon(opportunity.icon)}
                  <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                </div>
                <Badge variant={opportunity.matchScore > 80 ? "success" : "secondary"} className="flex items-center">
                  {opportunity.matchScore}% Match
                </Badge>
              </div>
              <CardDescription>{opportunity.provider}</CardDescription>
            </CardHeader>
            <CardContent className="py-2 flex-grow">
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <div className="text-muted-foreground">
                  <span className="font-medium">Category:</span> {opportunity.category}
                </div>
                <div className="text-muted-foreground">
                  <span className="font-medium">Duration:</span> {opportunity.duration}
                </div>
                <div className="text-muted-foreground">
                  <span className="font-medium">Format:</span> {opportunity.format}
                </div>
                <div className="text-muted-foreground">
                  <span className="font-medium">Level:</span> {opportunity.level}
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted pt-2 pb-2 mt-auto">
              <Button 
                variant="link" 
                size="sm" 
                className="p-0 h-auto font-normal text-sm flex items-center"
              >
                <span className="flex items-center">
                  View Details <ExternalLink className="ml-1 h-3 w-3" />
                </span>
              </Button>
            </CardFooter>
          </Card>
        ))
      )}
      {!isLoading && displayedOpportunities.length > 0 && (
        <div className="col-span-full mt-4">
          <Button 
            variant="outline" 
            className="w-full"
          >
            <span className="flex items-center">
              <Search className="h-4 w-4 mr-2" />
              <span>Explore All Training Opportunities</span>
            </span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default TrainingOpportunities;
