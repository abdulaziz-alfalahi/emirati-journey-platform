
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Archive, Music, Camera, Palette, Calendar, Users, FileText, Video } from 'lucide-react';
import { CulturalHeritageDocumentation } from './CulturalHeritageDocumentation';
import { CulturalEventsCalendar } from './CulturalEventsCalendar';

interface CulturalPreservationContentProps {
  activeTab: string;
}

export const CulturalPreservationContent: React.FC<CulturalPreservationContentProps> = ({ activeTab }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'explore':
        return <CulturalHeritageDocumentation />;
      
      case 'contribute':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-ehrdc-teal" />
                  Contribute to Cultural Preservation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Share your stories, knowledge, and cultural experiences to help preserve 
                  Emirati heritage for future generations. Every contribution matters in 
                  building our collective cultural memory.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="pt-6 text-center">
                      <FileText className="h-8 w-8 text-ehrdc-teal mx-auto mb-3" />
                      <h3 className="font-semibold mb-2">Share Your Story</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Document family histories, community memories, or personal narratives
                      </p>
                      <Button size="sm" className="w-full bg-ehrdc-teal hover:bg-ehrdc-dark-teal">
                        Start Writing
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="pt-6 text-center">
                      <Video className="h-8 w-8 text-ehrdc-teal mx-auto mb-3" />
                      <h3 className="font-semibold mb-2">Record Video</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Capture traditional skills, stories, or cultural practices on video
                      </p>
                      <Button size="sm" variant="outline" className="w-full">
                        Record Video
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="pt-6 text-center">
                      <Camera className="h-8 w-8 text-ehrdc-teal mx-auto mb-3" />
                      <h3 className="font-semibold mb-2">Upload Photos</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Share historical photos, artifacts, or cultural documentation
                      </p>
                      <Button size="sm" variant="outline" className="w-full">
                        Upload Images
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="pt-6 text-center">
                      <Music className="h-8 w-8 text-ehrdc-teal mx-auto mb-3" />
                      <h3 className="font-semibold mb-2">Audio Recording</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Record traditional songs, stories, or oral histories
                      </p>
                      <Button size="sm" variant="outline" className="w-full">
                        Record Audio
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contribution Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Content Standards</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Ensure cultural accuracy and authenticity</li>
                      <li>• Respect privacy and obtain necessary permissions</li>
                      <li>• Provide context and cultural significance</li>
                      <li>• Use appropriate language and tone</li>
                      <li>• Include relevant tags and metadata</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Technical Requirements</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• High-quality images (minimum 1080p)</li>
                      <li>• Clear audio recordings (MP3 or WAV)</li>
                      <li>• Video files up to 500MB</li>
                      <li>• Text in Arabic or English</li>
                      <li>• Proper file naming conventions</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'digital-archive':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Archive className="h-5 w-5 text-ehrdc-teal" />
                  Digital Heritage Archive
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Explore our comprehensive digital archive of Emirati cultural heritage, 
                  featuring preserved stories, traditional skills, historical documents, 
                  and multimedia collections.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-ehrdc-teal">2,847</div>
                    <div className="text-sm text-muted-foreground">Cultural Stories</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-ehrdc-teal">156</div>
                    <div className="text-sm text-muted-foreground">Traditional Skills</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-ehrdc-teal">1,234</div>
                    <div className="text-sm text-muted-foreground">Historical Photos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-ehrdc-teal">89</div>
                    <div className="text-sm text-muted-foreground">Video Documents</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="bg-ehrdc-teal hover:bg-ehrdc-dark-teal">
                    <Archive className="h-4 w-4 mr-2" />
                    Browse Archive
                  </Button>
                  <Button variant="outline">
                    <Camera className="h-4 w-4 mr-2" />
                    Photo Collection
                  </Button>
                  <Button variant="outline">
                    <Video className="h-4 w-4 mr-2" />
                    Video Library
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Featured Collections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">Pearl Diving Heritage</h4>
                      <p className="text-sm text-muted-foreground">
                        Complete documentation of traditional pearl diving practices
                      </p>
                    </div>
                    <Button size="sm" variant="outline">Explore</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">Traditional Architecture</h4>
                      <p className="text-sm text-muted-foreground">
                        Historical buildings and construction techniques
                      </p>
                    </div>
                    <Button size="sm" variant="outline">Explore</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">Emirati Cuisine Traditions</h4>
                      <p className="text-sm text-muted-foreground">
                        Traditional recipes and cooking methods
                      </p>
                    </div>
                    <Button size="sm" variant="outline">Explore</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'projects':
        return <CulturalEventsCalendar />;
      
      default:
        return (
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground">Content for {activeTab} coming soon...</p>
            </CardContent>
          </Card>
        );
    }
  };

  return <div>{renderContent()}</div>;
};
