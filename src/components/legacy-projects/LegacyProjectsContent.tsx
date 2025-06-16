
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Landmark, Users, Building, Award } from 'lucide-react';
import { LegacyProjectManager } from '@/components/community-engagement/LegacyProjectManager';

interface LegacyProjectsContentProps {
  activeTab: string;
}

export const LegacyProjectsContent: React.FC<LegacyProjectsContentProps> = ({ activeTab }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'explore':
        return <LegacyProjectManager projects={[]} />;
      
      case 'contributions':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-ehrdc-teal" />
                  My Legacy Contributions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Track your contributions to preserving knowledge and culture for future generations.
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                  <Button className="bg-ehrdc-teal hover:bg-ehrdc-dark-teal">
                    View Contributions
                  </Button>
                  <Button variant="outline">
                    Impact Report
                  </Button>
                  <Button variant="outline">
                    Recognition
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Active Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-medium">Heritage Digital Archive</h4>
                      <p className="text-sm text-muted-foreground">Cultural Preservation</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-muted-foreground">65% Complete</span>
                        <Button size="sm" variant="outline">Update</Button>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-medium">Traditional Crafts Documentation</h4>
                      <p className="text-sm text-muted-foreground">Skill Transfer</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-muted-foreground">30% Complete</span>
                        <Button size="sm" variant="outline">Update</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contribution Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Projects Joined</span>
                      <span className="font-semibold">5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Hours Contributed</span>
                      <span className="font-semibold">120</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Knowledge Items</span>
                      <span className="font-semibold">45</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Recognition Score</span>
                      <span className="font-semibold">650</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'propose':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-ehrdc-teal" />
                  Propose a Legacy Project
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Have an idea for preserving important knowledge or culture? Start a legacy project and invite others to collaborate.
                </p>
                <Button className="bg-ehrdc-teal hover:bg-ehrdc-dark-teal">
                  Start New Project
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: Landmark, label: 'Cultural Preservation', description: 'Preserve traditions and heritage' },
                    { icon: Users, label: 'Knowledge Documentation', description: 'Document valuable knowledge' },
                    { icon: Building, label: 'Community History', description: 'Record community stories' },
                    { icon: Award, label: 'Skill Transfer', description: 'Pass on practical skills' }
                  ].map((category, index) => (
                    <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="pt-6 text-center">
                        <category.icon className="h-8 w-8 text-ehrdc-teal mx-auto mb-2" />
                        <h3 className="font-semibold mb-1">{category.label}</h3>
                        <p className="text-xs text-muted-foreground">{category.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Planning Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">Getting Started</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Define your project goals and scope</li>
                      <li>• Identify required resources and collaborators</li>
                      <li>• Create a realistic timeline</li>
                      <li>• Plan documentation and preservation methods</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium">Support Available</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Project planning guidance</li>
                      <li>• Technical support and tools</li>
                      <li>• Collaboration platform access</li>
                      <li>• Community expert connections</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
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
