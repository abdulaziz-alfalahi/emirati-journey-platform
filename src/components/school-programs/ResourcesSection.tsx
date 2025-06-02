
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, Video, BookOpen, Users, HelpCircle } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'video' | 'guide' | 'checklist' | 'webinar';
  category: 'parents' | 'students' | 'institutions' | 'general';
  file_url?: string;
  download_count: number;
  is_featured: boolean;
}

const ResourcesSection: React.FC = () => {
  // Mock data - In a real app, this would come from an API
  const resources: Resource[] = [
    {
      id: '1',
      title: 'Parent\'s Guide to Choosing School Programs',
      description: 'Comprehensive guide helping parents select the most suitable educational programs for their children based on interests, aptitude, and career goals.',
      type: 'pdf',
      category: 'parents',
      file_url: '/resources/parents-guide.pdf',
      download_count: 1247,
      is_featured: true
    },
    {
      id: '2',
      title: 'Student Program Selection Checklist',
      description: 'Interactive checklist to help students evaluate their interests, skills, and goals when choosing educational programs.',
      type: 'checklist',
      category: 'students',
      file_url: '/resources/student-checklist.pdf',
      download_count: 892,
      is_featured: true
    },
    {
      id: '3',
      title: 'How to Apply for School Programs - Video Tutorial',
      description: 'Step-by-step video guide walking through the application process for various school programs.',
      type: 'video',
      category: 'general',
      file_url: '/resources/application-tutorial.mp4',
      download_count: 2156,
      is_featured: true
    },
    {
      id: '4',
      title: 'Program Quality Standards for Institutions',
      description: 'Guidelines and standards for educational institutions offering student programs through the EHRDC platform.',
      type: 'guide',
      category: 'institutions',
      file_url: '/resources/quality-standards.pdf',
      download_count: 543,
      is_featured: false
    },
    {
      id: '5',
      title: 'Understanding Program Certificates and Credits',
      description: 'Information about how program certificates work, their recognition, and how they contribute to academic progression.',
      type: 'pdf',
      category: 'students',
      file_url: '/resources/certificates-guide.pdf',
      download_count: 756,
      is_featured: false
    },
    {
      id: '6',
      title: 'Financial Aid and Scholarship Opportunities',
      description: 'Guide to available financial assistance for students participating in educational programs.',
      type: 'guide',
      category: 'parents',
      file_url: '/resources/financial-aid.pdf',
      download_count: 1089,
      is_featured: true
    },
    {
      id: '7',
      title: 'Monthly Webinar: Program Success Stories',
      description: 'Join our monthly webinar featuring successful program graduates sharing their experiences and tips.',
      type: 'webinar',
      category: 'general',
      file_url: '/webinars/success-stories',
      download_count: 324,
      is_featured: false
    }
  ];

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'pdf': return FileText;
      case 'video': return Video;
      case 'guide': return BookOpen;
      case 'checklist': return HelpCircle;
      case 'webinar': return Users;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'pdf': return 'bg-red-100 text-red-800';
      case 'video': return 'bg-purple-100 text-purple-800';
      case 'guide': return 'bg-blue-100 text-blue-800';
      case 'checklist': return 'bg-green-100 text-green-800';
      case 'webinar': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'parents': return 'bg-pink-100 text-pink-800';
      case 'students': return 'bg-blue-100 text-blue-800';
      case 'institutions': return 'bg-purple-100 text-purple-800';
      case 'general': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const featuredResources = resources.filter(r => r.is_featured);
  const allResources = resources.filter(r => !r.is_featured);

  const handleDownload = (resource: Resource) => {
    // In a real app, this would handle file downloads or navigation
    console.log('Downloading resource:', resource.id);
    // Could track download analytics here
  };

  return (
    <div className="space-y-8">
      {/* Featured Resources */}
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-ehrdc-teal" />
          Featured Resources
        </h3>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredResources.map((resource) => {
            const IconComponent = getResourceIcon(resource.type);
            return (
              <Card key={resource.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-ehrdc-teal/10 rounded-lg">
                        <IconComponent className="h-5 w-5 text-ehrdc-teal" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <Badge className={getTypeColor(resource.type)}>
                          {resource.type.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className={getCategoryColor(resource.category)}>
                          {resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-base">{resource.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {resource.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{resource.download_count.toLocaleString()} downloads</span>
                    {resource.is_featured && (
                      <Badge variant="secondary" className="text-xs">Featured</Badge>
                    )}
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleDownload(resource)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {resource.type === 'webinar' ? 'Join Webinar' : 'Download'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* All Resources */}
      <div>
        <h3 className="text-xl font-semibold mb-4">All Resources</h3>
        
        <div className="space-y-3">
          {allResources.map((resource) => {
            const IconComponent = getResourceIcon(resource.type);
            return (
              <Card key={resource.id} className="hover:shadow-sm transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="p-2 bg-ehrdc-teal/10 rounded-lg">
                        <IconComponent className="h-5 w-5 text-ehrdc-teal" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{resource.title}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {resource.description}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className={getTypeColor(resource.type)}>
                            {resource.type.toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className={getCategoryColor(resource.category)}>
                            {resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {resource.download_count.toLocaleString()} downloads
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownload(resource)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      {resource.type === 'webinar' ? 'Join' : 'Download'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Help Section */}
      <Card className="bg-ehrdc-teal/5 border-ehrdc-teal/20">
        <CardContent className="p-6 text-center">
          <HelpCircle className="mx-auto h-12 w-12 text-ehrdc-teal mb-4" />
          <h3 className="text-lg font-semibold mb-2">Need Additional Help?</h3>
          <p className="text-muted-foreground mb-4">
            Can't find the resource you're looking for? Our support team is here to help you 
            find the right information for your educational journey.
          </p>
          <Button variant="outline" className="border-ehrdc-teal text-ehrdc-teal hover:bg-ehrdc-teal hover:text-white">
            Contact Support
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourcesSection;
