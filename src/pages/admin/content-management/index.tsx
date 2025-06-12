
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { ContentItem, ContentCategory, ContentFilters, ContentType, ContentStatus } from '@/types/content';
import Layout from '@/components/layout/Layout';
import { Plus, Search, FileText, Eye, Edit, Trash2, Filter } from 'lucide-react';
import ContentEditor from '@/components/admin/content/ContentEditor';
import ContentPreview from '@/components/admin/content/ContentPreview';

const ContentManagementPage: React.FC = () => {
  const { user, hasRole } = useAuth();
  const { toast } = useToast();
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [categories, setCategories] = useState<ContentCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ContentFilters>({});
  const [currentView, setCurrentView] = useState<'list' | 'create' | 'edit' | 'preview'>('list');
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);

  // Check if user has admin permissions
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
      
      let query = supabase
        .from('content_items' as any)
        .select('*');

      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      if (filters.content_type) {
        query = query.eq('content_type', filters.content_type);
      }
      if (filters.category) {
        query = query.eq('category', filters.category);
      }
      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,content.ilike.%${filters.search}%`);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setContentItems((data || []) as ContentItem[]);
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
        .from('content_categories' as any)
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) {
        throw error;
      }

      setCategories((data || []) as ContentCategory[]);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({
        title: "Error",
        description: "Failed to fetch categories. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSearch = (searchTerm: string) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
  };

  const handleFilterChange = (key: keyof ContentFilters, value: string) => {
    setFilters(prev => ({ 
      ...prev, 
      [key]: value === 'all' ? undefined : value 
    }));
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this content item?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('content_items' as any)
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setContentItems(prev => prev.filter(item => item.id !== id));
      toast({
        title: "Success",
        description: "Content item deleted successfully."
      });
    } catch (error) {
      console.error('Error deleting content item:', error);
      toast({
        title: "Error",
        description: "Failed to delete content item. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: ContentStatus) => {
    try {
      const updateData: any = { status: newStatus };
      if (newStatus === 'published') {
        updateData.published_date = new Date().toISOString();
      }

      const { error } = await supabase
        .from('content_items' as any)
        .update(updateData)
        .eq('id', id);

      if (error) {
        throw error;
      }

      setContentItems(prev => 
        prev.map(item => 
          item.id === id 
            ? { ...item, status: newStatus, published_date: updateData.published_date || item.published_date }
            : item
        )
      );

      toast({
        title: "Success",
        description: `Content ${newStatus} successfully.`
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update content status. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Apply filters whenever they change
  useEffect(() => {
    fetchContentItems();
  }, [filters]);

  const getStatusColor = (status: ContentStatus) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'pending_review': return 'bg-yellow-100 text-yellow-800';
      case 'published': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Access Restricted</h2>
            <p className="text-muted-foreground">You don't have permission to access the content management panel.</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (currentView === 'create' || currentView === 'edit') {
    return (
      <ContentEditor
        content={selectedContent}
        categories={categories}
        onSave={(savedContent) => {
          if (currentView === 'edit') {
            setContentItems(prev => prev.map(item => 
              item.id === savedContent.id ? savedContent : item
            ));
          } else {
            setContentItems(prev => [savedContent, ...prev]);
          }
          setCurrentView('list');
          setSelectedContent(null);
        }}
        onCancel={() => {
          setCurrentView('list');
          setSelectedContent(null);
        }}
      />
    );
  }

  if (currentView === 'preview' && selectedContent) {
    return (
      <ContentPreview
        content={selectedContent}
        onClose={() => {
          setCurrentView('list');
          setSelectedContent(null);
        }}
        onEdit={() => {
          setCurrentView('edit');
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
            <p className="text-muted-foreground">Create and manage dynamic content across the platform</p>
          </div>
          <Button onClick={() => setCurrentView('create')} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Content
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4 items-center flex-wrap">
              <div className="relative flex-1 min-w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search content..."
                  className="pl-10"
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              
              <Select onValueChange={(value) => handleFilterChange('status', value)}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="pending_review">Pending Review</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => handleFilterChange('content_type', value)}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="training_material">Training Material</SelectItem>
                  <SelectItem value="job_description">Job Description</SelectItem>
                  <SelectItem value="thought_leadership">Thought Leadership</SelectItem>
                  <SelectItem value="announcement">Announcement</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Content List */}
        {loading ? (
          <div className="flex items-center justify-center min-h-64">
            <p>Loading content...</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {contentItems.map(content => (
              <Card key={content.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{content.title}</CardTitle>
                      <CardDescription>
                        {content.excerpt || content.content.substring(0, 150) + '...'}
                      </CardDescription>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span>Category: {content.category}</span>
                        <span>Type: {content.content_type.replace('_', ' ')}</span>
                        <span>Created: {formatDate(content.created_at)}</span>
                        {content.published_date && (
                          <span>Published: {formatDate(content.published_date)}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Badge className={getStatusColor(content.status)}>
                        {content.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedContent(content);
                        setCurrentView('preview');
                      }}
                      className="flex items-center gap-1"
                    >
                      <Eye className="h-3 w-3" />
                      Preview
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedContent(content);
                        setCurrentView('edit');
                      }}
                      className="flex items-center gap-1"
                    >
                      <Edit className="h-3 w-3" />
                      Edit
                    </Button>
                    
                    {content.status === 'draft' && (
                      <Button
                        size="sm"
                        onClick={() => handleStatusUpdate(content.id, 'published')}
                        className="flex items-center gap-1"
                      >
                        Publish
                      </Button>
                    )}
                    
                    {content.status === 'published' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusUpdate(content.id, 'archived')}
                        className="flex items-center gap-1"
                      >
                        Archive
                      </Button>
                    )}
                    
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(content.id)}
                      className="flex items-center gap-1"
                    >
                      <Trash2 className="h-3 w-3" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {contentItems.length === 0 && !loading && (
              <Card>
                <CardContent className="py-12 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Content Found</h3>
                  <p className="text-muted-foreground mb-4">
                    {Object.keys(filters).length > 0 && Object.values(filters).some(v => v)
                      ? 'Try adjusting your search or filter criteria.' 
                      : 'Get started by creating your first content item.'
                    }
                  </p>
                  <Button onClick={() => setCurrentView('create')} className="flex items-center gap-2">
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
