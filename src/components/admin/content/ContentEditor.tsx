
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/layout/Layout';
import { Save, X, ArrowLeft, Plus, Loader2 } from 'lucide-react';
import { ContentItem, ContentCategory, ContentType, ContentStatus } from '@/types/content';

interface ContentEditorProps {
  content?: ContentItem | null;
  categories: ContentCategory[];
  onSave: (content: ContentItem) => void;
  onCancel: () => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({
  content,
  categories,
  onSave,
  onCancel
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    content_type: 'training_material' as ContentType,
    status: 'draft' as ContentStatus,
    tags: [] as string[],
    featured_image_url: ''
  });
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (content) {
      setFormData({
        title: content.title,
        content: content.content,
        excerpt: content.excerpt || '',
        category: content.category,
        content_type: content.content_type,
        status: content.status,
        tags: content.tags || [],
        featured_image_url: content.featured_image_url || ''
      });
    }
  }, [content]);

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.content.trim() || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);

      const contentData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        excerpt: formData.excerpt.trim() || null,
        category: formData.category,
        content_type: formData.content_type,
        status: formData.status,
        tags: formData.tags,
        featured_image_url: formData.featured_image_url.trim() || null,
        author_id: user?.id,
        published_date: formData.status === 'published' ? new Date().toISOString() : null,
        metadata: {}
      };

      let result;
      if (content) {
        // Update existing content
        const { data, error } = await supabase
          .from('content_items')
          .update(contentData)
          .eq('id', content.id)
          .select()
          .single();
        
        if (error) throw error;
        result = data;
      } else {
        // Create new content
        const { data, error } = await supabase
          .from('content_items')
          .insert(contentData)
          .select()
          .single();
        
        if (error) throw error;
        result = data;
      }

      onSave(result);
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: "Error",
        description: "Failed to save content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredCategories = categories.filter(cat => 
    cat.content_type === formData.content_type
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={onCancel}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold">
                {content ? 'Edit Content' : 'Create Content'}
              </h1>
              <p className="text-muted-foreground">
                {content ? 'Update existing content' : 'Create new content for the platform'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={loading}
              className="flex items-center gap-2"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {content ? 'Update' : 'Create'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter content title..."
                  />
                </div>

                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Brief description or excerpt..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="content">Content *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Enter the main content..."
                    rows={15}
                    className="font-mono"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Supports HTML and Markdown formatting
                  </p>
                </div>

                <div>
                  <Label htmlFor="featured_image_url">Featured Image URL</Label>
                  <Input
                    id="featured_image_url"
                    value={formData.featured_image_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured_image_url: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Publishing Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status">Status *</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as ContentStatus }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="pending_review">Pending Review</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="content_type">Content Type *</Label>
                  <Select 
                    value={formData.content_type} 
                    onValueChange={(value) => {
                      setFormData(prev => ({ 
                        ...prev, 
                        content_type: value as ContentType,
                        category: '' // Reset category when content type changes
                      }));
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="training_material">Training Material</SelectItem>
                      <SelectItem value="job_description">Job Description</SelectItem>
                      <SelectItem value="thought_leadership">Thought Leadership</SelectItem>
                      <SelectItem value="announcement">Announcement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredCategories.map(category => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag..."
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={handleAddTag}
                    disabled={!newTag.trim()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContentEditor;
