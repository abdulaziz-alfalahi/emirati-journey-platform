
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { JobDescriptionParser } from "./job_description_parser.ts";

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
    const { fileContent, fileType } = await req.json();
    
    if (!fileContent) {
      return new Response(
        JSON.stringify({ error: 'No file content provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    console.log(`Processing job description text (length: ${fileContent.length} chars)`);
    console.log(`First 100 chars: ${fileContent.substring(0, 100)}...`);
    
    // Initialize the job description parser
    const parser = new JobDescriptionParser();
    
    // Parse the job description text
    try {
      const result = parser.parseJobDescription(fileContent);
      
      // Return the structured job description data
      return new Response(
        JSON.stringify(result),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (parseError) {
      console.error('Error parsing job description:', parseError);
      return new Response(
        JSON.stringify({ error: 'Failed to parse job description: ' + parseError.message }),
        { status: 422, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Error in job-description-parser function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Unknown error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
