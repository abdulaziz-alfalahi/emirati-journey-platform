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
      camp_enrollments: {
        Row: {
          camp_id: string
          enrolled_at: string
          id: string
          payment_status: string
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          camp_id: string
          enrolled_at?: string
          id?: string
          payment_status?: string
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          camp_id?: string
          enrolled_at?: string
          id?: string
          payment_status?: string
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "camp_enrollments_camp_id_fkey"
            columns: ["camp_id"]
            isOneToOne: false
            referencedRelation: "summer_camps"
            referencedColumns: ["id"]
          },
        ]
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
      career_path_stages: {
        Row: {
          career_path_id: string
          created_at: string
          description: string | null
          duration: string | null
          icon: string | null
          id: string
          order_index: number
          requirements: string[] | null
          skills: string[] | null
          stage_type: string
          title: string
          updated_at: string | null
        }
        Insert: {
          career_path_id: string
          created_at?: string
          description?: string | null
          duration?: string | null
          icon?: string | null
          id?: string
          order_index: number
          requirements?: string[] | null
          skills?: string[] | null
          stage_type: string
          title: string
          updated_at?: string | null
        }
        Update: {
          career_path_id?: string
          created_at?: string
          description?: string | null
          duration?: string | null
          icon?: string | null
          id?: string
          order_index?: number
          requirements?: string[] | null
          skills?: string[] | null
          stage_type?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "career_path_stages_career_path_id_fkey"
            columns: ["career_path_id"]
            isOneToOne: false
            referencedRelation: "career_paths"
            referencedColumns: ["id"]
          },
        ]
      }
      career_paths: {
        Row: {
          created_at: string
          description: string | null
          id: string
          industry: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          industry: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          industry?: string
          title?: string
          updated_at?: string | null
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
      internship_applications: {
        Row: {
          id: string
          internship_id: string
          notes: string | null
          status: string
          student_id: string
          submitted_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          internship_id: string
          notes?: string | null
          status?: string
          student_id: string
          submitted_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          internship_id?: string
          notes?: string | null
          status?: string
          student_id?: string
          submitted_at?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "internship_applications_internship_id_fkey"
            columns: ["internship_id"]
            isOneToOne: false
            referencedRelation: "internships"
            referencedColumns: ["id"]
          },
        ]
      }
      internships: {
        Row: {
          application_deadline: string
          company: string
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          created_by: string
          currency: string | null
          department: string | null
          description: string
          education_level: string | null
          end_date: string | null
          id: string
          industry: string
          is_active: boolean
          is_paid: boolean
          location: string
          requirements: string[] | null
          skills_required: string[] | null
          start_date: string | null
          stipend_amount: number | null
          title: string
          website_url: string | null
        }
        Insert: {
          application_deadline: string
          company: string
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          created_by: string
          currency?: string | null
          department?: string | null
          description: string
          education_level?: string | null
          end_date?: string | null
          id?: string
          industry: string
          is_active?: boolean
          is_paid?: boolean
          location: string
          requirements?: string[] | null
          skills_required?: string[] | null
          start_date?: string | null
          stipend_amount?: number | null
          title: string
          website_url?: string | null
        }
        Update: {
          application_deadline?: string
          company?: string
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          created_by?: string
          currency?: string | null
          department?: string | null
          description?: string
          education_level?: string | null
          end_date?: string | null
          id?: string
          industry?: string
          is_active?: boolean
          is_paid?: boolean
          location?: string
          requirements?: string[] | null
          skills_required?: string[] | null
          start_date?: string | null
          stipend_amount?: number | null
          title?: string
          website_url?: string | null
        }
        Relationships: []
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
      jobs: {
        Row: {
          created_at: string | null
          data: Json
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          data: Json
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          data?: Json
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      matches: {
        Row: {
          created_at: string | null
          data: Json
          id: string
          job_id: string | null
          resume_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          data: Json
          id?: string
          job_id?: string | null
          resume_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          data?: Json
          id?: string
          job_id?: string | null
          resume_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "matches_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_resume_id_fkey"
            columns: ["resume_id"]
            isOneToOne: false
            referencedRelation: "resume_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_resume_id_fkey"
            columns: ["resume_id"]
            isOneToOne: false
            referencedRelation: "resumes"
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
      summer_camps: {
        Row: {
          age_group: string
          capacity: number
          category: string
          created_at: string
          created_by: string | null
          description: string
          duration: string
          end_date: string
          enrolled: number
          id: string
          image_url: string
          location: string
          organizer: string
          price: number
          start_date: string
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          age_group: string
          capacity: number
          category: string
          created_at?: string
          created_by?: string | null
          description: string
          duration: string
          end_date: string
          enrolled?: number
          id?: string
          image_url?: string
          location: string
          organizer: string
          price: number
          start_date: string
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          age_group?: string
          capacity?: number
          category?: string
          created_at?: string
          created_by?: string | null
          description?: string
          duration?: string
          end_date?: string
          enrolled?: number
          id?: string
          image_url?: string
          location?: string
          organizer?: string
          price?: number
          start_date?: string
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_career_paths: {
        Row: {
          career_path_id: string
          current_stage_id: string | null
          id: string
          started_at: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          career_path_id: string
          current_stage_id?: string | null
          id?: string
          started_at?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          career_path_id?: string
          current_stage_id?: string | null
          id?: string
          started_at?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_career_paths_career_path_id_fkey"
            columns: ["career_path_id"]
            isOneToOne: false
            referencedRelation: "career_paths"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_career_paths_current_stage_id_fkey"
            columns: ["current_stage_id"]
            isOneToOne: false
            referencedRelation: "career_path_stages"
            referencedColumns: ["id"]
          },
        ]
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
        Args: { table_name: string }
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      assessment_type: ["skills", "behaviors", "capabilities"],
      user_role: [
        "school_student",
        "national_service_participant",
        "university_student",
        "intern",
        "full_time_employee",
        "part_time_employee",
        "gig_worker",
        "jobseeker",
        "lifelong_learner",
        "entrepreneur",
        "retiree",
        "educational_institution",
        "parent",
        "private_sector_recruiter",
        "government_representative",
        "retiree_advocate",
        "training_center",
        "assessment_center",
        "mentor",
        "career_advisor",
        "administrator",
        "super_user",
      ],
    },
  },
} as const
