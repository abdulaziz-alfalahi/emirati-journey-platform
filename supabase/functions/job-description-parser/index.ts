
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
        JSON.stringify({ error: 'Job description content is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Extract text content from the file
    const textContent = fileContent

    // Call OpenAI API to parse the job description
    const apiKey = Deno.env.get('OPENAI_API_KEY')
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
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
    } catch (error) {
      console.error('Error parsing JSON from OpenAI response:', error)
      parsedJobDescription = { error: 'Failed to parse job description data', raw_response: assistantMessage }
    }

    return new Response(
      JSON.stringify(parsedJobDescription),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error processing job description:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
