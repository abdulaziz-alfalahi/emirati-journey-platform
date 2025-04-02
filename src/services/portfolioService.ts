
import { supabase } from "@/integrations/supabase/client";
import { Certificate, Portfolio, PortfolioHighlight, Training } from "@/types/portfolio";
import { fetchUserAssessmentSessions } from "./assessments/sessionService";
import { fetchAdvisorySessions } from "./careerAdvisory/advisorySessionService";

// Fetch certificates for a specific user
export const fetchCertificates = async (userId: string): Promise<Certificate[]> => {
  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .eq("user_id", userId)
    .order("issue_date", { ascending: false });

  if (error) {
    console.error("Error fetching certificates:", error);
    throw error;
  }

  return data as Certificate[];
};

// Fetch training records for a specific user
export const fetchTrainings = async (userId: string): Promise<Training[]> => {
  const { data, error } = await supabase
    .from("trainings")
    .select("*")
    .eq("user_id", userId)
    .order("start_date", { ascending: false });

  if (error) {
    console.error("Error fetching trainings:", error);
    throw error;
  }

  return data as Training[];
};

// Fetch portfolio highlights for a specific user
export const fetchPortfolioHighlights = async (userId: string): Promise<PortfolioHighlight[]> => {
  const { data, error } = await supabase
    .from("portfolio_highlights")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching portfolio highlights:", error);
    throw error;
  }

  return data as PortfolioHighlight[];
};

// Add a new certificate
export const addCertificate = async (certificate: Omit<Certificate, "id" | "created_at" | "updated_at">): Promise<Certificate> => {
  const { data, error } = await supabase
    .from("certificates")
    .insert(certificate)
    .select()
    .single();

  if (error) {
    console.error("Error adding certificate:", error);
    throw error;
  }

  return data as Certificate;
};

// Add a new training record
export const addTraining = async (training: Omit<Training, "id" | "created_at" | "updated_at">): Promise<Training> => {
  const { data, error } = await supabase
    .from("trainings")
    .insert(training)
    .select()
    .single();

  if (error) {
    console.error("Error adding training:", error);
    throw error;
  }

  return data as Training;
};

// Add a new portfolio highlight
export const addPortfolioHighlight = async (highlight: Omit<PortfolioHighlight, "id" | "created_at" | "updated_at">): Promise<PortfolioHighlight> => {
  const { data, error } = await supabase
    .from("portfolio_highlights")
    .insert(highlight)
    .select()
    .single();

  if (error) {
    console.error("Error adding portfolio highlight:", error);
    throw error;
  }

  return data as PortfolioHighlight;
};

// Update a certificate
export const updateCertificate = async (id: string, certificate: Partial<Omit<Certificate, "id" | "created_at" | "updated_at">>): Promise<Certificate> => {
  const { data, error } = await supabase
    .from("certificates")
    .update(certificate)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating certificate:", error);
    throw error;
  }

  return data as Certificate;
};

// Update a training record
export const updateTraining = async (id: string, training: Partial<Omit<Training, "id" | "created_at" | "updated_at">>): Promise<Training> => {
  const { data, error } = await supabase
    .from("trainings")
    .update(training)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating training:", error);
    throw error;
  }

  return data as Training;
};

// Update a portfolio highlight
export const updatePortfolioHighlight = async (id: string, highlight: Partial<Omit<PortfolioHighlight, "id" | "created_at" | "updated_at">>): Promise<PortfolioHighlight> => {
  const { data, error } = await supabase
    .from("portfolio_highlights")
    .update(highlight)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating portfolio highlight:", error);
    throw error;
  }

  return data as PortfolioHighlight;
};

// Delete a certificate
export const deleteCertificate = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from("certificates")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting certificate:", error);
    throw error;
  }
};

// Delete a training record
export const deleteTraining = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from("trainings")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting training:", error);
    throw error;
  }
};

// Delete a portfolio highlight
export const deletePortfolioHighlight = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from("portfolio_highlights")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting portfolio highlight:", error);
    throw error;
  }
};

// Fetch all portfolio data for a user
export const fetchPortfolio = async (userId: string): Promise<Portfolio> => {
  try {
    // Parallel fetching of all portfolio components
    const [certificates, trainings, highlights, assessments, interviews] = await Promise.all([
      fetchCertificates(userId),
      fetchTrainings(userId),
      fetchPortfolioHighlights(userId),
      fetchUserAssessmentSessions(userId),
      fetchAdvisorySessions(userId),
    ]);

    // Filter interviews from advisory sessions
    const interviewSessions = interviews.filter((session) => session.is_interview);

    return {
      userId,
      certificates,
      trainings,
      highlights,
      assessments,
      interviews: interviewSessions,
    };
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    throw error;
  }
};

// Check if a user can view another user's portfolio
export const canViewPortfolio = async (viewerId: string, portfolioOwnerId: string): Promise<boolean> => {
  // Check if viewer is the owner
  if (viewerId === portfolioOwnerId) return true;
  
  // Check if viewer has a role that allows them to view portfolios
  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", viewerId);

  if (error) {
    console.error("Error checking user roles:", error);
    return false;
  }

  // Check if viewer has one of the authorized roles
  const authorizedRoles = ["career_advisor", "administrator", "private_sector_recruiter", "mentor"];
  return data.some(roleObj => authorizedRoles.includes(roleObj.role));
};
