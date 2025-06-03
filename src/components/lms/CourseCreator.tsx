
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const CourseCreator: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    difficulty: '',
    duration: '',
    price: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate course creation
    toast({
      title: "Course Created",
      description: "Your course has been created successfully!",
    });
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      category: '',
      difficulty: '',
      duration: '',
      price: ''
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create New Course
          </CardTitle>
          <CardDescription>
            Build and publish your own educational courses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Course Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter course title"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="personal-development">Personal Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty Level</Label>
                <Select value={formData.difficulty} onValueChange={(value) => handleInputChange('difficulty', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
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
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  placeholder="Course duration"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Course Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe what students will learn in this course"
                rows={4}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Price (AED)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder="0 for free course"
              />
            </div>
            
            <div className="flex gap-4 pt-4">
              <Button type="submit" className="ehrdc-button-primary">
                <span className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  <span>Create Course</span>
                </span>
              </Button>
              <Button type="button" variant="outline">
                Save as Draft
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Course Builder Tools</h3>
          <p className="text-muted-foreground text-center">
            Advanced course building features including lesson creation, quiz builder, and multimedia content management will be available here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
