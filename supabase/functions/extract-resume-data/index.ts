
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

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
    const { fileContent } = await req.json();
    
    if (!fileContent) {
      return new Response(
        JSON.stringify({ error: 'No file content provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Processing resume text (first 100 chars): ${fileContent.substring(0, 100)}...`);

    // Create a system prompt that instructs the model how to parse resume data
    const systemPrompt = `
      You are an expert resume parser. Extract structured information from the resume text.
      Output ONLY valid JSON with the following structure:
      {
        "personal": {
          "fullName": "string",
          "jobTitle": "string",
          "email": "string",
          "phone": "string",
          "location": "string",
          "linkedin": "string (optional)"
        },
        "experience": [
          {
            "company": "string",
            "position": "string",
            "location": "string (optional)",
            "startDate": "YYYY-MM format",
            "endDate": "YYYY-MM format or null if current",
            "current": "boolean",
            "description": "string"
          }
        ],
        "education": [
          {
            "institution": "string",
            "degree": "string",
            "field": "string",
            "location": "string (optional)",
            "startDate": "YYYY-MM format",
            "endDate": "YYYY-MM format or null if current",
            "current": "boolean"
          }
        ],
        "skills": [
          {
            "name": "string",
            "level": "either 'beginner', 'intermediate', 'advanced', or 'expert'"
          }
        ],
        "languages": [
          {
            "name": "string",
            "proficiency": "either 'basic', 'conversational', 'fluent', or 'native'"
          }
        ]
      }
      
      Do not include any explanatory text, just return the JSON object.
    `;

    console.log('Sending request to OpenAI...');

    // Call OpenAI API
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: fileContent }
        ],
        temperature: 0.3, // Lower temperature for more consistent results
      }),
    });

    if (!openAIResponse.ok) {
      const errorData = await openAIResponse.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${JSON.stringify(errorData)}`);
    }

    const data = await openAIResponse.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Unexpected response format from OpenAI');
    }

    const generatedContent = data.choices[0].message.content;
    console.log('OpenAI response received');

    // Try to parse the response as JSON
    let parsedData;
    try {
      // Find JSON object in the response (in case there's any extra text)
      const jsonMatch = generatedContent.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? jsonMatch[0] : generatedContent;
      parsedData = JSON.parse(jsonString);
      
      // Add ids to each item in arrays
      if (parsedData.experience) {
        parsedData.experience = parsedData.experience.map(exp => ({...exp, id: crypto.randomUUID()}));
      }
      if (parsedData.education) {
        parsedData.education = parsedData.education.map(edu => ({...edu, id: crypto.randomUUID()}));
      }
      if (parsedData.skills) {
        parsedData.skills = parsedData.skills.map(skill => ({...skill, id: crypto.randomUUID()}));
      }
      if (parsedData.languages) {
        parsedData.languages = parsedData.languages.map(lang => ({...lang, id: crypto.randomUUID()}));
      }
      
      console.log('Successfully parsed resume data');
    } catch (error) {
      console.error('Error parsing JSON from OpenAI response:', error);
      console.error('Response content:', generatedContent);
      throw new Error('Failed to parse AI response as JSON');
    }

    return new Response(
      JSON.stringify(parsedData),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in extract-resume-data function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Unknown error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
