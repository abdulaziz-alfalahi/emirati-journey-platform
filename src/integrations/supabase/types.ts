export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      advisory_sessions: {
        Row: {
          advisor_id: string
          completed_date: string | null
          created_at: string | null
          details: string | null
          feedback: string | null
          id: string
          notes: string | null
          rating: number | null
          scheduled_date: string
          status: string
          topic: string
          updated_at: string | null
          user_id: string
          video_call_url: string | null
        }
        Insert: {
          advisor_id: string
          completed_date?: string | null
          created_at?: string | null
          details?: string | null
          feedback?: string | null
          id?: string
          notes?: string | null
          rating?: number | null
          scheduled_date: string
          status?: string
          topic: string
          updated_at?: string | null
          user_id: string
          video_call_url?: string | null
        }
        Update: {
          advisor_id?: string
          completed_date?: string | null
          created_at?: string | null
          details?: string | null
          feedback?: string | null
          id?: string
          notes?: string | null
          rating?: number | null
          scheduled_date?: string
          status?: string
          topic?: string
          updated_at?: string | null
          user_id?: string
          video_call_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "advisory_sessions_advisor_id_fkey"
            columns: ["advisor_id"]
            isOneToOne: false
            referencedRelation: "career_advisors"
            referencedColumns: ["id"]
          },
        ]
      }
      api_keys: {
        Row: {
          created_at: string | null
          hirevue_api_key: string | null
          id: string
          linkedin_client_id: string | null
          linkedin_client_secret: string | null
          mapbox_access_token: string | null
          uaepass_client_id: string | null
          uaepass_client_secret: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          hirevue_api_key?: string | null
          id?: string
          linkedin_client_id?: string | null
          linkedin_client_secret?: string | null
          mapbox_access_token?: string | null
          uaepass_client_id?: string | null
          uaepass_client_secret?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          hirevue_api_key?: string | null
          id?: string
          linkedin_client_id?: string | null
          linkedin_client_secret?: string | null
          mapbox_access_token?: string | null
          uaepass_client_id?: string | null
          uaepass_client_secret?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      assessment_sessions: {
        Row: {
          assessment_id: string
          coaching_notes: string | null
          coaching_recommended: boolean | null
          completed_date: string | null
          created_at: string | null
          feedback: string | null
          id: string
          results: Json | null
          scheduled_date: string | null
          score: number | null
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          assessment_id: string
          coaching_notes?: string | null
          coaching_recommended?: boolean | null
          completed_date?: string | null
          created_at?: string | null
          feedback?: string | null
          id?: string
          results?: Json | null
          scheduled_date?: string | null
          score?: number | null
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          assessment_id?: string
          coaching_notes?: string | null
          coaching_recommended?: boolean | null
          completed_date?: string | null
          created_at?: string | null
          feedback?: string | null
          id?: string
          results?: Json | null
          scheduled_date?: string | null
          score?: number | null
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_sessions_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      assessments: {
        Row: {
          assessment_type: Database["public"]["Enums"]["assessment_type"]
          center_id: string
          created_at: string | null
          description: string | null
          duration_minutes: number | null
          eligibility_criteria: Json | null
          id: string
          is_active: boolean | null
          price_amount: number | null
          price_currency: string | null
          requirements: string | null
          skills_tested: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          assessment_type: Database["public"]["Enums"]["assessment_type"]
          center_id: string
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          eligibility_criteria?: Json | null
          id?: string
          is_active?: boolean | null
          price_amount?: number | null
          price_currency?: string | null
          requirements?: string | null
          skills_tested?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          assessment_type?: Database["public"]["Enums"]["assessment_type"]
          center_id?: string
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          eligibility_criteria?: Json | null
          id?: string
          is_active?: boolean | null
          price_amount?: number | null
          price_currency?: string | null
          requirements?: string | null
          skills_tested?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      career_advisors: {
        Row: {
          availability: Json | null
          bio: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          specialization: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          availability?: Json | null
          bio?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          specialization: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          availability?: Json | null
          bio?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          specialization?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      coaching_recommendations: {
        Row: {
          coach_id: string | null
          created_at: string
          id: string
          reason: string
          scheduled_date: string | null
          session_id: string
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          coach_id?: string | null
          created_at?: string
          id?: string
          reason: string
          scheduled_date?: string | null
          session_id: string
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          coach_id?: string | null
          created_at?: string
          id?: string
          reason?: string
          scheduled_date?: string | null
          session_id?: string
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "coaching_recommendations_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "assessment_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      job_descriptions: {
        Row: {
          application_deadline: string | null
          benefits: Json | null
          company: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          employment_type: string | null
          id: string
          is_active: boolean | null
          keywords: Json | null
          location: string | null
          posted_date: string | null
          requirements: Json | null
          responsibilities: Json | null
          salary: Json | null
          title: string
          updated_at: string | null
          user_id: string | null
          work_mode: string | null
        }
        Insert: {
          application_deadline?: string | null
          benefits?: Json | null
          company?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          employment_type?: string | null
          id?: string
          is_active?: boolean | null
          keywords?: Json | null
          location?: string | null
          posted_date?: string | null
          requirements?: Json | null
          responsibilities?: Json | null
          salary?: Json | null
          title: string
          updated_at?: string | null
          user_id?: string | null
          work_mode?: string | null
        }
        Update: {
          application_deadline?: string | null
          benefits?: Json | null
          company?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          employment_type?: string | null
          id?: string
          is_active?: boolean | null
          keywords?: Json | null
          location?: string | null
          posted_date?: string | null
          requirements?: Json | null
          responsibilities?: Json | null
          salary?: Json | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
          work_mode?: string | null
        }
        Relationships: []
      }
      job_matches: {
        Row: {
          category_scores: Json | null
          created_at: string | null
          id: string
          job_id: string | null
          match_details: Json | null
          overall_score: number | null
          profile_id: string | null
          updated_at: string | null
        }
        Insert: {
          category_scores?: Json | null
          created_at?: string | null
          id?: string
          job_id?: string | null
          match_details?: Json | null
          overall_score?: number | null
          profile_id?: string | null
          updated_at?: string | null
        }
        Update: {
          category_scores?: Json | null
          created_at?: string | null
          id?: string
          job_id?: string | null
          match_details?: Json | null
          overall_score?: number | null
          profile_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_matches_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "job_descriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_matches_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      resume_data: {
        Row: {
          created_at: string
          data: Json
          id: string
          resume_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          data: Json
          id?: string
          resume_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          data?: Json
          id?: string
          resume_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "resume_data_resume_id_fkey"
            columns: ["resume_id"]
            isOneToOne: false
            referencedRelation: "resume_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resume_data_resume_id_fkey"
            columns: ["resume_id"]
            isOneToOne: false
            referencedRelation: "resumes"
            referencedColumns: ["id"]
          },
        ]
      }
      resumes: {
        Row: {
          created_at: string
          id: string
          is_public: boolean
          template_id: string
          theme: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_public?: boolean
          template_id: string
          theme?: string
          title?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_public?: boolean
          template_id?: string
          theme?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      scholarship_applications: {
        Row: {
          application_data: Json | null
          id: string
          scholarship_id: string
          status: string
          student_id: string
          submitted_at: string | null
          updated_at: string | null
        }
        Insert: {
          application_data?: Json | null
          id?: string
          scholarship_id: string
          status?: string
          student_id: string
          submitted_at?: string | null
          updated_at?: string | null
        }
        Update: {
          application_data?: Json | null
          id?: string
          scholarship_id?: string
          status?: string
          student_id?: string
          submitted_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scholarship_applications_scholarship_id_fkey"
            columns: ["scholarship_id"]
            isOneToOne: false
            referencedRelation: "scholarships"
            referencedColumns: ["id"]
          },
        ]
      }
      scholarships: {
        Row: {
          amount: number | null
          application_deadline: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string | null
          created_by: string | null
          currency: string | null
          description: string | null
          eligibility_criteria: Json | null
          id: string
          is_active: boolean | null
          provider: string
          provider_type: string
          requirements: string[] | null
          title: string
          updated_at: string | null
          website_url: string | null
        }
        Insert: {
          amount?: number | null
          application_deadline?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          created_by?: string | null
          currency?: string | null
          description?: string | null
          eligibility_criteria?: Json | null
          id?: string
          is_active?: boolean | null
          provider: string
          provider_type: string
          requirements?: string[] | null
          title: string
          updated_at?: string | null
          website_url?: string | null
        }
        Update: {
          amount?: number | null
          application_deadline?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          created_by?: string | null
          currency?: string | null
          description?: string | null
          eligibility_criteria?: Json | null
          id?: string
          is_active?: boolean | null
          provider?: string
          provider_type?: string
          requirements?: string[] | null
          title?: string
          updated_at?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      resume_view: {
        Row: {
          created_at: string | null
          data: Json | null
          id: string | null
          is_public: boolean | null
          template_id: string | null
          theme: string | null
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_table_columns: {
        Args: {
          table_name: string
        }
        Returns: {
          column_name: string
          data_type: string
        }[]
      }
      has_role: {
        Args: {
          user_id: string
          required_role: Database["public"]["Enums"]["user_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      assessment_type: "skills" | "behaviors" | "capabilities"
      user_role:
        | "school_student"
        | "national_service_participant"
        | "university_student"
        | "intern"
        | "full_time_employee"
        | "part_time_employee"
        | "gig_worker"
        | "jobseeker"
        | "lifelong_learner"
        | "entrepreneur"
        | "retiree"
        | "educational_institution"
        | "parent"
        | "private_sector_recruiter"
        | "government_representative"
        | "retiree_advocate"
        | "training_center"
        | "assessment_center"
        | "mentor"
        | "career_advisor"
        | "administrator"
        | "super_user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
