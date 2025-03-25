
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req)  => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { fileContent } = await req.json()
    
    if (!fileContent) {
      return new Response(
        JSON.stringify({ 
          error: 'Job description content is required',
          status: 'missing_content', 
          title: 'Untitled Position',
          company: 'Unknown Company',
          description: 'No job description provided'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Extract text content from the file
    const textContent = fileContent

    // Call OpenAI API to parse the job description
    const apiKey = Deno.env.get('OPENAI_API_KEY')
    if (!apiKey) {
      console.error('OpenAI API key not configured');
      return new Response(
        JSON.stringify({ 
          error: 'OpenAI API key not configured', 
          status: 'configuration_error',
          userMessage: 'The OpenAI API key is not configured. Please set it in the Supabase Edge Function secrets.',
          title: 'Untitled Position',
          company: 'Unknown Company',
          description: 'OpenAI API key configuration error'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    // Test validity of API key with a simple request
    try {
      const testResponse = await fetch('https://api.openai.com/v1/models', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        }
      });
      
      if (!testResponse.ok) {
        const testErrorData = await testResponse.json();
        console.error('OpenAI API key validation failed:', testErrorData);
        
        if (testResponse.status === 401) {
          return new Response(
            JSON.stringify({ 
              error: 'Invalid OpenAI API key. Please check your API key and try again.',
              status: 'authentication_error',
              userMessage: 'Your OpenAI API key appears to be invalid. Please check the key and try again.',
              title: 'Untitled Position',
              company: 'Unknown Company',
              description: 'Authentication error with OpenAI API'
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
          )
        }
        
        if (testErrorData.error?.type === 'insufficient_quota') {
          return new Response(
            JSON.stringify({ 
              error: 'Your OpenAI API key has insufficient quota. Please check your usage limits.',
              status: 'quota_error',
              userMessage: 'Your OpenAI API key has reached its usage limit. Please check your billing details on the OpenAI website.',
              title: 'Untitled Position',
              company: 'Unknown Company',
              description: 'OpenAI API quota exceeded'
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 402 }
          )
        }
        
        return new Response(
          JSON.stringify({ 
            error: `OpenAI API error: ${testErrorData.error?.message || 'Unknown error'}`,
            status: 'api_error',
            userMessage: 'There was an error connecting to the OpenAI API. Please try again later.',
            title: 'Untitled Position',
            company: 'Unknown Company',
            description: 'Error connecting to OpenAI API'
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
        )
      }
    } catch (testError) {
      console.error('Error testing OpenAI API key:', testError);
      return new Response(
        JSON.stringify({ 
          error: `Error validating OpenAI API key: ${testError.message}`, 
          status: 'connection_error',
          userMessage: 'Failed to validate the OpenAI API key. Please check your internet connection and try again.',
          title: 'Untitled Position',
          company: 'Unknown Company',
          description: 'Connection error testing OpenAI API'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    console.log('OpenAI API key validated successfully');

    // Proceed with the actual parsing request
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a job description parsing assistant. Extract structured information from the job description text provided.'
          },
          {
            role: 'user',
            content: `Parse the following job description and extract structured information in JSON format. Include the following fields if available: title, company, location, employment_type, work_mode, description, responsibilities (array) , requirements: {skills (array with name, level, required), experience (array with years, field, required), education (array with level, field, required), languages (array with language and proficiency)}, benefits (array), salary (object with min, max, currency, period), application_deadline, posted_date, keywords (array). Job description text: ${textContent}`
          }
        ],
        temperature: 0.1
      })
    })

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json();
      console.error('OpenAI API error during parsing:', errorData);
      
      // Check specifically for quota errors in the actual parsing request
      if (errorData.error?.type === 'insufficient_quota') {
        return new Response(
          JSON.stringify({ 
            error: 'Your OpenAI API key has insufficient quota. Please check your usage limits.',
            status: 'quota_error',
            userMessage: 'Your OpenAI API key has reached its usage limit. Please check your billing details on the OpenAI website.',
            title: 'Untitled Position',
            company: 'Unknown Company',
            description: 'OpenAI API quota exceeded'
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 402 }
        )
      }
      
      return new Response(
        JSON.stringify({ 
          error: `Error during parsing: ${errorData.error?.message || 'Unknown error'}`,
          details: errorData,
          status: 'parsing_error',
          userMessage: 'An error occurred while parsing the job description. Please try again later.',
          title: 'Untitled Position',
          company: 'Unknown Company',
          description: 'Error parsing job description'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: openaiResponse.status }
      )
    }

    const openaiData = await openaiResponse.json()
    
    // Extract the JSON from the OpenAI response
    const assistantMessage = openaiData.choices[0].message.content
    let parsedJobDescription
    
    try {
      // Try to extract JSON from the response
      const jsonMatch = assistantMessage.match(/```json\n([\s\S]*?)\n```/) || 
                        assistantMessage.match(/{[\s\S]*}/)
      
      if (jsonMatch) {
        parsedJobDescription = JSON.parse(jsonMatch[1] || jsonMatch[0])
      } else {
        parsedJobDescription = JSON.parse(assistantMessage)
      }
      
      // Create a complete job description structure with default values
      const completeJobDescription = {
        title: parsedJobDescription.title || 'Untitled Position',
        company: parsedJobDescription.company || 'Unknown Company',
        location: parsedJobDescription.location || '',
        employment_type: parsedJobDescription.employment_type || '',
        work_mode: parsedJobDescription.work_mode || '',
        description: parsedJobDescription.description || '',
        responsibilities: Array.isArray(parsedJobDescription.responsibilities) 
          ? parsedJobDescription.responsibilities 
          : [],
        requirements: {
          skills: Array.isArray(parsedJobDescription.requirements?.skills) 
            ? parsedJobDescription.requirements.skills 
            : [],
          experience: Array.isArray(parsedJobDescription.requirements?.experience) 
            ? parsedJobDescription.requirements.experience 
            : [],
          education: Array.isArray(parsedJobDescription.requirements?.education) 
            ? parsedJobDescription.requirements.education 
            : [],
          languages: Array.isArray(parsedJobDescription.requirements?.languages) 
            ? parsedJobDescription.requirements.languages 
            : []
        },
        benefits: Array.isArray(parsedJobDescription.benefits) 
          ? parsedJobDescription.benefits 
          : [],
        salary: parsedJobDescription.salary || {},
        application_deadline: parsedJobDescription.application_deadline || '',
        posted_date: parsedJobDescription.posted_date || '',
        keywords: Array.isArray(parsedJobDescription.keywords) 
          ? parsedJobDescription.keywords 
          : []
      };
      
      parsedJobDescription = completeJobDescription;
      
    } catch (error) {
      console.error('Error parsing JSON from OpenAI response:', error)
      console.error('Raw response:', assistantMessage)
      
      // Create a minimal valid structure when parsing fails
      parsedJobDescription = { 
        title: 'Untitled Position',
        company: 'Unknown Company',
        description: 'Failed to parse job description properly. Please try again with a clearer job description.',
        location: '',
        employment_type: '',
        work_mode: '',
        responsibilities: [],
        requirements: {
          skills: [],
          experience: [],
          education: [],
          languages: []
        },
        benefits: [],
        salary: {},
        application_deadline: '',
        posted_date: '',
        keywords: [],
        error: 'Failed to parse job description data', 
        raw_response: assistantMessage,
        status: 'json_parsing_error',
        userMessage: 'Failed to parse the response from OpenAI. Please try again with a clearer job description.'
      }
    }

    console.log('Successfully parsed job description with schema validation');
    return new Response(
      JSON.stringify(parsedJobDescription),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error processing job description:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        status: 'server_error',
        userMessage: 'An unexpected error occurred. Please try again later.',
        title: 'Untitled Position',
        company: 'Unknown Company',
        description: 'Server error processing job description',
        location: '',
        employment_type: '',
        work_mode: '',
        responsibilities: [],
        requirements: {
          skills: [],
          experience: [],
          education: [],
          languages: []
        },
        benefits: [],
        salary: {},
        application_deadline: '',
        posted_date: '',
        keywords: []
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
