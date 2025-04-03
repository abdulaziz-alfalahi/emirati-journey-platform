
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
import { AffindaAPI, AffindaCredential } from "https://esm.sh/@affinda/affinda@3.0.0";

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
    
    // Get the Affinda API key from either the database or environment variables
    const { data: apiKeys, error: apiKeysError } = await supabaseClient
      .from('api_keys')
      .select('*')
      .maybeSingle();
    
    // First try to get the API key from the database
    let affindaApiKey = '';
    
    if (apiKeys) {
      // Check in various formats since different naming conventions might be used
      affindaApiKey = 
        apiKeys.affinda_api_key || 
        apiKeys.affindaApiKey || 
        apiKeys.AFFINDA_API_KEY || 
        '';
    }
    
    // If not found in database, try the environment variable as fallback
    if (!affindaApiKey) {
      affindaApiKey = Deno.env.get('AFFINDA_API_KEY') || '';
      console.log('Using Affinda API key from environment:', affindaApiKey ? 'Key found' : 'Key not found');
    }
    
    // If still no API key, return error
    if (!affindaApiKey) {
      return new Response(
        JSON.stringify({ 
          error: 'Affinda API key not found. Please add it in API Keys settings or as a Supabase secret.' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }
    
    // Get the file data from the request
    const { fileData, fileName, fileType } = await req.json();
    
    if (!fileData) {
      return new Response(
        JSON.stringify({ error: 'No file data provided' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }
    
    // Initialize the Affinda client
    const credential = new AffindaCredential(affindaApiKey);
    const client = new AffindaAPI(credential);
    
    // Call Affinda API
    console.log('Calling Affinda API for file:', fileName);
    const base64Content = fileData.split(',')[1]; // Remove the data:application/pdf;base64, part
    
    const response = await client.createDocument({
      file: base64Content,
      fileName: fileName,
      collection: 'resumes',
      wait: true // Wait for the processing to complete
    });
    
    const data = response.data;
    console.log('Affinda API response received for:', fileName);
    
    // Map Affinda response to your ResumeData structure
    const resumeData = {
      personal: {
        fullName: data.name?.raw || '',
        jobTitle: data.profession || '',
        email: data.emails?.[0] || '',
        phone: data.phoneNumbers?.[0] || '',
        location: data.location?.raw || '',
        linkedin: data.linkedin || '',
        website: data.websites?.[0] || ''
      },
      summary: data.summary || '',
      experience: (data.workExperience || []).map(exp => ({
        id: crypto.randomUUID(),
        company: exp.organization || '',
        position: exp.jobTitle || '',
        location: exp.location?.raw || '',
        startDate: exp.dates?.startDate || '',
        endDate: exp.dates?.endDate || null,
        current: exp.dates?.isCurrent || false,
        description: exp.jobDescription || ''
      })),
      education: (data.education || []).map(edu => ({
        id: crypto.randomUUID(),
        institution: edu.organization || '',
        degree: edu.accreditation?.education || '',
        field: edu.accreditation?.inputStr || '',
        location: edu.location?.raw || '',
        startDate: edu.dates?.startDate || '',
        endDate: edu.dates?.endDate || null,
        current: edu.dates?.isCurrent || false
      })),
      skills: (data.skills || []).map(skill => ({
        id: crypto.randomUUID(),
        name: skill.name,
        level: ''
      })),
      languages: (data.languages || []).map(language => ({
        id: crypto.randomUUID(),
        name: language,
        proficiency: 'Conversational'
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
    console.error('Error in parse-resume function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Error processing resume', 
        details: error.message 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
