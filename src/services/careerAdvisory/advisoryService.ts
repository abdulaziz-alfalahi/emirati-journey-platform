
import { supabase } from "@/integrations/supabase/client";
import { CareerAdvisor } from "@/types/careerAdvisory";

export const getAdvisors = async (): Promise<CareerAdvisor[]> => {
  try {
    const { data, error } = await supabase
      .from('career_advisors')
      .select('*')
      .eq('is_active', true);

    if (error) {
      console.error("Error fetching advisors:", error);
      throw error;
    }

    return data as CareerAdvisor[];
  } catch (error) {
    console.error("Exception in getAdvisors:", error);
    throw error;
  }
};

export const getAdvisorById = async (id: string): Promise<CareerAdvisor | null> => {
  try {
    const { data, error } = await supabase
      .from('career_advisors')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as CareerAdvisor;
  } catch (error) {
    console.error("Error fetching advisor:", error);
    return null;
  }
};

export const createAdvisor = async (advisor: Omit<CareerAdvisor, "id" | "created_at" | "updated_at">): Promise<CareerAdvisor> => {
  try {
    const { data, error } = await supabase
      .from('career_advisors')
      .insert(advisor)
      .select()
      .single();

    if (error) throw error;
    return data as CareerAdvisor;
  } catch (error) {
    console.error("Error creating advisor:", error);
    throw error;
  }
};

export const updateAdvisor = async (id: string, advisor: Partial<Omit<CareerAdvisor, "id" | "created_at" | "updated_at">>): Promise<CareerAdvisor> => {
  try {
    const { data, error } = await supabase
      .from('career_advisors')
      .update(advisor)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as CareerAdvisor;
  } catch (error) {
    console.error("Error updating advisor:", error);
    throw error;
  }
};

export const deleteAdvisor = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('career_advisors')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error("Error deleting advisor:", error);
    throw error;
  }
};
