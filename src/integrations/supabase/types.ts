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
      budget_templates: {
        Row: {
          career_stage: string
          created_at: string
          created_by: string | null
          description: string | null
          expense_categories: Json
          id: string
          income_categories: Json
          is_system_template: boolean
          title: string
          updated_at: string
        }
        Insert: {
          career_stage: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          expense_categories: Json
          id?: string
          income_categories: Json
          is_system_template?: boolean
          title: string
          updated_at?: string
        }
        Update: {
          career_stage?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          expense_categories?: Json
          id?: string
          income_categories?: Json
          is_system_template?: boolean
          title?: string
          updated_at?: string
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
      credential_verification_requests: {
        Row: {
          created_at: string
          database_source: string
          expires_at: string | null
          id: string
          request_data: Json
          response_data: Json | null
          status: string
          updated_at: string
          user_id: string
          verification_type: string
          verified_at: string | null
        }
        Insert: {
          created_at?: string
          database_source: string
          expires_at?: string | null
          id?: string
          request_data: Json
          response_data?: Json | null
          status?: string
          updated_at?: string
          user_id: string
          verification_type: string
          verified_at?: string | null
        }
        Update: {
          created_at?: string
          database_source?: string
          expires_at?: string | null
          id?: string
          request_data?: Json
          response_data?: Json | null
          status?: string
          updated_at?: string
          user_id?: string
          verification_type?: string
          verified_at?: string | null
        }
        Relationships: []
      }
      event_registrations: {
        Row: {
          event_id: string
          feedback: string | null
          id: string
          rating: number | null
          registration_date: string
          status: string
          user_id: string
        }
        Insert: {
          event_id: string
          feedback?: string | null
          id?: string
          rating?: number | null
          registration_date?: string
          status?: string
          user_id: string
        }
        Update: {
          event_id?: string
          feedback?: string | null
          id?: string
          rating?: number | null
          registration_date?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "networking_events"
            referencedColumns: ["id"]
          },
        ]
      }
      external_database_configs: {
        Row: {
          api_endpoint: string
          authentication_type: string
          created_at: string
          database_name: string
          id: string
          is_active: boolean
          rate_limit_per_minute: number | null
          timeout_seconds: number | null
          updated_at: string
        }
        Insert: {
          api_endpoint: string
          authentication_type: string
          created_at?: string
          database_name: string
          id?: string
          is_active?: boolean
          rate_limit_per_minute?: number | null
          timeout_seconds?: number | null
          updated_at?: string
        }
        Update: {
          api_endpoint?: string
          authentication_type?: string
          created_at?: string
          database_name?: string
          id?: string
          is_active?: boolean
          rate_limit_per_minute?: number | null
          timeout_seconds?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      financial_goals: {
        Row: {
          created_at: string
          current_amount: number | null
          deadline: string | null
          description: string | null
          goal_type: string
          id: string
          priority: string
          status: string
          target_amount: number
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_amount?: number | null
          deadline?: string | null
          description?: string | null
          goal_type: string
          id?: string
          priority?: string
          status?: string
          target_amount: number
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_amount?: number | null
          deadline?: string | null
          description?: string | null
          goal_type?: string
          id?: string
          priority?: string
          status?: string
          target_amount?: number
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      financial_projections: {
        Row: {
          created_at: string
          description: string | null
          expense_data: Json | null
          id: string
          income_data: Json | null
          investment_data: Json | null
          savings_data: Json | null
          scenario_type: string
          time_period: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          expense_data?: Json | null
          id?: string
          income_data?: Json | null
          investment_data?: Json | null
          savings_data?: Json | null
          scenario_type: string
          time_period: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          expense_data?: Json | null
          id?: string
          income_data?: Json | null
          investment_data?: Json | null
          savings_data?: Json | null
          scenario_type?: string
          time_period?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      financial_recommendations: {
        Row: {
          career_stage: string | null
          category: string
          created_at: string
          created_by: string | null
          description: string
          id: string
          income_level: string | null
          is_system_recommendation: boolean
          priority: string
          title: string
          updated_at: string
        }
        Insert: {
          career_stage?: string | null
          category: string
          created_at?: string
          created_by?: string | null
          description: string
          id?: string
          income_level?: string | null
          is_system_recommendation?: boolean
          priority?: string
          title: string
          updated_at?: string
        }
        Update: {
          career_stage?: string | null
          category?: string
          created_at?: string
          created_by?: string | null
          description?: string
          id?: string
          income_level?: string | null
          is_system_recommendation?: boolean
          priority?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      group_members: {
        Row: {
          group_id: string
          id: string
          joined_at: string
          role: string
          user_id: string
        }
        Insert: {
          group_id: string
          id?: string
          joined_at?: string
          role?: string
          user_id: string
        }
        Update: {
          group_id?: string
          id?: string
          joined_at?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "professional_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      group_posts: {
        Row: {
          attachment_url: string | null
          content: string
          created_at: string
          group_id: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          attachment_url?: string | null
          content: string
          created_at?: string
          group_id: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          attachment_url?: string | null
          content?: string
          created_at?: string
          group_id?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_posts_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "professional_groups"
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
      mentors: {
        Row: {
          availability: Json | null
          bio: string | null
          created_at: string
          expertise: string[]
          id: string
          is_active: boolean
          is_verified: boolean
          rating: number | null
          review_count: number | null
          updated_at: string
          user_id: string
          years_experience: number | null
        }
        Insert: {
          availability?: Json | null
          bio?: string | null
          created_at?: string
          expertise?: string[]
          id?: string
          is_active?: boolean
          is_verified?: boolean
          rating?: number | null
          review_count?: number | null
          updated_at?: string
          user_id: string
          years_experience?: number | null
        }
        Update: {
          availability?: Json | null
          bio?: string | null
          created_at?: string
          expertise?: string[]
          id?: string
          is_active?: boolean
          is_verified?: boolean
          rating?: number | null
          review_count?: number | null
          updated_at?: string
          user_id?: string
          years_experience?: number | null
        }
        Relationships: []
      }
      mentorship_relationships: {
        Row: {
          created_at: string
          end_date: string | null
          goals: string | null
          id: string
          mentee_id: string
          mentor_id: string
          start_date: string | null
          status: Database["public"]["Enums"]["mentorship_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          goals?: string | null
          id?: string
          mentee_id: string
          mentor_id: string
          start_date?: string | null
          status?: Database["public"]["Enums"]["mentorship_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          end_date?: string | null
          goals?: string | null
          id?: string
          mentee_id?: string
          mentor_id?: string
          start_date?: string | null
          status?: Database["public"]["Enums"]["mentorship_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "mentorship_relationships_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "mentors"
            referencedColumns: ["id"]
          },
        ]
      }
      mentorship_sessions: {
        Row: {
          created_at: string
          duration_minutes: number
          feedback: string | null
          id: string
          notes: string | null
          rating: number | null
          relationship_id: string
          scheduled_date: string
          status: string
          topic: string | null
          updated_at: string
          video_call_url: string | null
        }
        Insert: {
          created_at?: string
          duration_minutes?: number
          feedback?: string | null
          id?: string
          notes?: string | null
          rating?: number | null
          relationship_id: string
          scheduled_date: string
          status?: string
          topic?: string | null
          updated_at?: string
          video_call_url?: string | null
        }
        Update: {
          created_at?: string
          duration_minutes?: number
          feedback?: string | null
          id?: string
          notes?: string | null
          rating?: number | null
          relationship_id?: string
          scheduled_date?: string
          status?: string
          topic?: string | null
          updated_at?: string
          video_call_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mentorship_sessions_relationship_id_fkey"
            columns: ["relationship_id"]
            isOneToOne: false
            referencedRelation: "mentorship_relationships"
            referencedColumns: ["id"]
          },
        ]
      }
      networking_events: {
        Row: {
          cover_image_url: string | null
          created_at: string
          description: string | null
          end_date: string
          event_type: string
          group_id: string | null
          id: string
          is_featured: boolean
          is_virtual: boolean
          location: string | null
          max_participants: number | null
          organizer_id: string
          start_date: string
          title: string
          updated_at: string
          virtual_meeting_url: string | null
        }
        Insert: {
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          end_date: string
          event_type: string
          group_id?: string | null
          id?: string
          is_featured?: boolean
          is_virtual?: boolean
          location?: string | null
          max_participants?: number | null
          organizer_id: string
          start_date: string
          title: string
          updated_at?: string
          virtual_meeting_url?: string | null
        }
        Update: {
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          end_date?: string
          event_type?: string
          group_id?: string | null
          id?: string
          is_featured?: boolean
          is_virtual?: boolean
          location?: string | null
          max_participants?: number | null
          organizer_id?: string
          start_date?: string
          title?: string
          updated_at?: string
          virtual_meeting_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "networking_events_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "professional_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      post_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          post_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          post_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          post_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "group_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      professional_groups: {
        Row: {
          cover_image_url: string | null
          created_at: string
          creator_id: string
          description: string | null
          id: string
          industry: string | null
          is_private: boolean
          name: string
          updated_at: string
        }
        Insert: {
          cover_image_url?: string | null
          created_at?: string
          creator_id: string
          description?: string | null
          id?: string
          industry?: string | null
          is_private?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          cover_image_url?: string | null
          created_at?: string
          creator_id?: string
          description?: string | null
          id?: string
          industry?: string | null
          is_private?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: []
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
      training_materials: {
        Row: {
          category: string
          center_id: string
          created_at: string | null
          description: string
          file_name: string | null
          file_path: string | null
          file_size: number | null
          file_type: string | null
          id: string
          is_public: boolean | null
          material_type: string
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category: string
          center_id: string
          created_at?: string | null
          description: string
          file_name?: string | null
          file_path?: string | null
          file_size?: number | null
          file_type?: string | null
          id?: string
          is_public?: boolean | null
          material_type: string
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          center_id?: string
          created_at?: string | null
          description?: string
          file_name?: string | null
          file_path?: string | null
          file_size?: number | null
          file_type?: string | null
          id?: string
          is_public?: boolean | null
          material_type?: string
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_budgets: {
        Row: {
          created_at: string
          description: string | null
          end_date: string
          expense_data: Json
          id: string
          income_data: Json
          start_date: string
          status: string
          template_id: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_date: string
          expense_data: Json
          id?: string
          income_data: Json
          start_date: string
          status?: string
          template_id?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          end_date?: string
          expense_data?: Json
          id?: string
          income_data?: Json
          start_date?: string
          status?: string
          template_id?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_budgets_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "budget_templates"
            referencedColumns: ["id"]
          },
        ]
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
      user_connections: {
        Row: {
          created_at: string
          id: string
          recipient_id: string
          requester_id: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          recipient_id: string
          requester_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          recipient_id?: string
          requester_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_financial_plans: {
        Row: {
          career_stage: string
          created_at: string
          description: string | null
          expense_details: Json | null
          id: string
          income_details: Json | null
          investment_details: Json | null
          savings_details: Json | null
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          career_stage: string
          created_at?: string
          description?: string | null
          expense_details?: Json | null
          id?: string
          income_details?: Json | null
          investment_details?: Json | null
          savings_details?: Json | null
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          career_stage?: string
          created_at?: string
          description?: string | null
          expense_details?: Json | null
          id?: string
          income_details?: Json | null
          investment_details?: Json | null
          savings_details?: Json | null
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_financial_recommendations: {
        Row: {
          created_at: string
          id: string
          implementation_date: string | null
          implementation_notes: string | null
          is_implemented: boolean
          recommendation_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          implementation_date?: string | null
          implementation_notes?: string | null
          is_implemented?: boolean
          recommendation_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          implementation_date?: string | null
          implementation_notes?: string | null
          is_implemented?: boolean
          recommendation_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_financial_recommendations_recommendation_id_fkey"
            columns: ["recommendation_id"]
            isOneToOne: false
            referencedRelation: "financial_recommendations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_messages: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          message_text: string
          read_at: string | null
          recipient_id: string
          sender_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          message_text: string
          read_at?: string | null
          recipient_id: string
          sender_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          message_text?: string
          read_at?: string | null
          recipient_id?: string
          sender_id?: string
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
      verified_credentials: {
        Row: {
          created_at: string
          credential_number: string | null
          credential_title: string
          credential_type: string
          expiry_date: string | null
          id: string
          institution_name: string
          issue_date: string | null
          metadata: Json | null
          updated_at: string
          user_id: string
          verification_source: string
          verification_status: string
        }
        Insert: {
          created_at?: string
          credential_number?: string | null
          credential_title: string
          credential_type: string
          expiry_date?: string | null
          id?: string
          institution_name: string
          issue_date?: string | null
          metadata?: Json | null
          updated_at?: string
          user_id: string
          verification_source: string
          verification_status?: string
        }
        Update: {
          created_at?: string
          credential_number?: string | null
          credential_title?: string
          credential_type?: string
          expiry_date?: string | null
          id?: string
          institution_name?: string
          issue_date?: string | null
          metadata?: Json | null
          updated_at?: string
          user_id?: string
          verification_source?: string
          verification_status?: string
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
      mentorship_status:
        | "requested"
        | "accepted"
        | "active"
        | "completed"
        | "cancelled"
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
      mentorship_status: [
        "requested",
        "accepted",
        "active",
        "completed",
        "cancelled",
      ],
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
