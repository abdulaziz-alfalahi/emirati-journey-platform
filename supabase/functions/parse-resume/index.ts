
// supabase/functions/parse-resume/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req)  => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get API keys from your database
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );
    
    // Get the Affinda API key from your settings table
    const { data: apiKeys, error: apiKeysError } = await supabaseClient
      .from('api_keys') // Replace with your actual table name
      .select('*')
      .eq('key_type', 'affinda')
      .single();
    
    if (apiKeysError || !apiKeys || !apiKeys.key_value) {
      return new Response(
        JSON.stringify({ 
          error: 'Affinda API key not found. Please add it in API Keys settings.' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }
    
    const affindaApiKey = apiKeys.key_value;
    
    // Get the file data from the request
    const { fileData, fileName, fileType } = await req.json();
    
    if (!fileData) {
      return new Response(
        JSON.stringify({ error: 'No file data provided' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }
    
    // Call Affinda API
    const affindaResponse = await fetch('https://api.affinda.com/v3/documents', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${affindaApiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        data: fileData.split(',')[1], // Remove the data:application/pdf;base64, part
        file_name: fileName,
        wait: 'true' // Wait for the processing to complete
      })
    });
    
    const affindaData = await affindaResponse.json();
    
    if (!affindaResponse.ok) {
      return new Response(
        JSON.stringify({ 
          error: 'Error calling Affinda API', 
          details: affindaData 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }
    
    // Map Affinda response to your ResumeData structure
    const resumeData = {
      personal: {
        fullName: affindaData.data.name?.raw || '',
        jobTitle: affindaData.data.profession || '',
        email: affindaData.data.emails?.[0] || '',
        phone: affindaData.data.phoneNumbers?.[0] || '',
        location: affindaData.data.location?.raw || '',
        linkedin: affindaData.data.linkedin || '',
        website: affindaData.data.websites?.[0] || ''
      },
      summary: affindaData.data.summary || '',
      experience: (affindaData.data.workExperience || []).map(exp => ({
        id: Math.random().toString(36).substring(2, 9),
        company: exp.organization || '',
        position: exp.jobTitle || '',
        location: exp.location?.raw || '',
        startDate: exp.dates?.startDate || '',
        endDate: exp.dates?.endDate || null,
        current: exp.dates?.isCurrent || false,
        description: exp.jobDescription || ''
      })),
      education: (affindaData.data.education || []).map(edu => ({
        id: Math.random().toString(36).substring(2, 9),
        institution: edu.organization || '',
        degree: edu.accreditation?.education || '',
        field: edu.accreditation?.inputStr || '',
        location: edu.location?.raw || '',
        startDate: edu.dates?.startDate || '',
        endDate: edu.dates?.endDate || null,
        current: edu.dates?.isCurrent || false
      })),
      skills: (affindaData.data.skills || []).map(skill => ({
        name: skill.name,
        level: ''
      })),
      metadata: {
        parsingMethod: 'affinda-api',
        parsedAt: new Date().toISOString(),
        fileType: fileType,
        processingId: `affinda_${Date.now()}`
      }
    };
    
    return new Response(
      JSON.stringify(resumeData),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        error: 'Error processing resume', 
        details: error.message 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
