
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Archive, Users, Calendar, FileText, Camera, Music, Palette, Plus } from 'lucide-react';
import { LegacyProject } from '@/types/community-engagement';

interface LegacyProjectManagerProps {
  projects?: LegacyProject[];
}

export const LegacyProjectManager: React.FC<LegacyProjectManagerProps> = ({ projects = [] }) => {
  const [activeView, setActiveView] = useState<'all' | 'my' | 'featured'>('all');

  const mockProjects: LegacyProject[] = [
    {
      id: '1',
      title: 'Emirates Heritage Digital Archive',
      description: 'Digitizing historical documents and photographs that tell the story of UAE\'s development from 1971 onwards.',
      project_type: 'cultural_preservation',
      initiator_id: 'user1',
      collaborators: ['user2', 'user3', 'user4'],
      status: 'active',
      progress_percentage: 65,
      deliverables: ['Digital photo collection', 'Interview recordings', 'Historical timeline'],
      timeline: '12 months',
      resources_needed: ['Digital scanning equipment', 'Interview volunteers', 'Storage platform'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Traditional Crafts Knowledge Transfer',
      description: 'Documenting traditional Emirati crafts techniques through video tutorials and written guides.',
      project_type: 'skill_transfer',
      initiator_id: 'user2',
      collaborators: ['user1', 'user5'],
      status: 'planning',
      progress_percentage: 25,
      deliverables: ['Video tutorial series', 'Written instruction guides', 'Materials sourcing guide'],
      timeline: '8 months',
      resources_needed: ['Video equipment', 'Craft masters', 'Translation services'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '3',
      title: 'Community Oral History Project',
      description: 'Recording and preserving stories from long-time residents about the transformation of their neighborhoods.',
      project_type: 'community_history',
      initiator_id: 'user3',
      collaborators: ['user4', 'user6', 'user7'],
      status: 'active',
      progress_percentage: 80,
      deliverables: ['Audio recordings collection', 'Transcribed stories', 'Interactive map'],
      timeline: '6 months',
      resources_needed: ['Recording equipment', 'Community volunteers', 'Transcription services'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  const getProjectTypeIcon = (type: LegacyProject['project_type']) => {
    switch (type) {
      case 'cultural_preservation': return <Palette className="h-5 w-5" />;
      case 'knowledge_documentation': return <FileText className="h-5 w-5" />;
      case 'community_history': return <Archive className="h-5 w-5" />;
      case 'skill_transfer': return <Users className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: LegacyProject['status']) => {
    switch (status) {
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatProjectType = (type: LegacyProject['project_type']) => {
    return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-ehrdc-teal mb-2">Legacy Projects</h2>
          <p className="text-muted-foreground">Preserve knowledge and culture for future generations</p>
        </div>
        <Button className="bg-ehrdc-teal hover:bg-ehrdc-dark-teal">
          <Plus className="h-4 w-4 mr-2" />
          Start New Project
        </Button>
      </div>

      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveView('all')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeView === 'all'
              ? 'text-ehrdc-teal border-b-2 border-ehrdc-teal'
              : 'text-muted-foreground hover:text-ehrdc-teal'
          }`}
        >
          All Projects
        </button>
        <button
          onClick={() => setActiveView('my')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeView === 'my'
              ? 'text-ehrdc-teal border-b-2 border-ehrdc-teal'
              : 'text-muted-foreground hover:text-ehrdc-teal'
          }`}
        >
          My Projects
        </button>
        <button
          onClick={() => setActiveView('featured')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeView === 'featured'
              ? 'text-ehrdc-teal border-b-2 border-ehrdc-teal'
              : 'text-muted-foreground hover:text-ehrdc-teal'
          }`}
        >
          Featured
        </button>
      </div>

      <div className="grid gap-6">
        {mockProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-12 h-12 bg-ehrdc-teal/10 rounded-lg flex items-center justify-center text-ehrdc-teal">
                    {getProjectTypeIcon(project.project_type)}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge className={getStatusColor(project.status)}>
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </Badge>
                      <Badge variant="outline">
                        {formatProjectType(project.project_type)}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{project.description}</p>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-muted-foreground">{project.progress_percentage}%</span>
                </div>
                <Progress value={project.progress_percentage} className="h-2" />
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Timeline
                  </h4>
                  <p className="text-sm text-muted-foreground">{project.timeline}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Collaborators
                  </h4>
                  <p className="text-sm text-muted-foreground">{project.collaborators.length} active contributors</p>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Key Deliverables</h4>
                <div className="flex flex-wrap gap-2">
                  {project.deliverables.map((deliverable, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {deliverable}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Resources needed:</span>
                  <span className="text-sm font-medium">{project.resources_needed.length} items</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Contribute
                  </Button>
                  <Button size="sm" className="bg-ehrdc-teal hover:bg-ehrdc-dark-teal">
                    Join Project
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {mockProjects.length === 0 && (
        <Card>
          <CardContent className="pt-8 text-center">
            <Archive className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Projects Found</h3>
            <p className="text-muted-foreground mb-4">
              Start your first legacy project to preserve knowledge and culture for future generations.
            </p>
            <Button className="bg-ehrdc-teal hover:bg-ehrdc-dark-teal">
              Create Your First Project
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
