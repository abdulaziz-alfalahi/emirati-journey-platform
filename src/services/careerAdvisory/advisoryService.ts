
import { supabase } from '@/integrations/supabase/client';
import { CareerAdvisor } from '@/types/careerAdvisory';

export const fetchCareerAdvisors = async () => {
  const { data, error } = await supabase
    .from('career_advisors')
    .select('*, user_profiles(full_name, avatar_url)')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching career advisors:', error);
    throw error;
  }

  return data as CareerAdvisor[];
};

export const fetchCareerAdvisorById = async (id: string) => {
  const { data, error } = await supabase
    .from('career_advisors')
    .select('*, user_profiles(full_name, avatar_url)')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching career advisor:', error);
    throw error;
  }

  return data as CareerAdvisor;
};

export const registerAsCareerAdvisor = async (userId: string, specialization: string, bio: string) => {
  const { data, error } = await supabase
    .from('career_advisors')
    .insert([{
      user_id: userId,
      specialization,
      bio,
      is_active: true
    }])
    .select()
    .single();

  if (error) {
    console.error('Error registering as career advisor:', error);
    throw error;
  }

  return data as CareerAdvisor;
};

export const updateCareerAdvisor = async (id: string, advisorData: Partial<CareerAdvisor>) => {
  const { data, error } = await supabase
    .from('career_advisors')
    .update(advisorData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating career advisor:', error);
    throw error;
  }

  return data as CareerAdvisor;
};
