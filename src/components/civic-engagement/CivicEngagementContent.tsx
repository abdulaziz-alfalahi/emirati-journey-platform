
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Vote, Users, MessageSquare, Building } from 'lucide-react';
import { CivicParticipationHub } from '@/components/community-engagement/CivicParticipationHub';

interface CivicEngagementContentProps {
  activeTab: string;
}

export const CivicEngagementContent: React.FC<CivicEngagementContentProps> = ({ activeTab }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'initiatives':
        return <CivicParticipationHub initiatives={[]} events={[]} opportunities={[]} />;
      
      case 'participation':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-ehrdc-teal" />
                  My Civic Participation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Track your civic engagement activities and contributions to community development.
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                  <Button className="bg-ehrdc-teal hover:bg-ehrdc-dark-teal">
                    View My Activities
                  </Button>
                  <Button variant="outline">
                    Participation History
                  </Button>
                  <Button variant="outline">
                    Impact Report
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Active Commitments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">Community Garden Project</h4>
                        <p className="text-sm text-muted-foreground">Environmental Initiative</p>
                      </div>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">Local Advisory Board</h4>
                        <p className="text-sm text-muted-foreground">Community Governance</p>
                      </div>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Impact Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Initiatives Joined</span>
                      <span className="font-semibold">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Volunteer Hours</span>
                      <span className="font-semibold">156</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Community Events</span>
                      <span className="font-semibold">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Recognition Points</span>
                      <span className="font-semibold">850</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'policy':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-ehrdc-teal" />
                  Policy Discussions & Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Participate in policy discussions and provide valuable feedback on community development initiatives.
                </p>
                <Button className="bg-ehrdc-teal hover:bg-ehrdc-dark-teal">
                  Join Policy Discussions
                </Button>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Active Policy Discussions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Sustainable Transportation Initiative</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Community feedback needed on proposed cycling paths and public transport improvements.
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Read More</Button>
                        <Button size="sm" className="bg-ehrdc-teal hover:bg-ehrdc-dark-teal">
                          Provide Feedback
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Community Recreation Facilities</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Input requested on new recreational facilities and programs for all age groups.
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Read More</Button>
                        <Button size="sm" className="bg-ehrdc-teal hover:bg-ehrdc-dark-teal">
                          Provide Feedback
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'government':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-ehrdc-teal" />
                  Government Connect Platform
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Direct connection with government representatives and departments for community engagement.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Button className="bg-ehrdc-teal hover:bg-ehrdc-dark-teal">
                    Contact Representatives
                  </Button>
                  <Button variant="outline">
                    Government Services
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Local Government</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Community Council</span>
                      <Button size="sm" variant="outline">Connect</Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Municipal Services</span>
                      <Button size="sm" variant="outline">Connect</Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Development Board</span>
                      <Button size="sm" variant="outline">Connect</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Government Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Public Services</span>
                      <Button size="sm" variant="outline">Access</Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Citizen Services</span>
                      <Button size="sm" variant="outline">Access</Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Community Support</span>
                      <Button size="sm" variant="outline">Access</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      
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
