
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useOfflineJobs } from '@/hooks/use-offline-jobs';
import { 
  Search, 
  MapPin, 
  Clock, 
  Trash2,
  Briefcase,
  WifiOff
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const MobileOfflineJobsList: React.FC = () => {
  const { 
    savedJobs, 
    removeJobOffline, 
    searchOfflineJobs,
    hasSavedJobs,
    isOnline
  } = useOfflineJobs();
  
  const [searchQuery, setSearchQuery] = useState('');
  const filteredJobs = searchOfflineJobs(searchQuery);

  if (!hasSavedJobs) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <WifiOff className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Saved Jobs
          </h3>
          <p className="text-gray-500 text-sm">
            Save jobs while online to access them offline
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Briefcase className="h-5 w-5" />
            <span>Saved Jobs ({savedJobs.length})</span>
            {!isOnline && (
              <Badge variant="outline" className="text-xs">
                <WifiOff className="h-3 w-3 mr-1" />
                Offline
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search saved jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Jobs List */}
      <div className="space-y-3">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">
                    {job.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {job.company}
                  </p>
                  <div className="flex items-center space-x-3 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>
                        Saved {formatDistanceToNow(new Date(job.savedAt), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeJobOffline(job.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                {job.description}
              </p>

              {job.requirements.length > 0 && (
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {job.requirements.slice(0, 3).map((req, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {req}
                      </Badge>
                    ))}
                    {job.requirements.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{job.requirements.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center">
                <Badge variant="secondary" className="text-xs">
                  {job.type}
                </Badge>
                {job.salary && (
                  <span className="text-sm font-medium text-green-600">
                    {job.salary}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredJobs.length === 0 && searchQuery && (
        <Card>
          <CardContent className="p-6 text-center">
            <Search className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">
              No jobs found matching "{searchQuery}"
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MobileOfflineJobsList;
