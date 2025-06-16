
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  Camera, 
  Video, 
  Mic, 
  FileText, 
  Users, 
  Calendar,
  Archive,
  Star,
  Share,
  Download,
  Eye,
  Heart
} from 'lucide-react';
import { CulturalStory, TraditionalSkill, OralHistoryInterview } from '@/types/cultural-preservation';

interface CulturalHeritageDocumentationProps {
  stories?: CulturalStory[];
  skills?: TraditionalSkill[];
  interviews?: OralHistoryInterview[];
}

export const CulturalHeritageDocumentation: React.FC<CulturalHeritageDocumentationProps> = ({
  stories = [],
  skills = [],
  interviews = []
}) => {
  const [activeTab, setActiveTab] = useState('stories');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Mock data for demonstration
  const mockStories: CulturalStory[] = [
    {
      id: '1',
      title: 'The Pearl Diving Traditions of Abu Dhabi',
      content: 'A rich tradition passed down through generations...',
      narrator_id: 'narrator1',
      story_type: 'oral_tradition',
      dialect_used: 'Emirati Gulf',
      location: 'Abu Dhabi',
      time_period: '1920s-1960s',
      tags: ['pearl diving', 'tradition', 'sea', 'heritage'],
      multimedia_attachments: [],
      verification_status: 'verified',
      cultural_significance: 'Represents the historical economic foundation of the UAE',
      related_traditions: ['fishing', 'boat building'],
      created_at: '2024-01-15',
      updated_at: '2024-01-15',
      is_featured: true,
      privacy_level: 'public'
    },
    {
      id: '2',
      title: 'Traditional Wedding Celebrations in Northern Emirates',
      content: 'The customs and rituals of Emirati weddings...',
      narrator_id: 'narrator2',
      story_type: 'family_history',
      location: 'Ras Al Khaimah',
      time_period: '1950s-present',
      tags: ['wedding', 'celebration', 'family', 'customs'],
      multimedia_attachments: [],
      verification_status: 'published',
      cultural_significance: 'Preserves traditional marriage customs and community bonding',
      related_traditions: ['henna ceremonies', 'traditional music'],
      created_at: '2024-01-10',
      updated_at: '2024-01-12',
      is_featured: false,
      privacy_level: 'community'
    }
  ];

  const mockSkills: TraditionalSkill[] = [
    {
      id: '1',
      skill_name_ar: 'صناعة السدو',
      skill_name_en: 'Sadu Weaving',
      category: 'craft',
      description: 'Traditional Bedouin weaving technique used to create tents, rugs, and other textiles',
      historical_significance: 'Essential skill for nomadic life in the desert',
      required_materials: ['wool', 'camel hair', 'goat hair', 'traditional loom'],
      steps_documentation: [],
      master_practitioners: ['Master Fatima Al Mazrouei', 'Master Aisha Al Mansoori'],
      learning_difficulty: 'intermediate',
      time_to_learn: '6-12 months for basic proficiency',
      cultural_context: 'Central to Bedouin identity and practical desert living',
      regional_variations: ['Al Dhafra style', 'Al Ain style'],
      endangered_status: 'vulnerable',
      documentation_completeness: 85,
      created_at: '2024-01-05',
      updated_at: '2024-01-15'
    },
    {
      id: '2',
      skill_name_ar: 'صناعة الخوص',
      skill_name_en: 'Palm Frond Crafting',
      category: 'craft',
      description: 'Traditional craft of weaving palm fronds into baskets, mats, and household items',
      historical_significance: 'Sustainable use of date palm resources for daily necessities',
      required_materials: ['date palm fronds', 'natural dyes', 'weaving tools'],
      steps_documentation: [],
      master_practitioners: ['Master Mohammed Al Dhaheri'],
      learning_difficulty: 'beginner',
      time_to_learn: '2-4 months for basic items',
      cultural_context: 'Reflects the deep connection between Emiratis and the date palm',
      regional_variations: ['Liwa oasis style', 'East coast style'],
      endangered_status: 'vulnerable',
      documentation_completeness: 70,
      created_at: '2024-01-08',
      updated_at: '2024-01-14'
    }
  ];

  const renderStoriesTab = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search stories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stories</SelectItem>
            <SelectItem value="family_history">Family History</SelectItem>
            <SelectItem value="community_story">Community Stories</SelectItem>
            <SelectItem value="oral_tradition">Oral Traditions</SelectItem>
            <SelectItem value="personal_narrative">Personal Narratives</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6">
        {mockStories.map((story) => (
          <Card key={story.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="mb-2">{story.title}</CardTitle>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="outline">{story.story_type.replace('_', ' ')}</Badge>
                    <Badge variant="secondary">{story.location}</Badge>
                    {story.time_period && (
                      <Badge variant="outline">{story.time_period}</Badge>
                    )}
                    {story.is_featured && (
                      <Badge variant="success">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">
                    {story.cultural_significance}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1 mb-4">
                {story.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>Added on {new Date(story.created_at).toLocaleDateString()}</span>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    {Math.floor(Math.random() * 50) + 10}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {Math.floor(Math.random() * 200) + 50}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-dashed">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="bg-ehrdc-teal/10 rounded-full p-3">
                <FileText className="h-8 w-8 text-ehrdc-teal" />
              </div>
            </div>
            <h3 className="text-lg font-semibold">Share Your Cultural Story</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Contribute to preserving Emirati heritage by sharing your family stories, 
              community memories, or traditional knowledge.
            </p>
            <Button className="bg-ehrdc-teal hover:bg-ehrdc-dark-teal">
              <FileText className="h-4 w-4 mr-2" />
              Start Documenting
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSkillsTab = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search traditional skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Skills</SelectItem>
            <SelectItem value="craft">Crafts</SelectItem>
            <SelectItem value="cooking">Cooking</SelectItem>
            <SelectItem value="music">Music</SelectItem>
            <SelectItem value="poetry">Poetry</SelectItem>
            <SelectItem value="agriculture">Agriculture</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6">
        {mockSkills.map((skill) => (
          <Card key={skill.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="mb-2">
                    {skill.skill_name_en}
                    <span className="text-lg font-normal text-muted-foreground mr-2">
                      ({skill.skill_name_ar})
                    </span>
                  </CardTitle>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="outline">{skill.category}</Badge>
                    <Badge variant="secondary">{skill.learning_difficulty}</Badge>
                    <Badge variant={skill.endangered_status === 'safe' ? 'success' : 'destructive'}>
                      {skill.endangered_status}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">
                    {skill.description}
                  </p>
                  <p className="text-xs text-muted-foreground mb-3">
                    <strong>Cultural Context:</strong> {skill.cultural_context}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Video className="h-4 w-4 mr-1" />
                    Learn
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-1" />
                    Guide
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Documentation Progress</span>
                    <span className="text-sm text-muted-foreground">
                      {skill.documentation_completeness}%
                    </span>
                  </div>
                  <Progress value={skill.documentation_completeness} className="h-2" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Learning Time:</span>
                    <p className="text-muted-foreground">{skill.time_to_learn}</p>
                  </div>
                  <div>
                    <span className="font-medium">Master Practitioners:</span>
                    <p className="text-muted-foreground">
                      {skill.master_practitioners.slice(0, 2).join(', ')}
                      {skill.master_practitioners.length > 2 && '...'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {skill.required_materials.slice(0, 4).map((material, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {material}
                    </Badge>
                  ))}
                  {skill.required_materials.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{skill.required_materials.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-dashed">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="bg-ehrdc-teal/10 rounded-full p-3">
                <Users className="h-8 w-8 text-ehrdc-teal" />
              </div>
            </div>
            <h3 className="text-lg font-semibold">Teach a Traditional Skill</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Share your expertise and help preserve traditional Emirati skills for future generations.
            </p>
            <Button className="bg-ehrdc-teal hover:bg-ehrdc-dark-teal">
              <Users className="h-4 w-4 mr-2" />
              Become an Instructor
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderOralHistoryTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mic className="h-5 w-5 text-ehrdc-teal" />
            Oral History Collection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Preserve the voices and memories of our elders through recorded interviews 
            and storytelling sessions that capture the essence of Emirati life and wisdom.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            <Button className="bg-ehrdc-teal hover:bg-ehrdc-dark-teal">
              <Mic className="h-4 w-4 mr-2" />
              Record Interview
            </Button>
            <Button variant="outline">
              <Video className="h-4 w-4 mr-2" />
              Video Story
            </Button>
            <Button variant="outline">
              <Archive className="h-4 w-4 mr-2" />
              Browse Archive
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">
                  Stories from the Desert: Life Before Oil
                </CardTitle>
                <p className="text-muted-foreground">
                  Interview with Elder Hamad Al Mansoori
                </p>
              </div>
              <Badge variant="success">Verified</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Mic className="h-4 w-4 text-ehrdc-teal" />
                  <span className="text-sm">45 min</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-ehrdc-teal" />
                  <span className="text-sm">Dec 2024</span>
                </div>
              </div>
              <Button size="sm">Listen</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">
                  Traditional Emirati Cuisine Memories
                </CardTitle>
                <p className="text-muted-foreground">
                  Interview with Umm Khalid Al Dhaheri
                </p>
              </div>
              <Badge variant="outline">Processing</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Video className="h-4 w-4 text-ehrdc-teal" />
                  <span className="text-sm">1h 20 min</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-ehrdc-teal" />
                  <span className="text-sm">Nov 2024</span>
                </div>
              </div>
              <Button size="sm" variant="outline">Preview</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Archive className="h-6 w-6 text-ehrdc-teal" />
            Cultural Heritage Documentation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Discover, document, and preserve the rich cultural heritage of the UAE through 
            stories, traditional skills, and oral histories that connect our past with our future.
          </p>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="stories">Cultural Stories</TabsTrigger>
          <TabsTrigger value="skills">Traditional Skills</TabsTrigger>
          <TabsTrigger value="oral-history">Oral History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="stories">{renderStoriesTab()}</TabsContent>
        <TabsContent value="skills">{renderSkillsTab()}</TabsContent>
        <TabsContent value="oral-history">{renderOralHistoryTab()}</TabsContent>
      </Tabs>
    </div>
  );
};
