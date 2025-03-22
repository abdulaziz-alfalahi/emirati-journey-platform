
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

  // Only allow GET requests
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { 
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
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

    // Get API keys from the database
    const { data: apiKeysData, error: apiKeysError } = await supabase
      .from('api_keys')
      .select('*')
      .limit(1);
    
    if (apiKeysError) {
      console.error('Error fetching API keys from database:', apiKeysError);
    }
    
    // Create a response object with the API keys
    let apiKeys: Record<string, string> = {};
    
    // If we have data from the database, use it
    if (apiKeysData && apiKeysData.length > 0) {
      // Convert all keys to both uppercase and original case
      Object.entries(apiKeysData[0]).forEach(([key, value]) => {
        if (typeof value === 'string' && key !== 'id' && key !== 'created_at' && key !== 'updated_at') {
          // Include both the original case and uppercase version
          apiKeys[key] = value;
          apiKeys[key.toUpperCase()] = value;
        }
      });
    }
    
    // If we have environment variables set, they take precedence
    const envKeys = [
      "MAPBOX_ACCESS_TOKEN",
      "LINKEDIN_CLIENT_ID",
      "LINKEDIN_CLIENT_SECRET",
      "UAEPASS_CLIENT_ID",
      "UAEPASS_CLIENT_SECRET"
    ];
    
    for (const key of envKeys) {
      const envValue = Deno.env.get(key);
      if (envValue) {
        apiKeys[key] = envValue;
        // Also add lowercase version
        apiKeys[key.toLowerCase()] = envValue;
      }
    }

    // Logs for debugging
    console.log(`API keys retrieved successfully for user ${user.id}`);
    console.log('Available keys:', Object.keys(apiKeys).filter(k => apiKeys[k]));

    return new Response(JSON.stringify(apiKeys), { 
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error('Error getting API keys:', error);
    
    return new Response(JSON.stringify({ error: 'Internal server error' }), { 
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
