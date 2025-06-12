
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/layout/Layout';
import { 
  FileText, Search, Shield, Plus, Edit, Eye, Trash2, 
  Loader2, Filter, Calendar, User, Tag 
} from 'lucide-react';
import { ContentItem, ContentCategory, ContentFilters, ContentType, ContentStatus } from '@/types/content';
import ContentEditor from '@/components/admin/content/ContentEditor';
import ContentPreview from '@/components/admin/content/ContentPreview';

const ContentManagementPage: React.FC = () => {
  const { user, hasRole } = useAuth();
  const { toast } = useToast();
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [categories, setCategories] = useState<ContentCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ContentFilters>({});
  const [showEditor, setShowEditor] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);

  // Check if user has content management permissions
  const isAuthorized = hasRole('administrator') || hasRole('super_user');

  useEffect(() => {
    if (!user) return;
    
    if (!isAuthorized) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive"
      });
      return;
    }

    fetchContentItems();
    fetchCategories();
  }, [user, isAuthorized]);

  const fetchContentItems = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('content_items')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setContentItems(data || []);
    } catch (error) {
      console.error('Error fetching content items:', error);
      toast({
        title: "Error",
        description: "Failed to fetch content items. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('content_categories')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCreateContent = () => {
    setSelectedContent(null);
    setShowEditor(true);
  };

  const handleEditContent = (content: ContentItem) => {
    setSelectedContent(content);
    setShowEditor(true);
  };

  const handlePreviewContent = (content: ContentItem) => {
    setSelectedContent(content);
    setShowPreview(true);
  };

  const handleDeleteContent = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this content item?')) {
      return;
    }

    try {
      setProcessingId(id);
      const { error } = await supabase
        .from('content_items')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setContentItems(prev => prev.filter(item => item.id !== id));
      toast({
        title: "Success",
        description: "Content item deleted successfully."
      });
    } catch (error) {
      console.error('Error deleting content:', error);
      toast({
        title: "Error",
        description: "Failed to delete content item. Please try again.",
        variant: "destructive"
      });
    } finally {
      setProcessingId(null);
    }
  };

  const handleStatusChange = async (id: string, newStatus: ContentStatus) => {
    try {
      setProcessingId(id);
      const updates: any = { status: newStatus };
      
      if (newStatus === 'published') {
        updates.published_date = new Date().toISOString();
      }

      const { error } = await supabase
        .from('content_items')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      setContentItems(prev => prev.map(item => 
        item.id === id 
          ? { ...item, ...updates }
          : item
      ));

      toast({
        title: "Success",
        description: `Content status updated to ${newStatus}.`
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update content status. Please try again.",
        variant: "destructive"
      });
    } finally {
      setProcessingId(null);
    }
  };

  const filteredContent = contentItems.filter(item => {
    if (filters.search && !item.title.toLowerCase().includes(filters.search.toLowerCase()) && 
        !item.content.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.status && item.status !== filters.status) return false;
    if (filters.content_type && item.content_type !== filters.content_type) return false;
    if (filters.category && item.category !== filters.category) return false;
    return true;
  });

  const getStatusColor = (status: ContentStatus) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'pending_review': return 'bg-yellow-100 text-yellow-800';
      case 'published': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-64">
          <p>Please sign in to access this page.</p>
        </div>
      </Layout>
    );
  }

  if (!isAuthorized) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Access Restricted</h2>
            <p className="text-muted-foreground">You don't have permission to access the content management panel.</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (showEditor) {
    return (
      <ContentEditor
        content={selectedContent}
        categories={categories}
        onSave={(savedContent) => {
          if (selectedContent) {
            setContentItems(prev => prev.map(item => 
              item.id === savedContent.id ? savedContent : item
            ));
          } else {
            setContentItems(prev => [savedContent, ...prev]);
          }
          setShowEditor(false);
          toast({
            title: "Success",
            description: selectedContent ? "Content updated successfully." : "Content created successfully."
          });
        }}
        onCancel={() => setShowEditor(false)}
      />
    );
  }

  if (showPreview && selectedContent) {
    return (
      <ContentPreview
        content={selectedContent}
        onClose={() => setShowPreview(false)}
        onEdit={() => {
          setShowPreview(false);
          setShowEditor(true);
        }}
      />
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Content Management</h1>
            <p className="text-muted-foreground">Create, edit, and manage dynamic content across the platform</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              {filteredContent.length} Items
            </Badge>
            <Button onClick={handleCreateContent} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Content
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search content..."
                  value={filters.search || ''}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="pl-10"
                />
              </div>
              
              <Select 
                value={filters.status || 'all'} 
                onValueChange={(value) => setFilters(prev => ({ 
                  ...prev, 
                  status: value === 'all' ? undefined : value as ContentStatus 
                }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="pending_review">Pending Review</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>

              <Select 
                value={filters.content_type || 'all'} 
                onValueChange={(value) => setFilters(prev => ({ 
                  ...prev, 
                  content_type: value === 'all' ? undefined : value as ContentType 
                }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Content Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="training_material">Training Material</SelectItem>
                  <SelectItem value="job_description">Job Description</SelectItem>
                  <SelectItem value="thought_leadership">Thought Leadership</SelectItem>
                  <SelectItem value="announcement">Announcement</SelectItem>
                </SelectContent>
              </Select>

              <Select 
                value={filters.category || 'all'} 
                onValueChange={(value) => setFilters(prev => ({ 
                  ...prev, 
                  category: value === 'all' ? undefined : value 
                }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => setFilters({})}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Content List */}
        {loading ? (
          <div className="flex items-center justify-center min-h-64">
            <div className="flex items-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin" />
              <p>Loading content...</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredContent.map(item => (
              <Card key={item.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription className="mt-2">
                        {item.excerpt || item.content.substring(0, 150) + '...'}
                      </CardDescription>
                      <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(item.updated_at).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {item.author_id ? 'Author' : 'System'}
                        </div>
                        <div className="flex items-center gap-1">
                          <Tag className="h-4 w-4" />
                          {item.category}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Badge className={getStatusColor(item.status)}>
                        {item.status.replace('_', ' ')}
                      </Badge>
                      <Badge variant="outline">
                        {item.content_type.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handlePreviewContent(item)}
                        className="flex items-center gap-1"
                      >
                        <Eye className="h-3 w-3" />
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditContent(item)}
                        className="flex items-center gap-1"
                      >
                        <Edit className="h-3 w-3" />
                        Edit
                      </Button>
                      <Select 
                        value={item.status} 
                        onValueChange={(value) => handleStatusChange(item.id, value as ContentStatus)}
                        disabled={processingId === item.id}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="pending_review">Pending Review</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteContent(item.id)}
                        disabled={processingId === item.id}
                        className="flex items-center gap-1"
                      >
                        {processingId === item.id ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <Trash2 className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {filteredContent.length === 0 && !loading && (
              <Card>
                <CardContent className="py-12 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Content Found</h3>
                  <p className="text-muted-foreground mb-4">
                    {Object.keys(filters).length > 0 
                      ? 'Try adjusting your filters or create new content.' 
                      : 'Get started by creating your first content item.'
                    }
                  </p>
                  <Button onClick={handleCreateContent} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Create Content
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ContentManagementPage;
