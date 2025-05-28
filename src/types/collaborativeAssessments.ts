
import { Json } from '@/integrations/supabase/types';

export type CollaboratorRole = 'owner' | 'trainer' | 'mentor' | 'employer' | 'evaluator' | 'viewer';

export type AssessmentTemplateStatus = 'draft' | 'published' | 'archived';

export type CollaborativeAssessmentStatus = 'draft' | 'in_progress' | 'under_review' | 'completed' | 'cancelled';

export interface AssessmentTemplate {
  id: string;
  title: string;
  description?: string;
  created_by: string;
  status: AssessmentTemplateStatus;
  category: string;
  sections: AssessmentSection[];
  scoring_criteria: Json;
  estimated_duration_minutes?: number;
  is_public: boolean;
  tags?: string[];
  created_at: string;
  updated_at: string;
}

export interface AssessmentSection {
  id: string;
  title: string;
  description?: string;
  weight: number;
  criteria: AssessmentCriterion[];
  order_index: number;
}

export interface AssessmentCriterion {
  id: string;
  title: string;
  description?: string;
  max_score: number;
  scoring_type: 'numeric' | 'rubric' | 'checkbox' | 'text';
  rubric_levels?: RubricLevel[];
  is_required: boolean;
}

export interface RubricLevel {
  score: number;
  label: string;
  description: string;
}

export interface CollaborativeAssessment {
  id: string;
  template_id: string;
  title: string;
  candidate_id: string;
  created_by: string;
  status: CollaborativeAssessmentStatus;
  due_date?: string;
  instructions?: string;
  metadata?: Json;
  created_at: string;
  updated_at: string;
  template?: AssessmentTemplate;
}

export interface AssessmentCollaborator {
  id: string;
  assessment_id: string;
  user_id: string;
  role: CollaboratorRole;
  invited_by: string;
  invited_at: string;
  joined_at?: string;
  status: 'pending' | 'accepted' | 'declined';
  permissions: CollaboratorPermissions;
}

export interface CollaboratorPermissions {
  can_edit: boolean;
  can_evaluate: boolean;
  can_invite_others: boolean;
  can_view_reports: boolean;
  can_comment: boolean;
}

export interface AssessmentEvaluation {
  id: string;
  assessment_id: string;
  evaluator_id: string;
  section_id: string;
  criterion_id: string;
  score?: number;
  comments?: string;
  evidence_urls?: string[];
  submitted_at?: string;
  created_at: string;
  updated_at: string;
}

export interface AssessmentComment {
  id: string;
  assessment_id: string;
  user_id: string;
  parent_comment_id?: string;
  content: string;
  section_id?: string;
  criterion_id?: string;
  created_at: string;
  updated_at: string;
}

export interface AssessmentProgress {
  assessment_id: string;
  total_sections: number;
  completed_sections: number;
  total_criteria: number;
  evaluated_criteria: number;
  progress_percentage: number;
  collaborators_count: number;
  active_collaborators: number;
}

export interface AssessmentReport {
  assessment_id: string;
  candidate_id: string;
  template_title: string;
  overall_score: number;
  max_possible_score: number;
  percentage_score: number;
  section_scores: SectionScore[];
  collaborator_insights: CollaboratorInsight[];
  recommendations: string[];
  generated_at: string;
}

export interface SectionScore {
  section_id: string;
  section_title: string;
  score: number;
  max_score: number;
  percentage: number;
  criteria_scores: CriterionScore[];
}

export interface CriterionScore {
  criterion_id: string;
  criterion_title: string;
  score: number;
  max_score: number;
  evaluator_scores: EvaluatorScore[];
  consensus_level: number;
}

export interface EvaluatorScore {
  evaluator_id: string;
  evaluator_name: string;
  score: number;
  comments?: string;
}

export interface CollaboratorInsight {
  collaborator_id: string;
  collaborator_name: string;
  role: CollaboratorRole;
  sections_evaluated: number;
  average_score_given: number;
  key_comments: string[];
}
