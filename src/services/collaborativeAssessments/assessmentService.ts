
import { supabase } from '@/integrations/supabase/client';
import { CollaborativeAssessment, AssessmentCollaborator, CollaboratorRole, CollaboratorPermissions } from '@/types/collaborativeAssessments';

export const createCollaborativeAssessment = async (assessment: Omit<CollaborativeAssessment, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('collaborative_assessments')
    .insert([assessment])
    .select('*, template:assessment_templates(*)')
    .single();

  if (error) {
    console.error('Error creating collaborative assessment:', error);
    throw error;
  }

  return data;
};

export const fetchCollaborativeAssessments = async (userId: string) => {
  const { data, error } = await supabase
    .from('collaborative_assessments')
    .select(`
      *,
      template:assessment_templates(*),
      collaborators:assessment_collaborators(*)
    `)
    .or(`created_by.eq.${userId},collaborators.user_id.eq.${userId}`)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching collaborative assessments:', error);
    throw error;
  }

  return data;
};

export const inviteCollaborator = async (
  assessmentId: string,
  userId: string,
  role: CollaboratorRole,
  invitedBy: string,
  permissions: CollaboratorPermissions
) => {
  const collaborator: Omit<AssessmentCollaborator, 'id'> = {
    assessment_id: assessmentId,
    user_id: userId,
    role,
    invited_by: invitedBy,
    invited_at: new Date().toISOString(),
    status: 'pending',
    permissions
  };

  const { data, error } = await supabase
    .from('assessment_collaborators')
    .insert([collaborator])
    .select()
    .single();

  if (error) {
    console.error('Error inviting collaborator:', error);
    throw error;
  }

  return data;
};

export const respondToInvitation = async (collaboratorId: string, status: 'accepted' | 'declined') => {
  const updates: any = { status };
  if (status === 'accepted') {
    updates.joined_at = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from('assessment_collaborators')
    .update(updates)
    .eq('id', collaboratorId)
    .select()
    .single();

  if (error) {
    console.error('Error responding to invitation:', error);
    throw error;
  }

  return data;
};

export const fetchAssessmentCollaborators = async (assessmentId: string) => {
  const { data, error } = await supabase
    .from('assessment_collaborators')
    .select(`
      *,
      user:profiles(*)
    `)
    .eq('assessment_id', assessmentId)
    .order('invited_at', { ascending: false });

  if (error) {
    console.error('Error fetching assessment collaborators:', error);
    throw error;
  }

  return data;
};

export const removeCollaborator = async (collaboratorId: string) => {
  const { error } = await supabase
    .from('assessment_collaborators')
    .delete()
    .eq('id', collaboratorId);

  if (error) {
    console.error('Error removing collaborator:', error);
    throw error;
  }

  return true;
};

export const updateCollaboratorRole = async (collaboratorId: string, role: CollaboratorRole, permissions: CollaboratorPermissions) => {
  const { data, error } = await supabase
    .from('assessment_collaborators')
    .update({ role, permissions })
    .eq('id', collaboratorId)
    .select()
    .single();

  if (error) {
    console.error('Error updating collaborator role:', error);
    throw error;
  }

  return data;
};
