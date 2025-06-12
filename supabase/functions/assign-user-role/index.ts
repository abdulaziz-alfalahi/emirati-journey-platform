
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the authorization header
    const authorization = req.headers.get('Authorization')
    if (!authorization) {
      throw new Error('No authorization header')
    }

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: authorization },
        },
      }
    )

    // Get the current user
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser()
    if (userError || !user) {
      throw new Error('Unauthorized')
    }

    // Check if the current user has admin privileges
    const { data: currentUserRoles, error: rolesError } = await supabaseClient
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)

    if (rolesError) {
      throw new Error('Failed to check user permissions')
    }

    const hasAdminRole = currentUserRoles?.some(
      roleRecord => roleRecord.role === 'administrator' || roleRecord.role === 'super_user'
    )

    if (!hasAdminRole) {
      throw new Error('Permission denied: Only administrators can assign roles')
    }

    // Parse request body
    const { userId, role } = await req.json()

    if (!userId || !role) {
      throw new Error('Missing userId or role in request body')
    }

    // Validate that the role is one of the allowed roles
    const allowedRoles = [
      'school_student', 'national_service_participant', 'university_student', 'intern',
      'full_time_employee', 'part_time_employee', 'gig_worker', 'jobseeker',
      'lifelong_learner', 'entrepreneur', 'retiree', 'educational_institution',
      'parent', 'private_sector_recruiter', 'government_representative',
      'retiree_advocate', 'training_center', 'assessment_center', 'mentor',
      'career_advisor', 'platform_operator', 'administrator', 'super_user'
    ]

    if (!allowedRoles.includes(role)) {
      throw new Error('Invalid role specified')
    }

    // Check if the role assignment already exists
    const { data: existingRole } = await supabaseClient
      .from('user_roles')
      .select('id')
      .eq('user_id', userId)
      .eq('role', role)
      .single()

    if (existingRole) {
      throw new Error('User already has this role')
    }

    // Insert the new role
    const { error: insertError } = await supabaseClient
      .from('user_roles')
      .insert([{ user_id: userId, role }])

    if (insertError) {
      console.error('Error inserting role:', insertError)
      throw new Error('Failed to assign role')
    }

    console.log(`Role "${role}" assigned to user ${userId} by admin ${user.id}`)

    return new Response(
      JSON.stringify({ success: true, message: 'Role assigned successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error in assign-user-role function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
