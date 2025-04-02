
import { Database } from "@/integrations/supabase/types";

// Define the types we need for the Career Advisory feature
export type CareerAdvisor = {
  id: string;
  user_id: string;
  specialization: string;
  bio: string | null;
  availability: Record<string, any> | null;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
};

export type AdvisorySession = {
  id: string;
  user_id: string;
  advisor_id: string;
  status: "scheduled" | "completed" | "cancelled";
  scheduled_date: string;
  completed_date: string | null;
  topic: string;
  details: string | null;
  notes: string | null;
  rating: number | null;
  feedback: string | null;
  video_call_url: string | null;
  created_at: string;
  updated_at: string | null;
};

// Extend the Database type with our new tables
declare module "@/integrations/supabase/types" {
  interface Database {
    public: {
      Tables: {
        career_advisors: {
          Row: CareerAdvisor;
          Insert: Omit<CareerAdvisor, "id" | "created_at" | "updated_at">;
          Update: Partial<Omit<CareerAdvisor, "id" | "created_at" | "updated_at">>;
        };
        advisory_sessions: {
          Row: AdvisorySession;
          Insert: Omit<AdvisorySession, "id" | "created_at" | "updated_at">;
          Update: Partial<Omit<AdvisorySession, "id" | "created_at" | "updated_at">>;
        };
      };
    };
  }
}

// Export updated API keys type that includes HireVue
export interface ApiKeys {
  id: string;
  linkedin_client_id: string | null;
  linkedin_client_secret: string | null;
  mapbox_access_token: string | null;
  uaepass_client_id: string | null;
  uaepass_client_secret: string | null;
  hirevue_api_key: string | null;
  created_at: string | null;
  updated_at: string | null;
}
