
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, BookOpen, Award, Projector, ArrowUpRight } from "lucide-react";
import { PortfolioHighlight } from "@/types/portfolio";
import { formatDate } from "@/components/resume/utils/dateUtils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface HighlightsSectionProps {
  highlights: PortfolioHighlight[] | undefined;
  isEditable?: boolean;
  onAddHighlight?: () => void;
  onEditHighlight?: (highlight: PortfolioHighlight) => void;
}

const HighlightsSection: React.FC<HighlightsSectionProps> = ({
  highlights,
  isEditable = false,
  onAddHighlight,
  onEditHighlight
}) => {
  if (!highlights || highlights.length === 0) {
    return (
      <Card className="bg-muted/40">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <Star className="h-5 w-5 mr-2" />
              Portfolio Highlights
            </CardTitle>
            <CardDescription>No highlights available</CardDescription>
          </div>
          
          {isEditable && onAddHighlight && (
            <Button variant="outline" size="sm" onClick={onAddHighlight}>
              Add Highlight
            </Button>
          )}
        </CardHeader>
      </Card>
    );
  }

  const getHighlightIcon = (type: string) => {
    switch (type) {
      case "project":
        return <Projector className="h-4 w-4 text-primary" />;
      case "achievement":
        return <Award className="h-4 w-4 text-amber-500" />;
      case "publication":
        return <BookOpen className="h-4 w-4 text-blue-500" />;
      default:
        return <Star className="h-4 w-4 text-purple-500" />;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center">
            <Star className="h-5 w-5 mr-2" />
            Portfolio Highlights
          </CardTitle>
          <CardDescription>{highlights.length} personal highlights</CardDescription>
        </div>
        
        {isEditable && onAddHighlight && (
          <Button variant="outline" size="sm" onClick={onAddHighlight}>
            Add Highlight
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {highlights.map((highlight) => (
            <div 
              key={highlight.id} 
              className="border rounded-lg p-4 hover:border-primary/50 transition-colors relative"
              onClick={() => isEditable && onEditHighlight && onEditHighlight(highlight)}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  {getHighlightIcon(highlight.type)}
                  <h3 className="font-medium ml-2">{highlight.title}</h3>
                </div>
                
                <Badge variant="outline" className="capitalize">
                  {highlight.type}
                </Badge>
              </div>
              
              {highlight.date && (
                <div className="text-xs text-muted-foreground mt-1">
                  {formatDate(new Date(highlight.date))}
                </div>
              )}
              
              {highlight.description && (
                <p className="text-sm mt-2">
                  {highlight.description}
                </p>
              )}
              
              {highlight.url && (
                <a 
                  href={highlight.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline mt-2 flex items-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Resource
                  <ArrowUpRight className="h-3 w-3 ml-1" />
                </a>
              )}
              
              {isEditable && (
                <div className="absolute top-2 right-2 text-xs text-muted-foreground">
                  Click to edit
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HighlightsSection;
