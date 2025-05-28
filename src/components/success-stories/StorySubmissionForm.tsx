
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { X, Upload, Link as LinkIcon } from 'lucide-react';
import { StorySubmissionData } from '@/types/successStories';
import { SuccessStoriesService } from '@/services/successStoriesService';

const submissionSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters').max(100, 'Title must be less than 100 characters'),
  summary: z.string().min(50, 'Summary must be at least 50 characters').max(300, 'Summary must be less than 300 characters'),
  content: z.string().min(500, 'Story content must be at least 500 characters'),
  category: z.enum(['career_progression', 'entrepreneurship', 'education', 'innovation', 'leadership', 'skills_development']),
  tags: z.array(z.string()).min(1, 'Please add at least one tag').max(8, 'Maximum 8 tags allowed'),
  video_url: z.string().url().optional().or(z.literal('')),
  career_growth: z.string().optional(),
  impact: z.string().optional(),
  timeline: z.string().optional()
});

type SubmissionFormData = z.infer<typeof submissionSchema>;

interface StorySubmissionFormProps {
  onSubmissionComplete?: () => void;
}

const StorySubmissionForm: React.FC<StorySubmissionFormProps> = ({ onSubmissionComplete }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTag, setCurrentTag] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const form = useForm<SubmissionFormData>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      title: '',
      summary: '',
      content: '',
      category: 'career_progression',
      tags: [],
      video_url: '',
      career_growth: '',
      impact: '',
      timeline: ''
    }
  });

  const categoryOptions = [
    { value: 'career_progression', label: 'Career Progression' },
    { value: 'entrepreneurship', label: 'Entrepreneurship' },
    { value: 'education', label: 'Education' },
    { value: 'innovation', label: 'Innovation' },
    { value: 'leadership', label: 'Leadership' },
    { value: 'skills_development', label: 'Skills Development' }
  ];

  const addTag = () => {
    if (currentTag.trim() && !form.getValues('tags').includes(currentTag.trim())) {
      const currentTags = form.getValues('tags');
      if (currentTags.length < 8) {
        form.setValue('tags', [...currentTags, currentTag.trim()]);
        setCurrentTag('');
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    const currentTags = form.getValues('tags');
    form.setValue('tags', currentTags.filter(tag => tag !== tagToRemove));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you would upload to a cloud service
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  };

  const onSubmit = async (data: SubmissionFormData) => {
    setIsSubmitting(true);
    
    try {
      const submissionData: StorySubmissionData = {
        title: data.title,
        summary: data.summary,
        content: data.content,
        category: data.category,
        tags: data.tags,
        media: {
          featured_image: uploadedImage || undefined,
          video_url: data.video_url || undefined
        },
        metrics: {
          career_growth: data.career_growth || undefined,
          impact: data.impact || undefined,
          timeline: data.timeline || undefined
        }
      };

      await SuccessStoriesService.submitStory(submissionData);
      
      toast({
        title: "Story Submitted Successfully!",
        description: "Your success story has been submitted for review. You'll be notified once it's published.",
      });

      form.reset();
      setUploadedImage(null);
      
      if (onSubmissionComplete) {
        onSubmissionComplete();
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your story. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Share Your Success Story</CardTitle>
        <CardDescription>
          Inspire other Emiratis by sharing your career journey, achievements, and lessons learned. 
          Your story will be reviewed by our editorial team before publication.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Story Title</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., From Graduate to Tech Leader: My Journey in Dubai's Innovation Hub"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Create an engaging title that captures the essence of your story
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categoryOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <div className="space-y-2">
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Add a tag (e.g., technology, leadership)"
                          value={currentTag}
                          onChange={(e) => setCurrentTag(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        />
                        <Button type="button" onClick={addTag} variant="outline">
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {field.value.map((tag) => (
                          <Badge key={tag} variant="secondary" className="flex items-center space-x-1">
                            <span>{tag}</span>
                            <X 
                              className="h-3 w-3 cursor-pointer" 
                              onClick={() => removeTag(tag)}
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <FormDescription>
                      Add relevant tags to help people discover your story
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Story Summary</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Write a compelling summary that gives readers a preview of your journey..."
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    A brief overview that will be displayed in story previews (50-300 characters)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Story</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell your complete story... Share the challenges you faced, decisions you made, lessons you learned, and advice you'd give to others following a similar path."
                      className="min-h-[300px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Share your complete journey with details, challenges, achievements, and insights (minimum 500 characters)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Media Upload Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Media (Optional)</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Featured Image</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      {uploadedImage ? (
                        <div>
                          <img src={uploadedImage} alt="Preview" className="h-32 w-full object-cover rounded mb-2" />
                          <p className="text-sm text-muted-foreground">Click to change image</p>
                        </div>
                      ) : (
                        <div>
                          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">Click to upload an image</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="video_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Video URL (Optional)</FormLabel>
                      <FormControl>
                        <div className="flex">
                          <Input 
                            placeholder="https://youtube.com/watch?v=..."
                            {...field} 
                          />
                          <LinkIcon className="h-4 w-4 ml-2 mt-3 text-muted-foreground" />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Add a YouTube or Vimeo link if you have a video component
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Metrics Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Impact Metrics (Optional)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="career_growth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Career Growth</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., 300% salary increase"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="impact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Impact/Achievement</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., Led team of 50+ people"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timeline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Timeline</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., 2018-2023"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => form.reset()}>
                Clear Form
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Story'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default StorySubmissionForm;
