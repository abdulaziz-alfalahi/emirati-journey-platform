
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { X, Plus, Video, HelpCircle, Code, FileText } from 'lucide-react';
import { lmsService } from '@/services/lmsService';
import { useToast } from '@/hooks/use-toast';
import { InteractiveLessonBuilder } from './InteractiveLessonBuilder';
import type { CreateCourseData } from '@/types/lms';

export const CourseCreator: React.FC = () => {
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  const [currentTab, setCurrentTab] = useState('basic');
  const [showLessonBuilder, setShowLessonBuilder] = useState(false);
  
  const [formData, setFormData] = useState<CreateCourseData>({
    title: '',
    description: '',
    category: '',
    difficulty_level: 'beginner',
    duration_hours: 0,
    price: 0,
    currency: 'AED',
    prerequisites: [],
    learning_objectives: [],
    tags: []
  });

  const [courseStructure, setCourseStructure] = useState({
    modules: [] as Array<{
      id: string;
      title: string;
      description: string;
      lessons: Array<{
        id: string;
        title: string;
        type: 'text' | 'video' | 'interactive';
        content: any;
      }>;
    }>,
    hasInteractiveContent: false,
    hasQuizzes: false,
    hasExercises: false
  });

  const [newPrerequisite, setNewPrerequisite] = useState('');
  const [newObjective, setNewObjective] = useState('');
  const [newTag, setNewTag] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    try {
      await lmsService.createCourse(formData);
      toast({
        title: "Course Created",
        description: "Your course has been created successfully!"
      });
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        difficulty_level: 'beginner',
        duration_hours: 0,
        price: 0,
        currency: 'AED',
        prerequisites: [],
        learning_objectives: [],
        tags: []
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create course. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };

  const addPrerequisite = () => {
    if (newPrerequisite.trim()) {
      setFormData(prev => ({
        ...prev,
        prerequisites: [...prev.prerequisites!, newPrerequisite.trim()]
      }));
      setNewPrerequisite('');
    }
  };

  const removePrerequisite = (index: number) => {
    setFormData(prev => ({
      ...prev,
      prerequisites: prev.prerequisites!.filter((_, i) => i !== index)
    }));
  };

  const addObjective = () => {
    if (newObjective.trim()) {
      setFormData(prev => ({
        ...prev,
        learning_objectives: [...prev.learning_objectives!, newObjective.trim()]
      }));
      setNewObjective('');
    }
  };

  const removeObjective = (index: number) => {
    setFormData(prev => ({
      ...prev,
      learning_objectives: prev.learning_objectives!.filter((_, i) => i !== index)
    }));
  };

  const addTag = () => {
    if (newTag.trim()) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags!, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags!.filter((_, i) => i !== index)
    }));
  };

  const addModule = () => {
    const newModule = {
      id: Date.now().toString(),
      title: `Module ${courseStructure.modules.length + 1}`,
      description: '',
      lessons: []
    };
    setCourseStructure(prev => ({
      ...prev,
      modules: [...prev.modules, newModule]
    }));
  };

  const updateModule = (moduleId: string, updates: any) => {
    setCourseStructure(prev => ({
      ...prev,
      modules: prev.modules.map(module =>
        module.id === moduleId ? { ...module, ...updates } : module
      )
    }));
  };

  const addLessonToModule = (moduleId: string, lessonType: 'text' | 'video' | 'interactive') => {
    const newLesson = {
      id: Date.now().toString(),
      title: `New ${lessonType} lesson`,
      type: lessonType,
      content: {}
    };
    
    setCourseStructure(prev => ({
      ...prev,
      modules: prev.modules.map(module =>
        module.id === moduleId
          ? { ...module, lessons: [...module.lessons, newLesson] }
          : module
      ),
      hasInteractiveContent: lessonType === 'interactive' || prev.hasInteractiveContent
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    try {
      await lmsService.createCourse(formData);
      toast({
        title: "Course Created",
        description: "Your course has been created successfully!"
      });
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        difficulty_level: 'beginner',
        duration_hours: 0,
        price: 0,
        currency: 'AED',
        prerequisites: [],
        learning_objectives: [],
        tags: []
      });
      setCourseStructure({
        modules: [],
        hasInteractiveContent: false,
        hasQuizzes: false,
        hasExercises: false
      });
      setCurrentTab('basic');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create course. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };

  if (showLessonBuilder) {
    return (
      <InteractiveLessonBuilder
        onSave={(blocks) => {
          console.log('Lesson blocks saved:', blocks);
          setShowLessonBuilder(false);
          toast({
            title: "Lesson Saved",
            description: "Interactive lesson content has been saved."
          });
        }}
        onCancel={() => setShowLessonBuilder(false)}
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Course</CardTitle>
        <CardDescription>
          Set up your course details and interactive content structure
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs value={currentTab} onValueChange={setCurrentTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="structure">Course Structure</TabsTrigger>
            <TabsTrigger value="interactive">Interactive Content</TabsTrigger>
            <TabsTrigger value="review">Review & Publish</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Course Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="health">Health & Wellness</SelectItem>
                      <SelectItem value="language">Language</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what students will learn in this course..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select
                    value={formData.difficulty_level}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, difficulty_level: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (hours)</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="0"
                    value={formData.duration_hours || ''}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      duration_hours: parseInt(e.target.value) || 0 
                    }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price">Price (AED)</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price || ''}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      price: parseFloat(e.target.value) || 0 
                    }))}
                  />
                </div>
              </div>

              {/* Prerequisites */}
              <div className="space-y-2">
                <Label>Prerequisites</Label>
                <div className="flex gap-2">
                  <Input
                    value={newPrerequisite}
                    onChange={(e) => setNewPrerequisite(e.target.value)}
                    placeholder="Add a prerequisite..."
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPrerequisite())}
                  />
                  <Button type="button" onClick={addPrerequisite} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {formData.prerequisites && formData.prerequisites.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.prerequisites.map((prereq, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {prereq}
                        <button
                          type="button"
                          onClick={() => removePrerequisite(index)}
                          className="ml-1 hover:bg-gray-200 rounded-full"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Learning Objectives */}
              <div className="space-y-2">
                <Label>Learning Objectives</Label>
                <div className="flex gap-2">
                  <Input
                    value={newObjective}
                    onChange={(e) => setNewObjective(e.target.value)}
                    placeholder="Add a learning objective..."
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addObjective())}
                  />
                  <Button type="button" onClick={addObjective} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {formData.learning_objectives && formData.learning_objectives.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.learning_objectives.map((objective, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {objective}
                        <button
                          type="button"
                          onClick={() => removeObjective(index)}
                          className="ml-1 hover:bg-gray-200 rounded-full"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag..."
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {formData.tags && formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(index)}
                          className="ml-1 hover:bg-gray-200 rounded-full"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </form>
          </TabsContent>

          <TabsContent value="structure" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Course Modules</h3>
              <Button onClick={addModule}>
                <Plus className="h-4 w-4 mr-2" />
                Add Module
              </Button>
            </div>

            {courseStructure.modules.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No modules yet. Add your first module to get started.
              </div>
            ) : (
              <div className="space-y-4">
                {courseStructure.modules.map((module, index) => (
                  <Card key={module.id}>
                    <CardHeader>
                      <div className="flex gap-4">
                        <Input
                          value={module.title}
                          onChange={(e) => updateModule(module.id, { title: e.target.value })}
                          placeholder="Module title"
                        />
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addLessonToModule(module.id, 'text')}
                          >
                            <FileText className="h-4 w-4 mr-1" />
                            Text
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addLessonToModule(module.id, 'video')}
                          >
                            <Video className="h-4 w-4 mr-1" />
                            Video
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addLessonToModule(module.id, 'interactive')}
                          >
                            <Code className="h-4 w-4 mr-1" />
                            Interactive
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    {module.lessons.length > 0 && (
                      <CardContent>
                        <div className="space-y-2">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <div key={lesson.id} className="flex items-center justify-between p-2 border rounded">
                              <div className="flex items-center gap-2">
                                {lesson.type === 'video' && <Video className="h-4 w-4" />}
                                {lesson.type === 'text' && <FileText className="h-4 w-4" />}
                                {lesson.type === 'interactive' && <Code className="h-4 w-4" />}
                                <span>{lesson.title}</span>
                                <Badge variant="outline" className="text-xs">
                                  {lesson.type}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="interactive" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Interactive Content Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <HelpCircle className="h-5 w-5" />
                        <div>
                          <div className="font-medium">Quizzes</div>
                          <div className="text-sm text-muted-foreground">
                            Interactive assessments
                          </div>
                        </div>
                      </div>
                      <Switch
                        checked={courseStructure.hasQuizzes}
                        onCheckedChange={(checked) => 
                          setCourseStructure(prev => ({ ...prev, hasQuizzes: checked }))
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Code className="h-5 w-5" />
                        <div>
                          <div className="font-medium">Exercises</div>
                          <div className="text-sm text-muted-foreground">
                            Hands-on practice
                          </div>
                        </div>
                      </div>
                      <Switch
                        checked={courseStructure.hasExercises}
                        onCheckedChange={(checked) => 
                          setCourseStructure(prev => ({ ...prev, hasExercises: checked }))
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Video className="h-5 w-5" />
                        <div>
                          <div className="font-medium">Multimedia</div>
                          <div className="text-sm text-muted-foreground">
                            Rich media content
                          </div>
                        </div>
                      </div>
                      <Switch
                        checked={courseStructure.hasInteractiveContent}
                        onCheckedChange={(checked) => 
                          setCourseStructure(prev => ({ ...prev, hasInteractiveContent: checked }))
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Button onClick={() => setShowLessonBuilder(true)}>
                Open Interactive Lesson Builder
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="review" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Course Summary</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Title</Label>
                  <p>{formData.title || 'Not set'}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Category</Label>
                  <p>{formData.category || 'Not set'}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Modules</Label>
                  <p>{courseStructure.modules.length} modules</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Interactive Features</Label>
                  <div className="flex gap-2">
                    {courseStructure.hasQuizzes && <Badge>Quizzes</Badge>}
                    {courseStructure.hasExercises && <Badge>Exercises</Badge>}
                    {courseStructure.hasInteractiveContent && <Badge>Multimedia</Badge>}
                    {!courseStructure.hasQuizzes && !courseStructure.hasExercises && !courseStructure.hasInteractiveContent && (
                      <span className="text-muted-foreground">None selected</span>
                    )}
                  </div>
                </div>
              </div>

              <Button type="submit" disabled={isCreating} className="w-full" onClick={handleSubmit}>
                {isCreating ? 'Creating Course...' : 'Create Course'}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
