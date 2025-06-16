
export interface WisdomSharingPlatform {
  id: string;
  title: string;
  content: string;
  author_id: string;
  category: 'life_lesson' | 'professional_skill' | 'cultural_tradition' | 'personal_story';
  tags: string[];
  created_at: string;
  updated_at: string;
  likes_count: number;
  comments_count: number;
  is_featured: boolean;
}

export interface MentorshipConnection {
  id: string;
  mentor_id: string;
  mentee_id: string;
  focus_area: string;
  status: 'pending' | 'active' | 'completed' | 'paused';
  goals: string[];
  meeting_frequency: 'weekly' | 'biweekly' | 'monthly';
  communication_preference: 'video' | 'phone' | 'in_person' | 'text';
  created_at: string;
  updated_at: string;
}

export interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  organizer_id: string;
  event_type: 'workshop' | 'discussion' | 'volunteer' | 'cultural' | 'civic';
  location?: string;
  is_virtual: boolean;
  start_date: string;
  end_date: string;
  max_participants?: number;
  current_participants: number;
  requirements?: string;
  image_url?: string;
  created_at: string;
}

export interface LegacyProject {
  id: string;
  title: string;
  description: string;
  project_type: 'cultural_preservation' | 'knowledge_documentation' | 'community_history' | 'skill_transfer';
  initiator_id: string;
  collaborators: string[];
  status: 'planning' | 'active' | 'completed' | 'archived';
  progress_percentage: number;
  deliverables: string[];
  timeline: string;
  resources_needed: string[];
  created_at: string;
  updated_at: string;
}

export interface CivicParticipation {
  id: string;
  initiative_title: string;
  description: string;
  category: 'local_government' | 'community_improvement' | 'environmental' | 'education' | 'healthcare';
  organizer: string;
  participation_type: 'volunteer' | 'feedback' | 'advocacy' | 'leadership';
  time_commitment: string;
  skills_needed: string[];
  impact_area: string;
  created_at: string;
  deadline?: string;
}

export interface CommunityEngagementSystem {
  wisdomSharing: {
    stories: WisdomSharingPlatform[];
    mentorships: MentorshipConnection[];
    skillExchanges: SkillExchange[];
  };
  legacyProjects: {
    projects: LegacyProject[];
    collaborationTools: CollaborationTool[];
    preservationMethods: PreservationMethod[];
  };
  civicEngagement: {
    initiatives: CivicParticipation[];
    events: CommunityEvent[];
    volunteerOpportunities: VolunteerOpportunity[];
  };
}

export interface SkillExchange {
  id: string;
  skill_offered: string;
  skill_wanted: string;
  provider_id: string;
  seeker_id?: string;
  description: string;
  experience_level: 'beginner' | 'intermediate' | 'expert';
  exchange_format: 'one_on_one' | 'group_session' | 'workshop' | 'ongoing_mentorship';
  availability: string[];
  status: 'open' | 'matched' | 'in_progress' | 'completed';
  created_at: string;
}

export interface CollaborationTool {
  id: string;
  project_id: string;
  tool_type: 'document_editor' | 'video_conference' | 'file_sharing' | 'task_management';
  access_url: string;
  permissions: Record<string, string[]>;
  created_at: string;
}

export interface PreservationMethod {
  id: string;
  method_type: 'digital_archive' | 'oral_history' | 'multimedia_collection' | 'written_documentation';
  description: string;
  tools_required: string[];
  preservation_format: string;
  accessibility_features: string[];
}

export interface VolunteerOpportunity extends CivicParticipation {
  organization: string;
  contact_email: string;
  background_check_required: boolean;
  training_provided: boolean;
  recurring: boolean;
  age_requirements?: string;
}
