
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Briefcase, Star } from 'lucide-react';
import RetireeResourceCard from './RetireeResourceCard';

interface RetireeResource {
  id: string;
  title: string;
  description: string;
  category: string;
  resource_url: string;
  image_url?: string;
  tags: string[];
  is_featured: boolean;
  difficulty_level: string;
  estimated_read_time: number;
  status: string;
}

const PostCareerOptionsTab: React.FC = () => {
  const [resources, setResources] = useState<RetireeResource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPostCareerResources();
  }, []);

  const fetchPostCareerResources = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('retiree_resources')
        .select('*')
        .like('category', 'post_career_%')
        .eq('status', 'active')
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setResources(data || []);
    } catch (error) {
      console.error('Error fetching post-career resources:', error);
      setResources([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-ehrdc-teal" />
        <span className="ml-2">Loading post-career options...</span>
      </div>
    );
  }

  const featuredResources = resources.filter(resource => resource.is_featured);
  const regularResources = resources.filter(resource => !resource.is_featured);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-ehrdc-teal/10 rounded-full p-3">
            <Briefcase className="h-6 w-6 text-ehrdc-teal" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-2">Post-Career Opportunities</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore meaningful ways to continue contributing to society and sharing your expertise after retirement.
        </p>
      </div>

      {featuredResources.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Star className="h-5 w-5 text-ehrdc-teal" />
            Featured Opportunities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {featuredResources.map((resource) => (
              <RetireeResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
      )}

      {regularResources.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">All Post-Career Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularResources.map((resource) => (
              <RetireeResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
      )}

      {resources.length === 0 && (
        <div className="text-center py-12">
          <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No post-career options available</h3>
          <p className="text-muted-foreground">
            Check back soon for new opportunities and resources.
          </p>
        </div>
      )}
    </div>
  );
};

export default PostCareerOptionsTab;
