
export interface ProfessionalGroup {
  id: string;
  name: string;
  description?: string;
  industry?: string;
  category?: string;
  creator_id: string;
  cover_image_url?: string;
  is_private: boolean;
  member_count: number;
  rules?: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface GroupMember {
  id: string;
  group_id: string;
  user_id: string;
  role: 'admin' | 'moderator' | 'member';
  notifications_enabled: boolean;
  last_active: string;
  joined_at: string;
}

export interface GroupPost {
  id: string;
  group_id: string;
  user_id: string;
  content: string;
  post_type: 'discussion' | 'announcement' | 'resource' | 'event' | 'poll';
  attachment_url?: string;
  is_pinned: boolean;
  like_count: number;
  reply_count: number;
  created_at: string;
  updated_at: string;
}

export interface PostComment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface GroupResource {
  id: string;
  group_id: string;
  user_id: string;
  title: string;
  description?: string;
  resource_type: 'document' | 'link' | 'video' | 'image';
  file_url?: string;
  external_url?: string;
  tags: string[];
  download_count: number;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

export interface NetworkingEvent {
  id: string;
  group_id?: string;
  title: string;
  description?: string;
  event_type: string;
  organizer_id: string;
  location?: string;
  is_virtual: boolean;
  virtual_meeting_url?: string;
  start_date: string;
  end_date: string;
  max_participants?: number;
  is_featured: boolean;
  cover_image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface GroupPoll {
  id: string;
  group_id: string;
  user_id: string;
  title: string;
  description?: string;
  options: PollOption[];
  multiple_choice: boolean;
  expires_at?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PollOption {
  id: number;
  text: string;
  votes: number;
}

export interface PollVote {
  id: string;
  poll_id: string;
  user_id: string;
  selected_options: number[];
  created_at: string;
}

export interface GroupEvent {
  id: string;
  group_id: string;
  user_id: string;
  title: string;
  description?: string;
  event_type: string;
  location?: string;
  is_virtual: boolean;
  virtual_meeting_url?: string;
  start_date: string;
  end_date: string;
  max_attendees?: number;
  cover_image_url?: string;
  tags: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface EventRsvp {
  id: string;
  event_id: string;
  user_id: string;
  status: 'attending' | 'maybe' | 'not_attending';
  created_at: string;
  updated_at: string;
}

export interface ModerationLog {
  id: string;
  group_id: string;
  moderator_id: string;
  target_user_id?: string;
  target_post_id?: string;
  action_type: 'warn' | 'mute' | 'ban' | 'delete_post' | 'pin_post' | 'unpin_post';
  reason?: string;
  duration_hours?: number;
  created_at: string;
}

export interface PostLike {
  id: string;
  post_id: string;
  user_id: string;
  created_at: string;
}

export interface CreateGroupData {
  name: string;
  description?: string;
  industry?: string;
  category?: string;
  is_private: boolean;
  rules?: string;
  tags: string[];
}

export interface CreatePostData {
  content: string;
  post_type: GroupPost['post_type'];
  attachment_url?: string;
}

export interface CreateResourceData {
  title: string;
  description?: string;
  resource_type: GroupResource['resource_type'];
  file_url?: string;
  external_url?: string;
  tags: string[];
}

export interface CreateEventData {
  title: string;
  description?: string;
  event_type: string;
  location?: string;
  is_virtual: boolean;
  virtual_meeting_url?: string;
  start_date: string;
  end_date: string;
  max_attendees?: number;
}

export interface CreatePollData {
  title: string;
  description?: string;
  options: string[];
  multiple_choice: boolean;
  expires_at?: string;
}

export interface CreateGroupEventData {
  title: string;
  description?: string;
  event_type: string;
  location?: string;
  is_virtual: boolean;
  virtual_meeting_url?: string;
  start_date: string;
  end_date: string;
  max_attendees?: number;
  tags: string[];
}
