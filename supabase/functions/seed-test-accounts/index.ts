
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const PERSONAS = [
  { role: 'school_student', email: 'school-student@emiratijourney.ae', fullName: 'Ahmed Al School Student' },
  { role: 'national_service_participant', email: 'national-service@emiratijourney.ae', fullName: 'Khalid Al National Service' },
  { role: 'university_student', email: 'university-student@emiratijourney.ae', fullName: 'Mariam Al University Student' },
  { role: 'intern', email: 'intern@emiratijourney.ae', fullName: 'Noura Al Intern' },
  { role: 'full_time_employee', email: 'full-time@emiratijourney.ae', fullName: 'Saeed Al Full-Time Employee' },
  { role: 'part_time_employee', email: 'part-time@emiratijourney.ae', fullName: 'Hessa Al Part-Time Employee' },
  { role: 'gig_worker', email: 'gig-worker@emiratijourney.ae', fullName: 'Omar Al Gig Worker' },
  { role: 'jobseeker', email: 'jobseeker@emiratijourney.ae', fullName: 'Fatima Al Jobseeker' },
  { role: 'lifelong_learner', email: 'lifelong-learner@emiratijourney.ae', fullName: 'Mohammed Al Lifelong Learner' },
  { role: 'entrepreneur', email: 'entrepreneur@emiratijourney.ae', fullName: 'Aisha Al Entrepreneur' },
  { role: 'retiree', email: 'retiree@emiratijourney.ae', fullName: 'Ali Al Retiree' },
  { role: 'educational_institution', email: 'educational-institution@emiratijourney.ae', fullName: 'Zayed University' },
  { role: 'parent', email: 'parent@emiratijourney.ae', fullName: 'Hamad Al Parent' },
  { role: 'private_sector_recruiter', email: 'recruiter@emiratijourney.ae', fullName: 'Emirates Group Recruitment' },
  { role: 'government_representative', email: 'government@emiratijourney.ae', fullName: 'Ministry of Human Resources' },
  { role: 'retiree_advocate', email: 'retiree-advocate@emiratijourney.ae', fullName: 'Retirees Support Center' },
  { role: 'training_center', email: 'training-center@emiratijourney.ae', fullName: 'Emirates Skills Training Center' },
  { role: 'assessment_center', email: 'assessment-center@emiratijourney.ae', fullName: 'UAE Assessment Center' },
  { role: 'mentor', email: 'mentor@emiratijourney.ae', fullName: 'Rashid Al Mentor' },
  { role: 'career_advisor', email: 'career-advisor@emiratijourney.ae', fullName: 'Moza Al Career Advisor' },
  { role: 'administrator', email: 'admin@emiratijourney.ae', fullName: 'System Administrator' },
  { role: 'super_user', email: 'super-user@emiratijourney.ae', fullName: 'Super User' }
];

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the service role key
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    const password = 'journey123!';
    const createdAccounts = [];
    const existingAccounts = [];
    const failedAccounts = [];

    // Create each persona account
    for (const persona of PERSONAS) {
      try {
        // Check if user already exists
        const { data: existingUsers } = await supabaseClient
          .from('profiles')
          .select('email')
          .eq('email', persona.email)
          .single();

        if (existingUsers) {
          existingAccounts.push(persona.email);
          continue;
        }

        // Create user
        const { data: authData, error: authError } = await supabaseClient.auth.admin.createUser({
          email: persona.email,
          password: password,
          email_confirm: true,
          user_metadata: {
            full_name: persona.fullName
          }
        });

        if (authError) {
          console.error(`Failed to create user ${persona.email}:`, authError);
          failedAccounts.push({ email: persona.email, error: authError.message });
          continue;
        }

        // Add user role
        if (authData.user) {
          const { error: roleError } = await supabaseClient
            .from('user_roles')
            .insert({
              user_id: authData.user.id,
              role: persona.role
            });

          if (roleError) {
            console.error(`Failed to assign role to ${persona.email}:`, roleError);
            failedAccounts.push({ email: persona.email, error: roleError.message });
            continue;
          }

          createdAccounts.push(persona.email);
        }
      } catch (error) {
        console.error(`Error processing ${persona.email}:`, error);
        failedAccounts.push({ email: persona.email, error: error.message });
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Test accounts seeding completed',
        created: createdAccounts,
        existing: existingAccounts,
        failed: failedAccounts
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error in seed-test-accounts function:', error);
    
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 500,
      }
    );
  }
});
