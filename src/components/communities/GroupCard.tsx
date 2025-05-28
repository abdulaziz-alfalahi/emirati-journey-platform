
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Lock, Globe, Calendar } from 'lucide-react';
import { ProfessionalGroup } from '@/types/communities';

interface GroupCardProps {
  group: ProfessionalGroup;
  onJoin?: (groupId: string) => void;
  isJoined?: boolean;
  isLoading?: boolean;
}

const GroupCard: React.FC<GroupCardProps> = ({ 
  group, 
  onJoin, 
  isJoined = false, 
  isLoading = false 
}) => {
  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="line-clamp-2">{group.name}</CardTitle>
            <CardDescription className="line-clamp-2 mt-2">
              {group.description}
            </CardDescription>
          </div>
          <div className="ml-4">
            {group.is_private ? (
              <Lock className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Globe className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{group.member_count} members</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(group.created_at).toLocaleDateString()}</span>
            </div>
          </div>
          
          {(group.industry || group.category) && (
            <div className="flex flex-wrap gap-2">
              {group.industry && (
                <Badge variant="secondary" className="text-xs">
                  {group.industry}
                </Badge>
              )}
              {group.category && (
                <Badge variant="outline" className="text-xs">
                  {group.category}
                </Badge>
              )}
            </div>
          )}
          
          {group.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {group.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
              {group.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{group.tags.length - 3} more
                </Badge>
              )}
            </div>
          )}
          
          <div className="flex space-x-2">
            <Link to={`/communities/groups/${group.id}`} className="flex-1">
              <Button variant="outline" className="w-full">
                View Group
              </Button>
            </Link>
            {!isJoined && onJoin && (
              <Button 
                onClick={() => onJoin(group.id)}
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? 'Joining...' : 'Join'}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GroupCard;
