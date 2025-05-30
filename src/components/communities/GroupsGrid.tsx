
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, BarChart3, Calendar } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { CommunitiesService } from '@/services/communitiesService';
import { ProfessionalGroup, GroupPoll, GroupEvent } from '@/types/communities';
import GroupCard from './GroupCard';
import CreateGroupDialog from './CreateGroupDialog';
import CreatePollDialog from './CreatePollDialog';
import CreateEventDialog from './CreateEventDialog';
import PollCard from './PollCard';
import EventCard from './EventCard';

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
  const [polls, setPolls] = useState<GroupPoll[]>([]);
  const [events, setEvents] = useState<GroupEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [joinedGroups, setJoinedGroups] = useState<Set<string>>(new Set());
  const [joiningGroups, setJoiningGroups] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState('groups');
  const [selectedGroupId, setSelectedGroupId] = useState<string>('');
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

  useEffect(() => {
    if (selectedGroupId) {
      loadGroupPolls();
      loadGroupEvents();
    }
  }, [selectedGroupId]);

  const loadGroups = async () => {
    try {
      const filterParams: any = {};
      if (filters.industry) filterParams.industry = filters.industry;
      if (filters.category) filterParams.category = filters.category;
      if (filters.search) filterParams.search = filters.search;
      if (filters.is_private) filterParams.is_private = filters.is_private === 'true';

      const data = await CommunitiesService.getGroups(filterParams);
      setGroups(data);
      
      // Set the first joined group as selected for polls/events
      if (data.length > 0 && joinedGroups.size > 0 && !selectedGroupId) {
        const firstJoinedGroup = data.find(group => joinedGroups.has(group.id));
        if (firstJoinedGroup) {
          setSelectedGroupId(firstJoinedGroup.id);
        }
      }
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
      const joinedGroupIds = new Set(userGroups.map(g => g.id));
      setJoinedGroups(joinedGroupIds);
      
      // Auto-select first joined group for polls/events
      if (userGroups.length > 0 && !selectedGroupId) {
        setSelectedGroupId(userGroups[0].id);
      }
    } catch (error) {
      console.error('Failed to load user groups:', error);
    }
  };

  const loadGroupPolls = async () => {
    if (!selectedGroupId) return;
    try {
      const groupPolls = await CommunitiesService.getGroupPolls(selectedGroupId);
      setPolls(groupPolls);
    } catch (error) {
      console.error('Failed to load polls:', error);
    }
  };

  const loadGroupEvents = async () => {
    if (!selectedGroupId) return;
    try {
      const groupEvents = await CommunitiesService.getGroupEvents(selectedGroupId);
      setEvents(groupEvents);
    } catch (error) {
      console.error('Failed to load events:', error);
    }
  };

  const handleJoinGroup = async (groupId: string) => {
    setJoiningGroups(prev => new Set([...prev, groupId]));
    
    try {
      await CommunitiesService.joinGroup(groupId);
      setJoinedGroups(prev => new Set([...prev, groupId]));
      
      // If this is the first group joined, select it for polls/events
      if (joinedGroups.size === 0) {
        setSelectedGroupId(groupId);
      }
      
      toast({
        title: "Success",
        description: "You've joined the group!",
      });
      
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

  const joinedGroupsList = groups.filter(group => joinedGroups.has(group.id));

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

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="groups">Groups</TabsTrigger>
          <TabsTrigger value="polls" disabled={joinedGroups.size === 0}>
            <BarChart3 className="h-4 w-4 mr-2" />
            Polls
          </TabsTrigger>
          <TabsTrigger value="events" disabled={joinedGroups.size === 0}>
            <Calendar className="h-4 w-4 mr-2" />
            Events
          </TabsTrigger>
        </TabsList>

        <TabsContent value="groups" className="space-y-6">
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
        </TabsContent>

        <TabsContent value="polls" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Group Polls</h2>
              <p className="text-muted-foreground">
                Participate in polls from your communities
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {joinedGroupsList.length > 0 && (
                <>
                  <Select value={selectedGroupId} onValueChange={setSelectedGroupId}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select a group" />
                    </SelectTrigger>
                    <SelectContent>
                      {joinedGroupsList.map((group) => (
                        <SelectItem key={group.id} value={group.id}>
                          {group.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedGroupId && (
                    <CreatePollDialog 
                      groupId={selectedGroupId} 
                      onPollCreated={loadGroupPolls}
                    />
                  )}
                </>
              )}
            </div>
          </div>

          {polls.length === 0 ? (
            <div className="text-center py-12">
              <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No polls yet</h3>
              <p className="text-muted-foreground mb-4">
                Be the first to create a poll in this group!
              </p>
              {selectedGroupId && (
                <CreatePollDialog 
                  groupId={selectedGroupId} 
                  onPollCreated={loadGroupPolls}
                />
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {polls.map((poll) => (
                <PollCard
                  key={poll.id}
                  poll={poll}
                  onVote={loadGroupPolls}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Group Events</h2>
              <p className="text-muted-foreground">
                Discover and join events from your communities
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {joinedGroupsList.length > 0 && (
                <>
                  <Select value={selectedGroupId} onValueChange={setSelectedGroupId}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select a group" />
                    </SelectTrigger>
                    <SelectContent>
                      {joinedGroupsList.map((group) => (
                        <SelectItem key={group.id} value={group.id}>
                          {group.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedGroupId && (
                    <CreateEventDialog 
                      groupId={selectedGroupId} 
                      onEventCreated={loadGroupEvents}
                    />
                  )}
                </>
              )}
            </div>
          </div>

          {events.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No upcoming events</h3>
              <p className="text-muted-foreground mb-4">
                Be the first to organize an event in this group!
              </p>
              {selectedGroupId && (
                <CreateEventDialog 
                  groupId={selectedGroupId} 
                  onEventCreated={loadGroupEvents}
                />
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onRsvp={loadGroupEvents}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GroupsGrid;
