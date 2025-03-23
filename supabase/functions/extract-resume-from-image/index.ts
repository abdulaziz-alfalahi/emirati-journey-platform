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
    const { imageData, fileName, fileType } = await req.json();
    
    if (!imageData) {
      return new Response(
        JSON.stringify({ error: 'No image data provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Processing resume image: ${fileName} (${fileType})`);

    if (!openAIApiKey) {
      console.error('OpenAI API key is not configured');
      return new Response(
        JSON.stringify({ 
          error: 'OpenAI API key is not configured. Please add it to your Supabase secrets.',
          fallbackToRegex: true 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create a system prompt that instructs the model how to parse the image content
    const systemPrompt = `
      You are an expert resume parser. Extract structured information from the resume image I'm providing.
      
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
      
      Important parsing guidelines:
      1. For dates, always convert to YYYY-MM format
      2. For current positions, set current = true and endDate = null
      3. For skills, try to determine skill level based on context, years of experience, or explicit mentions
      4. Extract full descriptions for jobs including responsibilities and achievements
      5. If an expected field is not found in the text, use empty string or empty array as appropriate
      6. Do not include any explanatory text or markdown, just return valid JSON
      7. Do your best to extract structured information even if the resume format is unusual or the image is not perfectly clear
      
      Do not include any explanatory text, just return the JSON object.
    `;

    console.log('Sending image to OpenAI for processing...');

    try {
      // Call OpenAI API with vision capabilities
      const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: systemPrompt },
            { 
              role: 'user', 
              content: [
                { type: 'text', text: 'Extract the resume data from this image:' },
                { 
                  type: 'image_url', 
                  image_url: {
                    url: imageData,
                    detail: 'high'
                  }
                }
              ]
            }
          ],
          temperature: 0.2, // Lower temperature for more deterministic results
        }),
      });

      console.log('OpenAI API response status:', openAIResponse.status);
      
      if (!openAIResponse.ok) {
        const errorData = await openAIResponse.json();
        console.error('OpenAI API error:', JSON.stringify(errorData));
        
        // Check for quota errors
        if (errorData.error && errorData.error.code === 'insufficient_quota') {
          console.error('OpenAI API quota exceeded');
          return new Response(
            JSON.stringify({ 
              error: 'OpenAI API quota exceeded. Please update your API key or upgrade your plan.'
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        
        // Check for invalid API key
        if (errorData.error && (errorData.error.code === 'invalid_api_key' || openAIResponse.status === 401)) {
          console.error('Invalid OpenAI API key');
          return new Response(
            JSON.stringify({ 
              error: 'Invalid OpenAI API key. Please check your API key and try again.'
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        
        // Other API errors
        console.error(`General OpenAI API error: ${JSON.stringify(errorData)}`);
        return new Response(
          JSON.stringify({ 
            error: `OpenAI API error: ${errorData.error?.message || 'Unknown error'}`
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const data = await openAIResponse.json();
      
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        console.error('Unexpected response format from OpenAI:', JSON.stringify(data));
        return new Response(
          JSON.stringify({ 
            error: 'Unexpected response format from OpenAI'
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const generatedContent = data.choices[0].message.content;
      console.log('OpenAI response received, content length:', generatedContent.length);

      // Try to parse the response as JSON
      try {
        // Find JSON object in the response (in case there's any extra text)
        const jsonMatch = generatedContent.match(/\{[\s\S]*\}/);
        const jsonString = jsonMatch ? jsonMatch[0] : generatedContent;
        const parsedData = JSON.parse(jsonString);
        
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
        
        console.log('Successfully parsed resume data from image');
        return new Response(
          JSON.stringify(parsedData),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } catch (error) {
        console.error('Error parsing JSON from OpenAI response:', error);
        console.error('Response content:', generatedContent);
        return new Response(
          JSON.stringify({ 
            error: 'Failed to parse AI response as JSON'
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
    } catch (apiError) {
      console.error('Error in OpenAI API call:', apiError);
      return new Response(
        JSON.stringify({ 
          error: apiError.message || 'Error in OpenAI API call'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Error in extract-resume-from-image function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Unknown error occurred'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
