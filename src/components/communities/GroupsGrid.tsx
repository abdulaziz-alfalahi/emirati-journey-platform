
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { CommunitiesService } from '@/services/communitiesService';
import { ProfessionalGroup } from '@/types/communities';
import GroupCard from './GroupCard';
import CreateGroupDialog from './CreateGroupDialog';

const industries = [
  'Technology', 'Healthcare', 'Finance', 'Education', 'Government',
  'Energy', 'Transportation', 'Tourism', 'Real Estate', 'Manufacturing'
];

const categories = [
  'Career Development', 'Industry Networking', 'Skills Exchange',
  'Mentorship', 'Entrepreneurship', 'Leadership', 'Innovation'
];

const GroupsGrid: React.FC = () => {
  const [groups, setGroups] = useState<ProfessionalGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [joinedGroups, setJoinedGroups] = useState<Set<string>>(new Set());
  const [joiningGroups, setJoiningGroups] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState({
    search: '',
    industry: '',
    category: '',
    is_private: ''
  });

  useEffect(() => {
    loadGroups();
    loadUserGroups();
  }, [filters]);

  const loadGroups = async () => {
    try {
      const filterParams: any = {};
      if (filters.industry) filterParams.industry = filters.industry;
      if (filters.category) filterParams.category = filters.category;
      if (filters.search) filterParams.search = filters.search;
      if (filters.is_private) filterParams.is_private = filters.is_private === 'true';

      const data = await CommunitiesService.getGroups(filterParams);
      setGroups(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load groups",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserGroups = async () => {
    try {
      const userGroups = await CommunitiesService.getUserGroups();
      setJoinedGroups(new Set(userGroups.map(g => g.id)));
    } catch (error) {
      console.error('Failed to load user groups:', error);
    }
  };

  const handleJoinGroup = async (groupId: string) => {
    setJoiningGroups(prev => new Set([...prev, groupId]));
    
    try {
      await CommunitiesService.joinGroup(groupId);
      setJoinedGroups(prev => new Set([...prev, groupId]));
      
      toast({
        title: "Success",
        description: "You've joined the group!",
      });
      
      // Refresh groups to update member count
      loadGroups();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to join group. Please try again.",
        variant: "destructive",
      });
    } finally {
      setJoiningGroups(prev => {
        const newSet = new Set(prev);
        newSet.delete(groupId);
        return newSet;
      });
    }
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      industry: '',
      category: '',
      is_private: ''
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Professional Communities</h1>
          <p className="text-muted-foreground">
            Connect with professionals in your industry and career stage
          </p>
        </div>
        <CreateGroupDialog onGroupCreated={loadGroups} />
      </div>

      {/* Filters */}
      <div className="bg-card p-4 rounded-lg border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search groups..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="pl-10"
            />
          </div>
          
          <Select value={filters.industry} onValueChange={(value) => setFilters(prev => ({ ...prev, industry: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="All Industries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Industries</SelectItem>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="flex space-x-2">
            <Select value={filters.is_private} onValueChange={(value) => setFilters(prev => ({ ...prev, is_private: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="All Groups" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Groups</SelectItem>
                <SelectItem value="false">Public Groups</SelectItem>
                <SelectItem value="true">Private Groups</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" onClick={clearFilters}>
              <Filter className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
        </div>
      </div>

      {/* Groups Grid */}
      {groups.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No groups found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your filters or create a new group to get started.
          </p>
          <CreateGroupDialog onGroupCreated={loadGroups} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              onJoin={handleJoinGroup}
              isJoined={joinedGroups.has(group.id)}
              isLoading={joiningGroups.has(group.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupsGrid;
