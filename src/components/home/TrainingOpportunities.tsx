
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Book, Award, Briefcase, ExternalLink } from 'lucide-react';

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
  }
];

// Helper function to render the appropriate icon
const renderIcon = (iconName: string) => {
  switch (iconName) {
    case 'graduation-cap':
      return <GraduationCap className="h-5 w-5 text-emirati-teal" />;
    case 'book':
      return <Book className="h-5 w-5 text-emirati-teal" />;
    case 'award':
      return <Award className="h-5 w-5 text-emirati-teal" />;
    case 'briefcase':
    default:
      return <Briefcase className="h-5 w-5 text-emirati-teal" />;
  }
};

interface TrainingOpportunitiesProps {
  limit?: number;
}

const TrainingOpportunities: React.FC<TrainingOpportunitiesProps> = ({ limit = 3 }) => {
  const [isLoading, setIsLoading] = useState(false);
  const displayedOpportunities = trainingOpportunities.slice(0, limit);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <GraduationCap className="mr-2 h-5 w-5" />
          AI-Recommended Training Opportunities
        </CardTitle>
        <CardDescription>Personalized training recommendations based on your profile</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emirati-teal"></div>
          </div>
        ) : (
          displayedOpportunities.map((opportunity) => (
            <Card key={opportunity.id} className="overflow-hidden">
              <div className="flex flex-col">
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                      {renderIcon(opportunity.icon)}
                      <div>
                        <h3 className="font-medium text-lg">{opportunity.title}</h3>
                        <p className="text-sm text-muted-foreground">{opportunity.provider}</p>
                      </div>
                    </div>
                    <Badge variant={opportunity.matchScore > 80 ? "success" : "secondary"} className="flex items-center">
                      {opportunity.matchScore}% Match
                    </Badge>
                  </div>
                  
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                    <div className="text-xs text-muted-foreground">
                      Category: {opportunity.category}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Duration: {opportunity.duration}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Format: {opportunity.format}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Level: {opportunity.level}
                    </div>
                  </div>
                </div>
                <div className="bg-muted px-4 py-2">
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="p-0 h-auto font-normal text-sm flex items-center"
                  >
                    View Details <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
        >
          Explore All Training Opportunities
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TrainingOpportunities;
