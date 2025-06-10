
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Heart, MapPin, Calendar, Clock, Users, Building, CheckCircle, AlertCircle, Wifi, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { VolunteerOpportunity, VolunteerApplication } from '@/types/volunteer';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface VolunteerProgramsContentProps {
  activeTab: 'opportunities' | 'history' | 'organizations';
}

export const VolunteerProgramsContent: React.FC<VolunteerProgramsContentProps> = ({ activeTab }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [opportunities, setOpportunities] = useState<VolunteerOpportunity[]>([]);
  const [applications, setApplications] = useState<VolunteerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [applicationMessage, setApplicationMessage] = useState('');
  const [selectedOpportunity, setSelectedOpportunity] = useState<VolunteerOpportunity | null>(null);
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);

  useEffect(() => {
    if (activeTab === 'opportunities') {
      fetchOpportunities();
    } else if (activeTab === 'history' && user) {
      fetchUserApplications();
    }
  }, [activeTab, user]);

  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('volunteer_opportunities')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOpportunities((data || []) as VolunteerOpportunity[]);
    } catch (error) {
      console.error('Error fetching volunteer opportunities:', error);
      toast({
        title: "Error",
        description: "Failed to load volunteer opportunities",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUserApplications = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('volunteer_applications')
        .select(`
          *,
          opportunity:volunteer_opportunities(*)
        `)
        .eq('user_id', user.id)
        .order('applied_at', { ascending: false });

      if (error) throw error;
      setApplications((data || []) as VolunteerApplication[]);
    } catch (error) {
      console.error('Error fetching user applications:', error);
      toast({
        title: "Error",
        description: "Failed to load your volunteer history",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!user || !selectedOpportunity) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to apply for volunteer opportunities",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('volunteer_applications')
        .insert({
          opportunity_id: selectedOpportunity.id,
          user_id: user.id,
          application_message: applicationMessage,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Application Submitted",
        description: "Your volunteer application has been submitted successfully!",
      });

      setIsApplyDialogOpen(false);
      setApplicationMessage('');
      setSelectedOpportunity(null);
      
      if (activeTab === 'history') {
        fetchUserApplications();
      }
    } catch (error: any) {
      console.error('Error submitting application:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit application",
        variant: "destructive"
      });
    }
  };

  const filteredOpportunities = opportunities.filter(opportunity => {
    const matchesSearch = !searchTerm || 
      opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.organization_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || opportunity.category === categoryFilter;
    
    const matchesLocation = locationFilter === 'all' || 
      (locationFilter === 'remote' && opportunity.is_remote) ||
      (locationFilter === 'onsite' && !opportunity.is_remote);

    return matchesSearch && matchesCategory && matchesLocation;
  });

  const getCategoryColor = (category: string | undefined) => {
    switch (category) {
      case 'education': return 'bg-blue-100 text-blue-800';
      case 'environment': return 'bg-green-100 text-green-800';
      case 'healthcare': return 'bg-red-100 text-red-800';
      case 'community': return 'bg-purple-100 text-purple-800';
      case 'sports': return 'bg-orange-100 text-orange-800';
      case 'arts': return 'bg-pink-100 text-pink-800';
      case 'technology': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'withdrawn': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (activeTab === 'opportunities') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover meaningful volunteer opportunities in your community. Make a difference while developing new skills and connecting with like-minded individuals.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <Input
            placeholder="Search opportunities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          
          <div className="flex gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="environment">Environment</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="community">Community</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
                <SelectItem value="arts">Arts</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
              </SelectContent>
            </Select>

            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="onsite">On-site</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpportunities.map((opportunity) => (
            <OpportunityCard 
              key={opportunity.id} 
              opportunity={opportunity} 
              getCategoryColor={getCategoryColor}
              onApply={() => {
                setSelectedOpportunity(opportunity);
                setIsApplyDialogOpen(true);
              }}
            />
          ))}
        </div>

        {filteredOpportunities.length === 0 && (
          <div className="text-center py-12">
            <Heart className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No opportunities found</h3>
            <p className="text-muted-foreground">Try adjusting your search terms or filters.</p>
          </div>
        )}

        {/* Apply Dialog */}
        <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Apply for Volunteer Opportunity</DialogTitle>
              <DialogDescription>
                {selectedOpportunity?.title} - {selectedOpportunity?.organization_name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
                placeholder="Tell us why you're interested in this opportunity and any relevant experience..."
                value={applicationMessage}
                onChange={(e) => setApplicationMessage(e.target.value)}
                rows={4}
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsApplyDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleApply}>
                  Submit Application
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  if (activeTab === 'history') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Track your volunteer journey and see the impact you've made in your community.
          </p>
        </div>

        {applications.length === 0 ? (
          <div className="text-center py-12">
            <Award className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No volunteer history yet</h3>
            <p className="text-muted-foreground">Start making a difference by applying for opportunities!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {applications.map((application) => (
              <ApplicationCard 
                key={application.id} 
                application={application} 
                getStatusColor={getStatusColor}
                getCategoryColor={getCategoryColor}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  if (activeTab === 'organizations') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Learn about the organizations making a difference in the UAE and their volunteer programs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from(new Set(opportunities.map(opp => opp.organization_name))).map((orgName) => {
            const orgOpportunities = opportunities.filter(opp => opp.organization_name === orgName);
            const firstOpp = orgOpportunities[0];
            
            return (
              <Card key={orgName} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    {orgName}
                  </CardTitle>
                  <CardDescription>
                    {firstOpp?.organization_contact_email}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Heart className="h-3 w-3" />
                      <span>{orgOpportunities.length} active opportunities</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {Array.from(new Set(orgOpportunities.map(opp => opp.category).filter(Boolean))).map((category) => (
                        <Badge key={category} variant="outline" className={getCategoryColor(category)}>
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
};

const OpportunityCard: React.FC<{
  opportunity: VolunteerOpportunity;
  getCategoryColor: (category: string | undefined) => string;
  onApply: () => void;
}> = ({ opportunity, getCategoryColor, onApply }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg leading-tight">{opportunity.title}</CardTitle>
            <CardDescription className="mt-1 flex items-center gap-1">
              <Building className="h-3 w-3" />
              {opportunity.organization_name}
            </CardDescription>
          </div>
          {opportunity.is_remote && (
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              <Wifi className="h-3 w-3 mr-1" />
              Remote
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {opportunity.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {opportunity.category && (
              <Badge variant="outline" className={getCategoryColor(opportunity.category)}>
                {opportunity.category}
              </Badge>
            )}
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            {opportunity.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{opportunity.location}</span>
              </div>
            )}
            {opportunity.time_commitment && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{opportunity.time_commitment}</span>
              </div>
            )}
            {opportunity.start_date && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{new Date(opportunity.start_date).toLocaleDateString()}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>{opportunity.current_volunteers}/{opportunity.max_volunteers || '∞'} volunteers</span>
            </div>
          </div>

          <Button 
            onClick={onApply}
            className="w-full"
            disabled={opportunity.max_volunteers ? opportunity.current_volunteers >= opportunity.max_volunteers : false}
          >
            {opportunity.max_volunteers && opportunity.current_volunteers >= opportunity.max_volunteers 
              ? 'Full' 
              : 'Apply Now'
            }
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const ApplicationCard: React.FC<{
  application: VolunteerApplication;
  getStatusColor: (status: string) => string;
  getCategoryColor: (category: string | undefined) => string;
}> = ({ application, getStatusColor, getCategoryColor }) => {
  const opportunity = application.opportunity as VolunteerOpportunity;
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{opportunity?.title}</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <Building className="h-3 w-3" />
              {opportunity?.organization_name}
            </CardDescription>
          </div>
          <Badge variant="outline" className={getStatusColor(application.status)}>
            {application.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          {opportunity?.category && (
            <Badge variant="outline" className={getCategoryColor(opportunity.category)}>
              {opportunity.category}
            </Badge>
          )}
          
          <div className="text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>Applied: {new Date(application.applied_at).toLocaleDateString()}</span>
            </div>
            {application.status === 'completed' && (
              <div className="flex items-center gap-1 mt-1">
                <Clock className="h-3 w-3" />
                <span>{application.hours_completed} hours completed</span>
              </div>
            )}
          </div>

          {application.volunteer_feedback && (
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-1">Your Feedback:</p>
              <p className="text-sm text-muted-foreground">{application.volunteer_feedback}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
