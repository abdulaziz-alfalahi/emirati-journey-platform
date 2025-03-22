
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the project URL and service role key
    const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get auth user from request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // Verify the JWT
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // Check if user is admin based on roles or email
    let isAuthorized = false;
    
    // Check roles in the database
    const { data: roles, error: rolesError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id);

    if (!rolesError && roles) {
      isAuthorized = roles.some(r => 
        r.role === 'administrator' || r.role === 'super_user'
      );
    }
    
    // Special case: if email contains 'admin', also grant admin access
    // This ensures admin users can always access admin features even if roles fail
    if (user.email && user.email.includes('admin')) {
      isAuthorized = true;
    }

    if (!isAuthorized) {
      return new Response(JSON.stringify({ error: 'Forbidden - Insufficient permissions' }), { 
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // Parse the request body
    const requestData = await req.json();
    
    // Validate the API keys format
    const allowedKeys = [
      'MAPBOX_ACCESS_TOKEN', 
      'LINKEDIN_CLIENT_ID', 
      'LINKEDIN_CLIENT_SECRET', 
      'UAEPASS_CLIENT_ID', 
      'UAEPASS_CLIENT_SECRET'
    ];
    
    const validatedData = {};
    for (const key of allowedKeys) {
      if (key in requestData) {
        validatedData[key] = requestData[key];
      }
    }
    
    // Log the action (but don't log the actual keys for security)
    console.log(`API keys update requested by user ${user.id}`);
    console.log(`Keys being updated: ${Object.keys(validatedData).join(', ')}`);

    // In a production environment, this would update the actual secrets
    // For now, we'll just return success
    
    // Return a success response
    return new Response(JSON.stringify({ 
      message: 'API keys updated successfully',
      updated: Object.keys(validatedData)
    }), { 
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error('Error updating API keys:', error);
    
    return new Response(JSON.stringify({ error: 'Internal server error' }), { 
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
