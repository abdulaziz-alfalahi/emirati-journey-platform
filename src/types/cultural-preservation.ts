
export interface CulturalStory {
  id: string;
  title: string;
  content: string;
  narrator_id: string;
  story_type: 'family_history' | 'community_story' | 'personal_narrative' | 'oral_tradition';
  dialect_used?: string;
  location: string;
  time_period?: string;
  tags: string[];
  multimedia_attachments: MultimediaAttachment[];
  verification_status: 'pending' | 'verified' | 'published';
  cultural_significance: string;
  related_traditions: string[];
  created_at: string;
  updated_at: string;
  is_featured: boolean;
  privacy_level: 'public' | 'community' | 'family' | 'private';
}

export interface MultimediaAttachment {
  id: string;
  type: 'image' | 'video' | 'audio' | 'document';
  url: string;
  description?: string;
  caption_ar?: string;
  caption_en?: string;
  metadata: Record<string, any>;
}

export interface TraditionalSkill {
  id: string;
  skill_name_ar: string;
  skill_name_en: string;
  category: 'craft' | 'cooking' | 'music' | 'poetry' | 'agriculture' | 'trade' | 'architecture';
  description: string;
  historical_significance: string;
  required_materials: string[];
  steps_documentation: SkillStep[];
  master_practitioners: string[];
  learning_difficulty: 'beginner' | 'intermediate' | 'advanced' | 'master';
  time_to_learn: string;
  cultural_context: string;
  regional_variations: string[];
  endangered_status: 'safe' | 'vulnerable' | 'endangered' | 'critically_endangered';
  documentation_completeness: number;
  created_at: string;
  updated_at: string;
}

export interface SkillStep {
  step_number: number;
  title: string;
  description: string;
  techniques: string[];
  tips_and_warnings: string[];
  multimedia_references: string[];
  estimated_duration: string;
}

export interface CulturalEvent {
  id: string;
  event_name_ar: string;
  event_name_en: string;
  event_type: 'festival' | 'workshop' | 'exhibition' | 'performance' | 'ceremony' | 'educational';
  description: string;
  cultural_significance: string;
  organizer_id: string;
  location: string;
  start_date: string;
  end_date: string;
  registration_required: boolean;
  max_participants?: number;
  current_participants: number;
  age_groups: string[];
  skills_taught?: string[];
  traditional_elements: string[];
  language_of_instruction: 'arabic' | 'english' | 'bilingual';
  dress_code?: string;
  participation_requirements?: string[];
  cultural_protocols: string[];
  image_url?: string;
  created_at: string;
  status: 'planning' | 'open' | 'in_progress' | 'completed' | 'cancelled';
}

export interface OralHistoryInterview {
  id: string;
  interviewee_name: string;
  interviewer_id: string;
  interview_date: string;
  location: string;
  topics_covered: string[];
  duration_minutes: number;
  language_used: string;
  dialect_notes?: string;
  audio_url?: string;
  video_url?: string;
  transcript_ar?: string;
  transcript_en?: string;
  key_themes: string[];
  historical_period_covered: string;
  cultural_insights: string[];
  family_connections?: string[];
  community_relevance: string;
  preservation_priority: 'high' | 'medium' | 'low';
  verification_status: 'raw' | 'reviewed' | 'verified' | 'published';
  created_at: string;
  updated_at: string;
}

export interface CulturalArtifact {
  id: string;
  artifact_name_ar: string;
  artifact_name_en: string;
  category: 'tool' | 'clothing' | 'jewelry' | 'household' | 'religious' | 'decorative' | 'manuscript';
  description: string;
  historical_period: string;
  region_of_origin: string;
  materials: string[];
  dimensions?: string;
  condition: 'excellent' | 'good' | 'fair' | 'poor' | 'fragmented';
  cultural_function: string;
  social_significance: string;
  current_location: string;
  owner_type: 'private' | 'museum' | 'heritage_center' | 'community';
  documentation_images: string[];
  three_d_model_url?: string;
  related_stories: string[];
  similar_artifacts: string[];
  research_notes: string[];
  conservation_needs?: string[];
  public_display_permitted: boolean;
  created_at: string;
  updated_at: string;
}

export interface HeritageLanguageEntry {
  id: string;
  word_or_phrase_ar: string;
  pronunciation_guide: string;
  meaning_en: string;
  usage_context: string;
  dialect_region: string;
  category: 'everyday' | 'ceremonial' | 'trade' | 'nature' | 'family' | 'spiritual';
  examples_of_use: string[];
  related_terms: string[];
  historical_notes?: string;
  audio_pronunciation_url?: string;
  frequency_of_use: 'common' | 'occasional' | 'rare' | 'archaic';
  generational_usage: string[];
  preservation_priority: 'critical' | 'important' | 'moderate' | 'documented';
  submitted_by: string;
  verified_by?: string;
  created_at: string;
  updated_at: string;
}

export interface CulturalPreservationProject {
  id: string;
  project_name: string;
  project_type: 'documentation' | 'preservation' | 'education' | 'research' | 'exhibition';
  description: string;
  objectives: string[];
  target_audience: string[];
  project_lead_id: string;
  collaborators: string[];
  timeline_start: string;
  timeline_end: string;
  budget_required?: number;
  funding_sources?: string[];
  deliverables: string[];
  success_metrics: string[];
  cultural_areas_covered: string[];
  communities_involved: string[];
  technology_needs: string[];
  expertise_required: string[];
  current_status: 'planning' | 'active' | 'review' | 'completed' | 'on_hold';
  progress_percentage: number;
  impact_assessment?: string;
  lessons_learned?: string[];
  created_at: string;
  updated_at: string;
}

export interface CulturalPreservationSystem {
  digitalStorytelling: {
    familyHistories: CulturalStory[];
    communityStories: CulturalStory[];
    personalNarratives: CulturalStory[];
    multimediaIntegration: MultimediaAttachment[];
  };
  traditionalSkills: {
    craftDocumentation: TraditionalSkill[];
    skillTeaching: SkillTeachingSession[];
    apprenticeshipPrograms: ApprenticeProgram[];
    skillPreservation: SkillPreservationRecord[];
  };
  culturalEvents: {
    eventOrganization: CulturalEvent[];
    participationTracking: EventParticipation[];
    celebrationCalendar: CulturalCalendarEvent[];
    communityEngagement: CommunityEngagementMetric[];
  };
  heritageArchive: {
    oralHistory: OralHistoryInterview[];
    culturalArtifacts: CulturalArtifact[];
    languagePreservation: HeritageLanguageEntry[];
    preservationProjects: CulturalPreservationProject[];
  };
}

export interface SkillTeachingSession {
  id: string;
  skill_id: string;
  teacher_id: string;
  session_type: 'individual' | 'group' | 'workshop' | 'apprenticeship';
  title: string;
  description: string;
  scheduled_date: string;
  duration_hours: number;
  max_students: number;
  current_enrollments: number;
  skill_level: 'beginner' | 'intermediate' | 'advanced';
  materials_provided: boolean;
  materials_list?: string[];
  location: string;
  language_of_instruction: 'arabic' | 'english' | 'bilingual';
  prerequisites?: string[];
  certification_provided: boolean;
  cost_per_student?: number;
  cultural_context_included: boolean;
  hands_on_practice: boolean;
  created_at: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
}

export interface ApprenticeProgram {
  id: string;
  skill_id: string;
  master_id: string;
  apprentice_id: string;
  program_duration_months: number;
  start_date: string;
  expected_completion: string;
  skill_milestones: SkillMilestone[];
  cultural_education_included: boolean;
  certification_pathway: string;
  mentorship_frequency: string;
  practical_projects: string[];
  community_service_requirement?: boolean;
  status: 'active' | 'completed' | 'paused' | 'discontinued';
  progress_percentage: number;
  created_at: string;
  updated_at: string;
}

export interface SkillMilestone {
  milestone_id: string;
  title: string;
  description: string;
  target_completion_date: string;
  actual_completion_date?: string;
  assessment_criteria: string[];
  practical_demonstration_required: boolean;
  status: 'pending' | 'in_progress' | 'completed' | 'needs_review';
}

export interface SkillPreservationRecord {
  id: string;
  skill_id: string;
  preservation_method: 'video_documentation' | 'written_guide' | 'photo_series' | 'audio_recording' | 'interactive_demo';
  documentation_completeness: number;
  quality_rating: number;
  cultural_accuracy_verified: boolean;
  expert_reviewers: string[];
  preservation_date: string;
  last_updated: string;
  access_level: 'public' | 'restricted' | 'archive_only';
  digital_format: string;
  file_size_mb?: number;
  backup_locations: string[];
  preservation_notes: string[];
}

export interface EventParticipation {
  id: string;
  event_id: string;
  participant_id: string;
  registration_date: string;
  attendance_confirmed: boolean;
  participation_level: 'observer' | 'participant' | 'assistant' | 'presenter';
  skills_learned?: string[];
  cultural_knowledge_gained?: string[];
  satisfaction_rating?: number;
  feedback?: string;
  certificate_earned?: boolean;
  follow_up_interest?: string[];
  created_at: string;
}

export interface CulturalCalendarEvent {
  id: string;
  event_name: string;
  event_type: 'religious' | 'national' | 'traditional' | 'seasonal' | 'community';
  date_type: 'fixed' | 'lunar' | 'seasonal' | 'variable';
  primary_date: string;
  alternative_dates?: string[];
  cultural_significance: string;
  traditional_activities: string[];
  modern_celebrations: string[];
  regional_variations: string[];
  preparation_timeline: string[];
  community_involvement_opportunities: string[];
  educational_resources: string[];
  is_public_holiday: boolean;
  celebration_status: 'widely_celebrated' | 'community_specific' | 'family_tradition' | 'reviving';
}

export interface CommunityEngagementMetric {
  id: string;
  metric_type: 'participation_rate' | 'skill_transmission' | 'story_collection' | 'event_attendance';
  measurement_period: string;
  community_id?: string;
  demographic_breakdown: Record<string, number>;
  engagement_score: number;
  growth_trend: 'increasing' | 'stable' | 'decreasing';
  success_indicators: string[];
  improvement_areas: string[];
  recorded_date: string;
}
