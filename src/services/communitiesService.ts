
import { supabase } from '@/integrations/supabase/client';
import type {
  ProfessionalGroup,
  GroupMember,
  GroupPost,
  PostComment,
  GroupResource,
  NetworkingEvent,
  ModerationLog,
  CreateGroupData,
  CreatePostData,
  CreateResourceData,
  CreateEventData
} from '@/types/communities';

export class CommunitiesService {
  // Groups Management
  static async getGroups(filters?: {
    industry?: string;
    category?: string;
    search?: string;
    is_private?: boolean;
  }): Promise<ProfessionalGroup[]> {
    let query = supabase
      .from('professional_groups')
      .select('*')
      .order('member_count', { ascending: false });

    if (filters?.industry) {
      query = query.eq('industry', filters.industry);
    }
    if (filters?.category) {
      query = query.eq('category', filters.category);
    }
    if (filters?.is_private !== undefined) {
      query = query.eq('is_private', filters.is_private);
    }
    if (filters?.search) {
      query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  static async getGroupById(id: string): Promise<ProfessionalGroup | null> {
    const { data, error } = await supabase
      .from('professional_groups')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return data;
  }

  static async createGroup(groupData: CreateGroupData): Promise<ProfessionalGroup> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('professional_groups')
      .insert({
        creator_id: user.user.id,
        ...groupData
      })
      .select()
      .single();

    if (error) throw error;

    // Add creator as admin member
    await this.joinGroup(data.id, 'admin');

    return data;
  }

  static async getUserGroups(): Promise<ProfessionalGroup[]> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return [];

    const { data, error } = await supabase
      .from('professional_groups')
      .select(`
        *,
        group_members!inner(*)
      `)
      .eq('group_members.user_id', user.user.id)
      .order('group_members.joined_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Member Management
  static async getGroupMembers(groupId: string): Promise<GroupMember[]> {
    const { data, error } = await supabase
      .from('group_members')
      .select(`
        *,
        profiles!group_members_user_id_fkey(id, full_name, email)
      `)
      .eq('group_id', groupId)
      .order('joined_at', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  static async joinGroup(groupId: string, role: GroupMember['role'] = 'member'): Promise<GroupMember> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('group_members')
      .insert({
        group_id: groupId,
        user_id: user.user.id,
        role
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async leaveGroup(groupId: string): Promise<void> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('group_members')
      .delete()
      .eq('group_id', groupId)
      .eq('user_id', user.user.id);

    if (error) throw error;
  }

  static async updateMemberRole(groupId: string, userId: string, role: GroupMember['role']): Promise<void> {
    const { error } = await supabase
      .from('group_members')
      .update({ role })
      .eq('group_id', groupId)
      .eq('user_id', userId);

    if (error) throw error;
  }

  // Posts and Discussions
  static async getGroupPosts(groupId: string): Promise<GroupPost[]> {
    const { data, error } = await supabase
      .from('group_posts')
      .select(`
        *,
        profiles!group_posts_user_id_fkey(id, full_name, avatar_url)
      `)
      .eq('group_id', groupId)
      .order('is_pinned', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async createPost(groupId: string, postData: CreatePostData): Promise<GroupPost> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('group_posts')
      .insert({
        group_id: groupId,
        user_id: user.user.id,
        ...postData
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async togglePostLike(postId: string): Promise<boolean> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('User not authenticated');

    // Check if already liked
    const { data: existingLike } = await supabase
      .from('post_likes')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', user.user.id)
      .single();

    if (existingLike) {
      // Unlike
      const { error } = await supabase
        .from('post_likes')
        .delete()
        .eq('post_id', postId)
        .eq('user_id', user.user.id);
      
      if (error) throw error;
      return false;
    } else {
      // Like
      const { error } = await supabase
        .from('post_likes')
        .insert({
          post_id: postId,
          user_id: user.user.id
        });
      
      if (error) throw error;
      return true;
    }
  }

  static async getPostComments(postId: string): Promise<PostComment[]> {
    const { data, error } = await supabase
      .from('post_comments')
      .select(`
        *,
        profiles!post_comments_user_id_fkey(id, full_name, avatar_url)
      `)
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  static async addComment(postId: string, content: string): Promise<PostComment> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('post_comments')
      .insert({
        post_id: postId,
        user_id: user.user.id,
        content
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Resources
  static async getGroupResources(groupId: string): Promise<GroupResource[]> {
    const { data, error } = await supabase
      .from('group_resources')
      .select(`
        *,
        profiles!group_resources_user_id_fkey(id, full_name)
      `)
      .eq('group_id', groupId)
      .eq('is_approved', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async createResource(groupId: string, resourceData: CreateResourceData): Promise<GroupResource> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('group_resources')
      .insert({
        group_id: groupId,
        user_id: user.user.id,
        ...resourceData
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Events
  static async getGroupEvents(groupId: string): Promise<NetworkingEvent[]> {
    const { data, error } = await supabase
      .from('networking_events')
      .select(`
        *,
        profiles!networking_events_organizer_id_fkey(id, full_name)
      `)
      .eq('group_id', groupId)
      .gte('end_date', new Date().toISOString())
      .order('start_date', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  static async createEvent(groupId: string, eventData: CreateEventData): Promise<NetworkingEvent> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('networking_events')
      .insert({
        group_id: groupId,
        organizer_id: user.user.id,
        ...eventData
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Moderation
  static async getModerationLogs(groupId: string): Promise<ModerationLog[]> {
    const { data, error } = await supabase
      .from('moderation_logs')
      .select(`
        *,
        moderator:profiles!moderation_logs_moderator_id_fkey(id, full_name),
        target_user:profiles!moderation_logs_target_user_id_fkey(id, full_name)
      `)
      .eq('group_id', groupId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async moderatePost(
    groupId: string,
    postId: string,
    action: ModerationLog['action_type'],
    reason?: string
  ): Promise<void> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('User not authenticated');

    // Perform the action
    if (action === 'delete_post') {
      await supabase.from('group_posts').delete().eq('id', postId);
    } else if (action === 'pin_post') {
      await supabase.from('group_posts').update({ is_pinned: true }).eq('id', postId);
    } else if (action === 'unpin_post') {
      await supabase.from('group_posts').update({ is_pinned: false }).eq('id', postId);
    }

    // Log the action
    await supabase.from('moderation_logs').insert({
      group_id: groupId,
      moderator_id: user.user.id,
      target_post_id: postId,
      action_type: action,
      reason
    });
  }

  static async getUserMembershipStatus(groupId: string): Promise<GroupMember | null> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return null;

    const { data, error } = await supabase
      .from('group_members')
      .select('*')
      .eq('group_id', groupId)
      .eq('user_id', user.user.id)
      .single();

    if (error) return null;
    return data;
  }
}
